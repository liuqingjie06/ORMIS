//数据排序
function datasort(id,def,row){
	var row=row  ||  "";
			if (row)row ="."+row;
		var datasortID=$(id+" thead th"+row);
	for(i=0; i<datasortID.length; i++){
		jQuery(datasortID[i]).attr("onclick","datasortonclick('"+i+"','"+id+" thead th"+row+"')");
		(function(a){
			jQuery(datasortID[a]).mouseover(function(){
				jQuery(datasortID[a]).css({"color":"#28A7E1"});
			})
			jQuery(datasortID[a]).mouseout(function(){
				jQuery(datasortID[a]).css({"color":""});
			})
		})(i);
		
		
	}
	if(!jQuery(datasortID[def]).children("div").html()){
		var divhtml=jQuery(datasortID[def]).html();
		jQuery(datasortID[def]).html("<div style='position:relative'>"+divhtml+"</div>");
	}
	jQuery(datasortID[def]).children("div").append("<font style='position:absolute; top:-2px; font-size:15px;' id='Psort"+def+"'>&nbsp;↓</font>");	
}
	


function datasortonclick(e,datasortth){
	var datasort=$(datasortth);
	if(!jQuery(datasort[e]).children("div").html()){
		var divhtml=jQuery(datasort[e]).html();
		jQuery(datasort[e]).html("<div style='position:relative'>"+divhtml+"</div>");
	}
	var datasortdiv=jQuery(datasort[e]).children("div");
	var datasortfontID=datasortdiv.children("font").attr("id");
	jQuery(datasort).children("div").children("font").remove();
	if(datasortfontID){
		if(datasortfontID==='Isort'+e){
			datasortdiv.append("<font style='position:absolute; top:-2px; font-size:15px;' id='Psort"+e+"'>&nbsp;↓</font>");
		}else{
		datasortdiv.append("<font style='position:absolute; top:-2px; font-size:15px;' id='Isort"+e+"'>&nbsp;↑</font>");
	}
	}else{
		datasortdiv.append("<font style='position:absolute; top:-2px; font-size:15px;' id='Isort"+e+"'>&nbsp;↑</font>");
	}
	
}

//class类名获取元素
function $Class(classNames,context){
	context=context||document;
	if(context.getElementsByClassName){
		return context.getElementsByClassName(classNames);
	}
	var nodes=context.getElementsByTagName("*"),
		ret=[];
	for(var i = 0; i<nodes.length; i++){
		if(hasClass(nodes[i],classNames)) ret.push(nodes[i]);
	}
	return ret;
}
function hasClass(nodes,classNames){
	var names=nodes.className.split(/\s+/);
	for(var i=0; i<names.length;i++){
		if(names[i]==classNames)return true;
		return false;
	}
}

//导航效果
function menu(e,mid,mcol){
		var menuaid=jQuery(e).attr("id");
		var menudisplay=$('#'+mid).parent().children("ol").css("display");
		var menuoldisplay=$('#'+mcol).parent().children("ol").css("display");
		if(mid===menuaid){
			jQuery(e).attr("id",mcol);
			if(menudisplay==="block"){
				$("#"+mid+"ol").slideUp();
			}else{
				$("#"+mid+"ol").slideDown();
			}
		}else{
			jQuery(e).attr("id",mid);
			if(menuoldisplay==="block"){
				$("#"+mid+"ol").slideUp();
			}else{
				$("#"+mid+"ol").slideDown();
			}
		}
	}
function ptrbg(e) {
	$("#" + e.data.id).addClass("bgbulle");
	$("#" + e.data.id).mouseout(function() {
		$("#" + e.data.id).removeClass("bgbulle");
	});
}

function setthwidth(id, ftdt) {
	var tdt = $("#" + id + " .tdtxtwidth");
	var pwidth = $(tdt[1]).parent().parent().parent().parent().parent().parent().parent().width();
	for(var i = 0; i < tdt.length; ) {
		for(var j = 0; j < ftdt.length; j++) {
			jQuery(tdt[i]).width(pwidth * ftdt[j]);
			i++;
		}
	}
}

