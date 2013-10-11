$(document).ready(function() {
	
	$("#share a").toggle(function() {
		$(this).parent().addClass('on');
	}, function(){
		$(this).parent().removeClass('on');
	});

	$("#share ul a").hover(function() {
		var which = $(this).text();
		$("#share.on span").text(which);
	}, function(){
		$("#share.on span").text("Share this page");
	});
	
	$("#list_exp li a").hover(function() {
		$(this).find("span")
			.stop()
			.animate({width: '100%'}, 600)
			
	}, function() {
		$(this).find("span")
			.stop()	
			.animate({width: '120px'}, 600)
	});
	
	$("#billboard h3").lettering();	
	$(".post.full h3").lettering();
	
});
