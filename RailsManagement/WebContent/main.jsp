<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>铁路工务管理信息系统</title>
<script type="text/javascript">
var pageid = "";
var childaccount = "null";
</script>
<script type="text/javascript" src="js/timeflag.js"></script>
<script type="text/javascript" src="js/getParameter.js"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript" src="js/summarizejs/summarize.js"></script>
<script src="js/Tab.js"></script>
<link href="css/WdatePicker.css" rel="stylesheet" type="text/css">
<style type="text/css">.highslide img {cursor: url(http://www.highcharts.com/highslide/graphics/zoomin.cur), pointer !important;}.highslide-viewport-size {position: fixed; width: 100%; height: 100%; left: 0; top: 0}</style>
<script type="text/javascript" src="js/baidu.js"></script>

 
</head>


<body onload="initSearch();">


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="images/Talkingdata.ico" type="image/x-icon" />
<link href="css/css.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"> var basePath="http://analytics.talkingdata.net:80/"; </script>
<script type="text/javascript"> var username="Demo"; </script>
<script type="text/javascript" language="javascript" src="js/check.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/highcharts.js"></script>
<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
<script src="js/jquery.select-1.3.6.js"></script>
<script src="js/util.js"></script>
<script src="js/Data_Ruler.js"></script>
<script type="text/javascript" src="js/highslide/highslide-full.min.js"></script>
<script type="text/javascript" src="js/highslide/highslide.config.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="css/highslide.css" />

 <script src="js/select2.min.js"></script>
<link href="css/select2.css" rel="stylesheet"/>
<script type="text/javascript">
	var sevenTimeFlag=1,thrTimeFlag=1;
	var pagename="";
	var datatimeflag;
	var checkplatform=0;
	var backgroundColorinfo='#f3f4f9';
	function vselSearch(productid,platformid){
		var dateFlag=30;
		vtimeflag=dateFlag;
		var tmptimecc=Math.random();
		var url=basePath+"servlet/ProductOptionServlet";
		if(productid!=null&&productid!=""&&platformid!=null&&platformid!=""){
			var params = {
				servertype:1,
				vproductid:productid,
				vplatformid:platformid,
				vtmptimecc:tmptimecc
			};
		}else{
			var params = {
				servertype:0,
				vtmptimecc:tmptimecc
			};
		}
		$.getJSON(url,params,initcallback);
	}
	
	function selSearch(){
		var dateFlag=30;
		vtimeflag=dateFlag;
		var tmptimecc=Math.random();
		var url=basePath+"servlet/ProductOptionServlet";
		var params = {
				servertype:0,
				vtmptimecc:tmptimecc
			};
		$.getJSON(url,params,initcallback);
	}
	
	
	function initcallback(data){
				var productlist=data.productList;
				var platformlist=data.platformlist;
				var productid=data.productid;
				var platformid=data.platformid;
				$("#productTxt option").remove();
				$("#productTxt").append("<option value='-1'>全部应用</option>");
				if(username=="Demo"){
					if(productlist!=null){
						for(var i=0;i<productlist.length;i++){
							if(productlist[i].productname=="脑筋急转弯高难版"){
								$("#productTxt").append("<option value='"+productlist[i].productid+"'>演示应用</option>");
							}
						}
					}
				}else{
					if(productlist!=null){
						for(var i=0;i<productlist.length;i++){
							$("#productTxt").append("<option value='"+productlist[i].productid+"'>"+productlist[i].productname+"</option>");
						}
					}
				}
				$("#productTxt option[value='"+productid+"']").attr('selected',true); 
				$("#productTxt").sSelect();
				//添加下拉列表事件
				$("#productTxt").change(function()  
				{  
					var tmptimecc=Math.random();
				    try{
			    	 	destroy();
			    	} 
					catch(e){
					} 
					 var checkValue=$("#productTxt").val(); 
					 if(checkValue!=-1){
					 	 var url=basePath+"servlet/ProductOptionServlet";
						 var params = {
							         servertype:1,
							         vproductid:checkValue,
							         vplatformid:platformid,
							         vtmptimecc:tmptimecc
							    };
						$.getJSON(url,params,selectcallback);
					 }else{
						window.location.href = basePath + "webpage/AllProductSurveyInfo.jsp";
					 }					
				});
				setPlatformOption(platformlist,platformid);
				//verify(vtimeflag);	
	}
	
	function dreload(){
			document.location.reload();
	}
	
	function selectcallback(data){
				dreload();
				var productlist=data.productList;
				var platformlist=data.platformlist;
				var productid=data.productid;
				var platformid=data.platformid;
				setPlatformOption(platformlist,platformid);
				
	}
	
	var topvplatforms="",topvplatformsName="";
			function setPlatformOption(platformlist,platformid){
				if(platformid == "3"){
					platformid = "1,2";
				}else if(platformid == '5'){
					platformid = "1,4";
				}else if(platformid == "6"){
					platformid = "2,4";
				}else if(platformid == '7'){
					platformid = '1,2,4';
				}
				topvplatforms="";
				topvplatformsName="";
				$("#productList option").remove();
				if(platformlist!=null){
					checkplatform=0;
					for(var i=0;i<platformlist.length;i++){
						if(platformlist[i].platform==2){
							checkplatform=1;
						}
						$("#productList").append("<option value='"+platformlist[i].platform+"'>"+platformlist[i].platformname+"</option>");
						if(pagename!='访问页面'){
						if(i==0){
								topvplatforms=topvplatforms+platformlist[i].platform;
								topvplatformsName=topvplatformsName+platformlist[i].platformname;
							}else{
								topvplatforms=topvplatforms+","+platformlist[i].platform;
								topvplatformsName=topvplatformsName+"+"+platformlist[i].platformname;
							
						}
						}
					}
					checkbreakli();
					if(pagename!='访问页面'){
						if(platformlist.length>1){
							$("#productList").append("<option value='"+topvplatforms+"'>"+topvplatformsName+"</option>");
						}
					}
				}
				$("#productList option[value='"+platformid+"']").attr('selected',true);  
				$("#productList").sSelect();
				//changeLeftDisplay(platformid)
				//添加下拉列表事件
				$("#productList").unbind("change");
				if(platformid.indexOf(",")!=-1){
					 	vplatforms=topvplatforms;
					 	vplatformtype=1;
					 }else{
					 	vplatforms="";
					 	vplatformtype=0;
					 }
				selectRegisterTime();
				$("#productList").change(function()  
				{  
					var tmptimecc=Math.random();
					try{ 
						destroy();
					} 
					catch(e){
					} 
					 var checkValue=$("#productTxt").val();
					 var checkpValue=$("#productList").val(); 
					 if(checkpValue.indexOf(",")!=-1){
					 	vplatforms=topvplatforms;
					 	vplatformtype=1;
					 }else{
					 	vplatforms="";
					 	vplatformtype=0;
					 }
					 var url=basePath+"servlet/ProductOptionServlet";
					 var params = {
						         servertype:1,
						         vproductid:checkValue,
						         vplatformid:checkpValue,
						         vtmptimecc:tmptimecc
						    };
					$.getJSON(url,params,optioncallback);
				});
			}
			
			function optioncallback(data){
				selectRegisterTime();
			}
			
			function selectRegisterTime(){
				timecc=Math.random();
				var checkValue=$("#productTxt").val();
				var checkpValue=$("#productList").val();
				var url=basePath+"servlet/ProductServlet";
				var params={
					servertype:8,
					productid:checkValue,
		         	platformid:checkpValue,
		         	platforms:vplatforms,
					timecc:timecc
				}
				$.get(url,params,registerback);
			}
			
			function registerback(data){
				var datas=data.split(",");
				refresh(datas[0]);
				sevenTimeFlag=parseInt(datas[1]);
				thrTimeFlag=parseInt(datas[2]);
				selectChose();
				verify(vtimeflag);
			}
			
			function logout(){
				var vtimecc=Math.random();
				var url=basePath+"servlet/UserLoginServlet";
				var params = {
					servertype:1,
					timcc:vtimecc
				};
				$.get(url,params,logcallback);
			}
			
			function logcallback(data){
				delCookie("talkdataCookieEmail");
		   		delCookie("talkdataCookiePassWord");
		   		delCookie("talkdataCookieCheck");
				window.location.href=basePath+"page/login.jsp"
			}
			
			function insertfeedback(){
 				 var vtimecc=Math.random();
				 var url=basePath+"servlet/FeedBackServlet?timecc="+vtimecc;
			 	 var feedbackinfo=$("#feedbackinfo").val();
			 	 var vproductid=$("#productTxt").val();
			 	 var vpagename=pagename;
				 if(feedbackinfo==null||feedbackinfo==""){
				 	alert("请输入反馈内容");
				 }else if(feedbackinfo.length>255){
				 	alert("您输入的信息过长");
				 }else{
				 	var params={
				 	 	feedbackinfo:feedbackinfo,
				 	 	productid:vproductid,
				 	 	pagename:vpagename
				 	 };
				 	 $.get(url,params,feedbackcallback);		
				 }
 			}
 			
 			function feedbackcallback(data){
 				if(data=="1"){
 					alert("反馈提交成功");
					document.getElementById("fktxt").style.display="none";
					document.getElementById("xy").style.display="none";
 				}else{
 					alert("反馈提交失败");
 				}
 			}
			
//弹出窗口插件
function feedback(txt,bg,colse){
	document.getElementById("feedbackinfo").value="";
		var txt=txt;
		var bg=bg;
		var sHeight=document.body.clientHeight;
		var dheight=document.documentElement.clientHeight;
		var srctop=document.documentElement.scrollTop;
		if($.browser.safari){
			srctop=window.pageYOffset;
		}
		$(".xy").css({"height":dheight});
		dheight=(dheight - $("#"+txt).height())/2;
		$("#"+txt).show();
		$("#"+bg).show();
		$("#"+txt).css({"top":( srctop+ dheight) + "px"});
		$("#"+bg).css({"top":(srctop ) + "px"});
		window.onscroll =function scall(){
			var srctop=document.documentElement.scrollTop;
		if($.browser.safari){
			srctop=window.pageYOffset;
		}
			$("#"+txt).css({"top":(srctop+ dheight) + "px"});
			$("#"+bg).css({"top":(srctop) + "px"});
			
		$("#fkicon").css({
			top : srctop + (innerHeights / 2)
		});
 			window.onscroll = scall;
			window.onresize = scall;
			window.onload = scall;
		}
		$("."+colse).click(function(){
		$("#"+txt).hide();
		$("#"+bg).hide();
		})
}	
	
function backreg(){
	window.location.href = basePath + "register.jsp";
}
</script>
</head>
<!--头部开始 !-->
<div class="web">
<div style="position:absolute; right:0px; top:0px; z-index:1"></div>
<!-- 新反馈功能!-->

	<!--div id="fkicon"><img border=0 onclick="backreg();" src="images/reg.png" /></div-->


<div class="xytxt" id="fktxt" style="width:600px; margin-left:-300px;">
		<div class="xytitle"><h1>请输入您的反馈信息：</h1><a href="javascript:void(0);" class="fkcolse r"><img src="../images/close.gif" /></a></div>
        <ul>
            <li><textarea id="feedbackinfo" name="feedbackinfo" style="width:590px; padding-left:10px; margin:10px 0; height:200px; border:1px solid #dedede;"></textarea></li>
            <li><a href="javascript:void(0);" class="submitto fkcolse"   style="margin-left:10px; display:inline;  float:right"><font>取消</font></a><a class="submitto" onclick="insertfeedback();" style="float:right"><font>提交</font></a></li>
    	</ul>	
</div>
<!-- 新反馈功能结束!-->

<div  class="top">
	<div class="header">
		
			<div class="logo l">
            	<a href="http://analytics.talkingdata.net:80/index.jsp">
                	<img src="images/railmaps_logo.png" alt="Talking Data" title="Talking Data" width="203" height="43" />
                </a>
            </div>
            <div class="nav l" style="padding-left:40px">
            	<font> 铁路工务信息管理系统</font>
            </div>
      
		  <div class="nav r" style="padding-right:10px">
              <font>
                  <a href="http://analytics.talkingdata.net:80/page/login.jsp" id="logincenter">登录</a>
              </font>|
              <font>
              		<a href="http://analytics.talkingdata.net:80/register.jsp" id="registercenter">注册</a>
              </font>
          </div>
	</div>
    <div class="toptitle">
    	<div class="l">
        	<span><strong><a href="javascript:void(0);" >产品中心</a>	</strong>&gt;</span>
            	<div id="dropdown_productTxt" class="selectlist margins" style="height: 22.18181824684143px; float: left;">
                <div class="relative" id="productTxt__jQSelect0" tabindex="0" style="z-index: auto;">
                <select name="images/input_list_top.gif" id="productTxt" title="产品名称" class="selecttopicon" style="z-index: 999; display: none;">
    	  			
   	  			<option value="-1">全部应用</option>
                <option value="10122" selected="selected">演示应用</option>
                </select><div class="dropselect"><div class="selectIcon"><font class="selectt" id="productTxt_icon"></font><font class="selectb" id="productTxt_icont"></font></div><h4 title="演示应用" class="over">演示应用</h4></div><ul id="dropselistbox" style="width: 92.18181824684143px; top: 28px; display: none;"></ul></div></div>
                <span>&gt;</span>
                
                <div id="dropdown_productList" class="selectlist margins" style="height: 22.399999976158142px; float: left;">
                    <div class="relative" id="productList__jQSelect0" tabindex="0" style="z-index: auto;">
                        <select name="images/input_list_top.gif" id="productList" title="平台" class="selectbttomicon" style="z-index: 999; display: none;">
    	  			
   	  			            <option value="1" selected="selected">Android</option>
                        </select>
                        <div class="dropselect">
                            <div class="selectIcon">
                                <font class="selectt" id="productList_icon">
                                </font><font class="selectb" id="productList_icont"></font>
                            </div>
                            <h4 title="Android" class="over">Android</h4>
                        </div>
                            <ul id="dropselistbox" style="width: 81.39999997615814px; top: 28px; display: none;"></ul>
                </div></div>
                <div id="dropdown_productList" class="selectlist margins" style="height: 22.399999976158142px; float: left;">
                    <div class="relative" id="productList__jQSelect0" tabindex="0" style="z-index: auto;">
                    <script>
        				$(document).ready(function() { $("#e1").select2(); });
    				</script>
                        <select id="e1">
        						<option value="AL">Alabama</option>
       							 <option value="WY">Wyoming</option>
    					</select>
                    
                    </div>
                </div>
                

        </div>
        <a href="document_web/index.jsp?statistics" target="_blank" class="r">帮助</a>
    </div>
</div>
<div id="minweb">
<script src="js/index.js"></script>
    <script>
		mainheight();
	</script>
<!--头部结束 !-->


<!-- 数据标尺JS<script type="text/javascript" src="../js/Data_Ruler.js"></script>-->
<link type="text/css" rel="stylesheet" href="css/Summarize.css" />
<div class="main">
	
     

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript"> var basePath="http://analytics.talkingdata.net:80/"; </script>
</head>
<script type="text/javascript">

function checkbreakli(){

}
</script>

<s:if test="allMenu.isEmpty() == true">目前没有菜单!</s:if >
<s:else>

	<div class="menu l">
	    <ul>
	          <s:iterator value="allMenu" status="am">
	          	<s:set var="mPid" value="pid" />
	          	<s:if test="pid==-1">
	          		<s:set var="mId" value="id" />
	          		<li>
		          		<a href="#this" id="<s:property value="id" />" onclick="menu(this,'<s:property value="id" />','<s:property value="id" />close')" class="more_icon <s:property value="id" />">
		          			<span><font><s:property value="text" /></font></span>
		          		</a>
		                <ol id="<s:property value="id" />ol">
		                	<s:iterator value="allMenu" status="am1">
		                	
		                	<!-- 
		                		mId2是指二级目录的菜单id
		                		mPid2是指二级目录的父菜单 
		                	-->
		                		<s:set var="mId2" value="id" />
		                		<s:set var="mPid2" value="pid" />
		                		<s:if test="pid==#request.mId">
		                			<s:set var="mUrl" value="url" />
		                			<li><a href="<s:property value="url" />"><s:property value="text" /></a></li>
		                		</s:if>
		                	</s:iterator>
		                </ol>	
	          		</li>
	          	</s:if>
	          </s:iterator>
	          
	          
	         <%--  <li><a href="#this" id="User" onclick="menu(this,'User','Userclose')" class="more_icon User">
	          		<span><font>个人账户</font></span></a>
	                <ol id="Userol">
						<li><a href="http://analytics.talkingdata.net:80/webpage/ftrendstat.jsp">个人信息</a></li>
						<li><a href="http://analytics.talkingdata.net:80/webpage/ActiveAnalysis.jsp">工作写实</a></li>
						<li><a href="http://analytics.talkingdata.net:80/webpage/User_Time.jspidUser_Time">我的文件</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/User_Country.jsp">修改密码</a></li>
						<li><a href="">我添加的</a></li>
	                    <!--<li><a href="http://analytics.talkingdata.net:80/webpage/User_PrisonBreak.jsp" id="User_PrisonBreak" class="User_PrisonBreak">越狱破解</a></li>-->
	                </ol>	
	          </li>
	          
	           <li ><a href="#this" onclick="menu(this,'ParticipateIn','ParticipateInclose')" id="ParticipateIn" class="more_icon ParticipateIn" >
	          	 <span><font>人员管理</font></span></a>
	          		<ol id="ParticipateInol" >
						<li><a href="http://analytics.talkingdata.net:80/webpage/UserKeepInfo.jsp" id="ParticipateIn_Retain" class="ParticipateIn_Retain">干部管理</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/FirstDayKeepInfo.jsp" id="FirstDayKeepInfo" class="FirstDayKeepInfo">工人管理</a></li>
						<li><a href="http://analytics.talkingdata.net:80/webpage/UserLifeCycle.jsp" id="UserLifeCycle" class="UserLifeCycle">考勤记录</a></li>
	
	                </ol>
	          </li>
	          
			  <li><a href="#this" onclick="menu(this,'Channel','Channelclose')" id="Channel" class="more_icon Channel"><span><font>设备管理</font></span></a>
					<ol id="Channelol">
	                	<li><a href="http://analytics.talkingdata.net:80/webpage/PartnerData.jsp" id="PartnerData" class="PartnerData">设备台帐</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/PartnerData.jsp" id="PartnerData" class="PartnerData">线路管理</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/PartnerData.jsp" id="PartnerData" class="PartnerData">钢轨管理</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/PartnerData.jsp" id="PartnerData" class="PartnerData">桥隧管理</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/PartnerData.jsp" id="PartnerData" class="PartnerData">道口管理</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/PartnerData.jsp" id="PartnerData" class="PartnerData">自轮转设备管理</a></li>
	                </ol>
	           </li>
	         
	           <li><a href="#this" onclick="menu(this,'CustomEvent','CustomEventclose')"  id="CustomEvent" class="CustomEvent more_icon"><span><font>监测数据分析</font></span></a>
	          		<ol id="CustomEventol">
	            	    <li ><a href="http://analytics.talkingdata.net:80/webpage/CustomEvent.jsp" id="CustomEventProperty" class="CustomEventProperty">数据资料查看</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/CustomEvent.jsp" id="CustomEventProperty" class="CustomEventProperty">历史数据对比</a></li>
	                    <li><a href="http://analytics.talkingdata.net:80/webpage/CustomEvent.jsp" id="CustomEventProperty" class="CustomEventProperty">数据统计与分析</a></li>
	                </ol>
	          </li> --%>
	          <!--<li><a href="Domain.jsp" id="Domain" class="Domain"><span><font>行业数据</font></span></a></li>-->
	     </ul>
	</div>
</s:else>   
<div class="content l" id="right">
    	<div class="boxmax">
        	<div class="title">
            	<strong class="l">近日概况</strong>
                <span class="relative r">
                    <a href="javascript:void(0)" class="bottun4" onclick="sever('server1','server1cl');"><font>?</font></a>
                	<div class="server" id="server1" style="width:620px;">
                       <div class="ser_title">
                           <b class="l">数据指标说明</b>
                           <a class="r" href="#this" id="server1cl"><img src="../images/server_close.gif" /></a>
                       </div>
                       
                                <style>
								.ser_txt font{
									width:95px
								}
								</style>
                       <div class="ser_txt">
                           <dl>
                               <dt>
                               	<font>编号</font>
                                <small>工号</small>                               </dt>
                               <dd>
                               	<font>活跃用户</font>
                                <small>当日，有使用应用（至少启动一次）的用户。</small>
                                </dd>
                               <dt>
                               	<font>新用户占比</font>
                                <small>活跃用户中包含了新增用户和积累下的老用户，此比例为新增用户在其中所占的比率。</small>                               </dt>
                               <dd>
                               	<font>启动次数</font>
                                <small>当日，应用被开启的次数。</small>
                                </dd>
                               <dt>
                               	<font>人均启动</font>
                                <small>当日，用户平均使用应用多少次。</small>                               </dt>
                               <dd>
                               	<font>平均使用时长</font><small>用户平均单次使用应用多长时间。</small>
                                </dd>
                               <dt>
                               	<font>日活跃率</font><small>当日的活跃用户占累计用户比例。</small>                               </dt>
                               <dd>
                               	<font>累计用户总数</font><small>使用TalkingData以来统计到的用户量总值。</small>
                                </dd>
                               <dt>
                               	<font>一次性用户（%）</font><small>自新增日后再没有使用过应用的用户和他们占累计用户的比例。</small>                               </dt>
                               <dd>
                               	<font>启动总数</font><small>使用TalkingData以来应用被开启的总次数。</small>
                                </dd>
                               <dt>
                               	<font>每日人均启动</font><small>用户在一日中平均使用应用多少次。</small>                               </dt>
                               <dd>
                               	<font>周活跃（%）</font><small>最近一周（不含今日）的活跃用户数和这些用户占累计用户比率。</small>
                                </dd>
                               <dt>
                               	<font>月活跃（%）</font><small>最近一个月（按30日计，不含今日）的活跃用户数和这些用户占累计用户比率。</small>                               </dt>
                               <dd>
                               	<font>月留存率</font><small>一个月前那一天的新增用户中在最近一周还有使用应用的用户比率。</small>
                                                               </dd>
                           </dl>
                       </div>
                	</div>
                </span>
        	</div>
            <div class="textbox"  id=0104>
                <table width="100%" border="0" id="tabledata" cellspacing="0" cellpadding="0" class="table_style2">
  						<tr>
  							<td>编号</td>
                            <td>部门</td>
                            <td>姓名</td>
                            <td>职务</td>
                            <td>性别</td>
                            <td>级别</td>
                            <td>专业技术资格</td>
                            <td>出生日期</td>
                            <td>参加工作日期</td>
                            <td>取得学历</td>
                            <td>政治面貌</td>
                            <td>备注</td> 							
  						</tr>
                        <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td></td> 							
  						</tr>
                         <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td></td> 							
  						</tr>
                         <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td></td> 							
  						</tr>
                         <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td></td> 							
  						</tr>
                         <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td></td> 							
  						</tr>
                         <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td></td> 							
  						</tr>
                         <tr>
  							<td>171</td><td>枝江桥隧车间</td> <td>刘庆杰</td> <td>见习生</td><td>男</td> <td></td> <td>助理工程师</td><td>1982-4-30</td>
                            <td>2012-8-1</td> <td>普通全日制本科生</td> <td>共青团员</td> <td><a>修改</a></td> 							
  						</tr>
                         <tr>
  							<td>172</td>
                            <td>枝江桥隧车间</td>
                            <td>吴日辉</td>
                            <td>见习生</td>
                            <td>男</td>
                            <td></td>
                            <td>助理工程师</td>
                            <td>1990-4-30</td>
                            <td>2012-8-1</td>
                            <td>普通全日制本科生</td>
                            <td>党员</td>						
  						</tr>
  				</table>
               <div class="page"><div id="grid_length" class="bottunDiv l"><b class="l">每页显示</b> <div id="dropdown_grid_page" class="selectlist margins" style="height: 22.399999976158142px; float: left;"><div class="relative" id="grid_page__jQSelect0" tabindex="0" style="z-index: auto;"><select size="1" name="grid_length" id="grid_page" class="d" title="pages" style="display: none;"><option value="10" selected="selected">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select><div class="dropselect"><div class="selectIcon"><font class="selectt" id="grid_page_icon"></font><font class="selectb" id="grid_page_icont"></font></div><h4 title="10">10</h4></div><ul id="dropselistbox" style="width: 61.39999997615814px; display: none;"></ul></div></div> <b class="l">条记录</b></div><div class="dataTables_paginate paging_full_numbers" id="grid_paginate"><span class="first paginate_button paginate_button_disabled" id="grid_first">第一页</span><span class="previous paginate_button paginate_button_disabled" id="grid_previous"> 上一页 </span><span><span class="paginate_active">1</span><span class="paginate_button">2</span><span class="paginate_button">3</span><span class="paginate_button">4</span></span><span class="next paginate_button" id="grid_next"> 下一页 </span><span class="last paginate_button" id="grid_last"> 最后一页 </span></div></div>
            </div>
            
        </div>
        <div class="box">
        	<div class="contentbox l">
            	<div class="title">
            		<strong class="l">应用摘要</strong>
        			<span class="r"></span>
                </div>
                <div class="textbox" id="0105">
                	<table width="100%" border="0" id="tabledata" cellspacing="0" cellpadding="0" class="table_style2">
  						<tr>
  							<td class="left border_none"><div class="tdtxtwidth l">累计&#9;用户总数</div></td>
  							<td class="center border_none"><div class="tdtxtwidth"><strong id="900510"></strong></div></td>
                           <!--<td class="right border_none" width="30" style="padding-right:10px">&nbsp;</td>-->
  						</tr>
  						<tr>
  							<td class="left"><div class="tdtxtwidth l">一次性用户（%）</div></td>
  							<td class="center"><div class="tdtxtwidth"><strong id="000713">--</strong> ( <strong id="000813" style="font-size:15px;">--</strong> ) </div></td>
                             <td class="right" width="30" style="padding-right:10px">
                                <div id="bench_mark_onceuser-000813" class="relative fmk" style="z-index:96">
                                	<a href="javascript:void(0)" class="bottun4 nonehover"  onClick=""><font>B</font></a>
                                </div>
                            </td>
  						</tr>
                        <tr>
  							<td class="left"><div class="tdtxtwidth l">启动（总数 | 每日人均）</div></td>
  							<td class="center"><div class="tdtxtwidth"><strong><font id="000322"></font>|<font id="100122" style="font-size:15px"></font></strong></div></td>
                         	<td class="right" width="30" style="padding-right:10px">
                                <div id="bench_mark_avgstartup-100122" class="relative fmk" style="z-index:95">
                                	<a href="javascript:void(0)" class="bottun4 nonehover" onClick=""><font>B</font></a>
                                </div>
                            </td>
  						</tr>
  					</table>
                </div>
            </div>
            <div class="contentbox r">
            	<div class="title">
            		<strong class="l">活跃概况</strong>
                	<span class="r"></span>
        		</div>
                <div class="textbox" id=0106>
                	<table width="100%" border="0" cellspacing="0" id="tabledata2" cellpadding="0" class="table_style2">
  						<tr>
  							<td class="left border_none"><div class="tdtxtwidth l">周活跃（%）</div></td>
  							<td class="center border_none"><div class="tdtxtwidth"><strong id="000814"></strong>（<strong id="100314" style="font-size:15px"></strong>）</div></td>
                            <td class="right border_none" width="30" style="padding-right:10px">
                                <div id="bench_mark_weekactive-100314" class="relative fmk" style="z-index:99">
                                	<a href="javascript:void(0)" class="bottun4 nonehover" onClick=""><font>B</font></a>
                                </div>
                            </td>
  						</tr>
  						<tr>
  							<td class="left"><div class="tdtxtwidth l">月活跃（%）</div></td>
  							<td class="center"><div class="tdtxtwidth"><strong id="000914"></strong>（<strong id="100414" style="font-size:15px"></strong>）</div></td>
                            <td class="right" width="30" style="padding-right:10px">
                                <div id="bench_mark_monthactive-100414" class="relative fmk" style="z-index:98">
                                	<a href="javascript:void(0)" class="bottun4 nonehover" onClick=""><font>B</font></a>
                                </div>
                            </td>
  						</tr>
                        <tr>
  							<td class="left"><div class="tdtxtwidth l">月留存率</div></td>
  							<td class="center"><div class="tdtxtwidth"><strong id="100514"></strong></div></td>
                          	<td class="right" width="30" style="padding-right:10px">
                                <div id="bench_mark_monthkeepuser-100514" class="relative fmk" style="z-index:97">
                                	<a href="javascript:void(0)" class="bottun4 nonehover" onClick=""><font>B</font></a>
                                </div>
                            </td>
  						</tr>
  					</table>
                </div>
            </div>
            <div class="clear"></div>
        </div>
  
  		<div class="clear" id="Esboxli"></div>
        </ul><a href="#this" class="submitto" style="margin-top:20px" onclick="xytt('Addtable1','xy','Addcolse1')"><font style="font-size:16px; padding-left:30px"><b><strong style="margin-right:10px">+</strong>增加更多快捷仪表</b></font></a>
</div>
<div class="clear"></div>
</div>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script src="js/My97DatePickerBeta/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript"> var registertime="null"; </script>
	<script>
		var productid,platformid;
		var milestonedate,mileevent,mileremarks;
		var url,vtimecc,params;
		var servettype=0;   //操作行为 0：查询  1：添加  2：编辑  3：删除
		var vtimeflag=30;
		var id=0;
		var isInsertOrUpdate=0;//0默认为添加记录，1为修改
		
		function askMilePostServlet(servettype,callback){
			productid=$("#productTxt").val();
			platformid=$("#productList").val();
			if(servettype==1||servettype==2){
				milestonedate=document.getElementById("milestonedate").value;
				mileevent=document.getElementById("mileevent").value;
				mileremarks=document.getElementById("mileremarks").value;
				if(!isEmpty(milestonedate)||!isEmpty(mileevent)){
			alert("请输入里程碑的日期,事件名称");
		}else{
			if(mileevent.length>255){
				alert("请输入的名称小于255个汉字");
			}else{
				if(mileremarks.length>500){
					alert("请输入的备注小于500个汉字");
				}else{
					url=basePath+'servlet/TenddataMilePostServlet';
					vtimecc=Math.random();
					params = {
						 productid:productid,
				         platformid:platformid,
				         milestonedate:milestonedate,
						 mileevent:mileevent,
						 mileremarks:mileremarks,
						 id:id,
				         timecc:vtimecc,
				         servettype:servettype
					};
					if(servettype==0||servettype==4){
						$.getJSON(url,params,callback);
					}else{
						$.get(url,params,callback);
					}
				}
			}
		}
			}else{
				url=basePath+'servlet/TenddataMilePostServlet';
				vtimecc=Math.random();
				params = {
					 productid:productid,
			         platformid:platformid,
			         milestonedate:milestonedate,
					 mileevent:mileevent,
					 mileremarks:mileremarks,
					 id:id,
			         timecc:vtimecc,
			         servettype:servettype
				};
				if(servettype==0||servettype==4){
					$.getJSON(url,params,callback);
				}else{
					$.get(url,params,callback);
				}
			}
		}

		function updateMilePost(info){
			feedback('Addtable','xy','Addcolse');	
			id=info;
			askMilePostServlet(4,setMilePost);
		}
		
		function setMilePost(data){
			if(isEmpty(data)){
				document.getElementById("milestonedate").value=data.date;
				document.getElementById("mileevent").value=data.milename;
				if(data.remarks){
					document.getElementById("mileremarks").value=data.remarks;
				}
			}
		}
		
		function commitmile(){
			askMilePostServlet(2,updateMilePostCallback);   //提交按钮表示：修改内容
		}
		
		function updateMilePostCallback(data){
			if(data==0){
				hs.close();
				if(serviceCode=="0108"){
					askServlet('0108', '', '', '30', getLine);//应用概况页面由于askServlet形式与其他不统一，所以特别出来
				}else if(serviceCode=="0001"){
					askServletLine('0001','6',setLine);   //重新查询曲线
				}else if(serviceCode="0209TrendLine"){
					verify(vtimeflag)   //重新查询曲线
				}else{
					askServlet(serviceCode,getLine);   //重新查询曲线
				}
			}else{
				alert("操作失败");
			}
		}
		
		function deleteMilePost(info){
			id=info;
			askMilePostServlet(3,deleteMilePostCallback);
		}


		function deleteMilePostCallback(data){
			if(data==0){
				hs.close();
				if(serviceCode=="0108"){
					askServlet('0108', '', '', '30', getLine);//应用概况页面由于askServlet形式与其他不统一，所以特别出来
				}else if(serviceCode=="0001"){
					askServletLine('0001','6',setLine);   //重新查询曲线
				}else if(serviceCode="0209TrendLine"){
					verify(vtimeflag)   //重新查询曲线
				}else{
					askServlet(serviceCode,getLine);   //重新查询曲线
				}
			}else{
				alert("操作失败");
			}
		}
		
		
		//弹出窗口插件
function feedback(txt,bg,colse){
		var txt=txt;
		var bg=bg;
		var sHeight=document.body.clientHeight;
		var dheight=document.documentElement.clientHeight;
		var srctop=document.documentElement.scrollTop;
		if($.browser.safari){
			srctop=window.pageYOffset;
		}
		$(".xy").css({"height":dheight});
		dheight=(dheight - $("#"+txt).height())/2;
		$("#"+txt).show();
		$("#"+bg).show();
		$("#"+txt).css({"top":( srctop+ dheight) + "px"});
		$("#"+bg).css({"top":(srctop ) + "px"});
		window.onscroll =function scall(){
			var srctop=document.documentElement.scrollTop;
		if($.browser.safari){
			srctop=window.pageYOffset;
		}
			$("#"+txt).css({"top":(srctop+ dheight) + "px"});
			$("#"+bg).css({"top":(srctop) + "px"});
			
		$("#fkicon").css({
			top : srctop + (innerHeights / 2)
		});
 			window.onscroll = scall;
			window.onresize = scall;
			window.onload = scall;
		}
		$("."+colse).click(function(){
		$("#"+txt).hide();
		$("#"+bg).hide();
		})
}	
	</script>
</head>
<style>
#xy{
	z-index:100000
}
#Addtable{
	z-index:100001
}
	
