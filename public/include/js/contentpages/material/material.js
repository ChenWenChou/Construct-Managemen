

$(function() {
   getList(1,true);
});

//取得並顯示材料列表
var listRow=1;
var nowPage = 1;
function tranPage(count){

  var pages = Math.ceil(count/listRow);
  for(var i=1; i <= pages;i++){

    var liStr = "<li><a href='#' onclick='getList("+i+")'>"+i+"</a></li>";
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

    $.ajax({
            url: "http://211.21.170.18:8080/waDataBase/api/Materiel/getMaterielList",
            type:"GET",
            data:{start:start,count:listRow},  
            dataType:"JSON",

            success: function(rs){

                   $("#material-arae").empty();
                   showList(rs["data"]);
                   if (pageCreate) {
                     tranPage(rs["count"]);
                   }
            },
            error:function(xhr, ajaxOptions, thrownError){ 
            }
    });
}

function showList(listData){
    var materielList;//取一個變數方便存取他的值
    $.get("list.html",function(pageContent){
        materielList = pageContent;

    }).done(function(){//執行完才做的動作
        
        $.each(listData, function(key , value){

            var pageStyles = $.parseHTML(materielList);//轉換成HTML物件
            $(pageStyles).find(".editClick").prop("id",value.uid).click(function(){
               var id = $(this).prop("id");
            });
            $(pageStyles).find(".deleteItem").click(function(){
               delList(value.uid);
               $(this).parent().parent().remove();
               getList();
            });

            $(pageStyles).find(".material-name").html(value.name);
            $(pageStyles).find(".material-unit").html(value.unitName);
            var suListStr ='';
            
            if (value.suList != null) {
                $.each(value.suList, function(suListKey , suListValue){
                    suListStr += suListValue["name"] + "、";
                });
                suListStr=suListStr.substring(0, suListStr.length-1);
            }
            else{
                suListStr ='未填入廠商';
            }
            //console.log(suListStr);
            $(pageStyles).find(".material-frim").html(suListStr);
            $(pageStyles).appendTo("#material-arae");
            
                        
        });
        $("#material-arae").find(".material-content").last().removeClass("items-border");
    });
    
}
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