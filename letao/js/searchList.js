$(function(){
	/*获取传过来的地址栏里面的搜索信息放在搜索栏中*/
	var searchInfo=location.search.replace('?','').split('=');

	var params={};
	params[searchInfo[0]]=searchInfo[1];

	mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
 		scrollX: false, //是否横向滚动
 		startX: 0, //初始化时滚动至x
 		startY: 0, //初始化时滚动至y
 	   	indicators: false, //是否显示滚动条
 		deceleration:0.0006,//阻尼系数,系数越小滑动越灵敏
 		bounce: true //是否启用回弹
	})
	getData(render,params);
	var flag=null;//自定义数据的排序判断，.sort方法传进去
	/*排序的*/
	$('.lt_tab a').on('tap',function(){
		var sortName=$(this).attr('data-id');
		mySort(sortName,true);
		if($(this).hasClass('now')){
			if($(this).find('span').hasClass('fa-angle-down')){
				$(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
				flag=false;
				mySort(sortName,flag);
			}else{
				$(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
				flag=true;
				mySort(sortName,flag);
			}
		}else{
			$(this).addClass('now').siblings().removeClass('now');
		}
	})
	/*搜索重新刷新数据*/
	$('.lt_search a').on('tap',function(){
		var txt=$('.lt_search').find('input').val();
		location.search='?'+txt;
		getData(render);
	})
	/*下拉刷新*/
	mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",
	    down : {
	      callback : function(){
	      	var that=this;
	      	setTimeout(function(){
	      		getData(render);
	      		//排序导航栏重置
	      		$('.lt_tab').find('a').removeClass('now');
	      		$('.lt_tab').find('span').removeClass('fa-angle-up fa-angle-down')
	      		.addClass('fa-angle-down');
	      		//mui('#refreshContainer').pullRefresh().endPulldown(true);
	      		//mui此处坑，停不下来
	      		that.endPulldownToRefresh();
	      	},1500)
	      }
	    },
	    up:{
     		callback:function(){
     			var that=this;
     			setTimeout(function(){
     				$.ajax({
     				type:'get',
     				url:'js/data/pro2.json',
     				data:'',
     				dataType:'json',
     				success:function(data){
     					renderUp(data);
     					//请求成功后传TRUE就是把mui的上啦加载直接关掉
     					//不传还会继续请求pro2,
     					//这里用的假数据，没有更多数据了，所以把上拉直接关掉
     					//以后如果有数据库，可以传入参数请求，停止控件
     					//根据返回的数据长度判断，长度0就关掉。大于0就加载
     					that.endPullupToRefresh(true);
     				}
     			})
     			},1500)
     		}
    	}
	  }
	});

})
function getData(callback,params){
	params=params||{};
	$.ajax({
		type:'get',
		url:'js/data/pro.json',
		data:params,
		dataType:'json',
		success:function(data){
			window.localdata=data;
			callback&&callback(data);
		}
	})
}

function render(data){
	var html=template('firstTemplate',{info:data});
	$('.lt_product').html(html);
}
function renderUp(data){
	var html=template('firstTemplate',{info:data});
	$('.lt_product').append(html);
}

/*ajax请求的数据保存在window.data里面，利用数组的sort方法的内置function排序*/
function mySort(attr,bol){
	localdata.sort(fn(attr,bol));
	render(localdata);
}

/*根据数组对象属性排序，MDN参考*/
function fn(attr,bol){
	return function(obj1,obj2){
		var value1=obj1[attr];
		var value2=obj2[attr];
		if(bol){
			return value1-value2;
		}else{
			return value2-value1;
		}
	}
}
