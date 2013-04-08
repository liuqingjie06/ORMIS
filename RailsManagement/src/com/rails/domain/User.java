package com.rails.domain;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.rails.domain.security.Right;
import com.rails.domain.security.Role;


/**
 * 
 */
public class User {
	private Integer id;
	private String email;
	private String password;
	private String nickName;
	private Date regDate = new Date();
	private Set<Role> roles=new HashSet<Role>();
	//计算权限总和，不需要放入数据库中，在每个用户登录的时候时实的计算
	private long[] rightSum;
	//判断是否是超级管理员，也是时实的计算
	private boolean superAdmin;
	
	public long[] getRightSum() {
		return rightSum;
	}

	public void setRightSum(long[] rightSum) {
		this.rightSum = rightSum;
	}

	public boolean isSuperAdmin() {
		return superAdmin;
	}

	public void setSuperAdmin(boolean superAdmin) {
		this.superAdmin = superAdmin;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	
	/**
	 * 计算权限总和
	 */
	public void countRightSum(){
		int pos=0;
		long code=0;
		for(Role role:roles){
			//判断是否是超级管理员
			if("-1".equals(role.getRoleValue())){
				this.superAdmin=true;
				//切断与角色和权限的关联，减轻session的负担
				this.roles=null;
				return;
			}
			for(Right right:role.getRights()){
				pos=right.getRightPos();
				code=right.getRightCode();
				rightSum[pos]=rightSum[pos]|code;
			}
		}
		//切断与角色和权限的关联，减轻session的负担
		this.roles=null;
	}
}
