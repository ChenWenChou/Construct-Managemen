//取得並顯示材料列表
$.ajax({
        url: "http://211.21.170.18:8080/waDataBase/api/Materiel/getMaterielList",
        type:"GET",
        data:{start:1,count:5},  
        dataType:"JSON",

        success: function(rs){
                console.log(rs);
               showList(rs["data"]);
        },
        error:function(xhr, ajaxOptions, thrownError){ 
        }
});
    

function showList(listData){
    var materielList;//取一個變數方便存取他的值
    $.get("list.html",function(pageContent){
        materielList = pageContent;

    }).done(function(){//執行完才做的動作
        $.each(listData, function(key , value){
            var pageStyles = $.parseHTML(materielList);//轉換成HTML物件
        $(pageStyles).find(".editClick").prop("id",value.uid).click(function(){
           var id = $(this).prop("id");
           console.log(id);
        });
            $(pageStyles).find(".material-name").html(value.name);
            $(pageStyles).find(".material-unit").html(value.unitName);
            $(pageStyles).appendTo("#material-arae");
            
                        
        });
    });
    
}