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
				$(".left .left_tab h2 span img").removeClass("imgzheng");
				$(".left .left_tab h2 span img").addClass("imgfu");
				
			}else{
				$(this).next().hide("slow");
				$(".left .left_tab h2 span img").removeClass("imgfu");
				$(".left .left_tab h2 span img").addClass("imgzheng");
			}
		});			

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
		
		
		
		
//		排序
		function big(data){
			for(var i=0;i<data.length;i++){
				for(var j=i+1;j<data.length;j++){
					if(data[i].serial > data[j].serial){  
						var temp = data[i]; 
						data[i] = data[j]; 
						data[j] = temp;    
					}
				}
			}
			
			for(var i=0;i<data.length;i++){
				for(var j=i+1;j<data.length;j++){
					if(data[i].xh > data[j].xh){  
						var temp = data[i]; 
						data[i] = data[j]; 
						data[j] = temp;    
					}
				}
			}
			
			
			$.each(data, function(index,value){
				var trs = "<tr><td>"+data[index].serial+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
				$(".right .big_table table  tbody").prepend(trs);
				var twotrs = "<tr><td>"+data[index].xh+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
				$(".right .twotable table  tbody").prepend(trs);
			});
			
			
			
			$(".right .big_table .table-bordered thead th:eq(0)").click(function(){
				
				
				
				$(".right .big_table .table-bordered tbody").html("");
				
				
				
				
				if(data[0].serial > data[data.length - 1].serial){
					$(this).removeClass("active");
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
						$(".right .big_table table  tbody").prepend(trs);
					});
				}else{
					$(this).addClass("active");
					
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
						$(".right .big_table table  tbody").prepend(trs);
					});
				}
			});
			
			$(".right .twotable .table-bordered thead th:eq(0)").click(function(){
				
				
				
				$(".right .twotable .table-bordered tbody").html("");
				
				
				
				
				if(data[0].xh > data[data.length - 1].xh){
					$(this).removeClass("active");
					for(var i=0;i<data.length;i++){
						for(var j=i+1;j<data.length;j++){
							if(data[i].xh > data[j].xh){  
								var temp = data[i]; 
								data[i] = data[j]; 
								data[j] = temp;    
							}
						}
					}
					$.each(data, function(index,value) {
					var trs = "<tr><td>"+data[index].xh+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
						$(".right .twotable table  tbody").prepend(trs);
						
					});
				}else{
					$(this).addClass("active");
					
					for(var i=0;i<data.length;i++){
						for(var j=i+1;j<data.length;j++){
							if(data[i].xh < data[j].xh){  
								var temp = data[i]; 
								data[i] = data[j]; 
								data[j] = temp;    
							}
						}
					}
					$.each(data, function(index,value) {
					var trs = "<tr><td>"+data[index].xh+"</td><td>"+data[index].abbreviation+"</td><td>"+data[index].name+"</td></tr>";
						$(".right .twotable table  tbody").prepend(trs);
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
		
		
		
		function changeInputlength(cursor) 
		{ 
			var getText=document.getElementById("sousou"); 
			cursor.size=getText.value.length+2; 
		}
})



