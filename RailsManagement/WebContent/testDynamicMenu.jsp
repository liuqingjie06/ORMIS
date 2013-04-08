<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>动态菜单！</title>
	</head>
	<body>
		<h2><s:a action="MenuAction_findAllMenu" >测试动态菜单</s:a></h2>
		<h2><s:a action="MenuAction_listMenu" >管理菜单</s:a></h2>
	</body>
</html>