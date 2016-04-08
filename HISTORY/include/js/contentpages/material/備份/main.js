

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
    
     $.getJSON("http://211.21.170.18:8080/waDataBase/api/Materiel/getMaterielList",sendObj,function(rs){
       // console.log(rs);
        var option = {styleKind:"list",style:"3grid-modify"};
                // 取得畫面樣式
        getStyle(option,function(pageStyle){
            //用迴圈產生幾列
            $.each(rs.data, function(Key , Val){
                console.log(Val);
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
                    // console.log($(this));
                    //delList(Val.uid);
                    $(this).parents(".list-items").parent().remove();
                    var areaData=$("#materialArea").find("div").length;
                    if(!areaData){
                        var option = {styleKind:"system",style:"data-empty"};
                             // 取得畫面樣式
                        getStyle(option,function(emptyStyle){
                            $("#materialArea").html(emptyStyle);

                        });
                        
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
    //console.log(contentObj);
   // return;
    $("body").find("#modifyDialog").remove();
    $("<div>").prop("id","modifyDialog").appendTo("body");
    $("#modifyDialog").bsDialog({
        start: function(){
            var option = {styleKind:"input",style:"text-help-only"};
                // 取得畫面樣式
            getStyle(option,function(pageStyle){
                // console.log(pageStyle);
                //自訂要的欄位
                var inputObject={
                    name:{
                        Name:"材料名稱",
                        value: contentObj["name"]
                    },
                    spec:{
                        Name:"規格",
                        value: contentObj["spec"]
                    },
                    unitName:{
                        Name:"單位",
                        value: contentObj["unitName"]
                    },
                    engID_b:{
                        Name:"工程項目",
                        value: contentObj["engID_b"]
                    },
                    remark:{
                        Name:"備註",
                        value: contentObj["remark"]
                    }
                   
                };
                $.each(inputObject ,function(key , val){
                    // console.log(key,val);
                    var pageStyleObj = $.parseHTML(pageStyle);
                    $(pageStyleObj).find(".control-label").text(val.Name);
                    $(pageStyleObj).find("input").addClass("userInput").prop("id",key).val(val.value);
                    var contentsTag=$("<div>").addClass("contents");

                    $(pageStyleObj).appendTo(contentsTag);
                    $(contentsTag).appendTo($("#modifyDialog").find(".modal-body"));

                });
                // $("#modifyDialog").find(".modal-body").html(pageStyle);

            });
          
        },
        button:[
          {
            text:"儲存",
            className: "btn-success",
            click: function(){
                var sendObj = getUserInput("modifyDialog");
                sendObj.uid = contentObj.uid;
                // console.log(sendObj);
                // return;
              // console.log(sendObj);
              clickObj.text(sendObj.uid);
              $.get("http://211.21.170.18:8080/waDataBase/api/Materiel/setMaterielModify",sendObj,function(){
                

              });
              $("#modifyDialog").bsDialog("close");
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

// function showList(listData){
//     var materielList;//取一個變數方便存取他的值
//     $.get("pages/style/material/list.html",function(pageContent){
//         materielList = pageContent;

//     }).done(function(){//執行完才做的動作
        
//         $.each(listData, function(key , value){

//             var pageStyles = $.parseHTML(materielList);//轉換成HTML物件
//             $(pageStyles).find(".editClick").prop("id",value.uid).click(function(){
//                var id = $(this).prop("id");
//                editList(id);
//             });
//             $(pageStyles).find(".deleteItem").click(function(){
//                delList(value.uid);
//                $(this).parent().parent().remove();
//                getList();
//             });

//             $(pageStyles).find(".material-name").html(value.name);
//             $(pageStyles).find(".material-unit").html(value.unitName);
//             var suListStr ='';
            
//             if (value.suList != null) {
//                 $.each(value.suList, function(suListKey , suListValue){
//                     suListStr += suListValue["name"] + "、";
//                 });
//                 suListStr=suListStr.substring(0, suListStr.length-1);
//             }
//             else{
//                 suListStr ='未填入廠商';
//             }
//             //console.log(suListStr);
//             $(pageStyles).find(".material-frim").html(suListStr);
//             $(pageStyles).appendTo("#material-arae");
            
                        
//         });
//         $("#material-arae").find(".material-content").last().removeClass("items-border");
//     });
    
// }
function delList(uid){
    $.ajax({
            url: "http://211.21.170.18:8080/waDataBase/api/Materiel/setMaterielDelete",
            type:"GET",
            data:{uid:uid},  
            dataType:"JSON",

            success: function(rs){
                   
              getList(1,true);  
            },
            error:function(xhr, ajaxOptions, thrownError){ 
            }
    });
}

function editList(uid){

     
    $.ajax({
            url: "http://211.21.170.18:8080/waDataBase/api/Materiel/getMaterielList",
            type:"GET",
            data:{start:nowRow,count:listRow},  
            dataType:"JSON",

            success: function(rs){
                // console.log(rs,uid);
               var listUid = processEditData(rs.data);
               console.log(listUid[uid]);
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

function saveEditData(){
    var data = getUserInput("warnPage");
    console.log(data);
     $.ajax({
            url: "http://211.21.170.18:8080/waDataBase/api/Materiel/setMaterielModify",
            type:"GET",
            data:data,  
            dataType:"JSON",

            success: function(rs){
                console.log(rs);
                closeWarnPage();
                getList(1,true);
            },
            error:function(xhr, ajaxOptions, thrownError){ 
            }
    });
}