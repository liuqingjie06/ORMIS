package com.rails.service.impl;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.rails.dao.BaseDao;
import com.rails.domain.User;
import com.rails.domain.security.Right;
import com.rails.domain.security.Role;
import com.rails.service.RoleService;
import com.rails.util.DataUtil;

@Service("roleService")
@SuppressWarnings("rawtypes")
public class RoleServiceImpl extends BaseServiceImpl<Role> implements
		RoleService {

	/**
	 * 覆盖注解,注入指定的dao
	 */
	@Resource(name="roleDao")
	public void setDao(BaseDao dao) {
		super.setDao(dao);
	}

	@Override
	public void saveOrUpdateRole(Role model, Integer[] ownRightIds) {
		
		//表示更新，将所有的权限去除
		if(model.getId()!=null&&ownRightIds==null){
			model.getRights().clear();
		}else{
			Right r=null;
			for(int rightId:ownRightIds){
				r=new Right();
				r.setId(rightId);
				model.getRights().add(r);
			}
		}
		this.saveOrUpdateEntity(model);
			
		
	}

	@Override
	public Role getRoleWithChildren(Integer roleId) {
		Role r=this.getEntity(roleId);
		r.getRights().size();
		return r;
	}

	/**
	 * 得到不属于该用户的所有角色
	 */
	public List<Role> getNoOwnRoles(User model) {
		String hql ="from Role r where r.id not in ("+DataUtil.extractIds(model.getRoles())+")" ;
		return this.findEntityByHQL(hql);
	}

	

	
}
