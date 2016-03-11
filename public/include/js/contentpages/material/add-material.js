  //點擊事件
  $(function() {
	$("#plusItem").click(function(){
		onClickNewMaterial();
	});
  });
  //跳出頁面
function onClickNewMaterial(){
	$( "#dialog" ).remove();//預防有此ID 先清除
	$( '<div>' ).prop("id","dialog").appendTo("body");//新增一個ID到BODY
	$.get("new-material.html", function(page){//取得位置並顯示到ID裡
		$(page).appendTo("#dialog" );
		$( "#dialog" ).dialog({//跳出視窗的設定
			width: 600,
			draggable: true,
			modal: true,
			resizable: false,//鎖定視窗

		});
		$(".ui-dialog-titlebar").hide();//隱藏原有的TITLEBAR
	});
		
}
