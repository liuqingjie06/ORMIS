package com.rails.service;

import java.util.List;

import com.rails.domain.security.Right;
import com.rails.domain.security.Role;


public interface RightService extends BaseService<Right> {


	public void saveOrUpdateRight(Right model);

	public void appendRight(String url);

	public void bathUpdateRights(List<Right> allRights);

	public List<Right> getNoOwnRights(Role model);

	public void deleteRight(Integer rightId);

}
