package com.rails.struts.action;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.rails.domain.security.Right;
import com.rails.domain.security.Role;
import com.rails.service.RightService;
import com.rails.service.RoleService;


/**
 *RightAction 
 */
@Controller
@Scope("prototype")
public class RoleAction extends BaseAction<Role> {
	private static final long serialVersionUID = 1L;
	
	private List<Role> allRoles;
	
	@Resource
	private RoleService roleService;
	
	@Resource
	private RightService rightService;
	
	private Integer roleId;
	
	//不属于角色的所有权限
	private List<Right> noOwnRights =new ArrayList<Right>();
	
	private Integer[] ownRightIds;
	
	
	public Integer[] getOwnRightIds() {
		return ownRightIds;
	}

	public void setOwnRightIds(Integer[] ownRightIds) {
		this.ownRightIds = ownRightIds;
	}

	public List<Right> getNoOwnRights() {
		return noOwnRights;
	}

	public void setNoOwnRights(List<Right> noOwnRights) {
		this.noOwnRights = noOwnRights;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}


	public List<Role> getAllRoles() {
		return allRoles;
	}

	public void setAllRoles(List<Role> allRoles) {
		this.allRoles = allRoles;
	}


	/**
	 * 查看所有角色
	 */
	public String findAllRoles(){
		this.allRoles=roleService.findAllEnties();
		return "roleListPage";
	} 
	
	/**
	 * 到添加角色页面
	 */
	public String toAddRolePage(){
		
		this.noOwnRights=rightService.findAllEnties();
		return "editRolePage";
	} 
	
	
	/**
	 * 保存/更新角色
	 */
	public String saveOrUpdateRole(){
		roleService.saveOrUpdateRole(model,ownRightIds);
		return "findAllRolesAction";
	}
	
	/**
	 * edit 角色
	 */
	public String editRole(){
		return "editRolePage";
	}
	
	public void prepareEditRole(){
		
		this.model=roleService.getRoleWithChildren(roleId);
		if(model.getRights().size()==0){
			this.noOwnRights=rightService.findAllEnties();
		}else{
			this.noOwnRights=rightService.getNoOwnRights(model);
		}
		
		
	}
	
	/**
	 * delete 权限
	 */
	public String deleteRole(){
		roleService.deleteEntity(roleService.getEntity(roleId));
		return "findAllRolesAction";
	}
	
	
}
