package com.rails.struts.action;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.interceptor.validation.SkipValidation;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.rails.domain.User;
import com.rails.service.UserService;
import com.rails.util.DataUtil;
import com.rails.util.ValidateUtil;


/**
 * RegAction
 * @Scope("prototype")表示每次都new一个action，默认是单例
 */
@Controller
@Scope("prototype")
public class LoginAction extends BaseAction<User> implements SessionAware{
	
	private static final long serialVersionUID = 1L;
	
	//注入UserService
	@Resource
	private UserService us ;

	
	//接收session的map
	private Map<String, Object> maps;

	/**
	 * 达到登录页面
	 */
	
	//跳过验证
	@SkipValidation
	public String toLoginPage(){
		return "loginView" ;
	}
	
	/**
	 * 进行登录
	 */
	public String doLogin(){
		
		
		User user=us.doLogin(model.getEmail(), DataUtil.md5(model.getPassword()));
		if(user!=null){
			//ServletActionContext.getRequest().getSession().setAttribute("user", user);
			//使用SessionAware降低与原生api的耦合度
			
			//计算权限总和
			user.setRightSum(new long[us.findMaxRightPos()+1]);
			user.countRightSum();
			maps.put("user", user);
			return "success";
		}else{
			this.addActionError("email/passwored不对");
			return "input" ;
		}
		
		
	}
	
	public void validate() {
		//非空
		if(!ValidateUtil.isValid(model.getEmail())){
			addFieldError("email", "email是必填项");
		}
		if(!ValidateUtil.isValid(model.getPassword())){
			addFieldError("password", "password是必填项");
		}
		if(this.hasErrors()){
			return;
		}
	}

	@Override
	public void setSession(Map<String, Object> arg0) {
		this.maps=arg0;
		
	}

}
