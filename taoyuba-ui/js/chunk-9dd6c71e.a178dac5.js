(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9dd6c71e"],{"20d6":function(t,e,r){"use strict";var n=r("5ca1"),a=r("0a49")(6),o="findIndex",i=!0;o in[]&&Array(1)[o]((function(){i=!1})),n(n.P+n.F*i,"Array",{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),r("9c6c")(o)},"2f9e":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("ac6a"),r("28a5"),r("a481");var n=r("b5c6");function a(t){var e=t.url,r=t.method,a=void 0===r?"post":r,i=t.data,s=void 0===i?{}:i,c=t.title,u=void 0===c?"":c;return new Promise((function(t){return Object(n["a"])({url:e,method:a,headers:{responseType:"arraybuffer"},data:s,responseType:"blob"}).then((function(e){o({title:u,response:e}).then((function(){t()}))}))}))}function o(t){var e=t.title,r=void 0===e?"":e,n=t.response,a=i(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(t){var e=n.headers,o=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,r);else{var i=document.createElement("a");i.href=window.URL.createObjectURL(o),i.download=r?"".concat(r,".").concat(a.suffix):a.filename,document.body.appendChild(i),i.style.display="none",i.click()}t()}))}function i(t){var e={},r=t.split(";");return r.forEach((function(t){var r=t.replace(/^\s+|\s+$/g,""),n=r.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]})),e.suffix=e.filename.split(".")[1],e}},3490:function(t,e,r){"use strict";r.d(e,"d",(function(){return o})),r.d(e,"c",(function(){return i})),r.d(e,"e",(function(){return s})),r.d(e,"h",(function(){return c})),r.d(e,"i",(function(){return u})),r.d(e,"a",(function(){return l})),r.d(e,"f",(function(){return p})),r.d(e,"b",(function(){return m})),r.d(e,"g",(function(){return d}));r("28a5");var n=r("b5c6"),a="/tmlms/relationship";function o(t){return Object(n["a"])({url:"".concat(a,"/getPage"),method:"get",params:t})}function i(t){return Object(n["a"])({url:"".concat(a,"/countRecord"),method:"get",params:t})}function s(t){return Object(n["a"])({url:"".concat(a,"/").concat(t),method:"get"})}function c(t){return Object(n["a"])({url:"".concat(a,"/remove"),method:"post",params:t})}function u(t){return Object(n["a"])({url:"".concat(a,"/edit"),method:"post",data:t})}function l(t){return Object(n["a"])({url:"".concat(a,"/create"),method:"post",data:t})}function p(t){return Object(n["a"])({url:"".concat(a,"/getLast"),method:"get",params:t})}function m(t){return new Promise((function(e,r){Object(n["a"])({url:"",method:"post",data:t,responseType:"arraybuffer"}).then((function(t){var r=t.headers["content-disposition"].split(";")[1];r=decodeURIComponent(r.split("=")[1]);var n=new Blob([t.data]),a=document.createElement("a");a.href=window.URL.createObjectURL(n),a.download=r,document.body.appendChild(a),a.style.display="none",a.click(),e()})).catch((function(){r()}))}))}function d(t){return Object(n["a"])({url:"/tmlms/statistic/relationRecordWithDays",method:"get",params:t})}},7981:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("basic-container",[r("page-header",{attrs:{title:t.title,backOption:t.backOption}}),r("edit-form",{ref:"editForm",attrs:{status:t.status},on:{end:t.onGoBack}}),"detail"!==t.status?r("operation-wrapper",[r("iep-button",{staticStyle:{"margin-left":"150px"},attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1):t._e()],1)},a=[],o=r("e0ea"),i=r("84df"),s={props:{status:String,id:String},components:{editForm:o["default"]},data:function(){var t=this;return{backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}}}},computed:{title:function(){return"add"===this.status?"新增联系记录":"detail"===this.status?"联系记录详情":"update"===this.status?"编辑联系记录":"联系记录"}},methods:{open:function(t){t&&this.$refs.editForm.getList(t),"add"===this.status&&this.$set(this.$refs.editForm.form,"relationshipTime",Object(i["a"])())},onGoBack:function(){this.$emit("go-back")},handleSubmit:function(){this.$refs.editForm.handleSubmit()}}},c=s,u=r("2877"),l=Object(u["a"])(c,n,a,!1,null,"340a4f3a",null);e["default"]=l.exports},"84df":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("c1df"),a=r.n(n),o=function(){return a()().format("YYYY-MM-DD HH:mm:ss")}},ade36:function(t,e,r){"use strict";r.d(e,"w",(function(){return i})),r.d(e,"e",(function(){return s})),r.d(e,"r",(function(){return c})),r.d(e,"d",(function(){return u})),r.d(e,"t",(function(){return l})),r.d(e,"v",(function(){return p})),r.d(e,"h",(function(){return m})),r.d(e,"J",(function(){return d})),r.d(e,"i",(function(){return f})),r.d(e,"s",(function(){return h})),r.d(e,"x",(function(){return b})),r.d(e,"y",(function(){return g})),r.d(e,"o",(function(){return y})),r.d(e,"u",(function(){return v})),r.d(e,"z",(function(){return O})),r.d(e,"k",(function(){return w})),r.d(e,"m",(function(){return j})),r.d(e,"l",(function(){return N})),r.d(e,"n",(function(){return x})),r.d(e,"j",(function(){return k})),r.d(e,"G",(function(){return P})),r.d(e,"H",(function(){return S})),r.d(e,"b",(function(){return I})),r.d(e,"D",(function(){return R})),r.d(e,"I",(function(){return T})),r.d(e,"C",(function(){return B})),r.d(e,"q",(function(){return $})),r.d(e,"A",(function(){return E})),r.d(e,"c",(function(){return _})),r.d(e,"B",(function(){return C})),r.d(e,"f",(function(){return L})),r.d(e,"g",(function(){return U})),r.d(e,"E",(function(){return D})),r.d(e,"a",(function(){return F})),r.d(e,"K",(function(){return M})),r.d(e,"p",(function(){return q})),r.d(e,"F",(function(){return A}));var n=r("b5c6"),a=r("2f9e"),o="/tybship/tybship";function i(t){return Object(n["a"])({url:"".concat(o,"/otherpage"),method:"get",params:t})}function s(t,e){return Object(n["a"])({url:"".concat(o,"/updateVillage?shipId=").concat(t,"&&villageId=").concat(e),method:"post"})}function c(){return Object(n["a"])({url:"/admin/org/page",method:"get"})}function u(t,e){return Object(n["a"])({url:"".concat(o,"/updateOrgId?shipId=").concat(t,"&&orgId=").concat(e),method:"post"})}function l(t){return Object(n["a"])({url:"".concat(o,"/").concat(t),method:"get",params:t})}function p(t){return Object(n["a"])({url:"".concat(o,"/").concat(t),method:"get"})}function m(t){return Object(n["a"])({url:"".concat(o,"/save"),method:"post",data:t})}function d(t){return Object(n["a"])({url:"".concat(o,"/update"),method:"post",data:t})}function f(t){return Object(n["a"])({url:"".concat(o,"/del/").concat(t),method:"post"})}function h(t){return Object(n["a"])({url:"".concat(o,"/mypage"),method:"get",params:t})}function b(t){return Object(n["a"])({url:"".concat(o,"/findship/").concat(t),method:"get"})}function g(t){return Object(n["a"])({url:"".concat(o,"/findshipWithOutOrg/").concat(t),method:"get"})}function y(t){return Object(n["a"])({url:"/tmlms/tybship/findmyship/".concat(t),method:"get"})}function v(t){return Object(n["a"])({url:"".concat(o,"/searchByshipNo"),method:"get",params:{shipNo:t}})}function O(t){return Object(n["a"])({url:"".concat(o,"/newpageV2"),method:"get",params:t})}function w(t){return Object(a["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:t,title:"渔船信息"})}function j(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:t,title:"开航登记表-"+t.shipName})}function N(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewRecord",data:t,title:"实名登记备案表-"+t.shipName})}function x(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:t,title:"船员登记表-"+t.shipName})}function k(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:t,title:t.shipName})}function P(t){return Object(n["a"])({url:"tmlms/tyb_order/page",method:"get",params:t})}function S(t){return Object(n["a"])({url:"tmlms/tyb_order/getById",method:"get",params:t})}function I(t){return Object(n["a"])({url:"tmlms/tyb_order/agree",method:"post",data:t})}function R(t){return Object(n["a"])({url:"tmlms/tyb_order/reject",method:"post",data:t})}function T(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:t})}function B(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/lastRecord",method:"get",params:t})}function $(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/getCrewByRecordId",method:"get",params:t})}function E(t){return Object(n["a"])({url:"/tybship/tybship/info/".concat(t),method:"get"})}function _(t){return Object(n["a"])({url:"/tmlms/crew_cert/certStandard/".concat(t),method:"get"})}function C(t){return Object(n["a"])({url:"/tmlms/investigationReport/pageByShipName?shipName=".concat(t),method:"get"})}function L(t){return Object(n["a"])({url:"/tmlms/crew/countContractByShipId?shipId=".concat(t),method:"get"})}function U(t){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:t})}function D(t){return Object(n["a"])({url:"/tmlms/tybTroubleshootReport/pageByShipNo",method:"get",params:t})}function F(t){return Object(n["a"])({url:"/tmlms/tyb_order/pageByShipName",method:"get",params:t})}function M(t){return Object(n["a"])({url:"/tmlms/verification/page",method:"get",params:t})}function q(t){return console.log(t),Object(n["a"])({url:"/tmlms/tyb_order/getById?id=".concat(t.id),method:"get"})}function A(t){return Object(n["a"])({url:"/tmlms/tybmlmsExcelExport/downVerification",method:"post",headers:{"Content-Type":"application/json"},responseType:"arraybuffer",data:t}).then((function(t){var e=new Blob([t.data],{type:"application/vnd.ms-excel"}),r=document.createElement("a");r.href=window.URL.createObjectURL(e),r.download="实船鉴证.xls",r.click()}))}},cec6:function(t,e,r){"use strict";e["a"]={relationshipReason:[{label:"A",value:"1"},{label:"B",value:"2"}],relationshipType:[{label:"手机",value:1},{label:"座机",value:2},{label:"微信",value:3},{label:"其他",value:4}]}},e0ea:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":"150px",disabled:"detail"===t.status}},[r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"渔船名",prop:"shipName"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"",filterable:"",remote:"",disabled:t.shipNameDisabled,maxlength:"20","remote-method":t.getShipNameList},on:{change:t.onChange},model:{value:t.form.shipName,callback:function(e){t.$set(t.form,"shipName",e)},expression:"form.shipName"}},t._l(t.shipNames,(function(t){return r("el-option",{key:t.shipId,attrs:{label:t.shipName,value:t.shipName}})})),1)],1)],1),r("el-col",{attrs:{span:t.span}},[r("el-form-item",{attrs:{label:"联系人",prop:"shipownerName"}},[r("el-input",{model:{value:t.form.shipownerName,callback:function(e){t.$set(t.form,"shipownerName","string"===typeof e?e.trim():e)},expression:"form.shipownerName"}})],1)],1),r("el-col",{attrs:{span:t.span}},[r("el-form-item",{attrs:{label:"手机号",prop:"shipownerPhone"}},[r("el-input",{attrs:{type:"number"},model:{value:t.form.shipownerPhone,callback:function(e){t.$set(t.form,"shipownerPhone","string"===typeof e?e.trim():e)},expression:"form.shipownerPhone"}})],1)],1),r("el-col",{attrs:{span:t.span}},[r("el-form-item",{attrs:{label:"联系设备",prop:"relationshipType"}},[r("el-select",{attrs:{placeholder:""},model:{value:t.form.relationshipType,callback:function(e){t.$set(t.form,"relationshipType",e)},expression:"form.relationshipType"}},t._l(t.map.relationshipType,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1),r("el-col",{attrs:{span:t.span}},[3!==t.form.relationshipType?r("el-form-item",{attrs:{label:"联系号码",prop:"relationshipNumber"}},[r("el-input",{model:{value:t.form.relationshipNumber,callback:function(e){t.$set(t.form,"relationshipNumber","string"===typeof e?e.trim():e)},expression:"form.relationshipNumber"}})],1):t._e()],1),r("el-col",{attrs:{span:t.span}},[r("el-form-item",{attrs:{label:"联系事由",prop:"relationshipReason"}},[r("el-input",{attrs:{maxlength:"50"},model:{value:t.form.relationshipReason,callback:function(e){t.$set(t.form,"relationshipReason","string"===typeof e?e.trim():e)},expression:"form.relationshipReason"}})],1)],1),r("el-col",{attrs:{span:t.span}},[r("el-form-item",{attrs:{label:"联系时间",prop:"relationshipTime"}},[r("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"",align:"right"},model:{value:t.form.relationshipTime,callback:function(e){t.$set(t.form,"relationshipTime",e)},expression:"form.relationshipTime"}})],1)],1),r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"附件"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:"/api/admin/file/upload/avatar","on-success":t.handleSuccess,"on-remove":t.handleRemove,"before-upload":t.handleBeforeUpload,"file-list":t.fileList,"on-preview":t.handlePictureCardPreview,multiple:"",headers:t.headers,"list-type":"picture-card"}},[r("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v(t._s("只能上传图片文件，且不超过4M"))])],1)],1)],1)],1),r("el-dialog",{attrs:{visible:t.dialogVisible,"append-to-body":"",width:"820px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("div",{staticStyle:{"text-align":"center"}},[r("img",{staticStyle:{"max-width":"780px"},attrs:{src:t.dialogImageUrl,alt:""}})])])],1)},a=[],o=(r("8e6e"),r("456d"),r("96cf"),r("1da1")),i=(r("20d6"),r("ac6a"),r("ade3")),s=(r("c5f6"),r("3490")),c=r("ade36"),u=r("2f62"),l=r("0644"),p=r.n(l),m=r("cec6");function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){Object(i["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var h={props:{status:String,value:{type:Object,default:function(){return{shipName:""}}},span:{type:Number,dafault:24},shipNameDisabled:{type:Boolean,dafault:!1}},data:function(){return{dialogImageUrl:"",dialogVisible:!1,map:m["a"],form:{shipownerName:"",shipownerPhone:"",relationshipType:"",files:[]},fileList:[],shipNames:[],pickerOptions:{shortcuts:[{text:"今天",onClick:function(t){t.$emit("pick",new Date)}}]},rules:{shipName:[{required:!0,message:"请输入渔船名",trigger:["change","blur"]}],shipownerName:[{required:!0,message:"请输入联系人",trigger:"blur"}],shipownerPhone:[{required:!0,message:"请输入手机号",trigger:"blur"}],relationshipType:[{required:!0,message:"请选择联系设备",trigger:"change"}],relationshipNumber:[{required:!0,message:"请输入联系号码",trigger:"blur"}],relationshipReason:[{required:!0,message:"请选择联系事由",trigger:"blur"}],relationshipTime:[{required:!0,message:"请选择联系时间",trigger:"change"}]}}},computed:f(f({},Object(u["c"])(["dictGroup","access_token"])),{},{headers:function(){return{Authorization:"Bearer "+this.access_token}}}),watch:{"form.relationshipType":{handler:function(t){this.getShipNameLastInfo(),3===t&&(this.form.relationshipNumber="")}},"form.shipName":{handler:function(){this.getShipNameLastInfo()}},value:{handler:function(t){this.form.shipName=t.shipName||"",this.form.shipownerName=t.shipownerName||"",this.form.shipownerPhone=t.shipownerPhone||"",this.getShipNameLastInfo()},deep:!0,immediate:!0}},methods:{handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleSuccess:function(t,e,r){var n=p()(this.form.files);Array.isArray(this.form.files)||(this.form.files=[]),r.forEach((function(t){var e={name:"",url:t.response?t.response.data.url:""};""!==e.url&&-1===n.findIndex((function(t){return t.url===e.url}))&&n.push(e)})),this.form.files=n},handleRemove:function(t){var e=t.url,r=this.form.files.findIndex((function(t){return t.url===e}));r>-1&&this.form.files.splice(r,1)},handleBeforeUpload:function(t){var e=t.size/1024/1024<4;return e||this.$message.error("上传图片大小不能超过4MB"),e},getShipNameLastInfo:function(){var t=this;this.form.shipName&&this.form.relationshipType&&"detail"!==this.status&&Object(s["f"])({shipName:this.form.shipName,relationshipType:this.form.relationshipType}).then((function(e){var r=e.data;0===r.code&&r.data&&t.form.relationshipType===r.data.relationshipType&&t.$set(t.form,"relationshipNumber",r.data.relationshipNumber)}))},getShipNameList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(5!==e.length){t.next=12;break}return t.prev=1,t.next=4,Object(c["x"])(e);case 4:r=t.sent,n=r.data,0===n.code&&(this.shipNames=n.data),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),this.$message({message:t.t0||"数据查询失败",type:"warning"});case 12:case"end":return t.stop()}}),t,this,[[1,9]])})));function e(e){return t.apply(this,arguments)}return e}(),onChange:function(t){var e=this.shipNames.filter((function(e){return e.shipName===t}));console.log("data",e,t),e&&e.length>0?(this.$set(this.form,"shipownerName",e[0].shipowner),this.$set(this.form,"shipownerPhone",e[0].mobile),console.log("this.form",this.form)):(this.form.shipownerName="",this.form.shipownerPhone="")},getList:function(t){var e=this;Object(s["e"])(t).then((function(t){var r=t.data;if(0===r.code){var n=r.data,a=[];null==n.relationshipImages&&(n.relationshipImages=[]),n.relationshipImages.forEach((function(t){var e={name:"",url:t};a.push(e)})),e.fileList=a,n.files=a,e.form=n,console.log("result",n)}}))},handleSubmit:function(){var t=this;this.$refs["ruleForm"].validate((function(e){if(e){var r="add"===t.status?s["a"]:"update"===t.status?s["i"]:null;r&&(t.form.relationshipImages=t.form.files.map((function(t){return t.url}))||[],r(t.form).then((function(e){var r=e.data;0===r.code&&(t.$notify({message:"add"===t.status?"新增成功":"编辑成功",type:"success"}),t.$emit("end"))})))}}))}}},b=h,g=r("2877"),y=Object(g["a"])(b,n,a,!1,null,"9e767f86",null);e["default"]=y.exports}}]);