function ctrbg(e) {
	if(!$('#' + e.data.id).hasClass('cbgbulle')) {
		$('#' + e.data.id).parent().children().removeClass('cbgbulle');
		$('#' + e.data.id).removeClass('bgbulle').addClass('cbgbulle');
	} else {
		$('#' + e.data.id).removeClass('cbgbulle');
	}
}

function highlight(id) {
	var nTrs = $('#' + id + ' tbody tr');
	for(var i = 0; i < nTrs.length; i++) {
		nTrs[i].id = id + "tr" + i;
		$('#' + id + 'tr' + i).unbind("mouseover", ptrbg);
		$('#' + id + 'tr' + i).unbind("click", ctrbg);
		$('#' + id + 'tr' + i).bind("mouseover", {
			id : id + "tr" + i
		}, ptrbg);
		$('#' + id + 'tr' + i).bind("click", {
			id : id + "tr" + i
		}, ctrbg);
	}
	f = initwidth(id);
	setdivwidth(f);
}

function initwidth(id) {
	var tdtxt = $(".tdtxtwidth");
	var initf = tdtxt;
	var pwidth = $(tdtxt[1]).parent().parent().parent().parent().parent().parent().parent().parent().width();
	for(var i = 0; i < tdtxt.length; i++) {
		var tdtitle = $(tdtxt[i]).text();
		$(tdtxt[i]).attr('title', tdtitle);
		$(tdtxt[i]).css({
			"min-width" : "24px"
		});
		if(id == 'example') {
			initf[i] = $(tdtxt[i]).width() / pwidth;
		} else {
			initf[i] = $(tdtxt[i]).parent().width() / pwidth;
		}
	}
	return initf;
}

function gettickInterval(info) {
	var tickInterval = 0;
	var c = 5;
	if(info != null) {
		var max = getMax(info);
		c = getC(max);
		tickInterval = Math.ceil((max / 3) / c) * c;
		if(max < 15) {
			tickInterval = 5;
		}
	}
	return tickInterval;
}

function getMax(info) {
	var max = 0;
	for(var i = 0; i < info.length; i++) {
		if(info[i] > max) {
			max = info[i];
		}
	}
	return max;
}

function getC(max) {
	if(max / 300000 > 1) {
		return c = 50000;
	}
	if(max / 30000 > 1) {
		return c = 5000;
	}
	if(max / 3000 > 1) {
		return c = 500;
	}
	if(max / 30 > 1) {
		return c = 50;
	}
	return 5;
}

function fnreader(info) {
	//alert(info);
	return "<div class='tdtxtwidth'>" + info + "</div>";
}

function Operation(e) {
	jQuery(e).children("div").show();
	jQuery(e).mouseleave(function() {
		jQuery(e).children("div").hide();
	});
}

//页脚位置
function copyheight() {
	/*var clientHeights = document.body.clientHeight;
	var innerHeights = document.documentElement.clientHeight;
	if($.browser.safari) {
		innerHeights = window.innerHeight;
	}
	var copyheight = $("#copyright").height() + 2;
	//clientHeights = clientHeights + copyheight;
	if(clientHeights < innerHeights) {
		$("#copyright").css({top : innerHeights - copyheight + "px"});
		$("#copyright").addClass("capy");
	} else {
		$("#copyright").css({top : "0px"});
		$("#copyright").removeClass("capy");
	}*/
}

function mainheight() {
	var innerHeights = document.documentElement.clientHeight;
	if($.browser.safari) {
		innerHeights = window.innerHeight;
	}
	var topheight=$("div.top").height();
	var bottomheight=$("#copyright").height();
	var innerHeights=innerHeights-(topheight+bottomheight)-32;
	$("#minweb").css({"height":"auto !important","_height":innerHeights+"px","min-height":innerHeights+"px"});
}