</style>
<body>
<div class="xytxt" id="Addtable" style="width: 500px; margin-left: -250px;">
		<div class="xytitle"><h1>编缉里程碑</h1><a href="javascript:void(0);" class="Addcolse r"><img src="../images/close.gif" /></a></div>
        <div class="xytext" style="padding:15px; margin-top:10px; background:#fff; font-size:12px; font-weight:normal; border:1px solid #dedede;">
        	<ul id="inputtxt">
				<li><label class="l">里程碑日期：</label><input id="milestonedate" name="milestonedate" class="l" type="text" title="poptonefrom" onClick="WdatePicker({dateFmt:'yyyy-M-dd',minDate:'null',maxDate:'%y-%M-%d'})"/><div class="clear"></div></li>
				<li><label class="l">里程事件：</label><input id="mileevent" name="mileevent" class="l" type="text"><div class="clear"></div></li>
                <li><label class="l">备注：</label><textarea name="mileremarks" id="mileremarks" style="height: 95px;width: 373px;" class="l"></textarea><div class="clear"></div></li>
			</ul>
        </div>
        <span style="display:block; margin-top:10px"><a href="javascript:void(0);" class="submitto Addcolse"   style="margin-left:10px; display:inline;  float:right"><font>取消</font></a><a class="submitto Addcolse" onclick="commitmile();" style="float:right"><font>确定</font></a></span>
