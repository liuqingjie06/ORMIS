function init() {
	hide('lemaildiv');
	hide('lpwddiv');
	check("lemail", "emailmessage");
	check("lpassword", "passwordmessage");
	
   document.getElementById("lemail").value="";
   document.getElementById("lpassword").value="";
   document.getElementById("talkdatacheckbox").checked=true;
	   
	var tmpemail=getCookie("talkdataCookieEmail");
	var tmppassword=getCookie("talkdataCookiePassWord");
	var tmpcheck=getCookie("talkdataCookieCheck");
	if(tmpemail!=null&&tmpemail!=""&&tmppassword!=null&&
	   tmppassword!=""&&tmpcheck!=null&&tmpcheck!=""){
		$("#emailmessage").hide();
		$("#passwordmessage").hide();
	   document.getElementById("lemail").value=tmpemail;
	   document.getElementById("lpassword").value=tmppassword;
	   document.getElementById("talkdatacheckbox").checked=true;
	}
}

function fun1() {
	hide('lemaildiv');
	check("lemail", "emailmessage");
	check("lpassword", "passwordmessage");
}

function fun2() {
	hide('lpwddiv');
	check("lemail", "emailmessage");
	check("lpassword", "passwordmessage");
}

function keyLogin() {
	var event = arguments.callee.caller.arguments[0] || window.event;
	//消除浏览器差异
	if(event.keyCode == 13) {//回车键的键值为13
		login();
		//document.getElementById("input1").click(); //调用登录按钮的登录事件
	}
}

function login() {
	loadShow();
	var vemail = $("#lemail").val();
	var vpassword = $('#lpassword').val();
	var vtimecc = Math.random();

	if(vemail == null || vemail == "") {
		loadHide();
		setDivInfo("lemaildiv", "请输入用户名", 1);
	}

	if(vpassword != null && vpassword != "") {
		hide("lpwddiv");
		var url = basePath + "LoginAction_doLogin.action";
		var params = {
			email : vemail,
			password : vpassword,
			timcc : vtimecc
		};
		//$.post(url, params, callback);
		var form=document.getElementById('loginId');
		form.submit();
	} else {
		loadHide();
		setDivInfo("lpwddiv", "请填写密码", 1);
	}
}

//TODO login.jsp通过ajax向doLogin action发送数据，并在这里返回一个数据。1 0 -1

function callback(data) {	
	loadHide();
	input('lemail','emailmessage');
	//input('lpassword','passwordmessage');
	var vemail = document.getElementById("lemail").value;
	var vpassword = document.getElementById("lpassword").value;
	
   if(document.getElementById("talkdatacheckbox").checked==true){
   		SetCookie("talkdataCookieEmail",vemail);
   		SetCookie("talkdataCookiePassWord",vpassword);
   		SetCookie("talkdataCookieCheck","1");
   }else{
   		delCookie("talkdataCookieEmail");
   		delCookie("talkdataCookiePassWord");
   		delCookie("talkdataCookieCheck");
   }
				   
	if(data == "1") {
		window.location.href = basePath + "loginSuccess.jsp";
	}else if(data == "0"){
		window.location.href = basePath + "LoginAction_doLogin.action";
	}else if(data=="-1"){
		window.location.href = basePath + "LoginAction_doLogin.action";
	}else {
		setDivInfo("lemaildiv", data, 1);
	}
}

function setDivInfo(divid, message, flag) {
	switch(flag) {
		case 1:
			document.getElementById(divid).innerHTML = message;
			break;
		case 2:
			document.getElementById(divid).innerHTML = message;
			break;
		default:
			document.getElementById(divid).innerHTML = emailmessage;
			break;
	}
	document.getElementById(divid).style.display = "block";
}

function loadShow() {
	$('#loading').show();
}

function loadHide() {
	$('#loading').hide();
}

function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30;
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}

function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
}