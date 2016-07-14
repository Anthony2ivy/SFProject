var c = document.getElementById("chart");
var ctx = c.getContext("2d");
ctx.save();
ctx.beginPath();
ctx.strokeStyle = "rgb(68,67,65)";
ctx.lineWidth = 0.1;
ctx.translate(100, 200);
ctx.moveTo(0, 0);
ctx.lineTo(260, 0); //X axis
ctx.stroke();
ctx.moveTo(0, 0);
ctx.lineTo(0, -150); // Y axis
ctx.moveTo(0, 0);
ctx.fillStyle = "rgb(207,207,207)";
ctx.fillText("0", -15, 5);
ctx.fillText("20", -20, -25);
ctx.fillText("40", -20, -55);
ctx.fillText("60", -20, -85);
ctx.fillText("80", -20, -115);
ctx.fillText("100", -25, -145);
ctx.fillText("个数", -40, -175);
ctx.fillText("月份", 270, 10);
ctx.fillText("运单量",125,-185);
ctx.strokeStyle = "rgb(207,207,207)";
for(var i = 1; i < 6; i++) {
	ctx.moveTo(0, i * (-30));
	ctx.lineTo(5, i * (-30));
	ctx.stroke();
} //Y axis
ctx.moveTo(0, 0);
ctx.lineWidth = 2;

for(var i = 1; i < 13; i++) {
	
	ctx.moveTo(i * 20, 0);
	ctx.lineTo(i * 20, -5);
	ctx.stroke();
} //X axis

ctx.stroke();
ctx.moveTo(0, 0);

//取得表中的数据
var tree = document.getElementsByClassName("value")[0].getElementsByTagName("td");
var dataset = new Array();
for(var i = 0; i < 13; i++) {
	if(i != 0) {
		dataset[i - 1] = tree[i].innerText; //获得表中的数据
		//					alert(tree[i].innerText);
		//					ctx.moveTo(i*20,-1*3*datavalue/2);
		//					ctx.fillRect(10,i*20,-1*3*datavalue/2);
	}
}

for(var i = 0; i < 11; i++) {
	//				alert(dataset[i]);
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.moveTo((i + 1) * 20, -1 * 3 * dataset[i] / 2);
	ctx.quadraticCurveTo((i + 1) * 20, (-1 * 1.6 * dataset[i]), (i + 2) * 20, -1 * 3 * dataset[i + 1] / 2);
	ctx.stroke();
}
ctx.restore();

chart.onmouseover = function(e){
//	var absolutePos =chart.getBoundingClientRect();
//	var x = e.pageX-absolutePos.left*(chart.width/absolutePos.width);
//	var y = e.pageY-absolutePos.top*(chart.height/absolutePos.height);
	alert("x="+e.pageX+"y="+e.pageY);
//if(e.pageX>123&&e.pageX<128&&e.pageY>530&&e.pageY<550)
//	alert("asdhwiud");
//}
	
}
