layui.config({
    base: '/client/layuiadmin/modules/'
}).extend({
    zTree: 'zTree'
    ,selectTree: 'selectTree'
    ,disaster: 'disaster'
    ,ajaxFileUpload: 'ajaxFileUpload'
    ,time:'time'
});

layui.use(['table','form','laydate','element','laytpl','layer','zTree','selectTree','disaster', 'ajaxFileUpload','time'], function(){
    let table = layui.table			// 引用layui表格
        ,form = layui.form			// 引用layui表单
        ,laytpl = layui.laytpl		// 引用layui模板引擎
        ,layer = layui.layer		// 引用layui弹出层
        ,$ = layui.$   			// 引用layui的jquery
        ,element = layui.element
        ,laydate = layui.laydate
        ,zTree = layui.zTree
        ,selectTree = layui.selectTree
        ,disaster = layui.disaster
        ,ajaxFileUpload = layui.ajaxFileUpload
        ,time=layui.time
        ,employee = layui.sessionData("ewip").employee; // 当前登录用户信息


    /**
     * 自定义验证规则
     */
    form.verify({
        disasterId: function(value){
            if(value.length == 0) {
                $("#addDisasterId .addDisasterIdShow, #updateDisasterId .updateDisasterIdShow").css("border-color","red");
                return '请选择灾种';
            }
        }
    });


    var active = {
        /**
         * 初始化预警内容
         */
        "warnContent":null
        /**
         * 渠道对应受众树加载
         * @param option
         */
        ,"channelToUserGroup": function (option) {
            zTree.async({
                id: '#group_'+option.channelId,
                setting: {
                    async:{
                        enable:true,
                        url: '/client/tree/user/group/count',
                        autoParam:["id"],
                        otherParam: { "areaId":option.areaId, "organizationId": option.organizationId, "channelId":option.channelId},
                        dataType:"json",
                        dataFilter:function (treeId, parentNode, responseData) {
                            if(responseData!=null){
                                for(var i = 0; i<responseData.length; i++){
                                    responseData[i].checked = true;
                                }
                            }
                            return responseData;
                        }
                    },
                    check: {
                        enable: true,
                        chkboxType: {"Y":"s", "N": "s"},
                        chkStyle:"checkbox"
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback:{
                        onClick:null,
                        onCheck:null
                    }
                }
            });
        }
        /**
         * 基础信息配置
         * @param param
         */
        ,"setBasis": function (param) {
            if(param.step==1){
                layer.msg("该预警没有匹配到策略", {time: 2000});
                return false;
            }
            if(param.step==1){
                layer.msg("该预警没有匹配到预警内容", {time: 2000});
                return false;
            }
            // 预警标题
            $(".basis input[name='title']").val(param.organizationName + "发布" + param.disasterName + disaster.color(param.disasterColor) + "["+disaster.level(param.disasterLevel)+"]预警");

            // 政府应对措施
            $(".basis textarea[name='measure']").val(param.measure);
            // 防御指南
            $(".basis textarea[name='instruction']").val(param.instruction);
            // 预警图标赋值
            $(".warn-icon > img").attr("src",param.icon);
            form.render("select");
        }

        /**
         * 获取策略配置
         * @param param
         */
        ,"getStrategyMsg": function (param, callback) {
            $.ajax({
                async:false
                ,type: "GET"
                ,data: param
                ,url: "/client/strategy/config"
                ,dataType: 'json'
                ,success: function(json){
                    if(json.code == 200 && json.data != null){
                        param.flow = json.data.flow;            // 获取配置的流程
                        param.channelId = json.data.channelId;  // 获取配置的渠道
                        callback(param);
                    }else {
                        param.step = 1;
                    }
                }
            });
        }
        /**
         * 获取预警配置
         * @param param
         * @param callback
         */
        ,"getWarnMsg": function (param, callback) {
            $.ajax({
                async:false
                ,type: "GET"
                ,data: param
                ,url: "/client/warn/config"
                ,dataType: 'json'
                ,success: function(json){
                    if(json.code == 200 && json.data != null){
                        param.measure = json.data.measure;          // 政府应对措施
                        param.instruction = json.data.instruction;  // 防御指南
                        param.content = json.data.content;
                        callback(param);
                    }else{
                        param.step = 1;
                    }
                }
            });
        }
        /**
         * 获取策略和配置信息后，对其灾种、流程渠道等信息进行匹配
         */
        ,"setStrategyAndChannel":function (result) {
            let channelIds = result.channelId
                ,flow = result.flow;
            // 清空流程样式
            $(".process-list .process input[type='checkbox']").prop("checked",false);
            // 清空渠道样式
            $(".channel-list .imgbox").removeClass("active");
            // 流程赋值
            flow.split(",").forEach(function (item) {
                $(".process-list .process input[type='checkbox'][value='"+item+"']").prop("checked",true);
            });
            // 更新layui checkbox样式
            form.render("checkbox");
            // 渠道赋值
            channelIds.split(",").forEach(function (item) {
                $(".channel-list .imgbox[data-id='"+item+"']").addClass("active");
            });
        }
        /**
         * 预警内容拼接
         * @param param
         */
        ,"setWarnContent": function (result) {
            // 拼接预警内容前缀
            let areas = new Set()
                ,editTime = $(".basis #editTime").val()
                ,warnType = $(".basis select[name='warnType']").val()
                ,disasterName = $(".basis input[name='disasterName']").val() || result.disasterName
                ,disasterColor = $(".basis select[name='disasterColor']").val() || result.disasterColor
                ,title = employee.organizationName + time.formatStringTime(editTime,"yyyy年MM月dd日HH时mm分") + "发布" + disasterName + disaster.color(disasterColor) + "预警信号:";
            if(warnType == "Test"){
                title = "测试："+title;
            }
            // 循环渠道
            result.channelId.forEach(function (channelId) {
                let channel = $(".channel-list .imgbox[data-id='"+channelId+"']")
                    ,channelName = $(channel).data("title")
                    ,html = "";

                html += "<div class='layui-row layui-col-space5'>";
                html += "	<div class='layui-col-xs8 layui-col-md8'>";
                html += "		<div class='layui-card warn-card-content'>";
                html += "			<div class='layui-card-header'><span>&nbsp;&nbsp;<i class='layui-icon warn-card-hader-icon'>&#xe618;</i>预警编辑</span></div>";
                html += "			<div  class='layui-card-body warn-card-content-list content_"+channelId+"'>";
                // 循环地区
                result.area.forEach(function (area) {
                    areas.add(area.areaId);
                    // html += "				<div class='layui-row layui-col-space5 warn-item_"+channelId+"_"+area.areaId+"'>";
                    // html += "					<div class='layui-col-xs1 layui-col-md1 warn-content-title'>";
                    // html += "						<div>"+area.areaName+"</div>";
                    // html += "					</div>";
                    // html += "					<div class='layui-col-xs11 layui-col-md11 warn-content-body'>";
                    // html += "                       <textarea type='text' name='content_"+channelId+"_"+area.areaId+"' placeholder='请输入预警内容' autocomplete='off' class='layui-textarea'>" + title + active.warnContent+"</textarea>";
                    // html += "					</div>";
                    // html += "				</div>";
                });

                html += "				<div class='layui-row layui-col-space5 warn-item_"+channelId+"'>";
                html += "					<div class='layui-col-xs1 layui-col-md1 warn-content-title'>";
                html += "						<div>"+employee.areaName+"</div>";
                html += "					</div>";
                html += "					<div class='layui-col-xs11 layui-col-md11 warn-content-body'>";
                html += "                       <textarea type='text' name='content_"+channelId+"' placeholder='请输入预警内容' autocomplete='off' class='layui-textarea'>" + title + active.warnContent+"</textarea>";
                html += "					</div>";
                html += "				</div>";


                html += "			</div>";
                html += "		</div>";
                html += "	</div>";
                html += "	<div class='layui-col-xs4 layui-col-md4'>";
                html += "		<div class='layui-card warn-card-content'>";
                html += "			<div class='layui-card-header'><span>&nbsp;&nbsp;<i class='layui-icon layui-icon-tree warn-card-hader-icon'></i>受众群组</span></div>";
                html += "			<div  class='layui-card-body warn-card-content-list'>";
                html += "				<div class='ztree' id='group_"+channelId+"'></div>";
                html += "			</div>";
                html += "		</div>";
                html += "	</div>";
                html += "</div>"
                    // 追加预警内容tab选项卡
                    ,element.tabAdd('warn-tab', {
                    title: channelName
                    ,content: html //支持传入html
                    ,id: channelId
                });
                // 默认展开第一个tab页
                element.tabChange('warn-tab', result.channelId[0]);
                // 动态添加渠道地区对应的受众（根据地区和渠道查询）
                let id = "";
                for (let item of areas) {
                    id += "," + item;
                }
                id=id.substring(1);
                active.channelToUserGroup({
                    areaId: id,
                    channelId: channelId
                });
            });
            element.render();
        }


        /**
         * 勾选地区追加预警内容
         * 如果result.checked == true,则添加，否则删除
         * @param result
         */
        ,"setAreaWarnContentNew":function (result) {
            result.channelId.forEach(function (channelId) {
                // 获取每个渠道对应的受众树
                let userGroupZtree = zTree.getZTree("group_"+channelId);
                var node=userGroupZtree.getNodes();
                for(var j=node.length-1; j>=0; j--){
                    userGroupZtree.removeNode(node[j]);
                }
                let areas = new Set();
                // 循环地区 预警内容追加
                result.area.forEach(function (area) {
                    areas.add(area.areaId);
                });
                $.ajax({
                    async:true
                    ,type: "POST"
                    ,data: {
                        "areaId":function () {
                            let id = "";
                            for (let item of areas) {
                                id += "," + item;
                            }
                            return id.substring(1);
                        },
                        // "organizationId": employee.organizationId,
                        "channelId":channelId
                    }
                    ,url: '/client/tree/user/group/count'
                    ,dataType: 'json'
                    ,success: function(json){
                        // 对其每个渠道做受众追加
                        if(json != null){
                            for(var i = 0; i<json.length; i++){
                                json[i].checked = true;
                            }
                            let userGroupZtree = zTree.getZTree("group_"+channelId);
                            userGroupZtree.addNodes(null, json);
                        }
                    }
                });
            });
        }
        /**
         * 勾选地区追加预警内容
         * 如果result.checked == true,则添加，否则删除
         * @param result
         */
        ,"setAreaWarnContent":function (result) {
            if(result.checked == false){
                let bool = true;
                // 如果当前地区节点取消勾选，则删除指定该地区对应所有渠道的预警内容删除
                // 如果最后一个地区取消掉，则将bool变量置为false
                // let a=[];
                result.channelId.forEach(function (channelId) {
                    // 获取每个渠道对应的受众树
                    let userGroupZtree = zTree.getZTree("group_"+channelId);
                    for(var i = 0; i<result.area.length; i++){
                        $(".warn-item_"+channelId+"_"+result.area[i].areaId).remove();
                        // 获取当前渠道下全部受众节点，如果取消勾选地区，则将当前地区、渠道对应的受众删除
                        // userGroupZtree.getNodes().forEach(function (item) {
                        //     if(item.areaId == result.area[i].areaId && item.channelId == channelId){
                        //         userGroupZtree.removeNode(item);
                        //     }
                        // });
                        var node=userGroupZtree.getNodes();
                        for(var j=node.length -1; j>=0; j--){
                            if(node[j].areaId == result.area[i].areaId && node[j].channelId == channelId){
                                userGroupZtree.removeNode(node[j]);
                            }
                        }
                    }
                    if($(".content_"+channelId+" > div").length == 0) bool = false;
                });
                // 如果bool为false，说明没有选中地区，则对应的所有渠道tab页删除，添加tab页提示信息
                if(bool == false){
                    result.channelId.forEach(function (channelId) {
                        element.tabDelete("warn-tab",channelId);
                    });
                    // 删除tab页提示信息
                    element.tabDelete("warn-tab","choose-tab");
                    // 重新追加tab页提示信息
                    active.defaultWarnMsg({id: "choose-tab", title: "温馨提示", msg: "请选择地区"});
                    element.render();
                }
            }else{
                // 如果tab页提示信息存在，说明tab页中没有渠道标题，则添加渠道tab页，同时根据渠道地区拼接预警内容和受众群组
                // 否则说明之前选中了渠道和地区，则只追加改选中地区对应的预警内容和受众群组
                if($(".warn-card-content-list .warn-content-skip").length > 0){
                    // 删除tab页提示信息
                    element.tabDelete("warn-tab","choose-tab");
                    // 拼接预警内容
                    active.setWarnContent(result);
                }else{
                    // 拼接预警内容前缀
                    let editTime = $(".basis #editTime").val()
                        ,warnType = $(".basis select[name='warnType']").val()
                        ,disasterName = $(".basis #disasterName").val()
                        ,disasterColor = $(".basis select[name='disasterColor']").val()
                        ,title = result.area[0].areaName + time.formatStringTime(editTime,"yyyy年MM月dd日HH时mm分") + "发布" + disasterName + disaster.color(disasterColor) + "预警信号:";
                    if(warnType == "Test"){
                        title = "测试："+title;
                    }

                    // 循环渠道
                    result.channelId.forEach(function (channelId) {
                        let html = "" , areas = new Set();
                        // 循环地区 预警内容追加
                        result.area.forEach(function (area) {
                            areas.add(area.areaId);
                            // html += "<div class='layui-row layui-col-space5 warn-item_"+channelId+"_"+area.areaId+"'>";
                            // html += "	<div class='layui-col-xs1 layui-col-md1 warn-content-title'>";
                            // html += "		<div>"+area.areaName+"</div>";
                            // html += "	</div>";
                            // html += "	<div class='layui-col-xs11 layui-col-md11 warn-content-body'>";
                            // html += "       <textarea type='text' name='content_"+channelId+"_"+area.areaId+"' placeholder='请输入预警内容' autocomplete='off' class='layui-textarea'>"+ title + active.warnContent+"</textarea>";
                            // html += "	</div>";
                            // html += "</div>";
                        });
                        // $(".content_"+channelId).append(html);
                        // 追加受众树
                        $.ajax({
                            async:true
                            ,type: "POST"
                            ,data: {
                                "areaId":function () {
                                    let id = "";
                                    for (let item of areas) {
                                        id += "," + item;
                                    }
                                    return id.substring(1);
                                },
                                // "organizationId": employee.organizationId,
                                "channelId":channelId
                            }
                            ,url: '/client/tree/user/group/count'
                            ,dataType: 'json'
                            ,success: function(json){
                                // 对其每个渠道做受众追加
                                if(json != null){
                                    for(var i = 0; i<json.length; i++){
                                        json[i].checked = true;
                                    }
                                    let userGroupZtree = zTree.getZTree("group_"+channelId);
                                    userGroupZtree.addNodes(null, json);
                                }
                            }
                        });
                    });
                }
                element.render();
            }
        }
        /**
         * 预警内容没有时提示，通常是点击取消渠道全选和，地区没有勾选时回填提示信息
         * @param param
         * @returns {string}
         */
        ,"defaultWarnMsg": function (param) {
            let html = "";
            html += "<div class='layui-row layui-col-space5'>";
            html += "	<div class='layui-col-xs9 layui-col-md9'>";
            html += "		<div class='layui-card warn-card-content'>";
            html += "			<div class='layui-card-header'><span>&nbsp;&nbsp;<i class='layui-icon warn-card-hader-icon'>&#xe618;</i>预警编辑</span></div>";
            html += "			<div  class='layui-card-body warn-card-content-list'>";
            html += "				<div class='layui-row layui-col-space5'>";
            html += "					<div class='layui-col-xs12 layui-col-md12 warn-content-skip'>"+param.msg+"</div>";
            html += "				</div>";
            html += "			</div>";
            html += "		</div>";
            html += "	</div>";
            html += "	<div class='layui-col-xs3 layui-col-md3'>";
            html += "		<div class='layui-card warn-card-content'>";
            html += "			<div class='layui-card-header'><span>&nbsp;&nbsp;<i class='layui-icon layui-icon-tree warn-card-hader-icon'></i>受众群组</span></div>";
            html += "			<div  class='layui-card-body warn-card-content-list'><div class='warn-content-skip'>"+param.msg+"</div></div>";
            html += "		</div>";
            html += "	</div>";
            html += "</div>";
            // 追加预警内容tab选项卡
            element.tabAdd('warn-tab', {
                title: param.title
                ,content: html //支持传入html
                ,id: param.id
            });
            // 默认展开第一个tab页
            element.tabChange('warn-tab', 'choose-tab');
            element.render();
        }
        /**
         * 获取预警信息后对政府应急措施、防御指南、预警内容tab页进行处理
         * @param result
         */
        ,"setWarn": function (result) {
            // 初始化预警复制内容，本地缓存
            active.warnContent = result.content;
            // 地区选中
            let node = initAreaTree.getNodeByParam("id",result.areaId, null);
            initAreaTree.checkNode(node,true,true);
            // 先清除tab页所有内容
            $(".warn-tab .warn-tab-title, .warn-tab .warn-tab-content").empty();
            result.channelId =  result.channelId.split(",");

            let area = [];
            var treeObj=$.fn.zTree.getZTreeObj("areaTree"),
                nodes=treeObj.getCheckedNodes(true);
            for(var i=0;i<nodes.length;i++){
                area.push({areaId:nodes[i].id,areaName: nodes[i].name});
            }
            result.area=area;
            // result.area = [{
            //     areaId:result.areaId,
            //     areaName: employee.areaName
            // }];
            active.setWarnContent(result);
        }
        /**
         * 渠道单击事件
         * 判断active选中样式是否存在
         * 如果存在：已经选中，否则没有选中
         * @param obj
         */
        ,"channelOneClick": function (obj) {
            let channelId = $(obj).data("id");
            if($(obj).hasClass("active")){
                // 获取选中渠道
                let param = {
                    /**
                     * 获取选中渠道
                     */
                    "channelId": [channelId]
                    /**
                     * 获取选中地区
                     */
                    ,"area": function () {
                        var area = [];
                        initAreaTree.getCheckedNodes().forEach(function (item) {
                            area.push({
                                areaId:item.id,
                                areaName: item.name
                            });
                        });
                        return area;
                    }()
                };
                // 删除tab id 为choose-tab的table页
                element.tabDelete("warn-tab", "choose-tab");
                // 清空tab页所有内容
                // 追加选中渠道的tab页
                active.setWarnContent(param);
            }else{
                element.tabDelete("warn-tab", channelId);
            }
        }
        /**
         * 地区选择
         */
        ,"areaCheck": function (event, treeId, treeNode) {
            // 判断渠道、预警是否选中，如果没有选中渠道则先选择渠道、如果预警没有选中则选择预警，做拦截
            let channel = $(".channel-list .imgbox.active"),disasterName = $("#disasterName").val();
            // 判断预警是否选中
            if(disasterName == ""){
                initAreaTree.checkNode(treeNode, false, false);
                layer.msg("请先选择预警", {time: 2000});
                return false;
            }
            // 判断渠道是否选中
            if(channel.length == 0){
                initAreaTree.checkNode(treeNode, true, true);
                layer.msg("请先选择渠道", {time: 2000});
                return false;
            }
            // 判断当前节点是否选中
            let checked = treeNode.getCheckStatus().checked;
            if(treeNode.isParent){
                let areaTree = zTree.getZTree(treeId);
                let node = areaTree.getCheckedNodes(true);
                initAreaTree.checkNode(treeNode, true, true);
                let area = [];
                var treeObj=$.fn.zTree.getZTreeObj("areaTree"),
                    nodes=treeObj.getCheckedNodes(true);
                for(var i=0;i<nodes.length;i++){
                    area.push({areaId:nodes[i].id,areaName: nodes[i].name});
                }
                // 拼接参数
                let param = {
                    "treeId":treeId
                    ,"checked":checked
                    ,"channelId": function () {
                        var cId = [];
                        $(channel).each(function () {
                            cId.push($(this).data("id"));
                        }) ;
                        return cId;
                    }()
                    ,"area":area
                };
                active.setAreaWarnContentNew(param);
                layer.msg("请至少选中一个地区", {time: 2000});
                return false;
            }else{
                let areaTree = zTree.getZTree(treeId);
                let node = areaTree.getCheckedNodes(true);
                if(node.length == 0){
                    initAreaTree.checkNode(treeNode, true, true);
                    layer.msg("请至少选中一个地区", {time: 2000});
                    return false;
                }
                // 拼接参数
                let param = {
                    "treeId":treeId
                    ,"checked":checked
                    ,"channelId": function () {
                        var cId = [];
                        $(channel).each(function () {
                            cId.push($(this).data("id"));
                        }) ;
                        return cId;
                    }()
                    ,"area": [{
                        areaId: treeNode.id,
                        areaName: treeNode.name
                    }]
                };
                active.setAreaWarnContent(param);
            }
        }
        /**
         * 树形机构点击按钮
         * @param event
         * @param treeId
         * @param treeNode
         * @returns {boolean}
         */
        ,"disClickNode":function (event, treeId, treeNode) {
            debugger;
            //关闭当前弹出层
            layer.close(layer.index);
            if(treeNode.isConfig==1){
                let name = treeNode.name;
                if(name.indexOf("[") > -1){
                    name = name.substring(0, name.indexOf("["));
                }
                treeNode.name = name;
                //绑定树操作
                selectTree.setValue(treeId,treeNode);
                selectTree.hideTree();
                // 设置参数值
                let param = {
                    areaId: employee.areaId                     // 地区ID
                    ,organizationId: employee.organizationId    // 机构ID
                    ,organizationName: employee.organizationName// 机构名称
                    ,organizationCode: employee.organizationCode// 机构编码
                    ,disasterId: treeNode.id                    // 灾种ID
                    ,disasterName: name                         // 灾种名称
                    ,disasterColor: treeNode.disasterColor      // 灾种颜色
                    ,disasterLevel: treeNode.disasterLevel      // 灾种级别
                    ,disasterCode: treeNode.code                // 灾种编码
                    ,icon: "/client/"+treeNode.img              // 灾种图标
                };
                $(".basis input[name='disasterId']").val(param.disasterId);
                // 预警名称
                $(".basis input[name='disasterName']").val(param.disasterName);
                // 预警颜色
                $(".basis select[name='disasterColor']").val(param.disasterColor);
                // 预警颜色
                $(".basis input[name='disasterCode']").val(param.disasterCode);
                // 预警级别
                $(".basis select[name='disasterLevel']").val(param.disasterLevel);

                // 获取策略信息, 并设置流程、渠道
                active.getStrategyMsg(param, active.setStrategyAndChannel);
                // 获取预警信息，并匹配预警内容
                active.getWarnMsg(param, active.setWarn);
                // 基础信息配置
                active.setBasis(param);
            }
            return false;
        }
    };

    /**
     * 初始化页面基础信息
     */
    let initPageMsg = function(){
        $("#organizationName").val(employee.organizationName);
        $("#organizationCode").val(employee.organizationCode);
    };

    /**
     * 初始化发布时间
     */
    laydate.render({
        elem: '#editTime'
        ,type: 'datetime'
        ,theme: 'molv'
        ,value: new Date()
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });
    /**
     * 初始化预计发生时间
     */
    laydate.render({
        elem: '#forecastTime'
        ,type: 'datetime'
        ,theme: 'molv'
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });
    /**
     * 初始化失效时间
     */
    laydate.render({
        elem: '#invalidTime'
        ,type: 'datetime'
        ,theme: 'molv'
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });

    /**
     * 灾种树选择 lxv
     */
    $("#disasterName").on("click",function(){
        layer.open({
            type: 1
            ,title: "<i class='layui-icon'>&#xe642;</i>选择灾种"
            ,area: ['520px','500px']
            ,shade: 0.3
            ,maxmin:true
            ,offset:'50px'
            ,content:"<div id='addDiv' style='padding:20px 20px 0 20px' ></div>"
            ,success: function(layero,index){
                laytpl(addPop.innerHTML).render([], function(html){
                    // 动态获取弹出层对象并追加html
                    $("#addDiv").empty().append(html);
                    zTree.async({
                        id: "#addDisasterName",
                        setting: {
                            async:{
                                enable:true,
                                url: "/client/tree/disaster/level",
                                autoParam:["id"],
                                dataType:"json",
                            },
                            check: {
                                enable: false
                            },
                            data: {
                                simpleData: {
                                    enable: true
                                }
                            },
                            callback:{
                                onClick:active.disClickNode
                            }
                        }
                    });
                });
            }
        })
    });

    /**
     * 初始化加载灾种级别树
     */
    /*  let disasterLevelZtree = function () {
          selectTree.render({
              'id': 'addDisasterId'
              ,'url': '/client/tree/disaster/level'
              ,'isMultiple': false
              ,clickNode:function (event, treeId, treeNode) {
                  if(treeNode.isConfig==1){
                      let name = treeNode.name;
                      if(name.indexOf("[") > -1){
                          name = name.substring(0, name.indexOf("["));
                      }
                      treeNode.name = name;
                      //绑定树操作
                      selectTree.setValue(treeId,treeNode);
                      selectTree.hideTree();
                      // 设置参数值
                      let param = {
                          areaId: employee.areaId                     // 地区ID
                          ,organizationId: employee.organizationId    // 机构ID
                          ,organizationName: employee.organizationName// 机构名称
                          ,organizationCode: employee.organizationCode// 机构编码
                          ,disasterId: treeNode.id                    // 灾种ID
                          ,disasterName: name                         // 灾种名称
                          ,disasterColor: treeNode.disasterColor      // 灾种颜色
                          ,disasterLevel: treeNode.disasterLevel      // 灾种级别
                          ,disasterCode: treeNode.code                // 灾种编码
                          ,icon: "/client/"+treeNode.img              // 灾种图标
                      };

                      // 预警名称
                      $(".basis input[name='disasterName']").val(param.disasterName);
                      // 预警颜色
                      $(".basis select[name='disasterColor']").val(param.disasterColor);
                      // 预警颜色
                      $(".basis input[name='disasterCode']").val(param.disasterCode);
                      // 预警级别
                      $(".basis select[name='disasterLevel']").val(param.disasterLevel);

                      // 获取策略信息, 并设置流程、渠道
                      active.getStrategyMsg(param, active.setStrategyAndChannel);
                      // 获取预警信息，并匹配预警内容
                      active.getWarnMsg(param, active.setWarn);
                      // 基础信息配置
                      active.setBasis(param);
                  }
                  return false;
              }
          });
      };*/

    /**
     * 初始化加载地区树
     */
    let initAreaTree =  zTree.async({
        id: "#areaTree",
        setting: {
            async:{
                enable:true,
                url: "/client/tree/area",
                autoParam:["id"],
                dataType:"json",
            },
            check: {
                enable: true,
                chkboxType: {"Y":"s", "N": "ps"},
                chkStyle:"checkbox"
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback:{
                onClick:null,
                onCheck:active.areaCheck
            }
        }
    });

    /**
     * 初始化加载渠道
     */
    let initChannelList = function(){
        $.ajax({
            async:true
            ,type: "POST"
            ,data: {type: 0}
            ,url: "/client/channel/list"
            ,dataType: 'json'
            ,success: function(json){
                if(json.code == 200 && json.data != null){
                    let html ="";
                    json.data.forEach(function (currentValue, index, arr) {
                        html += "<div class='"+(currentValue.status == 1 ? "imgbox" : "imgbox-gray")+"' data-id='"+currentValue.id+"' data-title='"+currentValue.name+"' data-channel='"+currentValue.name+"' data-code='"+currentValue.code+"' >";
                        html += "   <img class='"+(currentValue.status == 0 ? "gray" : "")+"' src='/client/"+currentValue.icon+"' title='"+(currentValue.status == 0 ? currentValue.name+"渠道未部署" : currentValue.name)+"' />";
                        html += "<span>"+currentValue.name+"</span>";
                        html += "</div>";
                    });
                    $(".channel-list").empty().append(html);
                }
            }
        });
    };

    /**
     * 渠道全选、反选
     */
    $(".channel-option").on("click", "div > span", function(element) {
        let text = $(this).text(),
            event = $(this).data("event"),
            disasterName = $("#disasterName").val();
        // 如果没有选中灾种，则提示
        if(disasterName == null || disasterName.length == 0){
            // 弹出提示信息，2s后自动关闭
            layer.msg("请先选择预警", {time: 2000});
            return false;
        }

        if(text == '全选'){
            // 给所有渠道添加选中样式
            $("." + event + " .imgbox").addClass("active");
            // 获取选中渠道
            let param = {
                /**
                 * 获取选中渠道
                 */
                "channelId": function () {
                    var cId = [];
                    $("." + event + " .imgbox").each(function () {
                        cId.push($(this).data("id"));
                    });
                    return cId;
                }()
                /**
                 * 获取选中地区
                 */
                ,"area": function () {
                    var area = [];
                    initAreaTree.getCheckedNodes().forEach(function (item) {
                        area.push({
                            areaId: item.id,
                            areaName: item.name
                        });
                    });
                    return area;
                }()
            };
            // 清除tab页所有内容
            $(".warn-tab .warn-tab-title, .warn-tab .warn-tab-content").empty();
            // 拼接预警内容和受众
            active.setWarnContent(param);
        }else{
            $("." + event + " .imgbox").removeClass("active");
            // 清除tab页所有内容
            $(".warn-tab .warn-tab-title, .warn-tab .warn-tab-content").empty();
            // 拼回默认提示
            active.defaultWarnMsg({id:'choose-tab',title:'温馨提示',msg:'请选择渠道'});
        }
    });
    /**
     * 渠道点击单选、取消选择
     */
    $(".channel-list").on("click", ".imgbox", function(element) {
        let disasterName = $("#disasterName").val();
        // 如果没有选中灾种，则提示
        if(disasterName == null || disasterName.length == 0){
            // 弹出提示信息，2s后自动关闭
            layer.msg("请先选择预警", {time: 2000});
            return false;
        }
        // 追加或删除样式
        if($(this).hasClass("active")){
            if($(".channel-list .imgbox.active").length == 1){
                layer.msg("请至少选择一个渠道", {time: 2000});
                return false;
            }
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        // 调用渠道点击事件业务
        active.channelOneClick($(this));
    });

    /**
     * 文件上传
     */
    $(".fileUpload, .warn-upload-msg").on("click", function () {
        // 文件唯一标志
        let index = new Date().getTime();
        // 1:拼接文件文本框
        $(".warn-file-list").append("<input type='file' id='warn-"+index+"' name='warnFile' class='warn-"+index+"' data-file-index='"+index+"'>");
        // 2: 触发文件文本框
        $(".warn-file-list > .warn-"+index).click().change(function () {
            // 如果是最先添加则显示文件表格
            if($(".warn-file-table").hasClass("layui-hide")){
                $(".warn-file-table").removeClass("layui-hide");
                // 3:隐藏初始化提示信息
                $(".warn-upload-msg").addClass("layui-hide");
            }
            // 获取选中文件信息
            let file = $(this)[0].files[0], size = file.size;
            // 计算文件大小
            let s = (size/1024) > 1024 ? (file.size/1024/1024).toFixed(2) + "MB": (file.size/1024).toFixed(2) + "KB";
            // 拼接文件内容
            let html = "<tr>";
            html += "   <td>" + index + "</td>";
            html += "   <td>" + file.name + "</td>";
            html += "   <td>" + s + "</td>";
            html += "   <td>" + file.name.substring(file.name.lastIndexOf(".")+1,file.name.length) + "</td>";
            html += "   <td><a class='layui-btn layui-btn-danger layui-btn-xs' data-file-class='warn-" + index + "'><i class='layui-icon layui-icon-delete'></i>删除</a></td>";
            html += "</tr>";
            //追加到文件列表
            $(".warn-file-table > tbody").append(html);
            // 点击列表删除事件，删除当前行，并且删除，文件文本框
            $(".warn-file-table > tbody > tr > td > a").on("click",function () {
                let fileClass = $(this).data("fileClass");
                // 删除文件文本框
                $(".warn-file-list > ." + fileClass).remove();
                // 删除当前行
                $(this).parent().parent().remove();

                if($(".warn-file-table > tbody > tr").length == 0){
                    $(".warn-file-table").addClass("layui-hide");
                    // 3:隐藏初始化提示信息
                    $(".warn-upload-msg").removeClass("layui-hide");
                }
            });
        });
    });

    /**
     * tab选项卡删除监听事件
     */
    element.on('tabDelete(warn-tab)', function(data){
        // 获取当前删除的tab title中的渠道id
        let channelId = $(this).parent().attr("lay-id");
        if(channelId != undefined) {
            // 判断当前是否是最后一个渠道，如果是则提示至少选中一个渠道
            if ($(".channel-list .imgbox.active").length == 1) {
                let result = {
                    channelId: [channelId],
                    area: []
                };
                // 循环获取当前地区树选中的地区
                initAreaTree.getCheckedNodes(true).forEach(function (item) {
                    result.area.push({
                        areaId: item.id,
                        areaName: item.name
                    });
                });
                active.setWarnContent(result);
                layer.msg("请至少选中一个渠道", {time: 2000});
                return false;
            }

            // 删除渠道对应的样式
            $(".channel-list .imgbox.active[data-id='" + channelId + "']").removeClass("active");

        }
    });

    //时间计算
    var dateTime = function(day){
        var now = new Date();
        var date = new Date(now.getTime() - day * 24 * 3600 * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        month = month < 10 ? "0"+month : month;
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + second;
    };


    /**
     * tab选项卡前按钮移动操作
     */
    let tabIndex = 0;
    $(".warn-tab").on('click','.warn-tab-prev',function () {
        // title可视化宽度
        let width = $(".warn-tab-title").width();
        // 获取可视化区域li的个数，四舍五入
        let move = Math.round(width/95);
        if(tabIndex > 0){
            tabIndex--;
            let moveWidth = move * 95 * tabIndex;
            $(".warn-tab-title > li:nth-child(1)").css({"margin-left": -moveWidth});
        }
    });
    /**
     * tab选项卡后按钮移动操作
     */
    $(".warn-tab").on('click','.warn-tab-next',function () {
        // title可视化宽度
        let width = $(".warn-tab-title").width();
        // 获取可视化区域li的个数，四舍五入
        let move = Math.round(width/95);
        // li的总个数
        let count = $(".warn-tab-title > li").length;
        if(move * (tabIndex + 1) < count){
            tabIndex++;
            let moveWidth = move * 95 * tabIndex;
            $(".warn-tab-title > li:nth-child(1)").css({"margin-left": -moveWidth});
        }
    });

    /**
     * 监听预警提交事件
     */
    form.on("submit(submit)", function(data){
        // 判断至少选中一个地区
        let areaTree = zTree.getZTree("areaTree");
        let nodes = areaTree.getCheckedNodes(true);
        if(nodes.length == 0){
            // initAreaTree.checkNode(treeNode, true, true);
            layer.msg("请至少选中一个地区", {time: 2000});
            return false;
        }

        // 数据提交到后台，通用方法
        let param = data.field;

        param.advice = "您好：" + param.title + "请您处理";     // 流程意见
        param.status = 0;                                      // 预警状态：0：未发布；1：以发布；2：解除
        // 预警信息状态：[Alert（首次）,Update（更新）,Cancel（解除）,Ack（确认）,Error（错误）]，目前只采用“Alert”“Update”“Cancel”三个枚举值，其余枚举值保留，暂不使用。
        param.msgType = "Alert";
        // 发布范围：[Public（公开）,Restricted（限制权限）,Private（特定地址）],固定使用“Public”值，其余两个枚举值保留，暂不使用。
        param.scope = "Public";
        // 流程处理
        param.flow = function(){
            let flow = "", process = [];
            $(".process-list .process input[type='checkbox'][name='flow']:checked").each(function () {
                flow += "," + $(this).val();
                process.push(parseInt($(this).val()));
            });
            // 当前预警流程预警录入
            param.currentFlow = 0;
            // 根据当前预警流程，获取下一个预警流程
            param.nextFlow = process[process.indexOf(param.currentFlow) + 1];
            return flow.substring(1);
        }();

        // 渠道处理
        param.channel = function(){
            let channel = [];
            $(".channel-list .imgbox.active").each(function () {
                channel.push({
                    channelId: $(this).data("id"),
                    channelName: $(this).data("title"),
                    channelCode: $(this).data("code")
                });
            });
            return JSON.stringify(channel).replace(/\"/g,"'");
        }();

        // 地区处理
        param.area = function(){
            let area = [];
            initAreaTree.getCheckedNodes(true).forEach(function (item) {
                area.push({
                    areaId: item.id,
                    areaName: item.name,
                    areaCode: item.code
                });
            });
            return JSON.stringify(area).replace(/\"/g,"'");
        }();

        // 群组处理
        param.group = function(){
            let group = {};
            $(".channel-list .imgbox.active").each(function () {
                var channelId = $(this).data("id")
                    ,channelGroup = [];
                zTree.getZTree("group_"+channelId).getCheckedNodes(true).forEach(function (item) {
                    channelGroup.push({
                        userGroupId: item.id,
                        userGroupName: item.name
                    });
                });
                group[channelId] = channelGroup;
            });
            return JSON.stringify(group).replace(/\"/g,"'");
        }();

        // 上传文件名称处理
        let files = function () {
            delete param.warnFile;
            let file = [];
            $(".warn-file-list > input[type='file']").each(function () {
                file.push("warn-" + $(this).data("fileIndex"));
            });
            return file;
        };

        // 预警内容处理
        // (function () {
        //     // 获取预警内容
        //     let content = $(".warn-card-content textarea[name^='content_']").eq(0).val();
        //     param.channel(1).forEach( channel => {
        //         let channelId = channel.channelId;
        //         param.area(1).forEach( area => {
        //             let areaId = area.areaId;
        //             param["content_"+channelId+"_"+areaId]=content;
        //         });
        //     });
        // }());
        //

        // 预警内容处理
        (function () {
            // 获取预警内容
            param.content = $(".warn-card-content textarea[name^='content_']").eq(0).val();
            $(".channel-list .imgbox.active").each(function () {
                initAreaTree.getCheckedNodes(true).forEach(function (item) {
                    delete param["content_" + $(this).data("id") + "_" + item.id];
                });
            });
        }());
        console.log(param);
        // 数据提交
        ajaxFileUpload.render({
            async: true
            ,url : "/client/warn/edit/insert"
            ,type: "POST"
            ,param : param//需要传递的数据 json格式
            ,files : files()
            ,dataType: 'json'
        },function (json) {
            if(json.code == 200){
                // 弹出提示信息，2s后自动关闭
                layer.msg(json.msg, {time: 2000},function(){
                    location.reload();
                });
            }
        });

    });

    /**
     * 初始化加载项
     */
    initPageMsg();          // 初始化页面加载信息
    // disasterLevelZtree();   // 初始化加载灾种级别树
    initChannelList();      // 初始化加载渠道
});