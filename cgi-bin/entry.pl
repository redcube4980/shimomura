#!/usr/bin/perl
#2016/02/28
#send mail => 2004/04/26 written by H.Ito
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI qw(:standard);
use MIME::Base64 qw(encode_base64); #headerのmimeエンコードに使用
   
#漢字コード変換ライブラリをインクルード
use Jcode;
#use Unicode::Japanese;
#use URI::Escape;

# ----- 初期設定 -----
#$nkf = "/usr/local/bin/nkf -w"; #TestSever
#$nkf = "/usr/bin/nkf -j"; #iso-2022-jpエンコード指定
$nkf = "/usr/bin/nkf -w"; #utf-8エンコード指定

$subject     = 'WEBエントリー受付';
$subject     = Jcode->new( $subject, "utf8")->mime_encode;
#$mymail      = 'soumu@sts-shimomura.co.jp';
$mymail      = 'it-t@redcube.jp'; #Test用
$ccmail      = 'it-t@redcube.jp'; #Bcc

$mailto      = "/usr/lib/sendmail " . $mymail;

$flg1=0;
$flg2=0;

#POST項目
%postname = ('mode' => '', 'namef' => '[氏名(氏)]', 'namel' => '[氏名(名)]', 'rubyf' => '[カナ(氏)]', 'rubyl' => '[カナ(名)]', 'birthy' => '[誕生日(年)]', 'birthm' => '[誕生日(月)]', 'birthd' => '[誕生日(日)]', 'gender' => '[性別]', 'add' => '[住所]', 'tel1' => '[電話番号1]', 'tel2' => '[電話番号2]', 'tel3' => '[電話番号3]', 'ctel1' => '[携帯番号1]', 'ctel2' => '[携帯番号2]', 'ctel3' => '[携帯番号3]', 'mail1' => '[メールアドレス]', 'mail2' => '[メールアドレス(確認)]', 'cmail1' => '[携帯アドレス]', 'cmail2' => '[携帯アドレス(確認)]', 'background' => '[学歴]', 'career' => '[職歴]', 'license' => '[資格]', 'etc' => '[通知方法等]', 'motivation' => '[動機]', 'ability' => '[特技]', 'request' => '[本人希望]');
#必須項目
my @errreq;
#@required = ('namef', 'namel', 'rubyf', 'rubyl', 'birthy', 'birthm', 'birthd', 'gender', 'add', 'tel1', 'tel2', 'tel3', 'ctel1', 'ctel2', 'ctel3', 'mail1', 'mail2', 'cmail1', 'cmail2', 'background', 'career', 'license', 'etc', 'motivation', 'ability', 'request');
@required = ('namef', 'namel', 'rubyf', 'rubyl', 'birthy', 'birthm', 'birthd', 'gender', 'add', 'background', 'etc', 'motivation');

#POST値の受け取り
$q = CGI->new;
while ( my ($key, $valu) = each %postname ) {
	$hash{$key} = $q->param($key);
}

#必須入力チェック
foreach my $key(@required){
  if( $hash{$key} eq '' ){
		push(@errreq, $postname{$key});
		$flg1 = 1;
	}
}

#電話番号入力チェック
if( $hash{'tel1'} eq '' && $hash{'ctel1'} eq '' ){
	push(@errreq, '[電話番号]もしくは[携帯番号]');
}
#メールアドレス入力チェック
if( $hash{'mail1'} eq '' && $hash{'cmail1'} eq '' ){
	push(@errreq, '[メールアドレス]もしくは[携帯アドレス]');
}

my $item = '';
#未入力個所があった場合、エラー内容を纏める
if( $flg1 == 1 ){
	$val = '';
	foreach $val (@errreq) {
		$item = $item . $val;
	}
	$item = Jcode::convert( '<span class=\"danger\">'.$item.'</span>が未入力です。<br>', 'utf8' );
}

