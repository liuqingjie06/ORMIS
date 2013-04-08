var benchmarktype;
var scale;
var benchmarkspecialsymbol="%";
var tmpbenchmarksymbol;

var selectOptions='<option value="-1">全部应用</option>' +
		'<option value="19">书籍</option>' +
		'<option value="-2">游戏</option>'+
		'<option value="20">娱乐</option>' +
		'<option value="10">社交</option>' +
		'<option value="17">购物与电商</option>' +
		'<option value="11">生活</option>' +
		'<option value="16">工具</option>' +
		'<option value="21">效率</option>' +
		'<option value="22">天气</option>' +
		'<option value="23">体育</option>' +
		'<option value="24">音乐</option>' +
		'<option value="25">新闻</option>' +
		'<option value="26">报刊杂志</option>' +
		'<option value="27">参考</option>' +
		'<option value="28">导航</option>' +
		'<option value="29">财务金融</option>' +
		'<option value="12">健康健美</option>' +
		'<option value="30">教育</option>' +
		'<option value="31">旅游与出行</option>' +
		'<option value="32">商业</option>' +
		'<option value="9">摄影录像</option>' +
		'<option value="33">医疗</option>' +
		'<option value="13">动态壁纸</option>' +
		'<option value="14">窗口小部件</option>' +
		'<option value="8">其他</option>' ;
				