//弹出窗口插件
function xytt(txt, bg, colse) {
	var txt = txt;
	var bg = bg;
	$("#" + txt + " input").val("");
	var sHeight = document.body.clientHeight;
	var dheight = document.documentElement.clientHeight;
	var srctop = document.documentElement.scrollTop;
	if($.browser.safari) {
		srctop = window.pageYOffset;
	}
	$(".xy").css({
		"height" : dheight
	});
	dheight = (dheight - $("#" + txt).height()) / 2;
	$("#" + txt).show();
	$("#" + bg).show();
	$("#" + txt).css({
		"top" : (srctop + dheight) + "px"
	});
	$("#" + bg).css({
		"top" : (srctop ) + "px"
	});
	window.onscroll = function scall() {
		var srctop = document.documentElement.scrollTop;
		if($.browser.safari) {
			srctop = window.pageYOffset;
		}
		$("#" + txt).css({
			"top" : (srctop + dheight) + "px"
		});
		$("#" + bg).css({
			"top" : (srctop) + "px"
		});
		$("#fkicon").css({
			top : srctop + (innerHeights / 2)
		});
		window.onscroll = scall;
		window.onresize = scall;
		window.onload = scall;
	}
	var input=document.getElementById(txt).getElementsByTagName("input"),
		checkeds=[];
	for(var i=0;i<input.length;i++){
		checkeds.push(input[i].checked);
	}
	$("." + colse).click(function() {
		if(this.innerHTML=="<font>取消</font>"){
			for(var i=0;i<input.length;i++){
				input[i].checked=checkeds[i]
			}
		}
		$("#" + txt).hide();
		$("#" + bg).hide();
	})
}

function sever(txt, colse) {
	$("#" + txt).slideToggle("slow");
	$("#" + colse).click(function() {
		$("#" + txt).slideUp("slow");
	});
	
}

var srtop = document.documentElement.scrollTop;
if($.browser.safari) {
	srtop = window.pageYOffset;
}
var innerHeights = document.documentElement.clientHeight;
if($.browser.safari) {
	innerHeights = window.innerHeight;
}
$("#fkicon").css({
	top : srtop + (innerHeights / 2)
});

function kfgd() {
	var srtop = document.documentElement.scrollTop;
	if($.browser.safari) {
		srtop = window.pageYOffset;
	}
	var innerHeights = document.documentElement.clientHeight;
	if($.browser.safari) {
		innerHeights = window.innerHeight;
	}
	$("#fkicon").css({
		top : srtop + (innerHeights / 2)
	});
	window.onscroll = kfgd;
	window.onload = kfgd;
}

function xyttcolse(txt, bg, colse, txtp) {
	var txt = txt;
	var txtp = txtp;
	var bg = bg;
	var sHeight = document.body.clientHeight;
	var dheight = document.documentElement.clientHeight;
	$(".xy").css({
		"height" : dheight
	});
	dheight = (dheight - $("#" + txt).height()) / 2;
	$("#" + txt).show();
	$("#" + bg).show();
	$("#" + txt).css({
		"top" : (document.documentElement.scrollTop + dheight) + "px"
	});
	$("#" + bg).css({
		"top" : (document.documentElement.scrollTop ) + "px"
	});
	window.onscroll = function scall() {
		$("#" + txt).css({
			"top" : (document.documentElement.scrollTop + dheight) + "px"
		});
		$("#" + bg).css({
			"top" : (document.documentElement.scrollTop ) + "px"
		});
		window.onscroll = scall;
		window.onresize = scall;
		window.onload = scall;
	}
	$("#" + txtp).hide();
	$("#" + colse).click(function() {
		$("#" + txt).hide();
		$("#" + bg).hide();
	})
}

function timet(txt, colse) {
	var txt = txt;
	$("#" + txt).slideToggle("show");
	$("." + colse).click(function() {
		$("#" + txt).hide(200);
	})
}
function rank_timet(txt, colse) {
	var txt = txt;
	$("#" + txt).slideToggle("show");
	$("." + colse).click(function() {
		$("#" + txt).hide(200);
	})
	noRankSelect();
}

//求今天的日期
function getToday() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}

