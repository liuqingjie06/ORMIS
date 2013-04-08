package com.rails.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.ServletContext;
import org.apache.struts2.util.ServletContextAware;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import com.rails.dao.BaseDao;
import com.rails.domain.security.Right;
import com.rails.domain.security.Role;
import com.rails.service.RightService;
import com.rails.util.DataUtil;
@Service("rightService")
@SuppressWarnings("rawtypes")
public class RightServiceImpl extends BaseServiceImpl<Right> implements RightService,ServletContextAware {

	
	private ServletContext sc;
	
	

	@Override
	public void updateEntity(Right t) {
		// TODO Auto-generated method stub
		super.updateEntity(t);
		this.refreshRightInApplication(t);
	}

	/**
	 * 覆盖注解,注入指定的dao
	 */
	@Resource(name="rightDao")
	public void setDao(BaseDao dao) {
		super.setDao(dao);
	}
	

	/** 
	 * 保存更新权限
	 */
	public void saveOrUpdateRight(Right model) {
		//表示新增权限
		if(model.getId()==null){
			int rightPos=0;
			long rightCode=0;
			String hql="select max(r.rightPos),max(r.rightCode) from Right r where r.rightPos=(select max(rr.rightPos) from Right rr)";
			Object[] rs=(Object[]) this.uniqueResult(hql);
			Integer topRightPos=(Integer) rs[0];
			Long topRightCode=(Long) rs[1];
			
			if(topRightPos==null){//说明还没有权限
				rightPos=0;
				rightCode=1;
			}else{//如果有权限则需要判断rightcode是否到了最大值
				if(topRightCode>= 1L<<60){
					rightPos=topRightPos+1;
					rightCode=1;
				}else{
					rightPos=topRightPos;
					rightCode=topRightCode<<1;
				}
			}
			
			model.setRightPos(rightPos);
			model.setRightCode(rightCode);
			
		}
		
		this.saveOrUpdateEntity(model);
		this.refreshRightInApplication(model);
		
	}

	/**
	 * 通过捕获url自动追加权限
	 */
	public void appendRight(String url) {
		//判断是否存在该url
		String hql = "select count(*) from Right r where r.rightUrl = ?" ;
		Long count = (Long) this.uniqueResult(hql, url);
		if(count == 0){
			Right r = new Right();
			r.setRightUrl(url);
			//对权限名称进行处理
			processRightName(r);
			this.saveOrUpdateRight(r);
			
			this.refreshRightInApplication(r);
			
		}
	}
	
	/**
	 * 处理权限名
	 */
	private void processRightName(Right r) {
		String url = r.getRightUrl() ;
		String entity = "" ;
		String action ="" ;
		if(url.toLowerCase().contains("survey")){
			entity = "调查";
		}
		else if(url.toLowerCase().contains("page")){
			entity = "页面";
		}
		else if(url.toLowerCase().contains("question")){
			entity = "问题";
		}
		else if(url.toLowerCase().contains("role")){
			entity = "角色";
		}
		else if(url.toLowerCase().contains("right")){
			entity = "权限";
		}
		else if(url.toLowerCase().contains("answer")){
			entity = "答案";
		}
		else if(url.toLowerCase().contains("user")){
			entity = "用户";
		}
		else if(url.toLowerCase().contains("authorize")){
			entity = "授权";
		}
		
		//处理动作名称
		if(url.toLowerCase().contains("update")){
			action = "保存";
		}
		else if(url.toLowerCase().contains("save")){
			action = "更新";
		}
		else if(url.toLowerCase().contains("delete")){
			action = "删除";
		}
		else if(url.toLowerCase().contains("batch")){
			action = "批量处理";
		}
		else if(url.toLowerCase().contains("move")){
			action = "移动/复制";
		}
		else if(url.toLowerCase().contains("add")){
			action = "添加";
		}
		else if(url.toLowerCase().contains("edit")){
			action = "编辑";
		}
		else if(url.toLowerCase().contains("all")){
			action = "管理";
		}
		else if(url.toLowerCase().contains("engage")){
			action = "参与";
		}
		else if(url.toLowerCase().contains("clear")){
			action = "清除";
		}
		r.setRightName(action + entity) ;
	}

	/**
	 * 批量更新权限
	 */
	public void bathUpdateRights(List<Right> allRights) {
		String hql="update Right r set r.rightName=? where r.id=?";
		for(Right r:allRights){
			this.batchEntityByHQL(hql,r.getRightName(),r.getId());
		}
		//刷新
		this.refreshAllRightsInApplication();
		
	}
	
	/**
	 * 得到不属于该角色的所有权限
	 */
	public List<Right> getNoOwnRights(Role model) {
		//System.out.println("size="+model.getRights().size());
		String hql ="from Right r where r.id not in ("+DataUtil.extractIds(model.getRights())+")" ;
		return this.findEntityByHQL(hql);
	}
	
	/**
	 * 刷新所有application中的所有权限
	 */
	public void refreshAllRightsInApplication(){
		if(sc==null){
			return;
		}
		List<Right> rights=this.findAllEnties();
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
	
	/**
	 * 刷新application中的某个权限
	 */
	public void refreshRightInApplication(Right r){
		if(sc==null){
			return;
		}
		//得到map
		@SuppressWarnings("unchecked")
		Map<String,Right> maps=(Map<String, Right>) sc.getAttribute("all_rights_map");
		if(maps!=null){
			maps.put(r.getRightUrl(), r);
		}
	}
	/**
	 * 删除application中的某个权限
	 */
	public void deleteRightInApplication(Right r){
		if(sc==null){
			return;
		}
		//得到map
		@SuppressWarnings("unchecked")
		Map<String,Right> maps=(Map<String, Right>) sc.getAttribute("all_rights_map");
		if(maps!=null){
			maps.remove(r.getRightUrl());
		}
	}
	/**
	 * 删除权限
	 */
	public void deleteRight(Integer rightId) {
		Right r=this.getEntity(rightId);
		this.deleteEntity(r);
		
		this.deleteRightInApplication(r);
		
	}

	/**
	 * 注入ServletContext
	 */
	public void setServletContext(ServletContext context) {
		this.sc=context;
	}


	
	
	
}
