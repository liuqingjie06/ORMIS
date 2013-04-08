// JavaScript Document
function checkLen(val,field,obj)
        {
	        	var len = 0;   
				    for (var i=0; i<val.length; i++) {   
				        if (val.charCodeAt(i)>127 || val.charCodeAt(i)==94) {   
				            len += 2;   
				        } else {   
				            len ++;   
				        }   
				    }
        		var lennum=field;
						if(len<=lennum)
						{
							return true;
						}
						try 
				    { 
				        obj.focus();
				    } 
				    catch(ex)
				    { 
				        
				    } 
						alert("文本输入过长");
						return false;
        }
        
//验证是否为数字格式
function isNumber(str,obj)
{
	if(str==null||str=="")
	{
		return true;
	}
	var intnum=/^[0-9]{0,}$/;
	if(intnum.test(str))
	{
		return true;
	}else
	{
		var num = /^[0-9]+(.[0-9]{1,10})$/;
		if(num.test(str))
		{
			return true;
		}else
		{
			try 
	    { 
	        obj.focus();
	    } 
	    catch(ex)
	    { 
	        
	    } 
			alert("输入的格式错误，只能输入数字或小数，如3.333");
			return false;
		}
	}
	
}


//验证是否为数字格式
function isNumberInt(str,obj)
{
	if(str==null||str=="")
	{
		return true;
	}
	var intnum=/^(-)?[0-9]+\d*$/;
	if(intnum.test(str))
	{
		return true;
	}else
	{
			alert("输入的格式错误，只能输入整数");
			return false;
	}
	
}

function isInteger(str){
	if(str==null||str=="")
	{
		return false;
	}
	var intnum=/^[0-9]{0,}$/;
	if(intnum.test(str))
	{
		return true;
	}else
	{
			return false;
	}
}

function isFloat(str){
	if(str==null||str=="")
	{
		return false;
	}
	var intnum=/^[0-9]+(.[0-9]{1,10})$/;
	if(intnum.test(str))
	{
		return true;
	}else
	{
			return false;
	}
}

//验证是否为电子信箱格式
function isEmail(str1,obj)
{
	if(str1==null||str1=="")
	{
		return false;
	}
	var str=str1.replace(/(^\s*)|(\s*$)/g,"");
	//var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

	if(myreg.test(str))
	{
		return true;
	}else
	{
		return false;
	}
}

//验证是否为电子信箱格式
function isEmailanother(value){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(myreg.test(value)){
		return true;
	}else{
		return false;
	}
}

//验证是否为手机号码格式
function isMobileTel(phone,obj)
{
	if(phone==null||phone=="")
	{
		return true;
	}
	var my = false;
	var reg0 = /^13\d{9}$/;
	var reg1 = /^15\d{9}$/;
	var reg2= /^18\d{9}$/;
	if (reg0.test(phone))
	{
		my=true;
	}
	else if (reg1.test(phone)){
		my=true;
	}else if(reg2.test(phone)){
		my=true;
	}
	else{
		my=false;
	}
	return my;
}

//第二种检查是否为手机号格式
function isMobel(value){
	if(/^13\d{9}$/g.test(value)||(/^15[0-35-9]\d{8}$/g.test(value))|| (/^18[05-9]\d{8}$/g.test(value))){
		 return true; 
	}
	else{ 
		return false;
	 }
}


//验证姓名
function isName(value){
	var myreg=/^[a-zA-Z0-9]{4,30}$/;
	if(myreg.test(value)){
		return true;
	}else{
		return false;
	}
}

//验证联系人
function isContact(value){
	var myreg=/^[a-z | A-Z | 0-9 | \u4e00-\u9fa5]{1,16}$/;
	if(myreg.test(value)){
		return true;
	}else{
		return false;
	}
}

//验证公司
function isCompany(value){
//	var myreg=/^[a-z | A-Z | 0-9 | \u4e00-\u9fa5]{1,50}$/;
	if(value.length<51){
		return true;
	}else{
		return false;
	}
}

//验证是否为QQ
function isQQ(value){
	var myreg=/^[1-9]\d{4,12}$/;
	if(myreg.test(value)){
		return true;
	}else{
		return false;
	}
}

//MSN校验
function isMSN(value){
	var myreg=/^\w+@hotmail\.com$/;
	if(myreg.test(value)){
		return true;
	}else{
		return false;
	}
}

//验证是否为电话号码格式
function isTelphone(phone,obj)
{
	if(phone==null||phone=="")
	{
		return true;
	}
	//var myreg = /^(\d{3,4}(-)?)?\d{7,9}$/g;
	var myreg = /^(\d{3,4}(-)?)?(\d{7,9}(-)?)(\d{3,4})?$/g;
	if(myreg.test(phone))
	{
		return true;
	}else
	{
		//alert("输入格式错误应输入333-1234567或1234-123456789");
		alert("固定电话格式错误，规则:7位或8位或9位电话号码；3位或4位区号-7位或8位或9位电话号码；3位或4位区号-7位或8位或9位电话号码-3位或4位分机号；3位或4位区号7位或8位或9位电话号码");
		return false;
	}
}
//按字节计算字符串长度
function  getByteLen(str)   
{   
  var   l   =   str.length;   
  var   n   =   l;   
  for   (   var   i=0;   i<l;   i++   )   
  if   (   str.charCodeAt(i)<0   ||   str.charCodeAt(i)>255   )   
  n++;   
  return  n   
} 

String.prototype.Trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

function subdatestring(val)
{
	return val.substring(0,10);
	}

