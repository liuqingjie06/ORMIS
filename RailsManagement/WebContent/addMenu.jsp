<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>添加新菜单</title>
	</head>
	<body>
		<s:form action="MenuAction_addMenu" namespace="/" method="post">
		<table>
			<tr>
				<td>菜单名：</td>
				<td><input name="text" /></td>
			</tr>
			<tr>
				<td>上级菜单</td>
				<td>
					<select name="pid">
						<option value="-1">自己</option>
						<s:iterator value="allMenu">
							<s:if test="pid==-1">
								<option value="<s:property value="id" />"><s:property value="text" /></option>
							</s:if>
						</s:iterator>
					</select>
				</td>
			</tr>
			<tr>
				<td>菜单对应url：</td>
				<td><input name="url" /></td>
			</tr>
			
			<tr>
				<td></td>
				<td><s:submit cssClass="btn" value="确定"/></td>
			</tr>
		</table>
		</s:form>
	</body>
</html>