//求今天的日期
function getTodayItem(itenvaluenum) {
	var myDate = new Date();
	var t = myDate.getTime();
	var num=0;
	if(itenvaluenum=="1"){
		num=num+7;
	}else if(itenvaluenum=="2"){
		num=num+30;
	}
	var t2 = t - num * 1000 * 3600 * 24;
	var weekago = new Date(t2);
	var year = weekago.getFullYear();
	var month = weekago.getMonth() + 1;
	var day = weekago.getDate();
	if(day < 10) {
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}

//求几天前的日期
function getSevenDateAgo(num) {
	var myDate = new Date();
	var t = myDate.getTime();
	var tmpnum=parseInt(num)+7;
	var t2 = t - tmpnum * 1000 * 3600 * 24;
	var weekago = new Date(t2);
	var y = weekago.getFullYear();
	var m = weekago.getMonth() + 1;
	var d = weekago.getDate();
	if(parseInt(d,10) < 10) {
		d = "0" + d;
	}
	return y + "-" + m + "-" + d;
}

//求几天前的日期
function getDateAgo(num) {
	var myDate = new Date();
	var t = myDate.getTime();
	var t2 = t - num * 1000 * 3600 * 24;
	var weekago = new Date(t2);
	var y = weekago.getFullYear();
	var m = weekago.getMonth() + 1;
	var d = weekago.getDate();
	if(parseInt(d,10) < 10) {
		d = "0" + d;
	}
	return y + "-" + m + "-" + d;
}

//求几天前的日期
function getDateAgoItem(num,itenvaluenum) {
	var myDate = new Date();
	var t = myDate.getTime();
	if(itenvaluenum=="1"){
		num=num+7;
	}else if(itenvaluenum=="2"){
		num=num+30;
	}
	var t2 = t - num * 1000 * 3600 * 24;
	var weekago = new Date(t2);
	var y = weekago.getFullYear();
	var m = weekago.getMonth() + 1;
	var d = weekago.getDate();
	if(parseInt(d,10) < 10) {
		d = "0" + d;
	}
	return y + "-" + m + "-" + d;
}

//格式化天数据格式
function getframeDateAgo(str){
	var days=str.split("-");
	return days[1]+"月"+days[2]+"日";
}

//求某一天几天前的日期
function getDateAgo2(date,datediff){
	var oDate1 = strToDate(date);
	var t=oDate1.getTime()-datediff*24*60*60*1000;
	var contrasttime = new Date(t);
	var y = contrasttime.getFullYear();
	var m = contrasttime.getMonth() + 1;
	var d = contrasttime.getDate();
	if(parseInt(d,10) < 10) {
		d = "0" + d;
	}
	return y + "-" + m + "-" + d;
}

//将str转成日期date
function strToDate(str) {
	var arys = new Array();
	if(!str)
		return null;
	arys = str.split('-');
	var newDate;
	if(parseInt(arys[1],10) < 10) {
		arys[1] = '0' + arys[1];
	}
	var tmpdate=arys[0]+"/"+arys[1]+"/"+arys[2];
	newDate = new Date(tmpdate);
	return newDate;
}

function stringDateToLong(str){
	if(str.indexOf(".0")!=-1){
		str=str.substring(0,str.indexOf(".0"));
	}
	var dt=strToDate(str);
	var ux = Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDay(),dt.getHours(),dt.getMinutes(),dt.getSeconds())/1000;
	return ux;
}

//求两个字符串日期相隔天数是否小于一个值
function DateDiff(sDate1, sDate2, daynm) {
	var oDate1, oDate2, iDays;
	oDate1 = strToDate(sDate1);
	oDate2 = strToDate(sDate2);
	iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
	if(iDays > daynm) {
		return false;
	} else {
		return true;
	}
}


//求两个字符串日期相隔天数
function DateDifflong(sDate1,sDate2){
	var oDate1, oDate2, iDays;
	oDate1 = strToDate(sDate1);
	oDate2 = strToDate(sDate2);
	iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
	return iDays;
}

//求某个字符串日期与今天相隔天数
function DateDifflongone(sDate2){
	var oDate2, iDays;
	var oDate1 = new Date();
	oDate2 = strToDate(sDate2);
	iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
	return iDays;
}

//求一个日期后多少天的日期
function getContrastEndTime(sDate1,datediff){
	var oDate1 = strToDate(sDate1);
	var t=oDate1.getTime()+datediff*24*60*60*1000;
	var contrasttime = new Date(t);
	var y = contrasttime.getFullYear();
	var m = contrasttime.getMonth() + 1;
	var d = contrasttime.getDate();
	if(parseInt(d,10) < 10) {
		d = "0" + d;
	}
	return y + "-" + m + "-" + d;
}


