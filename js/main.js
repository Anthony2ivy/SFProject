
$(document).ready(function(){
  $(".nav-group li").click(function(){
    $(".nav-group li.active").removeClass("active");
    $(this).addClass("active");
  });
  $("#account-drop-btn").click(function(){
  	$(".account-group").toggleClass("unfolding");
  });
   $(".button-group li").click(function(){
    $(".button-group li.active").removeClass("active");
    $(this).addClass("active");
  });
  setTimeout(function(){
  	$("body").css("background-image","url(./img/login/background.png)");	
  	$("ul.option-block li:eq(0)").fadeIn(300);
  	$("ul.option-block li:eq(1)").fadeIn(600);
  	$("ul.option-block li:eq(2)").fadeIn(900);
  	$("ul.option-block li:eq(3)").fadeIn(1200);
  },1500);
});