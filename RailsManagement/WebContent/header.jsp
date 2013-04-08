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

		<script type="text/javascript" src="/js/timeflag.js"></script>
		<script type="text/javascript" src="/js/getParameter.js"></script>
		<script type="text/javascript" src="/js/util.js"></script>
		<script type="text/javascript" src="/js/summarizejs/summarize.js"></script>
		<script src="/js/Tab.js"></script>
		
		<link href="/css/WdatePicker.css" type="text/css"/>
		<style type="text/css">
			.highslide img {cursor: url(http://www.highcharts.com/highslide/graphics/zoomin.cur), pointer !important;}.highslide-viewport-size {position: fixed; width: 100%; height: 100%; left: 0; top: 0}
		</style>
		
		<link rel="shortcut icon" href="/images/Talkingdata.ico" type="image/x-icon" />
		<link href="/css/css.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript"> var basePath="http://analytics.talkingdata.net:80/"; </script>
		<script type="text/javascript"> var username="Demo"; </script>
		<script type="text/javascript" language="javascript" src="/js/check.js"></script>
		<script type="text/javascript" src="/js/jquery.min.js"></script>
		<script type="text/javascript" language="javascript" src="/js/jquery.dataTables.js"></script>
		<script src="/js/jquery.select-1.3.6.js"></script>
		<script src="/js/util.js"></script>
		<script src="/js/Data_Ruler.js"></script>
		<script type="text/javascript" src="/js/highslide/highslide-full.min.js"></script>
		<script type="text/javascript" src="/js/highslide/highslide.config.js" charset="utf-8"></script>
		<link rel="stylesheet" type="text/css" href="/css/highslide.css" />
		<script type="text/javascript" language="javascript" src="/js/temple.js')}}"></script>
		<script type="text/javascript">
			$(document).ready(function(){
			$("select").sSelect();
			})
		</script>
	
	</head>

    <body onload="initSearch();">