package com.rails.service.impl;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import javax.annotation.Resource;
import com.rails.dao.BaseDao;
import com.rails.service.BaseService;


/**
 * 抽象service,专门用于继承
 */
@SuppressWarnings("rawtypes")
public abstract class BaseServiceImpl<T> implements BaseService<T> {

	private BaseDao dao ;
	private Class clazz ;
	
	public BaseServiceImpl(){
		ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
		clazz = (Class) type.getActualTypeArguments()[0];
	}
	
	@Resource
	public void setDao(BaseDao dao) {
		this.dao = dao;
	}

	@SuppressWarnings("unchecked")
	public void saveEntity(T t) {
		dao.saveEntity(t);
	}

	@SuppressWarnings("unchecked")
	public void updateEntity(T t) {
		dao.updateEntity(t);
	}

	@SuppressWarnings("unchecked")
	public void deleteEntity(T t) {
		dao.deleteEntity(t);
	}

	@SuppressWarnings("unchecked")
	public void saveOrUpdateEntity(T t) {
		dao.saveOrUpdateEntity(t);
	}

	public void batchEntityByHQL(String hql, Object... objects) {
		dao.batchEntityByHQL(hql, objects);
	}

	@SuppressWarnings("unchecked")
	public T getEntity(Integer id) {
		return (T) dao.getEntity(id);
	}

	@SuppressWarnings("unchecked")
	public T loadEntity(Integer id) {
		return (T) dao.loadEntity(id);
	}

	@SuppressWarnings("unchecked")
	public List<T> findEntityByHQL(String hql, Object... objects) {
		return dao.findEntityByHQL(hql, objects);
	}

	public Object uniqueResult(String hql,Object...objects){
		return dao.uniqueResult(hql, objects);
	}
	
	
	/**
	 * 查询全部实体
	 */
	public List<T> findAllEnties(){
		String hql = "from " + clazz.getCanonicalName() ;
		return this.findEntityByHQL(hql);
	}
	
	/**
	 * 分页查询全部实体
	 */
	public List<T> findAllEntiesByFenYe(Integer start,Integer everyPage){
		String hql = "from " + clazz.getCanonicalName() ;
		return dao.findEntityByHQLUseFenYe(hql, start, everyPage);
	}
}
