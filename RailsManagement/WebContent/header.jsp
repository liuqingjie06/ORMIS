<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
    <head>
        <title>铁路工务信息管理系统</title>
		<script type="text/javascript">
			var pageid = "";
			var childaccount = "null";
		</script>

		<script type="text/javascript" src="../js/timeflag.js"></script>
		<script type="text/javascript" src="../js/getParameter.js"></script>
		<script type="text/javascript" src="../js/util.js"></script>
		<script type="text/javascript" src="../js/summarizejs/summarize.js"></script>
		<script src="../js/Tab.js"></script>

		
		<link href="../css/WdatePicker.css" type="text/css"/>
		<style type="text/css">
			.highslide img {cursor: url(http://www.highcharts.com/highslide/graphics/zoomin.cur), pointer !important;}.highslide-viewport-size {position: fixed; width: 100%; height: 100%; left: 0; top: 0}
		</style>
		
		<link rel="shortcut icon" href="images/Talkingdata.ico" type="image/x-icon" />
		<link href="../css/css.css" rel="stylesheet" type="text/css" />
		<!-- 重要：basePath为系统的根目录 -->
		<script type="text/javascript"> var basePath="/RailsManagement/"; </script>
		<script type="text/javascript"> var username="Demo"; </script>
		<script type="text/javascript" language="javascript" src="../js/check.js"></script>
		<script type="text/javascript" src="../js/jquery.min.js"></script>
		<script type="text/javascript" language="javascript" src="../js/jquery.dataTables.js"></script>
		<script src="../js/jquery.select-1.3.6.js"></script>
		<script src="../js/util.js"></script>
		<script src="../js/Data_Ruler.js"></script>
		<script type="text/javascript" src="../js/highslide/highslide-full.min.js"></script>
		<script type="text/javascript" src="../js/highslide/highslide.config.js" charset="utf-8"></script>
		<link rel="stylesheet" type="text/css" href="../css/highslide.css" />
		<script type="text/javascript">
			$(document).ready(function(){
			$("select").sSelect();
			})
		</script>
		<script type="text/javascript" src="../js/login.js"></script>
		<script type="text/javascript" src="../js/input.js"></script>
		<script type="text/javascript" src="../js/land.js"></script>
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
	
	</head>

    <body onload="initSearch();">