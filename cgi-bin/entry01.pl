#!/usr/bin/perl
#2016/02/28
#send mail => 2004/04/26 written by H.Ito
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI qw(:standard);
   
#漢字コード変換ライブラリをインクルード
use Jcode;

print "Content-type: text/html; charset=utf-8\n\n";
open(STDOUT);
print STDOUT << "EOF";
<!doctype="html">
<html>
<title>Test1</title>
<head>
</head>
<body>
Success!!
</body>
</html>
EOF
close(STDOUT);

exit;
