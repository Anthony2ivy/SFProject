
var table1 = new Array(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120);//传表格的值
var table2 = new Array(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 900, 800);//传表格的值
var table3 = new Array(22,33,44,55,66,77,88,9,99,102,23,12);
var table4 = new Array(234,345,456,567,678,789,890,123,234,452,642,123);
var t = new Array();//放后面表的月份的对象
var d = new Array();//放表数值的对象


//取最小大于最大值的10的倍数或取最大小于最小值的10的倍数
function firstNum(max,k){
	var q;
	for (var i = 0; max>0;i++){
		if(max <=10&&max>=1&&i!=0){
			q=max;
		}
		else if(max<=10&&max>=1&&i==0){
			return 0;
		}
		else if(max%100==0&&i==0){
			return max;
		}
		max = parseInt(max/10);
	}
	//k=1就是取最小大于
	//k=0取最大小于
	result = (q+k)*Math.pow(10,i-1);
	return result;
}
//比较因子
function sortNum(a,b){
	return a-b;
}
//数值排序 确定最大值最小值
function setAxis(arr){
	var sortedArr = new Array();
	sortedArr = arr.slice(0);
	sortedArr.sort(sortNum);
	var max = sortedArr[sortedArr.length-1];
	max = firstNum(max,1);
	var min = sortedArr[0];
	min = firstNum(min,0);
	var step = (max-min)/5;
	 arr.push(max);
	 arr.push(min);
	 arr.push(step);
	 return arr;
	 
}

//画图的函数
function fillchart(chart, valuepic, arr, name) {
	mistakeStep = 20; //允许点击的误差范围
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
	//消除锯齿

	let width = c.width,
		height = c.height;
	if(window.devicePixelRatio) {
		c.style.width = width + "px";
		c.style.height = height + "px";
		c.height = height * window.devicePixelRatio;
		c.width = width * window.devicePixelRatio;
		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "rgb(207,207,207)";
	ctx.lineWidth = 0.1;
	ctx.translate(100, 200);
	ctx.moveTo(0, 0);
	ctx.lineTo(260, 0); //X axis
	ctx.stroke();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -150); // Y axis
	ctx.moveTo(0, 0);

	//表
	//纵坐标
	var Xpos; //x轴上左边标明数值的位置 自定义
	var Ypos = 5; //y 轴上起点
	var Ystep = -30; //y 轴上间隔
	var step = arr.pop();
	var min = arr.pop();
	var max = arr.pop();
//	alert(step+" "+arr.pop()+" "+arr.pop());
	for(var i = 0; i < 6; i++) {
		//根据横纵坐标大小来设置它在 X 轴上的位置
		var Wert = min + i * step;
		if(parseFloat(Wert) >= 10 && parseFloat(Wert) < 100) {
			Xpos = -20;
		} else if(parseFloat(Wert) >= 100 && parseFloat(Wert) < 1000) {
			Xpos = -28;
		} else if(parseFloat(Wert) >= 1000) {
			Xpos = -36;
		} else if(parseFloat(Wert) < 10) {
			Xpos = -15;
		}
		ctx.fillText(Wert, Xpos, Ypos + i * Ystep);
	}
	ctx.fillStyle = "#E4E4E4";
	ctx.fillText(name, -40, -175);
	ctx.fillText("月份", 270, 10);
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "15px Calibri";
	ctx.fillText("运单量", 125, -180);
	ctx.strokeStyle = "#E4E4E4";
	for(var i = 1; i < 6; i++) {
		ctx.moveTo(0, i * (-30));
		ctx.lineTo(5, i * (-30));
		ctx.stroke();
	} //Y axis
	ctx.moveTo(0, 0);
	

	for(var i = 1; i < 13; i++) {
		ctx.moveTo(i * 20, 0);
		ctx.lineTo(i * 20, -5);
		ctx.stroke();
	} //X axis

	ctx.stroke();
	ctx.moveTo(0, 0);
	ctx.lineWidth = 2;
	//取得表中的数据

	for(var i = 0; i < 13; i++) {
		if(i != 0) {

			dataset[i - 1] = arr[i-1] //获得表中的数据
			//根据坐标轴范围处理数据
			var m = parseFloat(-300 / (2 * parseFloat(max)));
			yWert[i - 1] = parseFloat(m * dataset[i - 1]);
			pointValue.set(months[i - 1], dataset[i - 1]);
			point.set(months[i - 1], parseFloat(yWert[i - 1] + 200));

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
			x: x - absolutePos.left * (c.width / absolutePos.width)/window.devicePixelRatio,
			y: y - absolutePos.top * (c.height / absolutePos.height)/window.devicePixelRatio
		};
	}
	//事件监听
	c.addEventListener('mousemove', function(e) {

		p = getEventPosition(e, e.clientX, e.clientY);
		var x = parseFloat(p.x);
		var y = parseFloat(p.y);

		for(var i = 1; i < 13; i++) {
			if(parseFloat(Math.abs(x - months[i - 1])) < parseFloat(mistakeStep)) {
				for(var j = 1; j < 13; j++) {
					//把 map 里的 key 值转为数字
					var valueY = Math.abs(y - parseFloat(point.get(months[i - 1])));
					if(parseFloat(valueY) < parseFloat(mistakeStep)) {
						loadPic1(months[i - 1] - 17, point.get(months[i - 1]) - 20, pointValue.get(months[i - 1]));
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
		//数值比较少的时候气泡比较小
		if(parseFloat(value)<=1000){
		y = parseFloat(y) + 34;
		part.style.top = y + "px";
		part.style.left = x + "px";
		part.style.width = "36px";
		part.style.height = "36px";
		part.innerHTML = value;
		part.style.color = "rgb(67,66,64)";
		part.style.textAlign = "center";
		part.style.lineHeight = "30px";
		}
		//数值较大的时候气泡变大
		else if (parseFloat(value)>1000){
			
		}
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
function createTable(name, j, tableV) {

	var table = document.getElementsByClassName("data")[j];
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	td.className = "figure";
	td.innerHTML = "月份";
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
	td2.innerHTML = "运单量";
	tr2.appendChild(td2);
	for(var i = 0; i < 12; i++) {
		d[i] = document.createElement("td");
		d[i].innerHTML = tableV[i];
		tr2.appendChild(d[i]);
	}
	tableV = setAxis(tableV);
//	for(var i = 0;i<tableV.length;i++){
//		alert(tableV[i]);
//	}
fillchart(document.getElementsByClassName("chart")[j], document.getElementsByClassName("valuePic")[j], tableV, name);
}
//要创建新的表就在这里写咯
createTable("个数", 0, table2);
createTable("金额", 1, table1);
createTable("重量", 2, table4);
createTable("折扣", 3, table3);


