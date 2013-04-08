package com.rails.service.listener;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import com.rails.domain.security.Right;
import com.rails.service.RightService;


@SuppressWarnings("rawtypes")
@Component
public class InitRightsListener implements ApplicationListener,
		ServletContextAware {

	private ServletContext sc;
	
	@Resource
	private RightService rs;

	public void onApplicationEvent(ApplicationEvent arg0) {
		//当spring容器加载完成后会发布一个ContextRefreshedEvent事件
		if(arg0 instanceof ContextRefreshedEvent){//表示spring容器已经加载完成
			List<Right> rights=rs.findAllEnties();
			//将所有rights放入到map中
			Map<String,Right> maps=new HashMap<String,Right>();
			for(Right r:rights){
				maps.put(r.getRightUrl(), r);
			}
			
			//将map放入到Application
			if(sc!=null){
				sc.setAttribute("all_rights_map", maps);
			}
		}
	}
	
	//注入servletContext
	public void setServletContext(ServletContext arg0) {
			this.sc=arg0;
	}

}
