package com.rails.util;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rails.domain.User;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
/**
 *导入和导出excel表
 */
public class ReadOWriteExcelUtil {

	//读取excel表中的数据
	public static boolean readExcel(String path){
		try {
			//构造一个excel文件，把它转换成一个Workbook类
			Workbook workbook=Workbook.getWorkbook(new File(path));
			//得到Sheet的数组
			Sheet[] sheets= workbook.getSheets();
			Sheet s1 = sheets[0];
			int rows = s1.getRows();
			int cols = s1.getColumns();
			System.out.println(rows);
			System.out.println(cols);
			System.out.println("*******************");
			//把每一个单元格找出来
			for(int i=0;i<cols;i++){
				
				for(int j=0;j<rows;j++){
					//得到单元格
					Cell cell = s1.getCell(i,j);
					System.out.println(cell.getContents()+" ");
				}
				System.out.println();
			}
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} 
	}
	
	//读取excel表中的数据
	public static List<User> readExcel4Users(String path){
		try {
			
			//存放所有的id
			List<String> email=new ArrayList<String>();
			List<String> password=new ArrayList<String>();
			List<String> nickName=new ArrayList<String>();
			
			Map<Integer,List<String>> maps=new HashMap<Integer, List<String>>();
			maps.put(0, email);
			maps.put(1, password);
			maps.put(2, nickName);
			//构造一个excel文件，把它转换成一个Workbook类
			Workbook workbook=Workbook.getWorkbook(new File(path));
			//得到Sheet的数组
			Sheet[] sheets= workbook.getSheets();
			Sheet s1 = sheets[0];
			int rows = s1.getRows();
			int cols = s1.getColumns();
			System.out.println(rows);
			System.out.println(cols);
			//把每一个单元格找出来
			for(int i=0;i<cols;i++){
				
				for(int j=1;j<rows;j++){
					//得到单元格
					Cell cell = s1.getCell(i,j);
					System.out.println(cell.getContents()+" ");
					maps.get(i).add(cell.getContents());
					
				}
			}
			
			//拼装所有的users
			List<User> users=new ArrayList<User>();
			User user=null;
			for(int i=0;i<email.size();i++){
				user=new User();
				user.setEmail(email.get(i));
				user.setPassword(password.get(i));
				user.setNickName(nickName.get(i));
				users.add(user);
			}
			System.out.println("users.size="+users.size());
			return users;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} 
	}
	
	
	//将数据写入到excel表中
	public static boolean writeExcel(){
		try {
			WritableWorkbook workbook=Workbook.createWorkbook(new File("f:\\1.xls"));
			//创建可写的sheet
			WritableSheet sheet= workbook.createSheet("课表", 0);
			Label labName = new Label(0,0,"姓名");
			Label labage = new Label(1,0,"年龄");
			Label labsex= new Label(2,0,"性别");
			sheet.addCell(labName);
			sheet.addCell(labage);
			sheet.addCell(labsex);
			//读写都是一列一列的进行
			for(int i=0;i<3;i++){
				//表示从第二行开始写入
				for(int j=1;j<3;j++){
					Label content = new Label(i,j,i+","+j);
					sheet.addCell(content);
				}
			}
	       workbook.write();
	       workbook.close(); 
	       return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} 
	}
	

}
