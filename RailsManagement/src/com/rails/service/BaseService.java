package com.rails.service;

import java.util.List;

public interface BaseService<T> {
	public void saveEntity(T t);
	public void updateEntity(T t);
	public void deleteEntity(T t);
	public void saveOrUpdateEntity(T t);
	public void batchEntityByHQL(String hql,Object...objects);
	
	public T getEntity(Integer id);
	public T loadEntity(Integer id);
	public List<T> findEntityByHQL(String hql,Object...objects);
	public Object uniqueResult(String hql,Object...objects);
	
	//查询所有
	public List<T> findAllEnties();
	//分页查询所有
	public List<T> findAllEntiesByFenYe(Integer start,Integer everyPage);
}