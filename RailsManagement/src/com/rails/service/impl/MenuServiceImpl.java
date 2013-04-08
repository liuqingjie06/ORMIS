package com.rails.service.impl;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.rails.dao.BaseDao;
import com.rails.domain.Menu;
import com.rails.service.MenuService;
@Service("menuService")
@SuppressWarnings("rawtypes")
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements MenuService{
	/**
	 * 覆盖注解,注入指定的dao
	 */
	@Resource(name="menuDao")
	public void setDao(BaseDao dao) {
		super.setDao(dao);
	}
	

}
