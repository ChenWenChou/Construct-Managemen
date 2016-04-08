var processAreaStatus = true;
var fileType = "selectToOpenFile";

$(function(){ //$(document).ready(function(){ .....  });
	tabClick();
	plusItemEvent();
	$(".deleteItem").click(function(){
		// console.log($(this));
		$(this).parent().parent().remove();
	});
	$(".selectList").click(function(){
		// console.log($(this));
		selectList();
	});
//editSet();
});

function tabClick(){
	$("#tab-menu").find("li a").click(function(){
		$("#tab-menu").find("li").removeClass("active");
		$(this).parent().addClass("active");
		var id = $(this).prop("id");
		var className = $(this).prop("class");

		fileType = className;
		$("#uploadListSet").hide();
		plusItemEvent();
		$(".tab_content").hide();
		$("#"+id+"_content").show();
		return false;
	});
}

function plusItemEvent(){
	$("#plusItem").unbind("click");
	if(fileType != "selectNoToOpenFile"){
		$("#plusItem").click(function(){
			openFileUpload();
		});
		
	}else{
		$("#plusItem").click(function(){
			openFileList();
		});
	}
}

function uploadList(){
	// console.log("T");
	$(".process-area").toggle();
	if(processAreaStatus){
		processAreaStatus = false;
		$(".upload-text").removeClass("content-display-none");
		
	}else{
		processAreaStatus = true;
		$(".upload-text").addClass("content-display-none");
	}
	//processAreaStatus = (processAreaStatus) ? false : true;
	

}
function closeUpLoadList(){
	$("#closePage").toggle();

}

function openFileUpload(){
	$("#outputFile").click();
	$("#uploadListSet").hide();
}

function openFileList(){
	//$("#outputFile").click();
 
	
	//editSet();
	$("#uploadListSet").toggle();
}

//function editSet(){
	//var place=$("#plusItem").offset();
	//var btnWidth = $("#plusItem").width();
	// $("#uploadListSet").offset({
	// 	top: place.top,
	// 	left: place.left + btnWidth
	// });
	//console.log(btnWidth,place);
//}
function selectList(){
	$("#outputFile").click();
}
