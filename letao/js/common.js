//设置判断是否登入的本地缓存
$(function(){
	setDefaultUser();
})

function userJudge(){
	return localStorage.getItem('userLogin');
}

function setDefaultUser(){
	localStorage.setItem('defaultUser','{"user":11111,"password":11111}');
}

function defaultUserObj(){
	var userInfo=$('form').serialize().split('&');
	var obj={};
	userInfo.forEach(function(item,i){
		var itemArr=item.split('=');
		obj[itemArr[0]]=itemArr[1];
	})
	return obj;
}
function userJudgeTrue(){
	localStorage.setItem('userLoginTrue','1');
}