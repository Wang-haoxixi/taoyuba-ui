(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b55e6718"],{"2fa0":function(t,a,e){"use strict";e("f0b1")},"46de":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"statisrics"}},[e("basic-container",[e("page-header",{attrs:{title:"职务船员统计"}},[e("operation-container",[e("template",{slot:"left"},[e("el-row",{staticClass:"choice-position"},[e("el-col",{attrs:{span:12}},[e("span",[t._v("职位船员选择:")])]),e("el-col",{attrs:{span:12}},[e("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position",size:"medium"},on:{change:t.changePosition},model:{value:t.positionId,callback:function(a){t.positionId=a},expression:"positionId"}})],1)],1)],1)],2)],1),e("el-row",[e("el-col",{attrs:{span:12}},[e("div",{staticClass:"chart-bg panel"},[e("h2",[t._v("职务船员工资统计")]),e("div",{staticClass:"draw-wrap",attrs:{id:"salaryTotal"}}),e("div",{staticClass:"panel-footer"})]),e("div",{staticClass:"chart-bg panel"},[e("h2",[t._v("职务船员年龄分布")]),e("div",{staticClass:"draw-wrap",attrs:{id:"ageTotal"}}),e("div",{staticClass:"panel-footer"})])]),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"chart-bg panel"},[e("h2",[t._v("劳动合同状态统计")]),e("div",{staticClass:"draw-wrap",attrs:{id:"contractToal"}}),e("div",{staticClass:"panel-footer"})]),e("div",{staticClass:"chart-bg panel"},[e("h2",[t._v("职务船员籍贯分布")]),e("div",{staticClass:"draw-wrap",attrs:{id:"provinceTotal"}}),e("div",{staticClass:"panel-footer"})])])],1)],1)],1)},r=[],o=(e("a481"),e("96cf"),e("1da1")),i=(e("c5f6"),e("7f7f"),e("456d"),e("ac6a"),e("be94")),c=e("2f62"),s=e("a19d"),l=e("23d6"),d=(e("3139"),{data:function(){return{positionId:"1",chartData:[],certTitle:[],certTitleName:[],certTitleNum:[],province:[],getProvince:[],localProvince:[],salary:[],salaryName:["10K以下","10~12","12~15","15~20","20以上"],salaryValue:[],shipName:[],shipValue:[],age:[],contract:[],contractStatus:[],contractNum:[],provinceTotal:"",ageTotal:"",salaryTotal:"",contractToal:"",mapChina:"",shipAge:"",screenWidth:document.documentElement.clientWidth,screenHeight:document.documentElement.clientHeight,statusDict:[{lable:"",value:"全部"},{lable:0,value:"未审核"},{lable:1,value:"合同成立"},{lable:2,value:"未通过审核"},{lable:3,value:"合同纠纷"},{lable:4,value:"合同解除"},{lable:5,value:"合同过期"},{lable:6,value:"未签纸质合同"}]}},computed:Object(i["a"])({},Object(c["c"])(["dictGroup"])),mounted:function(){this.drawLine()},created:function(){this.getPosition(1)},methods:{changePosition:function(t){this.drawLine(),this.getPosition(t)},getPosition:function(t){var a=this;this.age=[],this.province=[],Object(s["g"])(t).then(function(t){Object.keys(t.data.data.age).forEach(function(e){var n={};switch(e){case"0":n.value=t.data.data.age["0"],n.name="30及以下";break;case"1":n.value=t.data.data.age["1"],n.name="31~40";break;case"2":n.value=t.data.data.age["2"],n.name="41~50";break;case"3":n.value=t.data.data.age["3"],n.name="51~60";break;case"4":n.value=t.data.data.age["4"],n.name="60及以上";break;default:break}a.age.push(n)}),a.ageTotal.setOption({legend:{data:a.age.name},series:[{name:"年龄分布",data:a.age}]}),a.salaryValue=t.data.data.salary,a.salaryTotal.setOption({xAxis:{data:a.salaryName},series:[{data:a.salaryValue}]}),a.contract=t.data.data.contract,a.contractStatus=t.data.data.contract.map(function(t){return a.statusDict.forEach(function(a){a.lable==t.status&&(t.status=a.value)}),t.status});var e=0;if(t.data.data.contract.forEach(function(t){e+=parseInt(t.number)}),a.contractNum=t.data.data.contract.map(function(t){return t.number=Number(t.number/e*100).toFixed(0),t.number}),a.contractToal.setOption({yAxis:[{data:a.contractStatus},{data:a.contractStatus}],series:[{data:a.contractNum}]}),a.getProvince=t.data.data.province.map(function(t){return{value:t.number,name:t.province_id}}),a.getProvince.length){var n=a.getProvince.map(function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["b"])(a.name).then(function(t){if(t.data.data.name)return t.data.data.name});case 2:return a.name=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}},t)}));return function(a){return t.apply(this,arguments)}}());n.map(function(t){t.then(function(t){a.province.push(t)}).then(function(){a.provinceTotal.setOption({legend:{data:a.province.name},series:[{name:"籍贯分布",data:a.province}]}),a.mapProvice=JSON.parse(JSON.stringify(a.province));var t=/省|市/g,e=/自治区/;a.mapProvice=a.mapProvice.map(function(a){return a.name=a.name.replace(t,""),e.test(a.name)&&(a.name=a.name.substring(0,2)),a})})})}else{a.provinceTotal.setOption({legend:{data:a.province.name},series:[{name:"籍贯分布",data:a.province}]}),a.mapProvice=JSON.parse(JSON.stringify(a.province));var r=/省|自治区|市/g;a.mapProvice=a.mapProvice.map(function(t){return t.name=t.name.replace(r,""),t})}})},chinaMap:function(t){this.mapChina=this.$echarts.init(document.getElementById("mapChina"));var a={tooltip:{trigger:"item"},legend:{orient:"horizontal",textStyle:{color:"#fff"},x:"top",y:"20",data:["全国数据"]},visualMap:{show:!0,textStyle:{color:"#fff"},x:"left",y:"bottom",splitList:[{start:500,end:600},{start:400,end:500},{start:300,end:400},{start:200,end:300},{start:100,end:200},{start:0,end:100}],color:["#5475f5","#9feaa5","#85daef","#74e2ca","#e6ac53","#9fb5ea"]},series:[{name:"籍贯分布",type:"map",mapType:"china",roam:!1,zoom:1.25,label:{normal:{show:!0,fontSize:"10",color:"rgba(255,255,255)"},emphasis:{show:!1}},itemStyle:{normal:{areaColor:"rgba(43, 196, 243, 0.42)",borderColor:"rgba(43, 196, 243, 1)",borderWidth:1}},data:t}]};this.mapChina.setOption(a)},drawLine:function(){this.provinceTotal=this.$echarts.init(document.getElementById("provinceTotal")),this.ageTotal=this.$echarts.init(document.getElementById("ageTotal")),this.salaryTotal=this.$echarts.init(document.getElementById("salaryTotal")),this.contractToal=this.$echarts.init(document.getElementById("contractToal"));var t=["#1089E7","#F57474","#56D0E3","#F8B448","#8B78F6"];this.contractToal.setOption({grid:{top:"10%",left:"18%",bottom:"10%"},xAxis:{show:!1},yAxis:[{show:!0,data:[],inverse:!0,axisLine:{show:!1},splitLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#fff",padding:5,rich:{lg:{backgroundColor:"#339911",color:"#fff",borderRadius:15,align:"center",width:15,height:15}}}},{show:!1,inverse:!0,data:[]}],series:[{name:"条",type:"bar",yAxisIndex:0,data:[],barCategoryGap:50,barWidth:10,itemStyle:{normal:{barBorderRadius:20,color:function(a){var e=t.length;return t[a.dataIndex%e]}}},label:{normal:{show:!0,position:"inside",formatter:"{c}%"}}},{name:"框",type:"bar",yAxisIndex:1,barCategoryGap:50,data:[100,100,100,100,100,100],barWidth:15,itemStyle:{normal:{color:"none",borderColor:"#00c1de",borderWidth:3,barBorderRadius:15}}}]}),this.salaryTotal.setOption({color:["#ed3f35"],tooltip:{trigger:"axis"},xAxis:{type:"category",data:[],axisTick:{show:!1},axisLabel:{color:"rgba(255,255,255,.7)",interval:0},axisLine:{show:!1}},yAxis:{type:"value",axisTick:{show:!1},axisLabel:{color:"rgba(255,255,255,.7)"},splitLine:{lineStyle:{color:"#012f4a"}}},series:[{name:"工资统计",data:[],type:"line",smooth:!0}]}),this.ageTotal.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)",position:function(t){return[t[0]+10,t[1]-10]}},legend:{top:"90%",itemWidth:10,itemHeight:10,data:[],textStyle:{color:"rgba(255,255,255,.5)",fontSize:"12"}},series:[{name:"年龄分布",type:"pie",center:["50%","42%"],radius:["40%","60%"],color:["#85daef","#74e2ca","#5475f5","#9feaa5","#e6ac53","#9fb5ea"],label:{show:!1},labelLine:{show:!1},data:[]}]}),this.provinceTotal.setOption({color:["#006cff","#60cda0","#ed8884","#ff9f7f","#0096ff","#9fe6b8","#32c5e9","#1d9dff","#ffeb7b"],tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{left:"center",top:"bottom",textStyle:{color:"#ffffff"},icon:"rect",itemWidth:5,itemHeight:5,data:[]},series:[{name:"籍贯分布",type:"pie",radius:["10%","60%"],center:["50%","42%"],roseType:"area",data:[],label:{fontSize:10},labelLine:{length:10,length2:10}}]})}}}),u=d,p=(e("2fa0"),e("2877")),m=Object(p["a"])(u,n,r,!1,null,"a52a45ac",null);a["default"]=m.exports},a19d:function(t,a,e){"use strict";e.d(a,"g",function(){return o}),e.d(a,"h",function(){return i}),e.d(a,"e",function(){return c}),e.d(a,"c",function(){return s}),e.d(a,"l",function(){return l}),e.d(a,"f",function(){return d}),e.d(a,"d",function(){return u}),e.d(a,"i",function(){return p}),e.d(a,"j",function(){return m}),e.d(a,"k",function(){return f}),e.d(a,"a",function(){return h}),e.d(a,"b",function(){return g});var n=e("b5c6"),r="/tmlms/statistic";function o(t){return Object(n["a"])({url:"".concat(r,"/position?positionId=").concat(t),method:"get",params:t})}function i(t){return Object(n["a"])({url:"".concat(r,"/positionOrgRelation"),method:"get",params:t})}function c(t){return Object(n["a"])({url:"".concat(r,"/crewOrgRelation?orgRelationId=").concat(t),method:"get",params:t})}function s(t){return Object(n["a"])({url:"".concat(r,"/countOrgRelationCrew?orgRelationId=").concat(t),method:"get",params:t})}function l(t){return Object(n["a"])({url:"/tmlms/orgRelation/village_page",method:"get",params:t})}function d(t){return Object(n["a"])({url:"".concat(r,"/crewOrgRelationVillage"),method:"get",params:t})}function u(t){return Object(n["a"])({url:"".concat(r,"/vi_countOrgRelationCrew"),method:"get",params:t})}function p(t){return Object(n["a"])({url:"".concat(r,"/positionOrgRelationVillage"),method:"get",params:t})}function m(t){return Object(n["a"])({url:"".concat(r,"/shipCount"),method:"get",params:t})}function f(t){return Object(n["a"])({url:"".concat(r,"/shipCountVillage"),method:"get",params:t})}function h(t){return Object(n["a"])({url:"/tmlms/statistic/crewOrgRelationNew?orgRelationId=".concat(t),method:"get",params:t})}function g(t){return Object(n["a"])({url:"/tmlms/statistic/crewOrgRelationVillageNew?villageId=".concat(t),method:"get",params:t})}},f0b1:function(t,a,e){}}]);