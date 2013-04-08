package com.rails.struts.interceptor;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.ActionProxy;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.rails.struts.action.BaseAction;
import com.rails.util.ValidateUtil;


/**
 * 权限过滤拦截器
 *
 */
public class RightFilterInterceptor implements Interceptor {
	
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
		//注入
		@SuppressWarnings("rawtypes")
		BaseAction action=(BaseAction) arg0.getAction();
		ActionProxy ap=arg0.getProxy();
		String namespace=ap.getNamespace();
		String actionName=ap.getActionName();
		HttpServletRequest req=ServletActionContext.getRequest();
		if(ValidateUtil.hasRight(namespace, actionName, action, req)){
			return arg0.invoke();
		}else{
			return "login";
		}
			
	}

}
