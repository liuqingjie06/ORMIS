<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Excel</title>
	</head>
	<body>
		<s:form action="ExcelAction_writeExcel" namespace="/" method="post">
			
			<s:submit value="确定"/>
		</s:form>
	</body>
</html>