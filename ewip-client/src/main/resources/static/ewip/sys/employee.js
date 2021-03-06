layui.config({
    base: '/client/layuiadmin/modules/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    selectTree: 'selectTree' //如果 mymod.js 是在根目录，也可以不用设定别名
    ,mod1: 'modules' //相对于上述 base 目录的子目录
});

layui.use(["table","form","laytpl","layer","selectTree"], function(){
    let table = layui.table			// 引用layui表格
        ,form = layui.form			// 引用layui表单
        ,laytpl = layui.laytpl		// 引用layui模板引擎
        ,selectTree = layui.selectTree
        ,layer = layui.layer		// 引用layui弹出层
        ,$ = layui.$				// 引用layui的jquery
        ,employee = layui.sessionData("ewip").employee // 当前登录用户信息

    /**
     * 格式化性别
     * @param d
     * @returns {string}
     */
    let sexFormat = function(d){
        return d.sex == 0? '女' : '男';
    };

    /**
     * 加载表格
     */
    table.render({
        id: 'table'
        ,elem: '#table'
        ,url:'/client/employee/select'
        ,page:true
        ,even: true
        ,height: 'full-165'
        ,limits:[10,20,50,100]
        ,cols: [[
            {type: 'checkbox'}
            ,{type: 'numbers', title: '编号'}
            ,{field: 'loginName', title: '登录名称', sort: true}
            ,{field: 'name', title: '员工名称', sort: true}
            ,{field: 'sex', title: '性别', sort: true, templet: sexFormat}
            ,{field: 'organizationName', title: '所属机构', sort: true}
            ,{field: 'phone', title: '电话号码', sort: true}
            ,{field: 'email', title: '员工邮箱', sort: true}
            ,{title: '操&nbsp;&nbsp;作', width: 280, align:'center', toolbar: '#btnGroupOption'}
        ]]
        , done: function (res, curr, count) {
            var employeeList=res.data;
            console.log(employee);
            if(employee.roleType.indexOf("1") != -1){
                //是超级管理员
                for(var i=0;i<employeeList.length;i++){
                    if(employeeList[i].roleType.indexOf("1") != -1){
                        $("table").find("tr").eq(i+1).children("td").eq(0).find("div").css("display","none");
                    }
                }
            }
            if(employee.roleType.indexOf("2") != -1){
                //是系统管理员
                for(var i=0;i<employeeList.length;i++){
                    if(employeeList[i].roleType.indexOf("2") != -1){
                        $("table").find("tr").eq(i+1).children("td").eq(0).find("div").css("display","none");
                    }
                }
            }
            // $(".laytable-cell-checkbox").css("display","none");

            // 表格渲染完成之后的回调
            // LayUIDataTable.SetJqueryObj($);// 第一步：设置jQuery对象
            //
            // var currentRowDataList = LayUIDataTable.ParseDataTable(function (index, currentData, rowData) {
            //     console.log("当前页数据条数:" + currentRowDataList.length)
            //     console.log("当前行索引：" + index);
            //     console.log("触发的当前行单元格：" + currentData);
            //     console.log("当前行数据：" + JSON.stringify(rowData));
            //
            //     var msg = '<div style="text-align: left"> 【当前页数据条数】' + currentRowDataList.length + '<br/>【当前行索引】' + index + '<br/>【触发的当前行单元格】' + currentData + '<br/>【当前行数据】' + JSON.stringify(rowData) + '</div>';
            //     layer.msg(msg)
            // })
            //
            // // 对相关数据进行判断处理--此处对【竞猜数量】大于30的进行高亮显示
            // $.each(currentRowDataList, function (index, obj) {
            //     if (obj['num'] && obj['num'].value > 30) {
            //         obj['num'].row.css("background-color", "#FAB000");
            //     }
            // })
        }// end done
    });

    /**
     * 初始化地区树
     */
    selectTree.render({
        'id': 'searchAreaId'
        ,'url': '/client/tree/area'
        ,'isMultiple': false
        ,'isVerify': false
        ,clickNode:function (event, treeId, treeNode) {
            let areaId = treeNode.id;
            initOrg(0,areaId);
            //绑定树操作
            selectTree.setValue(treeId,treeNode);
            selectTree.hideTree();
        }
    });

    /**
     * 初始化下拉机构列表
     * @param param
     */
    let initOrg=function(flag,param){
        $.ajax({
            async:false
            ,type: "POST"
            ,data: {areaId:param}
            ,url: "/client/organization/selectOrg"
            ,dataType: 'json'
            ,success: function(json){
                let list=json.list;
                var html="";
                html +="<option value=''>直接选择或搜索选择</option>";
                if(list.length>0){
                    for(var i=0;i<list.length;i++){
                        html +="<option value='"+list[i].id+"'>"+list[i].organizationName+"</option>";
                    }
                    if(flag==0){
                        $("#searchOrganizationId").empty().append(html);
                    }else if(flag==1){
                        $("#addOrganizationId").empty().append(html);
                    }else{
                        $("#updateOrganizationId").empty().append(html);
                        $("#detailsOrganizationId").empty().append(html);
                    }
                }
                form.render();
            }
        });
    }

    /**
     * 自定义验证规则
     */
    form.verify({
        loginName: function(value){
            if(value.length == 0){
                return '员工ID不能为空';
            }
            // 校验员工是否存在
        }
        ,loginPassword: [/(.+){6,12}$/, '密码必须是6到12位']
        ,name: function (value) {
            if(value.length == 0){
                return '用户名称不能为空';
            }
        }
        ,areaId: function(value){
            if(value.length == 0) {
                $("#addAreaId .addAreaIdShow, #updateAreaId .updateAreaIdShow").css("border-color","red");
                return '请选择所属地区';
            }
        }
        ,organizationId: function(value){
            if(value.length == 0) {
                $("#addOrganizationId .addOrganizationIdShow, #updateOrganizationId .updateOrganizationIdShow").css("border-color","red");
                return '请选择所属机构';
            }
        }
    });

    /**
     * 修改后重新刷新列表，curr: 1重新从第 1 页开始
     */
    let reloadTable = function (param) {
        table.reload('table', {
            page: {
                curr: 1
            },
            where: { //设定异步数据接口的额外参数，任意设
                loginName: param ==undefined ? '' : param.loginName
                ,name: param ==undefined ? '' : param.name
                ,areaId: param == undefined ? '' : param.areaId
                ,organizationId: param == undefined ? '' : param.organizationId

            }
        });
    };
    /**
     * 数据提交到后台（通用发方法）
     * @param option
     */
    let submitServer = function(option){
        $.ajax({
            async:true
            ,type: option.type
            ,data: option.param
            ,url: option.url
            ,dataType: 'json'
            ,success: function(json){
                if(option.index != null) layer.close(option.index);
                if(json.code == 200){
                    // 刷新列表
                    reloadTable();
                }
                // 弹出提示信息，2s后自动关闭
                layer.msg(json.msg, {time: 2000});
            }
        });
    };

    /**
     * 统一按钮操作对象
     * @type {{addBtn: 添加员工信息, deleteBtn: 批量删除信息, deleteOption: 删除单个员工信息, updateOption: 修改员工信息}}
     */
    let active = {
        /**
         * 根据角色id，查询拥有的角色
         */
        "selectEmployeeInRole": (employeeId, callback) =>{
            $.ajax({
                async:false
                ,type: "GET"
                ,data: {employeeId, employeeId}
                ,url: "/client/employee/select/role"
                ,dataType: 'json'
                ,success: function(json){
                    if(json.code == 200 && json.data != null){
                        callback(json.data);
                    }
                }
            });
        }
        /**
         * 初始化查询条件角色
         */
        ,"selectRole": (callback)=>{
            $.ajax({
                async:false
                ,type: "GET"
                ,data: {}
                ,url: "/client/role/select/all"
                ,dataType: 'json'
                ,success: function(json){
                    if(json.code == 200 && json.data != null){
                        callback(json.data);
                    }
                }
            });
        }
        /**
         * 工具条：添加员工信息
         */
        ,'addBarBtn': function(){
            layer.open({
                type: 1
                ,title: "<i class='layui-icon'>&#xe642;</i> 添加员工信息"
                ,area: '600px'
                ,shade: 0.3
                ,maxmin:true
                ,offset:'50px'
                ,btn: ['添加', '取消']
                ,content:"<div id='addEmployee' style='padding:20px 20px 0 20px'></div>"
                ,success: function(layero,index){
                    // 获取模板，并将数据绑定到模板，然后再弹出层中渲染
                    laytpl(addPop.innerHTML).render([], function(html){
                        // 动态获取弹出层对象并追加html
                        $("#addEmployee").empty().append(html);
                        // 初始化下拉树(地区)
                        let areaId = "";
                        selectTree.render({
                            'id': 'addAreaId'
                            ,'url': '/client/tree/area'
                            ,'isMultiple': false
                            ,clickNode:function (event, treeId, treeNode) {
                                areaId = treeNode.id;
                                initOrg(1,areaId);
                                //绑定树操作
                                selectTree.setValue(treeId,treeNode);
                                selectTree.hideTree();
                            }
                        });
                        // 初始化下拉树(机构)
                        // selectTree.render({
                        //     'id': 'addOrganizationId'
                        //     ,'url': '/client/tree/organization'
                        //     ,'isMultiple': false
                        // });
                    });
                    form.render();
                }
                ,yes: function(index, layero){
                    //触发表单按钮点击事件后，立刻监听form表单提交，向后台传参
                    form.on("submit(subbmitAddBtn)", function(data){
                 /*       submitServer({
                            index: index
                            ,type: 'POST'
                            ,param: data.field
                            ,url: '/client/employee/insert'
                        });*/
                        $.ajax({
                            async: true
                            ,type: 'POST'
                            ,data: data.field
                            ,url: '/client/employee/verifyLoginName'
                            ,dataType: 'json'
                            ,success: function(json){
                                if(json.code == 500){
                                    layer.msg(json.msg, {time: 2000});
                                }else {
                                    submitServer({
                                        index: index
                                        ,type: 'POST'
                                        ,param: data.field
                                        ,url: '/client/employee/insert'
                                    })
                                }
                            }
                        });

                    });
                    // 触发表单按钮点击事件
                    $("#subbmitAddBtn").click();
                }
            });
        }
        /**
         * 工具条：批量删除员工信息
         * @returns {boolean}
         */
        ,'deleteBarBtn': function(){
            var checkStatus = table.checkStatus('table')
                ,data = checkStatus.data;
            if(data.length == 0){
                layer.msg('请选中员工进行删除', {time: 2000});
                return false;
            }
            layer.confirm('确定删除这批用户？', function(index){
                var id = '';
                for(var i = 0, len = data.length; i<len; i++){
                    id += "," + data[i].id;
                }
                // 数据提交到后台，通用方法
                submitServer({
                    index: index
                    ,type: 'POST'
                    ,param: {id: id.substring(1)}
                    ,url: '/client/employee/delete'
                });
            });
        }
        /**
         * 列表中：删除选中的员工信息
         * @param obj
         */
        ,'deleteOption': function (obj) {
            layer.confirm('确定删除该用户？', function(index){
                obj.del();
                // 数据提交到后台，通用方法
                submitServer({
                    index: index
                    ,param: null
                    ,type: 'DELETE'
                    ,url: '/client/employee/delete/' + obj.data.id,
                });
            });
        }
        /**
         * 列表中：修改员工信息
         * @param obj
         */
        ,'updateOption': function (obj) {
            let param = obj.data;
            //示范一个公告层
            layer.open({
                type: 1
                ,title: "<i class='layui-icon'>&#xe642;</i> 修改员工信息"
                ,area: '500px'
                ,shade: 0.3
                ,maxmin:true
                ,offset: '50px'
                ,btn: ['修改', '取消']
                ,content:"<div id='updateEmployee' style='padding:20px 20px 0 20px'>adsfds</div>"
                ,success: function(layero,index){
                    // 获取模板，并将数据绑定到模板，然后再弹出层中渲染
                    laytpl(updatePop.innerHTML).render(param, function(html){
                        // 动态获取弹出层对象
                        $("#updateEmployee").empty().append(html);
                        initOrg(2,null);//初始化机构列表
                        $("select[name='organizationId']").val(param.organizationId);
                        // 初始化下拉树(地区)
                        let areaId = "";
                        selectTree.render({
                            'id': 'updateAreaId'
                            ,'url': '/client/tree/area'
                            ,'isMultiple': false
                            ,'checkNodeId': param.areaId
                            ,clickNode:function (event, treeId, treeNode) {
                                areaId = treeNode.id;
                                initOrg(2,areaId);
                                //绑定树操作
                                selectTree.setValue(treeId,treeNode);
                                selectTree.hideTree();
                            }
                        });
                        // 初始化下拉树(机构)
                        // selectTree.render({
                        //     'id': 'updateOrganizationId'
                        //     ,'url': '/client/tree/organization'
                        //     ,'isMultiple': false
                        //     ,'checkNodeId': param.organizationId
                        // });
                    });
                    form.render();
                }
                ,yes: function(index, layero){
                    //触发表单按钮点击事件后，立刻监听form表单提交，向后台传参
                    form.on("submit(subbmitUpdateBtn)", function(data){
                        data.field.id = param.id;
                        // 数据提交到后台，通用方法
                        submitServer({
                            index: index
                            ,type: 'POST'
                            ,param: data.field
                            ,url: '/client/employee/update'
                        });
                    });
                    // 触发表单按钮点击事件
                    $("#subbmitUpdateBtn").click();
                }
            });
        }
        /**
         * 分配角色
         */
        ,"roleOption": obj => {
            let param = obj.data;
            //示范一个公告层
            layer.open({
                type: 1
                ,title: "<i class='layui-icon'>&#xe642;</i> 用户分配角色"
                ,area: '500px'
                ,shade: 0.3
                ,maxmin:true
                ,offset: '200px'
                ,btn: ['分配', '取消']
                ,content:"<div id='roleDiv' style='padding:20px 20px 0 20px'></div>"
                ,success: function(layero,index){
                    // 获取模板，并将数据绑定到模板，然后再弹出层中渲染
                    laytpl(rolePop.innerHTML).render(param, function(html){
                        // 动态获取弹出层对象
                        $("#roleDiv").empty().append(html);
                        // 查询系统中所有角色
                        active.selectRole((res)=>{
                            res.forEach((role)=>{
                                if(role.roleType!= 1){
                                    $("#roleDiv .role").append("<input type='checkbox' name='roleId' value='" + role.id + "' title='" + role.role + "' lay-skin='primary' />");
                                }
                            });
                        });
                        // 查询该角色拥有的权限
                        active.selectEmployeeInRole(param.id, (res)=>{
                            res.forEach((role)=>{
                                $("#roleDiv .role input[type='checkbox'][value='" + role.id + "']").attr("checked","checked");
                            });
                        });

                    });
                    form.render();
                }
                ,yes: function(index, layero){
                    //触发表单按钮点击事件后，立刻监听form表单提交，向后台传参
                    form.on("submit(submitRoleBtn)", function(data){
                        data.field.employeeId = param.id;
                        var roleId = "";
                        $("#roleDiv .role input[type='checkbox'][name='roleId']:checked").each(function(){
                            roleId += "," + $(this).val();
                        });
                        data.field.roleId = roleId.substring(1);
                        if(roleId == ""){
                            layer.msg('请勾选角色', {
                                time: 1000, //1s后自动关闭
                            });
                            return false;
                        }
                        // 数据提交到后台，通用方法
                        submitServer({
                            index: index
                            ,type: 'POST'
                            ,param: data.field
                            ,url: '/client/employee/insert/role'
                        });
                    });
                    // 触发表单按钮点击事件
                    $("#submitRoleBtn").click();
                }
            });
        }
        /**
         * 列表中：员工详细信息
         * @param obj
         */
        ,'detailsOption': function (obj) {
            let param = obj.data;
            //示范一个公告层
            layer.open({
                type: 1
                ,title: "<i class='layui-icon'>&#xe642;</i> 员工详细信息"
                ,area: '500px'
                ,shade: 0.3
                ,maxmin:true
                ,offset: '50px'
                ,content:"<div id='detailsEmployee' style='padding:20px 20px 0 20px'></div>"
                ,success: function(layero,index){
                    // 获取模板，并将数据绑定到模板，然后再弹出层中渲染
                    laytpl(detailsPop.innerHTML).render(param, function(html){
                        // 动态获取弹出层对象
                        $("#detailsEmployee").empty().append(html);
                        initOrg(2,null);//初始化机构列表
                        $("select[name='organizationId']").val(param.organizationId);
                        // 初始化下拉树(地区)
                        let areaId = "";
                        selectTree.render({
                            'id': 'detailsAreaId'
                            ,'url': '/client/tree/area'
                            ,'isMultiple': false
                            ,'checkNodeId': param.areaId
                            ,clickNode:function (event, treeId, treeNode) {
                                areaId = treeNode.id;
                                initOrg(2,areaId);
                                //绑定树操作
                                selectTree.setValue(treeId,treeNode);
                                selectTree.hideTree();
                            }
                        });
                    });
                    form.render();
                }
            });
        }
    };

    /**
     * 监听头部搜索
     */
    form.on('submit(search)', function(data){
        reloadTable(data.field);
    });

    //监听列表中按钮事件
    table.on('tool(table)', function(obj){
        active[obj.event] ? active[obj.event].call(this, obj) : '';
    });

    // 监控表头工具条按钮事件
    $('.tableBar .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    initOrg(0,null);//初始化机构列表

});