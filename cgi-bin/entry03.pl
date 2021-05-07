#!/usr/bin/perl
#2016/02/28
#send mail => 2004/04/26 written by H.Ito
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI qw(:standard);
   
#漢字コード変換ライブラリをインクルード
use Jcode;

# ----- 初期設定 -----
#$nkf = "/usr/local/bin/nkf -j"; #TestSever
$nkf = "/usr/bin/nkf -j";

$subject     = 'エントリー受付';
$mymail      = 'to@f-sprits.in';
$ccmail      = '';

#テストのため強制的に送信先を変更,追加
$mymail      = 'it-t@redcube.jp';
$ccmail      = 'it-t@redcube.jp';

$mailto      = "/usr/lib/sendmail " . $mymail;

$flg1=0;
$flg2=0;

#POST項目
%postname = ('mode' => '', 'namef' => '[氏名(氏)]', 'namel' => '[氏名(名)]', 'rubyf' => '[カナ(氏)]', 'rubyl' => '[カナ(名)]', 'birthy' => '[誕生日(年)]', 'birthm' => '[誕生日(月)]', 'birthd' => '[誕生日(日)]', 'gender' => '[性別]', 'add' => '[住所]', 'tel1' => '[電話番号1]', 'tel2' => '[電話番号2]', 'tel3' => '[電話番号3]', 'ctel1' => '[携帯番号1]', 'ctel2' => '[携帯番号2]', 'ctel3' => '[携帯番号3]', 'mail1' => '[メールアドレス]', 'mail2' => '[メールアドレス(確認)]', 'cmail1' => '[携帯アドレス]', 'cmail2' => '[携帯アドレス(確認)]', 'background' => '[学歴]', 'career' => '[職歴]', 'license' => '[資格]', 'etc' => '[通知方法等]', 'motivation' => '[動機]', 'ability' => '[特技]', 'request' => '[本人希望]');
#必須項目
my @errreq;
@required = ('namef', 'namel', 'rubyf', 'rubyl', 'birthy', 'birthm', 'birthd', 'gender', 'add', 'tel1', 'tel2', 'tel3', 'ctel1', 'ctel2', 'ctel3', 'mail1', 'mail2', 'cmail1', 'cmail2', 'background', 'career', 'license', 'etc', 'motivation', 'ability', 'request');

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
my $item = '';
#未入力個所があった場合、エラー内容を纏める
if( $flg1 == 1 ){
	$val = '';
	foreach $val (@errreq) {
		$item = $item . $val;
	}
	$item = Jcode::convert( '<span class=\"danger\">'.$item.'</span>が未入力です。<br>', 'utf8' ); #utf8に何故か変換しないとsjisで出力されてしまう
}

#サニタイジングその他
while ( my ($variable, $value) = each %hash ) {
	#($variable, $value) = split('=', $i);
	$value =~ s/\+/ /g;
	$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack('C', hex($1))/eg;
	#&jcode'convert(*value, 'euc'); 以前のページがEUCの為 削除
	$value =~ s/</&lt;/g;
	$value =~ s/>/&gt;/g;
	#↓↓サニタイジング不足対応↓↓
	$value =~ s/</＜/g;
	$value =~ s/>/＞/g;
	$value =~ s/'/’/g;
	$value =~ s/"/”/g;
	$value =~ s/`/｀/g;
	#波ダッシュ問題
	$value =~ s/\015\012/\012/g;
	$value =~ s/\015/\012/g;
	#&jcode'convert(*value, );
	#波ダッシュ問題対応(cp932を経由,BadKnowHowだとは思うけど)
	$value = Jcode::convert( $value, 'cp932' ); 
	$value = Jcode::convert( $value, 'sjis' ); 
	$post{$variable} = $value;
}

print "Content-type: text/html; charset=utf-8\n\n";
open(STDOUT);
print STDOUT << "EOF";
<!doctype="html">
<html>
<head>
<title>Test3</title>
</head>
<body>
Success!!
</body>
</html>
EOF
close(STDOUT);
exit(0);

exit;
