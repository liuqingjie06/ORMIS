(function($){
$.fn.extend({
	sSelect: function() {
		return this.each(function(i,obj){
		var selectId = (this.id)+'__jQSelect'+i||'__jQSelect'+i;
		var dropdown='dropdown_'+(this.id);
		if(obj.style.display != 'none' && $(this).parents()[0].id.indexOf('__jQSelect')<0){
		var tabindex = this.tabIndex||0;
		$(this).before("<div id="+dropdown+" class='selectlist margins'><div class='relative' id="+selectId+" tabIndex="+tabindex+"></div></div>").prependTo($("#"+selectId));
		if(this.className=="" && this.title==""){
			$('#'+selectId).append("<div class='dropselect'><h4></h4></div><ul id='dropselistbox'></ul>");
		}else{
		if(this.className==""){
			if(this.title==""){
				$('#'+selectId).append("<div class='dropselect'><div class='selectIcon'><font class='selectt' id='"+(this.id)+"_icon'></font><font class='selectb' id='"+(this.id)+"_icont'></font></div><h4></h4></div><ul id='dropselistbox'></ul>");
			}else{
				$('#'+selectId).append("<div class='dropselect'><div class='selectIcon'><font class='selectb' id='"+(this.id)+"_icont' style='margin-top:3px;'></font></div><h4></h4></div><ul id='dropselistbox'></ul>");			
		};
		}else{
			$('#'+selectId).append("<div class='dropselect'><div class='selectIcon'><font class='selectt' id='"+(this.id)+"_icon'></font><font class='selectb' id='"+(this.id)+"_icont'></font></div><h4></h4></div><ul id='dropselistbox'></ul>");
		};
		}
		var selectZindex = $(this).css('z-index'),selectIndex = $('#'+selectId+' option').index($('#'+selectId+' option:selected')[0]);	
		$('#'+selectId+' h4').empty().append($('#'+selectId+' option:selected').text());
		$('#'+selectId+' h4').attr('title',$('#'+selectId+' option:selected').text());
		var selectWidth=$('#'+selectId+' select').width();
		var selectHeight=$('#'+selectId+' select').height();
		var zindex=$('#'+selectId+' select').css("z-index");
		if($.browser.safari){selectWidth = selectWidth+24};
		var selecttxtwidth=parseFloat($('#'+selectId+' select').css("left")),//姝eft鐢ㄤ簬鎺у埗瀹藉害
			selecttxtheight=parseFloat($('#'+selectId+' select').css("top"));//姝op鐢ㄤ簬鎺у埗楂樺害
		//$('#'+selectId+' h4').css({width:selectWidth});閫夋嫨妗嗗唴瀹瑰搴�
		//var selectUlwidth = selectWidth + parseInt($('#'+selectId+' h4').css("padding-left")) + parseInt($('#'+selectId+' h4').css("margin-right"));
		//var selectulwidtht=selectUlwidth;
		$('#'+dropdown).css({height:selectHeight+'px',float:"left"});
		$('#'+selectId).css({'z-index':zindex});
		if(selecttxtwidth>0){
			$('#'+dropdown).css({width:selecttxtwidth});
		}
		if(selecttxtheight>0){
			$('#'+selectId+' ul').css({"max-height":selecttxtheight});
		}
		var selectmaxwidth=$('#'+dropdown).width();
		if(selectmaxwidth>=selectWidth){
			//alert(selectmaxwidth+">"+selectWidth);
			$('#'+selectId+' ul').css({width:selectmaxwidth+7+'px',display:'none'});
		}else{
			$('#'+selectId+' ul').css({width:selectWidth-2+'px',display:'none'});
		}
		$('#'+selectId+' select').hide();
		$('#'+selectId+' div').hover(function(){
			$('#'+selectId+' .dropselect').addClass("over");
		},function(){
			$('#'+selectId+' .dropselect').removeClass("over");
		});

		var timeobj;
		$('#'+selectId+' ul').bind("mouseover",function(e){
			clearTimeout(timeobj);
		});
		
		$("#"+(this.id)+"_icon").bind("mouseover",function(e){
			$('#'+selectId+' .dropselect').addClass("over");
		});
		$("#"+(this.id)+"_icont").bind("mouseover",function(e){
			$('#'+selectId+' .dropselect').addClass("over");
		});
		var click_fun =function(){
				$('#'+selectId+' .dropselect').addClass("current");
				$('#'+selectId+' ul').show();	
				var selectZindex = $('#'+selectId).css('z-index');
				if ($.browser.msie || $.browser.opera){$('.dropdown').css({'position':'relative'/*,'z-index':'99'*/});}
				$.fn.setSelectValue(selectId);
				selectIndex = $('#'+selectId+' li').index($('.selectedli')[0]);
				var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $('#'+selectId).offset().top;
				var ulspace = $('#'+selectId+' ul').outerHeight(true);
				var windowspace2 = $('#'+selectId).offset().top - $(window).scrollTop() - ulspace;
				windowspace < ulspace && windowspace2 > 0?$('#'+selectId+' ul').css({top:-ulspace}):$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
				/*$(window).scroll(function(){
					windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $('#'+selectId).offset().top;
					windowspace < ulspace?$('#'+selectId+' ul').css({top:-ulspace}):$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
				});	*/
				$('#'+selectId+' li').click(function(e){
						selectIndex = $('#'+selectId+' li').index(this);
						$.fn.keyDown(selectId,selectIndex);
						$('#'+selectId+' h4').empty().append($('#'+selectId+' option:selected').text());
						$('#'+selectId+' h4').attr('title',$('#'+selectId+' option:selected').text());
						if($('#selectyy1__jQSelect0 h4').html()=='閫夋嫨搴旂敤'){ //杞寲浠〃閫夋嫨鍚庣殑鏍峰紡
							$('#selectyy1__jQSelect0 h4').removeClass("h4style")
						}else{
							$('#selectyy1__jQSelect0 h4').addClass("h4style")
						}
						if($('#selectyy2__jQSelect0 h4').html()=='閫夋嫨搴旂敤'){ //杞寲浠〃閫夋嫨鍚庣殑鏍峰紡
							$('#selectyy2__jQSelect0 h4').removeClass("h4style")
						}else{
							$('#selectyy2__jQSelect0 h4').addClass("h4style")
						}
						$.fn.clearSelectMenu(selectId,selectZindex);
						e.stopPropagation();
						e.cancelbubble = true;
				})
				.hover(
					   function(){
							$('#'+selectId+' li').removeClass("over");
							$(this).addClass("over").addClass("selectedli");
							selectIndex = $('#'+selectId+' li').index(this);
						}//,
						//function(){
							//$(this).removeClass("over");
						//}
				);
		}
		$('#'+selectId)
		.bind("focus",function(){
			//$.fn.clearSelectMenu(selectId,selectZindex);
			$('#'+selectId+' h4').addClass("over");
		})
		.bind("click",function(e){
			if($('#'+selectId+' ul').css("display") == 'block'){
				$.fn.clearSelectMenu(selectId,selectZindex);
				return false;
			}else{
				click_fun();
			};
			e.stopPropagation();
		})
		/*
		.bind("mouseover",function(e){
			if($('#'+selectId+' ul').css("display") == 'block'){
				//$.fn.clearSelectMenu(selectId,selectZindex);
				return false;
			}else{
				click_fun();
			};
			e.stopPropagation();
		})
		.bind("mouseout",function(e){
			if($('#'+selectId+' ul').css("display") == 'block'){
				timeobj = setTimeout(function(){
					$.fn.clearSelectMenu(selectId,selectZindex);
				},500);
				return false;
			}
			e.stopPropagation();
		})
		 .bind('mousewheel', function(e,delta) {
				e.preventDefault();
				var mousewheel = {
					$obj : $('#'+selectId+' li.over'),
					$slength : $('#'+selectId+' option').length,
					mup:function(){
						this.$obj.removeClass("over");
						selectIndex == 0?selectIndex = 0:selectIndex--;
						$.fn.keyDown(selectId,selectIndex);
					},
					mdown:function(){
						this.$obj.removeClass("over");
						selectIndex == (this.$slength - 1)?selectIndex = this.$slength - 1:selectIndex ++;
						$.fn.keyDown(selectId,selectIndex);
					}
				}
				delta>0?mousewheel.mup():mousewheel.mdown();
		 })
		.bind("dblclick", function(){
			$.fn.clearSelectMenu(selectId,selectZindex);
			return false;
		})*/
		.bind("keydown",function(e){
			$(this).bind('keydown',function(e){
				if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 35 || e.keyCode == 36){
					return false;
				}
			});
			var $obj = $('#'+selectId+' li.over'),$slength = $('#'+selectId+' option').length;
			switch(e.keyCode){
				case 9:
					return true;
					break;
				case 13:
					//enter
					$.fn.clearSelectMenu(selectId,selectZindex);
					break;
				case 27:
					//esc
					$.fn.clearSelectMenu(selectId,selectZindex);
					break;
				case 33:
					$obj.removeClass("over");
					selectIndex = 0;
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 34:
					$obj.removeClass("over");
					selectIndex = ($slength - 1);
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 35:
					$obj.removeClass("over");
					selectIndex = ($slength - 1);
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 36:
					$obj.removeClass("over");
					selectIndex = 0;
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 38:
					//up
					e.preventDefault();
					$obj.removeClass("over");
					selectIndex == 0?selectIndex = 0:selectIndex--;
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 40:
					//down
					e.preventDefault();
					$obj.removeClass("over");
					selectIndex == ($slength - 1)?selectIndex = $slength - 1:selectIndex ++;
					$.fn.keyDown(selectId,selectIndex);
					break;
				default:
					e.preventDefault();
					break;
			};
		})
		.bind("blur",function(){
			$.fn.clearSelectMenu(selectId,selectZindex);
			return false;
		})
		.bind("selectstart",function(){
				return false;
		});
		/*涓婁笅鎸夐挳鍔熻兘
		$("#"+(this.id)+"_icon").bind("click",function(e){
					var $obj = $('#'+selectId+' li.over'),$slength = $('#'+selectId+' option').length;
					e.preventDefault();
					$obj.removeClass("over");
					selectIndex == 0?selectIndex = 0:selectIndex--;
					$.fn.keyDown(selectId,selectIndex);		
		});
		$("#"+(this.id)+"_icont").bind("click",function(e){
					var $obj = $('#'+selectId+' li.over'),$slength = $('#'+selectId+' option').length;
					e.preventDefault();
					$obj.removeClass("over");
					selectIndex == ($slength - 1)?selectIndex = $slength - 1:selectIndex ++;
					$.fn.keyDown(selectId,selectIndex);
					$('#'+selectId+' .dropselect').addClass("over");
		})*/
	}else if($(this).parents()[0].id.indexOf('__jQSelect')>0){
		selectId = $(this).parents()[0].id;
		$.fn.setSelectValue(selectId);
		var selectWidth=$('#'+selectId+' select').width();
		if($.browser.safari){selectWidth = selectWidth+24}
		var selecttxtwidth=parseFloat($('#'+selectId+' select').css("left"));//姝eft鐢ㄤ簬鎺у埗瀹藉害
			selecttxtheight=parseFloat($('#'+selectId+' select').css("top"));//姝op鐢ㄤ簬鎺у埗楂樺害
		//$('#'+selectId+' h4').css({width:selectWidth}); 閫夋嫨妗嗗唴瀹瑰搴�
		//var selectUlwidth = selectWidth + parseInt($('#'+selectId+' h4').css("padding-left")) + parseInt($('#'+selectId+' h4').css("margin-right"));
		if(selecttxtwidth>0){
			$('#'+dropdown).css({width:selecttxtwidth});
		}
		if(selecttxtheight>0){
			$('#'+selectId+' ul').css({"max-height":selecttxtheight});
		}
		var selectmaxwidth=$('#'+dropdown).width();
		if(selectmaxwidth>selectWidth){
			$('#'+selectId+' ul').css({width:selectmaxwidth-2+'px'});
		}else{
			$('#'+selectId+' ul').css({width:selectWidth-2+'px'});
		}
		//$('#'+selectId+' ul').css({width:selectWidth+'px'});
		//$('#'+dropdown).css({width:selectUlwidth+'px'});
		if(this.style.display != 'none'){$(this).hide();}
	}})},
	clearSelectMenu:function(selectId,selectZindex){
		if(selectId != undefined){
			selectZindex = selectZindex||'auto';
			$('#'+selectId+' ul').empty().hide();
			$('#'+selectId+' .dropselect').removeClass("over").removeClass("current");
			/*$('#'+selectId).css({'z-index':selectZindex});*/
		}
	},
	setSelectValue:function(sID){
		var content = [];
		$.each($('#'+sID+' option'), function(i){
			content.push("<li class='FixSelectBrowser' id='"+(sID)+i+"' title='"+$(this).text()+"'>"+$(this).text()+"</li>");
		});
		content = content.join('');
		$('#'+sID+' ul').html(content);
		$('#'+sID+' h4').html($('#'+sID+' option:selected').text());
		$('#'+sID+' h4').attr('title',$('#'+sID+' option:selected').text());
		if($('#selectyy1__jQSelect0 h4').html()=='閫夋嫨搴旂敤'){ //杞寲浠〃閫夋嫨鍚庣殑鏍峰紡
			$('#selectyy1__jQSelect0 h4').removeClass("h4style")
		}else{
			$('#selectyy1__jQSelect0 h4').addClass("h4style")
		}
		if($('#selectyy2__jQSelect0 h4').html()=='閫夋嫨搴旂敤'){ //杞寲浠〃閫夋嫨鍚庣殑鏍峰紡
			$('#selectyy2__jQSelect0 h4').removeClass("h4style")
		}else{
			$('#selectyy2__jQSelect0 h4').addClass("h4style")
		}
		$('#'+sID+' li').eq($('#'+sID+' select')[0].selectedIndex).addClass("over").addClass("selectedli");
	},
	keyDown:function(sID,selectIndex){
		var $obj = $('#'+sID+' select');
		$obj[0].selectedIndex = selectIndex;
		$obj.change();
		$('#'+sID+' li:eq('+selectIndex+')').toggleClass("over");
		$('#'+sID+' h4').html($('#'+sID+' option:selected').text());
		$('#'+sID+' h4').attr('title',$('#'+sID+' option:selected').text());
		if($('#selectyy1__jQSelect0 h4').html()=='閫夋嫨搴旂敤'){ //杞寲浠〃閫夋嫨鍚庣殑鏍峰紡
			$('#selectyy1__jQSelect0 h4').removeClass("h4style")
		}else{
			$('#selectyy1__jQSelect0 h4').addClass("h4style")
		}
		if($('#selectyy2__jQSelect0 h4').html()=='閫夋嫨搴旂敤'){ //杞寲浠〃閫夋嫨鍚庣殑鏍峰紡
			$('#selectyy2__jQSelect0 h4').removeClass("h4style")
		}else{
			$('#selectyy2__jQSelect0 h4').addClass("h4style")
		}
	}
});
var types = ['DOMMouseScroll', 'mousewheel'];
$.event.special.mousewheel = {
	setup: function() {
		if ( this.addEventListener )
			for ( var i=types.length; i; )
				this.addEventListener( types[--i], handler, false );
		else
			this.onmousewheel = handler;
	},	
	teardown: function() {
		if ( this.removeEventListener )
			for ( var i=types.length; i; )
				this.removeEventListener( types[--i], handler, false );
		else
			this.onmousewheel = null;
	}
};
$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});
function handler(event) {
	var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
	event = $.event.fix(event || window.event);
	event.type = "mousewheel";	
	if ( event.wheelDelta ) delta = event.wheelDelta/120;
	if ( event.detail     ) delta = -event.detail/3;
	args.unshift(event, delta);
	return $.event.handle.apply(this, args);
}
})(jQuery);