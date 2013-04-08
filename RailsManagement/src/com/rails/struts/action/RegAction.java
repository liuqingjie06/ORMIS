package com.rails.struts.action;
import javax.annotation.Resource;
import org.apache.struts2.interceptor.validation.SkipValidation;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.rails.domain.User;
import com.rails.service.UserService;
import com.rails.util.DataUtil;
import com.rails.util.ValidateUtil;

/**
 * RegAction
 * @Scope("prototype")表示每次都new一个action，默认是单例
 */
@Controller
@Scope("prototype")
public class RegAction extends BaseAction<User> {

	private static final long serialVersionUID = -7197488056805166872L;
	
	//注入UserService
	@Resource
	private UserService us ;
	
	
	//确认密码
	private String confirmPassword ;
	
	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	/**
	 * 达到注册页面c
	 */
	
	//跳过验证
	@SkipValidation
	public String toRegPage(){
		return "regView" ;
	}
	
	/**
	 * 进行注册
	 */
	public String doReg(){
		//加密处理
		model.setPassword(DataUtil.md5(model.getPassword()));
		us.saveEntity(model);
		return "success" ;
	}
	
	public void validate() {
		//非空
		if(!ValidateUtil.isValid(model.getEmail())){
			addFieldError("email", "email是必填项");
		}
		if(!ValidateUtil.isValid(model.getPassword())){
			addFieldError("password", "password是必填项");
		}
		if(!ValidateUtil.isValid(model.getNickName())){
			addFieldError("nickName", "nickName是必填项");
		}
		if(this.hasErrors()){
			return ;
		}
		//一致性
		if(!model.getPassword().equals(confirmPassword)){
			addFieldError("password", "密码不一致");
			return ;
		}
		//email有效性
		boolean b = us.isRegisted(model.getEmail());
		if(b){
			addFieldError("email", "邮箱已经占用");
		}
	}
	
	
}
