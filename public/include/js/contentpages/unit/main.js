$(function() {
   getList(1,true);
});

//取得並顯示材料列表
var listRow=2;
var nowRow;
var nowPage = 1;
function tranPage(count){

  var pages = Math.ceil(count/listRow);
  $(".tranPage").remove();

  for(var i=1; i <= pages;i++){


    var liStr = "<li class='tranPage'><a href='#' onclick='getList("+i+")'>"+i+"</a></li>";
    var liObj = $.parseHTML(liStr);
   
    $("#nextPages").before(liObj);
   
  }
}
function addNewUnit(){
    $("body").find("#addDialog").remove();
    $("<div>").prop("id","addDialog").appendTo("body");
    $("#addDialog").bsDialog({
        title:"新增單位類別",
        start: function(){
            var option = {styleKind:"unit",style:"in-mo"};
                // 取得畫面樣式
            getStyle(option,function(pageStyle){
                // console.log(pageStyle);
                //自訂要的欄位
                var inputObject={
                    unit1:{
                        Name:"單位",
                        
                    }
                };
                
                    // console.log(key,val);
                    var pageStyleObj = $.parseHTML(pageStyle);
                    
                    $(pageStyleObj).appendTo($("#addDialog").find(".modal-body"));
                    selectContent(pageStyleObj);
               
                // $("#modifyDialog").find(".modal-body").html(pageStyle);

            });
          
        },
        button:[
          {
            text:"新增",
            className: "btn-success",
            click: function(){
                var addUnitObj = getUserInput("addDialog");
                addUnitObj.unit2=""; 
                // addUnitObj = {
                //     ad:addUnitObj
                // };
                console.log(addUnitObj);
                // return;
              $.post(UnitApi+"insert_data",addUnitObj,function(rs){
                // $("#addDialog").bsDialog("close");

              })
            }
          },
          {
            text: "取消",
            className: "btn-default-font-color",
            click: function(){
              $("#addDialog").bsDialog("close");
            }
          },
        ]
    });
}

function getList(start, pageCreate){

    if(typeof start == "undefined"){
        start = 1;
    }

    if(typeof pageCreate == "undefined"){
        pageCreate = false;
    }
    nowRow = (start-1)*listRow+1;
    $.getJSON(UnitApi+"inquire_data",function(rs){
        // console.log(rs);
        var option = {styleKind:"list",style:"1grid-modify"};
                // 取得畫面樣式
        getStyle(option,function(pageStyle){
            //用迴圈產生幾列
            $.each(rs, function(Key , Val){
                //轉成HTML物件
                var unitStyleObj = $.parseHTML(pageStyle);
                //找到第一欄
                
                $(unitStyleObj).find(".list-items").eq(0).text(Val["unit1"]);
                // $(unitStyleObj).find(".list-items").eq(1).text(Val["typeid_a"]);
                //放到ID裡
                $(unitStyleObj).appendTo("#unitArea");
                //編輯按鈕
                $(unitStyleObj).find(".fa-pencil-square-o").click(function(){
                    //傳第一欄 修改;
                    modifyDialog(Val, $(unitStyleObj).find(".list-items").eq(0));
                });
                //刪除
                $(unitStyleObj).find(".fa-trash-o").click(function(){
                    // console.log($(this));
                    delList(Val.uid);
                    $(this).parents(".list-items").parent().remove();
                    var areaData=$("#unitArea").find("div").length;
                    //無資料顯示暫無相關資料
                    if(!areaData){
                        var option = {styleKind:"system",style:"data-empty"};
                             // 取得畫面樣式
                        getStyle(option,function(emptyStyle){
                            $("#unitArea").html(emptyStyle);

                        });
                        
                    }
                    else{
                        $("#unitArea").find(".list-items-bottom").last().removeClass("list-items-bottom");
                    }

                });
            });
            // 相關設定
            $("#unitArea").find(".list-items-bottom").last().removeClass("list-items-bottom");
        });
    });
}
//dialog方法
function modifyDialog(contentObj, clickObj){
    $("body").find("#modifyDialog").remove();
    $("<div>").prop("id","modifyDialog").appendTo("body");
    $("#modifyDialog").bsDialog({
        title:"修改單位類別",
        start: function(){
            var option = {styleKind:"unit",style:"in-mo"};
                // 取得畫面樣式
            getStyle(option,function(pageStyle){
                // console.log(pageStyle);
                //自訂要的欄位
               var pageStyleObj = $.parseHTML(pageStyle);
               
                $(pageStyleObj).appendTo($("#modifyDialog").find(".modal-body"));
                // $("#modifyDialog").find(".modal-body").html(pageStyle);
                selectContent(pageStyleObj,contentObj);
                putContent(pageStyleObj,contentObj);
            });
          
        },
        button:[
          {
            text:"修改",
            className: "btn-success",
            click: function(){
                var sendObj = {
                    up:getUserInput("modifyDialog")
                };
                sendObj.up.uid = contentObj.uid;
              // console.log(sendObj);
              clickObj.text(sendObj.up.unit1);
              $.post(UnitApi+"update_data",sendObj,function(){
                $("#modifyDialog").bsDialog("close");

              })
              // console.log(contentObj.uid);
            }
          },
          {
            text: "取消",
            className: "btn-default-font-color",
            click: function(){
              $("#modifyDialog").bsDialog("close");
            }
          },
        ]
    });
}

function delList(uid){
     
    var sendObj = {
        apiMethod:"waunit/api/Unit/delete_data",
        deleteObj:{
            de:uid
        }
    };
    $.post("http://211.21.170.18/deletemethod",sendObj,function(rs){
        console.log(rs);
              });

}
function selectContent(pageStyleObj,contentObj){
   console.log(contentObj);
    $.getJSON(EngApi+"GetEngSingleList" ,{type:"a"},function(rs){
        //console.log(rs);
        if(rs.status){
            $.each(rs.data,function(key,value){
                selectOptionPut($(pageStyleObj).find("#typeid_a"),value["uid"],value["name"]);
            });
            if(contentObj!=undefined){
                $(pageStyleObj).find("#typeid_a").val(contentObj);
            }
        }
    });
}
function putContent(pageStyleObj,contentObj){
    //console.log(contentObj);
    $.each(contentObj,function(key,value){
        if(value!="NULL"){
            $(pageStyleObj).find("#"+key).val(value);
        }
        
    });
}