#サニタイジングその他
while ( my ($variable, $value) = each %hash ) {
	#($variable, $value) = split('=', $i);
	$value =~ s/\+/ /g;
	$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack('C', hex($1))/eg;
	#波ダッシュ問題対応(cp932を経由,BadKnowHowだとは思うけど)
	#$value = Jcode::convert( $value, 'cp932', 'utf8' ); 
	#$value = Jcode::convert( $value, 'sjis', 'cp932' ); 
	$value =~ s/</&lt;/g;
	$value =~ s/>/&gt;/g;
	#↓↓サニタイジング不足対応↓↓
	$value =~ s/</＜/g;
	$value =~ s/>/＞/g;
	$value =~ s/'/’/g;
	$value =~ s/"/”/g;
	$value =~ s/`/｀/g;
	#波ダッシュ問題
	#$value =~ s/\015\012/\012/g;
	#$value =~ s/\015/\012/g;
	$post{$variable} = $value;
}

my $str;
if( $flg1 == 0 ){
	if( $post{'tel1'} ne '' ){
		$str = $post{'tel1'} . '-' . $post{'tel2'} . '-' . $post{'tel3'};
		#電話番号,携帯番号
		if( $str !~ /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/ ){
			$item = $item . '[電話番号]';
			$flg2 = 1;
		}
	}
	if( $post{'ctel1'} ne '' ){
		$str = $post{'ctel1'} . '-' . $post{'ctel2'} . '-' . $post{'ctel3'};
		if( $str !~ /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/ ){
			$item = $item . '[携帯番号]';
			$flg2 = 1;
		}
	}
	$str = $post{'mail1'};
	#$str =~ s/%40/@/g;
	if( $post{'mail1'} ne '' ){
		if( $post{'mail1'} ne $post{'mail2'} ){
			$item = $item . '[メールアドレス不一致]';
			$flg2 = 1;
		} elsif( $str =~ /^([a-zA-Z0-9\.\-\/_]{1,})@([a-zA-Z0-9\.\-\/_]{1,})\.([a-zA-Z0-9\.\-\/_]{1,})$/ ){
		} else {
			$item = $item . '[メールアドレス]';
			$flg2 = 1;
		}
	}
	$str = $post{'cmail1'};
	if( $post{'cmail1'} ne '' ){
		if( $post{'cmail1'} ne $post{'cmail2'} ){
			$item = $item . '[携帯アドレス不一致]';
			$flg2 = 1;
		} elsif( $str =~ /^([a-zA-Z0-9\.\-\/_]{1,})@([a-zA-Z0-9\.\-\/_]{1,})\.([a-zA-Z0-9\.\-\/_]{1,})$/ ){
		} else {
			$item = $item . '[携帯アドレス]';
			$flg2 = 1;
		}
	}
	if( $flg2 == 1 ){
		$item = Jcode::convert( '<span class=\"danger\">'.$item.'</span>入力内容に誤りがあります。<br>', 'utf8' );
	}
}

#エラー状況を戻す
if( $flg1 == 1 or $flg2 == 1 ){
	$ret = '{"result":0,"message":"' . $item . '"}';
	print "Content-type: text/json; charset=utf-8\n\n";
	open(STDOUT);
	print STDOUT $ret;
	close(STDOUT);
	exit(0);
}

#エラーがない場合
if( $post{'mode'} eq 'send' ){
	$ret = '{"result":1,"message":""}';
	print "Content-type: text/json; charset=utf-8\n\n";
	open(STDOUT);
	print STDOUT $ret;
	close(STDOUT);
	exit(0);
} elsif( $post{'mode'} eq 'conf' ){
	$ret = '{"result":9,"message":""}';
	print "Content-type: text/json; charset=utf-8\n\n";
	open(STDOUT);
	print STDOUT $ret;
	close(STDOUT);
} else {
	$ret = '{"result":0,"message":"' . $item . '"}';
	print "Content-type: text/json; charset=utf-8\n\n";
	open(STDOUT);
	print STDOUT $ret;
	close(STDOUT);
	exit(0);
}

$email = $post{'mail1'};
# 内容をメールで送る
open(MAIL, "| $nkf | $mailto $ccmail");
$buffMail = << "EOF";
From: $email.
To: $mymail.
Bcc: $ccmail.
Subject: $subject
Content-Type: text/plain; charset=utf-8

下記の方からエントリーを承りました。
---- エントリー通知 ------------------------------------
■氏　　名： $post{'namef'} $post{'namel'}
■カ　　ナ： $post{'rubyf'} $post{'rubyl'}
■生年月日： $post{'birthy'} / $post{'birthm'} / $post{'birthd'}
■住　　所： $post{'add'}
■電話番号： $post{'tel1'} - $post{'tel2'} - $post{'tel3'}
■携帯番号： $post{'ctel1'} - $post{'ctel2'} - $post{'ctel3'}
■メ ー ル： $post{'mail1'}
■携帯Mail： $post{'cmail1'}

□学　　歴
$post{'background'}
□職　　歴
$post{'career'}
□資　　格
$post{'license'}
□通知方法
$post{'etc'}
□動　　機
$post{'motivation'}
□特　　技
$post{'ability'}
□希　　望
$post{'request'}
--------------------------------------------------------
EOF

print MAIL $buffMail;
#print MAIL Jcode::convert( $buffMail, 'utf8', 'sjis' );
close(MAIL);

exit;