//将字符串型的json转成int或者float型（解决折线图为点的问题）
function changeStrToJson(newinfo){
	if(newinfo==null||newinfo==""){
		return null;
	}else{
		for(var i=0;i<newinfo.length;i++){
			if(newinfo[i]){
				var num=new Number(newinfo[i]);
				if(isInteger(num)){
					newinfo[i]=parseInt(num);
				}else if(isFloat(num)){
					newinfo[i]=parseFloat(num);
				}else{
					newinfo[i]=0;
				}
			}
		}
		return newinfo;
	}
}

//将字符串型的json转成int或者float型（如果为null,返回为0）【用户留存页面】
function changeStrToJson2(newinfo){
	if(newinfo==null||newinfo==""){
		return 0;
	}else{
		for(var i=0;i<newinfo.length;i++){
			if(newinfo[i]){
				var num=new Number(newinfo[i]);
				if(isInteger(num)){
					newinfo[i]=parseInt(num);
				}else if(isFloat(num)){
					newinfo[i]=parseFloat(num);
				}else{
					newinfo[i]=0;
				}
			}
		}
		return newinfo;
	}
}

//通过数据求出横坐标时间分布
function getTickInterval(info){
	if(info==null||info==""){
		return 1;
	}
	var cdy=info.length;
	var tickInterval=Math.ceil(cdy/20);
	if(tickInterval>3){
		tickInterval=tickInterval+3;
	}
	return tickInterval;         
}

function strTOStr(strDate) {
	var arys = new Array();
	arys = strDate.split('-');
	if(parseInt(arys[1]) < 10) {
		arys[1] = parseInt(arys[1],10);
	}
	return arys[0] + "-" + arys[1] + "-" + arys[2];
}

var oaw, naw;
var f = null;
function setdivwidth(fc) {
	if(fc == null) {
		return;
	}
	var tdtxt = $(".tdtxtwidth");
	var parwidth = $(tdtxt[0]).parent().parent().parent().parent().parent().parent().parent().parent().width();
	//alert($(tdtxt[0]).parent().parent().parent().parent().parent().parent().parent().parent().attr('id'));
	if(parwidth != null && parwidth != 0) {
		for(var i = 0; i < tdtxt.length; i++) {
			$(tdtxt[i]).width(0);
			var newwidth = parwidth * ((fc[i] * 5) / 7);
			$(tdtxt[i]).width(newwidth);
		}
	}
}


$(document).ready(function() {
	oaw = window.innerWidth;
	//下拉列表
	$(function() {
		$("#date").sSelect();
		//$("#date_1a").sSelect();
		$("#date_1").sSelect();
		$("#date_2").sSelect();
		//$("#date_2a").sSelect();
		$("#date_3").sSelect();
		$("#date_4").sSelect();
		$("#date_5").sSelect();
		$("#date_6").sSelect();
		

	});
	//自适应浏览器宽高
	var winWidths = 0;
	function findDimensions()//函数：获取尺寸
	{
		/*//获取窗口宽度
		if(window.innerWidth) {
			winWidths = window.innerWidth;
			naw = winWidths;
		} else if((document.body) && (document.body.clientWidth)) {
			winWidths = document.body.clientWidth;
			winWidths = winWidths + 15;
		}
		//通过深入Document内部对body进行检测，获取窗口大小
		//if (document.documentElement  &&   document.documentElement.clientWidth){
		//  winWidths = document.documentElement.clientWidth;
		//  }
		if(winWidths < 768) {
			winWidths = 768;
		}
		winWidths = winWidths - 226;
		 if(winWidths>1140)
		winWidths=1140;
		if($.browser.safari){winWidths = winWidths+110}
		//结果输出至两个文本框
		$("#right").css({
			width : winWidths
		});*/
		$(".web").css({
			"min-width" : "768px"
		});
		$(".top").css({
			"min-width" : "748px"
		});
		
		//根据窗口大小显示多少文字
		setdivwidth(f);
		//copyheight();
		
		//	根据窗口大小显示多少文字结束
	}
	//findDimensions();
	window.onresize = findDimensions;
//window.onresize = alert("ds");
	window.onscroll = kfgd;

});

