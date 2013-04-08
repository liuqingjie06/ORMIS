package com.rails.service.impl;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.rails.dao.BaseDao;
import com.rails.domain.User;
import com.rails.domain.security.Role;
import com.rails.service.UserService;
import com.rails.util.ValidateUtil;


@Service("userService")
@SuppressWarnings("rawtypes")
public class UserServiceImpl extends BaseServiceImpl<User> implements
		UserService {

	/**
	 * 覆盖注解,注入指定的dao
	 */
	@Resource(name="userDao")
	public void setDao(BaseDao dao) {
		super.setDao(dao);
	}
	
	/**
	 * 验证email的有效性
	 */
	public boolean isRegisted(String email){
		String hql = "from User u where u.email = ?" ;
		List<User> list = this.findEntityByHQL(hql, email);
		return ValidateUtil.isValid(list);
	}

	/**
	 * 验证登录
	 */
	public User doLogin(String email, String password) {
		String hql="from User u where u.email=? and u.password=?";
		List<User> list = this.findEntityByHQL(hql, email,password);
		if(ValidateUtil.isValid(list)){
			User u=list.get(0);
			for(Role role:u.getRoles()){
				role.getRights().size();
			}
		}
		return ValidateUtil.isValid(list)?list.get(0):null;
	}

	@Override
	public User getUserWithChildren(Integer userId) {
		User u=this.getEntity(userId);
		u.getRoles().size();
		return u;
	}

	@Override
	public void updateAuthorize(User model, Integer[] ownRoleIds) {
				System.out.println("id="+model.getId());
				if(model.getId()!=null&&ownRoleIds==null){
					model.getRoles().clear();
				}else{
					Role r=null;
					for(int roleId:ownRoleIds){
						r=new Role();
						r.setId(roleId);
						model.getRoles().add(r);
					}
				}
				this.saveOrUpdateEntity(model);
		
	}

	/**
	 * 清除权限
	 */
	public void clearAuthorize(Integer userId) {
		User u=this.getEntity(userId);
		u.getRoles().clear();
		this.saveOrUpdateEntity(u);
		
	}

	/**
	 * 查询最大的权限位，用于初始化权限和
	 */
	public int findMaxRightPos() {
		String hql="select max(r.rightPos) from Right r";
		Integer in=(Integer) this.uniqueResult(hql);
		return in==null?0:in;
	}

	
}
