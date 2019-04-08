$(function(){
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
 		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: false, //是否显示滚动条
		deceleration:0.0006,//阻尼系数,系数越小滑动越灵敏
		bounce: true//是否启用回弹
	})
	getData(render);
	getData2(render2);
	$('.lt_slideLeft ul').on('tap','a',function(){
		var index=$(this).parent().index();
		if($(this).parent().hasClass('now')){
			return false;
		}else{
			getData2(render2,index);
			$(this).parent().addClass('now').siblings().removeClass('now');
		}
	})
})

function getData(callback){
	$.ajax({
		type:'get',
		url:'js/categroy1.json',
		data:'',
		dataType:'json',
		success:function(data){
			callback&&callback(data);
		}

	})
}
function getData2(callback,index){
		index=index||0;
		$.ajax({
		type:'get',
		url:'js/data/d'+index+'.json',
		data:'',
		dataType:'json',
		success:function(data){
			callback&&callback(data);
		}
	})
}
function render(data){
	var html=template('firstTemplate',{info:data});
	$('.lt_slideLeft ul').html(html);
}
function render2(data){
	var html=template('secondTemplate',{info:data});
	$('.lt_slideRight ul').html(html);
}
