window.onload=function(){
	topOpacity()
	banner();
	downTime();
}


/*顶部固定栏滑动透明度渐变*/
function topOpacity(){
		//改变透明度的盒子
	var opacity=document.querySelector('.box');
		//卷曲出去的高度范围，banner图的高度
	var height=document.querySelector('.jd_banner ul:first-child').offsetHeight;
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop;
		var op=scrollTop/height;
		if(op<=.85){
			opacity.style.background='rgba(201,21,35,' + op + ')';
		}else{
			opacity.style.background='rgba(201,21,35,.85)';
		}
	}
}

function banner(){
	var imageBox=document.querySelector('.jd_banner ul:first-child');
	var dotlists=document.querySelector('.jd_banner ul:last-child').querySelectorAll('li');
	var imglists=imageBox.querySelectorAll('li');
	var width=imglists[0].offsetWidth;
	//重构重复的添加，移除和设置距离
	function addTransition(){
		imageBox.style.transition='all .5s linear';
		imageBox.style.webkitTransition='all .5s linear';
	}
	function removeTransition(){
		imageBox.style.transition='none';
		imageBox.style.webkitTransition='none';
	}
	function moveTranslateX(translateX){
		imageBox.style.transform='translateX('+translateX+'px)';
		imageBox.style.webkitTransform='translateX('+translateX+'px)';
	}
	//自动轮播
	//索引index控制 translateX控制移动距离
	var index=1;
	var translateX=0
	//定时器
	var timer=setInterval(function(){
		index++;
		translateX=-index*width;
		addTransition();
		moveTranslateX(translateX);
	},2000)

	//添加transitionend事件，判断index的值，如果到了最后一张，清除动画，并且马上定位到第一张图片
	imageBox.addEventListener('transitionend',function(){
		if(index>=9){
			index=1;
			translateX=-index*width;
			removeTransition();
			moveTranslateX(translateX);
		}else if(index==0){
			index=8;
			translateX=-index*width;
			removeTransition();
			moveTranslateX(translateX);
		}
		dotChange();
	},false)
	//小点的切换背景颜色切换
	function dotChange(){
		for(var i=0;i<dotlists.length;i++){
			dotlists[i].classList.remove('white');
		}
		dotlists[index-1].classList.add('white');
	}

	//添加触摸事件
	//定义触摸开始时的坐标点，触摸滑动时的坐标点，并且让imageBoxs随着移动，移动时先清除动画效果
	//移动的距离要加上前面根据Index索引移动的距离
	var disStart=0;
	var disMove=0;
	var distance=0;
	imageBox.addEventListener('touchstart',function(e){
		//触摸事件开始时，清楚轮播
		clearInterval(timer);
		disStart=e.touches[0].clientX;
	},false)
	imageBox.addEventListener('touchmove',function(e){
		disMove=e.touches[0].clientX;
		distance=disMove-disStart
		translateX=distance+(-index*width);
		removeTransition();
		moveTranslateX(translateX);
	},false)
	imageBox.addEventListener('touchend',function(e){
		//结束的时候需要判断，如果移动的距离大于宽度的1/3，判断distance的正负值
		//正的就要左边动，负 的就向右边
		if(Math.abs(distance)>=width/3){
			if(distance>0){
				index--;
			}else{
				index++;
			}
			addTransition();
			moveTranslateX(-index*width);
		}else{
			addTransition();
			moveTranslateX(-index*width);
		}
		timer=setInterval(function(){
		index++;
		translateX=-index*width;
		addTransition();
		moveTranslateX(translateX);
	   },2000)
	},false)
}

/*倒计时*/
var downTime = function () {
    /*1.每一秒改变当前的时间*/
    /*2.倒数计时  假设 4小时*/
    var time = 4 * 60 * 60;
    var spans = document.querySelectorAll('.time span');

    var timer = setInterval(function () {
        time --;
        /*格式化  给不同的元素html内容*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    }, 1000)
}