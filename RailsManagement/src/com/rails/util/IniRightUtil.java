package com.rails.util;
import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.rails.service.RightService;

public class IniRightUtil {
	public static void main(String[] args) throws Exception {
		
		
		String packageName = "com.rails.struts.action" ;
		ClassLoader cl = ClassLoader.getSystemClassLoader();
		//中文目录会出现乱码
		String configPath =cl.getResource(".").getFile();
		configPath = java.net.URLDecoder.decode(configPath,"utf-8");
		//中文目录会出现乱码,需要转码，通过decode
		System.out.println("configPath="+configPath);
		File f = new File(configPath+ "com/rails/struts/action");
		
		
		/*File f = new File("F:/rihui");
		System.out.println("f="+f);
		if(f.isDirectory()){
			String[] fs = f.list();
			for(String fname : fs){
				System.out.println(fname);
			}
		}*/
		
		//通过反射得到ActionName
		Class clazz = null ;
		if(f.isDirectory()){
			String[] fs = f.list();
			for(String fname : fs){
				if(ValidateUtil.isValid(fname) 
						&& fname.contains(".class")
						&& !fname.contains("BaseAction")){
					clazz = Class.forName(packageName +"." + fname.substring(0, fname.indexOf(".class")));
					System.out.println(clazz.getName());
					saveRight(clazz);
				}
			}
		}
		
	}
	
	public static void saveRight(Class clazz){
		ApplicationContext ac = new ClassPathXmlApplicationContext("beans.xml");
		RightService rs = (RightService) ac.getBean("rightService");
		
		Method[] ms = clazz.getDeclaredMethods();
		String mname = null ;
		Class retType = null ;
		Class[] paramType = null ;
		for(Method m : ms){
			mname = m.getName();
			
			retType = m.getReturnType();
			paramType = m.getParameterTypes();
			//struts方法
			if(retType == String.class 
					&& !ValidateUtil.isValid(paramType)){
				String url = "" ;
				//
				if(mname.equals("execute")){
					url = "/" + clazz.getSimpleName();
				}
				else if(mname.startsWith("get")){
					//0123456789
					//getInputPage
					String headerChar = mname.substring(3,4).toLowerCase();
					String fieldname = headerChar + mname.substring(4);
					try {
						clazz.getDeclaredField(fieldname);
						System.out.println(mname + "是javabean方法");
						continue ;
					} catch (SecurityException e) {
						System.out.println(mname + "非公共方法");
						continue ;
					} catch (NoSuchFieldException e) {
						url = "/" + clazz.getSimpleName() + "_" + mname;
						System.out.println(mname + "是业务方法");
					}
				}
				else{
					url = "/" + clazz.getSimpleName() + "_" + mname;
				}
				//需要加载容器，也就是需要启动tomcat
				if(!(url.contains("LoginAction") || url.contains("RegAction") || url.contains("EngageSurveyAction"))){
					rs.appendRight(url);
				}
				
				System.out.println("appending:" + url);
			}
		}
	}
}
