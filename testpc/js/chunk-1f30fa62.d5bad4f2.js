(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f30fa62"],{"1ed6":function(t,e,s){"use strict";s.d(e,"a",(function(){return n})),s.d(e,"b",(function(){return a})),s.d(e,"c",(function(){return r})),s.d(e,"d",(function(){return o}));s("3b2b");var i=s("0e0b"),n=(s("84df"),[{prop:"shipName",label:"渔船名"},{prop:"createTime",label:"出港时间"},{prop:"portName",label:"港口"},{prop:"seaworthStatus",label:"船舶适航",type:"shipStatus",css:"success"}]),a=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证号"},{prop:"idcardPhoto",label:"身份证正面照",type:"image"},{prop:"facePhoto",label:"人脸照",type:"image"},{prop:"certPhoto",label:"证书照",type:"image"},{prop:"boatMan",label:"职务",type:"position"}];var r=function(){return{shipName:"",realName:"",idcard:"",startDate:"",endDate:""}},c=function(){return{contactName:"",positionName:""}},o=function(t){var e=Object(i["g"])(c(),t);return e.contactName=t.contactName?t.contactName:null,e.positionName=t.positionName?t.positionName:null,e}},"2f9e":function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));s("ac6a"),s("28a5"),s("a481");var i=s("b5c6");function n(t){var e=t.url,s=t.method,n=void 0===s?"post":s,r=t.data,c=void 0===r?{}:r,o=t.title,l=void 0===o?"":o;return console.log(e),new Promise((function(t){return Object(i["a"])({url:e,method:n,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(e){a({title:l,response:e}).then((function(){t()}))}))}))}function a(t){var e=t.title,s=void 0===e?"":e,i=t.response,n=r(i.headers["content-disposition"].replace(/"/g,""));return new Promise((function(t){var e=i.headers,a=new Blob([i.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(a,s);else{var r=document.createElement("a");r.href=window.URL.createObjectURL(a),r.download=s?"".concat(s,".").concat(n.suffix):n.filename,document.body.appendChild(r),r.style.display="none",r.click()}t()}))}function r(t){var e={},s=t.split(";");return s.forEach((function(t){var s=t.replace(/^\s+|\s+$/g,""),i=s.split("=");i[1]?e[i[0]]=i[1]:e[i[0]]=i[0]})),e.suffix=e.filename.split(".")[1],e}},"448c":function(t,e,s){"use strict";s.d(e,"g",(function(){return r})),s.d(e,"f",(function(){return c})),s.d(e,"d",(function(){return o})),s.d(e,"b",(function(){return l})),s.d(e,"e",(function(){return p})),s.d(e,"c",(function(){return u})),s.d(e,"a",(function(){return d}));var i=s("b5c6"),n=s("2f9e"),a="/tybship/tybshipinout";function r(t){return Object(i["a"])({url:"".concat(a,"/page?inoutType=1"),method:"get",params:t})}function c(t){return Object(i["a"])({url:"".concat(a,"/page?inoutType=2"),method:"get",params:t})}function o(t){return Object(i["a"])({url:"".concat(a,"/").concat(t),method:"get",params:t})}function l(t,e){return Object(i["a"])({url:"tmlms/crew_cert/shipInout?inoutId=".concat(t,"&shipId=").concat(e),method:"get",params:{inoutId:t,shipId:e}})}function p(t){return Object(i["a"])({url:"tybship/tybshipinoutcrew/getShipCrewByinout/".concat(t),method:"get",params:t})}function u(t){return Object(i["a"])({url:"tybship/tybshipinoutfish/getFishrecord/".concat(t),method:"get",params:t})}function d(t){return Object(n["a"])({url:"tybship/tybshipExcelExport/downShipInout",data:t,title:"进出港记录"})}},"76c0":function(t,e,s){"use strict";s("830b")},"830b":function(t,e,s){},"84df":function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));var i=s("c1df"),n=s.n(i),a=function(){return n()().format("YYYY-MM-DD HH:mm:ss")}},c3dc:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"inout"},[s("basic-container",[s("page-header",{attrs:{title:"进港记录"}}),s("h3",[t._v("基础信息")]),s("ul",[s("li",[t._v("渔船名称："+t._s(t.basicList.shipName))]),s("li",[t._v("出港时间："+t._s(t.basicList.createTime))]),s("li",[t._v("港口名称："+t._s(t.basicList.portName))])]),s("h3",[t._v("船舶适配情况")]),s("ul",{staticClass:"cert-detail"},[s("li",[s("span",[t._v("国籍证："+t._s(t.certList.licensesNationalNo))]),s("span",[t._v("国籍证有效期："+t._s(t.certList.licensesNationalExpireDate))]),s("span",{class:t.certList.Nationalclass},[t._v(t._s(t.certList.Nationalstatus))])]),s("li",[s("span",[t._v("船舶检验证书："+t._s(t.basicList.licensesInspectionNo))]),s("span",[t._v("船舶检验证书有效期："+t._s(t.basicList.licensesInspectionExpireDate))]),s("span",{class:t.basicList.Inspectionclass},[t._v(t._s(t.basicList.Inspectionstatus))])]),s("li",[s("span",[t._v("捕捞许可证："+t._s(t.basicList.licensesFishingNo))]),s("span",[t._v("捕捞许可证有效期："+t._s(t.basicList.licensesFishingExpireDate))]),s("span",{class:t.basicList.Fishingclass},[t._v(t._s(t.basicList.Fishingstatus))])])]),s("h3",[t._v("现有配员情况")]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.shipcrewList}},t._l(t.columnsMapDetail,(function(e,i){return s("el-table-column",{key:i,attrs:{prop:e.prop,label:e.label},scopedSlots:t._u([{key:"default",fn:function(i){return["image"===e.type?[i.row[e.prop]?s("img",{attrs:{src:i.row[e.prop],width:"100",height:"80"},on:{click:function(s){return t.openImage(i.row[e.prop])}}}):s("span",[t._v("无相关照片")])]:"position"===e.type?[s("div",[t._v(t._s(t.getMyCret(e,i)))])]:[s("iep-table-detail",{attrs:{value:i.row[e.prop]}})]]}}],null,!0)})})),1),t.fishList.length?s("h3",[t._v("渔获")]):t._e(),s("ul",{staticClass:"fish-list"},t._l(t.fishList,(function(e){return s("li",{key:e.id},[s("span",{staticClass:"fish-name"},[t._v(t._s(e.fishName)+":")]),s("span",[t._v(t._s(e.fishNum)+"公斤")])])})),0)],1)],1)},n=[],a=(s("8e6e"),s("ac6a"),s("456d"),s("ade3")),r=s("448c"),c=s("1ed6"),o=s("2f62");function l(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function p(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?l(Object(s),!0).forEach((function(e){Object(a["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var u={components:{},data:function(){return{columnsMapDetail:c["b"],shipId:"",params:{current:1,size:10},boatMan:"",shipcrewList:[],total:10,cert:{},basicList:[],fishList:[],fishClass:{},certList:{}}},created:function(){this.getBasic(),this.getFish(),this.getCrewList(),this.certStandard()},computed:p({},Object(o["c"])(["dictGroup"])),methods:{currentChange:function(t){this.params.current=t,this.getCrewList()},openImage:function(t){window.open(t,"_blank")},getMyCret:function(t,e){return this.$store.getters.dictGroup.tyb_crew_cert_title.map((function(s){e.row[t.prop]==s.value&&(e.row[t.prop]=s.label)})),"0"==e.row.certLevel&&(e.row.certLevel=""),"1"==e.row.certLevel&&(e.row.certLevel="一级"),"2"==e.row.certLevel&&(e.row.certLevel="二级"),"3"==e.row.certLevel&&(e.row.certLevel="三级"),e.row[t.prop]?e.row.certLevel+e.row[t.prop]:"暂无"},getFish:function(){var t=this;Object(r["c"])(this.$route.params.id).then((function(e){t.fishList=e.data.data,console.log("渔获"),console.log(e)}))},handleAdd:function(){this.$router.push({path:"/ship_port/detail/create/0"})},certStandard:function(){var t=this;Object(r["b"])(this.$route.params.id).then((function(e){t.lack=e.data.data.lackList,t.cert=e.data.data.tybCrewCertStandardList,t.cert=t.cert.map((function(e){return t.$store.getters.dictGroup.tyb_crew_cert_title.map((function(t){e.certTitle==t.value&&(e.certTitle=t.label)})),"0"==e.certLevel&&(e.certLevel=""),"1"==e.certLevel&&(e.certLevel="一级"),"2"==e.certLevel&&(e.certLevel="二级"),"3"==e.certLevel&&(e.certLevel="三级"),e}))}))},getCrewList:function(){var t=this;Object(r["e"])(this.$route.params.id).then((function(e){t.shipcrewList=e.data.data}))},getBasic:function(){var t=this;Object(r["d"])(this.$route.params.id).then((function(e){t.basicList=e.data.data;var s=new Date;console.log("看看吧"),console.log(t.basicList.licensesOwnerExpireDate),t.basicList.licensesNationalExpireDate<s||!t.basicList.licensesNationalExpireDate?(t.basicList.Nationalclass="过期",t.basicList.Nationalclass="status-bg-red"):(t.basicList.Nationalclass="正常",t.basicList.Nationalclass="status-bg-green"),t.basicList.licensesInspectionExpireDate<s||!t.basicList.licensesInspectionExpireDate?(t.basicList.Inspectionstatus="过期",t.basicList.Inspectionclass="status-bg-red"):(t.basicList.Inspectionstatus="正常",t.basicList.Inspectionclass="status-bg-green"),t.basicList.licensesFishingExpireDate<s||!t.basicList.licensesFishingExpireDate?(t.basicList.Fishingstatus="过期",t.basicList.Fishingclass="status-bg-red"):(t.basicList.Fishingstatus="正常",t.basicList.Fishingclass="status-bg-green"),t.shipId=t.basicList.shipId}))}}},d=u,b=(s("76c0"),s("2877")),f=Object(b["a"])(d,i,n,!1,null,"35108772",null);e["default"]=f.exports}}]);