var data_ruler_jsp='<div class="fmkserver"><i></i>' +
		'<div class="fmkser_title">' +
		'<b class="l">行业基准数据</b>' +
		'<div class="l relative Exp"><font onclick="sever(\'Benchmark\',\'Benchmarkc\');">?</font>'+
		'<div class="server" id="Benchmark" style="width:500px;">'+
                       '<div class="ser_title">'+
                           '<b class="l">功能说明</b>'+
                           '<a class="r" href="#this" id="Benchmarkc"><img src="../images/server_close.gif" /></a>'+
                       '</div>'+
                       '<div class="ser_txt">'+
                           '<dl>'+
                               '<dt style="height:auto"><p>行业基准数据（Benchmarks）中提供了移动应用关键指标的行业均值，以帮助您清晰的找到自己在行业中的位置，看清自己还有多大的优化空间。为保证基准值的准确有效，我们去除了异常样本，只有累计用户过万，并持续活跃的应用才会参与计算。</p></dt><dt  style="height:100px"><font style="width: 41px; margin-right: 0px;">用法：</font><small style="width: 420px;">窗口中较大的粗体数字即为基数数值，而其后的箭头和较小的数字则代表您的应用高出（低于）行业基准数值的比例；<br>通过点选不同的应用类型可查看各种应用分类的不同基准数据，某些冷门类型可能会因样本过少而不会给出数据。</small></dt>'+
                               '</dl></div></div>'+
		
		'</div>'+
		'<a class="r fmkcl" href="javascript:void(0);"><img src="../images/custom_close.png" /></a>' +
		'</div>' +
		'<div class="fmkser_txt">' +
		'<p>' +
		'<span>全部应用</span><font id="allScale"></font><strong id="allTrend" class="bt"></strong><small id="allTrendScale"></small></p><p class="bottunDiv2" style="border:0; margin-top:5px;">' +
		'<select id="productype" onchange="changeProductType();" style="position:absolute; left:75px">' +
		selectOptions+
		'</select>' +
		'<font id="otherAPPScale"></font><strong id="otherAPPTrend"></strong><small id="otherAPPTrendScale"></small>' +
		'</p>' +
		'</div>' +
		'</div>';

		var currentbenchmarkid;                     //当前展开的ID,每次点击B时跟他比较如果一样，关掉benchmark,如果不一样展开
		var numafterpoint=1;
		function openBenchMark(selObject){
			$(".fmk div").remove();
			var benchmarkid=selObject.parentNode.id;
			tmpbenchmarksymbol=benchmarkspecialsymbol;
			if(pagename=="概况统计"&&benchmarkid=="bench_mark_avgstartup-100122"){
				benchmarkspecialsymbol="";             //应用概况页面每日人均不带%
			}else if(pagename=="概况统计"){
				benchmarkspecialsymbol="%";   
			}else{
				benchmarkspecialsymbol=benchmarkspecialsymbol;
			}
			if(benchmarkid=="bench_mark_daudividewau-1114info"){
				numafterpoint=2;
			}else{
				numafterpoint=1;
			}
			if(currentbenchmarkid!=benchmarkid){
				currentbenchmarkid=benchmarkid;
				$("#"+benchmarkid).append(data_ruler_jsp);
				$("#productype").sSelect();
				var index=benchmarkid.lastIndexOf("-");
				benchmarktype=benchmarkid.substring(0,index);
				scale=benchmarkid.substring(index+1);
				askAllAndSelfBenck_MarkServert();
				askOtherAndSelfAPPBenck_MarkServert();
			}else{
				currentbenchmarkid=0;
			}
			
			$(".fmkcl").click(function(){
				$(".fmkcl").parent().parent().remove();
				currentbenchmarkid=0;
			});
		}
		
		function askAllAndSelfBenck_MarkServert(){
			var starttime,endtime;
			if(pagename=="留存率"){
				starttime = document.getElementById("start").innerHTML;
				endtime = document.getElementById("end").innerHTML;
			}
			var url=basePath+'servlet/TenddataBenchMarkServlet';
			var vtimecc=Math.random();
			var params = {
				 productid:-1,
				 platformid:-1,
				 item:benchmarktype,
				 itemValueNum:"benchmark_info",
				 startTime:starttime,
				 endTime:endtime,
				 timecc:vtimecc
			};
			$.getJSON(url,params,setAllAndSelfBenchMarkData);
		}
		
		function setAllAndSelfBenchMarkData(data){
			if(isEmpty(data)){
				var tmpdata=data.benchmark;
				if(tmpdata!=null){
					$("#allScale").html(dataFix(tmpdata,numafterpoint)+benchmarkspecialsymbol);
					var currentScale=$("#"+scale).text();
					var arrow=parseFloat(currentScale)-parseFloat(tmpdata);
					if(arrow<0){
						$("#allTrend").addClass("bf");
						$("#allTrend").removeClass("bt");
					}else{
						$("#allTrend").removeClass("bf");
						$("#allTrend").addClass("bt");
					}
					if(tmpdata==0){
						$("#allTrendScale").html("0.0%");
					}else{
						$("#allTrendScale").html(Math.abs(dataFix(arrow/tmpdata*100,numafterpoint))+"%");
					}
				}else{
					$("#allScale").html("--");
					$("#allTrend").html("&nbsp;&nbsp;");
					$("#allTrendScale").html("--");
				}
			}else{
				$("#allScale").html("--");
				$("#allTrend").html("&nbsp;&nbsp;");
				$("#allTrendScale").html("--");
			}
			
		}
		
		
		function askOtherAndSelfAPPBenck_MarkServert(){
			var starttime,endtime;
			if(pagename=="首日留存"){
				starttime = document.getElementById("start").innerHTML;
				endtime = document.getElementById("end").innerHTML;
			}
			var url=basePath+'servlet/TenddataBenchMarkServlet';
			var type=$("#productype").val();
			var vtimecc=Math.random();
			var params = {
				 productid:-1,
				 platformid:-1,
				 item:benchmarktype,
				 itemValue:type,
				 itemValueNum:"benchmark_info",
				 startTime:starttime,
				 endTime:endtime,
				 timecc:vtimecc
			};
			$.getJSON(url,params,setOtherAndSelfBenchMarkData);
		}
		
		function setOtherAndSelfBenchMarkData(data){
			if(isEmpty(data)){
				var tmpdata=data.benchmark;
				if(tmpdata!=null){
					$("#otherAPPScale").html(dataFix(tmpdata,numafterpoint)+benchmarkspecialsymbol);
					var currentScale=$("#"+scale).text();
					var arrow=parseFloat(currentScale)-parseFloat(tmpdata);
					if(arrow<0){
						$("#otherAPPTrend").removeClass("bt");
						$("#otherAPPTrend").addClass("bf");
					}else{
						$("#otherAPPTrend").removeClass("bf");
						$("#otherAPPTrend").addClass("bt");
					}
					if(tmpdata==0){
						$("#otherAPPTrendScale").html("0.0%");
					}else{
						$("#otherAPPTrendScale").html(Math.abs(dataFix(arrow/tmpdata*100,numafterpoint))+"%");
					}
				}else{
					$("#otherAPPScale").html("--");
					$("#otherAPPTrend").html("&nbsp;&nbsp;");
					$("#otherAPPTrendScale").html("--");
				}
			}else{
				$("#otherAPPScale").html("--");
				$("#otherAPPTrend").html("&nbsp;&nbsp;");
				$("#otherAPPTrendScale").html("--");
			}
		}
		
		function changeProductType(){
			askOtherAndSelfAPPBenck_MarkServert();
		}
		
		function getAllBenchMarkKeepUser(){
			var url=basePath+'servlet/TenddataBenchMarkServlet';
			var vtimecc=Math.random();
			var params = {
				 productid:-1,
				 platformid:-1,
				 type:1,
				 item:"keepuser",
				 itemValueNum:"benchmark_keepuser_info",
				 timecc:vtimecc
			};
			$.getJSON(url,params,setAllBenchMarkKeepUser);
		}
		
		function getOtherBenchMarkKeepUser(type){
			var url=basePath+'servlet/TenddataBenchMarkServlet';
			var vtimecc=Math.random();
			var params = {
				 productid:-1,
				 platformid:-1,
				 type:1,
				 item:"keepuser",
				 itemValue:type,
				 itemValueNum:"benchmark_keepuser_info",
				 timecc:vtimecc
			};
			$.getJSON(url,params,setOtherBenchMarkKeepUser);
		}
		
		function openKeepLoseBenchMark(type){
			if(type){
				var keeplosebenchmarkname=$("#keeploseprotype option:selected").text();
				$("#benchmarkinfo").html(keeplosebenchmarkname+"--新增用户流失漏斗");
			}else{
				$("#benchmarkinfo").html("全部应用--新增用户流失漏斗");
			}
			document.getElementById("benchmarkdiv").style.display="block";
			document.getElementById("benchmarkinfo").style.display="block";
			var url=basePath+'servlet/TenddataBenchMarkServlet';
			var vtimecc=Math.random();
			var params = {
				 productid:-1,
				 platformid:-1,
				 type:2,
				 item:"keepuser",
				 itemValue:type,
				 itemValueNum:"benchmark_keeplose_info",
				 timecc:vtimecc
			};
			$.getJSON(url,params,setBenchMarkKeepLose);
		}// JavaScript Document