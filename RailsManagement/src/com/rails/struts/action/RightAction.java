package com.rails.struts.action;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.rails.domain.security.Right;
import com.rails.service.RightService;


/**
 *RightAction 
 */
@Controller
@Scope("prototype")
public class RightAction extends BaseAction<Right> {
	private static final long serialVersionUID = 1L;
	
	private List<Right> allRights;
	
	@Resource
	private RightService rs;
	
	private Integer rightId;
	
	public Integer getRightId() {
		return rightId;
	}

	public void setRightId(Integer rightId) {
		this.rightId = rightId;
	}

	public List<Right> getAllRights() {
		return allRights;
	}

	public void setAllRights(List<Right> allRights) {
		this.allRights = allRights;
	}

	/**
	 * 查看所有权限
	 */
	public String findAllRights(){
		this.allRights=rs.findAllEnties();
		return "rightListPage";
	} 
	
	/**
	 * 到添加权限页面
	 */
	public String toAddRightPage(){
		return "editRightPage";
	} 
	
	
	/**
	 * 保存/更新权限
	 */
	public String saveOrUpdateRight(){
		rs.saveOrUpdateRight(model);
		return "findAllRightsAction";
	}
	
	/**
	 * edit 权限
	 */
	public String editRight(){
		return "editRightPage";
	}
	
	public void prepareEditRight(){
		this.model=rs.getEntity(rightId);
	}
	
	/**
	 * delete 权限
	 */
	public String deleteRight(){
		rs.deleteRight(rightId);
		return "findAllRightsAction";
	}
	
	/**
	 * 批量更新权限
	 */
	public String batchUpdateRights(){
		rs.bathUpdateRights(allRights);
		return "findAllRightsAction";
	}
}
