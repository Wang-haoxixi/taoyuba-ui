(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-165ea9d6"],{"186e":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:"职务船员配置情况",width:e.width,visible:e.dialogCertvisible,"append-to-body":""},on:{close:e.close}},[r("div",{staticClass:"certDiv"},[r("p",[e._v("最低配员标准: "+e._s(e.crewcertStandard))]),r("p",[e._v("实际配员: "+e._s(e.realCert))]),r("p",{staticClass:"lackCert"},[e._v("缺少配员: "+e._s(e.lackCert))])])])},a=[],i={name:"CertStandard",props:{dialogCertvisible:{default:!1,type:Boolean},width:{default:"70%",type:String},crewcertStandard:{type:String},realCert:{type:String},lackCert:{type:String}},data:function(){return{}},methods:{close:function(){this.$emit("close",!1)}}},o=i,c=(r("cda3"),r("2877")),s=Object(c["a"])(o,n,a,!1,null,"5e76d5e6",null);t["default"]=s.exports},"2f9e":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("ac6a"),r("28a5"),r("a481");var n=r("b5c6");function a(e){var t=e.url,r=e.method,a=void 0===r?"post":r,o=e.data,c=void 0===o?{}:o,s=e.title,u=void 0===s?"":s;return console.log(t),new Promise((function(e){return Object(n["a"])({url:t,method:a,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(t){i({title:u,response:t}).then((function(){e()}))}))}))}function i(e){var t=e.title,r=void 0===t?"":t,n=e.response,a=o(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=n.headers,i=new Blob([n.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,r);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=r?"".concat(r,".").concat(a.suffix):a.filename,document.body.appendChild(o),o.style.display="none",o.click()}e()}))}function o(e){var t={},r=e.split(";");return r.forEach((function(e){var r=e.replace(/^\s+|\s+$/g,""),n=r.split("=");n[1]?t[n[0]]=n[1]:t[n[0]]=n[0]})),t.suffix=t.filename.split(".")[1],t}},4525:function(e,t,r){"use strict";r.d(t,"h",(function(){return i})),r.d(t,"i",(function(){return o})),r.d(t,"b",(function(){return c})),r.d(t,"d",(function(){return s})),r.d(t,"f",(function(){return u})),r.d(t,"e",(function(){return l})),r.d(t,"c",(function(){return d})),r.d(t,"g",(function(){return p})),r.d(t,"a",(function(){return h}));var n=r("b5c6"),a="tmlms/crew_cert";function i(e){return Object(n["a"])({url:"".concat(a,"/create"),method:"post",data:e})}function o(e){return Object(n["a"])({url:"".concat(a,"/edit"),method:"post",data:e})}function c(e){return Object(n["a"])({url:"".concat(a,"/remove"),method:"post",params:{certId:e}})}function s(e){return Object(n["a"])({url:"".concat(a,"/detail"),method:"get",params:{certId:e}})}function u(e){return Object(n["a"])({url:"".concat(a,"/myCerts"),method:"get",params:{userId:e}})}function l(e,t){return Object(n["a"])({url:"".concat(a,"/getPage"),method:"get",params:e,data:t})}function d(e){return Object(n["a"])({url:"".concat(a,"/")+e,method:"post",data:e})}function p(e){return Object(n["a"])({url:"".concat(a,"/mycertlist"),method:"get",params:{idcard:e}})}function h(e){return Object(n["a"])({url:"".concat(a,"/certStandard/")+e,method:"get"})}},"502e":function(e,t,r){"use strict";r("8e6e"),r("ac6a"),r("456d");var n=r("ade3"),a=(r("96cf"),r("1da1")),i=r("51f4");function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){Object(n["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var n,a,i,o,s,u,l,d,p,h=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=h.length>2&&void 0!==h[2]?h[2]:function(e){return e},this.isLoadTable=!0,e.next=4,r(c(c({},this.pageOption),t));case 4:return a=e.sent,i=a.data,o=i.data,s=o.records,u=o.size,l=o.total,d=o.current,p=l/u+1===d,p&&0!==l?this.searchPage({current:d-1,size:u,total:l}):this.pagination={current:d,size:u,total:l},this.pagedTable=s.map(n),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",a=s[n];this.$confirm("此操作将".concat(a,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?r.$message({type:"success",message:"".concat(a,"成功!")}):r.$message({type:"info",message:"".concat(a,"失败，").concat(e.data.msg)}),r.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,n,i,o=this,c=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=c.length>1&&void 0!==c[1]?c[1]:"delete",n=this.multipleSelection,i=s[r],void 0!==n&&0!==n.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(n);case 2:r=e.sent,a=r.data,a.data?(o.$message({type:"success",message:"".concat(i,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(i,"失败，").concat(a.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,r,n,i){var o=this;this.$confirm(n||"是否".concat(r),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function n(){var a,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t(e);case 2:a=n.sent,c=a.data,c.data?o.$message({type:"success",message:i||"".concat(r,"成功!")}):o.$message({type:"info",message:"".concat(c.msg)}),o.loadPage();case 6:case"end":return n.stop()}}),n)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(r)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"6ada":function(e,t,r){"use strict";t["a"]={methods:{getQuery:function(){var e=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var t=JSON.parse(e);for(var r in this.params)t[r]&&(this.params[r]=t[r])}},setQuery:function(e){if(e){var t=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var r=JSON.parse(t);for(var n in e)r[n]=e[n];sessionStorage.setItem("query",JSON.stringify(r))}else sessionStorage.setItem("query",JSON.stringify(e))}else sessionStorage.setItem("query",JSON.stringify(this.params))}}}},"6d74":function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"e",(function(){return l})),r.d(t,"c",(function(){return i})),r.d(t,"d",(function(){return p})),r.d(t,"g",(function(){return g})),r.d(t,"a",(function(){return m})),r.d(t,"f",(function(){return d}));r("3b2b");var n=r("0e0b"),a=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"shipowner",label:"持证人"},{prop:"shipownerIdcard",label:"持证人身份证"},{prop:"engineTotalPower",label:"总功率(kw)"},{prop:"hullLength",label:"船长(m)"}],i=function(){return{activityType:"",address:"",buildDate:"",createTime:"",dualPower:"",engineTotalPower:"",fishType:"",fishingGear:"",grossTonnage:"",hullLength:"",hullMaterial:"",licensesDateExpire:"",licensesDateIssue:"",licensesFishingNo:"",licensesInspectionNo:"",licensesNationalNo:"",licensesOwnerShip:"",mainEngineModel:"",mainEnginePower:"",mobile:"",mouldedBreadth:"",mouldedDepth:"",netTonnage:"",portRegister:"",shipId:"",shipName:"",shipNo:"",shipShare:"",shipowner:"",shipownerIdcard:"",updateTime:"",userId:"",workMode:"",workMode2:"",zipcode:"",regionId:""}};function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=new RegExp("^\\d{0,"+t+"}$");if(0===r)return n.test(e);var a=new RegExp("^\\d{0,"+t+"}\\.\\d{0,"+r+"}$");return n.test(e)||a.test(e)}function c(e){var t=/^\d{0,18}$/,r=/^\d{17}X$/;return t.test(e)||r.test(e)}function s(e,t,r){""===t?r(new Error):c(t)?r():r(new Error)}function u(e,t,r){""===t?r(new Error):o(t,e.length,e.decimal)?r():r(new Error)}var l={engineTotalPower:[{required:!0,validator:u,trigger:"blur",length:3,decimal:2,message:"请输入0~999.99的整数或小数！"}],hullLength:[{required:!0,validator:u,trigger:"blur",length:3,decimal:2,message:"请输入0~999.99的整数或小数！"}],regionId:[{required:!0,message:"该选项必填！",trigger:"blur"}],address:[{required:!0,message:"该选项必填！",trigger:"blur"}],createTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesFishingNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesOwnerShip:[{required:!0,message:"该选项必填！",trigger:"blur"}],mobile:[{required:!0,validator:u,trigger:"blur",length:11,decimal:0,message:"请输入正确的手机号码！"}],shipId:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipName:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipShare:[{required:!0,message:"该选项必填！",trigger:"change"}],shipowner:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipownerIdcard:[{required:!0,validator:s,trigger:"blur",length:3,decimal:0,message:"请输入正确的身份证号码！"}],updateTime:[{required:!0,message:"该选项必填！",trigger:"blur"}]},d={sellPrice:[{required:!0,message:"该选项必填！",trigger:"blur"}],engineTotalPower:[{required:!0,message:"该选项必填！",trigger:"blur"}],mainEnginePower:[{required:!0,message:"该选项必填！",trigger:"blur"}],dualPower:[{required:!0,message:"该选项必填！",trigger:"blur"}],mainEngineModel:[{required:!0,message:"该选项必填！",trigger:"blur"}],grossTonnage:[{required:!0,message:"该选项必填！",trigger:"blur"}],hullLength:[{required:!0,message:"该选项必填！",trigger:"blur"}],mouldedBreadth:[{required:!0,message:"该选项必填！",trigger:"blur"}],mouldedDepth:[{required:!0,message:"该选项必填！",trigger:"blur"}],netTonnage:[{required:!0,message:"该选项必填！",trigger:"blur"}],regionId:[{required:!0,message:"该选项必填！",trigger:"blur"}],activityType:[{required:!0,message:"该选项必填！",trigger:"change"}],buildFactory:[{required:!0,message:"该选项必填！",trigger:"blur"}],buildDate:[{required:!0,message:"该选项必填！",trigger:"blur"}],createTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],fishingGear:[{required:!0,message:"该选项必填！",trigger:"change"}],hullMaterial:[{required:!0,message:"该选项必填！",trigger:"change"}],licensesFishingNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesInspectionNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesNationalNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesOwnerShip:[{required:!0,message:"该选项必填！",trigger:"blur"}],mobile:[{required:!0,validator:u,trigger:"blur",length:11,decimal:0,message:"请输入正确的手机号码！"}],portRegister:[{required:!0,message:"该选项必填！",trigger:"change"}],shipId:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipName:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipShare:[{required:!0,message:"该选项必填！",trigger:"change"}],shipowner:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipownerIdcard:[{required:!0,validator:s,trigger:"blur",length:33333333,decimal:0,message:"请输入正确的身份证号码！"}],updateTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],workMode:[{required:!0,message:"该选项必填！",trigger:"change"}],workMode2:[{required:!0,message:"该选项必填！",trigger:"change"}]},p=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},h=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},g=function(e){var t=Object(n["g"])(h(),e);return t.shipName=e.shipName?e.shipName:null,t.shipNo=e.shipNo?e.shipNo:null,t.shipowner=e.shipowner?e.shipowner:null,t.shipownerIdcard=e.shipownerIdcard?e.shipownerIdcard:null,t},m=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"certificateHolderName",label:"持证人姓名"},{prop:"auditState",label:"审核状态",type:"dictGroup",dictName:"audit_state"},{prop:"rejectReason",label:"驳回理由"}]},"6edf":function(e,t,r){var n=r("872a"),a=r("50c6"),i=Object.prototype,o=i.hasOwnProperty,c=a((function(e,t,r){o.call(e,r)?e[r].push(t):n(e,r,[t])}));e.exports=c},9146:function(e,t,r){},ade36:function(e,t,r){"use strict";r.d(t,"w",(function(){return o})),r.d(t,"e",(function(){return c})),r.d(t,"r",(function(){return s})),r.d(t,"d",(function(){return u})),r.d(t,"t",(function(){return l})),r.d(t,"v",(function(){return d})),r.d(t,"h",(function(){return p})),r.d(t,"J",(function(){return h})),r.d(t,"i",(function(){return g})),r.d(t,"s",(function(){return m})),r.d(t,"x",(function(){return f})),r.d(t,"y",(function(){return b})),r.d(t,"o",(function(){return w})),r.d(t,"u",(function(){return O})),r.d(t,"z",(function(){return y})),r.d(t,"k",(function(){return v})),r.d(t,"m",(function(){return j})),r.d(t,"l",(function(){return x})),r.d(t,"n",(function(){return I})),r.d(t,"j",(function(){return S})),r.d(t,"G",(function(){return N})),r.d(t,"H",(function(){return C})),r.d(t,"b",(function(){return q})),r.d(t,"D",(function(){return P})),r.d(t,"I",(function(){return _})),r.d(t,"C",(function(){return k})),r.d(t,"q",(function(){return T})),r.d(t,"A",(function(){return E})),r.d(t,"c",(function(){return $})),r.d(t,"B",(function(){return R})),r.d(t,"f",(function(){return B})),r.d(t,"g",(function(){return D})),r.d(t,"E",(function(){return L})),r.d(t,"a",(function(){return z})),r.d(t,"K",(function(){return M})),r.d(t,"p",(function(){return G})),r.d(t,"F",(function(){return V}));var n=r("b5c6"),a=r("2f9e"),i="/tybship/tybship";function o(e){return Object(n["a"])({url:"".concat(i,"/otherpage"),method:"get",params:e})}function c(e,t){return Object(n["a"])({url:"".concat(i,"/updateVillage?shipId=").concat(e,"&&villageId=").concat(t),method:"post"})}function s(){return Object(n["a"])({url:"/admin/org/page",method:"get"})}function u(e,t){return Object(n["a"])({url:"".concat(i,"/updateOrgId?shipId=").concat(e,"&&orgId=").concat(t),method:"post"})}function l(e){return Object(n["a"])({url:"".concat(i,"/").concat(e),method:"get",params:e})}function d(e){return Object(n["a"])({url:"".concat(i,"/").concat(e),method:"get"})}function p(e){return Object(n["a"])({url:"".concat(i,"/save"),method:"post",data:e})}function h(e){return Object(n["a"])({url:"".concat(i,"/update"),method:"post",data:e})}function g(e){return Object(n["a"])({url:"".concat(i,"/del/").concat(e),method:"post"})}function m(e){return Object(n["a"])({url:"".concat(i,"/mypage"),method:"get",params:e})}function f(e){return Object(n["a"])({url:"".concat(i,"/findship/").concat(e),method:"get"})}function b(e){return Object(n["a"])({url:"".concat(i,"/findshipWithOutOrg/").concat(e),method:"get"})}function w(e){return Object(n["a"])({url:"".concat(i,"/findmyship/").concat(e),method:"get"})}function O(e){return Object(n["a"])({url:"".concat(i,"/searchByshipNo"),method:"get",params:{shipNo:e}})}function y(e){return Object(n["a"])({url:"".concat(i,"/newpage"),method:"get",params:e})}function v(e){return Object(a["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:e,title:"渔船信息"})}function j(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:e,title:"开航登记表-"+e.shipName})}function x(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewRecord",data:e,title:"实名登记备案表-"+e.shipName})}function I(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:e,title:"船员登记表-"+e.shipName})}function S(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:e,title:e.shipName})}function N(e){return Object(n["a"])({url:"tmlms/tyb_order/page",method:"get",params:e})}function C(e){return Object(n["a"])({url:"tmlms/tyb_order/getById",method:"get",params:e})}function q(e){return Object(n["a"])({url:"tmlms/tyb_order/agree",method:"post",data:e})}function P(e){return Object(n["a"])({url:"tmlms/tyb_order/reject",method:"post",data:e})}function _(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:e})}function k(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/lastRecord",method:"get",params:e})}function T(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/getCrewByRecordId",method:"get",params:e})}function E(e){return Object(n["a"])({url:"/tybship/tybship/info/".concat(e),method:"get"})}function $(e){return Object(n["a"])({url:"/tmlms/crew_cert/certStandard/".concat(e),method:"get"})}function R(e){return Object(n["a"])({url:"/tmlms/investigationReport/pageByShipName?shipName=".concat(e),method:"get"})}function B(e){return Object(n["a"])({url:"/tmlms/crew/countContractByShipId?shipId=".concat(e),method:"get"})}function D(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:e})}function L(e){return Object(n["a"])({url:"/tmlms/tybTroubleshootReport/pageByShipNo",method:"get",params:e})}function z(e){return Object(n["a"])({url:"/tmlms/tyb_order/pageByShipName",method:"get",params:e})}function M(e){return Object(n["a"])({url:"/tmlms/verification/page",method:"get",params:e})}function G(e){return console.log(e),Object(n["a"])({url:"/tmlms/tyb_order/getById?id=".concat(e.id),method:"get"})}function V(e){return Object(n["a"])({url:"/tmlms/tybmlmsExcelExport/downVerification",method:"post",headers:{"Content-Type":"application/json"},responseType:"arraybuffer",data:e}).then((function(e){var t=new Blob([e.data],{type:"application/vnd.ms-excel"}),r=document.createElement("a");r.href=window.URL.createObjectURL(t),r.download="实船鉴证.xls",r.click()}))}},c533b:function(e,t,r){"use strict";r.d(t,"i",(function(){return c})),r.d(t,"f",(function(){return s})),r.d(t,"d",(function(){return u})),r.d(t,"g",(function(){return l})),r.d(t,"c",(function(){return d})),r.d(t,"a",(function(){return p})),r.d(t,"e",(function(){return h})),r.d(t,"j",(function(){return g})),r.d(t,"h",(function(){return m})),r.d(t,"b",(function(){return f}));var n=r("b5c6"),a="tmlms/crew",i="admin/region",o="admin/dict";function c(e){return Object(n["a"])({url:"".concat(i,"/getinfo/")+e,method:"get"})}function s(e){return Object(n["a"])({url:"".concat(o,"/type/")+e,method:"get"})}function u(e){return Object(n["a"])({url:"".concat(i,"/area"),method:"get",params:{parentCode:e}})}function l(e){return Object(n["a"])({url:"".concat(a,"/Page"),method:"get",params:e})}function d(e){return Object(n["a"])({url:"".concat(a,"/delete"),method:"post",params:{userId:e}})}function p(e){return Object(n["a"])({url:"".concat(a,"/create"),method:"post",data:e,params:{type:1}})}function h(e){return Object(n["a"])({url:"".concat(a,"/getCrewByUserId"),method:"get",params:{userId:e}})}function g(e){return Object(n["a"])({url:"".concat(a,"/edit"),method:"post",params:{type:1},data:e})}function m(e){return Object(n["a"])({url:"/tybship/tybregion/parent/".concat(e),method:"get"})}function f(e,t,r){return Object(n["a"])({url:"".concat(a,"/upWork?idcard=").concat(t,"&workStatus=").concat(r),method:"post",data:e})}},cda3:function(e,t,r){"use strict";r("9146")},d04a:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("basic-container",[r("page-header",{attrs:{title:"渔船管理"}}),r("operation-container",[r("template",{slot:"left"},[e.manager?r("iep-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleAdd()}}},[e._v("新增")]):e._e(),e.manager?r("el-button",{attrs:{type:"default",size:"small"},on:{click:e.exportInfo}},[e._v("导出信息")]):e._e()],1),r("template",{slot:"right"},[r("span",[r("el-input",{attrs:{placeholder:"请输入船名号",size:"small",clearable:""},model:{value:e.params.shipName,callback:function(t){e.$set(e.params,"shipName",t)},expression:"params.shipName"}})],1),r("span",[r("el-input",{attrs:{placeholder:"请输入渔船编号",size:"small",clearable:""},model:{value:e.params.shipNo,callback:function(t){e.$set(e.params,"shipNo",t)},expression:"params.shipNo"}})],1),r("span",[r("el-input",{attrs:{placeholder:"请输入持证人姓名",size:"small",clearable:""},model:{value:e.params.shipowner,callback:function(t){e.$set(e.params,"shipowner",t)},expression:"params.shipowner"}})],1),r("span",[r("el-input",{attrs:{placeholder:"请输入持证人身份证",size:"small",clearable:""},model:{value:e.params.shipownerIdcard,callback:function(t){e.$set(e.params,"shipownerIdcard",t)},expression:"params.shipownerIdcard"}})],1),r("el-button",{attrs:{size:"small"},on:{click:function(t){return e.onSearch(e.params)}}},[e._v("搜索")])],1)],2),r("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.columnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{prop:"operation",label:"操作",width:"400"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("operation-wrapper",[e.manager?r("iep-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleShow(t.row.shipId)}}},[e._v("船员配置")]):e._e(),e.manager?r("iep-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){return e.handleCrew(t.row.shipNo)}}},[e._v("船员管理")]):e._e(),r("iep-button",{on:{click:function(r){return e.handleView(t.row.shipId)}}},[e._v("查看")]),e.manager?r("iep-button",{attrs:{type:"warning"},on:{click:function(r){return e.handleDelete(t.row)}}},[r("i",{staticClass:"el-icon-delete"})]):e._e()],1)]}}])})],1)],1),r("cert-standard",{attrs:{"dialog-certvisible":e.dialogCertVisible,"crewcert-standard":e.crewcertStandard,"real-cert":e.realCert,"lack-cert":e.lackCert},on:{close:e.close}})],1)},a=[],i=(r("8e6e"),r("456d"),r("ac6a"),r("96cf"),r("1da1")),o=r("ade3"),c=r("ade36"),s=r("4525"),u=r("c533b"),l=r("502e"),d=r("6d74"),p=r("7ded"),h=r("186e"),g=r("6edf"),m=r.n(g),f=r("2f62"),b=r("6ada");function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(o["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y={components:{CertStandard:h["default"]},mixins:[l["a"],b["a"]],data:function(){return{columnsMap:d["b"],manager:!1,params:{current:1,size:10,shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""},exportParams:{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:"",userId:""},dialogCertVisible:!1,lackMap:{},crewcertStandard:"",realCert:"",lackCert:"",certTilte:[]}},created:function(){var e=this;this.getQuery(),this.$set(this.pagination,"current",this.params.current),this.$nextTick((function(){console.log("this.pagination",e.pagination)})),this.params.shipName=this.$route.query.shipName,this.loadPage(this.params)},computed:O({},Object(f["c"])(["roles","userInfo"])),methods:{onSearch:function(e){e.current=1,this.setQuery(e),this.loadPage(e)},handleCurrentChange:function(e){this.pageOption.current=e,this.setQuery({current:e}),this.loadPage()},handleSizeChange:function(e){this.pageOption.size=e,this.setQuery({size:e}),this.loadPage()},handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleDelete:function(e){this._handleGlobalDeleteById(e.shipId,c["i"])},handleAdd:function(){this.$router.push({path:"/ship_spa/detail/create/0"})},handleView:function(e){this.$router.push({path:"/ship_spa/detail/view/".concat(e)})},handleEdit:function(e){this.$router.push({path:"/ship_spa/detail/update/".concat(e)})},loadPage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,r,n,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:this.params,e.next=3,Object(p["c"])().then((function(e){return e.data.data}));case 3:if(this.userData=e.sent,-1!==this.userData.roles.indexOf(111)||-1!==this.userData.roles.indexOf(1)||-1!==this.userData.roles.indexOf(112)){e.next=12;break}return e.next=7,this.loadTable(t,c["s"]);case 7:r=e.sent,this.pagedTable=r.records,this.manager=!1,e.next=23;break;case 12:if(-1===this.userData.roles.indexOf(112)){e.next=18;break}return e.next=15,this.loadTable(t,c["s"]);case 15:n=e.sent,e.next=21;break;case 18:return e.next=20,this.loadTable(t,c["w"]);case 20:n=e.sent;case 21:this.pagedTable=n.records,this.manager=!0;case 23:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),exportInfo:function(){var e=this;-1!==this.roles.indexOf(112)&&(this.exportParams.userId=this.userInfo.userId),Object(c["k"])(this.exportParams).catch((function(t){e.$message({type:"warning",message:t})}))},getnewStr:function(e,t){var r=this,n=[];if(e.length>0)return e.forEach((function(e){var a=r.getdictValue(t,e.certTitle),i=("0"===e.certLevel?"":"".concat(e.certLevel,"级"))+a+"*".concat(e.number);n.push(i)})),n.join(",")},handleShow:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var r,n,a,i,o,l,d=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=!0,e.next=3,Object(c["v"])(t).then((function(e){var t=e.data.data;0!==t.engineTotalPower&&0!==t.hullLength||(d.$message.error("请完善渔船的船长或总功率信息!"),r=!1)}));case 3:if(!r){e.next=17;break}return e.next=6,Object(s["a"])(t).then((function(e){return e.data.data})).catch((function(e){d.$message({type:"warning",message:e})}));case 6:return n=this.lackMap=e.sent,e.next=9,Object(u["f"])("tyb_crew_cert_title").then((function(e){return e.data.data}));case 9:a=this.certTilte=e.sent,i=n["tybCrewCertStandardList"],o=n["certList"],l=n["lackList"],this.crewcertStandard=this.getnewStr(i,a),this.realCert=this.getCertMap(o,a)||"无证书",this.lackCert=this.getnewStr(l,a)||"无",this.dialogCertVisible=!0;case 17:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),getdictValue:function(e,t){for(var r in e)if(e[r].value===t)return e[r].label},getCertMap:function(e,t){var r=[];for(var n in e){var a=this.getdictValue(t,n),i=e[n],o=m()(i,"certLevel");for(var c in o){var s=o[c],u=("0"===c?"":"".concat(c,"级"))+a+"*".concat(s.length);r.push(u)}}return r.join(",")},handleCrew:function(e){this.$router.push({path:"/hrms_spa/myship_crew/".concat(e)})},close:function(e){this.dialogCertVisible=e}},watch:{"params.shipName":function(e){this.exportParams.shipName=e},"params.shipNo":function(e){this.exportParams.shipNo=e},"params.shipowner":function(e){this.exportParams.shipowner=e},"params.shipownerIdcard":function(e){this.exportParams.shipownerIdcard=e}}},v=y,j=r("2877"),x=Object(j["a"])(v,n,a,!1,null,"56cc343c",null);t["default"]=x.exports},d91f:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(e.currentComponet,{tag:"component",attrs:{record:e.record}})},a=[],i=r("d04a"),o={name:"TableListWrapper",components:{List:i["default"]},data:function(){return{currentComponet:"List",record:""}},created:function(){},methods:{handleGoBack:function(){this.record="",this.currentComponet="List"}},watch:{"$route.path":function(){this.record="",this.currentComponet="List"}}},c=o,s=r("2877"),u=Object(s["a"])(c,n,a,!1,null,null,null);t["default"]=u.exports}}]);