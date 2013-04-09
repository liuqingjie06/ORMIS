<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!--头部开始 !-->
<script src="../js/index.js"></script>
<div  class="top">  <!-- logo显示和用户信息登录 -->
	<div class="header">
		<div class="logo l">
        	<a href="#">
				<img src="../images/railmaps_logo.png"  title="Railmaps" width="203" height="60" />
            </a>
        </div>
        <div class="nav l" style="padding-left:40px">
           	<font> 铁路工务信息管理系统</font>
        </div>              
		<div class="nav r" style="padding-right:10px">
             <font>|</font>
             <a href="#">帮助</a>
			 <font>|</font>    
        </div>
	</div>     
	<div class="toptitle">
    	<div class="l">
        	<span><strong><a href="javascript:void(0);" >主页</a>	</strong>&gt;</span>
            <select name="../images/input_list_top.gif" id="productTxt" title="产品名称" class="selecttopicon" >    	  			
   	  			<option value="-1">个人账户</option>
   	  			<option value="-1">设备管理</option>
   	  			<option value="-1">监测数据分析</option>
                <option value="10122" selected="selected">安全生产</option>
           </select>
           <span>&gt;</span>
           <select name="../images/input_list_top.gif" id="productList" title="平台" class="selectbttomicon">
    	  			<option value="1" selected="selected">问题库</option>
    	  			<option value="2" selected="selected">日生产计划</option>
           </select>
        </div>
        <a href="../admin/help.jsp" target="_blank" class="r">username</a>
    </div>  
</div>

<script src="../js/index.js')}}"></script>

<!--头部结束 !-->
