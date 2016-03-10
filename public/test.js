   <script type="text/javascript" src="include/js/jquery/jquery.min.js" ></script>
        <script>
            $.ajax({
                url: "http://211.21.170.18:8080/api/Materiel/getMaterielList",
                data:{iListID:1},
                type:"GET",
                dataType:"JSON",

                success: function(msg){

                    $.each(msg["hdHeader"] , function(key, value){
                        var ab;
                        ab="<div>key"+key+"value"+value+"</div>";
                        $("#text").append(ab);
                    });
                },
                 error:function(xhr, ajaxOptions, thrownError){ 
                    console.log(xhr, ajaxOptions, thrownError);
                 }
            });
        </script>