package com.rails.struts.interceptor;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.rails.domain.User;
import com.rails.struts.UserAware;
import com.rails.struts.action.BaseAction;
import com.rails.struts.action.LoginAction;
import com.rails.struts.action.RegAction;


/**
 * 自定义登录拦截器
 *
 */
public class LoginInterceptor implements Interceptor {


	private static final long serialVersionUID = 1L;

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init() {
		// TODO Auto-generated method stub

	}

	@Override
	public String intercept(ActionInvocation arg0) throws Exception {
		@SuppressWarnings("rawtypes")
		BaseAction action=(BaseAction) arg0.getAction();
		if(action instanceof LoginAction || action instanceof RegAction ){
			//直接放行
			return arg0.invoke();
		}else{
			//判断是否登录
			User user=(User) ServletActionContext.getRequest().getSession().getAttribute("user");
			if(user!=null){
				//判断是否要注入用户
				if(action instanceof UserAware){
					((UserAware) action).setUser(user);
				}
				//表示已经登录,放行
				return arg0.invoke();
			}else{
				//回到登录页面
				return "login";
			}
		}
	}

}
