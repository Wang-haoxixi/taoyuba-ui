(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b962b40"],{"2f9e":function(t,e,r){"use strict";r.d(e,"a",function(){return a});r("ac6a"),r("28a5"),r("a481");var n=r("b5c6");function a(t){var e=t.url,r=t.method,a=void 0===r?"post":r,o=t.data,i=void 0===o?{}:o,u=t.title,s=void 0===u?"":u;return new Promise(function(t){return Object(n["a"])({url:e,method:a,headers:{responseType:"arraybuffer"},data:i,responseType:"blob"}).then(function(e){c({title:s,response:e}).then(function(){t()})})})}function c(t){var e=t.title,r=void 0===e?"":e,n=t.response,a=o(n.headers["content-disposition"].replace(/"/g,""));return new Promise(function(t){var e=n.headers,c=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(c,r);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(c),o.download=r?"".concat(r,".").concat(a.suffix):a.filename,document.body.appendChild(o),o.style.display="none",o.click()}t()})}function o(t){var e={},r=t.split(";");return r.forEach(function(t){var r=t.replace(/^\s+|\s+$/g,""),n=r.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]}),e.suffix=e.filename.split(".")[1],e}},"448c":function(t,e,r){"use strict";r.d(e,"g",function(){return o}),r.d(e,"f",function(){return i}),r.d(e,"d",function(){return u}),r.d(e,"b",function(){return s}),r.d(e,"e",function(){return l}),r.d(e,"c",function(){return p}),r.d(e,"a",function(){return d});var n=r("b5c6"),a=r("2f9e"),c="/tybship/tybshipinout";function o(t){return Object(n["a"])({url:"".concat(c,"/page?inoutType=1"),method:"get",params:t})}function i(t){return Object(n["a"])({url:"".concat(c,"/page?inoutType=2"),method:"get",params:t})}function u(t){return Object(n["a"])({url:"".concat(c,"/").concat(t),method:"get",params:t})}function s(t,e){return Object(n["a"])({url:"tmlms/crew_cert/shipInout?inoutId=".concat(t,"&shipId=").concat(e),method:"get",params:{inoutId:t,shipId:e}})}function l(t){return Object(n["a"])({url:"tybship/tybshipinoutcrew/getShipCrewByinout/".concat(t),method:"get",params:t})}function p(t){return Object(n["a"])({url:"tybship/tybshipinoutfish/getFishrecord/".concat(t),method:"get",params:t})}function d(t){return Object(a["a"])({url:"tybship/tybshipExcelExport/downShipInout",data:t,title:"进出港记录"})}},67620:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"inout"},[r("basic-container",[r("page-header",{attrs:{title:"渔船配员"}}),r("div",[r("h3",[t._v("职务船员配备标准")]),r("p",t._l(t.cert,function(e){return r("span",{key:e.index,staticClass:"status-bg-red"},[e.certLevel?r("span",[t._v(t._s(e.certLevel))]):t._e(),t._v(t._s(e.certTitle)+t._s(e.number)+"名")])}),0)]),r("div",[r("h3",[t._v("当前渔船缺少相关人员")]),r("p",t._l(t.lack,function(e){return r("span",{key:e.index,staticClass:"status-bg-red"},[e.certLevel?r("span",[t._v(t._s(e.certLevel))]):t._e(),t._v(t._s(e.certTitle)+t._s(e.number)+"名")])}),0)]),r("h3",[t._v("现有配员情况")]),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.shipcrewList}},t._l(t.columnsMapDetail,function(e,n){return r("el-table-column",{key:n,attrs:{prop:e.prop,label:e.label},scopedSlots:t._u([{key:"default",fn:function(n){return["image"===e.type?[n.row[e.prop]?r("img",{attrs:{src:n.row[e.prop],width:"100",height:"80"},on:{click:function(r){return t.openImage(n.row[e.prop])}}}):r("span",[t._v("无相关照片")])]:"position"===e.type?[r("div",[t._v(t._s(t.getMyCret(e,n)))])]:[r("iep-table-detail",{attrs:{value:n.row[e.prop]}})]]}}],null,!0)})}),1)],1)],1)},a=[],c=r("be94"),o=r("448c"),i=r("f00d"),u=r("2f62"),s={components:{},data:function(){return{columnsMapDetail:i["b"],params:{current:1,size:10},boatMan:"",shipcrewList:[],total:10,cert:{},lack:{}}},created:function(){this.getCrewList(),this.certStandard()},computed:Object(c["a"])({},Object(u["c"])(["dictGroup"])),methods:{currentChange:function(t){this.params.current=t,this.getCrewList()},openImage:function(t){window.open(t,"_blank")},getMyCret:function(t,e){return this.$store.getters.dictGroup.tyb_crew_cert_title.map(function(r){e.row[t.prop]==r.value&&(e.row[t.prop]=r.label)}),"0"==e.row.certLevel&&(e.row.certLevel=""),"1"==e.row.certLevel&&(e.row.certLevel="一级"),"2"==e.row.certLevel&&(e.row.certLevel="二级"),"3"==e.row.certLevel&&(e.row.certLevel="三级"),e.row[t.prop]?e.row.certLevel+e.row[t.prop]:"暂无"},handleAdd:function(){this.$router.push({path:"/ship_port/detail/create/0"})},certStandard:function(){var t=this;Object(o["b"])(this.$route.params.id,this.$route.query.shipId).then(function(e){t.lack=e.data.data.lackList.map(function(e){return t.$store.getters.dictGroup.tyb_crew_cert_title.map(function(t){e.certTitle==t.value&&(e.certTitle=t.label)}),"0"==e.certLevel&&(e.certLevel=""),"1"==e.certLevel&&(e.certLevel="一级"),"2"==e.certLevel&&(e.certLevel="二级"),"3"==e.certLevel&&(e.certLevel="三级"),e}),t.cert=e.data.data.tybCrewCertStandardList,t.cert=t.cert.map(function(e){return t.$store.getters.dictGroup.tyb_crew_cert_title.map(function(t){e.certTitle==t.value&&(e.certTitle=t.label)}),"0"==e.certLevel&&(e.certLevel=""),"1"==e.certLevel&&(e.certLevel="一级"),"2"==e.certLevel&&(e.certLevel="二级"),"3"==e.certLevel&&(e.certLevel="三级"),e})})},getCrewList:function(){var t=this;Object(o["e"])(this.$route.params.id).then(function(e){t.shipcrewList=e.data.data})}}},l=s,p=(r("7f1a3"),r("2877")),d=Object(p["a"])(l,n,a,!1,null,"753bea87",null);e["default"]=d.exports},"7f1a3":function(t,e,r){"use strict";r("f0d3")},"84df":function(t,e,r){"use strict";r.d(e,"a",function(){return c});var n=r("c1df"),a=r.n(n),c=function(){return a()().format("YYYY-MM-DD HH:mm:ss")}},f00d:function(t,e,r){"use strict";r.d(e,"a",function(){return a}),r.d(e,"b",function(){return c}),r.d(e,"c",function(){return o}),r.d(e,"d",function(){return u});r("3b2b");var n=r("0e0b"),a=(r("84df"),[{prop:"shipName",label:"渔船名"},{prop:"createTime",label:"出港时间"},{prop:"portName",label:"港口"},{prop:"seaworthStatus",label:"船舶适航",type:"shipStatus"}]),c=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证号"},{prop:"idcardPhoto",label:"身份证正面照",type:"image"},{prop:"facePhoto",label:"人脸照",type:"image"},{prop:"certPhoto",label:"证书照",type:"image"},{prop:"certTitle",label:"职务",type:"position"}];var o=function(){return{shipName:"",realName:"",idcard:"",startDate:"",endDate:""}},i=function(){return{contactName:"",positionName:""}},u=function(t){var e=Object(n["g"])(i(),t);return e.contactName=t.contactName?t.contactName:null,e.positionName=t.positionName?t.positionName:null,e}},f0d3:function(t,e,r){}}]);