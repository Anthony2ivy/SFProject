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
});