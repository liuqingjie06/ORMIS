<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	
	<body>
		<h3><s:a action="MenuAction_toAddMenuPage" >添加新菜单</s:a></h3>
		<h3><s:a href="testDynamicMenu.jsp" >返回</s:a></h3>
		<s:if test="allMenu.isEmpty() == true">目前没有菜单!</s:if >
		<s:else>
			<table border="1" cellspacing="0" width="800">
				<thead>
					<tr>
						<td>菜单名</td>
						<td>菜当对应url</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="allMenu" status="st">
						<s:set var="mId" value="id" />
						<tr>
							<td><s:property value="text" /></td>
							<td><s:property value="url" /></td>
							<td>
								<s:a action="MenuAction_editMenu?mid=%{#mId}">修改</s:a>
								<s:a action="MenuAction_deleteMenu?mid=%{#mId}" onclick="return confirm('删除吗')">删除</s:a>
							</td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
	    </s:else>
	</body>
</html>