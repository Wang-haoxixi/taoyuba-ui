(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d9ce3a5"],{"295f":function(e,t,a){},"2f9e":function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("ac6a"),a("28a5"),a("a481");var n=a("b5c6");function i(e){var t=e.url,a=e.method,i=void 0===a?"post":a,s=e.data,o=void 0===s?{}:s,h=e.title,c=void 0===h?"":h;return new Promise((function(e){return Object(n["a"])({url:t,method:i,headers:{responseType:"arraybuffer"},data:o,responseType:"blob"}).then((function(t){r({title:c,response:t}).then((function(){e()}))}))}))}function r(e){var t=e.title,a=void 0===t?"":t,n=e.response,i=s(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=n.headers,r=new Blob([n.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(r,a);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(r),s.download=a?"".concat(a,".").concat(i.suffix):i.filename,document.body.appendChild(s),s.style.display="none",s.click()}e()}))}function s(e){var t={},a=e.split(";");return a.forEach((function(e){var a=e.replace(/^\s+|\s+$/g,""),n=a.split("=");n[1]?t[n[0]]=n[1]:t[n[0]]=n[0]})),t.suffix=t.filename.split(".")[1],t}},4917:function(e,t,a){"use strict";var n=a("cb7c"),i=a("9def"),r=a("0390"),s=a("5f1b");a("214f")("match",1,(function(e,t,a,o){return[function(a){var n=e(this),i=void 0==a?void 0:a[t];return void 0!==i?i.call(a,n):new RegExp(a)[t](String(n))},function(e){var t=o(a,e,this);if(t.done)return t.value;var h=n(e),c=String(this);if(!h.global)return s(h,c);var u=h.unicode;h.lastIndex=0;var l,d=[],p=0;while(null!==(l=s(h,c))){var m=String(l[0]);d[p]=m,""===m&&(h.lastIndex=r(c,i(h.lastIndex),u)),p++}return 0===p?null:d}]}))},6695:function(e,t,a){"use strict";a("295f")},"8a97":function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"f",(function(){return s})),a.d(t,"a",(function(){return o})),a.d(t,"c",(function(){return h})),a.d(t,"b",(function(){return c})),a.d(t,"e",(function(){return u}));var n=a("b5c6"),i="/tybship/tybshipchange";function r(e){return Object(n["a"])({url:"".concat(i,"/page"),method:"get",params:e})}function s(e){return Object(n["a"])({url:"".concat(i,"/save"),method:"post",data:e})}function o(e){return Object(n["a"])({url:"".concat(i,"/del/").concat(e),method:"post"})}function h(e){return Object(n["a"])({url:"".concat(i,"/update"),method:"post",data:e})}function c(e){return Object(n["a"])({url:"".concat(i,"/").concat(e),method:"get"})}function u(e){return Object(n["a"])({url:"".concat(i,"/review"),method:"post",params:e})}},ade36:function(e,t,a){"use strict";a.d(t,"w",(function(){return s})),a.d(t,"e",(function(){return o})),a.d(t,"r",(function(){return h})),a.d(t,"d",(function(){return c})),a.d(t,"t",(function(){return u})),a.d(t,"v",(function(){return l})),a.d(t,"h",(function(){return d})),a.d(t,"J",(function(){return p})),a.d(t,"i",(function(){return m})),a.d(t,"s",(function(){return g})),a.d(t,"x",(function(){return f})),a.d(t,"y",(function(){return b})),a.d(t,"o",(function(){return C})),a.d(t,"u",(function(){return v})),a.d(t,"z",(function(){return y})),a.d(t,"k",(function(){return w})),a.d(t,"m",(function(){return $})),a.d(t,"l",(function(){return O})),a.d(t,"n",(function(){return N})),a.d(t,"j",(function(){return j})),a.d(t,"G",(function(){return I})),a.d(t,"H",(function(){return S})),a.d(t,"b",(function(){return _})),a.d(t,"D",(function(){return x})),a.d(t,"I",(function(){return T})),a.d(t,"C",(function(){return R})),a.d(t,"q",(function(){return E})),a.d(t,"A",(function(){return q})),a.d(t,"c",(function(){return P})),a.d(t,"B",(function(){return k})),a.d(t,"f",(function(){return L})),a.d(t,"g",(function(){return B})),a.d(t,"E",(function(){return V})),a.d(t,"a",(function(){return D})),a.d(t,"K",(function(){return F})),a.d(t,"p",(function(){return M})),a.d(t,"F",(function(){return U}));var n=a("b5c6"),i=a("2f9e"),r="/tybship/tybship";function s(e){return Object(n["a"])({url:"".concat(r,"/otherpage"),method:"get",params:e})}function o(e,t){return Object(n["a"])({url:"".concat(r,"/updateVillage?shipId=").concat(e,"&&villageId=").concat(t),method:"post"})}function h(){return Object(n["a"])({url:"/admin/org/page",method:"get"})}function c(e,t){return Object(n["a"])({url:"".concat(r,"/updateOrgId?shipId=").concat(e,"&&orgId=").concat(t),method:"post"})}function u(e){return Object(n["a"])({url:"".concat(r,"/").concat(e),method:"get",params:e})}function l(e){return Object(n["a"])({url:"".concat(r,"/").concat(e),method:"get"})}function d(e){return Object(n["a"])({url:"".concat(r,"/save"),method:"post",data:e})}function p(e){return Object(n["a"])({url:"".concat(r,"/update"),method:"post",data:e})}function m(e){return Object(n["a"])({url:"".concat(r,"/del/").concat(e),method:"post"})}function g(e){return Object(n["a"])({url:"".concat(r,"/mypage"),method:"get",params:e})}function f(e){return Object(n["a"])({url:"".concat(r,"/findship/").concat(e),method:"get"})}function b(e){return Object(n["a"])({url:"".concat(r,"/findshipWithOutOrg/").concat(e),method:"get"})}function C(e){return Object(n["a"])({url:"/tmlms/tybship/findmyship/".concat(e),method:"get"})}function v(e){return Object(n["a"])({url:"".concat(r,"/searchByshipNo"),method:"get",params:{shipNo:e}})}function y(e){return Object(n["a"])({url:"".concat(r,"/newpageV2"),method:"get",params:e})}function w(e){return Object(i["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:e,title:"渔船信息"})}function $(e){return Object(i["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:e,title:"开航登记表-"+e.shipName})}function O(e){return Object(i["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewRecord",data:e,title:"实名登记备案表-"+e.shipName})}function N(e){return Object(i["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:e,title:"船员登记表-"+e.shipName})}function j(e){return Object(i["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:e,title:e.shipName})}function I(e){return Object(n["a"])({url:"tmlms/tyb_order/page",method:"get",params:e})}function S(e){return Object(n["a"])({url:"tmlms/tyb_order/getById",method:"get",params:e})}function _(e){return Object(n["a"])({url:"tmlms/tyb_order/agree",method:"post",data:e})}function x(e){return Object(n["a"])({url:"tmlms/tyb_order/reject",method:"post",data:e})}function T(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:e})}function R(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/lastRecord",method:"get",params:e})}function E(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/getCrewByRecordId",method:"get",params:e})}function q(e){return Object(n["a"])({url:"/tybship/tybship/info/".concat(e),method:"get"})}function P(e){return Object(n["a"])({url:"/tmlms/crew_cert/certStandard/".concat(e),method:"get"})}function k(e){return Object(n["a"])({url:"/tmlms/investigationReport/pageByShipName?shipName=".concat(e),method:"get"})}function L(e){return Object(n["a"])({url:"/tmlms/crew/countContractByShipId?shipId=".concat(e),method:"get"})}function B(e){return Object(n["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:e})}function V(e){return Object(n["a"])({url:"/tmlms/tybTroubleshootReport/pageByShipNo",method:"get",params:e})}function D(e){return Object(n["a"])({url:"/tmlms/tyb_order/pageByShipName",method:"get",params:e})}function F(e){return Object(n["a"])({url:"/tmlms/verification/page",method:"get",params:e})}function M(e){return console.log(e),Object(n["a"])({url:"/tmlms/tyb_order/getById?id=".concat(e.id),method:"get"})}function U(e){return Object(n["a"])({url:"/tmlms/tybmlmsExcelExport/downVerification",method:"post",headers:{"Content-Type":"application/json"},responseType:"arraybuffer",data:e}).then((function(e){var t=new Blob([e.data],{type:"application/vnd.ms-excel"}),a=document.createElement("a");a.href=window.URL.createObjectURL(t),a.download="实船鉴证.xls",a.click()}))}},c6d2:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"training_detail"},[a("basic-container",[a("h1",[e._v(e._s(e.$route.query.see?"查看":e.$route.query.edit?"编辑":"新增")+"变更渔船信息")]),a("el-form",{ref:"form",attrs:{model:e.shipChange,"label-width":"150px",rules:e.rules,disabled:e.seeManager}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"变更类型:",prop:"type"}},[a("el-radio-group",{attrs:{disabled:e.isDisabled},on:{change:e.changeType},model:{value:e.shipChange.type,callback:function(t){e.$set(e.shipChange,"type",t)},expression:"shipChange.type"}},[a("el-radio",{attrs:{label:1}},[e._v("变更船名")]),a("el-radio",{attrs:{label:2}},[e._v("变更持证人")]),a("el-radio",{attrs:{label:3}},[e._v("变更服务公司")])],1)],1)],1),a("el-col",{attrs:{span:12}},[1===e.isType||2===e.isType||3===e.isType?a("el-form-item",{attrs:{label:"渔船名:",prop:"shipName"}},[a("el-select",{ref:"select",staticStyle:{width:"380px!important"},attrs:{placeholder:"请填写",filterable:"",remote:"",maxlength:"20",loading:e.loading,clearable:"","remote-method":e.getShipNameList,disabled:e.isDisabled},on:{change:e.shipNameChange},model:{value:e.shipChange.shipName,callback:function(t){e.$set(e.shipChange,"shipName",t)},expression:"shipChange.shipName"}},e._l(e.shipNames,(function(e){return a("el-option",{key:e.shipNo,attrs:{label:e.shipName,value:e}})})),1)],1):e._e()],1),a("el-col",{attrs:{span:12}},[1===e.isType?a("el-form-item",{attrs:{label:"变更渔船名:",prop:"newShipName"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.shipChange.newShipName,callback:function(t){e.$set(e.shipChange,"newShipName",t)},expression:"shipChange.newShipName"}})],1):e._e()],1),a("el-col",{attrs:{span:12}},[1===e.isType||2===e.isType?a("el-form-item",{attrs:{label:"持证人姓名:",prop:"shipownerName"}},[a("el-input",{attrs:{placeholder:"",disabled:e.isOpen},model:{value:e.shipChange.shipownerName,callback:function(t){e.$set(e.shipChange,"shipownerName",t)},expression:"shipChange.shipownerName"}})],1):e._e()],1),a("el-col",{attrs:{span:12}},[1===e.isType||2===e.isType?a("el-form-item",{attrs:{label:"持证人身份证:",prop:"shipownerIdcard"}},[a("el-input",{attrs:{placeholder:"",disabled:e.isOpen},model:{value:e.shipChange.shipownerIdcard,callback:function(t){e.$set(e.shipChange,"shipownerIdcard",t)},expression:"shipChange.shipownerIdcard"}})],1):e._e()],1),a("el-col",{attrs:{span:12}},[1===e.isType||2===e.isType?a("el-form-item",{attrs:{label:"联系电话:",prop:"shipownerPhone"}},[a("el-input",{attrs:{placeholder:"",disabled:e.isOpen},model:{value:e.shipChange.shipownerPhone,callback:function(t){e.$set(e.shipChange,"shipownerPhone",t)},expression:"shipChange.shipownerPhone"}})],1):e._e()],1),a("el-col",{attrs:{span:12}},[1===e.isType||2===e.isType?a("el-form-item",{attrs:{label:"应急联系电话:",prop:"otherPhone"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.shipChange.otherPhone,callback:function(t){e.$set(e.shipChange,"otherPhone",t)},expression:"shipChange.otherPhone"}})],1):e._e()],1),a("el-col",{attrs:{span:12}},[3===e.isType?a("el-form-item",{attrs:{label:"挂靠基层:",prop:"villageId"}},[a("el-select",{ref:"selectVail",staticStyle:{width:"380px!important"},attrs:{placeholder:"请填写",filterable:"",remote:"",maxlength:"20",loading:e.loading,clearable:"","remote-method":e.getVillageIdList},model:{value:e.shipChange.villageId,callback:function(t){e.$set(e.shipChange,"villageId",t)},expression:"shipChange.villageId"}},e._l(e.villageIds,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1):e._e()],1),a("el-col",{attrs:{span:24}},[1===e.isType||2===e.isType?a("el-form-item",{attrs:{label:"持证人身份证照片:",prop:"idcardimages"}},[a("el-upload",{ref:"uploadIdcard",attrs:{action:"/api/admin/file/upload/avatar","list-type":"picture-card","on-success":e.handleImageIdcard,headers:e.headers,"file-list":e.idcardList,"on-remove":e.handleIdcardRemove,limit:e.num,accept:"image/*"}},[a("i",{staticClass:"el-icon-plus"})])],1):e._e()],1),a("el-col",{attrs:{span:24}},[1===e.isType?a("el-form-item",{attrs:{label:"转移证明:",prop:"changeimages"}},[a("el-upload",{ref:"uploadChange",attrs:{action:"/api/admin/file/upload/avatar","list-type":"picture-card","on-success":e.handleImageChange,headers:e.headers,"file-list":e.changeList,"on-remove":e.handleChangeRemove,limit:e.num,accept:"image/*"}},[a("i",{staticClass:"el-icon-plus"})])],1):e._e()],1),a("el-col",{attrs:{span:24}},[1===e.isType?a("el-form-item",{attrs:{label:"船名核准书:",prop:"shipNameimages"}},[a("el-upload",{ref:"uploadShipname",attrs:{action:"/api/admin/file/upload/avatar","list-type":"picture-card","on-success":e.handleShipnameChange,headers:e.headers,"file-list":e.shipnameList,"on-remove":e.handleShipnameRemove,limit:e.num,accept:"image/*"}},[a("i",{staticClass:"el-icon-plus"})])],1):e._e()],1),a("el-col",{attrs:{span:24}},[2===e.isType||3===e.isType?a("el-form-item",{attrs:{label:"挂靠合同:",prop:"contractimages"}},[a("el-upload",{ref:"uploadContract",attrs:{action:"/api/admin/file/upload/avatar","list-type":"picture-card","on-success":e.handleImageContract,headers:e.headers,"file-list":e.contractList,"on-remove":e.handleContractRemove,limit:e.num,accept:"image/*"}},[a("i",{staticClass:"el-icon-plus"})])],1):e._e()],1)],1)],1),a("div",{staticStyle:{"text-align":"center"}},[e.shipChange.type>0?a("el-button",{on:{click:e.save}},[e._v("提交")]):e._e(),a("el-button",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)],1)],1)},i=[],r=(a("4917"),a("53ca")),s=(a("ac6a"),a("c5f6"),a("28a5"),a("8a97")),o=a("df28"),h=a("daa6"),c=a("ade36"),u=a("4360"),l={data:function(){return{show:!1,shipChange:{type:0,shipNo:"",shipName:"",newShipName:"",shipownerName:"",shipownerIdcard:"",shipownerPhone:"",otherPhone:"",villageId:"",imageIdcard:"",imageChange:"",imageShipname:"",imageContract:"",idcardimages:"",changeimages:"",shipNameimages:"",contractimages:""},rules:{shipName:[{required:!0,message:"请输入渔船名",trigger:"blur"}],type:[{required:!0,message:"请输入变更类型",trigger:"blur"}]},headers:{Authorization:"Bearer "+u["a"].getters.access_token},num:5,loading:!1,shipNames:[],villageIds:[],no:"",changeList:[],idcardList:[],shipnameList:[],contractList:[]}},methods:{save:function(){var e=this;this.$refs["form"].validate((function(t){if(!t)return!1;0===+e.$route.query.add?(e.shipChange.shipNo=e.no,e.shipChange.shipName=e.shipChange.shipName.shipName,Object(s["f"])(e.shipChange).then((function(){e.$message.success("提交成功！"),e.$router.push("/hrms_spa/shipChange__list")})).catch((function(t){e.$message.error(t.msg)}))):e.$route.query.edit&&(e.$set(e.shipChange,"imageIdcard",""),e.$set(e.shipChange,"imageChange",""),e.$set(e.shipChange,"imageShipname",""),e.$set(e.shipChange,"imageContract",""),Object(s["c"])(e.shipChange).then((function(){e.$message.success("修改成功！"),e.$router.push("/hrms_spa/shipChange__list")})).catch((function(t){e.$message.error(t.msg)})))}))},onSearchResult:function(e){this.mapCenter=[e[0].lng,e[0].lat],this.marker=[e[0].lng,e[0].lat]},getData:function(){var e=this;Object(s["b"])(this.$route.query.edit||this.$route.query.see).then((function(t){if(e.shipChange=t.data.data,e.shipChange.imageChange){e.$set(e.shipChange,"changeimages","");var a=e.shipChange.imageChange.split(",").map(Number);a.forEach((function(t){Object(o["a"])(t).then((function(t){e.changeList.push({url:t.data.data.image}),e.shipChange.changeimages=t.data.data.image+","+e.shipChange.changeimages}))}))}if(e.shipChange.imageContract){e.$set(e.shipChange,"contractimages","");var n=e.shipChange.imageContract.split(",").map(Number);n.forEach((function(t){Object(o["a"])(t).then((function(t){e.contractList.push({url:t.data.data.image}),e.shipChange.contractimages=t.data.data.image+","+e.shipChange.contractimages}))}))}if(e.shipChange.imageIdcard){e.$set(e.shipChange,"idcardimages","");var i=e.shipChange.imageIdcard.split(",").map(Number);i.forEach((function(t){Object(o["a"])(t).then((function(t){e.idcardList.push({url:t.data.data.image}),e.shipChange.idcardimages=t.data.data.image+","+e.shipChange.idcardimages}))}))}if(e.shipChange.imageShipname){e.$set(e.shipChange,"shipNameimages","");var r=e.shipChange.imageShipname.split(",").map(Number);r.forEach((function(t){Object(o["a"])(t).then((function(t){e.shipnameList.push({url:t.data.data.image}),e.shipChange.shipNameimages=t.data.data.image+","+e.shipChange.shipNameimages}))}))}}))},changeType:function(){this.$refs.form.clearValidate(),this.$refs.uploadIdcard&&this.$refs.uploadIdcard.clearFiles(),this.$refs.uploadChange&&this.$refs.uploadChange.clearFiles(),this.$refs.uploadShipname&&this.$refs.uploadShipname.clearFiles(),this.$refs.uploadContract&&this.$refs.uploadContract.clearFiles(),this.$set(this.shipChange,"shipName",""),this.$set(this.shipChange,"shipNo",""),this.$set(this.shipChange,"newShipName",""),this.$set(this.shipChange,"shipownerName",""),this.$set(this.shipChange,"shipownerIdcard",""),this.$set(this.shipChange,"shipownerPhone",""),this.$set(this.shipChange,"otherPhone",""),this.$set(this.shipChange,"villageId",""),this.$set(this.shipChange,"imageIdcard",""),this.$set(this.shipChange,"imageChange",""),this.$set(this.shipChange,"imageShipname",""),this.$set(this.shipChange,"imageContract",""),this.$set(this.shipChange,"idcardimages",""),this.$set(this.shipChange,"changeimages",""),this.$set(this.shipChange,"shipNameimages",""),this.$set(this.shipChange,"contractimages","")},handleImage:function(e,t){var a="";return a=e.data.url,t=""===t||void 0===t?a:t+","+a,t},handleRemove:function(e,t){if(0===e.length)t="";else{var a="";e.forEach((function(e){e.url&&!e.response?a=e.url+","+a:e.response&&e.url&&(a=e.response.data.url+","+a)})),t=a}return t},handleImageIdcard:function(e){this.shipChange.idcardimages=this.handleImage(e,this.shipChange.idcardimages)},handleImageChange:function(e){this.shipChange.changeimages=this.handleImage(e,this.shipChange.changeimages)},handleShipnameChange:function(e){this.shipChange.shipNameimages=this.handleImage(e,this.shipChange.shipNameimages)},handleImageContract:function(e){this.shipChange.contractimages=this.handleImage(e,this.shipChange.contractimages)},handleIdcardRemove:function(e,t){this.shipChange.idcardimages=this.handleRemove(t,this.shipChange.idcardimages)},handleChangeRemove:function(e,t){this.shipChange.changeimages=this.handleRemove(t,this.shipChange.changeimages)},handleShipnameRemove:function(e,t){this.shipChange.shipNameimages=this.handleRemove(t,this.shipChange.shipNameimages)},handleContractRemove:function(e,t){this.shipChange.contractimages=this.handleRemove(t,this.shipChange.contractimages)},getShipNameList:function(e){var t=this;this.shipNames=[],""!==e?(this.loading=!0,setTimeout((function(){t.loading=!1,Object(c["o"])(e).then((function(e){var a=e.data;!1!==a.data?t.shipNames.push(a.data):t.$message.error(a.msg)}))}),200)):this.shipNames=[]},shipNameChange:function(e){this.no=e.shipNo,"object"===Object(r["a"])(e)?this.refreshShipName(e):this.refreshShipName({shipName:e}),this.shipNames=[]},refreshShipName:function(e){if(null!==e){var t=e.shipowner,a=void 0===t?"":t,n=e.shipownerIdcard,i=void 0===n?"":n,r=e.mobile,s=void 0===r?"":r;this.shipChange.shipownerName=a,this.shipChange.shipownerIdcard=i,this.shipChange.shipownerPhone=s}else this.shipChange.shipName="",this.shipChange.shipownerName="",this.shipChange.shipownerIdcard="",this.shipChange.shipownerPhone=""},getVillageIdList:function(e){var t=this;this.villageIds=[],""!==e?(this.loading=!0,setTimeout((function(){t.loading=!1,Object(h["d"])({villageName:e}).then((function(e){var a=e.data;a.data.length>0?a.data.forEach((function(e){t.villageIds.push({label:e.villageName,value:e.userId})})):t.$message.error("请输入正确的挂靠基层！")}))}),200)):this.villageIds=[]}},computed:{isType:function(){if(1===this.shipChange.type){var e=[{required:!0,message:"请输入变更渔船名",trigger:"blur"}],t=[{required:!0,message:"请输入持证人身份证照片",trigger:"blur"}],a=[{required:!0,message:"请输入转移证明",trigger:"blur"}],n=[{required:!0,message:"请输入船名核准书",trigger:"blur"}];return this.$set(this.rules,"newShipName",e),this.$set(this.rules,"idcardimages",t),this.$set(this.rules,"changeimages",a),this.$set(this.rules,"shipNameimages",n),this.$delete(this.rules,"shipownerName"),this.$delete(this.rules,"shipownerIdcard"),this.$delete(this.rules,"shipownerPhone"),this.$delete(this.rules,"villageId"),this.$delete(this.rules,"contractimages"),1}if(2===this.shipChange.type){var i=function(e,t,a){""===t?a(new Error("请输入手机号码")):t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?a():a(new Error("请输入正确的手机号码!"))},r=[{required:!0,message:"请输入持证人姓名",trigger:"blur"}],s=[{required:!0,message:"请输入持证人身份证",trigger:"blur"}],o=[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:i,trigger:"blur"}],h=[{required:!0,message:"请输入持证人身份证照片",trigger:"blur"}],c=[{required:!0,message:"请输入挂靠合同",trigger:"blur"}];return this.$set(this.rules,"shipownerName",r),this.$set(this.rules,"shipownerIdcard",s),this.$set(this.rules,"shipownerPhone",o),this.$set(this.rules,"idcardimages",h),this.$set(this.rules,"contractimages",c),this.$delete(this.rules,"newShipName"),this.$delete(this.rules,"villageId"),this.$delete(this.rules,"shipNameimages"),this.$delete(this.rules,"imageShipname"),2}if(3===this.shipChange.type){var u=[{required:!0,message:"请输入挂靠基层",trigger:"blur"}],l=[{required:!0,message:"请输入挂靠合同",trigger:"blur"}];return this.$set(this.rules,"villageId",u),this.$set(this.rules,"contractimages",l),this.$delete(this.rules,"newShipName"),this.$delete(this.rules,"shipownerName"),this.$delete(this.rules,"shipownerIdcard"),this.$delete(this.rules,"shipownerPhone"),this.$delete(this.rules,"idcardimages"),this.$delete(this.rules,"imageChange"),this.$delete(this.rules,"changeimages"),3}return 0},isDisabled:function(){return!(!this.$route.query.edit&&!this.$route.query.see)},seeManager:function(){return!!this.$route.query.see},isOpen:function(){return 2!==this.shipChange.type}},created:function(){(this.$route.query.edit||this.$route.query.see)&&this.getData()}},d=l,p=(a("6695"),a("2877")),m=Object(p["a"])(d,n,i,!1,null,null,null);t["default"]=m.exports},daa6:function(e,t,a){"use strict";a.d(t,"f",(function(){return r})),a.d(t,"g",(function(){return s})),a.d(t,"i",(function(){return o})),a.d(t,"a",(function(){return h})),a.d(t,"c",(function(){return c})),a.d(t,"b",(function(){return u})),a.d(t,"k",(function(){return l})),a.d(t,"h",(function(){return d})),a.d(t,"d",(function(){return p})),a.d(t,"e",(function(){return m})),a.d(t,"j",(function(){return g}));var n=a("b5c6"),i="/tmlms/village";function r(e){return Object(n["a"])({url:"".concat(i,"/page"),method:"get",params:e})}function s(){return Object(n["a"])({url:"".concat(i,"/getVillageByOrg"),method:"get"})}function o(e,t){return Object(n["a"])({url:"".concat(i,"/create?type=").concat(t),method:"post",data:e})}function h(e){return Object(n["a"])({url:"".concat(i,"/delete?userId=").concat(e),method:"post"})}function c(e,t){return Object(n["a"])({url:"".concat(i,"/edit?type=").concat(t),method:"post",data:e})}function u(e){return Object(n["a"])({url:"".concat(i,"/detail?userId=").concat(e),method:"get"})}function l(e,t){return Object(n["a"])({url:"".concat(i,"/review?status=").concat(e,"&userId=").concat(t),method:"post"})}function d(e){return Object(n["a"])({url:"".concat(i,"/page/villageshipowner"),method:"get",params:e})}function p(e){return Object(n["a"])({url:"".concat(i,"/getByVillagename"),method:"get",params:e})}function m(e){return Object(n["a"])({url:"/tmlms/relationship/countRecordWithShip",method:"get",params:e})}function g(e){return Object(n["a"])({url:"/tmlms/trainMeet/createTime?id=".concat(e.id,"&type=").concat(e.type),method:"post"})}},df28:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s}));var n=a("b5c6"),i="/tmlms/tybmultiimage";function r(e){return Object(n["a"])({url:"".concat(i,"/").concat(e),method:"get"})}function s(e,t){return Object(n["a"])({url:"".concat(i,"/getImages"),method:"get",params:{relId:e,type:t}})}}}]);