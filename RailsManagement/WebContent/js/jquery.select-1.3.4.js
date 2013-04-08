/* 
* jQuery.select.js 
*/ 
jQuery.fn.sSelect = function(){ 
var selectId = $(this).attr('id'); 
var selectZindex = $(this).css('z-index'); 
var selectIndex = $('#'+selectId+' > select > option').index($('#'+selectId+' > select > option:selected')[0]); 
$('#'+selectId).append('<div class="dropselectbox"><h4></h4><span class="FixSelectBrowserSpan"></span><ul style="display:none" style="display:none"><li></li></ul></div>'); 
$('#'+selectId+' > div > h4').empty().append($('#'+selectId+' > select > option:selected').text()); 
$('.dropselectbox').css("display", 'block'); 
//取select的宽度 优先级 select样式中的宽度 - select自动的宽度 - 默认为60 
var selectcssWidth = $('#'+selectId+'> select').css('width'); 
selectcssWidth = typeof(selectcssWidth) =='undefined' ? 0 : parseInt(selectcssWidth.replace('px','')) +5 ; 
var selectWidth = selectcssWidth ? selectcssWidth : ( $('#'+selectId+'> select').width() > 0 ? $('#'+selectId+'> select').width() + 5 : 60); 
$('#'+selectId).css("margin-right",selectWidth); //修改偏移量 
$('#'+selectId+' > div > h4').css("width", selectWidth); //将原select的宽度赋值给生成的select（并不是h4的总宽度） 
$('#'+selectId+' > div > ul').css("width",selectWidth); //将h4的总宽度赋值给Ul
$('#'+selectId+' > select').hide(); 
$('#'+selectId+' > div').hover(function(){ 
$('#'+selectId+' > div > h4').addClass("over"); 
$('#'+selectId+' > div > span').addClass("over"); 
},function(){ 
$('#'+selectId+' > div > h4').removeClass("over"); 
$('#'+selectId+' > div > span').removeClass("over"); 
}); 
$('#'+selectId) 
.bind("focus",function(){ 
__clearSelectMenu(); 
$('#'+selectId+' > div > h4').addClass("over"); 
$('#'+selectId+' > div > span').addClass("over"); 
}) 
.bind("click",function(e){ 
//$('#value2').append('点击：'+selectIndex+' <br>'); 
if($('#'+selectId+' > div > ul').css("display") == 'block'){ 
__clearSelectMenu(selectId); 
return false; 
}else{ 
if ($.browser.opera){__clearSelectMenu();} 
$('#'+selectId+' > div > h4').addClass("current"); 
$('#'+selectId+' > div > span').addClass("over").addClass("current"); 
$('#'+selectId+' > div > ul').show(); 
var selectZindex = $(this).css('z-index'); 
if ($.browser.msie || $.browser.opera){ 
$('.dropdown').removeClass('overclass'); 
} 
$('#'+selectId).addClass('overclass'); 
__setSelectValue(selectId); 
var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $(this).offset().top; 
var ulspace = $('#'+selectId+' > div > ul').outerHeight(true); 
var windowspace2 = $(this).offset().top - $(window).scrollTop() - ulspace; 
if (windowspace < ulspace && windowspace2 > 0) { 
$('#'+selectId+' > div > ul').css({top:-ulspace}); 
}else{ 
$('#'+selectId+' > div > ul').css({top:$('#'+selectId+' > div > h4').outerHeight(true)}); 
} 
selectIndex = $('#'+selectId+' > div > ul > li').index($('.selectedli')[0]); 
$(window).scroll(function(){ 
var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $('#'+selectId).offset().top; 
var ulspace = $('#'+selectId+' > div > ul').outerHeight(true); 
if (windowspace < ulspace) { 
$('#'+selectId+' > div > ul').css({top:-ulspace}); 
}else{ 
$('#'+selectId+' > div > ul').css({top:$('#'+selectId+' > div > h4').outerHeight(true)}); 
} 
}); 
//响应鼠标点击选择 
$('#'+selectId+' > div > ul > li').click(function(e){ 
selectIndex = $('#'+selectId+' > div > ul > li').index(this); 
//$('#value2').append('鼠标点击：'+selectIndex+' <br>'); 
$('#'+selectId+'> select')[0].selectedIndex = selectIndex; 
$('#'+selectId+' > div > h4').empty().append($('#'+selectId+' > select > option:selected').text()); 
__clearSelectMenu(selectId,selectZindex); 
e.stopPropagation(); 
e.cancelbubble = true; 
//SELECT onchange 事件 
$('#'+selectId+'> select').change(); 
}) 
.hover( 
function(){ 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
$(this).addClass("over").addClass("selectedli"); 
selectIndex = $('#'+selectId+' > div > ul > li').index(this); 
}, 
function(){ 
$(this).removeClass("over"); 
} 
); 
//End 
}; 
e.stopPropagation(); 
}) 
.bind("mousewheel",function(){ 
//以后也许支持滚轮 
/*$('#'+selectId+' > div > ul > li').hover( 
function(){ 
return false; 
}, 
function(){ 
return false; 
} 
);*/ 
}) 
.bind("dblclick", function(){ 
__clearSelectMenu(); 
return false; 
}) 
.bind("keydown",function(e){ 
//var hotkeys = e.keyCode; 
$(this).bind('keydown',function(e){ 
if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 35 || e.keyCode == 36){
return false; 
} 
}); 
switch(e.keyCode){ //设置为true可给定case范围 
case 9: 
return true; 
break; 
case 13: 
//enter 
//$('#value2').append('按回车收到的值：'+selectIndex+' <br>'); 
__clearSelectMenu(); 
break; 
case 27: 
//esc 
__clearSelectMenu(); 
break; 
case 33: 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
selectIndex = 0; 
__keyDown(selectId,selectIndex); 
break; 
case 34: 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
selectIndex = ($('#'+selectId+' > select > option').length - 1); 
__keyDown(selectId,selectIndex); 
break; 
case 35: 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
selectIndex = ($('#'+selectId+' > select > option').length - 1); 
__keyDown(selectId,selectIndex); 
break; 
case 36: 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
selectIndex = 0; 
__keyDown(selectId,selectIndex); 
break; 
case 38: 
//up 
//$('#value2').append('原始值：'+selectIndex+' <br>'); 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
if (selectIndex == 0){ 
selectIndex = 0; 
}else{ 
selectIndex--; 
}; 
//$('#value2').append('<span style="color:red;" style="color:red;">向上改变的aa值：</span>'+selectIndex+' '); 
__keyDown(selectId,selectIndex); 
break; 
case 40: 
//down 
//$('#value2').append('传递过来的：'+selectIndex+' '); 
$('#'+selectId+' > div > ul > li').removeClass("over"); 
if (selectIndex == ($('#'+selectId+' > select > option').length - 1)){ 
selectIndex = $('#'+selectId+' > select > option').length - 1; 
}else{ 
selectIndex ++; 
}; 
//$('#value2').append('<span style="color:blue;" style="color:blue;">向下改变的aa值：</span>'+selectIndex+' '); 
__keyDown(selectId,selectIndex); 
break; 
/*case ((hotkeys > 47 && hotkeys < 59) || (hotkeys > 64 && hotkeys < 91) || (hotkeys > 96 && hotkeys < 123)): 
//首字幕查询预留接口 
//character = String.fromCharCode(hotkeys).toLowerCase(); 
return false; 
break;*/ 
default: 
return false; 
break; 
}; 
}) 
.bind("blur",function(){ 
__clearSelectMenu(selectId,selectZindex); 
return false; 
}); 
//禁止选择 
$('.dropselectbox').bind("selectstart",function(){ 
return false; 
}); 
}; 
function __clearSelectMenu(selectId,selectZindex){ 
//$('#value2').append('移除焦点：'+selectIndex+' <br>'); 
$('.dropselectbox > ul').empty().hide(); 
$('.dropselectbox > h4').removeClass("over").removeClass("current"); 
$('.dropselectbox > span').removeClass("over"); 
$('#'+selectId).removeClass('overclass'); 
} 
function __setSelectValue(sID){ 
$('#'+sID+' > div > ul').empty(); 
$.each($('#'+sID+' > select > option'), function(i){ 
$('#'+sID+' > div > ul').append("<li class='FixSelectBrowser'>"+$(this).text()+"</li>"); 
}); 
$('#'+sID+' > div > h4').empty().append($('#'+sID+' > select option:selected').text()); 
$('#'+sID+' > div > ul > li').eq($('#'+sID+'> select')[0].selectedIndex).addClass("over").addClass("selectedli"); 
} 
function __keyDown(sID,selectIndex){ 
$('#'+sID+'> select')[0].selectedIndex = selectIndex; 
$('#'+sID+' > div > ul > li:eq('+selectIndex+')').toggleClass("over"); 
$('#'+sID+' > div > h4').empty().append($('#'+sID+' > select option:selected').text()); 
//SELECT onchange 事件 
$('#'+sID+'> select').change(); 
} 
/* 自动调用 */ 
$(document).ready(function(){ 
var s = new Array(); 
var t = document.getElementsByTagName('select'); 
var j = 0; 
for(var i=0;i<t.length;i++){ 
if(t[i].className=='commonselect'){ 
s[j] = t[i]; 
j++; 
} 
} 
if(j==0)return; 
var k = m = null; 
for(var i=0;i<s.length;i++){ 
k = s[i].parentNode; 
m = createDiv(k, i); 
//s[i].replaceNode(m); 
k.replaceChild(m,s[i]) 
m.appendChild(s[i]); 
$('#selectbox'+ i).sSelect(); 
} 
function createDiv(p, i){ 
var div = document.createElement('div'); 
div.className = 'dropdown'; 
div.id = 'selectbox' + i; 
div.innerHTML = ' '; 
p.appendChild(div); 
return div; 
} 
}) // JavaScript Document