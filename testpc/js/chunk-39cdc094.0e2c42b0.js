(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39cdc094"],{"1c70":function(t,e,a){"use strict";a.d(e,"b",(function(){return l})),a.d(e,"a",(function(){return r})),a.d(e,"d",(function(){return n})),a.d(e,"c",(function(){return o}));var i=a("b5c6"),s="/tmlms/orgRelation";function l(t){return Object(i["a"])({url:"".concat(s,"/getPage"),method:"get",params:t})}function r(t){return Object(i["a"])({url:"".concat(s,"/create"),method:"post",data:t})}function n(t){return Object(i["a"])({url:"".concat(s,"/edit"),method:"post",data:t})}function o(t){return Object(i["a"])({url:"".concat(s,"/remove/").concat(t),method:"post"})}},"2ef1":function(t,e,a){"use strict";a("d29e")},"543c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ship-manage-container",staticStyle:{"min-width":"1200px"}},[a("div",[a("h1",{staticClass:"chart-title"},[t._v("海洋捕捞渔船管理统计墙")]),a("h6",{staticClass:"chart-time"},[t._v("数据更新时间："+t._s(t.time))]),a("div",{staticClass:"select-wrapper"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{staticStyle:{width:"180px"}},[a("el-cascader",{attrs:{placeholder:"",options:t.orgList,props:t.areaListProps,"change-on-select":"",disabled:t.disabled},on:{change:t.changeOrg},model:{value:t.areaValue,callback:function(e){t.areaValue=e},expression:"areaValue"}})],1)],1)],1)]),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"chart-bg panel"},[a("el-row",[a("el-col",{staticClass:"number-wrapper",attrs:{span:4}},[a("div",{staticClass:"font-yellow"},[t._v("8888")]),a("div",{staticClass:"font-text"},[t._v("船员总数")])]),a("el-col",{staticClass:"number-wrapper",attrs:{span:4}},[a("div",{staticClass:"font-yellow"},[t._v("8888")]),a("div",{staticClass:"font-text"},[t._v("渔船总数")])]),a("el-col",{staticClass:"number-wrapper",attrs:{span:4}},[a("div",{staticClass:"font-yellow"},[t._v("8888")]),a("div",{staticClass:"font-text"},[t._v("基层数")])]),a("el-col",{staticClass:"number-wrapper",attrs:{span:4}},[a("div",{staticClass:"font-yellow"},[t._v("8888")]),a("div",{staticClass:"font-text"},[t._v("村组织数")])]),a("el-col",{staticClass:"number-wrapper",attrs:{span:4}},[a("div",{staticClass:"font-yellow"},[t._v("8888")]),a("div",{staticClass:"font-text"},[t._v("渔港总数")])]),a("el-col",{staticClass:"number-wrapper",attrs:{span:4}},[a("div",{staticClass:"font-yellow"},[t._v("8888")]),a("div",{staticClass:"font-text"},[t._v("码头总数")])])],1),a("div",{staticClass:"panel-footer"})],1)])],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("进出港统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"inAndOut"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("基层情况统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"baseLevel"}}),a("div",{staticClass:"panel-footer"})])])],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船事故违规统计")])]),a("div",{style:{width:"100%",height:"636px"},attrs:{id:"accident"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:16}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船健康档案")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"healthy"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船检验数据统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipCheckout"}}),a("div",{staticClass:"panel-footer"})])])],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("勘验报告")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipTest"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船隐患排查")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipDanger"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("船龄统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipAge"}}),a("div",{staticClass:"panel-footer"})])])],1)],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船分类统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipKind"}}),a("div",{staticClass:"panel-footer"})])])],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("船长数据占比分类")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"captain"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("功率数据占比分类")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"power"}}),a("div",{staticClass:"panel-footer"})])])],1)],1),a("el-col",{attrs:{span:16}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("船员基本统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:""}}),a("div",{staticClass:"panel-footer"})]),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("劳动合同状态分布")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"contract"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("职务船员数量统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipInfo"}}),a("div",{staticClass:"panel-footer"})])])],1)],1),a("el-col",{attrs:{span:8}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("船员年龄分布统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipAgeInfo"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("船员籍贯分布统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipAddressInfo"}}),a("div",{staticClass:"panel-footer"})])])],1)],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船保险统计")])]),a("div",{style:{width:"100%",height:"637px"},attrs:{id:"insurance"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:16}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船交易数据统计")])]),a("div",{style:{width:"100%",height:"637px"},attrs:{id:"transaction"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:8}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船钓具流转统计")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"toolCirculation"}}),a("div",{staticClass:"panel-footer"})])]),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"chart-bg panel"},[a("div",[a("h2",[t._v("渔船交易用图")])]),a("div",{style:{width:"100%",height:"280px"},attrs:{id:"shipTransaction"}}),a("div",{staticClass:"panel-footer"})])])],1)],1)],1)],1)],1)],1)},s=[],l=(a("3139"),a("c1df")),r=a.n(l),n=a("1c70"),o={data:function(){return{time:"",areaListProps:{value:"id",label:"orgRelationName",children:"children"},disabled:!1,orgList:[],levelShow:!1,villageId:"",areaValue:[],levelList:[]}},mounted:function(){this.getPageArea(),this.getTime(),this.setEchart()},methods:{getTime:function(){this.time=r()().format("lll")},getPageArea:function(){var t=this;Object(n["b"])({current:1,size:100}).then((function(e){var a=e.data;0===a.code&&(t.orgList=a.data.records,t.areaValue=[t.orgList[0].id])}))},changeOrg:function(){},onChangeLevel:function(){},echartInAndOut:function(){var t={tooltip:{trigger:"axis"},legend:{data:["进港","出港"],textStyle:{color:"#ffffff"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:["2015","2016","2017","2018","2019","2020","2021"],axisLabel:{color:"rgba(255,255,255,.7)",interval:0},axisLine:{show:!1}},yAxis:{type:"value",axisLabel:{color:"rgba(255,255,255,.7)"},splitLine:{lineStyle:{color:"#012f4a"}}},series:[{name:"进港",type:"line",data:[120,232,101,134,90,230,210]},{name:"出港",type:"line",data:[220,182,191,234,290,330,310]}]};this.inAndOut=this.$echarts.init(document.getElementById("inAndOut")),this.inAndOut.setOption(t)},echartBaseLevel:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",left:10,data:["直达","营销广告","搜索引擎","邮件营销","联盟广告","视频广告","百度","谷歌","必应","其他"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",selectedMode:"single",radius:[0,"30%"],label:{position:"inner"},labelLine:{show:!1},data:[{value:335,name:"直达",selected:!0},{value:679,name:"营销广告"},{value:1548,name:"搜索引擎"}]},{name:"访问来源",type:"pie",radius:["40%","55%"],label:{formatter:"{b}  ",backgroundColor:"transparent",borderColor:"transparent",borderWidth:1,borderRadius:4,rich:{a:{color:"#999",lineHeight:22,align:"center"},hr:{borderColor:"#aaa",width:"100%",borderWidth:.5,height:0},b:{fontSize:16,lineHeight:33},per:{color:"#eee",backgroundColor:"#334455",padding:[2,4],borderRadius:2}}},data:[{value:335,name:"直达"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1048,name:"百度"},{value:251,name:"谷歌"},{value:147,name:"必应"},{value:102,name:"其他"}]}]};this.baseLevel=this.$echarts.init(document.getElementById("baseLevel")),this.baseLevel.setOption(t)},echartAccident:function(){},echartHealthy:function(){var t={dataset:{source:[["score","amount","product"],[89.3,8212,"健康"],[57.1,8254,"亚健康"],[74.4,1032,"不健康"]]},xAxis:{name:"amount",axisLabel:{color:"#fff",interval:0}},yAxis:{type:"category",axisLabel:{color:"#fff",interval:0}},series:[{type:"bar",encode:{x:"amount",y:"product"}}]};this.healthy=this.$echarts.init(document.getElementById("healthy")),this.healthy.setOption(t)},echartShipCheckout:function(){var t={xAxis:{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLabel:{color:"#fff",interval:0}},yAxis:{type:"value",axisLabel:{color:"#fff",interval:0}},series:[{data:[820,932,901,934,1290,1330,1320],type:"line",areaStyle:{}}]};this.shipCheckout=this.$echarts.init(document.getElementById("shipCheckout")),this.shipCheckout.setOption(t)},echartViolation:function(){var t={tooltip:{trigger:"axis"},legend:{textStyle:{color:"#ffffff"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:["2015","2016","2017","2018","2019","2020","2021"],axisLabel:{color:"rgba(255,255,255,.7)",interval:0},axisLine:{show:!1}},yAxis:{type:"value",axisLabel:{color:"rgba(255,255,255,.7)"},splitLine:{lineStyle:{color:"#012f4a"}}},series:[{type:"line",data:[120,232,101,134,90,230,210]}]};this.violation=this.$echarts.init(document.getElementById("violation")),this.violation.setOption(t)},echartShipTest:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["直接访问","邮件营销","联盟广告","视频广告"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"30",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"}]}]};this.shipTest=this.$echarts.init(document.getElementById("shipTest")),this.shipTest.setOption(t)},echartShipDanger:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["直接访问","邮件营销","联盟广告","视频广告"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"30",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"}]}]};this.shipDanger=this.$echarts.init(document.getElementById("shipDanger")),this.shipDanger.setOption(t)},echartShipAge:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["直接访问","邮件营销","联盟广告","视频广告"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"30",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"}]}]};this.shipAge=this.$echarts.init(document.getElementById("shipAge")),this.shipAge.setOption(t)},echartShipKind:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};this.shipKind=this.$echarts.init(document.getElementById("shipKind")),this.shipKind.setOption(t)},echartCaptain:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",show:!1,data:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};this.captain=this.$echarts.init(document.getElementById("captain")),this.captain.setOption(t)},echartPower:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",show:!1,data:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}],emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};this.power=this.$echarts.init(document.getElementById("power")),this.power.setOption(t)},echartShipInfo:function(){var t={color:["#3398DB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisTick:{alignWithLabel:!0},axisLabel:{color:"#fff",interval:0}}],yAxis:[{type:"value",axisLabel:{color:"#fff",interval:0}}],series:[{name:"直接访问",type:"bar",barWidth:"60%",data:[10,52,200,334,390,330,220]}]};this.shipInfo=this.$echarts.init(document.getElementById("shipInfo")),this.shipInfo.setOption(t)},echartShipAgeInfo:function(){var t={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left",data:["直接访问","邮件营销","联盟广告","视频广告"],textStyle:{color:"#ffffff"}},series:[{name:"访问来源",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"30",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"}]}]};this.shipAgeInfo=this.$echarts.init(document.getElementById("shipAgeInfo")),this.shipAgeInfo.setOption(t)},echartShipAddressInfo:function(){var t={color:["#006cff","#60cda0","#ed8884","#ff9f7f","#0096ff","#9fe6b8","#32c5e9","#1d9dff","#ffeb7b"],tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{left:"center",top:"bottom",textStyle:{color:"#ffffff"},icon:"rect",itemWidth:5,itemHeight:5,data:["rose1","rose2","rose3","rose4","rose5","rose6","rose7","rose8"]},series:[{name:"渔船检验数据统计",type:"pie",radius:["10%","60%"],center:["50%","42%"],roseType:"area",data:[{value:10,name:"rose1"},{value:5,name:"rose2"},{value:15,name:"rose3"},{value:25,name:"rose4"},{value:20,name:"rose5"},{value:35,name:"rose6"},{value:30,name:"rose7"},{value:40,name:"rose8"}],label:{fontSize:10},labelLine:{length:10,length2:10}}]};this.shipAddressInfo=this.$echarts.init(document.getElementById("shipAddressInfo")),this.shipAddressInfo.setOption(t)},echartContract:function(){var t=["#1089E7","#F57474","#56D0E3","#F8B448","#8B78F6","#1089E7"],e={grid:{top:"10%",left:"25%",bottom:"10%"},xAxis:{show:!1},yAxis:[{show:!0,data:["未通过审核","合同成立","合同纠纷","合同解除","合同过期","未签纸质合同"],inverse:!0,axisLine:{show:!1},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#fff",padding:5,rich:{lg:{backgroundColor:"#339911",color:"#fff",borderRadius:15,align:"center",width:15,height:15}}}},{show:!1,inverse:!0,data:["未通过审核","合同成立","合同纠纷","合同解除","合同过期","未签纸质合同"]}],series:[{name:"条",type:"bar",yAxisIndex:0,data:[100,100,100,100,100,100],barCategoryGap:50,barWidth:10,itemStyle:{normal:{barBorderRadius:20,color:function(e){var a=t.length;return t[e.dataIndex%a]}}},label:{normal:{show:!0,position:"inside",formatter:"{c}%"}}}]};this.contract=this.$echarts.init(document.getElementById("contract")),this.contract.setOption(e)},echartInsurance:function(){var t={tooltip:{trigger:"axis"},legend:{data:["进港","出港"],textStyle:{color:"#ffffff"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:["2015","2016","2017","2018","2019","2020","2021"],axisLabel:{color:"rgba(255,255,255,.7)",interval:0},axisLine:{show:!1}},yAxis:{type:"value",axisLabel:{color:"rgba(255,255,255,.7)"},splitLine:{lineStyle:{color:"#012f4a"}}},series:[{name:"进港",type:"line",data:[120,232,101,134,90,230,210]},{name:"出港",type:"line",data:[220,182,191,234,290,330,310]}]};this.insurance=this.$echarts.init(document.getElementById("insurance")),this.insurance.setOption(t)},echartTransaction:function(){var t={legend:{textStyle:{color:"#ffffff"}},tooltip:{},dataset:{dimensions:["product","2015","2016","2017"],source:[{product:"Matcha Latte",2015:43.3,2016:85.8,2017:93.7},{product:"Milk Tea",2015:83.1,2016:73.4,2017:55.1},{product:"Cheese Cocoa",2015:86.4,2016:65.2,2017:82.5},{product:"Walnut Brownie",2015:72.4,2016:53.9,2017:39.1}]},xAxis:{type:"category",axisLabel:{color:"#fff",interval:0}},yAxis:{axisLabel:{color:"#fff",interval:0}},series:[{type:"bar"},{type:"bar"},{type:"bar"}]};this.transaction=this.$echarts.init(document.getElementById("transaction")),this.transaction.setOption(t)},echartToolCirculation:function(){var t={legend:{data:["利润","支出","收入"],textStyle:{color:"#ffffff"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"value",axisLabel:{color:"#fff",interval:0}}],yAxis:[{type:"category",axisTick:{show:!1},data:["周一","周二","周三","周四","周五","周六","周日"],axisLabel:{color:"#fff",interval:0}}],series:[{name:"利润",type:"bar",label:{show:!0,position:"inside"},data:[200,170,240,244,200,220,210]},{name:"收入",type:"bar",stack:"总量",label:{show:!0},data:[320,302,341,374,390,450,420]},{name:"支出",type:"bar",stack:"总量",label:{show:!0,position:"left"},data:[-120,-132,-101,-134,-190,-230,-210]}]};this.toolCirculation=this.$echarts.init(document.getElementById("toolCirculation")),this.toolCirculation.setOption(t)},echartShipTransaction:function(){var t={legend:{data:["邮件营销","联盟广告","视频广告","直接访问","搜索引擎"],textStyle:{color:"#ffffff"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["周一","周二","周三","周四","周五","周六","周日"],axisLabel:{color:"#fff",interval:0}}],yAxis:[{type:"value",axisLabel:{color:"#fff",interval:0}}],series:[{name:"邮件营销",type:"line",stack:"总量",areaStyle:{},data:[120,132,101,134,90,230,210]},{name:"联盟广告",type:"line",stack:"总量",areaStyle:{},data:[220,182,191,234,290,330,310]},{name:"视频广告",type:"line",stack:"总量",areaStyle:{},data:[150,232,201,154,190,330,410]},{name:"直接访问",type:"line",stack:"总量",areaStyle:{},data:[320,332,301,334,390,330,320]},{name:"搜索引擎",type:"line",stack:"总量",label:{normal:{show:!0,position:"top"}},areaStyle:{},data:[820,932,901,934,1290,1330,1320]}]};this.shipTransaction=this.$echarts.init(document.getElementById("shipTransaction")),this.shipTransaction.setOption(t)},setEchart:function(){this.echartInAndOut(),this.echartBaseLevel(),this.echartAccident(),this.echartHealthy(),this.echartShipCheckout(),this.echartShipTest(),this.echartShipDanger(),this.echartShipAge(),this.echartShipKind(),this.echartShipInfo(),this.echartShipAgeInfo(),this.echartShipAddressInfo(),this.echartCaptain(),this.echartPower(),this.echartContract(),this.echartInsurance(),this.echartTransaction(),this.echartToolCirculation(),this.echartShipTransaction()}}},c=o,h=(a("2ef1"),a("2877")),d=Object(h["a"])(c,i,s,!1,null,"1638c8c8",null);e["default"]=d.exports},d29e:function(t,e,a){}}]);