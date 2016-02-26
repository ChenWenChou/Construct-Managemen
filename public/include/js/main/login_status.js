function checkUserLogin(){
	var rs = {status: true, uuid: "2", userAc: "race", userName: "Race"};
	$(".user-name").html(rs.userName);
    //取得選單
    getMenus(rs);
}
