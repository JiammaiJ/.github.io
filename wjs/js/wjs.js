$(function(){
	getData();
	initProduct();
})

/*ajax获取图片信息地址，根据屏幕大小动态渲染*/

function getData(){
	/*缓存，判断数据是否存在了*/
	if(window.data){
		render()
	}else{
	 $.ajax({
		type:'get',
		url:'js/data.json',
		dataType:'json',
		success:function(data){
			window.data=data;
			render();		}
	})
	}
}
/*渲染到页面上*/

function render(){
	var flag=$(window).width()>768?true:false;
	var templateDots=template('dots',{info:window.data});
	var templateImgs=template('imgs',{info:window.data,bol:flag});
	$('.wjs_banner .carousel-indicators').html(templateDots);
	$('.wjs_banner .carousel-inner').html(templateImgs);
}

/*监听屏幕尺寸发生改变时，render从新渲染*/
$(window).on('resize',function(){
	var flag=$(window).width()>768?true:false;
	if(!flag){
		render();
	}else{
		render();
	}
})

/*移动端时候的滑动效果*/

var startX=0;
var distance=0;
var isMove=false;

$('.wjs_banner').on('touchstart',function(e){
	startX=e.originalEvent.touches[0].clientX;
	console.log(startX);
}).on('touchmove',function(e){
	moveX=e.originalEvent.touches[0].clientX;
	distance=moveX-startX;
	console.log(distance);
}).on('touchend',function(e){
	/*bootstrap 里面轮播图组件Carsouel 中内置的上一张下一张的方法，通过distance正负值来判断左移和右移*/
	if(Math.abs(distance)>50){
		if(distance>0){
			/*右滑动*/
			$('.wjs_banner .carousel').carousel('prev');
		}else{
			$('.wjs_banner .carousel').carousel('next');
		}
	}
})


/*产品区块在移动端下li放不下，使用iscroll让nav-tabs在移动端时可以滑动
	宽度就是所有li加起来，外面嵌套一个父盒子，父盒子和屏幕宽度保持一致
	ul超出时，overflow:hidden iscorll滑动
*/

function initProduct(){
	//获取所有的li
	var $li=$('.nav-tabs-father .nav-tabs').find('li');
	var width=0;
	var $ul=$('.nav-tabs-father .nav-tabs');
	$li.each(function(i,item){
		width+=$(item).outerWidth(true);
	})
	$ul.width(width);
	//初始化iscroll插件
	new IScroll($('.nav-tabs-father').get(0),{
		scrollX:true,
		scrollY:false,
		click:true
	})
}
