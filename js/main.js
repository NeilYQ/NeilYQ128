

var headerHeight = 60;




window.onload = function(){

	//重定义样式
	init();
	

	//侧边栏控制
	sidebar_triger.onclick = function(){
		openSideBar(1);
	}
	mask.onclick = function(){
		openSideBar(0);
	}

	 /*滚动注册事件*/
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', ss, false);
    }//W3C  
    window.onmousewheel = document.onmousewheel = ss; //IE/Opera/Chrome/Safari 


    //pagination点击事件
	var pagination = document.getElementsByClassName("pagination");
	var minContent = document.getElementById("content").getElementsByClassName("boxContent");
	
	//pagination点击事件
	for (var i=0;i<pagination.length ;i++){  
		//闭包式
	    (function(){      
	   		var temp=i;  
	        pagination[temp].onclick=function(e){  
				pageSwitch(temp);
	        }  
	    })();  

	    /*
	    pagination[temp].onclick=(function(arg){  
	        return function(){  
	            console.log(arg);  
	            };  
	    })(i);  
	    */
	} 
}

//css重定位
function init(){
	//内容高度
	var content = document.getElementById('content');
	content.style.height = window.innerHeight-headerHeight;
	
	//boxContnet
	var  minContent = document.getElementById("content").getElementsByClassName("boxContent");
	for(var i=0 ; i<minContent.length ; i++){
		minContent[i].style.left = window.innerWidth*i;
		minContent[i].style.display = "block";
	}
	//pagination的创建与添加
	var pagination = document.getElementsByClassName("pagination");
	var item = document.getElementById("SumPagination");
	var count = document.getElementById("content").getElementsByClassName("boxContent").length;
	for(var i=1 ; i<count ; i++){
		var oo = document.createElement("div");
		oo.className = "pagination";
		item.appendChild(oo);
	}
	item.style.left = (window.innerWidth - item.offsetWidth )/2;
	pagination[0].style.backgroundColor = 'rgba(244,67,54,1)';
}

//侧边菜单栏控制
function openSideBar(type){
	//侧边栏
	var sidebar = document.getElementById('sidebar');
	sidebar.style.right = type==1 ? 0 : -300;
	//遮幕
	var mask = document.getElementById('mask');
	mask.style.display = type==1 ? 'block' : 'none';
}

//滚动事件转换页面
var m=0;
var ss = function mouseScoll(e){
	
	var minContent = document.getElementById("content").getElementsByClassName("boxContent");
	var pagination = document.getElementById("SumPagination").getElementsByClassName("pagination");

	var contentArray = new Array();
	for(var i=0 ; i<minContent.length ; i++){
		contentArray.push(minContent[i]);
	}

	var firstMsg =contentArray[m];
	var secondMsg = contentArray[m+1];
	var thirdMsg = contentArray[m+2];

	if(e.wheelDelta<0){
		if(secondMsg.offsetLeft <=0){
			firstMsg.style.left = -window.innerWidth*2;
			secondMsg.style.left = -window.innerWidth;
			thirdMsg.style.left = 0;

			for(var i=0 ; i<minContent.length ; i++){
				if(m+2 == i){
					pagination[i].style.backgroundColor = 'rgba(244,67,54,1)';
				}else{
					pagination[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
				}
			}
			//box数组推进
			if(m+2 != contentArray.length-1){
				m++;
			}
		}else{
			firstMsg.style.left = -window.innerWidth;
			secondMsg.style.left = 0;
			thirdMsg.style.left = window.innerWidth;

			for(var i=0 ; i<minContent.length ; i++){
				if(m+1 == i){
					pagination[i].style.backgroundColor = 'rgba(244,67,54,1)';
				}else{
					pagination[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
				}
			}
		}
	}else{
		if(secondMsg.offsetLeft < 0){
			firstMsg.style.left = -window.innerWidth;
			secondMsg.style.left = 0;
			thirdMsg.style.left = window.innerWidth;

			for(var i=0 ; i<minContent.length ; i++){
				if(m+1 == i){
					pagination[i].style.backgroundColor = 'rgba(244,67,54,1)';
				}else{
					pagination[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
				}
			}
		}else{
			firstMsg.style.left = 0;
			secondMsg.style.left = window.innerWidth;
			thirdMsg.style.left = window.innerWidth*2;

			for(var i=0 ; i<minContent.length ; i++){
				if(m == i){
					pagination[i].style.backgroundColor = 'rgba(244,67,54,1)';
				}else{
					pagination[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
				}
			}
			//box数组推进
			if(m != 0){
				m--;
			}
		}

	}
}

//pagination点击事件
var paginationIndex = 0;
function pageSwitch(jj){
	
	var minContent = document.getElementById("content").getElementsByClassName("boxContent");
	var pagination = document.getElementsByClassName("pagination");

	if(paginationIndex<jj){
		for(var i=0 ; i<jj ; i++){
			minContent[i].style.left = -window.innerWidth;
			minContent[i+1].style.left = 0;

			pagination[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
			pagination[i+1].style.backgroundColor = 'rgba(244,67,54,1)';
		}
	}
	if(paginationIndex>jj){
		for(var i=paginationIndex ; i>jj ; i--){
			minContent[i].style.left = window.innerWidth;
			minContent[i-1].style.left = 0;

			pagination[i].style.backgroundColor = 'rgba(0,0,0,0.5)';
			pagination[i-1].style.backgroundColor = 'rgba(244,67,54,1)';
		}
	}
	//上一次移动坐标
	paginationIndex=jj;
}