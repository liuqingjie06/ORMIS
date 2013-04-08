// JavaScript Document
//选项卡样式
function tags(showContent,selfObj){
	// 操作标签
	var tag = document.getElementById("two").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	// 操作内容
	for(i=0; j=document.getElementById("two"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}


function tags2(showContent,selfObj){
	// 操作标签
	var tag = document.getElementById("twoo").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	// 操作内容
	for(i=0; j=document.getElementById("two_"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}




function tags3(showContent,selfObj){
	// 操作标签
	var tag = document.getElementById("two_o").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "hover";
	// 操作内容
	for(i=0; j=document.getElementById("two__"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}


function tagsapp(showContent,selfObj){
	// 操作标签
	var tag = document.getElementById("two").getElementsByTagName("li");
	var selfObji=document.getElementById(selfObj)
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObji.className = "hover";
	// 操作内容
	for(i=0; j=document.getElementById("two"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}