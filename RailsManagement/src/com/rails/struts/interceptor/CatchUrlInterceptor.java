package com.rails.struts.interceptor;
import javax.servlet.ServletContext;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.ActionProxy;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.rails.service.RightService;
import com.rails.util.ValidateUtil;

/**
 * 捕获Url拦截器
 */
public class CatchUrlInterceptor implements Interceptor {

	
	private static final long serialVersionUID = 1L;
	
	//该拦截器的开关
	private boolean enable=true;

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init() {
		// TODO Auto-generated method stub

	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		if(enable){
			ActionProxy ap=invocation.getProxy();
			String url="";
			String namespace=ap.getNamespace();
			String actionName=ap.getActionName();
			if(ValidateUtil.isValid(namespace)||namespace.equals("/")){
				namespace="";
			}
			url=namespace+"/"+actionName;
			
			//服务器启动的时候在web.xml中通过监听器将spring加载到了applicationContext中
			ServletContext sc = ServletActionContext.getServletContext();
			ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(sc);
			RightService rs = (RightService) ac.getBean("rightService");
			rs.appendRight(url);
		}
		
		return invocation.invoke();
		
	}

}
