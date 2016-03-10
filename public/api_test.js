$.getJSON(configObject.WebAPI + "/waDataBase/api/Eng/getEngContent",{id:nodeID},function(rs){
       // console.log(rs);
      nodesContentObj = rs;
      nodeOrderContents(nodeID, node, nodesContentObj.addStatus);
    }).done(function(){
      // console.log(nodesContentObj);
      $.get("pages/style/engineering/engineering_data_option_style.html",function(pageContent){
        var pages = $.parseHTML(pageContent);
        //取得樹狀結構的資料
        var nodeContent = $('#treeview').treeview('getSelected', nodeID);
        nodeContent = nodeContent[0];
        // console.log(nodeContent);
        var nodesContent = nodesContentObj;

        $("#nodeData-content").empty();

        $(pages).find("#nodeID").val(nodeContent.id);
        $(pages).find("#fid").val(nodesContent.fid);
        //放入名稱
        $(pages).find("#node-name").html(nodeContent.text);

        //工種相關設定
        if(typeof nodesContent.code != "undefined"){
          $(pages).find(".code-content").html(nodesContent.code);
          $(pages).find("#code").val(nodesContent.code);
        }else{
          $(pages).find(".code").remove();
        }

        //工種相關設定
        if(typeof nodesContent.worksid != "undefined"){
          worksList(pages,nodesContent.worksid);
        }else{
          $(pages).find(".worksid").remove();
        }

        //計數單位相關設定
        if(typeof nodesContent.typeid_u != "undefined"){
          typeUnitList(pages,nodesContent.typeid_u,nodeID);
        }else{
          $(pages).find(".typeid_u").remove();
        }

        $(pages).find("#name").val(nodeContent.text);
        $(pages).find(".edit-item").hide();
        $(pages).appendTo("#nodeData-content");
      });
    });