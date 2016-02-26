function getMenus(loginInfo){
	var menus = {
menu: '<li style="white-space: nowrap;"><a class="icon fa-home" href="#"><span class="home">首頁</span></a></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o sys_mana" href="#">系統管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class=""><li style="white-space: nowrap;"><a href="#" class="user_mana " style="display: block;">使用者管理</a></li><li style="white-space: nowrap;"><a href="#" class="project_data " style="display: block;">工程基本資料</a></li><li style="white-space: nowrap;"><a href="#" class="budget_import " style="display: block;">預算書與名冊匯入作業</a></li></ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o administrative_manage" href="#">行政管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class="">  <li style="white-space: nowrap;"><a href="#" class="purchase_mana icon fa-bar-chart-o" style="display: block;">採購管理</a></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;">  <a class="icon fa-bar-chart-o contract_mana" href="#" style="display: block;">合約管理</a>  <ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron">  <li style="white-space: nowrap;"><a href="charter/upload_files" class="contractual_document " style="display: block;">契約文件</a></li><li style="white-space: nowrap;"><a href="#" class="pointer " style="display: block;">關鍵重點</a></li><li style="white-space: nowrap;"><a href="#" class="dispute_log " style="display: block;">爭議紀錄</a></li>  </ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;">  <a class="icon fa-bar-chart-o document_mana" href="#" style="display: block;">文件管理</a>  <ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron">  <li style="white-space: nowrap;"><a href="#" class="requisition " style="display: block;">申請單</a></li><li style="white-space: nowrap;"><a href="#" class="send_receive_log " style="display: block;"> 收發文紀錄</a></li><li style="white-space: nowrap;"><a href="#" class="reminders " style="display: block;">跟催管控</a></li><li style="white-space: nowrap;"><a href="#" class="meeting_log " style="display: block;">會議記錄專區</a></li></ul></li><li style="white-space: nowrap;"><a href="receipt" class="mortem_valuation_estimate icon fa-bar-chart-o" style="display: block;">估驗計價管理</a></li></ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors cost_manage" href="#">成本管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class=""><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors resources_mana" href="#" style="display: block;">資源管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron"><li style="white-space: nowrap;"><a href="sar/sarform" class="staff_attendance menus_content_colors" style="display: block;">人員管理</a></li><li style="white-space: nowrap;"><a href="material" class="material_entry_exit_log menus_content_colors" style="display: block;">材料進場管理</a></li><li style="white-space: nowrap;"><a href="#" class="machines_io " style="display: block;">機具進出管理</a></li><li style="white-space: nowrap;"><a href="material/exit" class="material_exit_log menus_content_colors" style="display: block;">材料出場管理</a></li></ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors progress_mana" href="#" style="display: block;">進度管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron"><li style="white-space: nowrap;"><a href="dailyconstruction" class="daily_construction menus_content_colors" style="display: block;">每日施工紀錄</a></li><li style="white-space: nowrap;"><a href="#" class="personal_item " style="display: block;">個人待辦事項</a></li><li style="white-space: nowrap;"><a href="#" class="progress_plan " style="display: block;">進度執行計畫</a></li></ul></li></ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors quality_assurance_manage" href="#">品保管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class=""><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors qcview" href="#" style="display: block;">品質管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron"><li style="white-space: nowrap;"><a href="#" class="qc_self " style="display: block;">材料查驗記錄</a></li><li style="white-space: nowrap;"><a href="qc/photolist" class="supervision_inspection menus_content_colors" style="display: block;">施工查驗記錄</a></li><li style="white-space: nowrap;"><a href="#" class="submittal_control " style="display: block;">送審管制</a></li></ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors labor_safety_mana" href="#" style="display: block;">勞安管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron"><li style="white-space: nowrap;"><a href="#" class="toolbox_meeting " style="display: block;">工具箱會議記錄</a></li><li style="white-space: nowrap;"><a href="logbook?ptype=laborsafety" class="routine_file menus_content_colors" style="display: block;">例行文件區</a></li><li style="white-space: nowrap;"><a href="#" class="lao_inspection " style="display: block;">勞安巡檢紀錄</a></li></ul></li></ul></li><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors communication_mana" href="#">溝通管理</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class=""><li class="opener" style="-webkit-user-select: none; cursor: pointer; white-space: nowrap;"><a class="icon fa-bar-chart-o menus_top_colors construction_status_report" href="#" style="display: block;">施工狀況類報表</a><ul style="-webkit-user-select: none; display: none; position: absolute;" class="dropotron"><li style="white-space: nowrap;"><a href="constructionschedule" class="total_construction_schedule menus_content_colors" style="display: block;">整體施工進度表</a></li><li style="white-space: nowrap;"><a href="logbook" class="construction_daily_report menus_content_colors" style="display: block;">施工日報表</a></li></ul></li><li style="white-space: nowrap;"><a href="#" class="budget_execution_report " style="display: block;">預算執行類報表</a></li><li style="white-space: nowrap;"><a href="sar/sarreport" class="personnel_attendance_reports menus_content_colors" style="display: block;">人員出工（勤）類報表</a></li></ul></li><li style="white-space: nowrap;"><a class="icon fa-retweet" href="#" onclick="logoutEven();"><span class="logout">登出</span></a></li>',
  status: true
};
	//console.log(menus);
	$("#menus").html(menus.menu)
	.find("a").click(function(){
      var thisHref = $(this).attr("href");
      if(thisHref != "#"){
        //location.href = location.origin + "/" + $(this).attr("href");
        loadPage($(this).attr("href"),"pagescontent");
      }
      return false;
  	});
  	//getLan();
	loadJS("include/strongly/assets/js/content-main.js","keep");
}