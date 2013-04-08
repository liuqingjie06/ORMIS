package com.rails.service;

import com.rails.domain.User;


public interface UserService extends BaseService<User> {

	/**
	 * 验证email的有效性
	 */
	public boolean isRegisted(String email);
	public User doLogin(String email,String password);
	public User getUserWithChildren(Integer userId);
	public void updateAuthorize(User model, Integer[] ownRoleIds);
	public void clearAuthorize(Integer userId);
	public int findMaxRightPos();
}