</div>
</body>
</html>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
</div>
<div class="copyright" id="copyright">
	<div class="l"> 
	
		<a href="document_web/index.jsp?statistics" id="txtbottom">功能文档</a> <a href="#this" onclick="xytt('xytxt','xy','xycolse')">服务条款</a> <a href="../contact.jsp" target="_blank" id="contactcenter">联系我们</a> <a target="_blank" href="http://weibo.com/u/2540289693" id="sinawb">新浪微博</a>
	
	
	<a target="_blank" href="http://blog.talkingdata.net" id="blog">BLOG</a></div><div class="r">Copyright © 2011-2012 <a href="http://www.miibeian.gov.cn/"  target="_blank" id="miibeian">TalkingData.net</a> 京ICP备12005794号</div>
</div>

<div class="xy" id="xy">
	
</div>
<div class="xytxt" id="xytxt" style="width:600px; margin-left:-300px;">
		<div class="xytitle"><h1>TalkingData服务条款</h1><a href="javascript:void(0);" class="xycolse r"><img src="../images/close.gif" /></a></div>
        <div class="xytext" style="padding:15px; margin-top:10px; background:#fff; font-size:12px; font-weight:normal; border:1px solid #dedede;">
        <p><strong>&#8226;</strong> 使用TalkingData数据统计分析服务的个人和公司应保证提供真实的注册信息，确保正确性和完整性，并在信息变更时及时更新相关内容。TlakingData不对因信息不属实而造成的任何损失承担责任。 </p>
        <p><strong>&#8226;</strong> 请妥善保管好您的账户信息，TalkingData不对因账户信息遗失或泄露而造成的损失承担责任。 </p>
        <p><strong>&#8226; </strong>TalkingData数据统计和分析平台保留随时变更平台所提供服务的权利，不保证提供的免费统计分析服务不会中断，对所提供服务的实时性、安全性、准确性不作绝对保证。</p>
        <p><strong>&#8226;</strong> TalkingData保留系统维护、硬件更新、系统升级的权利，并可能因以上原因造成服务的短时间暂停，不对因服务中断、停止而造成的任何损失承担任何责任。</p>
        <p><strong>&#8226;</strong> TalkingData会在服务变更和异常时尽量通知到您，但保留在未进行通知的情况下中断服务的权利。</p>
        <p><strong>&#8226;</strong> TalkingData与您共同所有您的账户中的全部信息。</p>
        <p><strong>&#8226;</strong> 因您违反了有关法律、法规或本协议规定中的任何条款而对TalkingData或任何第三方造成的损失，您同意承担由此造成的一切损害赔偿责任。</p>
        <p><strong>&#8226;</strong> TalkingData保留随时变更以上协议的权利，您同意接受任何合法的变更条款。</p>
        <p><strong>&#8226;</strong> 您确认使用TalkingData服务，即表示同意以上内容，并同意对使用TalkingData服务可能存在的其他潜在风险自行承担后果。</p>
        </div>
