<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	
	<body>
		
		<s:if test="allUsers.isEmpty() == true">目前没有任何用户!</s:if >
		<s:else>
			<s:form action="UserAuthorizeAction_inputExcel" namespace="/" method="post">
				请输入Excel表路径：<input type="file" name="inputPath"/>
				<s:submit value="导入"/>
			</s:form>
			<table border="1" cellspacing="0" width="800">
				<thead>
					<tr>
						<td>用户Email</td>
						<td>昵称</td>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="allUsers" status="st">
						<s:set var="userId" value="id" />
						<tr>
							<td><s:property value="email" /></td>
							<td><s:property value="nickName" /></td>
						</tr>
					</s:iterator>
				</tbody>
				<tr>
					<td colspan="2">
						<s:property value="pageNow"/>/<s:property value="pageCount"/>页
						&nbsp;&nbsp;
					<s:url id="url_pre" value="UserAuthorizeAction_findAllUsersUseFenYe.action">   
       					  <s:param name="pageNow" value="pageNow-1"></s:param>   
     				</s:url>
					<s:url id="url_next" value="UserAuthorizeAction_findAllUsersUseFenYe.action">   
        				 <s:param name="pageNow" value="pageNow+1"></s:param>   
     				</s:url> 
                    <s:url id="url_first" value="UserAuthorizeAction_findAllUsersUseFenYe.action">
						<s:param name="pageNow" value="1"></s:param>
                    </s:url>
					<s:url id="url_last" value="UserAuthorizeAction_findAllUsersUseFenYe.action">
						<s:param name="pageNow" value="pageCount"></s:param>
                    </s:url>
				    <s:a href="%{url_first}">首页</s:a>
				     
				    <s:if test="pageNow>1">
				     	<s:a href="%{url_pre}">上一页</s:a>
				    </s:if>
					<s:else>
                    	上一页 
					</s:else>
				    <s:if test="pageNow!=pageCount">
				     	<s:a href="%{url_next}">下一页</s:a>
				    </s:if>
				    <s:else>
				       	下一页
				    </s:else>
				   <s:a href="%{url_last}">尾页</s:a>
					</td>
				</tr>
			</table>
		</s:else>
		<s:debug></s:debug>
	</body>
</html>