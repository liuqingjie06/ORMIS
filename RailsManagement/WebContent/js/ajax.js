var req;  
function validate() {  
    //获取表单提交的内容  
    var userName = document.getElementById("userName"); 
    var url="save?email="+escape(userName.value)+"&flag="+new Date();  
   // alert(url);
    //创建一个XMLHttpRequest对象req  
    if(window.XMLHttpRequest) {  
        //IE7, Firefox, Opera支持  
        req = new XMLHttpRequest(); 
    }else if(window.ActiveXObject) {  
        //IE5,IE6支持  
        req = new ActiveXObject("Microsoft.XMLHTTP"); 
    }  
    /* 
     open(String method,String url, boolean )函数有3个参数 
     method参数指定向servlet发送请求所使用的方法，有GET,POST等 
     boolean值指定是否异步，true为使用，false为不使用。 
     我们使用异步才能体会到Ajax强大的异步功能。 
     */  
    req.open("GET", url, true);  
    //onreadystatechange属性存有处理服务器响应的函数,有5个取值分别代表不同状态  
    req.onreadystatechange = callback;  
    
    //send函数发送请求  
    req.send(null);     
}  
  
function callback() {  
    if(req.readyState == 4 && req.status == 200) { 
        var check = req.responseText;  
        show (check);  
    }  
}  
  
function show(str) { 
    if(str == "OK") {  
        var show = "<font color='green'>恭喜，Email可用</font>";  
        document.getElementById("info").innerHTML = show;  
    }  
    else if( str == "NO") {  
        var show = "<font color='red'>对不起，Email不可用</font>";  
        document.getElementById("info").innerHTML = show;  
    }  
}  

