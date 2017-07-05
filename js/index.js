$(function(){

//	$("header").hover(function(){
//		$('header .two_nav').dropdown('toggle');
//	});
//		
//	
	var hLength = $(".left_tab h2").length;
	for(var i=0;i<hLength;i++){
		if(i<=1){
			$(".left .left_tab h2:eq("+i+")").next().show();
			$(".left .left_tab h2:eq("+i+")").addClass("addbacktwo");
		}
		if(i>1){
			$(".left .left_tab h2:eq("+i+")").next().hide();
			$(".left .left_tab h2:eq("+i+")").addClass("addback");
		}
	}
	

		$(".left .left_tab h2").click(function(){
			if($(this).next().is(":hidden")){
				$(this).next().show("slow");
				$(this).removeClass("addback");
				$(this).addClass("addbacktwo");
			}else{
				$(this).next().hide("slow");
				$(this).removeClass("addbacktwo");
				$(this).addClass("addback");
			}
		});				
			
//		$(".buttons .visible-xs").click(function(){
//			$(".left").toggle();
//		});
		$(".buttons .visible-xs").click(function(){
			var lef = $(".left").position().left;
			if(lef >= 0){
				$(".left").animate({
					left:'-30rem'
				});
			}else{
				$(".left").animate({
					left:0
				});
			};
		});
		
		var offsetLeft,offsetTop,timer,mouse_x,mouse_y,margin_left,margin_top;
		var to_x,to_y;
		function drag(id,type){
			var item=document.getElementById(id);
			document.onmousemove=function(e){
				var e=e||window.event;
				//文档左边缘的鼠标位置
				mouse_x=e.pageX;
				//文档上边缘的鼠标位置
				mouse_y=e.pageY;	
			};
			item.onmousedown=function(){
				// offsetTop以及offsetTop必须要放在mousedown里面，每次都要计算
				//当前对象到他上级的左边距离
				offsetLeft=item.offsetLeft;
				//当前对象到他上级的内边框距离
				offsetTop=item.offsetTop;
				//当前对象到文档的距离
				margin_top=mouse_y-offsetTop;
				margin_left=mouse_x-offsetLeft;
				
				
				timer=setInterval(function(){
					if(timer){
		//				var max_with=800,max_height=600;
						 to_x=mouse_x-margin_left;
						 to_y=mouse_y-margin_top;
		//				 to_x=Math.min(to_x,max_with);
		//				 to_y=Math.min(to_y,max_height);
						if(to_y>=600){
							to_y=600;
						}else if(to_y<=100){
							to_y=100;
						}
						 // 一定要记得加“px"
						 if(type=="x"){
						 	item.style.left=to_x+"px";
						 	document.getElementById("div_wrapper").style.width=to_x+10+"px";
						 	document.getElementById("div_03").style.left=to_x+"px";			 
						 }
						 else if(type=="y"){
						 	item.style.top=to_y+"px";
						 	
						 	document.getElementById("big_table").style.height=to_y+10+"px";	
						 	document.getElementById("lx").style.top=document.getElementById("big_table").style.height+"px";
						 }
						 //默认为上下左右移动
						 else {
						 	item.style.left=to_x+"px";
						 	item.style.top=to_y+"px";
						 	// Style刷新
					 		document.getElementById("div_01").style.left=to_x+"px";
					 		document.getElementById("div_02").style.top=to_y+"px";
					 		document.getElementById("div_wrapper").style.width=to_x+10+"px";
					 		document.getElementById("div_wrapper").style.height=to_y+10+"px";
						 }	 
					}
				},5);
			};
			document.onmouseup=function(){
				clearInterval(timer);
				timer=0;
			}
		}
		drag("lx",'y');	
		
		
		function big(data){
			for(var i=0;i<data.length;i++){
//				console.log(data[i].serial);
				for(var j=i+1;j<data.length;j++){
					if(data[i].serial > data[j].serial){  
						var temp = data[i]; 
						data[i] = data[j]; 
						data[j] = temp;    
					}
				}
			}
			$.each(data, function(index,value) {
				var trs = "<tr><td>"+data[index].serial+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
				$(".right table  tbody").prepend(trs);
			});
			
			
			$(".right table thead th:eq(0)").click(function(){
				
				
				$(".right table tbody").html("");
				
				
				
				
				if(data[0].serial > data[data.length - 1].serial){
					for(var i=0;i<data.length;i++){
						for(var j=i+1;j<data.length;j++){
							if(data[i].serial > data[j].serial){  
								var temp = data[i]; 
								data[i] = data[j]; 
								data[j] = temp;    
							}
						}
					}
					$.each(data, function(index,value) {
					var trs = "<tr><td>"+data[index].serial+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
						$(".right table  tbody").prepend(trs);
					});
				}else{
					for(var i=0;i<data.length;i++){
						for(var j=i+1;j<data.length;j++){
							if(data[i].serial < data[j].serial){  
								var temp = data[i]; 
								data[i] = data[j]; 
								data[j] = temp;    
							}
						}
					}
					$.each(data, function(index,value) {
					var trs = "<tr><td>"+data[index].serial+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
						$(".right table  tbody").prepend(trs);
					});
				}
			});
			
			
		}
		
		
		
		$.ajax({
			url:"data.json",
			type:"GET",
			dataType:'json',
			success:function(data){
				
				big(data);
			}
		});
})



