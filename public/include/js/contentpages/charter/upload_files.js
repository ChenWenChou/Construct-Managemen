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
 var input = '<input type="file" name="file">';
 var inputObj = $.parseHTML(input);
 $(inputObj).hide().click().change(function(){
   var filename = $(this).val().split('\\').pop();
   $("#closePage").show();

  var option = {styleKind:"contract_fileMana",style:"uploadfile_list"};
  getStyle(option, function(pageStyle){
   
   var pageStyleObj = $.parseHTML(pageStyle);
   $(inputObj).appendTo( $(pageStyleObj).find("form")) ;
   $(pageStyleObj).find(".list-item").eq(0).text(filename);
   $(pageStyleObj).appendTo(".process-area");
   var sendObj = {api:"waDataBase/api/Doc/SetDocFileInsert",data:{}};
   var options = {
    url: "http://211.21.170.18:88/uploaderAPI",
    type:"POST",
    data: sendObj,
    dataType:"JSON",
    beforeSend: function(xhr) {
    	var isCancel = false;
		$(pageStyleObj).find(".uploadBtn").unbind("click").click(function(){
			if (!isCancel){
				xhr.abort();
				$(pageStyleObj).find("form").ajaxFormUnbind();
	      		$(pageStyleObj).find(".bar").width("0%");
	      		$(pageStyleObj).find(".progress").hide();
	           	$(pageStyleObj).find(".uploadStatus").text("取消");
	           	$(this).removeClass("fa-times").addClass("fa-repeat");
	           	isCancel=true;
			}else{
				$(pageStyleObj).find(".bar").width("0%");
				$(pageStyleObj).find(".progress").show();
	           	$(pageStyleObj).find(".uploadStatus").text("上傳中");
	           	$(this).removeClass("fa-repeat").addClass("fa-times");
	           	$(pageStyleObj).find("form").ajaxSubmit(options);
	           	isCancel=false;
			}
      		

     		 // console.log(xhr); 
     	});
           var percentVal = '0%';
      //      $(pageStyleObj).find(".percent").css({
      //      	position: "absolute",
    		// left: "50%",
   			// "margin-left": "-8%",
      //      }).text(percentVal);
          $(pageStyleObj).find(".bar").width(percentVal);
        },
       uploadProgress: function(event, position, total, percentComplete) {
     // console.log(event, position, total, percentComplete);

           var percentVal = percentComplete + '%';
           // $(pageStyleObj).find(".percent").text(percentVal);
           $(pageStyleObj).find(".bar").width(percentVal);
           // if(percentVal == "50%"){
           // 		$(pageStyleObj).find(".percent").css({
           // 			color:"#FFF",
           // 		})
           // }
       },
       success: function(rs) {
        console.log(rs);
           var percentVal = '100%';
           // $(pageStyleObj).find(".percent").text(percentVal);
           $(pageStyleObj).find(".bar").width(percentVal);
           $(pageStyleObj).find(".uploadStatus").text("完成");
           $(pageStyleObj).find(".fa-times").remove();

       },
     complete: function(xhr) {
      console.log(xhr);
      // 暫時不用
       // status.html(xhr.responseText);
     }
   };
   $(pageStyleObj).find("form").ajaxSubmit(options); 
  // uploadProcess( $(pageStyleObj) );

  }); 
  });
 $("#uploadListSet").hide();
}
function getUploadFileStyle(uploadObj){
	console.log($(uploadObj));
	$(uploadObj).prop("id","").appendTo(".process-area");
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

function uploadProcess(uploadListObj){
	console.log("T");
   	var sendObj = {api:"waDataBase/api/Doc/SetDocFileInsert",data:{}}
	$(uploadListObj).find("form").prop("action","http://211.21.170.18:88/uploaderAPI").ajaxForm({
        data:sendObj,  
        dataType:"JSON",

    	beforeSend: function() {

	        var percentVal = '0%';
	        $(pageStyleObj).find(".percent").text(percentVal);
	       
   	 	},
    	uploadProgress: function(event, position, total, percentComplete) {
        	var percentVal = percentComplete + '%';
        	$(pageStyleObj).find(".percent").text(percentVal);
        	$(pageStyleObj).find(".bar").width(percentVal);
    	},
    	success: function(rs) {
    		console.log(rs);
        	var percentVal = '100%';
        	$(pageStyleObj).find(".percent").text(percentVal);
        	$(pageStyleObj).find(".bar").width(percentVal);
    	},
 		complete: function(xhr) {
 			// 暫時不用
 	 		// status.html(xhr.responseText);
 		}
	});
}
