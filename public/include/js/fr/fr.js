$(function(){
	$("#voiceClick").click(function(e) {
		if($(this).prop("class").search("fa-volume-up") != -1){
			$(this).removeClass("fa-volume-up").addClass("fa-volume-off");
	    	$("#FRMUSIC")[0].pause();
		}else{
			$("#FRMUSIC")[0].play();
			$(this).removeClass("fa-volume-off").addClass("fa-volume-up");

		}

// $("#FRMUSIC").currentTime = 0;
	});	
});
