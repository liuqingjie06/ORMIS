package com.rails.util;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.security.MessageDigest;
import java.util.Iterator;
import java.util.Set;
import com.rails.domain.BaseEntity;
/**
 * 数据工具类
 */
public class DataUtil {
	
	/**
	 * 对数据进行加密
	 */
	public static String md5(String src){
		StringBuffer buffer = new StringBuffer();
		char[] chars = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] bytes = md.digest(src.getBytes());
			for(byte b : bytes){
				//char一共有8位，前4位于0xf(二进制为1111)求与
				buffer.append(chars[b >> 4 & 0xf]);
				//char的后四位和0xf求与
				buffer.append(chars[b & 0xf]);
			}
			return buffer.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null ;
	}
	
	/**
	 * 深度复制
	 */
	public static Serializable deeplyCopy(Serializable src){
		
		//进行深度复制这个对象图
		ByteArrayOutputStream bos=new ByteArrayOutputStream();
		ObjectOutputStream oos;
		try {
			oos = new ObjectOutputStream(bos);
			oos.writeObject(src);
			oos.close();
			bos.close();
			
			//从内存中读出这个对象图
			byte[] buf=bos.toByteArray();
			ByteArrayInputStream bis=new ByteArrayInputStream(buf);
			ObjectInputStream ois=new ObjectInputStream(bis);
			Serializable newPage=(Serializable) ois.readObject();
			return newPage;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 抽取所有实体的id
	 */
	public static String extractIds(Set<? extends BaseEntity> entities){
		String str = "" ;
		Iterator<? extends BaseEntity> it = entities.iterator();
		while(it.hasNext()){
			str = str + it.next().getId() + ",";
		}
		return str.substring(0,str.length() -1) ;
	}
}
