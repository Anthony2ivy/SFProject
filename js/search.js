$(document).ready(function(){
	
});
function fillNoResult(classname,searchInuput)
{
	var h2=$("<h2></h2>");
	h2.append("很抱歉，没有找到与\"");
	var span=$("<span style=\"color:#c00\"></span>").text(searchInuput);
	h2.append(span);
	h2.append("\"相关的页面。");
	var h3=$("<h3></h3>").text("温馨提示:");
	var ul=$("<ul></ul>");
	var li1=$("<li></li>").text("请检查您的输入是否正确。");
	var li2=$("<li></li>").text("如商家未收录请联系我们。");
	ul.append(li1,li2);
	$("."+classname).append(h2,h3,ul);
}
