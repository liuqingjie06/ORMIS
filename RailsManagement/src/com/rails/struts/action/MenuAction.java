package com.rails.struts.action;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.rails.domain.Menu;
import com.rails.service.MenuService;

@Controller
@Scope("prototype")
public class MenuAction extends BaseAction<Menu>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//注入UserService
	@Resource
	private MenuService ms ;

	private List<Menu> allMenu;
	private Integer mid;
	
	
	public Integer getMid() {
		return mid;
	}

	public void setMid(Integer mid) {
		this.mid = mid;
	}

	public List<Menu> getAllMenu() {
		return allMenu;
	}

	public void setAllMenu(List<Menu> allMenu) {
		this.allMenu = allMenu;
	}
	
	/**
	 * 获得所有菜单
	 */
	public String findAllMenu(){
		this.allMenu=ms.findAllEnties();
		if(this.allMenu!=null){
			return "toMainPage";
		}
		return "fail";
	}
	
	
	/**
	 * 获得所有菜单
	 */
	public String listMenu(){
		this.allMenu=ms.findAllEnties();
		if(this.allMenu!=null){
			return "toManagePage";
		}
		return "fail";
	}
	
	/**
	 * 删除菜单
	 */
	public String deleteMenu(){
		Menu m=new Menu();
		m.setId(this.mid);
		this.ms.deleteEntity(m);
		return "MenuManageAction";
	}
	
	
	public String editMenu(){
		return "editMenuPage";
	}
	
	public void prepareEditMenu(){
		this.model=ms.getEntity(mid);
	}
	/**
	 * 更新菜单
	 */
	public String updateMenu(){
		this.mid=model.getId();
		System.out.println("text="+model.getText());
		ms.updateEntity(model);
		return "MenuManageAction";
	}
	
	/**
	 * 增加菜单
	 */
	public String addMenu(){
		ms.saveEntity(model);
		return "MenuManageAction";
	}
	
	/**
	 *到添加新菜单页面 
	 */
	public String toAddMenuPage(){
		this.allMenu=ms.findAllEnties();
		return "AddMenuPage";
	}
}
