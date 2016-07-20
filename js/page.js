var pageNumber = 15;
var pageNow = 1; //右边
var currentPage = 1; //当前页
var pageLeft = 1; //最左边
//在某个元素后面插入
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
//当前页样式改变
function changeStyle(pagevalue) {
	var currentNode = document.getElementsByClassName("pagemiddle")[pagevalue];
	currentNode.style.color = "red";
}
//之前样式改变
function changeprevious(pagevalue) {
	var previousNode = document.getElementsByClassName("pagemiddle")[pagevalue].previousSibling;
	previousNode.style.color = "white";
}
//改变之后的样式
function changeafter(pagevalue) {
	var afterNode = document.getElementsByClassName("pagemiddle")[pagevalue].nextSibling;
	afterNode.style.color = "white";
}
//同用添加 li 节点函数
function addsubLi(judge, pos) {
	var opP = document.getElementsByTagName("ul")[0];
	var li = document.createElement("li");
	if(judge == 1) { //增加节点
		opP.insertBefore(li, pos);
		return li;
	} else if(judge == 0) {
		insertAfter(li, pos);
	}
}
////删除对应位置对应节点
//function rmLi(parent,pos){
//	parent.removeChild()
//}
//这里是每个 li 的样式
function liStyle(li) {
	li.className = "pagemiddle";
	li.style.width = "30px";
	li.style.height = "30px";
	li.style.border = "solid 0.5px rgba(255,255,255,0.5)";
	li.style.padding = "5px 8px";
	li.style.margin = "1px";
}
//根据页数添加有多少页
function addPage(value, pageNow) {
	var values = parseInt(value);
	var j = (value > 9) ? 9 : value;
	var insertPos = document.getElementsByClassName("pagedown")[0];
	for(var i = 0; i < j; i++) {

		var li = addsubLi(1, insertPos);
		li.innerHTML = pageNow;
		pageNow = parseInt(pageNow) + 1;
		liStyle(li);
	}
	return pageNow;
}
//下一页
function pageDown(value) {
	var finalPage = document.getElementsByClassName("pagedown")[0].previousSibling;
	pageNow = parseInt(finalPage.innerHTML);
	currentPage += 1; //当前页加一
	if(pageNow < parseInt(value)) { //如果还有下一页的话
		if(currentPage > pageNow) { //如果下一页没有显示，则增加显示

			var leftPage = parseInt(value) - pageNow; //看还剩下多少页，如果剩下的页数
			var count = leftPage > 5 ? 5 : leftPage; //如果比5页多，那就用5做计数
			var addP = document.getElementsByTagName("ul")[0];
			var firstP;
			for(var i = 0; i < 5; i++) {
				firstP = addP.getElementsByClassName("pagemiddle")[0];
				//删掉前面
				addP.removeChild(firstP);
			}
			//得到页面上显示的最后一页
			var lastP = document.getElementsByClassName("pagedown")[0];
			pageNow += 1;
			pageNow = addPage(count, pageNow); //现在的最右边页数
			pageLeft = pageNow - document.getElementsByClassName("pagemiddle").length + 1; //最左边是右边减总长度加一
			addListenerToPage(currentPage, pageLeft); //给当前页加监听
			changeStyle(currentPage - pageLeft + 1);
			changeprevious(currentPage - pageLeft + 1);
		} else {
			//如果下一页有显示在页面中
			changeStyle(currentPage - pageLeft);
			changeprevious(currentPage - pageLeft);
			addListenerToPage(currentPage, pageLeft); //给当前页加监听

		}
	} else {
		alert("您已到最后一页");
	}
	return currentPage;
}
//上一页
function pageUp() {
	var firstP = document.getElementsByClassName("pagemiddle")[0];
	var pageLeft = parseInt(firstP.innerHTML);
	var count = (pageLeft - 1) > 4 ? 4 : (pageLeft - 1);
	if(pageLeft >= 1) {
		//如果还有上一页的话
		currentPage = parseInt(currentPage) - 1;
//		alert("currentpage =" + currentPage);
		changeStyle(currentPage - pageLeft);
		changeafter(currentPage - pageLeft);
		var insertPos = document.getElementsByClassName("pageup")[0];
		for(var i = 0; i < count; i++) {
			var li = addsubLi(0, insertPos);
			liStyle(li);
			li.innerHTML = pageLeft - 1;
		}
		//删除右边的
		var lasP;
		for(var i = 0; i < count; i++) {
			lasP = document.getElementsByClassName("pagedown")[0].previousSibling;
			subP.removeChild(lastP);
		}
	} else if(pageNow < 1) {
		alert("没有上一页啦~");
	}
	return currentPage;
}
//首页 
function pageFirst(value) {
	var values = parseInt(value);
	var j = (value >= 9) ? 9 : value;
	pageNow = 1;
	currentPage = 1;
	//先清理掉现有的页数
	var clearP = document.getElementsByTagName("ul")[0];
	var pageArr = document.getElementsByClassName("pagemiddle");
	//如果本来就没有超过9页
	if(value <= 9) {
		//跳转到第一页

	} else {
		for(var i = 0; i < j; i++) {
			var a = pageArr[i].getElementsByTagName("a")[0].innerHTML = i + 1; //重新从第一页开始
			// 			alert(a);
		}
	}
	return pageNow;
}
//最后一页
function pageLast(value) {
	pageNow = value;
	var values = parseInt(value);
	var j = (value >= 9) ? 9 : value;
	var clearP = document.getElementsByTagName("ul")[0];
	var pageArr = document.getElementsByClassName("pagemiddle");
	if(value < 9) {
		//跳转到最后一页
	} else if(j >= 9) {
		for(var i = 0; i < 9; i++) {
			pageArr[i].getElementsByTagName("a")[0].innerHTML = value - (8 - i); //最后一页重新开始
		}
	}
	return pageNow;
}
//初始化
addPage(pageNumber, pageNow);
changeStyle(currentPage - pageLeft);
//监听时间
//下一页
var nextPage = document.getElementsByClassName("pagedown")[0];
nextPage.onclick = function() {
		var pageNow = pageDown(pageNumber);
	}
	//上一页
var frontPage = document.getElementsByClassName("pageup")[0];
frontPage.onclick = function() {
	var pageNow = pageUp();
	//		 	alert(pageNow);
}

//首页
var firstPage = document.getElementsByClassName("pagefirst")[0];
firstPage.onclick = function() {
		pageNow = pageFirst(pageNumber);
		//	 alert(pageNow);
	}
	//尾页
var finalPage = document.getElementsByClassName("pagefinal")[0];
finalPage.onclick = function() {
		pageNow = pageLast(pageNumber);
		//	alert(pageNow);
	}
	//给每个数字加监听, 以最左边的为参照物
function addListenerToPage(currentPage, pageLeft) {
	var returnPageNumber = document.getElementsByClassName("pagemiddle")[currentPage - pageLeft];
	returnPageNumber.onclick = function() {
		return currentPage;
	}
}