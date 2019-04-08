$(function(){
	mui('.mui-scroll-wrapper').scroll({
 		indicators: false //是否显示滚动条
	});
	mui.init({
	  	pullRefresh : {
	    	container:"#refreshContainer",
	    	down : {
	    		auto:true,
	     	 	callback : function(){
	     	 		var that=this;
	     	 		setTimeout(function(){
	     	 			getData(render);
	     	 			$('.lt_pay span').text('');
	     	 			that.endPulldownToRefresh();
	     	 		},1500)
	     	 	}
	   		}
		}
	})
	$('.fa-refresh').on('tap',function(){
		mui('#refreshContainer').pullRefresh().pulldownLoading();
		$('.lt_pay span').text('');
	})
	$('.mui-table-view').on('change','.btn',function(){
		$('.lt_pay span').text(getSum());
	})
	$('.lt_pay a').on('tap',function(){
		mui.toast('很烦，后面的以后想起来了在写');
	})
})
function getData(callback){
	var cartData=JSON.parse(localStorage.getItem('userCart'))||[];
	callback&&callback(cartData);
}
getData(render);

function render(data){
	$('.mui-table-view').html(template('firstTemplate',{res:data}));
}
function getSum(){
	var checkbox=$('.mui-table-view').find('[type=checkbox]:checked');
	var sum=0;
	checkbox.each(function(i,item){
		var price=$(item).siblings('.price').text().slice(1);
		var num=$(item).siblings('.num').text().slice(1);
		sum+=price*num;
	})
	return sum;
}