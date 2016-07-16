var table1 = new Array(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120,150);
var t = new Array();
var d = new Array();
//表

function createTable(name1, name2, j) {
	var table = document.getElementsByClassName("data")[j];
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	td.className = "figure";
	td.innerHTML = name1;
	tr.appendChild(td);
	for(var i = 0; i < 12; i++) {
		t[i] = document.createElement("td");
		t[i].innerHTML = i + 1;
		tr.appendChild(t[i]);
	}
	var tr2 = document.createElement("tr");
	tr2.className = "value";
	table.appendChild(tr2);
	var td2 = document.createElement("td");
	td2.className = "figure";
	td2.innerHTML = name2;
	tr2.appendChild(td2);
	for(var i = 0; i < 12; i++) {
		d[i] = document.createElement("td");
		d[i].innerHTML = table1[i];
		tr2.appendChild(d[i]);
	}
}
	//画图的函数
function fillchart(chart, valuepic, tree, max, min) {
	mistakeStep = 13; //允许点击的误差范围
	var point = new Map();
	var pointValue = new Map(); //值
	months = new Array(); //横坐标
	var dataset = new Array(); //全局数组
	var yWert = new Array(); //处理过后的纵坐标
	var c;
	var ctx;
	var part;
	var pic = new Image();
	pic.src = "img/qipao.png";
	for(var i = 1; i < 13; i++) {
		months.push(i * 20 + 100); //横坐标元素
	}

	c = chart;
	ctx = c.getContext("2d");
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
	//纵坐标
	var Xpos; //x轴上左边标明数值的位置 自定义
	var Ypos = 5; //y 轴上起点
	var Ystep = -30; //y 轴上间隔
	var step = parseFloat(max - min) / 5;
	for(var i = 0; i < 6; i++) {
		//根据横纵坐标大小来设置它在 X 轴上的位置
		var Wert = min + i * step;
		if(parseFloat(Wert) >= 10 && parseFloat(Wert) < 100) {
			Xpos = -20;
		} else if(parseFloat(Wert) >= 100 && parseFloat(Wert) < 1000) {
			Xpos = -28;
		} else if(parseFloat(Wert) >= 1000) {
			Xpos = -35;
		} else if(parseFloat(Wert) < 10) {
			Xpos = -15;
		}
		ctx.fillText(Wert, Xpos, Ypos + i * Ystep);
	}
	ctx.fillText("个数", -40, -175);
	ctx.fillText("月份", 270, 10);
	ctx.fillText("运单量", 125, -185);
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

	for(var i = 0; i < 13; i++) {
		if(i != 0) {

			dataset[i - 1] = tree[i].innerText; //获得表中的数据
			//根据坐标轴范围处理数据
			var m = parseFloat(-300 / (2 * parseFloat(max)));
			yWert[i - 1] = parseFloat(m * dataset[i - 1]);
			pointValue.set(months[i - 1], dataset[i - 1]);
			point.set(months[i - 1], parseInt(yWert[i - 1] + 200));

		}
	}
	//画图
	for(var i = 0; i < 11; i++) {
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.moveTo((i + 1) * 20, yWert[i]);
		ctx.lineTo((i + 2) * 20, yWert[i + 1]);
		ctx.stroke();
	}
	ctx.restore();
	//得到内部坐标
	function getEventPosition(ev, x, y) {
		var x, y;
		var absolutePos = c.getBoundingClientRect();
		return {
			x: x - absolutePos.left * (c.width / absolutePos.width),
			y: y - absolutePos.top * (c.height / absolutePos.height)
		};
	}
	//事件监听
	c.addEventListener('mousemove', function(e) {

		p = getEventPosition(e, e.clientX, e.clientY);
		var x = parseInt(p.x);
		var y = parseInt(p.y);
		//	judgeClick(x,y);

		for(var i = 1; i < 13; i++) {
			if(parseInt(Math.abs(x - months[i - 1])) < parseInt(mistakeStep)) {
				for(var j = 1; j < 13; j++) {
					//把 map 里的 key 值转为数字
					var valueY = Math.abs(y - parseInt(point.get(months[i - 1])));
					if(parseInt(valueY) < parseInt(mistakeStep)) {
						loadPic1(months[i - 1] - 8, point.get(months[i - 1]) - 20, pointValue.get(months[i - 1]));
						break;
					}
					break;
				}
			}
		}
	});
	//绘制起泡图片
	function drawPic1(x, y, pic, value) {
		part = valuepic;
		y = parseInt(y) + 44;
		part.style.top = y + "px";
		part.style.left = x + "px";
		part.style.width = "30px";
		part.style.height = "30px";
		part.innerHTML = value;
		part.style.textAlign = "center";
		part.style.lineHeight = "28px";
	}
	//气泡图片加载
	function loadPic1(x, y, value) {

		if(pic.complete) {
			drawPic1(x, y, pic, value);
		} else {
			pic.onload = function() {
				drawPic1(x, y, pic, value);
			}
		}
		pic.onerror = function() {
			alert("fail to load pic");
		}
	}

	if(document.all) {
		window.attachEvent('onload', load);
	} else {}
}

createTable("月份","运单量",0);
createTable("月份","运单金额",1);
createTable("月份","平均重量",2);
createTable("月份","平均折扣",3);

fillchart(document.getElementsByClassName("chart")[0], document.getElementsByClassName("valuePic")[0], document.getElementsByClassName("value")[0].getElementsByTagName("td"), 1000, 0);
fillchart(document.getElementsByClassName("chart")[1], document.getElementsByClassName("valuePic")[1], document.getElementsByClassName("value")[1].getElementsByTagName("td"), 100, 0);
fillchart(document.getElementsByClassName("chart")[2], document.getElementsByClassName("valuePic")[2], document.getElementsByClassName("value")[2].getElementsByTagName("td"), 1000, 0);
fillchart(document.getElementsByClassName("chart")[3], document.getElementsByClassName("valuePic")[3], document.getElementsByClassName("value")[3].getElementsByTagName("td"), 100, 0);