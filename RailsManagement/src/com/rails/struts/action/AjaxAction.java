package com.rails.struts.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.rails.domain.User;
import com.rails.service.UserService;

@Controller
@Scope("prototype")
public class AjaxAction extends BaseAction<User>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//注入UserService
	@Resource
	private UserService us ;

	//使用ajax验证邮箱是否注册
	public String execute(){
		System.out.println("come here");
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);//获取request
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext().get(ServletActionContext.HTTP_RESPONSE);
		//防止中文乱码
		response.setContentType("text/html;charset=UTF-8");
		//设置不缓存
		response.setHeader("Cache-Control","no-cache");
		PrintWriter out=null;
		String email=request.getParameter("email");
		System.out.println("email="+email);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//对email进行判断是否可用
		if(us.isRegisted(email)){
			out.write("NO");
		}else{
			out.write("OK");
		}
		out.flush();
		out.close();
		return null;
	}
}
