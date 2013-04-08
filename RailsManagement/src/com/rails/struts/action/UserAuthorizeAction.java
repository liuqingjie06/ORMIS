package com.rails.struts.action;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.rails.domain.User;
import com.rails.domain.security.Role;
import com.rails.service.RoleService;
import com.rails.service.UserService;
import com.rails.util.ConstantUtil;
import com.rails.util.FenYeUtil;
import com.rails.util.ReadOWriteExcelUtil;

/**
 *RightAction 
 */
@Controller
@Scope("prototype")
public class UserAuthorizeAction extends BaseAction<User> {
	private static final long serialVersionUID = 1L;
	private List<User> allUsers;
	
	@Resource
	private RoleService roleService;
	
	@Resource
	private UserService userService;
	
	private Integer userId;
	
	
	
	//不属于用户的所有角色
	private List<Role> noOwnRoles =new ArrayList<Role>();

	private Integer[] ownRoleIds;
	
	public List<Role> getNoOwnRoles() {
		return noOwnRoles;
	}

	public void setNoOwnRoles(List<Role> noOwnRoles) {
		this.noOwnRoles = noOwnRoles;
	}
	
	public List<User> getAllUsers() {
		return allUsers;
	}

	public void setAllUsers(List<User> allUsers) {
		this.allUsers = allUsers;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	

	public Integer[] getOwnRoleIds() {
		return ownRoleIds;
	}

	public void setOwnRoleIds(Integer[] ownRoleIds) {
		this.ownRoleIds = ownRoleIds;
	}

	/**
	 * 查看所有用户
	 */
	public String findAllUsers(){
		this.allUsers=userService.findAllEnties();
		return "userAuthorizeListPage";
	} 
	
	//分页
	private Integer pageNow=ConstantUtil.PAGENOW;//当前页
	private Integer pageSize=ConstantUtil.PAGESIZE;//每页显示条数
	private Integer totalElements;//总记录数
	private Integer pageCount;//总页数
	private Integer start;//分页查询记录的起始位置
	//分页查看所有用户
	public String findAllUsersUseFenYe(){
		totalElements=userService.findAllEnties()!=null?userService.findAllEnties().size():0;
		FenYeUtil fenYe=new FenYeUtil(totalElements, pageNow, pageSize);
		pageCount=fenYe.getPageCount();
		start=fenYe.getRowsno();
		this.allUsers=userService.findAllEntiesByFenYe(start, pageSize);
		return "userAuthorizeListPage";
	} 
	
	
	public Integer getPageNow() {
		return pageNow;
	}

	public void setPageNow(Integer pageNow) {
		this.pageNow = pageNow;
	}

	
	public Integer getPageCount() {
		return pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	/**
	 * edit 用户角色
	 */
	public String editAuthorize(){
		return "editAuthorizePage";
	}
	
	public void prepareEditAuthorize(){
		
		this.model=userService.getUserWithChildren(userId);
		if(model.getRoles().size()==0){
			this.noOwnRoles=roleService.findAllEnties();
		}else{
			this.noOwnRoles=roleService.getNoOwnRoles(model);
		}
		
		
	}
	
	/**
	 * 清除授权
	 */
	public String clearAuthorize(){
		userService.clearAuthorize(userId);
		return "findAllUsersAction";
	}
	

	/**
	 * 更新用户所拥有的角色
	 */
	public String updateAuthorize(){
		model=userService.getUserWithChildren(model.getId());
		userService.updateAuthorize(model,ownRoleIds);
		return "findAllUsersAction";
	}
	
	
	//导出所有用户到excel
	public String outputExcel(){
		return null;
	}
	
	//从excel中导入用户
	private String inputPath;
	
	public String getInputPath() {
		return inputPath;
	}

	public void setInputPath(String inputPath) {
		this.inputPath = inputPath;
	}

	public String inputExcel(){
		List<User> excelUsers=ReadOWriteExcelUtil.readExcel4Users(inputPath);
		if(excelUsers!=null){
			for(User u:excelUsers){
				userService.saveOrUpdateEntity(u);
			}
			return "inputSuccess";
		}
		return "inputFail";
	}
}
