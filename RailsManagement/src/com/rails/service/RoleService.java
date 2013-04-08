package com.rails.service;

import java.util.List;

import com.rails.domain.User;
import com.rails.domain.security.Role;


public interface RoleService extends BaseService<Role> {

	/**
	 *保存角色，以及它拥有的权限 
	 */
	void saveOrUpdateRole(Role model, Integer[] ownRightIds);

	Role getRoleWithChildren(Integer roleId);

	List<Role> getNoOwnRoles(User model);


}
