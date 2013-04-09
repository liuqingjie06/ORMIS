<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:include value="../loginheader.jsp"></s:include>
<!--script>
		mainheight();
	</script-->
<div class="web">
	<s:include value="../top.jsp"></s:include>
	<div class="minweb">
		<div class="txt">
			<div class="land" style="position:static">
				<font style="font-size:20px;">您已经退出系统......</font>
			</div>
		</div>
	</div>
</div>
<script>
//甚至延时2s后跳转至登陆页面
$(function () {
	window.setInterval(function() 
		{ 
		window.location.href=basePath+"admin/login.jsp";
		},2000); 
	
});
</script>
<s:include value="../footer.jsp"></s:include>