function dateCompare(sdate,edate){
	if(sdate!=null&&sdate!=""&&edate!=null&&edate!=""){
		var dt1=new Date(Date.parse(sdate));
	    var dt2=new Date(Date.parse(edate));
	    if(dt1>dt2){//比较日期
	        alert("开始日期不能晚于结束日期!");
	        return false;
	    }
	}
	return true;
}

function CheckDate(SparaDate,obj)
 { 
 				
     var strYMDSP = 0; 
     var strYMD;
     
     SparaDate=subdatestring(SparaDate);
     if(SparaDate=="1970-01-01")
     {
     		alert("输入日期格式错误或输入时间小于最低时间值“1970-1-2”，需要输入yyyy-mm-dd 如2010-1-1"); 
           		return false;
     	}
     
     //判断YYYYMMDD中的分隔符号 不是- 或/报错     
      if (!(SparaDate.substr(4,1)=="-"))
      { 
          if(!(SparaDate.substr(4,1)=="/"))
           {
           		alert("输入日期格式错误，需要输入yyyy-mm-dd 如2010-1-1"); 
           		return false;   
           	}
       }            
         
     var strYear = SparaDate.substr(0,4);
     SparaDate   = SparaDate.substr(5,SparaDate.length-5);
          
    //去掉年后的字符串   
    for (i=0;i<SparaDate.length;i++)
    {
        if (SparaDate.substr(i,1)=="-") 
        {
           strYMDSP = i;
           break;
        }
       if (SparaDate.substr(i,1)=="/") 
       {
          strYMDSP = i;
          break;
       }
    }         
   //剩下的字符串中没有-或/报错   
    if  (strYMDSP<1)
    {
    	alert("输入日期格式错误，需要输入yyyy-mm-dd 如2010-1-1"); 
       return false;
    }
    return true;
 }

 //体积相关的校验
function isVolume(str,obj)
{
	if(str==null||str=="")
	{
		return true;
	}
	var strTemp = null;
	if(str.indexOf("*") == -1 && str.indexOf("×") == -1){
		alert("体积格式错误！");
		return false;
	}else{		
		if(str.indexOf("*") != -1)
			strTemp = str.split("*");
		else
			strTemp = str.split("×");
	}
	for(i=0;i<strTemp.length;i++){
		var str0 = strTemp[i];
		
		var intnum=/^[0-9]{0,}$/;
		if(intnum.test(str0))
		{
			return true;
		}else
		{
			var num = /^[0-9]+(.[0-9]{1,3})$/;
			if(num.test(str0))
			{
				return true;
			}else
			{
				try
			    { 
			        obj.focus();
			    } 
			    catch(ex)
			    { 
			        
			    } 
				alert("输入的格式错误，只能输入数字或小数，如3.333");
				return false;
			}
		}
	}
}

function lastimgname(filepath)
{
 //获取欲上传的文件路径

//为了避免转义反斜杠出问题，这里将对其进行转换
var re = /(\\+)/g;  
var filename=filepath.replace(re,"#"); 
//对路径字符串进行剪切截取
var one=filename.split("#"); 
//获取数组中最后一个，即文件名
var two=one[one.length-1]; 
//再对文件名进行截取，以取得后缀名
var three=two.split("."); 
 //获取截取的最后一个字符串，即为后缀名
var last=three[three.length-1];
//添加需要判断的后缀名类型
var tp ="jpg|gif|png|bmp"; 
//返回符合条件的后缀名在字符串中的位置
var rs=tp.indexOf(last); 
//如果返回的结果大于或等于0，说明包含允许上传的文件类型
if(rs>=0){
 return true;
 }else{
	 alert("您选择的上传文件格式错误！");
 return false;
  }
}

function lastswfname(filepath)
{
 //获取欲上传的文件路径

//为了避免转义反斜杠出问题，这里将对其进行转换
var re = /(\\+)/g;  
var filename=filepath.replace(re,"#"); 
//对路径字符串进行剪切截取
var one=filename.split("#"); 
//获取数组中最后一个，即文件名
var two=one[one.length-1]; 
//再对文件名进行截取，以取得后缀名
var three=two.split("."); 
 //获取截取的最后一个字符串，即为后缀名
var last=three[three.length-1];
//添加需要判断的后缀名类型
var tp ="flv"; 
//返回符合条件的后缀名在字符串中的位置
var rs=tp.indexOf(last); 
//如果返回的结果大于或等于0，说明包含允许上传的文件类型
if(rs>=0){
 return true;
 }else{
 alert("您选择的上传文件格式错误！");
 return false;
  }
}

 function intTotime(value){
 		var param=parseInt(value);
 	 	var  str;
		if(param==0){
			return "00:00";
		}
		var hour=parseInt(param/3600);
		var min=parseInt((param%3600)/60);
		var sec=parseInt((param%3600)%60);
		var hours;
		var mins;
		var secs;
		if(hour<10){
			hours="0"+hour;
		}else{
			hours=hour+"";
		}
		if(min<10){
			mins="0"+min;
		}else{
			mins=min+"";
		}
		if(sec<10){
			secs="0"+sec;
		}else{
			secs=sec+"";
		}
		if(hours=="00"){
			str=mins+":"+secs;
		}else{
			str=hours+":"+mins+":"+secs;
		}
		return str;
  }
  
  function timeToInt(time){
  	var hour=0;
  	var min=0;
  	var second=0;
  	var index=time.indexOf(":");
  	var last=time.lastIndexOf(":");
  	if(index==last){
  		min=parseInt(time.substring(0,index));
  		second=parseInt(time.substring(index+1));
  	}else{
  		hour=parseInt(time.substring(0,index));
  		min=parseInt(time.substring(index+1,last));
  		second=parseInt(time.substring(last+1));
  	}
  	return hour*3600+min*60+second;
  }
  
  function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30;
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
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
    if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();
}