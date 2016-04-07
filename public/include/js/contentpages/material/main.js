

$(function() {
   getList(1,true);
});

//取得並顯示材料列表
var listRow=5;
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
        title:"新增材料",
        start: function(){
            var option = {styleKind:"material",style:"in-mo"};
                // 取得畫面樣式
            getStyle(option,function(pageStyle){
                // console.log(pageStyle);
                 var pageStyleObj = $.parseHTML(pageStyle);
                 $(pageStyleObj).appendTo($("#addDialog").find(".modal-body"));
                 //console.log($(pageStyleObj));
                 selectContent(pageStyleObj);
                

            });
          
        },
        button:[
          {
            text:"新增",
            className: "btn-success",
            click: function(){
                var addUnitObj =getUserInput("addDialog");
            

              $.get(MaterielApi+"setMaterielInsert",addUnitObj,function(){
                $("#materialArea").empty();
                getList();

              })
                  $("#addDialog").bsDialog("close");
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
    var sendObj = {
        start:nowRow,
        count:listRow

    }
    
     $.getJSON(MaterielApi+"getMaterielList",sendObj,function(rs){
       // console.log(rs);
        var option = {styleKind:"list",style:"3grid-modify"};
                // 取得畫面樣式
        getStyle(option,function(pageStyle){
            //用迴圈產生幾列
            $.each(rs.data, function(Key , Val){
               //console.log(Val);
                //轉成HTML物件
                var unitStyleObj = $.parseHTML(pageStyle);
                //找到第一欄
                $(unitStyleObj).find(".list-items").eq(0).text(Val["name"]);
                $(unitStyleObj).find(".list-items").eq(1).text(Val["unitName"]);
                var suListStr = "";
                if(Val["suList"]!=null){
                   
                    $.each(Val["suList"], function(suListKey , suListVal){
                       suListStr += suListVal["name"]+"、";
                    });
                    suListStr=suListStr.substring(0, suListStr.length-1);
                     
                }
                else{
                    suListStr ='未填入廠商';
                }
                $(unitStyleObj).find(".list-items").eq(2).text(suListStr);
                
                //放到ID裡
                $(unitStyleObj).appendTo("#materialArea");
                //編輯按鈕
                $(unitStyleObj).find(".fa-pencil-square-o").click(function(){
                    //傳第一欄 修改;
                    modifyDialog(Val, $(unitStyleObj).find(".list-items").eq(0));
                });
                //刪除
                $(unitStyleObj).find(".fa-trash-o").click(function(){
                   // console.log("T");
                    delList(Val.uid);
                    $(this).parents(".list-items").parent().remove();
                    var areaData=$("#materialArea").find("div").length;
                    //無資料顯示暫無相關資料
                    if(!areaData){
                        var option = {styleKind:"system",style:"data-empty"};
                             // 取得畫面樣式
                        getStyle(option,function(emptyStyle){
                            $("#materialArea").html(emptyStyle);

                        });
                         
                    }
                    else{
                        $("#materialArea").find(".list-items-bottom").last().removeClass("list-items-bottom");
                    }
                });
            });
            // 相關設定
            $("#materialArea").find(".list-items-bottom").last().removeClass("list-items-bottom");
        });
    });
}

//dialog方法
function modifyDialog(contentObj, clickObj){
    console.log(contentObj);
   // return;
   $("body").find("#addDialog").remove();
    $("<div>").prop("id","addDialog").appendTo("body");
    $("#addDialog").bsDialog({
        title:"修改材料",
        start: function(){
            var option = {styleKind:"material",style:"in-mo"};
                // 取得畫面樣式
            getStyle(option,function(pageStyle){
                // console.log(pageStyle);
                 var pageStyleObj = $.parseHTML(pageStyle);
                 $(pageStyleObj).appendTo($("#addDialog").find(".modal-body"));
                 
                 selectContent(pageStyleObj,contentObj);
                putContent(pageStyleObj,contentObj);

            });
          
        },
        button:[
          {
            text:"修改",
            className: "btn-success",
            click: function(){
                var editUnitObj =getUserInput("addDialog");
                    editUnitObj.uid=contentObj.uid;
                    console.log(editUnitObj);
              $.getJSON(MaterielApi+"setMaterielModify",editUnitObj,function(){
                 $("#materialArea").empty();
                getList();
              })
                  $("#addDialog").bsDialog("close");
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



function editList(uid){

     
    $.ajax({
            url: MaterielApi+"getMaterielList",
            type:"GET",
            data:{start:nowRow,count:listRow},  
            dataType:"JSON",

            success: function(rs){
                // console.log(rs,uid);
               var listUid = processEditData(rs.data);
              // console.log(listUid[uid]);
               onClickNewMaterial(uid,listUid[uid]);
            },
            error:function(xhr, ajaxOptions, thrownError){ 
            }
    });

}

function processEditData(data){
    var tmpObj={};
    $.each(data,function(dataKey,dataValue){
        tmpObj[dataValue.uid]=dataValue;
    });
    return tmpObj;
}

function putEditData(data,pageObj){
    $.each(data,function(dataKey,dataValue){
        if(dataKey!="suList" && dataKey!="unitName"){
            if(dataValue!="NULL"){
                $(pageObj).find("#"+dataKey).val(dataValue);

            }
            
        }
        
    });
}

// function saveEditData(){
//     var data = getUserInput("warnPage");
//     //console.log(data);
//      $.ajax({
//             url: MaterielApi+"setMaterielModify",
//             type:"GET",
//             data:data,  
//             dataType:"JSON",

//             success: function(rs){
//                 //console.log(rs);
//                 closeWarnPage();
//                 getList(1,true);
//             },
//             error:function(xhr, ajaxOptions, thrownError){ 
//             }
//     });
// }
function delList(uid){
     
     $.get(MaterielApi+"setMaterielDelete",{uid:uid},function(rs){
       // console.log(rs);
    });
}

function selectContent(pageStyleObj,contentObj){
    $.getJSON(UnitApi+"getUnitList" ,{typeID_a:0} ,function(rs){
        //console.log(rs);
        if(rs.status){
            $.each(rs.data,function(key,value){
                selectOptionPut($(pageStyleObj).find("#unitID"),value["uid"],value["unit"]);
            });
            if(contentObj!=undefined){
                $(pageStyleObj).find("#unitID").val(contentObj.unitID);
            }
        }

        
    });
    $.getJSON(EngApi+"GetEngSingleList" ,{type:"b"},function(rs){
        //console.log(rs);
        if(rs.status){
            $.each(rs.data,function(key,value){
                selectOptionPut($(pageStyleObj).find("#engID_b"),value["uid"],value["name"]);
            });
            if(contentObj!=undefined){
                $(pageStyleObj).find("#engID_b").val(contentObj.engID_b);
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