var theobject = null; //This gets a value as soon as a resize start只要调整大小，就会得到一个值

function resizeObject() {
	this.el        = null; //pointer to the object 指向对象的指针
	this.dir    = "";      //type of current resize (n, s, e, w, ne, nw, se, sw)
	this.grabx = null;     //Some useful values
	this.graby = null;
	this.width = null;
	this.height = null;
	this.left = null;
	this.top = null;
}
	

//Find out what kind of resize! Return a string inlcluding the directions 找出调整的大小！返回一个字符串，在这个方向上
function getDirection(el) {
	var xPos, yPos, offset, dir;
	dir = "";

	xPos = window.event.offsetX;
	yPos = window.event.offsetY;

	offset = 8; //The distance from the edge in pixels

	if (yPos<offset) dir += "n";
	else if (yPos > el.offsetHeight-offset) dir += "s";
	if (xPos<offset) dir += "w";
	else if (xPos > el.offsetWidth-offset) dir += "e";

	return dir;
}


//鼠标按下事件
function doDown() {
	console.log();
	var el = getReal(event.target || event.srcElement, "className", "big_table");

	if (el == null) {
		theobject = null;
		return;
	}		

	dir = getDirection(el);
	if (dir == "") return;

	theobject = new resizeObject();
		
	theobject.el = el;
	theobject.dir = dir;

	theobject.grabx = window.event.clientX;
	theobject.graby = window.event.clientY;
	theobject.width = el.offsetWidth;
	theobject.height = el.offsetHeight;
	theobject.left = el.offsetLeft;
	theobject.top = el.offsetTop;

	window.event.returnValue = false;
	window.event.cancelBubble = true;
}


//鼠标抬起事件
function doUp() {
	if (theobject != null) {
		theobject = null;
	}
}


//鼠标移动到元素上时触发
function doMove() {
	var el, xPos, yPos, str, xMin, yMin;
	xMin = 8; //The smallest width possible
	yMin = 8; //             height

	el = getReal(event.target || event.srcElement, "className", "big_table");

	if (el.className == "big_table") {
		str = getDirection(el);
	//Fix the cursor	
		if (str == "") str = "default";
		else str += "-resize";
		el.style.cursor = str;
	}
	
	
	
	
//Dragging starts here   从这里开始
	if(theobject != null) {
//		if (dir.indexOf("e") != -1)
//			theobject.el.style.width = Math.max(xMin, theobject.width + 
//
//			window.event.clientX - theobject.grabx) + "px";
	
		if (dir.indexOf("s") != -1)
			var hei = Math.max(yMin, theobject.height + window.event.clientY - theobject.graby);
			if(hei>600){
				hei = 600;
			}else
			if(hei<100){
				hei = 100;
			}
			console.log(hei);
			theobject.el.style.height = hei+ "px";

//		if (dir.indexOf("w") != -1) {
//			theobject.el.style.left = Math.min(theobject.left + 
//
//			window.event.clientX - theobject.grabx, theobject.left + theobject.width - xMin) + 
//			
//			"px";
//			theobject.el.style.width = Math.max(xMin, theobject.width - 
//
//			window.event.clientX + theobject.grabx) + "px";
//		}
//		if (dir.indexOf("n") != -1) {
//			theobject.el.style.top = Math.min(theobject.top + 
//
//			window.event.clientY - theobject.graby, theobject.top + theobject.height - yMin) + 
//			
//			"px";
//			theobject.el.style.height = Math.max(yMin, theobject.height - 
//
//			window.event.clientY + theobject.graby) + "px";
//		}
		
		window.event.returnValue = false;
		window.event.cancelBubble = true;
	} 
}


function getReal(el, type, value) {
	temp = el;
	while ((temp != null) && (temp.tagName != "BODY")) {
		if (eval("temp." + type) == value) {
			el = temp;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}




//鼠标按下事件
document.onmousedown = doDown;
//鼠标松开触发事件
document.onmouseup   = doUp;
//鼠标移动到元素上时触发
document.onmousemove = doMove;