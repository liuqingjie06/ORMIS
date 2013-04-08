var barModel, thrDaybarModel, nbarModel, ybarModel, ywbarModel, ymbarModel;
var starttime, endtime, vtimecc, xyear, xmonth, xdate, timeflag, xtimeflag, thrtimeflag, thrtimeflag, cdy;
eval("var chartline = null;");
eval("var chartThrline = null;");
var vlineName = "不对比";
var productid = getParameter("vproductid");
var platformid = getParameter("vplatformid");
var vtimeflag, vplatformtype = 0, vplatforms = "", vThrDaylistKey = 0, vlistKey = 0, vchtype = 1, startuppath, tmpMaxvalue, todaynewuser, yesterday, activeyesterday, activetoday;
var poptonehref = "";
var popttwohref = "";
var today = new Date();
var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
var yesterdayTime = new Date();
yesterdayTime.setTime(yesterday_milliseconds);
var tmpday = new Date();
var tmpday_milliseconds = 0;
var tmpnum=0; //里程碑点击开的框的id,需要不停的增长，这个作为全局变量
var serviceCode="0108"; 

function refresh() {
}

function selectChose() {
}

function destroy() { 
	barModel = null, thrDaybarModel = null, nbarModel = null, ybarModel = null, ywbarModel = null, ymbarModel = null;
	if(chartline != null) {
		chartline.destroy();
	}
	delete chartline;
	if(chartThrline != null) {
		chartThrline.destroy();
	}
	delete chartThrline;
}

function initSearch() {
	vtimeflag = 1;
	vtimecc = Math.random();
	pagename = "概况统计";
	vselSearch(productid, platformid);
	checkchildaccount();
}

function checkchildaccount(){
	if(childaccount != null && childaccount != "" && childaccount != "null"){
		if(pageid.indexOf(",") >= 0){
			var pageidArr = pageid.split(",");
			var flag = false;
			var flag1 = false;
			for(var i=0;i<pageidArr.length;i++){
				if(pageidArr[i] == '4'){
					flag = true;
				}
				if(pageidArr[i] == '2'){
					falg1 = true;
				}
			}
			if(flag == false){
				document.getElementById("timefx").href = 'javascript:void(0)';
			}
			if(flag == false){
				document.getElementById("30days").href = 'javascript:void(0)';
			}
		}
	}
}
function initmeter() {
	var checkValue = $("#productTxt").val();
	var url = basePath + 'servlet/TenddataMeterServlet';
	var param = {
		servertype : 0,
		timecc : vtimecc,
		productid : checkValue
	};
	$.getJSON(url, param, meterinit);

	function meterinit(data) {
		for(var i = 1; i <= 9; i++) {
			$('#top' + i).attr("checked", false);
		}
		if(data[0].hotpage == 0) {
			$('#top4').attr("checked", true);
		}
		if(data[0].top10userarea == 0) {
			$('#top1').attr("checked", true);
		}
		if(data[0].top10mobile == 0) {
			$('#top6').attr("checked", true);
		}
		if(data[0].usetime == 0) {
			$('#top8').attr("checked", true);
		}
		if(data[0].top10Custom == 0) {
			$('#top5').attr("checked", true);
		}
		if(data[0].startuptimes == 0) {
			$('#top3').attr("checked", true);
		}
		if(data[0].top10error == 0) {
			$('#top7').attr("checked", true);
		}
		if(data[0].hotversion == 0) {
			$('#top9').attr("checked", true);
		}
		if(data[0].top10channel == 0) {
			$('#top2').attr("checked", true);
		}
		addtag(0);
	}

}

function setPoptPageInfo() {
	poptonehref = "SummarizeGisInfo.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop1";
	popttwohref = "SummarizeParInfo.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop2";
	poptthrhref = "SummarizeStartUpInfo.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop3";
	poptfouhref = "PageInfoSummarize.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop4";
	self.poptonefrom.location.href = poptonehref;
	self.popttwofrom.location.href = popttwohref;
	self.poptthrfrom.location.href = poptthrhref;
	self.poptfoufrom.location.href = poptfouhref;
	$("#top9").removeAttr("checked");
	for( i = 0; i < $("#joinboxTable li").length; i++) {
		if(i <= 4) {
			$("#top" + i).attr("checked", "checked");
		} else {
			$("#top" + i).removeAttr("checked");
		}
	}
}

