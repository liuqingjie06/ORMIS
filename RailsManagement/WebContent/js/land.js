$(function(){
	$(".inputtxthover").focus(function(){
		$(this).parent().addClass("hover");
	})
	$(".inputtxthover").blur(function(){
		$(this).parent().removeClass("hover");
	})
});
$(document).ready(function(){
	$("input").val("");
	//邮箱

});

	function keupipunt(id,txt){
		if($("#"+id).val().length>0){
			$("#"+txt).hide();
		}else{
			$("#"+txt).show(200);
		};
		
	}