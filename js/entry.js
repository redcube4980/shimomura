/* Information
----------------------------------------------
File Name : inquiryjs
--------------------------------------------*/

var retJson;
$(function(){
	//表示の初期状態
	$('#btnReturn').css('display', 'none');	
	$('#btnSend').css('display', 'none');	
	$('input[type="text"].toggledispi, textarea.toggledispi').css('visibility', 'visible').css('display', 'inline');
	$('.toggledispc').css('visibility', 'hidden').css('display', 'none');

	//入力時に表示項目への転記
	$('input[type="text"].toggledispi, textarea.toggledispi').blur(function(){
		var val = $(this).val();
		if( $(this).prop("tagName").toLowerCase() == 'textarea' ){
			$(this).parent().children('.toggledispc').html( val.replace("\n","<br>\n") );
		} else {
			$(this).parent().children('.toggledispc').html(val);
		}
	});

	//リセット時に追加処理
	$('#btnReset').on('click', function(){
		$('#msgBox').html('').removeClass('warning').removeClass('success');
		$('#btnSend').css('display', 'none');	
		$('#btnConfirm').css('display', '');
		$('#btnReturn').css('display', 'none');	
		$('#btnReset').css('display', '');
		$('#inp_mode').val('send');
	});

	//修正時
	$('#btnReturn').on('click', function(){
		$('#msgBox').html('').removeClass('warning').removeClass('success');
		$('#btnSend').css('display', 'none');	
		$('#btnConfirm').css('display', '');
		$('#btnReturn').css('display', 'none');	
		$('#btnReset').css('display', '');
		$('#inp_mode').val('send');
		$('input[type="text"].toggledispi, textarea.toggledispi').css('visibility', 'visible').css('display', 'inline');
		$('.toggledispc').css('visibility', 'hidden').css('display', 'none');
		$('span.reconf').css('display', '');
	});

	//送信時
	$('.btnSend').on('click', function(){
		var targeturl = '/cgi-bin/entry.pl';
		var postdata = $('#frmEntry').serialize();
		$('#btnEntry').prop('disabled', true);
//		$('#btnSend').prop('disabled', true);
		$('#msgBox').html('送信しています。暫くお待ち下さい。').addClass('warning').removeClass('success');
		var promiss = ajaxProc(targeturl,postdata);
		promiss.done(function(){
			if ( retJson.result == 1 ) {
				$('#msgBox').html('内容を確認し良ければ「送信」をクリックして下さい。').addClass('warning').removeClass('success');
				$('#btnSend').css('display', '');	
				$('#btnConfirm').css('display', 'none');
				$('#btnReturn').css('display', '');	
				$('#btnReset').css('display', 'none');
				$('input[type="text"].toggledispi, textarea.toggledispi').css('visibility', 'hidden').css('display', 'none');
				$('.toggledispc').css('visibility', 'visible').css('display', 'inline');
				$('span.reconf').css('display', 'none');
				$('#inp_mode').val('conf');
			} else if ( retJson.result == 9 ) {
				$('#msgBox').html('お問い合わせを承りました。').addClass('success').removeClass('warning');
				$('#btnSend').css('display', 'none');	
				$('#btnConfirm').css('display', 'none');
				$('#btnReturn').css('display', 'none');	
				$('#btnReset').css('display', 'none');
				//location.href = "/contact_thanks.html";
			} else if ( retJson.result == 0 ) {
				$('#msgBox').html(retJson.message).removeClass('success').removeClass('warning');
				$('#btnSend').css('display', 'none');	
				$('#btnConfirm').css('display', '');
				$('#btnReturn').css('display', 'none');	
				$('#btnReset').css('display', '');
				$('#inp_mode').val('send');
			}
		});
	});
});

//Deferを使用し複数のAjaxに対応
function ajaxProc(targeturl,postdata){
	var defer = $.Deferred();
	var jqxhr = $.ajax({
		type: "POST",
		url: targeturl,
		data: postdata,
		dataType: 'json'
	}).always(function(msg){
		retJson = msg;
		defer.resolve();
	});
	return defer;
};
