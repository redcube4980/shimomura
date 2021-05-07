	$(window).load(function () {
		  hsize = $("h1 .img img").height();
		  $("h1.indexH1").css("height", hsize + "px");
	});
	$(window).resize(function () {
		  hsize = $("h1 .img img").height();
		  $("h1.indexH1").css("height", hsize + "px");
	});



// 先行
$(function() {
	$(".img img").on('load', function(){
		var hsize = $(this).height();
		$("h1.subH1").css("height", hsize + "px");
	})
});
// 保険
$(window).load(function () {
	  hsize = $(".img img").height();
	  $("h1.subH1").css("height", hsize + "px");
});

$(window).resize(function () {
	hsize = $(".img img").height();
	$("h1.subH1").css("height", hsize + "px");
});

// ページ読込遅延
$(function() {
    var fadeSpeed = 600;
    $('#pages h1')
        .css({opacity: '0.0'})
        .animate({opacity: '1'}, fadeSpeed);
});

$(function() {
    var fadeSpeed = 800;
    $('#pageContents')
        .css({opacity: '0.0'})
        .animate({opacity: '1'}, fadeSpeed);
});

$(function() {
    var fadeSpeed = 800;
    $('#sideBar')
        .css({opacity: '0.0'})
        .animate({opacity: '1'}, fadeSpeed);
});

$(function() {
    var fadeSpeed = 2000;
    $('#topContent')
        .css({opacity: '0.0'})
        .animate({opacity: '1'}, fadeSpeed);
});


// トップスライダー
$(function(){
	$('.sliderMain').bxSlider({
	pagerCustom: '.sliderNav',
	auto: true,
	pause: 6000,
	speed: 1500,
	startSlide: 0,
	adaptiveHeight: true,
	});
});

$(function(){
	$('.spMain').bxSlider({
	auto: true,
	pause: 6000,
	speed: 1500,
	startSlide: 0,
	adaptiveHeight: true,
	});
});


// ボタン透過
$(function(){
  $(".alpha").hover(function(){
	$(this).fadeTo("normal", 0.5);
  },function(){
	$(this).fadeTo("normal", 1.0);
  });
});


// スマホナビ
$(function(){
	var url = window.location.pathname;
	$('.sideMenu li a[href="'+url+'"]').parent().addClass('active');
});

// グローバルナビ　アクティブ化
$(document).ready(function() {
  if(location.pathname != "/cn/") {
    $('.gnav a[href^="/cn/' + location.pathname.replace("/cn/","/").split("/")[1] + '"]').addClass('active');
  } else $('.gnav a:eq(0)').addClass('active');
});

// ツールチップ
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})


// 
$(function(){
	 $('#spHeader').slicknav({
		 easingOpen: "linear", //メニューが開く時のアニメーション
	});
});

$(window).load(function() {
    $('.cataBlock .box').tile();
});

$(function(){
	if ( window.screen.width < 768 ) {
		$('#loadingLayer').remove();
	} else {
		setTimeout(function() {
			$('#loadingLayer').fadeOut(1000);
		}, 5000);
	}
	
//    if($.cookie("access")){
//        $('#loadingLayer').css({display:'none'});
//    }
//    $(window).load(function(){
//        $.cookie("access",$('#loadingLayer').addClass('access'));
//    })

});

// モーダル youtube 停止
$(function(){
	$('a, .btn').click(function () { 
	  var idname = $(this).attr('data-target'),
	  	  myFrame = $(idname).find('iframe'),
	      src = myFrame.attr('src');

	  $(idname).on('shown.bs.modal', function () {
		myFrame.attr('src', src + "?autoplay=1" );
	  });
			
	  $(idname).on('hidden.bs.modal', function () {
		// myFrame.removeAttr('src');
		myFrame.attr('src', src);
		$(idname).off('shown.bs.modal');
		$(idname).off('hidden.bs.modal');
	  });
	});
});

$(function(){
	var paragraph = document.getElementsByTagName('sup')[0];
	
	function textEffect(animationName) {
	  var text = paragraph.innerHTML,
			chars = text.length,
			newText = '',
			animation = animationName,
			char,
			i;
	
		for (i = 0; i < chars; i += 1) {
			newText += '<i>' + text.charAt(i) + '</i>';
		}
	
		paragraph.innerHTML = newText;
	
		var wrappedChars = document.getElementsByTagName('i'),
			wrappedCharsLen = wrappedChars.length,
			j = 0;
	
		function addEffect () {
			setTimeout(function () {
				wrappedChars[j].className = animation;
				j += 1;
				if (j < wrappedCharsLen) {
					addEffect();
				}
			}, 100)
		}
	
		addEffect();
	};
	
	if (typeof paragraph !== "undefined"){
		textEffect('fly-in-out');
	}
});

