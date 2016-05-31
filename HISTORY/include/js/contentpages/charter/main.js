// 變數
var processAreaStatus = true;
var fileType = "selectToOpenFile";
var filesArr = [];
var docType;
var docTag;
var mydate = new Date();
var myMilliseconds = mydate.getTime();
var prj_uid = 1;
//$(document).ready(function(){ .....  });
$(function(){ 
	selectCategory();
	selectSort();
	tabClick();
	plusItemEvent();
	$(".deleteItem").click(function(){
		$(this).parent().parent().remove();
	});
	$(".selectList").click(function(){
		selectList();
	});
//editSet();
});
// TAB標籤
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
// 點選新增按鈕
function plusItemEvent(){
	$("#plusItem").unbind("click");
	if(fileType != "selectNoToOpenFile"){
		$("#plusItem").click(function(){
			openFile();
		});
	}else{
		$("#plusItem").click(function(){
			openFileList();
		});
	}
}
// TAB 取大類別API
function selectSort(){
   	var sendObj = 
   	{
		api:DocApi+"GetDocTypeList",
   		data:{prj_uid:prj_uid}
   	};

	$.getJSON(wrsUrl,sendObj,function(rs){
		if(rs.status==true){
			$("#tab-menu").empty();
			$.each(rs.data, function(Key , Val){
				var tabObj = $("<li>");
				var categoryObj = $("<a>").prop("id","category"+Val.uid);
				var categoryContentObj =  $("<div>").prop("id","category"+Val.uid+"-content").addClass("tab-border");
				$("#tab-menu").after(categoryContentObj);
				if(Key==0){
					$(tabObj).addClass("active");
					getDocList(Val.uid , categoryContentObj, Val.edit);
					docType = Val.uid;
				}
				$(categoryObj).click(function(){
					getDocList(Val.uid , categoryContentObj, Val.edit);
					docType = Val.uid;
					$(categoryContentObj).empty();

				});
				$(categoryObj).appendTo(tabObj);
				$(tabObj).appendTo("#tab-menu");
				$(categoryObj).text(Val.name);
			});
				tabCtrl("tab-menu");
		}
	});
}
// 取放資料API
function getDocList(uid,categoryContentObj, edit){
	var sendObj = 
	{
   		api : DocApi+"getDocList",
   		data:{prjuid:1,typeid:uid}
    };
   $.getJSON(wrsUrl,sendObj,function(rs){
   		// console.log(rs);
   		if(rs.data.length){
   			// 替換樣式
   			if(edit){
   				var style = "3grid-modify";
   			}
   			else{
   				var style = "3grid-content"
   			}
   			var option = {styleKind:"list",style:style};
   			getStyle(option,function(pageStyle){
				var categoryListObj = $("<div>").addClass("contents");
   				$.each(rs.data, function(Key , Val){
   					var StyleObj = $.parseHTML(pageStyle);
   					$(StyleObj).find(".list-items").eq(0).text(Val.name);//第一欄
   					$(StyleObj).find(".list-items").eq(1).text(Val.typeName);//第二欄
                	$(StyleObj).find(".list-items").eq(2).text(Val.date);//第三欄
                	// glyphicon glyphicon-open-file
                	// <i class="glyphicon glyphicon-stop"></i>
                	$(StyleObj).find(".fa-trash-o").removeClass("fa fa-lg fa-trash-o").addClass("glyphicon glyphicon-open-file font-size-16px")
                	.click(function(){
                		ReUploadFile();
                	});
                	$(StyleObj).find(".fa-pencil-square-o").css("line-height",0).click(function(){
                		modifyRename(Val.name);
                	});

                	// $(StyleObj).find(".fa-trash-o").remove();
                	$(categoryListObj).appendTo(categoryContentObj);
                	$(StyleObj).appendTo(categoryListObj);
                                //無資料顯示暫無相關資料	
   				});
   				$(categoryContentObj).find(".list-items-bottom").last().removeClass("list-items-bottom");	
   			});	
   		}else{
   			var categoryListObj = $("<div>").addClass("contents");
   			$(categoryListObj).appendTo(categoryContentObj);
   			putEmptyInfo($(categoryListObj));
   		} 
   });

}
//小類別API
function selectCategory(pageStyleObj,contentObj){
	var sendObj = {
   		api : DocApi+"GetDocTypeList",
   		data:{prj_uid:prj_uid,typeid:docType}
    };
    $.getJSON(wrsUrl,sendObj,function(rs){
        if(rs.status){
            $.each(rs.data,function(key,value){
                selectOptionPut($(pageStyleObj).find("#SmallcategoryID"),value["uid"],value["name"]);
            });
            if(contentObj!=undefined){
                $(pageStyleObj).find("#SmallcategoryID").val(contentObj.SmallcategoryID);
            }
        }

        
    });
}