function addtag(flag) {
var productid = $("#productTxt").val();
	var platformid = $("#productList").val();
	var addtag = document.getElementById("Esbox").getElementsByTagName("li");
	poptonehref = "SummarizeGisInfo.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop1";
	popttwohref = "SummarizeParInfo.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop2";
	poptthrhref = "SummarizeStartUpInfo.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop3";
	poptfouhref = "PageInfoSummarize.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop4";
	poptfivehref = "CustomEventSummarize.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop5";
	poptsixhref = "SummarizeDeviceType.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop6";
	poptsevenhref = "SummarizeExcepiton.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop7";
	popteighthref = "UseTimeInfoSummarize.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop8";
	poptnighthref = "VersionInfoSummarize.jsp?productid=" + productid + "&platformid=" + platformid + "&platformtype=" + vplatformtype + "&platforms=" + vplatforms + "&liid=adtop9";

	$("#Esbox").html('<div id="Esboxli" class="clear"></div>');
	$("[name='addcheckbox']").each(function() {
		if(this.checked) {
			var addtagliID = this.id;
			var addtaglival = this.title;
			var addtagfor = addtaglival;
			switch(addtagfor) {
				case "poptonefrom":
					addtagfor = poptonehref;
					break;
				case "popttwofrom":
					addtagfor = popttwohref;
					break;
				case "poptthrfrom":
					addtagfor = poptthrhref;
					break;
				case "poptfoufrom":
					addtagfor = poptfouhref;
					break;
				case "poptfivefrom":
					addtagfor = poptfivehref;
					break;
				case "poptsixfrom":
					addtagfor = poptsixhref;
					break;
				case "poptsevenfrom":
					addtagfor = poptsevenhref;
					break;
				case "popteightfrom":
					addtagfor = popteighthref;
					break;
				case "poptnightfrom":
					addtagfor = poptnighthref;
					break;
			};
			$("#Esboxli").before('<li id="ad' + addtagliID + '" class="contentbox" style="height:353px" ><iframe name="' + addtaglival + '" id="' + addtaglival + '" src="' + addtagfor + '" height="353" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" ></iframe></li>');
		} else {
			$("#Esbox li").remove("li[id=ad" + this.id + "]");
		}
	});
	var addtaglength = addtag.length;
	for( i = 0; i < addtaglength; i++) {
		addtag[i].className = "contentbox addtagli" + i;
		var addtopID = addtag[i].id.substr(2);
		$("#" + addtopID).attr("checked", "checked");
		if(i % 2 == 0) {
			$(".addtagli" + i).addClass("l");
			$(".addtagli" + i).removeClass("r");
		} else {
			$(".addtagli" + i).addClass("r");
			$(".addtagli" + i).removeClass("l");
		}
	}
	$("#Addtable").hide();
	$("#xy").hide();
	//setPoptPageInfo();
	if(flag == 1)
		updatemeter();
}

function updatemeter() {
	var checkValue = $("#productTxt").val();
	var url = basePath + 'servlet/TenddataMeterServlet';
	var meters = "";
	$("[name='addcheckbox']").each(function() {
		if(this.checked) {
			var addtaglival = this.title;
			var addtagfor = addtaglival;
			switch(addtagfor) {
				case "poptonefrom":
					meters = meters + "top10userarea,";
					break;
				case "popttwofrom":
					meters = meters + "top10channel,";
					break;
				case "poptthrfrom":
					meters = meters + "startuptimes,";
					break;
				case "poptfoufrom":
					meters = meters + "hotpage,";
					break;
				case "poptfivefrom":
					meters = meters + "top10Custom,";
					break;
				case "poptsixfrom":
					meters = meters + "top10mobile,";
					break;
				case "poptsevenfrom":
					meters = meters + "top10error,";
					break;
				case "popteightfrom":
					meters = meters + "usetime,";
					break;
				case "poptnightfrom":
					meters = meters + "hotversion,";
					break;
			}
		}
	});
	var param = {
		servertype : 1,
		timecc : vtimecc,
		productid : checkValue,
		meters : meters
	};
	$.get(url, param);
}

function addclose(e) {
	$("#Esbox li").remove("li[id=" + e + "]");
	var addtopID = e.substr(2);
	$("#" + addtopID).removeAttr("checked");
	var addtag = document.getElementById("Esbox").getElementsByTagName("li");
	var addtaglength = addtag.length;
	for( i = 0; i < addtaglength; i++) {
		addtag[i].className = "contentbox addtagli" + i;
		if(i % 2 == 0) {
			$(".addtagli" + i).addClass("l");
			$(".addtagli" + i).removeClass("r");
		} else {
			$(".addtagli" + i).addClass("r");
			$(".addtagli" + i).removeClass("l");
		}
	}
	updatemeter();
}

function askServlet(serviceCode, starttime, endtime, tmpfalg, callback) {
	var url = basePath + 'servlet/TenddataProductProfilesServlet';
	vtimecc = Math.random();
	var checkValue = $("#productTxt").val();
	var checkpValue = $("#productList").val();
	var params = {
		starttime : starttime,
		endtime : endtime,
		timeflag : tmpfalg,
		productid : checkValue,
		serviceCode : serviceCode,
		platformid : checkpValue,
		timecc : vtimecc
	};
	ajaxRequest(url, params, callback);
}

