package com.rails.dao.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rails.dao.BaseDao;

/**
 * 抽象dao实现,专门用于继承的
 */
@SuppressWarnings("unchecked")
public abstract class BaseDaoImpl<T> implements BaseDao<T> {
	
	@SuppressWarnings("rawtypes")
	private Class clazz ;
	
	@SuppressWarnings("rawtypes")
	public BaseDaoImpl(){
		ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
		clazz = (Class) type.getActualTypeArguments()[0];
	}
	//注入sessionFactory
	@Resource
	private SessionFactory sf ;
	
	public void saveEntity(T t) {
		sf.getCurrentSession().save(t);
	}

	public void updateEntity(T t) {
		sf.getCurrentSession().update(t);
	}

	public void deleteEntity(T t) {
		sf.getCurrentSession().delete(t);
	}

	public void saveOrUpdateEntity(T t) {
		sf.getCurrentSession().saveOrUpdate(t);
	}

	public void batchEntityByHQL(String hql, Object... objects) {
		Session s = sf.getCurrentSession();
		Query q = s.createQuery(hql);
		//给sql语句的条件赋值
		if(objects!=null){
			for(int i = 0 ; i < objects.length ; i ++){
				q.setParameter(i, objects[i]);
			}
		}
		q.executeUpdate();
	}

	
	
	
	public T getEntity(Integer id) {
		return (T) sf.getCurrentSession().get(clazz, id);
	}

	public T loadEntity(Integer id) {
		return (T) sf.getCurrentSession().load(clazz, id);
	}

	public List<T> findEntityByHQL(String hql, Object... objects) {
		Session s = sf.getCurrentSession();
		Query q = s.createQuery(hql);
		
		if(objects!=null){
			for(int i = 0 ; i < objects.length ; i ++){
				q.setParameter(i, objects[i]);
			}
		}
		return q.list();
	}
	
	//分页显示,pageNo:记录的开始位置，everyPage每页显示多少条
	public List<T> findEntityByHQLUseFenYe(String hql,Integer start,Integer everyPage, Object... objects) {
		Session s = sf.getCurrentSession();
		Query q = s.createQuery(hql);
		
		if(objects!=null){
			for(int i = 0 ; i < objects.length ; i ++){
				q.setParameter(i, objects[i]);
			}
		}
		q.setFirstResult(start);
		q.setMaxResults(everyPage);
		return q.list();
	}
	
	public Object uniqueResult(String hql,Object...objects){
		Session s = sf.getCurrentSession();
		Query q = s.createQuery(hql);
		if(objects!=null){
			for(int i = 0 ; i < objects.length ; i ++){
				q.setParameter(i, objects[i]);
			}
		}
		return q.uniqueResult();
	}
	
	
}
