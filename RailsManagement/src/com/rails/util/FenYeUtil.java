package com.rails.util;

public class FenYeUtil {
	private Integer totalElements;//总记录数
	private Integer pageNow;//当前页
	private Integer pageSize;//当前页面的记录数
	private Integer pageCount;//总页数
	private Integer no;//
	
	
	
	public FenYeUtil(Integer totalElements, Integer pageNow, Integer pageSize) {
		super();
		this.totalElements = totalElements;
		this.pageNow = pageNow;
		this.pageSize = pageSize;
	}

	
		//分页算法
		public Integer getRowsno(){
		    pageCount = getPageCount();//计算出总页数
		    if(pageNow <1){
		    	pageNow = 1;
		    }
		    if(pageNow > pageCount){
		    	pageNow = pageCount;
		    }
		    no = (pageNow -1)*pageSize;//实际的记录开始数
			return no;
		}
		
		public Integer getPageCount(){
			return (totalElements + pageSize - 1) / pageSize;//计算出总页数
		}

}
