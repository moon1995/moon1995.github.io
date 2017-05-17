$(function(){
	$("#login").mouseover(function(){
		$(this).addClass("active");
		$("#sign").removeClass("active");
		$("#ul1").show();
		$("#ul2").hide();
		if($("#user1").val()=="" && $("#pwd1").val()==""){
		$("#user1").val("用户名");
		$("#pwd1").val("密码");
			}
		});
	$("#sign").mouseover(function(){
		$("#ul2").show();
		$(this).addClass("active");
		$("#login").removeClass("active");
		$("#ul1").hide();
		if($("#user").val()=="" && $("#pwd").val()==""&& $("#pwd_").val()==""){
		$("#user").val("用户名");
		$("#pwd").val("密码");
		$("#pwd_").val("确认密码");
		$("#useryz").html("");
		$("#pwdyz").html("");
		$("#pwdyz2").html("");
		}
		});
	
	})