$(function() {

  $(".alpha").hover(function(){
	$(this).fadeTo("normal", 0.4);
  	},function(){
	$(this).fadeTo("normal", 1.0);
  });
});





$(function() {

  // 先行
  $(".img img").load(function(){
      hsize = $(this).height();
      maxRatio = $(window).width() * 0.298;

      if ( hsize > maxRatio ) {
        $("#main").css("height", maxRatio + "px");
      } else {
        $("#main").css("height", hsize + "px");
      }
  })
  // 保険
  $(window).load(function () {
      hsize = $(".img img").height();
      maxRatio = $(window).width() * 0.298;

      if ( hsize > maxRatio ) {
        $("#main").css("height", maxRatio + "px");
      } else {
        $("#main").css("height", hsize + "px");
      }
  });


	$(window).resize(function () {
		  hsize = $(".img img").height();
      maxRatio = $(window).width() * 0.298;

		  if ( hsize > maxRatio ) {
        $("#main").css("height", maxRatio + "px");
      } else {
        $("#main").css("height", hsize + "px");
      }
	});
})


$(function() {
    var topBtn = $('#page_top');
    topBtn.hide();
  
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
                topBtn.fadeIn();
        } else {
                topBtn.fadeOut();
        }
    });
  
    topBtn.click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
        return false;
    });
});


$(function() {
    var fadeSpeed = 800;
    $('#main')
        .css({opacity: '0.0'})
        .animate({opacity: '1'}, fadeSpeed);
});



// グローバルナビ　アクティブ化
$(document).ready(function() {
  if(location.pathname != "/") {
    $('.gnav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
  } else $('.gnav a:eq(0)').addClass('active');
});



$(document).ready(function() {
  var activeUrl = location.pathname.split("/")[2];
    navList = $("#gnav").find("a");

  navList.each(function(){
        if( $(this).attr("href").split("/")[2] == activeUrl ) {
      $(this).addClass("active");
    };
  });
});



// sp header slick nav
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

$(function(){
   $('#globalSpHeader').slicknav({
     easingOpen: "linear", //メニューが開く時のアニメーション
  });
});