//将12040300日期格式转换成 4/03形式
function changeStringDateToDate(tmptime){
	var tmptime=tmptime.toString();
	var year=tmptime.substring(0,2);
	var month=tmptime.substring(2,4);
	var day=tmptime.substring(4,6);
	var hour=tmptime.substring(6,8);
	if(month.substring(0,1)=="0"){
		month=month.substring(1,2);
	}
	var tmpdate=month+'/'+day;
	return tmpdate;
}

//将12040300日期格式转换成 2012-4-03形式
function changeStringDateToDate2(tmptime){
	var year=tmptime.substring(0,2);
	year="20"+year;
	var month=tmptime.substring(2,4);
	var day=tmptime.substring(4,6);
	var hour=tmptime.substring(6,8);
	if(month.substring(0,1)=="0"){
		month=month.substring(1,2);
	}
	var tmpdate=year+"-"+month+"-"+day;
	return tmpdate;
}

//将2012-9-12日期格式转换成 2012-09-12形式
function changeStringDateToDate3(tmptime){
	var year=tmptime.substring(0,2);
	year="20"+year;
	var month=tmptime.substring(2,4);
	var day=tmptime.substring(4,6);
	var hour=tmptime.substring(6,8);
	var tmpdate=year+"-"+month+"-"+day;
	return tmpdate;
}

//将20120417日期格式转换成 2012年4月
function changeStringDateToMonth(tmptime){
	var year=tmptime.substring(0,2);
	year="20"+year;
	var month=tmptime.substring(2,4);
	if(month.substring(0,1)=="0"){
		month=month.substring(1,2);
	}
	var tmpdate=year+"年"+month+"月";
	return tmpdate;
}

function dateframe(date){
	var strYear=date.getFullYear();   
    var strDay=date.getDate();
    if(strDay<10){
    	strDay="0"+strDay;
    }
    var strMonth=date.getMonth()+1;
    var strtmpday=strYear+"-"+strMonth+"-"+strDay;
    return strtmpday;
}

//19返回到：18:00~20:00
function timePeriod(time){
	if(time==0){
		return "00:00~01:00";
	}else if(time==24){
		return "23:00~24:00";
	}else{
		var start=parseInt(time,10)-1;
		var end=parseInt(time,10)+1;
		if(start<0){
			start=0;
		}
		if(start>24){
			start=24;
		}
		if(end<0){
			end=0;
		}
		if(end>24){
			end=24;
		}
		if(start<10){
			start="0"+start;
		}
		if(end<10){
			end="0"+end;
		}
		return start+":00 ~ "+end+":00";
	}
}

//19返回到：19:00~19:59
function timePeriod2(time){
	return time+":00 ~ "+time+":59";
}

//将country与data平凑出json的地图格式
function getMapJSON(country,data){
	if(country==null||country==""||data==null||data==""){
		return null;
	}else{
		var gdpData="";
		var country=country.toString();
		var data=data.toString();
		var tmpcountry=country.split(",");
		var tmpdata=data.split(",");
		for(var i=0;i<tmpcountry.length ;i++){
			var countryname=tmpcountry[i].toLowerCase();
			if(!isNumber(tmpdata[i])){
				tmpdata[i]=0;
			}
			gdpData+="\""+countryname+"\":"+tmpdata[i]+",";
		}
		if(tmpcountry.length>0){
			gdpData=gdpData.substring(0,gdpData.length-1);
			gdpData="{"+gdpData+"}";
		}
		var object;
		if (typeof (JSON) == 'undefined'){
			object=eval('('+gdpData+')'); 
		}else{
			object= JSON.parse(gdpData);
		}
		return object;
	}
}

//将数组转成json数组(JSON:[{data:[1,2,3,4,5]},{data:[1,2,3,4,5]}])
function arrayToJson(array) {
	var json="";
	for(var c in array){
		json=json+"{data:["+array[c].data+"],name:'"+array[c].xname+"'},";
	}
	if(json!=null&&json!=""){
		json=json.substring(0,json.length-1);
	}
	json="["+json+"]";
	return eval(json);
}

