<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:include value="../loginheader.jsp"></s:include>
<!--script>
		mainheight();
	</script-->
<div class="web">
<s:include value="../admintop.jsp"></s:include>
<div class="minweb" style="min-height: 362px;">	
<script type="text/javascript" src="../js/index.js"></script>
<div class="main">
	<div class="title">
		<img src="../images/land.jpg" alt="用户登录" width="143" height="21">
	</div>
	<div class="txt">
	<div class="land" style="position:static">
	  <s:if test="#session['user'] != null">
			<!--div class="divNavigatorOuterFrame">
				<div class="divNavigatorInnerFrame" style="text-align: right;">
					欢迎<s:property value="#session['user'].nickName" />&nbsp;&nbsp;
				</div>
			</div-->
	     <!-- div class="divWhiteLine"></div-->
	  </s:if>
	  <s:form id="loginId" action="LoginAction_doLogin" namespace="/" method="post">
		<ul>
			 <li class="relative">
       	    <input id="lemail" class="inputtxthover" type="text" value="" onfocus="hide('emailmessage');" onblur="fun1();"/>
           	  <font id="emailmessage" style="display:none" onclick="input('lemail','emailmessage');">用户名 / 注册邮箱</font>
              <span class="Prompt" id="lemaildiv" style="display:none">
              </span>
            </li>
  		  <li class="relative">
           	  <input class="inputtxthover" id="lpassword" type="password" value="" onfocus="hide('passwordmessage');" onblur="fun2();"/>
           	  <font id="passwordmessage" style="display:none" onclick="input('lpassword','passwordmessage');">密码</font>
              <span class="Prompt" id="lpwddiv" style="display:none">
              </span>
           </li>
			
		</ul>
		<p><a href="javascript:void(0);" class="Registration_buttom" onclick="login();">登录</a></p>

        <span class="check">
              <span class="l"><input id="talkdatacheckbox" type="checkbox" style="margin:-1px 10px 0 2px;" /><strong>记住密码</strong>
              </span>
        </span>
	</s:form>
</div>
</div>
</div>
</div>
</div>
<s:include value="../footer.jsp"></s:include>
