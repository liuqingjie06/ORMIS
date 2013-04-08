package com.rails.struts.action;
import java.lang.reflect.ParameterizedType;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;

/**
 * 抽象action,结论：只要在action中需要为model赋值,都应该在对应的prepareXxx方法中完成.
 */
@SuppressWarnings("serial")
public abstract class BaseAction<T> extends ActionSupport implements ModelDriven<T>, Preparable {
	
	public void prepare() throws Exception {
	}
	
	public T model;
	
	@SuppressWarnings("unchecked")
	public BaseAction(){
		//通过反射机制来确定T
		ParameterizedType type=(ParameterizedType) this.getClass().getGenericSuperclass();
		@SuppressWarnings("rawtypes")
		Class clazz=(Class) type.getActualTypeArguments()[0];
		try {
			model=(T) clazz.newInstance();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public  T getModel(){
		return model;
	}
}
