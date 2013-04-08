// JavaScript Document
//将数字按3位以逗号隔开
function fmoney(s, n)  {  
	if(s==null||s==""){
		return "";
	}
   n = n >0 && n <= 20 ? n : 2;  
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
   var l = s.split(".")[0].split("").reverse(),  
   r = s.split(".")[1];  
   t = "";  
   for(i = 0; i < l.length; i ++ )  
   {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
   }  
   return t.split("").reverse().join("") ;  
} 

function dataFix(tmp,num){
	var result;
	var data=tmp+"";
	 if(data.indexOf(".")!=-1){
	 	result=data.substring(0,data.indexOf(".")+num+1);  
	 }else{
	 	result=data+".0";
	 }
	 return result;
}

//y轴数据统一为数字，例如4k-->4000
function yStyleNum(num){
	var num=num.toString();
	if(num==null||num==""){
		return 0;
	}
	if(num.indexOf("k")!=-1){
		return num.substring(0,num.length-1)*1000;
	}else{
		return num;
	}
}

//返回里程碑的框框中内容
function getMilePostContent(object,tmpnum){
	var text=object.text;
	var textcallback="";
	if(text==null||text==""){
		textcallback="";
	}else if(text.indexOf("&&**")==-1){
		textcallback= text+'<b>';
	}else{
		var textarray=text.split("&&**");
		for(var i=0;i<textarray.length;i++){
			textcallback+=textarray[i];
		}
	}
	return textcallback;
}

//里程碑是否显示更多
function showtext(num){
	document.getElementById("showtext"+num).style.display="none";
	document.getElementById("showmoretext"+num).style.display="block";
}


function JsonMarkerBean() {
            this.enable = false;
            this.symbol = '';
            this.radius=0;
}

function JsonDataBean() {
            this.text = '';
            this.jsonid = 0;
            this.y=0;
            this.marker =new JsonMarkerBean();
}

function ajaxRequest(url,params,callback){
	$.ajax({
	 	   dataType:"json",
		   url: url,
		   data : params,
		   timeout:180000,
		   error: function (XMLHttpRequest, textStatus, errorThrown) {
		   	   if(textStatus=="timeout"){
		   	   	 alert("sorry,something is wrong,detail is :"+textStatus);
		   	   }
			},
		   success: callback
	}); 
}