$(function(){
	var href=location.search.replace('?','');
	if(location.search){
		$('.mui-btn-primary').on('tap',function(){
			//取表单里面输入的用户名和密码，common里面定义的 serialize
		var user=defaultUserObj();
		//判断登入了 取出缓存中的所有用户名和密码，分默认用户和后面注册保存在
		//缓存里面的用户
		var defaultUser=JSON.parse(localStorage.getItem('defaultUser'));
		var newUser=JSON.parse(localStorage.getItem('newUser')||'[]');
		//判断
		if(!user.username){
			mui.toast('请输入账号');
			return false;
		}
		if(!user.userpassword){
			mui.toast('请输入密码');
			return false;
		}
		var flag=judge(user,defaultUser,newUser);
		if(flag==true){
			mui.toast('登入成功');
			userJudgeTrue();
			history.back();
		}else{
			mui.toast('账号或密码错误');
			return false;
		}
	});
	}else{
		//不是从product页面过来的时候，直接登入界面的情况
		$('.mui-btn-primary').on('tap',function(){
			//取表单里面输入的用户名和密码，common里面定义的 serialize
		var user=defaultUserObj();
		//判断登入了 取出缓存中的所有用户名和密码，分默认用户和后面注册保存在
		//缓存里面的用户
		var defaultUser=JSON.parse(localStorage.getItem('defaultUser'));
		var newUser=JSON.parse(localStorage.getItem('newUser')||'[]');
		//判断
		if(!user.username){
			mui.toast('请输入账号');
			return false;
		}
		if(!user.userpassword){
			mui.toast('请输入密码');
			return false;
		}
		var flag=judge(user,defaultUser,newUser);
		if(flag==true){
			mui.toast('登入成功');
			userJudgeTrue();
			location.href="../index.html"
		}else{
			mui.toast('账号或密码错误');
			return false;
		}
	})
	}
})

function judge(user,defuser,newuser){
	var flag=false;
	if(user.username==defuser.user&&user.userpassword==defuser.password){
		flag=true;
	}
	for(var i=0;i<newuser.length;i++){
		if(user.username==newuser[i].user&&user.userpassword==newuser[i].password){
			flag=true;
		}
	}
	return flag;
}