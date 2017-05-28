$(function(){
	$("#login").mouseover(function(){
		$(this).addClass("active");
		$("#sign").removeClass("active");
		$("#ul1").show();
		$("#ul2").hide();
		$("#user1").blur();
		$("#pwd1").blur();
	
		$("#user1").val("用户名");
		$("#pwd1").val("密码");
		
		});
	$("#sign").mouseover(function(){
		$("#ul2").show();
		$(this).addClass("active");
		$("#login").removeClass("active");
		$("#ul1").hide();
		$("#user").blur();
		$("#pwd").blur();
		$("#pwd_").blur();
		$("#user").val("用户名");
		$("#pwd").val("密码");
		$("#pwd_").val("确认密码");
		$("#useryz").html("");
		$("#pwdyz").html("");
		$("#pwdyz2").html("");
		
		});
	
	})