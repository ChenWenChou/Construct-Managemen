$.ajax({
        url: "http://211.21.170.18:8080/waDataBase/api/Materiel/getMaterielList",
        type:"GET",
        data:{start:1,count:5},  
        dataType:"JSON",

        success: function(rs){
                console.log(rs);
               showList(rs["data"]);
            // $.each(msg, function(key, value){
            //     var ab;
            //     ab="<div>key"+key+"value"+value+"</div>";
            //     $("#text").append(ab);
            // });
        },
         error:function(xhr, ajaxOptions, thrownError){ 
            // console.log(xhr, ajaxOptions, thrownError);
         }
});
    

function showList(listData){
    var materielList;
    $.get("list.html",function(pageContent){
        materielList = pageContent;

    }).done(function(){
         $.each(listData, function(key , value){
            var pageStyles = $.parseHTML(materielList);
            $(pageStyles).find(".material-name").html(value.name);
            $(pageStyles).appendTo("#material-arae");
            
                        
        });
    });
    
}