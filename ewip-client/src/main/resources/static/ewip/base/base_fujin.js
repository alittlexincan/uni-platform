
layui.use(["table","form","laytpl","layer"], function(){
    let table = layui.table			// 引用layui表格
        ,form = layui.form			// 引用layui表单
        ,laytpl = layui.laytpl		// 引用layui模板引擎
        ,layer = layui.layer		// 引用layui弹出层
        ,$ = layui.$;   			// 引用layui的jquery




    let active = {

        map: null

        /**
         * 统一处理后台读取数据
         *
         * {
         *  type:"POST"
         *  ,url: ""
         *  ,data: {}查询条件
         * }
         *
         * callback 回调函数取出数据进行渲染
         *
         */
        ,render: (param,callback) => {
            $.ajax({
                async:true
                ,type: param.type
                ,data: param.data
                ,url: param.url
                ,dataType: 'json'
                ,success: function(json){
                    if(json.code == 200 && json.data != null){
                        return callback(json.data);
                    }else{
                        layer.msg("暂无数据",{time:2000});
                    }
                }
            });
        }

        /**
         * 初始化地图高度
         * @param container
         */
        ,initMapHeight: container => {
            let height  = $("body").parent().parent().height() - (50 - 15 * 2);
            $("#" + container).height(height);
        }

        ,marker:(imgUrl, jw) => {
            let myIcon = new BMap.Icon(imgUrl, new BMap.Size(38.4,31.2),{
                imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            });
            let marker = new BMap.Marker(new BMap.Point(jw[0],jw[1]),{icon: myIcon});  // 创建标注
            return marker;
        }

        //定义弹出窗口参数
        ,opts : {
            width : 200,     // 信息窗口宽度
            enableMessage:true//设置允许信息窗发送短息
        }

        //富锦
        //设置灾害影响区域
        ,points:[
            {"lng":132.1511807458,"lat":47.1932795477,"count":50},
            {"lng":132.1531807458,"lat":47.1942795477,"count":59},
            {"lng":132.2321807458,"lat":47.1934395477,"count":12},
            {"lng":132.2543507458,"lat":47.1934795477,"count":43},
            {"lng":132.2234807458,"lat":47.1932543477,"count":62},
            {"lng":132.1515457458,"lat":47.1933445477,"count":64},
            {"lng":132.1511807234,"lat":47.1964695477,"count":15},
            {"lng":132.1534337458,"lat":47.1932795477,"count":82},
            {"lng":132.2988807458,"lat":47.1933495477,"count":16},
            {"lng":132.1512337458,"lat":47.1932545477,"count":74},
            {"lng":132.1511234458,"lat":47.1932345477,"count":42},
            {"lng":132.1511236558,"lat":47.1932795477,"count":42},
            {"lng":132.231807458,"lat":47.1932712477,"count":24},
            {"lng":132.1523407458,"lat":47.1932743232,"count":26},
            {"lng":132.3432407458,"lat":47.1932795499,"count":68},
            {"lng":132.2052346465,"lat":47.1973634473,"count":83}
        ]
        ,points1:[
            {"lng":132.1753633682,"lat":47.1084975189,"count":50},
            {"lng":132.1731807458,"lat":47.1042795477,"count":51},
            {"lng":132.1721807458,"lat":47.1034395477,"count":15},
            {"lng":132.1743507458,"lat":47.1034795477,"count":40},
            {"lng":132.1234807458,"lat":47.1032543477,"count":100},
            {"lng":132.1715457458,"lat":47.1033445477,"count":6},
            {"lng":132.1711807234,"lat":47.0964695477,"count":18},
            {"lng":132.1734337458,"lat":47.0832795477,"count":80},
            {"lng":132.1388807458,"lat":47.1033495477,"count":11},
            {"lng":132.1712337458,"lat":47.1032545477,"count":7},
            {"lng":132.1711234458,"lat":47.1032345477,"count":42},
            {"lng":132.1711236558,"lat":47.0632795477,"count":4},
            {"lng":132.1531807458,"lat":47.0532712477,"count":27},
            {"lng":132.1723407458,"lat":47.1032743232,"count":23},
            {"lng":132.1432407458,"lat":47.1032795499,"count":60},
            {"lng":132.1595701070,"lat":47.1055097453,"count":87}
        ]
        ,points2:[
            {"lng":132.1595701070,"lat":47.1055097453,"count":50},
            {"lng":132.1531807458,"lat":47.1042795477,"count":51},
            {"lng":132.1521807458,"lat":47.1034395477,"count":15},
            {"lng":132.1543507458,"lat":47.1034795477,"count":40},
            {"lng":132.1234807458,"lat":47.1032543477,"count":100},
            {"lng":132.1415457458,"lat":47.1033445477,"count":6},
            {"lng":132.1511807234,"lat":47.1064695477,"count":18},
            {"lng":132.1534337458,"lat":47.7832795477,"count":80},
            {"lng":132.1388807458,"lat":47.1033495477,"count":11},
            {"lng":132.1512337458,"lat":47.1032545477,"count":7},
            {"lng":132.1511234458,"lat":47.1032345477,"count":42},
            {"lng":132.1511236558,"lat":47.7632795477,"count":4},
            {"lng":132.1531807458,"lat":47.7532712477,"count":27},
            {"lng":132.1423407458,"lat":47.1032743232,"count":23},
            {"lng":132.1432407458,"lat":47.1032795499,"count":60},
            {"lng":131.3711807458,"lat":47.1032795477,"count":87}
        ]
        ,points3:[
            {"lng":132.1065648576,"lat":47.2087256332,"count":50},
            {"lng":132.1031807458,"lat":47.2042795477,"count":51},
            {"lng":132.1021807458,"lat":47.2034395477,"count":15},
            {"lng":132.1043507458,"lat":47.2034795477,"count":40},
            {"lng":131.6234807458,"lat":47.2032543477,"count":100},
            {"lng":131.6415457458,"lat":47.2033445477,"count":6},
            {"lng":132.1011807234,"lat":47.2064695477,"count":18},
            {"lng":132.1034337458,"lat":47.2032795477,"count":80},
            {"lng":131.6388807458,"lat":47.2033495477,"count":11},
            {"lng":132.1012337458,"lat":47.2032545477,"count":7},
            {"lng":132.1011234458,"lat":47.2032345477,"count":42},
            {"lng":132.1011236558,"lat":47.2032795477,"count":4},
            {"lng":132.1031807458,"lat":47.2032712477,"count":27},
            {"lng":131.6423407458,"lat":47.2032743232,"count":23},
            {"lng":131.6432407458,"lat":47.2032795499,"count":60},
            {"lng":131.4321890687,"lat":47.8196796167,"count":87}
        ]

        //定义地质灾害隐患点数组
        ,markerArrDizhiDisaster:[
            {title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
            {title: "海丰镇恭头一村向阳屯", point: "126.8769897244,46.7845627497", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
            {title: "海丰镇恭头一村四马沟屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:560</div><hr /><div>威胁资产:32000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
            {title: "海丰镇恭头二村崔家屯", point: "126.8510685084,46.7679707764", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:620</div><hr /><div>威胁资产:35000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
            {title: "恭六乡乾二村张德屯", point: "126.8753633682,47.1100775189", mes: "<div>灾害点类型:洪水</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:319</div><hr /><div>威胁资产:15000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
            {title: "恭六乡乾二村后刘家屯", point: "126.932734048,47.0815171674", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:288</div><hr /><div>威胁资产:14000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
            {title: "东升乡乾一村毛山屯", point: "126.9607999584,47.029604184", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:323</div><hr /><div>威胁资产:16000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"}
        ]
        //定义中小河流洪水数组
        ,markerArrHeliuHongShui:[
            {title: "呼兰河", point: "126.3711807458,46.6132795477", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"},
            {title: "通肯河", point: "126.3261817361,46.7128337513", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"},
            {title: "克音河", point: "126.9290702568,46.970646841", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"},
            {title: "努敏河", point: "126.859570107,46.7955097453", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"},
            {title: "头道乌龙沟", point: "126.4321890687,46.8196796167", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"},
            {title: "二道乌龙沟", point: "115.4341124778,26.3545549604", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"},
            {title: "三道乌龙沟", point: "126.7244208777,47.0908831045", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/zhongxiaoheliu.png"}
        ]
        //定义山洪数组
        ,markerArrShanHong:[
            {title: "李坪小流域", point: "126.869299538,46.9003164581", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/shanhong.png"},
            {title: "三合小流域", point: "126.9072434727,46.8271367976", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/shanhong.png"},
            {title: "苏家小流域", point: "126.9283344779,46.9826413661", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/shanhong.png"},
            {title: "二前小流域", point: "126.923501431,47.0611130718", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/shanhong.png"},
            {title: "文家小流域", point: "126.9582030949,47.1324955417", mes: "<div>防御措施:加固堤防</div><hr /><div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>气象致灾因子:暴雨</div><hr /><div>区县:望奎县</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/shanhong.png"}
        ]
        //定义内涝隐患点数组
        ,markerArrNeiLao:[
            {title: "望奎县经济技术开发区", point: "126.4522614073,46.8319925149", mes: "<div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>内涝灾害开始时间:20180824</div><hr /><div>内涝灾害结束时间:20180827</div><hr /><div>区县:望奎县</div>",addss: "/client/base/neilao.png"},
            {title: "坤南强排站", point: "126.3711807458,46.6132795477", mes: "<div>管理单位:望奎县水务局</div><hr /><div>联系人:王兆权</div><hr /><div>内涝灾害开始时间:20180824</div><hr /><div>内涝灾害结束时间:20180903</div><hr /><div>区县:望奎县</div>",addss: "/client/base/neilao.png"},
        ]
        //定义易涝区数组
        ,markerArrYiLao:[
            {title: "乌龙沟涝区", point: "126.8111718643,47.0323948663", mes: "<div>监测单位:望奎县水务局</div><hr /><div>防御措施:及时排水</div><hr /><div>区县:望奎县</div>",addss: "/client/base/yilaoqu.png"},
            {title: "克音河涝区", point: "126.6684601665,46.5570478336", mes: "<div>监测单位:望奎县水务局</div><hr /><div>防御措施:及时排水</div><hr /><div>区县:望奎县</div>",addss: "/client/base/yilaoqu.png"},
            {title: "灵山涝区", point: "115.4341124778,26.3545549604", mes: "<div>监测单位:望奎县水务局</div><hr /><div>防御措施:及时排水</div><hr /><div>区县:望奎县</div>",addss: "/client/base/yilaoqu.png"},
            {title: "西八荒涝区", point: "126.1257896713,46.3108172159", mes: "<div>监测单位:望奎县水务局</div><hr /><div>防御措施:及时排水</div><hr /><div>区县:望奎县</div>",addss: "/client/base/yilaoqu.png"},
        ]
        //定义陡坡数组
        ,markerArrdoupo:[
            {title: "阎家大窝棚坡", point: "126.8457926575,46.8291336644", mes: "<div>灾害点类型:山体滑坡</div><hr /><div>灾害点规模:小</div><hr /><div>稳定性:稳定</div><hr /><div>管理单位:海丰镇政府</div><hr /><div>联系人:张文宇</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/huapo.png"},
            {title: "崔家屯坡", point: "126.8457926575,46.8291336644", mes: "<div>灾害点类型:山体滑坡</div><hr /><div>灾害点规模:小</div><hr /><div>稳定性:稳定</div><hr /><div>管理单位:海丰镇政府</div><hr /><div>联系人:范桂详</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/huapo.png"},
            {title: "八方坡", point: "126.8907800485,46.8686164404", mes: "<div>灾害点类型:山体滑坡</div><hr /><div>灾害点规模:小</div><hr /><div>稳定性:稳定</div><hr /><div>管理单位:海丰镇政府</div><hr /><div>联系人:权利军</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/huapo.png"},
            {title: "黄崖子坡", point: "126.4593801527,46.6671352075", mes: "<div>灾害点类型:山体滑坡</div><hr /><div>灾害点规模:小</div><hr /><div>稳定性:稳定</div><hr /><div>管理单位:通江镇政府</div><hr /><div>联系人:贾振刚</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/huapo.png"},
        ]
        //定义洼地数组
        ,markerArrwadi:[
            {title: "发展村", point: "126.15,16.45", mes: "<div>灾害点类型:洪涝</div><hr /><div>灾害点规模:严重</div><hr /><div>稳定性:不稳定</div><hr /><div>管理单位:火箭镇人民政府</div><hr /><div>联系人:韩景福</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/wadi.png"},
        ]

        //定义危化品场所数组
        ,markerArrWeiHuaPin:[
            {title: "望奎加油站", point: "126.456973,46.833376", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇西门外糖厂路南</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:李洪鹏</div><hr /><div>责任人联系电话:15846667333</div>",addss: "/client/base/weihuapin.png"},
            {title: "北林加油站", point: "126.487355,46.848884", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇北门外海望路西</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:3</div><hr /><div>企业防雷安全责任人:刘东</div><hr /><div>责任人联系电话:15845088055</div>",addss: "/client/base/weihuapin.png"},
            {title: "东城加油站", point: "126.515702,46.842293", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇中央大街1号</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:任龙</div><hr /><div>责任人联系电话:15845531515</div>",addss: "/client/base/weihuapin.png"},
            {title: "环城加油站", point: "126.475799,46.83167", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇交通街158号</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:王永辉</div><hr /><div>责任人联系电话:15946155556</div>",addss: "/client/base/weihuapin.png"},
            {title: "龙华加油站", point: "126.517919,46.836089", mes: "<div>地址:黑龙江省绥化市望奎县绥安公路与海丰公路东北角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:周光</div><hr /><div>责任人联系电话:13845558266</div>",addss: "/client/base/weihuapin.png"},
            {title: "第八加油站", point: "126.491353,46.833582", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇奋斗路与交通街东南角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:乔栋</div><hr /><div>责任人联系电话:13846753333</div>",addss: "/client/base/weihuapin.png"},
            {title: "第九加油站", point: "126.285108,46.764089", mes: "<div>地址:黑龙江省绥化市望奎县先锋镇散前村</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:王立志</div><hr /><div>责任人联系电话:13846746862</div>",addss: "/client/base/weihuapin.png"},
            {title: "通江加油站", point: "126.460474,46.666393", mes: "<div>地址:黑龙江省绥化市望奎县通江镇所在地</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:刘武</div><hr /><div>责任人联系电话:13555324444</div>",addss: "/client/base/weihuapin.png"},
            {title: "卫星加油站", point: "126.671085,46.720716", mes: "<div>地址:黑龙江省绥化市望奎县卫星镇南路西</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:张伟峰</div><hr /><div>责任人联系电话:15945557333</div>",addss: "/client/base/weihuapin.png"},
            {title: "高速东加油站", point: "126.857033,47.047366", mes: "<div>地址:黑龙江省绥化市望奎县绥北高速公路K45公路+500米处路东侧</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:王瑞国</div><hr /><div>责任人联系电话:13836487555</div>",addss: "/client/base/weihuapin.png"},
            {title: "高速西加油站", point: "126.854671,47.047352", mes: "<div>地址:黑龙江省绥化市望奎县绥北高速公路K45公路+500米处路西侧</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:王瑞国</div><hr /><div>责任人联系电话:13836487555</div>",addss: "/client/base/weihuapin.png"},
            {title: "四方台加油站", point: "126.979715,46.929011", mes: "<div>地址:黑龙江省绥化市北林区四方台镇内</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:王利军</div><hr /><div>责任人联系电话:15184565757</div>",addss: "/client/base/weihuapin.png"},
            {title: "张维加油站", point: "127.000827,47.064612", mes: "<div>地址:黑龙江省绥化市北林区张维镇内</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:乔传宝</div><hr /><div>责任人联系电话:13846710777</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县东升农机服务站", point: "126.83,46.9", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇奋斗路与交通街东南角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:姜玉良</div><hr /><div>责任人联系电话:13836488885</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县富饶农机服务站", point: "126.3,46.75", mes: "<div>地址:黑龙江省绥化市望奎县先锋镇散前村</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:李占军</div><hr /><div>责任人联系电话:15845534998</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县惠七农机服务站", point: "126.67,47.1", mes: "<div>地址:黑龙江省绥化市望奎县通江镇所在地</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:徐建军</div><hr /><div>责任人联系电话:13054259993</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县厢白农机加油站", point: "126.53,46.9", mes: "<div>地址:黑龙江省绥化市望奎县绥安公路与海丰公路东北角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:刘云辉</div><hr /><div>责任人联系电话:13274569488</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县后三农机服务站", point: "126.32,46.92", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇奋斗路与交通街东南角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:吕贵文</div><hr /><div>责任人联系电话:13836426847</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县灵山农机服务站", point: "126.38,46.91", mes: "<div>地址:黑龙江省绥化市望奎县先锋镇散前村</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:王彦军</div><hr /><div>责任人联系电话:13845526410</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县通江农机服务站", point: "126.4,46.61", mes: "<div>地址:黑龙江省绥化市望奎县通江镇所在地</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:金喜涛</div><hr /><div>责任人联系电话:13846723339</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县海丰农机服务站", point: "126.79,46.81", mes: "<div>地址:黑龙江省绥化市望奎县绥安公路与海丰公路东北角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:高庆波</div><hr /><div>责任人联系电话:18245532000</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县恭六农机服务站", point: "126.85,47.08", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇奋斗路与交通街东南角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:赵德强</div><hr /><div>责任人联系电话:13555317799</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县火箭农机服务站", point: "126.5,46.75", mes: "<div>地址:黑龙江省绥化市望奎县先锋镇散前村</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:冷树信</div><hr /><div>责任人联系电话:13763792677</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县富源农机服务站", point: "126.33,46.68", mes: "<div>地址:黑龙江省绥化市望奎县通江镇所在地</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:赵  双</div><hr /><div>责任人联系电话:15045549888</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县东郊农机服务站", point: "126.46,46.83", mes: "<div>地址:黑龙江省绥化市望奎县绥安公路与海丰公路东北角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:刘洪涛</div><hr /><div>责任人联系电话:13796584674</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县灯塔农机服务站", point: "126.77,46.9", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇奋斗路与交通街东南角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:徐明权</div><hr /><div>责任人联系电话:13796562111</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县莲花农机服务站", point: "126.8,46.98", mes: "<div>地址:黑龙江省绥化市望奎县先锋镇散前村</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:张  波</div><hr /><div>责任人联系电话:15046647111</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县灯塔乡敏三农机服务站 ", point: "126.66,46.8", mes: "<div>地址:黑龙江省绥化市望奎县通江镇所在地</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:周士臣</div><hr /><div>责任人联系电话:13845544135</div>",addss: "/client/base/weihuapin.png"},
            {title: "望奎县卫星镇宏晟加油站     ", point: "126.66,46.68", mes: "<div>地址:黑龙江省绥化市望奎县绥安公路与海丰公路东北角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:赵春林</div><hr /><div>责任人联系电话:13945506085</div>",addss: "/client/base/weihuapin.png"},
            {title: "中国石化销售有限公司黑龙江绥化石油分公司先锋加油站 ", point: "126.4,46.8", mes: "<div>地址:黑龙江省绥化市望奎县望奎镇奋斗路与交通街东南角</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:张路</div><hr /><div>责任人联系电话:18645133521</div>",addss: "/client/base/weihuapin.png"},
            {title: "中国石化销售有限公司黑龙江绥化石油分公司通用加油站", point: "126.5,46.8", mes: "<div>地址:黑龙江省绥化市望奎县先锋镇散前村</div><hr /><div>品名:汽油、柴油</div><hr /><div>加油机台数:4</div><hr /><div>企业防雷安全责任人:师东旭</div><hr /><div>责任人联系电话:18346458555</div>",addss: "/client/base/weihuapin.png"}
        ]

        //定义农业园区数组
        ,markerArrNongYe:[
            {title: "宽三村绿色棚室园区", point: "126.0812821639,42.6674243063", mes: "<div>地址:小马家沟西侧</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:93750</div><hr /><div>工作人员人数:8</div><hr /><div>负责人:佟文军</div><hr /><div>联系电话:15845544333</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "东郊镇蔬菜园区", point: "104.7025000478,35.0446045972", mes: "<div>地址:东郊镇厢兰五村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:9</div><hr /><div>负责人:赵智超</div><hr /><div>联系电话:13845505066</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "兴达蔬菜园区", point: "126.48414661,46.8315954179", mes: "<div>地址:宽头公路两侧</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:187500</div><hr /><div>工作人员人数:12</div><hr /><div>负责人:隋百辉</div><hr /><div>联系电话:15845599888</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "兴达粘玉米园区", point: "126.4961283158,46.8415589238", mes: "<div>地址:宽头公路两侧</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:187500</div><hr /><div>工作人员人数:7</div><hr /><div>负责人:隋百辉</div><hr /><div>联系电话:15845599888</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "盛源蔬菜园区", point: "126.47126953,46.82307434", mes: "<div>地址:八方二里二屯</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:62500</div><hr /><div>工作人员人数:10</div><hr /><div>负责人:隋百辉</div><hr /><div>联系电话:15845599888</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "轮作示范园区", point: "126.8457926575,46.8291336644", mes: "<div>地址:绥北高速两侧</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:1250000</div><hr /><div>工作人员人数:15</div><hr /><div>负责人:隋百辉</div><hr /><div>联系电话:15845599888</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "惠七镇惠六村经济作物园区", point: "126.6820386965,47.0602586078", mes: "<div>地址:惠七镇惠六村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:312500</div><hr /><div>工作人员人数:16</div><hr /><div>负责人:于业伟</div><hr /><div>联系电话:15246529555</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "果蔬园区", point: "126.4912562539,46.8307755502", mes: "<div>地址:后三东屯</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:187500</div><hr /><div>工作人员人数:24</div><hr /><div>负责人:王福成</div><hr /><div>联系电话:15146539797</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "双高大豆种植", point: "126.6942357641,46.4230436508", mes: "<div>地址:莲花镇屯</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:187500</div><hr /><div>工作人员人数:19</div><hr /><div>负责人:刘恕</div><hr /><div>联系电话:18724378255</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "后头马铃薯种植示范园区", point: "126.577430748,46.5407482482", mes: "<div>地址:正白后头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:625000</div><hr /><div>工作人员人数:22</div><hr /><div>负责人:张宝贵</div><hr /><div>联系电话:18245554111</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "正兰后头村高产玉米种植示范园区", point: "126.4995783158,46.8420089238", mes: "<div>地址:正兰后头村后头屯西</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:625000</div><hr /><div>工作人员人数:15</div><hr /><div>负责人:王德宝</div><hr /><div>联系电话:13555335544</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "140栋标准化黑木耳吊袋大棚示范园区", point: "125.2931790894,46.2355910435", mes: "<div>地址:坤头村大岗子屯西</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:12</div><hr /><div>负责人:王志龙</div><hr /><div>联系电话:15945555111</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
            {title: "绿色水稻种植园区", point: "126.47665032,46.83632087", mes: "<div>地址:镇厢白二村西</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>园区类型:专业生产型</div><hr /><div>占地面积（㎡）:5000000</div><hr /><div>工作人员人数:10</div><hr /><div>负责人:王志龙</div><hr /><div>联系电话:15945555111</div><hr /><div>园区描述:主要种植农业蔬菜。</div>",addss: "/client/base/nongyeyuanqu.png"},
        ]
        //定义农作物种植区区数组
        ,markerArrNongZuoWu:[
            {title: "火箭镇坤后二北村水稻智能催芽示范区", point: "126.3332167,46.74241457", mes: "<div>地址:火箭镇坤后二北村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:31250</div><hr /><div>工作人员人数:22</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇现代旱作农业马铃薯示范区", point: "126.5282235,46.8286055", mes: "<div>地址:火箭镇厢红二村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:1375000</div><hr /><div>工作人员人数:14</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇互联网+马铃薯高标准示范基地", point: "126.4894697,46.75682712", mes: "<div>地址:火箭镇正兰二村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:312500</div><hr /><div>工作人员人数:13</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "龙薯联社社马铃薯脱毒种薯繁育基地", point: "126.5282235,46.8286055", mes: "<div>地址:火箭镇厢红二村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:625000</div><hr /><div>工作人员人数:10</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇正兰三村设施蔬菜示范区", point: "126.5277276,46.71903776", mes: "<div>地址:火箭镇正兰三村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:18</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇厢红三村现代化烤烟集中育苗示范区", point: "126.5123337,46.7174698", mes: "<div>地址:火箭镇厢红三村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:30000</div><hr /><div>工作人员人数:19</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇厢红二村玉米大垄模式栽培示范区", point: "126.4731168,46.71740008", mes: "<div>地址:火箭镇厢红二村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:5312500</div><hr /><div>工作人员人数:14</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇万亩现代旱作农业玉米示范区", point: "126.5277276,46.71903776", mes: "<div>地址:火箭镇正兰三村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:4043750</div><hr /><div>工作人员人数:26</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇厢兰三村玉米大垄栽培模式示范区", point: "126.5694374,46.77477551", mes: "<div>地址:火箭镇厢兰三村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:531250</div><hr /><div>工作人员人数:24</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "火箭镇正兰四村中草药种植示范区", point: "126.5591037,46.79886773", mes: "<div>地址:火箭镇正兰四村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:281250</div><hr /><div>工作人员人数:18</div><hr /><div>负责人:邱洪福</div><hr /><div>联系电话:15045546555</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "正兰头村玉米大垄栽培模式示范区", point: "126.4359738,46.69066848", mes: "<div>地址:正兰头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:2125000</div><hr /><div>工作人员人数:17</div><hr /><div>负责人:王志龙</div><hr /><div>联系电话:15945558000</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "红头村鲜食玉米示范区", point: "126.4725681,46.68689925", mes: "<div>地址:红头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:250000</div><hr /><div>工作人员人数:12</div><hr /><div>负责人:王志龙</div><hr /><div>联系电话:15945558000</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "红头村玉米大垄模式栽培示范区", point: "126.4816444,46.68236703", mes: "<div>地址:红头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:2812500</div><hr /><div>工作人员人数:24</div><hr /><div>负责人:王志龙</div><hr /><div>联系电话:15945558000</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "设施蔬菜示范区", point: "126.5025598,46.82221842", mes: "<div>地址:正兰后四村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:8</div><hr /><div>负责人:陈丽瑶</div><hr /><div>联系电话:15004555999</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "望奎县第一良种场现代农业科技示范区", point: "126.5097414,46.84224288", mes: "<div>地址:第一良种场</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:93750</div><hr /><div>工作人员人数:13</div><hr /><div>负责人:陈丽瑶</div><hr /><div>联系电话:15004555999</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "黑土情缘杂粮种植示范区", point: "126.4939958,46.83940993", mes: "<div>地址:水头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:262500</div><hr /><div>工作人员人数:10</div><hr /><div>负责人:刘伟龙</div><hr /><div>联系电话:13845537366</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "两个爸爸家庭农场示范区", point: "126.639789,46.70767578", mes: "<div>地址:水头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:9</div><hr /><div>负责人:刘伟龙</div><hr /><div>联系电话:13845537366</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "吴老六采摘园", point: "126.6250529,46.70566332", mes: "<div>地址:水头村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:40625</div><hr /><div>工作人员人数:6</div><hr /><div>负责人:刘伟龙</div><hr /><div>联系电话:13845537366</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "景丰瓜菜种子繁育基地", point: "126.3622433,46.82777334", mes: "<div>地址:先锋村坤三乌龙江屯</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:17</div><hr /><div>负责人:刘伟龙</div><hr /><div>联系电话:13845537366</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "龙蛙互联网+水稻绿色有机水稻高标准示范基地", point: "126.2399913,46.8864134", mes: "<div>地址:四段村</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:18750000</div><hr /><div>工作人员人数:16</div><hr /><div>负责人:张宝贵</div><hr /><div>联系电话:18245554111</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "四段村水稻智能化催芽示范区", point: "126.2271091,46.87804353", mes: "<div>地址:四段村小山屯</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:125000</div><hr /><div>工作人员人数:8</div><hr /><div>负责人:张宝贵</div><hr /><div>联系电话:18245554111</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "白四村设施蔬菜示范区", point: "126.4282651,46.79191784", mes: "<div>地址:青望路南</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:93750</div><hr /><div>工作人员人数:6</div><hr /><div>负责人:张宝贵</div><hr /><div>联系电话:18245554111</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"},
            {title: "启民北药种植农民专业合作社", point: "126.4522534,46.83202651", mes: "<div>地址:开发区北</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县农业局</div><hr /><div>主要作物:蔬菜</div><hr /><div>占地面积（㎡）:312500</div><hr /><div>工作人员人数:8</div><hr /><div>负责人:张宝贵</div><hr /><div>联系电话:18245554111</div><hr /><div>种植区描述:主要种植农业蔬菜为主。</div>",addss: "/client/base/zhongzhiqu.png"}
        ]
        //定义旅游景区数组
        ,markerArrlvyouWu:[
            {title: "望奎县植物园", point: "126.48,46.85", mes: "<div>地址:黑龙江省绥化市望奎县县城北郊海望路西</div><hr /><div>所属地区:望奎县</div><hr /><div>所属管辖单位:望奎县人民政府</div><hr /><div>占地面积（㎡）:15万</div><hr /><div>可容纳人数:7000</div><hr /><div>工作人员人数:30</div><hr /><div>负责人:蔡玉军</div><hr /><div>联系电话:15845080999</div><hr /><div>景区描述:国家2A级旅游景区，配设大型音乐喷泉、舞台、景观花坛、罗马柱、张拉膜等特色建筑，并配备排水、照明系统和绿化工程。</div>",addss: "/client/base/lvyoujingqu.jpg"}
        ]
        //定义高速公路数组
        ,markerArrGaosu:[
            {title: "绥北高速", point: "126.905489,47.485111", mes: "<div>高速编号:S15</div><hr /><div>起点:绥化</div><hr /><div>终点:北安</div><hr /><div>全线长:223公里</div><hr /><div>所属管辖单位:黑龙江省高等级管理所</div><hr /><div>负责人:段钢文</div><hr /><div>联系电话:15045680777</div><hr /><div>高速描述:绥北高速公路起点位于绥化城区西部，绥安公路南侧，终点位于北安市建华村西南，与北安至黑河、北安至五大连池两条高速公路交汇点相衔接，全长223公里。</div>",addss: "/client/base/gaosu.png"}
        ]
        //定义桥梁数组
        ,markerArrqiaoliang:[
            {title: "绥化望奎大桥", point: "126.692352,46.691681", mes: "<div>桥型:梁式桥</div><hr /><div>桥址:望奎县南部呼兰河</div><hr /><div>主跨长度:566.4米</div><hr /><div>成桥时间:20000901</div><hr /><div>所属管辖单位:望奎县公路管理站</div><hr /><div>负责人:刘彦辉</div><hr /><div>联系电话:13836430888</div><hr /><div>桥梁描述:2000年9月1日改造完工跨径总长560米。</div>",addss: "/client/base/qiaoliang.jpg"},
            {title: "北八里桥", point: "126.481651,46.882853", mes: "<div>桥型:梁式桥</div><hr /><div>桥址:望奎县北部沟壑</div><hr /><div>主跨长度:105.24米</div><hr /><div>成桥时间:20131101</div><hr /><div>所属管辖单位:望奎县公路管理站</div><hr /><div>负责人:刘彦辉</div><hr /><div>联系电话:13836430888</div><hr /><div>桥梁描述:2013年11月1日改造完工跨径总长100米</div>",addss: "/client/base/qiaoliang.jpg"},
            {title: "望奎县东部克音河", point: "126.926657,46.926804", mes: "<div>桥型:梁式桥</div><hr /><div>桥址:望奎县东部克音河</div><hr /><div>主跨长度:187.72米</div><hr /><div>成桥时间:20171101</div><hr /><div>所属管辖单位:望奎县公路管理站</div><hr /><div>负责人:刘彦辉</div><hr /><div>联系电话:13836430888</div><hr /><div>桥梁描述:2017年11月1日改造完工跨径总长180米。</div>",addss: "/client/base/qiaoliang.jpg"}
        ]
        //定义堤防数组
        ,markerArrdifang:[
            {title: "呼兰河堤防", point: "126.785549,45.934251", mes: "<div>河流:呼兰河</div><hr /><div>长度:19.2公里</div><hr /><div>高程:136.83-136.81米</div><hr /><div>平均堤距:1500米</div><hr /><div>高度:3.8米</div><hr /><div>堤顶宽度:5米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:2015年加高培厚，可抵御20年一遇洪水。</div>",addss: "/client/base/difang.jpg"},
            {title: "克音河堤防", point: "127.183863,47.330082", mes: "<div>河流:克音河</div><hr /><div>长度:60.8公里</div><hr /><div>高程:150.56-136.80米</div><hr /><div>平均堤距:200米</div><hr /><div>高度:3.5米</div><hr /><div>堤顶宽度:5米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:2016年加高培厚，可抵御20年一遇洪水。</div>",addss: "/client/base/difang.jpg"},
            {title: "通肯河堤防", point: "126.191853,46.87901", mes: "<div>河流:通肯河</div><hr /><div>长度:35公里</div><hr /><div>高程:168.75-149.10米</div><hr /><div>平均堤距:1200米</div><hr /><div>高度:3.5米</div><hr /><div>堤顶宽度:5米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:2015年加高培厚，可抵御20年一遇洪水。</div>",addss: "/client/base/difang.jpg"},
            {title: "头道乌龙沟左堤防", point: "126.603635,46.809163", mes: "<div>河流:头道乌龙沟左</div><hr /><div>长度:26.8公里</div><hr /><div>高程:193.00-145.00米</div><hr /><div>平均堤距:40米</div><hr /><div>高度:0.7米</div><hr /><div>堤顶宽度:1-2米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:原设计标准10年一遇防洪标准，现在破坏严重，只能达到5年一遇防洪防洪标准。</div>",addss: "/client/base/difang.jpg"},
            {title: "头道乌龙沟右堤防", point: "126.60386,46.80903", mes: "<div>河流:头道乌龙沟右</div><hr /><div>长度:27.7公里</div><hr /><div>高程:193.00-145.00米</div><hr /><div>平均堤距:40米</div><hr /><div>高度:0.7米</div><hr /><div>堤顶宽度:1-2米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:原设计标准10年一遇防洪标准，现在破坏严重，只能达到5年一遇防洪防洪标准。</div>",addss: "/client/base/difang.jpg"},
            {title: "二道乌龙沟左堤防", point: "126.417927,46.832784", mes: "<div>河流:二道乌龙沟左</div><hr /><div>长度:30公里</div><hr /><div>高程:187.50-148.00米</div><hr /><div>平均堤距:60米</div><hr /><div>高度:0.5米</div><hr /><div>堤顶宽度:1-2米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:原设计标准10年一遇防洪标准，现在破坏严重，只能达到5年一遇防洪防洪标准。</div>",addss: "/client/base/difang.jpg"},
            {title: "二道乌龙沟右堤防", point: "126.418112,46.832694", mes: "<div>河流:二道乌龙沟右</div><hr /><div>长度:34.25公里</div><hr /><div>高程:187.50-148.00米</div><hr /><div>平均堤距:60米</div><hr /><div>高度:0.5米</div><hr /><div>堤顶宽度:1-2米</div><hr /><div>所属管辖单位:黑龙江省望奎县水务局</div><hr /><div>联系人:赵文涛</div><hr /><div>联系电话:13846712457</div><hr /><div>堤防描述:原设计标准10年一遇防洪标准，现在破坏严重，只能达到5年一遇防洪防洪标准。</div>",addss: "/client/base/difang.jpg"},
        ]
        //定义学校数组
        ,markerArrxuexiao:[
            {title: "富饶中心小学", point: "126.13,46.52", mes: "<div>学校类型:小学</div><hr /><div>占地面积（㎡）:11000</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:198</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:李绍辉</div><hr /><div>联系电话:13836426959</div><hr /><div>学校描述:我校是乡镇中心小学，原有教学用房670平方，2016年新建教学综合楼，建筑面积1045平方米，现代化教育教学设施齐备。</div>",addss: "/client/base/xuexiao.png"},
            {title: "望奎镇小学", point: "126.562737,45.744651", mes: "<div>学校类型:小学</div><hr /><div>占地面积（㎡）:1.22万</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:207</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:李雪峰</div><hr /><div>联系电话:13163636299</div><hr /><div>学校描述:学校面积1.22万平方米，建筑面积783平方米，一至五年级，五个教学班。</div>",addss: "/client/base/xuexiao.png"},
            {title: "莲花镇中学", point: "126.483863,46.592587", mes: "<div>学校类型:初级中学</div><hr /><div>占地面积（㎡）:11000</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:262</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:张国良</div><hr /><div>联系电话:13763763637</div><hr /><div>学校描述:学校面积42000万平方米，建筑面积5460平方米，六至九年级，八个教学班。</div>",addss: "/client/base/xuexiao.png"},
            {title: "灯塔中学", point: "126.799862,46.911056", mes: "<div>学校类型:初级中学</div><hr /><div>占地面积（㎡）:42000</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:198</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:李绍辉</div><hr /><div>联系电话:13836426959</div><hr /><div>学校描述:我校是乡镇中心小学，原有教学用房670平方，2016年新建教学综合楼，建筑面积1045平方米，现代化教育教学设施齐备。</div>",addss: "/client/base/xuexiao.png"},
            {title: "第一中学", point: "126.5,46.83", mes: "<div>学校类型:高级中学</div><hr /><div>占地面积（㎡）:20000</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:2700</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:邹尚操</div><hr /><div>联系电话:13836405512</div><hr /><div>学校描述:学校位于望奎县卫生路前进街，占地面积大约4.5万平方米，建筑面积约11559平方米，在校师生近3000人。</div>",addss: "/client/base/xuexiao.png"},
            {title: "第二中学", point: "126.485758,46.844767", mes: "<div>学校类型:高级中学</div><hr /><div>占地面积（㎡）:3.2万</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:3764</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:张立波</div><hr /><div>联系电话:18724365888</div><hr /><div>学校描述:我校是乡镇中心小学，原有教学用房670平方，2016年新建教学综合楼，建筑面积1045平方米，现代化教育教学设施齐备。</div>",addss: "/client/base/xuexiao.png"},
            {title: "幼儿园", point: "126.599,46.0564", mes: "<div>学校类型:幼儿园</div><hr /><div>占地面积（㎡）:3377</div><hr /><div>所属地区:绥化市望奎县</div><hr /><div>学校人数:284</div><hr /><div>所属管辖单位:县教育局</div><hr /><div>负责人:张木秋</div><hr /><div>联系电话:13555317771</div><hr /><div>学校描述:一栋教学楼</div>",addss: "/client/base/xuexiao.png"},
        ]
        //定义车站数组
        ,markerArrchezhan:[
            {title: "望奎县客运站", point: "126.47,46.83", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:11502</div><hr /><div>车辆数:170</div><hr /><div>可容纳人数:700</div><hr /><div>所属管辖单位:望奎县交通局</div><hr /><div>负责人:徐连刚</div><hr /><div>联系电话:15045548008</div><hr /><div>车站描述:望奎县客运站位于望奎县南五路，每日发送到哈尔滨、大庆、绥化等地客车。</div>",addss: "/client/base/chezhan.png"}
        ]
        //定义医院数组
        ,markerArryiyuan:[
            {title: "望奎县人民医院", point: "126.4770483,46.83950161", mes: "<div>所属地区:绥化市</div><hr /><div>占地面积（㎡）:40000</div><hr /><div>医生人数:153</div><hr /><div>护士人数:267</div><hr /><div>救护车数量:8</div><hr /><div>床位数量:500</div><hr /><div>所属管辖单位:望奎县卫计局</div><hr /><div>负责人:于占海</div><hr /><div>联系电话:13945526161</div><hr /><div>医院描述:三甲医院</div>",addss: "/client/base/yiyuan.png"},
            {title: "望奎县中医院", point: "126.4886866,46.84040542", mes: "<div>所属地区:绥化市</div><hr /><div>占地面积（㎡）:10528</div><hr /><div>医生人数:188</div><hr /><div>护士人数:221</div><hr /><div>救护车数量:4</div><hr /><div>床位数量:550</div><hr /><div>所属管辖单位:望奎县卫计局</div><hr /><div>负责人:刘士义</div><hr /><div>联系电话:13845505155</div><hr /><div>医院描述:三甲医院</div>",addss: "/client/base/yiyuan.png"},
            {title: "望奎县妇幼保健院", point: "126.4917109,46.83513948", mes: "<div>所属地区:绥化市</div><hr /><div>占地面积（㎡）:6462</div><hr /><div>医生人数:58</div><hr /><div>护士人数:39</div><hr /><div>救护车数量:1</div><hr /><div>床位数量:30</div><hr /><div>所属管辖单位:望奎县卫计局</div><hr /><div>负责人:庄德仲</div><hr /><div>联系电话:13766768558</div><hr /><div>医院描述:专科医院</div>",addss: "/client/base/yiyuan.png"},
            {title: "望奎县厢白乡卫生院", point: "126.6361924,46.94505689", mes: "<div>所属地区:绥化市</div><hr /><div>占地面积（㎡）:3000</div><hr /><div>医生人数:22</div><hr /><div>护士人数:4</div><hr /><div>救护车数量:1</div><hr /><div>床位数量:25</div><hr /><div>所属管辖单位:望奎县卫计局</div><hr /><div>负责人:唐志刚</div><hr /><div>联系电话:18724378111</div><hr /><div>医院描述:公共卫生服务</div>",addss: "/client/base/yiyuan.png"},
            {title: "望奎县东郊乡厢兰五村卫生室", point: "126.5661434,46.85471411", mes: "<div>所属地区:绥化市</div><hr /><div>占地面积（㎡）:60</div><hr /><div>医生人数:1</div><hr /><div>护士人数:0</div><hr /><div>救护车数量:0</div><hr /><div>床位数量:0</div><hr /><div>所属管辖单位:望奎县卫计局</div><hr /><div>负责人:吴广文</div><hr /><div>联系电话:13836405058</div><hr /><div>医院描述:公共卫生服务</div>",addss: "/client/base/yiyuan.png"},
            {title: "望奎县惠七镇前水八村卫生室", point: "126.6608725,47.06938345", mes: "<div>所属地区:绥化市</div><hr /><div>占地面积（㎡）:60</div><hr /><div>医生人数:2</div><hr /><div>护士人数:0</div><hr /><div>救护车数量:0</div><hr /><div>床位数量:0</div><hr /><div>所属管辖单位:望奎县卫计局</div><hr /><div>负责人:马志福</div><hr /><div>联系电话:13555376781</div><hr /><div>医院描述:公共卫生服务</div>",addss: "/client/base/yiyuan.png"}
        ]

        //定义广场数组
        ,markerArrguangchang:[
            {title: "文化广场", point: "126.4700783,46.83855076", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:25000</div><hr /><div>可容纳人数:4000</div><hr /><div>所属管辖单位:城市管理行政执法局</div><hr /><div>负责人:唐晓飞</div><hr /><div>联系电话:18045576002</div><hr /><div>广场描述:位于望奎县西郊，内有健身设施，诗词 长廊，环境优美。</div>",addss: "/client/base/guangchang.png"},
            {title: "林枫广场", point: "126.4973009,46.83760948", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:20000</div><hr /><div>可容纳人数:3500</div><hr /><div>所属管辖单位:城市管理行政执法局</div><hr /><div>负责人:唐晓飞</div><hr /><div>联系电话:18045576002</div><hr /><div>广场描述:内有健身器材、休息凉亭、花坛树木。</div>",addss: "/client/base/guangchang.png"},
            {title: "体育广场", point: "126.4971083,46.84288892", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:30000</div><hr /><div>可容纳人数:5000</div><hr /><div>所属管辖单位:城市管理行政执法局</div><hr /><div>负责人:唐晓飞</div><hr /><div>联系电话:18045576002</div><hr /><div>广场描述:\"位于望奎县东北部，内有橡胶跑道、篮球场，设施齐全</div>",addss: "/client/base/guangchang.png"}
        ]
        //定义商场数组
        ,markerArrshangchang:[
            {title: "黑龙江省鑫缘商都经贸有限公司", point: "126.48,46.83", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:15000</div><hr /><div>可容纳人数:2300</div><hr /><div>所属管辖单位:县非国有经济办</div><hr /><div>负责人:冯永财</div><hr /><div>联系电话:13284046666</div><hr /><div>商场描述:鑫缘商都是现代化商场，融购物餐饮为一体的大型商场，经营项目有：六桂福金店，家用电器，品牌箱包，品牌化妆品，品牌家纺，品牌男女装，休闲系列，高档皮草，玩具卖场。</div>",addss: "/client/base/shangchang.png"},
            {title: "望奎县华晨经贸有限责任公司", point: "126.48,46.83", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:13000</div><hr /><div>可容纳人数:2000</div><hr /><div>所属管辖单位:县非国有经济办</div><hr /><div>负责人:宋环宇</div><hr /><div>联系电话:13304555609</div><hr /><div>广场描述:\"华晨经贸有限责任公司是现代化有限公司，融购物餐饮为一体的大型商场，经营项目有影院、西餐厅、大型电玩城、儿童欢乐场、家用电器，品牌箱包，品牌化妆品，品牌家纺，品牌男女装，休闲系列，高档皮草。</div>",addss: "/client/base/shangchang.png"},
            {title: "望奎县中央商贸有限公司", point: "126.48,46.83", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:2243</div><hr /><div>可容纳人数:1600</div><hr /><div>所属管辖单位:县非国有经济办</div><hr /><div>负责人:范亚君</div><hr /><div>联系电话:15246527171</div><hr /><div>广场描述:中央商贸有限公司主营项目有品牌箱包，品牌化妆品，品牌家纺，品牌男女装，休闲系列服饰。</div>",addss: "/client/base/shangchang.png"},
            {title: "望奎县华鑫商贸有限公司", point: "126.48,46.83", mes: "<div>所属地区:望奎县</div><hr /><div>占地面积（㎡）:1500</div><hr /><div>可容纳人数:1300</div><hr /><div>所属管辖单位:县非国有经济办</div><hr /><div>负责人:翟有辉</div><hr /><div>联系电话:18944625333</div><hr /><div>广场描述:华鑫商贸有限公司主营项目有休闲系列服饰，品牌家纺等。</div>",addss: "/client/base/shangchang.png"}
        ]
        //定义水库数组
        ,markerArrshuiku:[
            {title: "卫星水库", point: "126.3695444,46.86986656", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:望奎县先锋镇坤四村</div><hr /><div>级别:中型</div><hr /><div>总库容(万m3):2034</div><hr /><div>防限库容(万m3):1618</div><hr /><div>防限水位(m):148.2</div><hr /><div>正常蓄水位(m):148.4</div><hr /><div>联系人(m):冯雨春</div><hr /><div>手机:13945557995</div>",addss: "/client/base/shuiku.png"},
            {title: "山头芦水库", point: "126.4282651,46.79191784", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:望奎县先锋镇白四村</div><hr /><div>级别:中型</div><hr /><div>总库容(万m3):2564</div><hr /><div>防限库容(万m3):400</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):146.46</div><hr /><div>联系人(m):宋荣生</div><hr /><div>手机:13836426693</div>",addss: "/client/base/shuiku.png"},
            {title: "敏二水库", point: "126.7073539,46.78130122", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:卫星镇惠二村</div><hr /><div>级别:小型</div><hr /><div>总库容(万m3):309</div><hr /><div>防限库容(万m3):52.9</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):164.35</div><hr /><div>联系人(m):刘伟龙</div><hr /><div>手机:13904555158</div>",addss: "/client/base/shuiku.png"},
            {title: "信三水库", point: "126.7477699,46.84268017", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:灯塔乡信三村</div><hr /><div>级别:小型</div><hr /><div>总库容(万m3):124</div><hr /><div>防限库容(万m3):70.7</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):175.25</div><hr /><div>联系人(m):阚克</div><hr /><div>手机:13555376600</div>",addss: "/client/base/shuiku.png"},
            {title: "后三西水库", point: "126.7843982,46.96436655", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:莲花镇厢黄后三西村</div><hr /><div>级别:小型</div><hr /><div>总库容(万m3):70.18</div><hr /><div>防限库容(万m3):43.2</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):180</div><hr /><div>联系人(m):赵恒久</div><hr /><div>手机:13945532629</div>",addss: "/client/base/shuiku.png"}
        ]

        //定义单位责任人数组
        ,markerArrdanwei:[
            {title: "卫星水库", point: "126.3695444,46.86986656", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:望奎县先锋镇坤四村</div><hr /><div>级别:中型</div><hr /><div>总库容(万m3):2034</div><hr /><div>防限库容(万m3):1618</div><hr /><div>防限水位(m):148.2</div><hr /><div>正常蓄水位(m):148.4</div><hr /><div>联系人(m):冯雨春</div><hr /><div>手机:13945557995</div>",addss: "/client/base/shuiku.png"},
            {title: "山头芦水库", point: "126.4282651,46.79191784", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:望奎县先锋镇白四村</div><hr /><div>级别:中型</div><hr /><div>总库容(万m3):2564</div><hr /><div>防限库容(万m3):400</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):146.46</div><hr /><div>联系人(m):宋荣生</div><hr /><div>手机:13836426693</div>",addss: "/client/base/shuiku.png"},
            {title: "敏二水库", point: "126.7073539,46.78130122", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:卫星镇惠二村</div><hr /><div>级别:小型</div><hr /><div>总库容(万m3):309</div><hr /><div>防限库容(万m3):52.9</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):164.35</div><hr /><div>联系人(m):刘伟龙</div><hr /><div>手机:13904555158</div>",addss: "/client/base/shuiku.png"},
            {title: "信三水库", point: "126.7477699,46.84268017", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:灯塔乡信三村</div><hr /><div>级别:小型</div><hr /><div>总库容(万m3):124</div><hr /><div>防限库容(万m3):70.7</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):175.25</div><hr /><div>联系人(m):阚克</div><hr /><div>手机:13555376600</div>",addss: "/client/base/shuiku.png"},
            {title: "后三西水库", point: "126.7843982,46.96436655", mes: "<div>所属地区:黑龙江省绥化市望奎县</div><hr /><div>地址:莲花镇厢黄后三西村</div><hr /><div>级别:小型</div><hr /><div>总库容(万m3):70.18</div><hr /><div>防限库容(万m3):43.2</div><hr /><div>防限水位:148.2</div><hr /><div>正常蓄水位(m):180</div><hr /><div>联系人(m):赵恒久</div><hr /><div>手机:13945532629</div>",addss: "/client/base/shuiku.png"}
        ]

        //定义基层防御人员数组
        ,markerArrjiceng:[
            {title: "于洪双", point: "126.8228272,46.99877468", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:宽四村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "李英杰", point: "126.8504575,47.05087831", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:宽五东村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "薛威", point: "126.8504576,47.05087833", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:宽五西村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "王树海", point: "126.783765,47.03815785", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:信六村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "齐成武", point: "126.7760992,46.99023512", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:信五村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "王志祥", point: "126.7542343,46.96644171", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:白后头村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "张付余", point: "126.7843682,46.96444655", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:后三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "段树立", point: "126.8582527,46.93098482", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:前二村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "孙长军", point: "126.8588283,46.98371374", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:后二村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县莲花镇</div>",addss: "/client/base/jiceng.png"},
            {title: "王文学", point: "126.5277276,46.71903776", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:正兰二村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "兰予杰", point: "126.5277276,46.71903776", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:正兰三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "杜洪武", point: "126.5591644,46.797859", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:正兰四村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "毛振玉", point: "126.4731168,46.71740008", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:厢红二村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "白凤春", point: "126.4702734,46.78783722", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:厢红三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "王英祥", point: "126.4216725,46.7439522", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:厢白三村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "辛世坤", point: "126.5694222,46.74010395", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:厢兰二村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "李国祥", point: "126.5694374,46.77477551", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:厢兰三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "何诚斌", point: "126.3332167,46.74241457", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:坤后二北村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "肖永秀", point: "126.3241569,46.68361862", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:坤后二南村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "史国田", point: "126.3261817,46.71283375", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:坤后二南北村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县火箭镇</div>",addss: "/client/base/jiceng.png"},
            {title: "李宏伟", point: "126.52159,46.88460277", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:正白前三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "刘春林", point: "126.55757,46.90376669", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:正白前二村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "何明远", point: "126.5624232,46.83444722", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:厢兰四村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "孙连学", point: "126.5724833,46.85505614", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:厢兰五村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "管文涛", point: "126.5993233,46.87860014", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:后水五村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "官波", point: "126.6121072,46.83255105", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:水四村委会</div><hr /><div>职务:村支书</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "刘清泉", point: "126.6192629,46.85419071", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:前水五村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县东郊镇</div>",addss: "/client/base/jiceng.png"},
            {title: "王英博", point: "126.3658967,46.93550186", mes: "<div>区县:后三乡</div><hr /><div>所属单位:正兰后三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县后三乡</div>",addss: "/client/base/jiceng.png"},
            {title: "于洪生", point: "126.372835,46.89981465", mes: "<div>区县:后三乡</div><hr /><div>所属单位:正兰前三村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县后三乡</div>",addss: "/client/base/jiceng.png"},
            {title: "赵纯义", point: "126.373525,46.93459597", mes: "<div>区县:后三乡</div><hr /><div>所属单位:正兰前二村委会</div><hr /><div>职务:会计</div><hr /><div>职责:做好三防职责</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎县后三乡</div>",addss: "/client/base/jiceng.png"}
        ]

        //定义单位责任人数组
        ,markerArrdanwei:[
            {title: "肖淑丽", point: "126.500625,46.841615", mes: "<div>区县:望奎镇</div><hr /><div>所属单位:望奎镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:望奎镇</div><hr /><div>手机号码:13845537798</div><hr /><div>详细地址:黑龙江省绥化市望奎镇</div>",addss: "/client/base/danweiren.png"},
            {title: "车义", point: "126.661111,46.710278", mes: "<div>区县:卫星镇</div><hr /><div>所属单位:卫星镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:卫星镇</div><hr /><div>手机号码:18945348895</div><hr /><div>详细地址:黑龙江省绥化市卫星镇</div>",addss: "/client/base/danweiren.png"},
            {title: "郭雷", point: "126.446111,46.659167", mes: "<div>区县:通江镇</div><hr /><div>所属单位:通江镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:通江镇</div><hr /><div>手机号码:15645555112</div><hr /><div>详细地址:黑龙江省绥化市通江镇</div>",addss: "/client/base/danweiren.png"},
            {title: "王炳楠", point: "126.827778,46.831944", mes: "<div>区县:海丰镇</div><hr /><div>所属单位:海丰镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:海丰镇</div><hr /><div>手机号码:13846776773</div><hr /><div>详细地址:黑龙江省绥化市海丰镇</div>",addss: "/client/base/danweiren.png"},
            {title: "王力", point: "126.380333,46.803333", mes: "<div>区县:先锋镇</div><hr /><div>所属单位:先锋镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:先锋镇</div><hr /><div>手机号码:15214558335</div><hr /><div>详细地址:黑龙江省绥化市先锋镇</div>",addss: "/client/base/danweiren.png"},
            {title: "赵立国", point: "126.668333,47.0575", mes: "<div>区县:惠七镇</div><hr /><div>所属单位:惠七镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:惠七镇</div><hr /><div>手机号码:15046581667</div><hr /><div>详细地址:黑龙江省绥化市惠七镇</div>",addss: "/client/base/danweiren.png"},
            {title: "赵恒久", point: "126.811111,46.99333", mes: "<div>区县:莲花镇</div><hr /><div>所属单位:莲花镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:莲花镇</div><hr /><div>手机号码:13945532627</div><hr /><div>详细地址:黑龙江省绥化市莲花镇</div>",addss: "/client/base/danweiren.png"},
            {title: "韩勇", point: "126.501388,46.7525", mes: "<div>区县:火箭镇</div><hr /><div>所属单位:火箭镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:火箭镇</div><hr /><div>手机号码:18182853889</div><hr /><div>详细地址:黑龙江省绥化市火箭镇</div>",addss: "/client/base/danweiren.png"},
            {title: "陈志鸿", point: "126.54,46.846389", mes: "<div>区县:东郊镇</div><hr /><div>所属单位:东郊镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:东郊镇</div><hr /><div>手机号码:13836459445</div><hr /><div>详细地址:黑龙江省绥化市东郊镇</div>",addss: "/client/base/danweiren.png"},
            {title: "阚克", point: "126.795556,46.905278", mes: "<div>区县:灯塔镇</div><hr /><div>所属单位:灯塔镇政府</div><hr /><div>职务:镇长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:灯塔镇</div><hr /><div>手机号码:18804555567</div><hr /><div>详细地址:黑龙江省绥化市灯塔镇</div>",addss: "/client/base/danweiren.png"},
            {title: "张广学", point: "126.6.9667,46.91944", mes: "<div>区县:厢白乡</div><hr /><div>所属单位:厢白乡政府</div><hr /><div>职务:乡长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:厢白乡</div><hr /><div>手机号码:13089965676</div><hr /><div>详细地址:黑龙江省绥化市厢白乡</div>",addss: "/client/base/danweiren.png"},
            {title: "李天涛", point: "126.881667,47.00444", mes: "<div>区县:东升乡</div><hr /><div>所属单位:东升乡政府</div><hr /><div>职务:乡长</div><hr /><div>职责:做好三防职责</div><hr /><div>负责区域:东升乡</div><hr /><div>手机号码:18746567009</div><hr /><div>详细地址:黑龙江省绥化市东升乡</div>",addss: "/client/base/danweiren.png"}
        ]

        //定义预警信息发布设施数组
        ,markerArrsheshi:[
            {title: "显示屏", point: "126.609667,46.91944", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县厢白满族乡</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.881667,47.00444", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县东升乡</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.795556,46.905278", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县灯塔乡</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.350556,46.925833", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县后三乡</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.455278,46.94", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县灵山满族乡</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.501388,46.7525", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县火箭镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.380333,46.803333", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县先锋镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.668333,47.0527", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县惠七满族镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.811111,46.99333", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县莲花镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.827778,46.831944", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县海丰镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.446111,46.659167", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县通江镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.661111,46.710278", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县卫星镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.54,46.846389", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县东郊镇</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
            {title: "显示屏", point: "126.862778,47.100278", mes: "<div>设备厂家:沈阳恒远通电子有限公司</div><hr /><div>设备类型:户外显示屏</div><hr /><div>安装地址:黑龙江绥化市望奎县恭六乡</div><hr /><div>管理单位:望奎县气象局</div><hr /><div>设备用途:预报预警发布设备</div><hr /><div>联系人:冯晓伟</div><hr /><div>联系电话:13836478828</div>",addss: "/client/base/xianshipin.png"},
        ]

        //定义应急避难场所数组
        ,markerArryingjibinan:[
            {title: "文化广场", point: "126.4700783,46.83855076", mes: "<div>区县:望奎县</div><hr /><div>主管单位:城市管理行政执法局</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县西郊路北</div><hr /><div>面积（㎡）:25000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:唐晓飞</div><hr /><div>手机:18045576002</div>",addss: "/client/base/yingjibinan.png"},
            {title: "林枫广场", point: "126.4973009,46.83760948", mes: "<div>区县:望奎县</div><hr /><div>主管单位:城市管理行政执法局</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县西郊东南路北</div><hr /><div>面积（㎡）:20000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:唐晓飞</div><hr /><div>手机:18045576002</div>",addss: "/client/base/yingjibinan.png"},
            {title: "体育广场", point: "126.4971083,46.84288892", mes: "<div>区县:望奎县</div><hr /><div>主管单位:城市管理行政执法局</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县西郊东北路西</div><hr /><div>面积（㎡）:30000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:唐晓飞</div><hr /><div>手机:18045576002</div>",addss: "/client/base/yingjibinan.png"},
            {title: "东郊中心小学", point: "126.54,46.846389", mes: "<div>区县:望奎县</div><hr /><div>主管单位:东郊镇政府</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县东郊镇政府路北</div><hr /><div>面积（㎡）:12000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:陈志鸿</div><hr /><div>手机:13836459445</div>",addss: "/client/base/yingjibinan.png"},
            {title: "恭六乡乾三后村广场", point: "126.8753634,47.10849752", mes: "<div>区县:望奎县</div><hr /><div>主管单位:恭六乡乾三后村村委会</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县恭六乡乾三后村</div><hr /><div>面积（㎡）:8000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:高亚斌</div><hr /><div>手机:15590994056</div>",addss: "/client/base/yingjibinan.png"},
            {title: "莲花镇信五村广场", point: "126.7760992,46.99023512", mes: "<div>区县:望奎县</div><hr /><div>主管单位:莲花镇信五村村委会</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县莲花镇信五村</div><hr /><div>面积（㎡）:10000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:齐成武</div><hr /><div>手机:15246527050</div>",addss: "/client/base/yingjibinan.png"},
            {title: "灯塔镇政府", point: "126.795556,46.905278", mes: "<div>区县:望奎县</div><hr /><div>主管单位:灯塔镇政府</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县灯塔镇政府</div><hr /><div>面积（㎡）:15000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:阚克</div><hr /><div>手机:18804555567</div>",addss: "/client/base/yingjibinan.png"},
            {title: "海丰镇政府", point: "126.827778,46.831944", mes: "<div>区县:望奎县</div><hr /><div>主管单位:海丰镇政府</div><hr /><div>位置（地址）:黑龙江省绥化市望奎县海丰镇政府</div><hr /><div>面积（㎡）:15000</div><hr /><div>容纳人口(人):4000</div><hr /><div>联系人:王炳楠</div><hr /><div>手机:13846776773</div>",addss: "/client/base/yingjibinan.png"},
        ]

        //定义应急物资储备场所数组
        ,markerArrchubeichagnsuo:[
            {title: "望奎县水务局", point: "126.2810696,46.75676548", mes: "<div>区县:望奎县</div><hr /><div>地址:先锋镇散南村哈达屯</div><hr /><div>单位联系电话:6765105</div><hr /><div>救援物资类型:防汛抗旱物资</div><hr /><div>物资名称:铁线、编织袋、水泵</div><hr /><div>已有物资:铁线、编织袋、水泵</div><hr /><div>数量:铁线5吨、编织袋10万、水泵100</div><hr /><div>数量单位:吨、个、台</div><hr /><div>用途:防汛抗旱救灾</div><hr /><div>应急储备地址:先锋镇散南村哈达屯</div><hr /><div>储备联系人:赵宝军</div><hr /><div>联系人电话:6765105</div>",addss: "/client/base/chubeichangsuo.png"}
        ]

        //定义办公场所数组
        ,markerArrbangong:[
            {title: "望奎县应急办", point: "126.4925009,46.83915948", mes: "<div>所属部门:应急办</div><hr /><div>场所类型:办公室</div><hr /><div>占地面积（㎡）:0</div><hr /><div>工作人员人数:0</div><hr /><div>负责人:陈宝良</div><hr /><div>联系电话:18904852288</div><hr /><div>详细地址:黑龙江省望奎县人民政府</div><hr /><div>场所描述:办公场地是政府办公室合用，人员实政府人员兼职。</div>",addss: "/client/base/bangongchangsuo.png"}
        ]

        //定义区域自动站数组
        // ,markerArrStation:[
        //     {title: "先锋", point: "126.380833333333,46.8033333333333", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4107</div><hr /><div>站址:先锋</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "后三", point: "126.350555555556,46.9258333333333", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4108</div><hr /><div>站址:后三</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:168.3  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "灵山", point: "126.455277777778,46.9344444444444", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4109</div><hr /><div>站址:灵山</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:168.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "通江", point: "126.446111111111,46.6591666666667", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4111</div><hr /><div>站址:通江</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "火箭", point: "126.501388888889,46.8033333333333", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4112</div><hr /><div>站址:火箭</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:180.2  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "东郊", point: "126.54,46.8463888888889", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4113</div><hr /><div>站址:东郊</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:166.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "厢白", point: "126.609166666667,46.9361111111111", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4114</div><hr /><div>站址:厢白</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:175.5 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "惠七", point: "126.668333333333,47.0575", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4115</div><hr /><div>站址:惠七</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:185.0 n</div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "灯塔", point: "126.795555555556,46.9052777777778", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4116</div><hr /><div>站址:灯塔</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:177.1  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "卫星", point: "126.661111111111,46.7102777777778", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4117</div><hr /><div>站址:卫星</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:217.3 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "海丰", point: "126.827777777778,46.8319444444444", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4118</div><hr /><div>站址:海丰</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:216.3 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "莲花", point: "126.811111111111,46.9933333333333", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4119</div><hr /><div>站址:莲花</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:222.2  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "东升", point: "126.881666666667,47.0044444444444", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4120</div><hr /><div>站址:东升</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:207.3 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "恭六", point: "126.862777777778,47.1002777777778", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4121</div><hr /><div>站址:恭六</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:226.1 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "后头东村", point: "126.912222222222,46.9744444444444", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4222</div><hr /><div>站址:后头东村</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:126.1 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"}
        // ]
        //
        // ,markerArrStation:[
        //     {title: "四海店", point: "127.2953,47.2827", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4179</div><hr /><div>站址:四海店</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "双岔河", point: "127.1541,47.2718", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4180</div><hr /><div>站址:双岔河</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:168.3  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "上集", point: "127.1917,47.0905", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4181</div><hr /><div>站址:上集</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:168.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "绥中", point: "127.1755,47.1938", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4182</div><hr /><div>站址:绥中</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "阁山", point: "127.1746,47.1831", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4183</div><hr /><div>站址:阁山</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:180.2  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "克音", point: "127.1010,47.1914", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4184</div><hr /><div>站址:克音</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:166.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "后头", point: "127.0815,47.1032", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4185</div><hr /><div>站址:后头</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:175.5 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "长山", point: "127.2302,47.1305", mes: "<div>县区:望奎县</div><hr /><div>区站号:H4186</div><hr /><div>站址:长山</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:185.0 n</div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "泥尔河", point: "127.1935,47.0542", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4187</div><hr /><div>站址:泥尔河</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:177.1  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "上集红旗水库", point: "127.1536,47.0602", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4191</div><hr /><div>站址:上集红旗水库</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "大兴村", point: "127.1853,47.1238", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4192</div><hr /><div>站址:大兴村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "诺敏河村", point: "127.1831,47.1108", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4193</div><hr /><div>站址:诺敏河村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "幸福村", point: "127.3156,47.2028", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4194</div><hr /><div>站址:幸福村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "跃进村", point: "127.1515,47.0627", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4195</div><hr /><div>站址:跃进村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "光芒村", point: "127.0629,47.1311", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4196</div><hr /><div>站址:光芒村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "红光村", point: "127.0329,47.1113", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4197</div><hr /><div>站址:红光村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "二井村", point: "127.0833,47.1143", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4198</div><hr /><div>站址:二井村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "向荣村", point: "127.1231,47.1912", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4199</div><hr /><div>站址:向荣村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "双泉村", point: "127.2118,47.3158", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4200</div><hr /><div>站址:双泉村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "立新村", point: "127.1855,47.2536", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4201</div><hr /><div>站址:立新村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "永清村", point: "127.2341,47.2008", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4202</div><hr /><div>站址:永清村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "北解村", point: "127.2037,47.2017", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4203</div><hr /><div>站址:北解村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "宋家村", point: "127.1618,47.2119", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4204</div><hr /><div>站址:宋家村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "四海店镇", point: "127.2944,47.2829", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4205</div><hr /><div>站址:四海店镇</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "林富村", point: "127.4531,47.3449", mes: "<div>县区:绥棱县</div><hr /><div>区站号:H4206</div><hr /><div>站址:林富村</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     ]

        // ,markerArrStation:[
        //     {title: "浓河", point: "128.2100,45.5900", mes: "<div>县区:通河县</div><hr /><div>区站号:H0410</div><hr /><div>站址:浓河</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "富林", point: "128.3300,46.0100", mes: "<div>县区:通河县</div><hr /><div>区站号:H0411</div><hr /><div>站址:富林</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:168.3  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "三站", point: "128.5100,46.0100", mes: "<div>县区:通河县</div><hr /><div>区站号:H0412</div><hr /><div>站址:三站</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:168.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "祥顺", point: "129.0700,46.0300", mes: "<div>县区:通河县</div><hr /><div>区站号:H0413</div><hr /><div>站址:祥顺</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //     {title: "乌鸦泡", point: "12.5200,45.5800", mes: "<div>县区:通河县</div><hr /><div>区站号:H0415</div><hr /><div>站址:乌鸦泡</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        // ]

        ,markerArrStation:[
            {title: "锦山", point: "131.4500,47.0300", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2250</div><hr /><div>站址:锦山</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "长安", point: "131.5800,47.0800", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2251</div><hr /><div>站址:长安</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:168.3  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "上街基", point: "131.5300,47.1200", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2252</div><hr /><div>站址:上街基</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:168.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "大榆树", point: "132.0800,47.1700", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2253</div><hr /><div>站址:大榆树</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "向阳川", point: "132.2000,47.1700", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2254</div><hr /><div>站址:向阳川</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "二龙山", point: "132.2900,47.1900", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2255</div><hr /><div>站址:二龙山</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "砚山", point: "132.1000,47.1000", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2256</div><hr /><div>站址:砚山</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:168.3  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "头林", point: "132.1500,47.0300", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2257</div><hr /><div>站址:头林</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:168.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "兴隆岗", point: "132.3400,46.5800", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2258</div><hr /><div>站址:兴隆岗</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
            {title: "宏胜", point: "132.4400,46.5500", mes: "<div>县区:富锦县</div><hr /><div>区站号: H2259</div><hr /><div>站址:宏胜</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        ]

        // ,markerArrStation:[
        //    {title: "玉河", point: "128.2300,45.2200", mes: "<div>县区:延寿县</div><hr /><div>区站号:H0940</div><hr /><div>站址:玉河</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:167.7 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //    {title: "安山", point: "128.3200,45.3000", mes: "<div>县区:延寿县</div><hr /><div>区站号:H0944</div><hr /><div>站址:安山</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:168.3  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //    {title: "开道林场", point: "128.3339,45.2541", mes: "<div>县区:延寿县</div><hr /><div>区站号:H0949</div><hr /><div>站址:开道林场</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:168.4 </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //    {title: "城北", point: "128.1924,45.2841", mes: "<div>县区:延寿县</div><hr /><div>区站号:H0950</div><hr /><div>站址:城北</div><hr /><div>是否考核:否</div><hr /><div>测站海拔高度（m）:172.4  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //    {title: "万宝", point: "128.0491,45.2112", mes: "<div>县区:延寿县</div><hr /><div>区站号:H0951</div><hr /><div>站址:万宝</div><hr /><div>是否考核:是</div><hr /><div>测站海拔高度（m）:180.2  </div><hr /><div>自动站型号:CAWS-600-RT</div><hr /><div>要素数:4</div><hr /><div>安装时间:2011/5/1</div><hr /><div>启用时间:2011/8/1</div>",addss: "/client/base/station16.png"},
        //
        //    ]




        //定义气象预警
        ,markerArrWarn:[
            {title: "寒潮黄色预警", point: "126.492496,46.839156", mes: "<div><div>预计我县24小时内最低气温将要下降10℃以上，最低气温小于等于4℃，陆地平均风力可达6级以上；或者已经下降10℃以上，最低气温小于等于4℃，平均风力达6级以上，并可能持续。</div><hr /><div>望奎县气象局2018年11月5日10时发布</div>",addss: "/client/base/hanchaohuangse.gif"}

        ]

        //单击图层
        ,addClickHandler: (content, marker) => {
            marker.addEventListener("click",function(e){
                active.openInfo(content,e);
            });
        }
        //图层弹框消息
        ,openInfo: (content,e) => {
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMap.InfoWindow(content, active.opts);  // 创建信息窗口对象
            active.map.openInfoWindow(infoWindow, point);
        }

        /**
         * 百度地图初始化
         */
        ,initBMap: (container, initMapHeight) => {
            initMapHeight(container);
            // 百度地图API功能
            active.map = new BMap.Map(container);    // 创建Map实例
            active.map.centerAndZoom(new BMap.Point(127.122496,47.229156), 11);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            active.map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));
            active.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            //设置望奎县边界
            var bdary = new BMap.Boundary();
            bdary.get("佳木斯富锦", function(rs){//获取行政区域
                //BDmap.clearOverlays();        //清除地图覆盖物
                var count = rs.boundaries.length; //行政区域的点有多少个
                if (count === 0) {
                    alert('未能获取当前输入行政区域');
                    return ;
                }
                var pointArray = [];
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 3, fillColor:"",strokeColor: "#ff0000"}); //建立多边形覆盖物
                    active.map.addOverlay(ply);  //添加覆盖物
                    pointArray = pointArray.concat(ply.getPath());
                }
                active.map.setViewport(pointArray);    //调整视野
            });
        }
    }



    /**
     * 点击向右图标
     */
    $("#rightId").bind("click", () => {
        $("#ass").hide();
        //$("#ass").animate({right:'-130px'});
        $("#rightId").hide();
        $("#leftId").show();
    });

    /**
     * 点击向左图标
     */
    $("#leftId").bind("click", () => {
        $("#ass").show();
        //$("#ass").animate({left:'-50px'});
        $("#rightId").show();
        $("#leftId").hide();
    });

    /**
     * 点击历史气象灾情菜单
     */
    let lishiArrayMarker=new Array();
    $("#hisWarnId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/disasterHistory/list", data:{}}, data => {
                data.forEach( json => {
                    let color = json.color.split(",") ,damage = json.damage.split(","), name = json.name.split(",")
                        ,type = json.type.split(",") ,lat = json.lat.split(",")
                        ,lon = json.lon.split(",") ,level = json.level.split(","), scale = json.scale.split(",")
                        ,result = [];

                    for(let i = 0; i<color.length; i++){
                        for(let j = 0; j<lat.length; j++){
                            result.push({
                                code: ""
                                ,color: color[i]
                                ,contact: ""
                                ,damage: damage[i]
                                ,endTime: json.endTime
                                ,id: json.id
                                ,level: level[i]
                                ,lon: lon[j]
                                ,lat: lat[j]
                                ,monitorOrgan: json.monitorOrgan
                                ,monitorPeople: ""
                                ,monitorTime:json.monitorTime
                                ,name: name[i]
                                ,scale: scale[j]
                                ,severity:json.severity
                                ,startTime: json.startTime
                                ,type: type[i]
                            });
                        }
                    }
                    result.forEach(res => {
                        let iconUrl = '/client/base/' + chineseToPinYin(res.name) + '.gif';
                        let mes = '<div>灾害名称:'+res.name+'</div><hr /><div>发生时间:'+res.startTime+'</div><hr /><div>结束时间:'+res.endTime+'</div><hr /><div>影响范围:'+res.scale+'</div><hr /><div>监测单位:'+res.monitorOrgan+'</div><hr /><div>危害程度:'+res.damage+'</div>';
                        let marker = active.marker(iconUrl ,[res.lon , res.lat]
                            ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                        // 将标注添加到地图中
                        active.map.addOverlay(marker);
                        lishiArrayMarker.push(marker);
                        //信息弹出框
                        active.addClickHandler(content,marker);
                    });

                });
            });
        }else{
            $(this).children("input").removeAttr("checked");
            for(let i=0; i<lishiArrayMarker.length; i++){
                active.map.removeOverlay(lishiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击地质灾害隐患点菜单
     */
    let dizhiArrayMarker=new Array();
    $("#dizhizaihaiId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskGeologic/list", data:{}}, data => {
                //{title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
                data.forEach( res => {
                    let iconUrl = '/client/base/dizhizaihai.png';
                    let mes = '<div>气象致灾因子:'+res.weatherCauses+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>街道办:'+res.street+'</div><br />';
                    mes += '<div>地区名称:'+res.name+'</div><br />';
                    mes += '<div>灾害点规模:'+res.scale+'</div><br />';
                    mes += '<div>等级:'+res.level+'</div><br />';
                    mes += '<div>灾害点类型:'+res.type+'</div><br />';
                    mes += '<div>威胁人口:'+res.threadPeople+'</div><br />';
                    mes += '<div>威胁资产:'+res.threadProperty+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    dizhiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });


            // active.markerArrDizhiDisaster.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     dizhiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<dizhiArrayMarker.length;i++){
                active.map.removeOverlay(dizhiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击中小河流洪水菜单
     */
    let heliuHongShuiArrayMarker=new Array();
    $("#zhongxiaoheliuId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskFlood/list", data:{}}, data => {
                console.log(data);
                //{title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
                data.forEach( res => {
                    let iconUrl = '/client/base/zhongxiaoheliu.png';
                    let mes = '<div>河流名称:'+res.name+'</div><br />';
                    mes += '<div>省名称:'+res.province+'</div><br />';
                    mes += '<div>省代码:'+res.provinceCode+'</div><br />';
                    mes += '<div>市名称:'+res.city+'</div><br />';
                    mes += '<div>市代码:'+res.cityCode+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>区县代码:'+res.districtCode+'</div><br />';
                    mes += '<div>管理单位:'+res.monitorOrgan+'</div><br />';
                    mes += '<div>联系人:'+res.monitorPeople+'</div><br />';
                    mes += '<div>防御措施:'+res.measures+'</div><br />';
                    mes += '<div>气象致灾因子:'+res.weatherCauses+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    heliuHongShuiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrHeliuHongShui.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     heliuHongShuiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<heliuHongShuiArrayMarker.length;i++){
                active.map.removeOverlay(heliuHongShuiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击山洪菜单
     */
    let shanhongHongShuiArrayMarker=new Array();
    $("#shanhongId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskMountain/list", data:{}}, data => {
                console.log(data);
                //{title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
                data.forEach( res => {
                    let iconUrl = '/client/base/shanhong.png';
                    let mes = '<div>河流名称:'+res.name+'</div><br />';
                    mes += '<div>省名称:'+res.province+'</div><br />';
                    mes += '<div>省代码:'+res.provinceCode+'</div><br />';
                    mes += '<div>市名称:'+res.city+'</div><br />';
                    mes += '<div>市代码:'+res.cityCode+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>区县代码:'+res.districtCode+'</div><br />';
                    mes += '<div>管理单位:'+res.monitorOrgan+'</div><br />';
                    mes += '<div>联系人:'+res.monitorPeople+'</div><br />';
                    mes += '<div>防御措施:'+res.measures+'</div><br />';
                    mes += '<div>危害等级:'+res.level+'</div><br />';
                    mes += '<div>气象致灾因子:'+res.weatherCauses+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    shanhongHongShuiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrShanHong.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     shanhongHongShuiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<shanhongHongShuiArrayMarker.length;i++){
                active.map.removeOverlay(shanhongHongShuiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击内涝菜单
     */
    let neilaoArrayMarker=new Array();
    $("#neilaoId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskWaterlogging/list", data:{}}, data => {
                console.log(data);
                //{title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
                data.forEach( res => {
                    let iconUrl = '/client/base/neilao.png';
                    let mes = '<div>内涝名称:'+res.name+'</div><br />';
                    mes += '<div>省名称:'+res.province+'</div><br />';
                    mes += '<div>省代码:'+res.provinceCode+'</div><br />';
                    mes += '<div>市名称:'+res.city+'</div><br />';
                    mes += '<div>市代码:'+res.cityCode+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>区县代码:'+res.districtCode+'</div><br />';
                    mes += '<div>管理单位:'+res.monitorOrgan+'</div><br />';
                    mes += '<div>联系人:'+res.monitorPeople+'</div><br />';
                    mes += '<div>开始时间:'+res.startTime+'</div><br />';
                    mes += '<div>结束时间:'+res.endTime+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    neilaoArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrNeiLao.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     neilaoArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<neilaoArrayMarker.length;i++){
                active.map.removeOverlay(neilaoArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击易涝区菜单
     */
    let yilaoArrayMarker=new Array();
    $("#yilaoquId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskWaterloggingArea/list", data:{}}, data => {
                console.log(data);
                //{title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
                data.forEach( res => {
                    let iconUrl = '/client/base/yilaoqu.png';
                    let mes = '<div>内涝名称:'+res.name+'</div><br />';
                    mes += '<div>省名称:'+res.province+'</div><br />';
                    mes += '<div>省代码:'+res.provinceCode+'</div><br />';
                    mes += '<div>市名称:'+res.city+'</div><br />';
                    mes += '<div>市代码:'+res.cityCode+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>区县代码:'+res.districtCode+'</div><br />';
                    mes += '<div>管理单位:'+res.monitorOrgan+'</div><br />';
                    mes += '<div>联系人:'+res.monitorPeople+'</div><br />';
                    mes += '<div>防御措施:'+res.measures+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    yilaoArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrYiLao.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     yilaoArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<yilaoArrayMarker.length;i++){
                active.map.removeOverlay(yilaoArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击陡坡菜单
     */
    let doupoArrayMarker=new Array();
    $("#doupoId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskSlope/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/huapo.png';
                    let mes = '<div>内涝名称:'+res.name+'</div><br />';
                    mes += '<div>省名称:'+res.province+'</div><br />';
                    mes += '<div>省代码:'+res.provinceCode+'</div><br />';
                    mes += '<div>市名称:'+res.city+'</div><br />';
                    mes += '<div>市代码:'+res.cityCode+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>区县代码:'+res.districtCode+'</div><br />';
                    mes += '<div>管理单位:'+res.monitorOrgan+'</div><br />';
                    mes += '<div>联系人:'+res.monitorPeople+'</div><br />';
                    mes += '<div>灾害点规模:'+res.scale+'</div><br />';
                    mes += '<div>稳定性:'+res.stability+'</div><br />';
                    mes += '<div>灾害点类型:'+res.type+'</div><br />';
                    mes += '<div>气象致灾因子:'+res.weatherCauses+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    doupoArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrdoupo.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     doupoArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<doupoArrayMarker.length;i++){
                active.map.removeOverlay(doupoArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击洼地菜单
     */
    let wadiArrayMarker=new Array();
    $("#wadiId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/riskDepression/list", data:{}}, data => {
                console.log(data);
                //{title: "海丰镇恭头一村闫家大窝棚屯", point: "126.8897242556,46.8162732895", mes: "<div>灾害点类型:崩塌</div><hr /><div>区县:绥化市望奎县</div><hr /><div>灾害点规模:小型</div><hr /><div>稳定性:不稳定</div><hr /><div>威胁人口:370</div><hr /><div>威胁资产:20000000</div><hr /><div>气象致灾因子:暴雨</div>",addss: "/client/base/dizhizaihai.png"},
                data.forEach( res => {
                    let iconUrl = '/client/base/wadi.png';
                    let mes = '<div>内涝名称:'+res.name+'</div><br />';
                    mes += '<div>省名称:'+res.province+'</div><br />';
                    mes += '<div>省代码:'+res.provinceCode+'</div><br />';
                    mes += '<div>市名称:'+res.city+'</div><br />';
                    mes += '<div>市代码:'+res.cityCode+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>区县代码:'+res.districtCode+'</div><br />';
                    mes += '<div>管理单位:'+res.monitorOrgan+'</div><br />';
                    mes += '<div>联系人:'+res.monitorPeople+'</div><br />';
                    mes += '<div>灾害点规模:'+res.scale+'</div><br />';
                    mes += '<div>稳定性:'+res.stability+'</div><br />';
                    mes += '<div>灾害点类型:'+res.type+'</div><br />';
                    mes += '<div>气象致灾因子:'+res.weatherCauses+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    wadiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrwadi.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     wadiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<wadiArrayMarker.length;i++){
                active.map.removeOverlay(wadiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击实时灾情菜单
     */
    $("#zaiqingId").bind("click", function(){
        let flag = $(this).data("flag");
        let b  = document.getElementById('myCarousel');
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            b.style.display = "block";
        }else{
            $(this).data("flag",0);
            $(this).children("input").removeAttr("checked");
            b.style.display = "none";
        }
    });

    /**
     * 点击气象灾害影响范围菜单
     */
    let heatmapOverlayBak = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlayBak1 = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlayBak2 = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlayBak3 = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlay1 = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlay2 = new BMapLib.HeatmapOverlay({"radius":20});
    let heatmapOverlay3 = new BMapLib.HeatmapOverlay({"radius":20});
    $("#disasterScopeId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.map.addOverlay(heatmapOverlay);
            // active.map.addOverlay(heatmapOverlay1);
            // active.map.addOverlay(heatmapOverlay2);
            // active.map.addOverlay(heatmapOverlay3);
            heatmapOverlay.setDataSet({data:active.points,max:100});
            // heatmapOverlay1.setDataSet({data:active.points1,max:100});
            // heatmapOverlay2.setDataSet({data:active.points2,max:100});
            // heatmapOverlay3.setDataSet({data:active.points3,max:100});
            heatmapOverlayBak = heatmapOverlay;
            // heatmapOverlayBak1 = heatmapOverlay1;
            // heatmapOverlayBak2 = heatmapOverlay2;
            // heatmapOverlayBak3 = heatmapOverlay3;
        }else{
            $(this).children("input").removeAttr("checked");
            active.map.removeOverlay(heatmapOverlayBak);
            // active.map.removeOverlay(heatmapOverlayBak1);
            // active.map.removeOverlay(heatmapOverlayBak2);
            // active.map.removeOverlay(heatmapOverlayBak3);
            $(this).data("flag","0");
        }
    });

    /**
     * 点击危化品菜单
     */
    let weihuapinArrayMarker=new Array();
    $("#weihuapinId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitDanger/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/weihuapin.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>建筑物:'+res.building+'</div><br />';
                    mes += '<div>储罐个数及容量:'+res.tanks+'</div><br />';
                    mes += '<div>加油机台数:'+res.machine+'</div><br />';
                    mes += '<div>单体数:'+res.number+'</div><br />';
                    mes += '<div>项目:'+res.project+'</div><br />';
                    mes += '<div>产品:'+res.product+'</div><br />';
                    mes += '<div>最新报告编号:'+res.report+'</div><br />';
                    mes += '<div>防雷安全隐患情况:'+res.status+'</div><br />';
                    mes += '<div>防雷所分管领导:'+res.lightningLeader+'</div><br />';
                    mes += '<div>企业防雷安全责任人:'+res.lightningPeople+'</div><br />';
                    mes += '<div>责任人联系电话:'+res.lightningPhone+'</div><br />';
                    mes += '<div>检测片区组长:'+res.testLeader+'</div><br />';
                    mes += '<div>检测片区组员:'+res.testMember+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    weihuapinArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrWeiHuaPin.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     weihuapinArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<weihuapinArrayMarker.length;i++){
                active.map.removeOverlay(weihuapinArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击农业园区菜单
     */
    let nongyeyuanquArrayMarker=new Array();
    $("#nyyqId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitAgriculturPark/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/nongyeyuanqu.png';
                    let mes = '<div>园区名称:'+res.name+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>园区类型:'+res.type+'</div><br />';
                    mes += '<div>占地面积（㎡）:'+res.area+'</div><br />';
                    mes += '<div>园区描述:'+res.description+'</div><br />';
                    mes += '<div>工作人员人数:'+res.worker+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    nongyeyuanquArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrNongYe.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     nongyeyuanquArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<nongyeyuanquArrayMarker.length;i++){
                active.map.removeOverlay(nongyeyuanquArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击农作物种植区菜单
     */
    let nongzuowuArrayMarker=new Array();
    $("#nzwzzId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitPlantArea/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/zhongzhiqu.png';
                    let mes = '<div>种植区名称:'+res.name+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>主要作物:'+res.crops+'</div><br />';
                    mes += '<div>占地面积（㎡）:'+res.area+'</div><br />';
                    mes += '<div>园区描述:'+res.description+'</div><br />';
                    mes += '<div>工作人员人数:'+res.worker+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    nongzuowuArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrNongZuoWu.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     nongzuowuArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<nongzuowuArrayMarker.length;i++){
                active.map.removeOverlay(nongzuowuArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击旅游景区菜单
     */
    let lvyouArrayMarker=new Array();
    $("#lvyouId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitAttractions/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/lvyoujingqu.jpg';
                    let mes = '<div>景区名称:'+res.name+'</div><br />';
                    mes += '<div>区县名称:'+res.district+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>园区类型:'+res.type+'</div><br />';
                    mes += '<div>占地面积（㎡）:'+res.area+'</div><br />';
                    mes += '<div>园区描述:'+res.description+'</div><br />';
                    mes += '<div>可容纳人数:'+res.capacity+'</div><br />';
                    mes += '<div>工作人员人数:'+res.worker+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    lvyouArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrlvyouWu.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     lvyouArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<lvyouArrayMarker.length;i++){
                active.map.removeOverlay(lvyouArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击高速公路菜单
     */
    let gaosuArrayMarker=new Array();
    $("#gaosuId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitHighway/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/gaosu.png';
                    let mes = '<div>高速公路名称:'+res.name+'</div><br />';
                    mes += '<div>高速编号:'+res.code+'</div><br />';
                    mes += '<div>起点:'+res.start+'</div><br />';
                    mes += '<div>终点:'+res.end+'</div><br />';
                    mes += '<div>高速描述:'+res.description+'</div><br />';
                    mes += '<div>省份:'+res.province+'</div><br />';
                    mes += '<div>全长:'+res.length+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    gaosuArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrGaosu.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     gaosuArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<gaosuArrayMarker.length;i++){
                active.map.removeOverlay(gaosuArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });
    /**
     * 点击桥梁菜单
     */
    let qiaoliangArrayMarker=new Array();
    $("#qiaoliangId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitBridge/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/qiaoliang.jpg';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>桥型:'+res.type+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>全长:'+res.length+'</div><br />';
                    mes += '<div>成桥时间:'+res.buildTime+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>描述:'+res.description+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    qiaoliangArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrqiaoliang.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     qiaoliangArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<qiaoliangArrayMarker.length;i++){
                active.map.removeOverlay(qiaoliangArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击堤防菜单
     */
    let difangArrayMarker=new Array();
    $("#difangId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitDike/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/difang.jpg';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>河流:'+res.river+'</div><br />';
                    mes += '<div>防洪标准:'+res.floodPrevention+'</div><br />';
                    mes += '<div>全长:'+res.length+'</div><br />';
                    mes += '<div>高程:'+res.altitude+'</div><br />';
                    mes += '<div>平均堤距:'+res.distance+'</div><br />';
                    mes += '<div>高度:'+res.height+'</div><br />';
                    mes += '<div>宽度:'+res.width+'</div><br />';
                    mes += '<div>堤身土质:'+res.soil+'</div><br />';
                    mes += '<div>堤岸堤坡长度:'+res.slopeLength+'</div><br />';
                    mes += '<div>省份:'+res.province+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    difangArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrdifang.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #ff4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     difangArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<difangArrayMarker.length;i++){
                active.map.removeOverlay(difangArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });
    /**
     * 点击车站菜单
     */
    let chezhanArrayMarker=new Array();
    $("#chezhanId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitStation/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/chezhan.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>面积:'+res.area+'</div><br />';
                    mes += '<div>车辆数:'+res.vehicle+'</div><br />';
                    mes += '<div>可容纳人数:'+res.capacity+'</div><br />';
                    mes += '<div>描述:'+res.description+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    chezhanArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrchezhan.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     chezhanArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<chezhanArrayMarker.length;i++){
                active.map.removeOverlay(chezhanArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击学校菜单
     */
    let xuexiaoArrayMarker=new Array();
    $("#xuexiaoId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitSchool/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/xuexiao.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>类型:'+res.type+'</div><br />';
                    mes += '<div>面积:'+res.area+'</div><br />';
                    mes += '<div>人数:'+res.people+'</div><br />';
                    mes += '<div>描述:'+res.description+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    xuexiaoArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrxuexiao.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     xuexiaoArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<xuexiaoArrayMarker.length;i++){
                active.map.removeOverlay(xuexiaoArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击医院菜单
     */
    let yiyuanArrayMarker=new Array();
    $("#yiyuanId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitHospital/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/yiyuan.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>面积:'+res.area+'</div><br />';
                    mes += '<div>人数:'+res.doctor+'</div><br />';
                    mes += '<div>护士人数:'+res.nurse+'</div><br />';
                    mes += '<div>救护车数量:'+res.ambulance+'</div><br />';
                    mes += '<div>床位数量:'+res.bed+'</div><br />';
                    mes += '<div>描述:'+res.description+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    yiyuanArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArryiyuan.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     yiyuanArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<yiyuanArrayMarker.length;i++){
                active.map.removeOverlay(yiyuanArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });


    /**
     * 点击广场菜单
     */
    let guangchangArrayMarker=new Array();
    $("#guagnchangId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitSquare/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/guangchang.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>面积:'+res.area+'</div><br />';
                    mes += '<div>容纳人数:'+res.capacity+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    guangchangArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrguangchang.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     guangchangArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<guangchangArrayMarker.length;i++){
                active.map.removeOverlay(guangchangArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击商场菜单
     */
    let shangchangArrayMarker=new Array();
    $("#shangchangId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitMarket/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/shangchang.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>面积:'+res.area+'</div><br />';
                    mes += '<div>楼层:'+res.floor+'</div><br />';
                    mes += '<div>商户数量:'+res.merchant+'</div><br />';
                    mes += '<div>容纳人数:'+res.capacity+'</div><br />';
                    mes += '<div>商场描述:'+res.description+'</div><br />';
                    mes += '<div>所属管辖单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    shangchangArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrshangchang.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     shangchangArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<shangchangArrayMarker.length;i++){
                active.map.removeOverlay(shangchangArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击水库菜单
     */
    let shuikuArrayMarker=new Array();
    $("#shuikuId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/unitReservoir/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/shuiku.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>地区:'+res.district+'</div><br />';
                    mes += '<div>地区编码:'+res.districtCode+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>总库容(万m3):'+res.storage+'</div><br />';
                    mes += '<div>防限库容(万m3):'+res.limitStorage+'</div><br />';
                    mes += '<div>防限水位(m):'+res.waterLimit+'</div><br />';
                    mes += '<div>正常蓄水位(m):'+res.waterNormal+'</div><br />';
                    mes += '<div>有无水位:'+res.waterLine+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    shuikuArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrshuiku.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     shuikuArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<shuikuArrayMarker.length;i++){
                active.map.removeOverlay(shuikuArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击基层防御人员菜单
     */
    let jicengArrayMarker=new Array();
    $("#jicengPeopleId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/user/list", data:{type:2,channelName:"短信"}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/jiceng.png';
                    let sex="";
                    if(res.sex==1){
                        sex="男"
                    }else{
                        sex="女"
                    }
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>性别:'+sex+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>年龄:'+res.age+'</div><br />';
                    mes += '<div>职务:'+res.job+'</div><br />';
                    mes += '<div>职责:'+res.duties+'</div><br />';
                    mes += '<div>领导:'+res.leader+'</div><br />';
                    mes += '<div>机构名称:'+res.organizationName+'</div><br />';
                    mes += '<div>联系电话:'+res.code+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.longitude , res.latitude]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    jicengArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrjiceng.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     jicengArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<jicengArrayMarker.length;i++){
                active.map.removeOverlay(jicengArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击单位人员菜单
     */
    let danweiArrayMarker=new Array();
    $("#danweiPeopleId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/user/list", data:{type:1,channelName:"短信"}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/danweiren.png';
                    if(res.sex==1){
                        sex="男"
                    }else{
                        sex="女"
                    }
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>性别:'+sex+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>年龄:'+res.age+'</div><br />';
                    mes += '<div>职务:'+res.job+'</div><br />';
                    mes += '<div>职责:'+res.duties+'</div><br />';
                    mes += '<div>机构名称:'+res.organizationName+'</div><br />';
                    mes += '<div>联系电话:'+res.code+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.longitude , res.latitude]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    danweiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });


            // active.markerArrdanwei.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     danweiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<danweiArrayMarker.length;i++){
                active.map.removeOverlay(danweiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击预警信息发布菜单
     */
    let sheshiArrayMarker=new Array();
    $("#xianshipinId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/facilityPublish/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/xianshipin.png';
                    let status="";
                    if(res.status==1){
                        status="部署"
                    }else{
                        status="未部署"
                    }
                    let mes = '<div>设备名称:'+res.name+'</div><br />';
                    mes += '<div>设备编号:'+res.code+'</div><br />';
                    mes += '<div>设备厂家:'+res.factory+'</div><br />';
                    mes += '<div>设备类型:'+res.type+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>设备用途:'+res.use+'</div><br />';
                    mes += '<div>设备状态:'+status+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    sheshiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrsheshi.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     sheshiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<sheshiArrayMarker.length;i++){
                active.map.removeOverlay(sheshiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击避难设施菜单
     */
    let binanArrayMarker=new Array();
    $("#yingjibinanId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/facilityShelter/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/yingjibinan.png';
                    let mes = '<div>设备名称:'+res.name+'</div><br />';
                    mes += '<div>区县:'+res.district+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>地区编码:'+res.code+'</div><br />';
                    mes += '<div>容纳人口（人）:'+res.capacity+'</div><br />';
                    mes += '<div>面积（㎡）:'+res.area+'</div><br />';
                    mes += '<div>主管单位:'+res.unit+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.tel+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    binanArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArryingjibinan.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     binanArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<binanArrayMarker.length;i++){
                active.map.removeOverlay(binanArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击物资储备菜单
     */
    let chubeiArrayMarker=new Array();
    $("#wuzichubeiId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/facilitySupply/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/chubeichangsuo.png';
                    let mes = '<div>名称:'+res.name+'</div><br />';
                    mes += '<div>区县:'+res.district+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>地区编码:'+res.code+'</div><br />';
                    mes += '<div>救援物资类型:'+res.type+'</div><br />';
                    mes += '<div>已有物资:'+res.existing+'</div><br />';
                    mes += '<div>已有物资规格型号:'+res.model+'</div><br />';
                    mes += '<div>数量:'+res.amount+'</div><br />';
                    mes += '<div>用途:'+res.use+'</div><br />';
                    mes += '<div>主管单位:'+res.unit+'</div><br />';
                    mes += '<div>单位联系电话:'+res.tel+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    chubeiArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });
            // active.markerArrchubeichagnsuo.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     chubeiArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<chubeiArrayMarker.length;i++){
                active.map.removeOverlay(chubeiArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击办公场所菜单
     */
    let bangongArrayMarker=new Array();
    $("#bangongId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.render({type:"GET", url: "/client/facilityOffice/list", data:{}}, data => {
                console.log(data);
                data.forEach( res => {
                    let iconUrl = '/client/base/bangongchangsuo.png';
                    let mes = '<div>办公场所名称:'+res.name+'</div><br />';
                    mes += '<div>场所类型:'+res.type+'</div><br />';
                    mes += '<div>地址:'+res.address+'</div><br />';
                    mes += '<div>描述:'+res.description+'</div><br />';
                    mes += '<div>占地面积（㎡）:'+res.area+'</div><br />';
                    mes += '<div>工作人员人数:'+res.worker+'</div><br />';
                    mes += '<div>负责人:'+res.principal+'</div><br />';
                    mes += '<div>联系电话:'+res.phone+'</div><br />';
                    let marker = active.marker(iconUrl ,[res.lon , res.lat]
                        ,content = '<span style="font-size: 20px;color: #FF4500;">' +  res.name + '</span>'  +'<br/>'+ mes);
                    // 将标注添加到地图中
                    active.map.addOverlay(marker);
                    bangongArrayMarker.push(marker);
                    //信息弹出框
                    active.addClickHandler(content,marker);
                });
            });

            // active.markerArrbangong.forEach( json => {
            //     //设置经纬度
            //     let jingwei = json.point.split(",");
            //     let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
            //         imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
            //     });
            //     let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
            //     let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
            //     // 将标注添加到地图中
            //     active.map.addOverlay(marker);
            //     bangongArrayMarker.push(marker);
            //     //信息弹出框
            //     active.addClickHandler(content,marker);
            // });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<bangongArrayMarker.length;i++){
                active.map.removeOverlay(bangongArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });


    /**
     * 点击自动站菜单
     */
    let stationArrayMarker=new Array();
    $("#stationId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
             $(this).children("input").prop("checked","checked");
            active.markerArrStation.forEach( json => {
                //设置经纬度
                let jingwei = json.point.split(",");
                let myIcon = new BMap.Icon(json.addss, new BMap.Size(38.4,31.2),{
                    imageSize: new BMap.Size(38.4,31.2) // 引用图片实际大小
                });
                let marker = new BMap.Marker(new BMap.Point(jingwei[0],jingwei[1]),{icon: myIcon});  // 创建标注
                let content = '<span style="font-size: 20px;color: #FF4500;">' +  json.title + '</span>'  +'<br/>'+ json.mes;
                // 将标注添加到地图中
                active.map.addOverlay(marker);
                stationArrayMarker.push(marker);
                //信息弹出框
                active.addClickHandler(content,marker);
            });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<stationArrayMarker.length;i++){
                active.map.removeOverlay(stationArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击雷达菜单
     */
    // let radarptflag = 0;
    $("#radarPTId").bind("click", function(){
        let b  = document.getElementById('radarptpopup');
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            b.style.display = "block";
        }else{
            $(this).data("flag",0);
            $(this).children("input").removeAttr("checked");
            b.style.display = "none";
        }
        // let a = document.getElementById('radarPTId');
        // a.onclick = function(){
        // if( radarptflag == 1 ){
        //     b.style.display = "none";
        //     radarptflag = 0;
        // }else{
        //     b.style.display = "block";
        //     radarptflag = 1;
        // }
        // }
    });

    /**
     * 点击气象预警菜单
     */
    let warnArrayMarker=new Array();
    $("#warnId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0"){
            $(this).data("flag",1);
            $(this).children("input").prop("checked","checked");
            active.markerArrWarn.forEach( json => {
                active.render({type:"GET", url: "/client/warn/edit/info", data:{}}, data => {
                    console.log(data);
                    data.forEach( json => {
                        let color="";
                        let colorname="";
                        if(json.disasterColor==0){
                            color="hongse";
                            colorname="红色"
                        }else if(json.disasterColor==1){
                            color="chengse";
                            colorname="橙色"
                        }else if(json.disasterColor==2){
                            color="huangse";
                            colorname="黄色"
                        }else if(json.disasterColor==3){
                            color="lanse";
                            colorname="蓝色"
                        }
                        let mes = '<div><div>'+json.content+'</div><hr /><div>望奎县气象局'+json.sendTime+'发布</div>';
                        let marker = active.marker('/client/base/'+chineseToPinYin(json.disasterName)+color+'.gif',[json.longitude , json.latitude]
                            ,content = '<span style="font-size: 20px;color: #FF4500;">' +  json.disasterName + colorname+'预警'+'</span>'  +'<br/>'+ mes);
                        // 将标注添加到地图中
                        active.map.addOverlay(marker);
                        warnArrayMarker.push(marker);
                        //信息弹出框
                        active.addClickHandler(content,marker);
                    });
                });
            });
        }else{
            $(this).children("input").removeAttr("checked");
            for(var i=0;i<warnArrayMarker.length;i++){
                active.map.removeOverlay(warnArrayMarker[i]);
            }
            $(this).data("flag","0");
        }
    });

    /**
     * 点击气象服务产品菜单
     */
    let serviceptflag = 0;
    $("#serviceProductId").bind("click", function(){
        let flag = $(this).data("flag");
        if(flag=="0") {
            $(this).data("flag", 1);
            $(this).children("input").prop("checked","checked");
            active.render({type: "GET", url: "/client/serverProduct/selectList", data: {}}, data => {
                let html = "";
                html += "<ul >";
                data.forEach(json => {
                    let path = "/client" + json.path;
                    html += "<li style='border:1px solid #fff;text-align: left;color:white;font-size:12px;'><a href='" + path + "'>" + json.title + "</a></li>";
                });
                html += "</ul >";
                $("#dizhiId").empty().append(html);
                $("#dizhiId").show();
            });
        }else{
            $(this).children("input").removeAttr("checked");
            $(this).data("flag","0");
            $("#dizhiId").hide();
        }


        // let a = document.getElementById('serviceProductId');
        // a.onclick = function(){
        //     let b  = document.getElementById('dizhiId');
        //     if( serviceptflag == 1 ){
        //         b.style.display = "none";
        //         serviceptflag = 0;
        //     }else{
        //         b.style.display = "block";
        //         serviceptflag = 1;
        //     }
        // }
    });

    /**
     * 打开服务产品材料
     */
    $("#productId").bind("click", function(){
        window.location.href="/client/standard/download?url="+ "/base-file/望奎县气象局决策服务第1期.doc";
    });
    $("#productId1").bind("click", function(){
        window.location.href="/client/standard/download?url="+ "/base-file/决策服务信息第12期.doc";
    });
    $("#productId2").bind("click", function(){
        window.location.href="/client/standard/download?url="+ "/base-file/重大气象服务信息第7期.doc";
    });
    $("#productId3").bind("click", function(){
        window.location.href="/client/standard/download?url="+ "/base-file/望奎县气象灾害预警信号_2018110310_寒潮蓝色预警.doc";
    });



    /**
     *
     * 初始化地图
     * @param bdMap:地图容器
     *  @param initMapHeight：地图容器高度自适应界面
     */
    active.initBMap("bdMap", active.initMapHeight);
});

