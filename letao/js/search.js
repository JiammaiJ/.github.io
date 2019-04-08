$(function(){

	//坑，a标签阻止默认事件跳转要要和click一起使用，但是移动端click点击事件会有200ms延迟
	//用zepto等移动端的tap或者原生的touch判断点击事件时，return false阻止不了a的跳转
	$('#abtn').on('click',function(e){
		var txt=$('#userSearch').val();
		if(txt.length!=0){
			var his=localStorage.getItem('userSearch')||'[]';
			var obj={his:txt};
			var hisArr=JSON.parse(his);
			hisArr.unshift(obj);
			localStorage.setItem('userSearch',JSON.stringify(hisArr));
			location.href='searchList.html?key='+txt;
		}else{
			mui.toast('请输入关键字');
			return false;
		}
		$('#userSearch').val('');
	})
})
function render(){
	if(localStorage.getItem('userSearch')==null){
		return false;
	}
	var data=JSON.parse(localStorage.getItem('userSearch'));
	var html=template('firstTemplate',{res:data});
	$('.lt_history ul').html(html);
}
render();

/*删除历史记录*/

	$('#del').on('tap',function(){
		localStorage.removeItem('userSearch');
		$('.lt_history ul').html('');
	})

