#!/usr/bin/perl
#2016/02/28
#send mail => 2004/04/26 written by H.Ito
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI qw(:standard);
   
#�����R�[�h�ϊ����C�u�������C���N���[�h
use Jcode;

# ----- �����ݒ� -----
#$nkf = "/usr/local/bin/nkf -j"; #TestSever
$nkf = "/usr/bin/nkf -j";

$subject     = '�G���g���[��t';
$mymail      = 'to@f-sprits.in';
$ccmail      = '';

#�e�X�g�̂��ߋ����I�ɑ��M���ύX,�ǉ�
$mymail      = 'it-t@redcube.jp';
$ccmail      = 'it-t@redcube.jp';

$mailto      = "/usr/lib/sendmail " . $mymail;

$flg1=0;
$flg2=0;

#POST����
%postname = ('mode' => '', 'namef' => '[����(��)]', 'namel' => '[����(��)]', 'rubyf' => '[�J�i(��)]', 'rubyl' => '[�J�i(��)]', 'birthy' => '[�a����(�N)]', 'birthm' => '[�a����(��)]', 'birthd' => '[�a����(��)]', 'gender' => '[����]', 'add' => '[�Z��]', 'tel1' => '[�d�b�ԍ�1]', 'tel2' => '[�d�b�ԍ�2]', 'tel3' => '[�d�b�ԍ�3]', 'ctel1' => '[�g�єԍ�1]', 'ctel2' => '[�g�єԍ�2]', 'ctel3' => '[�g�єԍ�3]', 'mail1' => '[���[���A�h���X]', 'mail2' => '[���[���A�h���X(�m�F)]', 'cmail1' => '[�g�уA�h���X]', 'cmail2' => '[�g�уA�h���X(�m�F)]', 'background' => '[�w��]', 'career' => '[�E��]', 'license' => '[���i]', 'etc' => '[�ʒm���@��]', 'motivation' => '[���@]', 'ability' => '[���Z]', 'request' => '[�{�l��]]');
#�K�{����
my @errreq;
@required = ('namef', 'namel', 'rubyf', 'rubyl', 'birthy', 'birthm', 'birthd', 'gender', 'add', 'tel1', 'tel2', 'tel3', 'ctel1', 'ctel2', 'ctel3', 'mail1', 'mail2', 'cmail1', 'cmail2', 'background', 'career', 'license', 'etc', 'motivation', 'ability', 'request');

#POST�l�̎󂯎��
$q = CGI->new;
while ( my ($key, $valu) = each %postname ) {
	$hash{$key} = $q->param($key);
}

#�K�{���̓`�F�b�N
foreach my $key(@required){
  if( $hash{$key} eq '' ){
		push(@errreq, $postname{$key});
		$flg1 = 1;
	}
}
my $item = '';
#�����͌����������ꍇ�A�G���[���e��Z�߂�
if( $flg1 == 1 ){
	$val = '';
	foreach $val (@errreq) {
		$item = $item . $val;
	}
	$item = Jcode::convert( '<span class=\"danger\">'.$item.'</span>�������͂ł��B<br>', 'utf8' ); #utf8�ɉ��̂��ϊ����Ȃ���sjis�ŏo�͂���Ă��܂�
}

#�T�j�^�C�W���O���̑�
while ( my ($variable, $value) = each %hash ) {
	#($variable, $value) = split('=', $i);
	$value =~ s/\+/ /g;
	$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack('C', hex($1))/eg;
	#&jcode'convert(*value, 'euc'); �ȑO�̃y�[�W��EUC�̈� �폜
	$value =~ s/</&lt;/g;
	$value =~ s/>/&gt;/g;
	#�����T�j�^�C�W���O�s���Ή�����
	$value =~ s/</��/g;
	$value =~ s/>/��/g;
	$value =~ s/'/�f/g;
	$value =~ s/"/�h/g;
	$value =~ s/`/�M/g;
	#�g�_�b�V�����
	$value =~ s/\015\012/\012/g;
	$value =~ s/\015/\012/g;
	#&jcode'convert(*value, );
	#�g�_�b�V�����Ή�(cp932���o�R,BadKnowHow���Ƃ͎v������)
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
