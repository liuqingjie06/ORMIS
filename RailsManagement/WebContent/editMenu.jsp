<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>更新菜单</title>
	</head>
	<body>
		<s:form action="MenuAction_updateMenu" namespace="/" method="post">
		<s:hidden name="id" />
		<table>
			<tr>
				<td>菜单名:</td>
				<td><s:textfield name="text"/></td>
			</tr>
			<tr>
				<td>对应url:</td>
				<td><s:textfield name="url"/></td>
			</tr>
			
			<tr>
				<td></td>
				<td><s:submit value="确定" /></td>
			</tr>
		</table>
		</s:form>
	</body>
</html>