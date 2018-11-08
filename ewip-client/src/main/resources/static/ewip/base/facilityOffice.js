layui.config({
    base: '/client/layuiadmin/modules/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    selectTree: 'selectTree'
    ,zTree: 'zTree'
    ,disaster: 'disaster'
});

layui.use(['table','form','laytpl','layer', 'selectTree', 'zTree', 'disaster'], function(){
    let table = layui.table			// 引用layui表格
        ,form = layui.form			// 引用layui表单
        ,laytpl = layui.laytpl		// 引用layui模板引擎
        ,layer = layui.layer		// 引用layui弹出层
        ,$ = layui.$       			// 引用layui的jquery
        ,selectTree = layui.selectTree
        ,zTree = layui.zTree
        ,disaster = layui.disaster;


    /**
     * 加载表格
     */
    table.render({
        id: 'table'
        ,elem: '#table'
        ,url:'/client/facilityOffice/select'
        ,even: true
        ,page:true
        ,height: 'full-165'
        ,limits:[5,10,20,50,100]
        ,cols: [[
            {type: 'checkbox'}
            ,{type: 'numbers', title: '编号'}
            ,{field: 'name', title: '名称', sort: true}
            ,{field: 'unit', title: '所属部门',sort: true}
            ,{field: 'type', title: '场所类型',sort: true}
            ,{field: 'area', title: '占地面积（㎡）', sort: true}
            ,{field: 'worker', title: '工作人员人数', sort: true}
            ,{field: 'address', title: '地址', sort: true}
            ,{field: 'principal', title: '负责人', sort: true}
            ,{field: 'phone', title: '联系电话', sort: true}
           // ,{title: '操&nbsp;&nbsp;作',width: '15%', align:'center', toolbar: '#btnGroupOption'}
        ]]
    });


    let active = {

        updateOption: param => {
            console.log(param);
        }

    };
    /**
     * 监听头部搜索
     */
    form.on('submit(search)', function(data){
        reloadTable(data.field);
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
                name: param == undefined ? '' : param.name
                ,type: param == undefined ? '' : param.type
                ,unit: param == undefined ? '' : param.unit
            }
        });
    };

    /**
     * 监听列表中按钮事件
     */
    table.on('tool(table)', obj => {
        active[obj.event] ? active[obj.event].call(this, obj) : '';
    });

    /**
     * 监控表头工具条按钮事件
     */
    $('.tableBar .layui-btn').on('click', () =>{
        let type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});