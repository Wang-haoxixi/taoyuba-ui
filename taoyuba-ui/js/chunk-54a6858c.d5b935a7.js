(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54a6858c"],{"2f9e":function(t,e,r){"use strict";r.d(e,"a",function(){return o});r("ac6a"),r("28a5"),r("a481");var n=r("b5c6");function o(t){var e=t.url,r=t.method,o=void 0===r?"post":r,c=t.data,i=void 0===c?{}:c,u=t.title,s=void 0===u?"":u;return new Promise(function(t){return Object(n["a"])({url:e,method:o,headers:{responseType:"arraybuffer"},data:i,responseType:"blob"}).then(function(e){a({title:s,response:e}).then(function(){t()})})})}function a(t){var e=t.title,r=void 0===e?"":e,n=t.response,o=c(n.headers["content-disposition"].replace(/"/g,""));return new Promise(function(t){var e=n.headers,a=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(a,r);else{var c=document.createElement("a");c.href=window.URL.createObjectURL(a),c.download=r?"".concat(r,".").concat(o.suffix):o.filename,document.body.appendChild(c),c.style.display="none",c.click()}t()})}function c(t){var e={},r=t.split(";");return r.forEach(function(t){var r=t.replace(/^\s+|\s+$/g,""),n=r.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]}),e.suffix=e.filename.split(".")[1],e}},"303e":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("basic-container",[r("page-header",{attrs:{title:t.title,backOption:t.backOption}}),r("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":"150px",disabled:"detail"===t.status}},[r("div",{staticClass:"title"},[t._v("船东信息")]),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"渔船名",prop:"shipName"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择",filterable:"",remote:"",maxlength:"20",loading:t.loading,clearable:"","remote-method":t.getShipNameList},on:{change:t.shipNameChange},model:{value:t.form.shipName,callback:function(e){t.$set(t.form,"shipName",e)},expression:"form.shipName"}},t._l(t.shipNames,function(t){return r("el-option",{key:t.shipId,attrs:{label:t.shipName,value:t}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"持证人/公司名称",prop:"shipowner"}},[r("el-input",{model:{value:t.form.shipowner,callback:function(e){t.$set(t.form,"shipowner","string"===typeof e?e.trim():e)},expression:"form.shipowner"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证/企业代码",prop:"shipownerIdcard"}},[r("el-input",{model:{value:t.form.shipownerIdcard,callback:function(e){t.$set(t.form,"shipownerIdcard","string"===typeof e?e.trim():e)},expression:"form.shipownerIdcard"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系号码",prop:"shipownerMobile"}},[r("el-input",{model:{value:t.form.shipownerMobile,callback:function(e){t.$set(t.form,"shipownerMobile","string"===typeof e?e.trim():e)},expression:"form.shipownerMobile"}})],1)],1)],1),r("div",{staticClass:"title"},[t._v("船员信息")]),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船员姓名",prop:"crewRealName"}},[r("el-input",{model:{value:t.form.crewRealName,callback:function(e){t.$set(t.form,"crewRealName","string"===typeof e?e.trim():e)},expression:"form.crewRealName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证号",prop:"crewIdcard"}},[r("el-input",{on:{blur:t.getEmployee},model:{value:t.form.crewIdcard,callback:function(e){t.$set(t.form,"crewIdcard","string"===typeof e?e.trim():e)},expression:"form.crewIdcard"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话",prop:"crewPhone"}},[r("el-input",{model:{value:t.form.crewPhone,callback:function(e){t.$set(t.form,"crewPhone","string"===typeof e?e.trim():e)},expression:"form.crewPhone"}})],1)],1)],1),r("div",{staticClass:"title"},[t._v("纠纷详情")]),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"纠纷原因",prop:"disputeReason"}},[r("el-select",{attrs:{placeholder:""},model:{value:t.form.disputeReason,callback:function(e){t.$set(t.form,"disputeReason",e)},expression:"form.disputeReason"}},t._l(t.maps.disputeReason,function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"纠纷描述",prop:"disputeContent"}},[r("iep-froala-editor",{attrs:{disabled:"detail"===t.status},model:{value:t.form.disputeContent,callback:function(e){t.$set(t.form,"disputeContent",e)},expression:"form.disputeContent"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"纠纷状态",prop:"status"}},[r("el-select",{attrs:{placeholder:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},t._l(t.maps.status,function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t.statusShow?r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"处理结果",prop:"result"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.form.result,callback:function(e){t.$set(t.form,"result","string"===typeof e?e.trim():e)},expression:"form.result"}})],1)],1):t._e(),1==t.type?r("el-col",{directives:[{name:"show",rawName:"v-show",value:t.statusShow,expression:"statusShow"}],attrs:{span:12}},[r("el-form-item",{attrs:{label:"船东分",prop:"shipownerScore"}},[r("el-rate",{staticStyle:{"margin-top":"10px"},attrs:{max:10,"show-score":"","text-color":"#ff9900"},model:{value:t.form.shipownerScore,callback:function(e){t.$set(t.form,"shipownerScore",e)},expression:"form.shipownerScore"}})],1)],1):t._e(),1==t.type?r("el-col",{directives:[{name:"show",rawName:"v-show",value:t.statusShow,expression:"statusShow"}],attrs:{span:12}},[r("el-form-item",{attrs:{label:"船员分",prop:"crewScore"}},[r("el-rate",{staticStyle:{"margin-top":"10px"},attrs:{max:10,"show-score":"","text-color":"#ff9900"},model:{value:t.form.crewScore,callback:function(e){t.$set(t.form,"crewScore",e)},expression:"form.crewScore"}})],1)],1):t._e()],1)],1),"detail"!==t.status?r("operation-wrapper",[r("iep-button",{staticStyle:{"margin-left":"150px"},attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1):t._e()],1)},o=[],a=r("53ca"),c=r("be94"),i=(r("6762"),r("f8e9")),u=r("ade36"),s=r("5612"),l=r("b047"),d=r.n(l),m=r("647f"),p=r("2f62");function f(){return{id:void 0,shipName:"",shipowner:"",shipownerIdcard:"",shipownerMobile:"",crewRealName:"",crewIdcard:"",crewPhone:"",disputeReason:"",disputeContent:"",status:"",result:"",shipownerScore:"",crewScore:""}}var h={data:function(){var t=this;this.getShipNameList=d()(this.getShipNameList,50);var e=function(t,e,r){var n=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;""===e?r(new Error("请输入身份证号")):n.test(e)?r():r(new Error("身份证号不正确"))},r=function(t,e,r){""===e?r(new Error("请输入手机号")):/^1[3456789]\d{9}$/.test(e)?r():r(new Error("手机号不正确"))};return{form:f(),disabled:!1,status:"",statusShow:!1,loading:!1,shipNames:[],type:"",maps:m["a"],rules:{shipName:[{required:!0,message:"请输入渔船名",trigger:"change"}],shipowner:[{required:!0,message:"请输入持证人/公司名称",trigger:"blur, change"}],shipownerIdcard:[{required:!0,message:"请输入身份证/企业代码",min:18,max:18,trigger:"blur"}],shipownerMobile:[{required:!0,message:"请输入联系号码",trigger:"blur"},{validator:r,trigger:"blur"}],crewRealName:[{required:!0,message:"请输入船员姓名",trigger:"blur"}],crewIdcard:[{required:!0,message:"请输入身份证号",trigger:"blur"},{validator:e,trigger:"blur"}],crewPhone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:r,trigger:"blur"}],disputeReason:[{required:!0,message:"请选择纠纷原因",trigger:"change"}],disputeContent:[{required:!0,message:"请输入纠纷描述",trigger:"blur"}],result:[{required:!0,message:"请输入处理结果",trigger:"blur"}]},backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}}}},watch:{"form.status":{handler:function(t){this.statusShow=1===t,this.statusShow||(this.form.shipownerScore="",this.form.crewScore="",this.form.result="")},deep:!0}},mounted:function(){var t=this.$route.query;t.status&&(this.status=t.status),t.id&&this.getList(t.id),this.type="";for(var e=[111],r=0,n=this.roles.length;r<n;r++)if(e.includes(this.roles[r]))return void(this.type=1);this.type=2},computed:Object(c["a"])({title:function(){return"create"===this.status?"新增劳务纠纷管理":"update"===this.status?"编辑劳务纠纷管理":"劳务纠纷管理"}},Object(p["c"])(["roles"])),methods:{getEmployee:function(){var t=this,e=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;""!==this.form.crewIdcard&&(e.test(this.form.crewIdcard)?Object(s["f"])(this.form.crewIdcard).then(function(e){var r=e.data;0===r.code&&(t.form.crewRealName=r.data.realName,t.form.crewPhone=r.data.phone)}):this.$message({message:"身份证号码不正确",type:"warning"}))},getShipNameList:function(t){var e=this;this.loading=!1,""!==t?Object(u["x"])(t).then(function(t){var r=t.data;0===r.code&&(e.shipNames=[],e.shipNames=r.data)}):this.shipNames=[],this.loading=!1},shipNameChange:function(t){"object"===Object(a["a"])(t)?this.refreshShipName(t):this.refreshShipName({shipName:t}),this.shipNames=[]},refreshShipName:function(t){if(null!==t){var e=t.shipName,r=void 0===e?"":e,n=t.shipowner,o=void 0===n?"":n,a=t.shipownerIdcard,c=void 0===a?"":a,i=t.mobile,u=void 0===i?"":i;this.form.shipName=r,this.form.shipowner=o,this.form.shipownerIdcard=c,this.form.shipownerMobile=u}else this.form.shipName="",this.form.shipowner="",this.form.shipownerIdcard="",this.form.shipownerMobile=""},onGoBack:function(){this.$router.history.go(-1)},getList:function(t){var e=this;Object(i["d"])(t).then(function(t){var r=t.data;0===r.code&&(e.form=r.data)})},handleSubmit:function(){var t=this;this.$refs["ruleForm"].validate(function(e){if(!e)return console.log("error submit!!"),!1;var r="create"===t.status?i["a"]:"update"===t.status?i["b"]:null;r&&("update"===t.status&&(t.form.type=t.type),r(t.form).then(function(e){var r=e.data;0===r.code&&(t.$notify({message:"create"===t.status?"新增成功":"编辑成功",type:"success"}),t.onGoBack())}))})}}},b=h,g=(r("e598"),r("2877")),w=Object(g["a"])(b,n,o,!1,null,"6fb39722",null);e["default"]=w.exports},5612:function(t,e,r){"use strict";r.d(e,"i",function(){return c}),r.d(e,"j",function(){return i}),r.d(e,"l",function(){return u}),r.d(e,"m",function(){return s}),r.d(e,"r",function(){return l}),r.d(e,"c",function(){return d}),r.d(e,"t",function(){return m}),r.d(e,"u",function(){return p}),r.d(e,"d",function(){return f}),r.d(e,"e",function(){return h}),r.d(e,"g",function(){return b}),r.d(e,"v",function(){return g}),r.d(e,"f",function(){return w}),r.d(e,"z",function(){return v}),r.d(e,"k",function(){return y}),r.d(e,"n",function(){return O}),r.d(e,"h",function(){return j}),r.d(e,"p",function(){return S}),r.d(e,"x",function(){return x}),r.d(e,"y",function(){return N}),r.d(e,"w",function(){return I}),r.d(e,"b",function(){return k}),r.d(e,"q",function(){return R}),r.d(e,"a",function(){return C}),r.d(e,"s",function(){return E}),r.d(e,"o",function(){return $});var n=r("b5c6"),o=r("2f9e"),a="/tmlms/crew";function c(t){return Object(n["a"])({url:"".concat(a,"/Page"),method:"get",params:t})}function i(t){return Object(n["a"])({url:"".concat(a,"/findByShipId?shipId=").concat(t),method:"get",params:t})}function u(t){return Object(n["a"])({url:"".concat(a,"/getHistoryByShipId?shipId=").concat(t.shipId),method:"get",params:t})}function s(t){return Object(n["a"])({url:"".concat(a,"/pageWithShip"),method:"get",params:t})}function l(t){return Object(n["a"])({url:"".concat(a,"/shipLogPage"),method:"get",params:t})}function d(t){return Object(n["a"])({url:"".concat(a,"/checkMoreRelations"),method:"post",data:t})}function m(t,e){return Object(n["a"])({url:"".concat(a,"/create?type=").concat(e),method:"post",data:t})}function p(t,e){return Object(n["a"])({url:"".concat(a,"/batchCreate?type=").concat(e),method:"post",data:t,timeout:3e5})}function f(t){return Object(n["a"])({url:"".concat(a,"/delete?idcard=").concat(t),method:"post"})}function h(t,e){return Object(n["a"])({url:"".concat(a,"/deleteRelation?idcard=").concat(t,"&&shipId=").concat(e),method:"post"})}function b(t,e){return Object(n["a"])({url:"".concat(a,"/edit?type=").concat(e),method:"post",data:t})}function g(t,e){return Object(n["a"])({url:"".concat(a,"/review?status=").concat(t,"&userId=").concat(e),method:"post"})}function w(t){return Object(n["a"])({url:"".concat(a,"/getCrewByidcard?idcard=").concat(t),method:"get"})}function v(t){return Object(n["a"])({url:"admin/file/upload/avatar",method:"post",data:t})}function y(t){return Object(n["a"])({url:"".concat(a,"/idcardcheck?idcard=").concat(t),method:"get"})}function O(t){return Object(n["a"])({url:"".concat(a,"/idcardcheck?idcard=").concat(t),method:"get"})}function j(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"船员信息";return Object(o["a"])({url:"tmlms/tybmlmsExcelExport/downloadCrew",data:t,title:e})}function S(t){return Object(n["a"])({url:"".concat(a,"/badPage"),method:"get",params:t})}function x(t){return Object(n["a"])({url:"".concat(a,"/badUpdateBatch"),method:"post",data:t})}function N(t){return Object(n["a"])({url:"".concat(a,"/uploadBaseImage"),method:"post",data:t})}function I(t){return Object(n["a"])({url:"".concat(a,"/updateCertByIdcard"),method:"post",params:t})}function k(t){return Object(n["a"])({url:"".concat(a,"/changeShip"),method:"post",data:t})}function R(t){return Object(n["a"])({url:"".concat(a,"/getShipRelationByIdcard"),method:"get",params:t})}function C(t){return Object(n["a"])({url:"/tmlms/tybship/pageForChange",method:"get",params:t})}function E(t){return Object(n["a"])({url:"/tmlms/importTask/lookTask",method:"get",params:{taksId:t}})}function $(t){return Object(n["a"])({url:"/tmlms/crew_cert/newPage",method:"get",params:t})}},"647f":function(t,e,r){"use strict";var n={status:[{label:"解决中",value:0},{label:"已解决",value:1},{label:"未解决",value:2}],disputeReason:[{label:"工资不发",value:"1"},{label:"船员技能不够",value:"2"}]};e["a"]=n},ade36:function(t,e,r){"use strict";r.d(e,"w",function(){return c}),r.d(e,"e",function(){return i}),r.d(e,"r",function(){return u}),r.d(e,"d",function(){return s}),r.d(e,"t",function(){return l}),r.d(e,"v",function(){return d}),r.d(e,"h",function(){return m}),r.d(e,"J",function(){return p}),r.d(e,"i",function(){return f}),r.d(e,"s",function(){return h}),r.d(e,"x",function(){return b}),r.d(e,"y",function(){return g}),r.d(e,"o",function(){return w}),r.d(e,"u",function(){return v}),r.d(e,"z",function(){return y}),r.d(e,"k",function(){return O}),r.d(e,"m",function(){return j}),r.d(e,"l",function(){return S}),r.d(e,"n",function(){return x}),r.d(e,"j",function(){return N}),r.d(e,"G",function(){return I}),r.d(e,"H",function(){return k}),r.d(e,"b",function(){return R}),r.d(e,"D",function(){return C}),r.d(e,"I",function(){return E}),r.d(e,"C",function(){return $}),r.d(e,"q",function(){return B}),r.d(e,"A",function(){return _}),r.d(e,"c",function(){return P}),r.d(e,"B",function(){return q}),r.d(e,"f",function(){return L}),r.d(e,"g",function(){return M}),r.d(e,"E",function(){return T}),r.d(e,"a",function(){return F}),r.d(e,"K",function(){return U}),r.d(e,"p",function(){return G}),r.d(e,"F",function(){return J});var n=r("b5c6"),o=r("2f9e"),a="/tybship/tybship";function c(t){return Object(n["a"])({url:"".concat(a,"/otherpage"),method:"get",params:t})}function i(t,e){return Object(n["a"])({url:"".concat(a,"/updateVillage?shipId=").concat(t,"&&villageId=").concat(e),method:"post"})}function u(){return Object(n["a"])({url:"/admin/org/page",method:"get"})}function s(t,e){return Object(n["a"])({url:"".concat(a,"/updateOrgId?shipId=").concat(t,"&&orgId=").concat(e),method:"post"})}function l(t){return Object(n["a"])({url:"".concat(a,"/").concat(t),method:"get",params:t})}function d(t){return Object(n["a"])({url:"".concat(a,"/").concat(t),method:"get"})}function m(t){return Object(n["a"])({url:"".concat(a,"/save"),method:"post",data:t})}function p(t){return Object(n["a"])({url:"".concat(a,"/update"),method:"post",data:t})}function f(t){return Object(n["a"])({url:"".concat(a,"/del/").concat(t),method:"post"})}function h(t){return Object(n["a"])({url:"".concat(a,"/mypage"),method:"get",params:t})}function b(t){return Object(n["a"])({url:"".concat(a,"/findship/").concat(t),method:"get"})}function g(t){return Object(n["a"])({url:"".concat(a,"/findshipWithOutOrg/").concat(t),method:"get"})}function w(t){return Object(n["a"])({url:"/tmlms/tybship/findmyship/".concat(t),method:"get"})}function v(t){return Object(n["a"])({url:"".concat(a,"/searchByshipNo"),method:"get",params:{shipNo:t}})}function y(t){return Object(n["a"])({url:"".concat(a,"/newpageV2"),method:"get",params:t})}function O(t){return Object(o["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:t,title:"渔船信息"})}function j(t){return Object(o["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:t,title:"开航登记表-"+t.shipName})}function S(t){return Object(o["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewRecord",data:t,title:"实名登记备案表-"+t.shipName})}function x(t){return Object(o["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:t,title:"船员登记表-"+t.shipName})}function N(t){return Object(o["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:t,title:t.shipName})}function I(t){return Object(n["a"])({url:"tmlms/tyb_order/page",method:"get",params:t})}function k(t){return Object(n["a"])({url:"tmlms/tyb_order/getById",method:"get",params:t})}function R(t){return Object(n["a"])({url:"tmlms/tyb_order/agree",method:"post",data:t})}function C(t){return Object(n["a"])({url:"tmlms/tyb_order/reject",method:"post",data:t})}function E(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:t})}function $(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/lastRecord",method:"get",params:t})}function B(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/getCrewByRecordId",method:"get",params:t})}function _(t){return Object(n["a"])({url:"/tybship/tybship/info/".concat(t),method:"get"})}function P(t){return Object(n["a"])({url:"/tmlms/crew_cert/certStandard/".concat(t),method:"get"})}function q(t){return Object(n["a"])({url:"/tmlms/investigationReport/pageByShipName?shipName=".concat(t),method:"get"})}function L(t){return Object(n["a"])({url:"/tmlms/crew/countContractByShipId?shipId=".concat(t),method:"get"})}function M(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:t})}function T(t){return Object(n["a"])({url:"/tmlms/tybTroubleshootReport/pageByShipNo",method:"get",params:t})}function F(t){return Object(n["a"])({url:"/tmlms/tyb_order/pageByShipName",method:"get",params:t})}function U(t){return Object(n["a"])({url:"/tmlms/verification/page",method:"get",params:t})}function G(t){return console.log(t),Object(n["a"])({url:"/tmlms/tyb_order/getById?id=".concat(t.id),method:"get"})}function J(t){return Object(n["a"])({url:"/tmlms/tybmlmsExcelExport/downVerification",method:"post",headers:{"Content-Type":"application/json"},responseType:"arraybuffer",data:t}).then(function(t){var e=new Blob([t.data],{type:"application/vnd.ms-excel"}),r=document.createElement("a");r.href=window.URL.createObjectURL(e),r.download="实船鉴证.xls",r.click()})}},c82c:function(t,e,r){},e598:function(t,e,r){"use strict";r("c82c")},f8e9:function(t,e,r){"use strict";r.d(e,"c",function(){return a}),r.d(e,"a",function(){return c}),r.d(e,"b",function(){return i}),r.d(e,"e",function(){return u}),r.d(e,"d",function(){return s});var n=r("b5c6"),o="/tmlms/dispute";function a(t){return Object(n["a"])({url:"".concat(o,"/getPage"),method:"get",params:t})}function c(t){return Object(n["a"])({url:"".concat(o,"/create"),method:"post",data:t})}function i(t){return Object(n["a"])({url:"".concat(o,"/edit?type=").concat(t.type),method:"post",data:t})}function u(t){return Object(n["a"])({url:"".concat(o,"/remove/").concat(t),method:"post"})}function s(t){return Object(n["a"])({url:"".concat(o,"/").concat(t),method:"get"})}}}]);