//将数组转成json数组(JSON:[1,2,3,4,5,6])
function arrayToJson2(object){
	var array=new Array();
	for(var i=0;i<object.map.length;i++){
		var tmp=object.map[i].value;
		array.push(tmp);
	}
	return array;
}

//将数组转成json数组(求全部应用比较Top机型数据)
function arrayToJson3(array,defalutinfo){
	if(array!=null&&array!=""){
		var xlength=getJSONNum(array);
		if(array[0].data!=null&&array[0].data!=""){
			var ylength=defalutinfo.data.length;      
			var strjson="";
			var tmpName=array[0].xname.toString();
			var tmpNameArray=tmpName.split(",");
			for(var i=0;i<ylength;i++){
				var inarray=new Array();
				for(var j=0;j<xlength;j++){
					var tmp=array[j].data.toString();
					var tmparray=tmp.split(",");
					inarray.push(tmparray[i]);
				}
				strjson=strjson+"{data:["+inarray+"],name:'"+tmpNameArray[i]+"'},"
			}
			if(strjson!=null&&strjson!=""){
				strjson=strjson.substring(0,strjson.length-1);
				strjson="["+strjson+"]";
			}
			var object=eval(strjson); 
			return object;
		}     
	}
}

//将json字符串转成string(用于机型等页面的对比)
function jsonTOString(json){
	var itemValueNum="";
	if(json!=null&&json!=""){
		for(var cc in json){
			itemValueNum=itemValueNum+json[cc]+",";
		}
		itemValueNum=itemValueNum.substring(0,itemValueNum.length-1);
		return itemValueNum;
	}else{
		return null;
	}
}

function jsonTOStringSepcialMark(json){
	var itemValueNum="";
	if(json!=null&&json!=""){
		for(var cc in json){
			itemValueNum=itemValueNum+json[cc]+"#";
		}
		itemValueNum=itemValueNum.substring(0,itemValueNum.length-1);
		return itemValueNum;
	}else{
		return null;
	}
}

//获取select中被选中的option的value
function getChosedSelect(selectId){
	var options=$("#"+selectId+" option");
	//alert(options.length);
	//var options=document.getElementById(selectId).options;
	var value;
	for(var i=0;i<options.length;i++){
		if(options[i].selected==true){
			value=options[i].text;
		}
	}
	return value;
}

//获取select中value=..的text
function getChosedSelect2(selectId,value){
	if(value==null||value==""){
		return "";
	}else{
		var options=document.getElementById(selectId).options;
		var text;
		for(var i=0;i<options.length;i++){
			if(options[i].value==value){
				text=options[i].text;
			}
		}
		return text;
	}
}

//获取json(key:   ,value:   )里面包含的object个数
function getJSONNum(json){
	var num=0;
	for(var cc in json){
		num+=1;
	}
	return num;
}

//获取曲线图类型是直线还是柱状图
function getDefaultSeriesType(data1,data2,data3){
	var defaultSeriesType="line";
	if(data1!=null){
		if(data1.length==1){
			defaultSeriesType="column";
		}
	}else if(data2!=null){
		if(data2.length==1){
			defaultSeriesType="column";
		}
	}else if(data3!=null){
		if(data3.length==1){
			defaultSeriesType="column";
		}
	}
	return defaultSeriesType;
}

//判断一个值是否为空
function isEmpty(object){
	var result=true;
	if(object==null||object==""){
		result=false;
	}
	return result;
}

//保留2位小数
function formatFloat(src, pos)
{
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}

//加载数据时执行等待图标
function getloading(strid){
	 $('#'+strid).html('<div class="login"><img src="../images/loading.gif" height="25px"></img><br>正在加载统计数据...</div>');
}

function getloadingbox(strid){
	 $('#'+strid).html('<div class="textbox"><div class="login"><img src="../images/loading.gif" height="25px"></img><br>正在加载统计数据...</div></div>');
}

function getImgloading(strid){
	 $('#'+strid).html('<img src="../images/loading.gif" height="25px"></img>');
}

function exportcallback(data){
	if(data!=""){
		window.location.href=basePath+data+"?timestamp="+new Date().getTime();
	}else{
		alert("没有成功生成报表文件");
	}
}
// JavaScript Document