function verify(tmpfalg) {
	countThraskServlet=0;
	getloading('0104');
	//getloading('0105');
	//getloading('0106');
	getloading('0107');
	getloading('0108');
	askServlet('0104', '', '', '1', setBeanDataTable);
	askServlet('0105', '', '', '99', setBaseDataTable);
	askServlet('0106', '', '', '99', setActiveDataTable);
	askServlet('0107', '', '', vlistKey, getNewUserLine);
	initmeter();
}

function setBeanDataTable(data) {
	var tmpGridInfo = data.data0104;
	//创建table数据
	if(tmpGridInfo != null && tmpGridInfo != "") {
		var tmpvalue = tmpGridInfo.split("^");
		var gridinfo = new Array(tmpvalue.length);
		var col;
		for(var i = 0; i < tmpvalue.length; i++) {
			col = tmpvalue[i].split(",");
			gridinfo[i] = col;
		}
		$('#0104').html('<table cellpadding="0px" cellspacing="0px" width="100%" height="100%" border="0" id="gridSummarizeBean" class="table_style1" ></table>');
		$('#gridSummarizeBean').dataTable({

			"fnDrawCallback" : function(oSettings) {
				if(oSettings.aiDisplay.length == 0) {
					return;
				}
				var tdt = $(".tdtxtwidth");
				var ftdt = [0.05, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
				for(var i = 0; i < tdt.length; ) {
					for(var j = 0; j < ftdt.length; j++) {
						jQuery(tdt[i]).width($(tdt[i]).parent().parent().parent().parent().parent().parent().width() * ftdt[j]);
						i++;
					}
				}
				highlight("gridSummarizeBean");
			},
			"aaData" : gridinfo,
			"bPaginate" : false, //去掉选择显示多少条
			"bLengthChange" : false,
			"bFilter" : false, //去掉右上方查询查询
			"bSort" : false, //去掉排序
			"bInfo" : false,
			"aoColumns" : [{
				"sTitle" : "<div class='tdtxtwidth'>指标</div>",
				"sClass" : "left",
				"fnRender" : function(obj) {
					var info = obj.aData[obj.iDataColumn];
					return fnreader(info);
				}
			}, {
				"sTitle" : "<div class='tdtxtwidth'>新增用户</div>",
				"sClass" : "center",
				"fnRender" : function(obj) {
					var type = jQuery(obj.aData[0]).html();
					var info = obj.aData[obj.iDataColumn];
					if(type == '今日' || type == '昨日') {
						if(type == '今日') {
							todaynewuser = info;
						}
						if(type == '昨日') {
							yesterday = info;
						}
					} else {
						if(type == '预计今日') {
							var ordertoday = info;
							if(parseInt(todaynewuser) > parseInt(ordertoday)) {
								info = parseInt(parseInt(todaynewuser)*1.1);
							}
							if(parseInt(info) > parseInt(yesterday)) {
								info = "<div class='relative'>" + info + "<font>↑</font></div>";
							} else {
								info = "<div class='relative'>" + info + "<font>↓</font></div>";
							}
						}
					}
					return info;
				}
			}, {
				"sTitle" : "<div class='tdtxtwidth'>活跃用户</div>",
				"sClass" : "center",
				"fnRender" : function(obj) {
					var type = jQuery(obj.aData[0]).html();
					var info = obj.aData[obj.iDataColumn];
					if(type == '今日' || type == '昨日') {
						if(type == '今日') {
							activetoday = info
						}
						if(type == '昨日') {
							activeyesterday = info;
						}
					} else {
						if(type == '预计今日') {
							var ordertoday = info;
							if(parseInt(activetoday) > parseInt(ordertoday)) {
								info = parseInt(parseInt(activetoday)*1.1);
							}
							if(parseInt(info) > parseInt(activeyesterday)) {
								info = "<div class='relative'>" + info + "<font>↑</font></div>";
							} else {
								info = "<div class='relative'>" + info + "<font>↓</font></div>";
							}
						}
					}
					return info;
				}
			}, {
				"sTitle" : "<div class='tdtxtwidth'>新用户占比</div>",
				"sClass" : "center",
				"fnRender" : function(obj) {
					var info = obj.aData[obj.iDataColumn];
					return fnreader(info + "%");
				}
			}, {
				"sTitle" : "<div class='tdtxtwidth'>启动(次数 | 人均)</div>",
				"sClass" : "center",
				"fnRender" : function(obj) {
					var info = obj.aData[obj.iDataColumn];
					return fnreader(info);
				}
			}, {
				"sTitle" : "<div class='tdtxtwidth'>平均使用时长</div>",
				"sClass" : "center",
				"fnRender" : function(obj) {
					var info = obj.aData[obj.iDataColumn];
					return fnreader(intTotime(info));
				}
			}, {
				"sTitle" : "<div class='tdtxtwidth'>日活跃率</div>",
				"sClass" : "center",
				"fnRender" : function(obj) {
					var vinfo = obj.aData[obj.iDataColumn];
					if(vinfo == "--") {
						return fnreader(vinfo);
					} else {
						return fnreader(vinfo + "%");
					}
				}
			}]
		});
	} else {
		$('#0104').html('<table cellpadding="0px" cellspacing="0px" width="100%" height="20px" border="0" id="example" class="display" ><tr><td>未查询到数据</td><tr></table>');
	}
}



function setBaseDataTable(data) {
	if(isEmpty(data)) {
		var tmpGridInfo = data.data0105;
		var tmpAllUser=0;
		var tmponeusers=0;
		if(isEmpty(tmpGridInfo)) {
			if(tmpGridInfo.data010822){
				$('#900510').html(fmoney(tmpGridInfo.data010822));
				$('#900510').attr("title",fmoney(tmpGridInfo.data010822));
				tmpAllUser=parseInt(tmpGridInfo.data010822);
			}else{
				$('#900510').html("0");
				$('#900510').attr("title","0");
				tmpAllUser=0;
			}
			$('#000713').html('--');
			$('#000713').attr("title",'--');
			if(sevenTimeFlag==1){
				if(tmpGridInfo.data000713){
					if(tmpAllUser!=0){
						tmpAllUser=dataFix((tmpGridInfo.data000713/parseFloat(tmpAllUser))*100,1);
					}
					$('#000713').html(fmoney(tmpGridInfo.data000713));
					$('#000813').html(tmpAllUser+"%");
					$('#000713').attr("title",fmoney(tmpGridInfo.data000713)+'('+tmpAllUser+'%)');
				}
			}else{
				$('#000713').html('--');
				$('#000813').html('--');
				$('#000713').attr("title","--");
			}
			
			
			$('#000322').html(fmoney(tmpGridInfo.data000322));
			$('#000322').attr("title",fmoney(tmpGridInfo.data000322));
			if(parseFloat(tmpGridInfo.data108622)<1.0&&parseFloat(tmpGridInfo.data108622)>0){
				$('#100122').html("1.0");
				$('#100122').attr("title","1.0");
			}else{
				$('#100122').html(tmpGridInfo.data108622);
				$('#100122').attr("title",tmpGridInfo.data108622);
			}
		}
	}
	$("#0105 .tdtxtwidth").attr("title","");
	$("#0106 .tdtxtwidth").attr("title","");
	
	//数据加载完毕，benchmark允许点击
	document.getElementById("bench_mark_onceuser-000813").getElementsByTagName("a")[0].className="bottun4";
	$("#bench_mark_onceuser-000813 a").attr("onClick","openBenchMark(this)");
	
	document.getElementById("bench_mark_avgstartup-100122").getElementsByTagName("a")[0].className="bottun4";
	$("#bench_mark_avgstartup-100122 a").attr("onClick","openBenchMark(this)");
	
}

function setActiveDataTable(data) {
	if(isEmpty(data)) {
		var tmpGridInfo = data.data0106;
		if(isEmpty(tmpGridInfo)) {
			$('#000814').html(isEmpty(tmpGridInfo.data000814)?fmoney(tmpGridInfo.data000814):0);
			$('#000814').attr("title",isEmpty(tmpGridInfo.data000814)?fmoney(tmpGridInfo.data000814):0);
			$('#100314').html(isEmpty(tmpGridInfo.data100314)? tmpGridInfo.data100314+ "%":"0%");
			$('#100314').attr("title",isEmpty(tmpGridInfo.data100314)? tmpGridInfo.data100314+ "%":"0%");
			$('#000914').html(isEmpty(tmpGridInfo.data000914)?fmoney(tmpGridInfo.data000914):0);
			$('#000914').attr("title",isEmpty(tmpGridInfo.data000914)?fmoney(tmpGridInfo.data000914):0);
			$('#100414').html(isEmpty(tmpGridInfo.data100414)? tmpGridInfo.data100414+"%":"0%");
			$('#100414').attr("title",isEmpty(tmpGridInfo.data100414)? tmpGridInfo.data100414+"%":"0%");
			if(thrTimeFlag==1){
				$('#100514').html(isEmpty(tmpGridInfo.data100514)? tmpGridInfo.data100514+"%":"0%");
				$('#100514').attr("title",isEmpty(tmpGridInfo.data100514)? tmpGridInfo.data100514+"%":"0%");
			}else{
				$('#100514').html("--");
				$('#100514').attr("title","--");
			}
		}
	}
	
	//数据加载完毕，benchmark允许点击
	document.getElementById("bench_mark_weekactive-100314").getElementsByTagName("a")[0].className="bottun4";
	$("#bench_mark_weekactive-100314 a").attr("onClick","openBenchMark(this)");
	
	document.getElementById("bench_mark_monthactive-100414").getElementsByTagName("a")[0].className="bottun4";
	$("#bench_mark_monthactive-100414 a").attr("onClick","openBenchMark(this)");
	
	document.getElementById("bench_mark_monthkeepuser-100514").getElementsByTagName("a")[0].className="bottun4";
	$("#bench_mark_monthkeepuser-100514 a").attr("onClick","openBenchMark(this)");
}

function getNewUserLine(data) {
	if(isEmpty(data)) {
		nbarModel = data.data0107;
		if(vlistKey == 0) {
			askServlet('0107', '', '', '1', getYContrastData);
		} else {
			tmpday_milliseconds = yesterdayTime.getTime() - 1000 * 60 * 60 * 24;
			tmpday.setTime(tmpday_milliseconds);
			askServlet('0107', dateframe(tmpday), dateframe(tmpday), '6', getYContrastData);
		}
	}
}

function getYContrastData(data) {
	if(isEmpty(data)) {
		ybarModel = data.data0107;
		if(vlistKey == 0) {
			tmpday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 7;
			tmpday.setTime(tmpday_milliseconds);
			askServlet('0107', dateframe(tmpday), dateframe(tmpday), '6', getFWContrastData);
		} else {
			tmpday_milliseconds = yesterdayTime.getTime() - 1000 * 60 * 60 * 24 * 7;
			tmpday.setTime(tmpday_milliseconds);
			askServlet('0107', dateframe(tmpday), dateframe(tmpday), '6', getFWContrastData);
		}
	}
}

function getFWContrastData(data) {
	if(isEmpty(data)) {
		ywbarModel = data.data0107;
		if(vlistKey == 0) {
			tmpday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
			tmpday.setTime(tmpday_milliseconds);
			askServlet('0107', dateframe(tmpday), dateframe(tmpday), '6', getFMContrastData);
		} else {
			tmpday_milliseconds = yesterdayTime.getTime() - 1000 * 60 * 60 * 24 * 30;
			tmpday.setTime(tmpday_milliseconds);
			askServlet('0107', dateframe(tmpday), dateframe(tmpday), '6', getFMContrastData);
		}
	}
}

var countThraskServlet = 0;
function getFMContrastData(data) {
	if(isEmpty(data)) {
		ymbarModel = data.data0107;
		setNewUserLine(vlistKey);
		if(countThraskServlet == 0) {
			askServlet('0108', '', '', '30', getLine);
			countThraskServlet += 1;
		}
	}
}

//listKey为0:今日或者1:昨日
function setNewUserLine(listKey) {
	var info, time;
	var vname = "";
	var vtypef = "";
	vlistKey = listKey;
	switch(listKey) {
		case 0:
			vname = "今日";
			if(vchtype == 1) {
				vtypef = "个";
				info = changeStrToJson(nbarModel.data0001);
				time = nbarModel.data0001Categorie;
				yinfo = changeStrToJson(ybarModel.data0001);
				ytime = ybarModel.data0001Categorie;
				ywinfo = changeStrToJson(ywbarModel.data0001);
				ywtime = ywbarModel.data0001Categorie;
				yminfo = changeStrToJson(ymbarModel.data0001);
				ymtime = ymbarModel.data0001Categorie;
			} else {
				vtypef = "次";
				info = changeStrToJson(nbarModel.data0003);
				time = nbarModel.data0003Categorie;
				yinfo = changeStrToJson(ybarModel.data0003);
				ytime = ybarModel.data0003Categorie;
				ywinfo = changeStrToJson(ywbarModel.data0003);
				ywtime = ywbarModel.data0003Categorie;
				yminfo = changeStrToJson(ymbarModel.data0003);
				ymtime = ymbarModel.data0003Categorie;
			}
			break;
		case 1:
			vname = "昨日";
			if(vchtype == 1) {
				vtypef = "个";
				info = changeStrToJson(nbarModel.data0001);
				time = nbarModel.data0001Categorie;
				yinfo = changeStrToJson(ybarModel.data0001);
				ytime = ybarModel.data0001Categorie;
				ywinfo = changeStrToJson(ywbarModel.data0001);
				ywtime = ywbarModel.data0001Categorie;
				yminfo = changeStrToJson(ymbarModel.data0001);
				ymtime = ymbarModel.data0001Categorie;
			} else {
				vtypef = "次";
				info = changeStrToJson(nbarModel.data0003);
				time = nbarModel.data0003Categorie;
				yinfo = changeStrToJson(ybarModel.data0003);
				ytime = ybarModel.data0003Categorie;
				ywinfo = changeStrToJson(ywbarModel.data0003);
				ywtime = ywbarModel.data0003Categorie;
				yminfo = changeStrToJson(ymbarModel.data0003);
				ymtime = ymbarModel.data0003Categorie;
			}
			break;
		default:
			vname = "今日";
			if(vchtype == 1) {
				vtypef = "个";
				info = changeStrToJson(nbarModel.data0001);
				time = nbarModel.data0001Categorie;
				yinfo = changeStrToJson(ybarModel.data0001);
				ytime = ybarModel.data0001Categorie;
				ywinfo = changeStrToJson(ywbarModel.data0001);
				ywtime = ywbarModel.data0001Categorie;
				yminfo = changeStrToJson(ymbarModel.data0001);
				ymtime = ymbarModel.data0001Categorie;
			} else {
				vtypef = "次";
				info = changeStrToJson(nbarModel.data0003);
				time = nbarModel.data0003Categorie;
				yinfo = changeStrToJson(ybarModel.data0003);
				ytime = ybarModel.data0003Categorie;
				ywinfo = changeStrToJson(ywbarModel.data0003);
				ywtime = ywbarModel.data0003Categorie;
				yminfo = changeStrToJson(ymbarModel.data0003);
				ymtime = ymbarModel.data0003Categorie;
			}
			break;
	}
	chartline = new Highcharts.Chart({
		chart : {
			renderTo : 'containerLine' + listKey,
			defaultSeriesType : 'area',
			backgroundColor : backgroundColorinfo,
			marginTop : 20
		},
		title : {
			text : ''
		},
		xAxis : {
			categories : time,
			 tickmarkPlacement: 'on',
			labels : {
				rotation: -90,
				align : 'right',
				x: 5,
				y: 8,
				formatter : function() {
					return this.value + ":00";
				}
			}
		},
		yAxis : {
			title : {
				text : ''
			},
			min : 0
		},
		credits : {
			enabled : false
		},
		tooltip : {
			formatter : function() {
				var str = "";
				str = str + this.x + ":00";
				$.each(this.points, function(i, point) {
					if(point.series.name == '不对比') {
						var tmpname = '';
						var tmptype='';
						if(vlistKey==0){
							tmpname = "今日";
							if(vchtype==1){
								tmptype="新增";
							}else{
								tmptype="启动";
							}
						}else{
							tmpname = "昨日";
							if(vchtype==1){
								tmptype="新增";
							}else{
								tmptype="启动";
							}
						}
						str += '<br/>' + tmpname +'  '+tmptype+ ':' + this.y + vtypef;
					} else {
						str += '<br/>' + point.series.name + ': ' + this.y + vtypef;
					}
				});
				return str;
			},
			shared : true
		},
		legend : {
			enabled : false,
			symbolWidth : 20
		},
		plotOptions : {
			series : {
				fillOpacity :0.03,
				dataLabels : {
					shadow : false
				}
			},
			line : {
				lineWidth : 2,
				states : {
					hover : {
						lineWidth : 3
					}
				},
				marker : {
					enabled : false,
					states : {
						hover : {
							enabled : true,
							symbol : 'circle',
							radius : 2,
							lineWidth : 1
						}
					}
				}
			},
			area : {
				marker : {
					enabled : false
				}
			}
		},
		series : [{
			name : '前一天',
			color : '#AADFF3',
			legendIndex : 1,
			data : yinfo
		}, {
			name : '上周同期',
			color : '#AADFF3',
			legendIndex : 2,
			data : ywinfo
		}, {
			name : '上月同期',
			color : '#AADFF3',
			legendIndex : 3,
			data : yminfo
		}, {
			name : '不对比',
			legendIndex : 4,
			color : '#0066CC',
			data : info
		}]
	});
	selectLine(vlineName);
}

function getLine(data) {
	if(isEmpty(data)) {
		thrDaybarModel = data.data0108;
		setLine(vThrDaylistKey);
	}
}

function setLine(listKey) {
	var info, time, renderTo;
	var vname = "";
	var vtypef = "";
	vThrDaylistKey = listKey;
	var vdefaultSeriesType = "area";
	switch(listKey) {
		case 0:
			vname = "新增用户";
			vtypef = "个";
//			info = changeStrToJson(thrDaybarModel.data0001);
			info = thrDaybarModel.data0001;
			time = thrDaybarModel.data0001Categorie;
			renderTo = '000102';
			break;
		case 1:
			vname = "活跃用户";
			vtypef = "个";
//			info = changeStrToJson(thrDaybarModel.data0002);
			info = thrDaybarModel.data0002;
			time = thrDaybarModel.data0002Categorie;
			renderTo = '000202';
			break;
		case 2:
			vname = "平均使用时长";
			vtypef = "秒";
//			info = changeStrToJson(thrDaybarModel.data1002);
			info = thrDaybarModel.data1002;
			time = thrDaybarModel.data1002Categorie;
			renderTo = '100202';
			break;
		case 3:
			vname = "启动次数";
			vtypef = "次";
//			info = changeStrToJson(thrDaybarModel.data0003);
			info = thrDaybarModel.data0003;
			time = thrDaybarModel.data0003Categorie;
			renderTo = '000302';
			break;
		case 4:
			vname = "累计用户总数";
			vtypef = "个";
//			info = changeStrToJson(thrDaybarModel.data9005);
			info = thrDaybarModel.data9005;
			time = thrDaybarModel.data9005Categorie;
			renderTo = '900502';
			break;
		default:
			vname = "新增用户";
			vtypef = "个";
//			info = changeStrToJson(thrDaybarModel.data0001);
			info = thrDaybarModel.data0001;
			time = thrDaybarModel.data0001Categorie;
			renderTo = '000102';
			break;
	}

	var fillOpacity=0.03;
	if(listKey==4){
		fillOpacity=0.3;
	}else if(listKey==1){
		fillOpacity=0.6;
	}
	if(listKey != 1) {
		chartThrline = new Highcharts.Chart({
			chart : {
				renderTo : renderTo,
				defaultSeriesType : vdefaultSeriesType,
				backgroundColor : backgroundColorinfo,
				marginTop : 20
			},
			title : {
				text : ''
			},
			xAxis : {
				categories : time,
				tickInterval : getTickInterval(info)+1,
				tickmarkPlacement: 'on',
				labels : {
					formatter : function() {
						return changeStringDateToDate(this.value);
					}
				}
			},
			yAxis : {
				title : {
					text : ''
				},
				min : 0,
				labels: {
					formatter: function() {
						if(listKey==2){
							return intTotime(this.value)+' s';
						}else{
							return this.value;
						}
					}
				}
			},
			credits : {
				enabled : false
			},
			tooltip : {
				enabled : true,
				formatter : function() {
					if(this.point.text!=null&&this.point.text!=""){
						return '<b>' + this.series.name + '</b><br/>' + changeStringDateToDate(this.x) + ' :  ' + this.y + vtypef+"<br/><strong>点击查看</strong>";
					}else{
						return '<b>' + this.series.name + '</b><br/>' + changeStringDateToDate(this.x) + ' :  ' + this.y + vtypef;
					}
				}
			},
			legend : {
				enabled : false
			},
			plotOptions : {
				series: {
			            	fillOpacity: fillOpacity,
			            	 dataLabels: {
				               shadow: false
				            },
							cursor: 'pointer',
							point: {
								events: {
									click: function() {
										var textcallback=getMilePostContent(this,tmpnum);
										tmpnum++;
										if(textcallback!=""){
											hs.htmlExpand(null, {
												pageOrigin: {
													x: this.pageX, 
													y: this.pageY
												},
												headingText: "里程碑",
												maincontentText: textcallback,
												width: 250,
												height:160
											});
										}
									}
								}
							},
							marker: {
								lineWidth: 1
							}
						},
				line : {
					lineWidth : 2,
					states : {
						hover : {
							lineWidth : 3
						}
					},
					marker : {
						enabled : false,
						states : {
							hover : {
								enabled : true,
								symbol : 'circle',
								radius : 2,
								lineWidth : 1
							}
						}
					}
				},
				area : {
					marker : {
						enabled : true,
						states : {
							hover : {
								enabled : false
							}
						}
					}
				}
			},
			series : [{
				name : vname,
				color : "#0066CC",
				data : info
			}]
		});

	} else {
		var newuser, activeuser;
		if(thrDaybarModel != null && thrDaybarModel != "") {
			var contrastactiveuser = thrDaybarModel.data0002;
			var contrastnewuser = thrDaybarModel.data0001;
			var tmpkeepuser;
			if(contrastnewuser != null) {
				tmpkeepuser =new Array();
				var jsonvalue;
			 	for(var c in contrastnewuser){
			 		var i= contrastactiveuser[c].y - contrastnewuser[c].y;
			 		if(i<0){
			 			i=0;
			 		}
					jsonvalue=new JsonDataBean();
					jsonvalue.text=contrastactiveuser[c].text;
					jsonvalue.jsonid=contrastactiveuser[c].jsonid;
					jsonvalue.y=i;
					jsonvalue.marker.enable=contrastactiveuser[c].marker.enable;
					jsonvalue.marker.symbol=contrastactiveuser[c].marker.symbol;
					jsonvalue.marker.radius=contrastactiveuser[c].marker.radius;
			 		tmpkeepuser.push(jsonvalue);
			 	}
			}
			//newuser = changeStrToJson(contrastnewuser);
			newuser = contrastnewuser;
			activeuser =tmpkeepuser;
		}
		chartThrline = new Highcharts.Chart({
			chart : {
				renderTo : renderTo,
				defaultSeriesType : vdefaultSeriesType,
				backgroundColor : backgroundColorinfo
			},
			title : {
				text : ''
			},
			xAxis : {
				categories : time,
				tickInterval : getTickInterval(info)+1,
				 tickmarkPlacement: 'on',
				labels : {
					align : 'left',
					formatter : function() {
						return changeStringDateToDate(this.value);
					}
				}
			},
			yAxis : {
				title : {
					text : ''
				}
			},
			legend : {
				enabled : true
			},
			tooltip : {
				formatter : function() {
					if(this.point.text!=null&&this.point.text!=""){
						return '' + this.series.name + ': <br/>' + changeStringDateToDate(this.x) + " " + this.y + vtypef+"<br/>点击查看";
					}else{
						return '' + this.series.name + ': <br/>' + changeStringDateToDate(this.x) + " " + this.y + vtypef;
					}
				}
			},
			plotOptions : {
				series: {
			            	fillOpacity: fillOpacity,
			            	 dataLabels: {
				               shadow: false
				            },
							cursor: 'pointer',
							point: {
								events: {
									click: function() {
										var textcallback=getMilePostContent(this,tmpnum);
										tmpnum++;
										if(textcallback!=""){
											hs.htmlExpand(null, {
												pageOrigin: {
													x: this.pageX, 
													y: this.pageY
												},
												headingText: "里程碑",
												maincontentText: textcallback,
												width: 250,
												height:160
											});
										}
									}
								}
							},
							marker: {
								lineWidth: 1
							}
						},
				area : {
					stacking : 'normal',
					lineWidth : 1,
					marker : {
						enabled : true,
						lineWidth : 1,
						states : {
                            hover : {
                                enabled : false
                            }
                        }
					}
				}
			},
			credits : {
				enabled : false
			},
			series : [{
				name : '新用户',
				xAxis : 0,
				color : "#0066CC",
				data : newuser
			}, {
				name : '老用户',
				color : "#CB4B4B",
				xAxis : 0,
				data : activeuser
			}]
		});
	}
	tobaidu();
}

//lineName为：不对比或前一天或上周 同期或上月同期
function selectLine(lineName) {
	vlineName = lineName;
	var series = chartline.series
	var selectcount = -1;
	for(var i = 0; i < series.length; i++) {
		if(chartline.series[i].name != '不对比') {
			chartline.series[i].hide();
		}
		if(chartline.series[i].name == lineName) {
			selectcount = i;
		}
	}
	if(selectcount != -1) {
		chartline.series[selectcount].show();
	}

}

//选择0：今日 1：昨日，调整样式
function tagLine(showContent, selfObj, linekey) {
	// 操作标签
	var tag = document.getElementById("twooLine").getElementsByTagName("li");
	var taglength = tag.length;
	for( i = 0; i < taglength; i++) {
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	// 操作内容
	for( i = 0; j = document.getElementById("two_" + i); i++) {
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	vlistKey = linekey;
	askServlet('0107', '', '', vlistKey, getNewUserLine);
}

//falg  1：新增用户 2：启动次数
function tagsChType(selfObj, falg) {
	// 操作标签
	var tag = document.getElementById("twooChType").getElementsByTagName("li");
	var taglength = tag.length;
	for( i = 0; i < taglength; i++) {
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	selectChType(falg);
}

//str  不对比，前一天，上周同期，上月同期
function tagsLine(selfObj, str) {
	// 操作标签
	var tag = document.getElementById("twoo").getElementsByTagName("li");
	var taglength = tag.length;
	for( i = 0; i < taglength; i++) {
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	selectLine(str);
}

function selectthrdayTag(showContent, selfObj, linekey) {
	// 操作标签
	var tag = document.getElementById("tagsthrday").getElementsByTagName("li");
	var taglength = tag.length;
	for( i = 0; i < taglength; i++) {
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	// 操作内容
	for( i = 0; j = document.getElementById("tagContentthrday" + i); i++) {
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	setLine(linekey);

}

//val  1：新增用户 2：启动次数
function selectChType(val) {
	vchtype = val;
//	destroy();
	setNewUserLine(vlistKey);
}

function SetCwinHeight(ifid) {
	var iframeid = document.getElementById(ifid);
	//iframe id
	if(document.getElementById) {
		if(iframeid && !window.opera) {
			if(iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
				iframeid.height = iframeid.contentDocument.body.offsetHeight;
			} else if(iframeid.Document && iframeid.Document.body.scrollHeight) {
				iframeid.height = iframeid.Document.body.scrollHeight;
			}
		}
	}
}

function setHref(tmphref) {
	window.location.href = basePath + tmphref;
}// JavaScript Document