</div>
</div>
<script type="text/javascript">
	function tobaidu(){
		var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		var filename = _bdhmProtocol + "hm.baidu.com/h.js?957618928486c5678fe3773f222f4e52";
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
		document.getElementsByTagName("head")[0].appendChild(fileref);
		
		//document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F957618928486c5678fe3773f222f4e52' type='text/javascript'%3E%3C/script%3E"));
	}
</script>
<div class="xytxt" id="Addtable1" style="width: 300px; margin-left: -170px;">
		<div class="xytitle"><h1>增加更多快捷仪表</h1><a href="javascript:void(0);" class="Addcolse1 r"><img src="../images/close.gif" /></a></div>
        <span style="display:block; margin:10px 0 2px 0; font-weight:normal">请选择您想要增加的仪表：</span>
        <div class="xytext" style="padding:15px; background:#fff; font-size:12px; font-weight:normal; border:1px solid #dedede;">
        	<ul id="joinboxTable">
                <li id="litop1"><input id="top1" name="addcheckbox" type="checkbox" title="poptonefrom">Top10 用户地区</li>
                <li id="litop2"><input id="top2" name="addcheckbox" type="checkbox" title="popttwofrom">Top10 渠道来源</li>
                <li id="litop3"><input id="top3" name="addcheckbox" type="checkbox"  title="poptthrfrom">启动次数分布</li>
                <li id="litop4"><input id="top4" name="addcheckbox" type="checkbox" title="poptfoufrom">热门受访页面</li>
                <li id="litop5"><input id="top5" name="addcheckbox" type="checkbox" title="poptfivefrom">Top10 自定义事件</li>
                <li id="litop6"><input id="top6" name="addcheckbox" type="checkbox" title="poptsixfrom">Top10 机型</li>
                <li id="litop7"><input id="top7" name="addcheckbox" type="checkbox" title="poptsevenfrom">Top10 应用报错</li>
                <li id="litop8"><input id="top8" name="addcheckbox" type="checkbox" title="popteightfrom">使用时长分布</li>
                <li id="litop9"><input id="top9" name="addcheckbox" type="checkbox" title="poptnightfrom">热门应用版本</li>
			</ul>
        </div>
        <span style="display:block; margin-top:10px"><a href="javascript:void(0);" class="submitto Addcolse1"   style="margin-left:10px; display:inline;  float:right"><font>取消</font></a><a class="submitto Addcolse1" onclick="addtag(1);" style="float:right"><font>确定</font></a></span>
</div>

</body>
</html>