function loginEven(){
	var parm = $("#loginInfo").serialize();
	$.ajax({
		url: configObject.LoginUrl,
		data: parm,
		type:"POST",
		async: false,
	    beforeSend: function(){
	      showLoading(true);
	    },
		success: function(rs){

			var result = $.parseJSON(rs);
			//console.log(result);
			setTimeout(function(){
				redirectPage(result);
				showLoading(false);
			},500);

		}
	});
}


