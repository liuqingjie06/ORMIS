package com.rails.util;
import java.util.Collection;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionProxy;
import com.rails.domain.User;
import com.rails.domain.security.Right;
import com.rails.struts.UserAware;
import com.rails.struts.action.BaseAction;


/**
 * ValidateUtil
 */
public class ValidateUtil {
	
	/**
	 * 判断字符串的有效性 
	 */
	public static boolean isValid(String str){
		if(str == null || str.trim().equals("")){
			return false ;
		}
		return true ;
	}
	
	/**
	 * 判断集合的有效性 
	 */
	public static boolean isValid(Collection<?> coll){
		if(coll == null || coll.isEmpty()){
			return false ;
		}
		return true ;
	}
	
	/**
	 * 判断集合的有效性 
	 */
	public static boolean isValid(Object[] arr){
		if(arr == null || arr.length == 0){
			return false ;
		}
		return true ;
	}
	/**
	 * 判断是否具有该权限
	 */
	public static boolean hasRight(String namespace,String actionName,BaseAction action,HttpServletRequest req){
				if(!ValidateUtil.isValid(namespace)||namespace.equals("/")){
					namespace="";
				}
				String url=namespace+"/"+actionName;
				 
				 HttpSession session=req.getSession();
				 ServletContext sc=session.getServletContext();
				 
				 @SuppressWarnings("unchecked")
				Map<String,Right> allRights=(Map<String, Right>) sc.getAttribute("all_rights_map");
				 Right r=allRights.get(url);
				//判断是否是公共资源
				if(allRights.get(url)==null){//是公共资源，公共资源未存入数据库中
					//放行
					return true;
				}else{
					//判断是否登录
					User u=(User) session.getAttribute("user");
					if(u!=null){//表示已经登录
						//注入user
						if(action!=null && action instanceof UserAware){
							((UserAware) action).setUser(u);
						}
						//判读是否是超级管理员
						if(u.isSuperAdmin()){
							return true;
						}else{//不是超级管理员
							long[] sum=u.getRightSum();
							long val=sum[r.getRightPos()] & r.getRightCode();
							if(val==0){//说明没有该权限
								return false;
							}else{
								return true;
							}
						}
						
					}else{//未登录
						//回到登录页面，配置了全局结果集
						return false;
					}
					
				}
	}
}
