(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f956dc7"],{"2f9e":function(e,t,r){"use strict";r.d(t,"a",function(){return a});r("ac6a"),r("28a5"),r("a481");var o=r("b5c6");function a(e){var t=e.url,r=e.method,a=void 0===r?"post":r,i=e.data,l=void 0===i?{}:i,s=e.title,c=void 0===s?"":s;return console.log(t),new Promise(function(e){return Object(o["a"])({url:t,method:a,headers:{responseType:"arraybuffer"},data:l,responseType:"blob"}).then(function(t){n({title:c,response:t}).then(function(){e()})})})}function n(e){var t=e.title,r=void 0===t?"":t,o=e.response,a=i(o.headers["content-disposition"].replace(/"/g,""));return new Promise(function(e){var t=o.headers,n=new Blob([o.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(n,r);else{var i=document.createElement("a");i.href=window.URL.createObjectURL(n),i.download=r?"".concat(r,".").concat(a.suffix):a.filename,document.body.appendChild(i),i.style.display="none",i.click()}e()})}function i(e){var t={},r=e.split(";");return r.forEach(function(e){var r=e.replace(/^\s+|\s+$/g,""),o=r.split("=");o[1]?t[o[0]]=o[1]:t[o[0]]=o[0]}),t.suffix=t.filename.split(".")[1],t}},"6d74":function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"e",function(){return u}),r.d(t,"c",function(){return n}),r.d(t,"d",function(){return p}),r.d(t,"g",function(){return g}),r.d(t,"a",function(){return f}),r.d(t,"f",function(){return d});r("3b2b");var o=r("0e0b"),a=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"shipowner",label:"持证人"},{prop:"shipownerIdcard",label:"持证人身份证"},{prop:"engineTotalPower",label:"总功率(kw)"},{prop:"hullLength",label:"船长(m)"}],n=function(){return{activityType:"",address:"",buildDate:"",createTime:"",dualPower:"",engineTotalPower:"",fishType:"",fishingGear:"",grossTonnage:"",hullLength:"",hullMaterial:"",licensesDateExpire:"",licensesDateIssue:"",licensesFishingNo:"",licensesInspectionNo:"",licensesNationalNo:"",licensesOwnerShip:"",mainEngineModel:"",mainEnginePower:"",mobile:"",mouldedBreadth:"",mouldedDepth:"",netTonnage:"",portRegister:"",shipId:"",shipName:"",shipNo:"",shipShare:"",shipowner:"",shipownerIdcard:"",updateTime:"",userId:"",workMode:"",workMode2:"",zipcode:"",regionId:""}};function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=new RegExp("^\\d{0,"+t+"}$");if(0===r)return o.test(e);var a=new RegExp("^\\d{0,"+t+"}\\.\\d{0,"+r+"}$");return o.test(e)||a.test(e)}function l(e){var t=/^\d{0,18}$/,r=/^\d{17}X$/;return t.test(e)||r.test(e)}function s(e,t,r){""===t?r(new Error):l(t)?r():r(new Error)}function c(e,t,r){""===t?r(new Error):i(t,e.length,e.decimal)?r():r(new Error)}var u={engineTotalPower:[{required:!0,validator:c,trigger:"blur",length:3,decimal:2,message:"请输入0~999.99的整数或小数！"}],hullLength:[{required:!0,validator:c,trigger:"blur",length:3,decimal:2,message:"请输入0~999.99的整数或小数！"}],regionId:[{required:!0,message:"该选项必填！",trigger:"blur"}],address:[{required:!0,message:"该选项必填！",trigger:"blur"}],createTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesFishingNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesOwnerShip:[{required:!0,message:"该选项必填！",trigger:"blur"}],mobile:[{required:!0,validator:c,trigger:"blur",length:11,decimal:0,message:"请输入正确的手机号码！"}],shipId:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipName:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipShare:[{required:!0,message:"该选项必填！",trigger:"change"}],shipowner:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipownerIdcard:[{required:!0,validator:s,trigger:"blur",length:3,decimal:0,message:"请输入正确的身份证号码！"}],updateTime:[{required:!0,message:"该选项必填！",trigger:"blur"}]},d={sellPrice:[{required:!0,message:"该选项必填！",trigger:"blur"}],engineTotalPower:[{required:!0,message:"该选项必填！",trigger:"blur"}],mainEnginePower:[{required:!0,message:"该选项必填！",trigger:"blur"}],dualPower:[{required:!0,message:"该选项必填！",trigger:"blur"}],mainEngineModel:[{required:!0,message:"该选项必填！",trigger:"blur"}],grossTonnage:[{required:!0,message:"该选项必填！",trigger:"blur"}],hullLength:[{required:!0,message:"该选项必填！",trigger:"blur"}],mouldedBreadth:[{required:!0,message:"该选项必填！",trigger:"blur"}],mouldedDepth:[{required:!0,message:"该选项必填！",trigger:"blur"}],netTonnage:[{required:!0,message:"该选项必填！",trigger:"blur"}],regionId:[{required:!0,message:"该选项必填！",trigger:"blur"}],activityType:[{required:!0,message:"该选项必填！",trigger:"change"}],buildFactory:[{required:!0,message:"该选项必填！",trigger:"blur"}],buildDate:[{required:!0,message:"该选项必填！",trigger:"blur"}],createTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],fishingGear:[{required:!0,message:"该选项必填！",trigger:"change"}],hullMaterial:[{required:!0,message:"该选项必填！",trigger:"change"}],licensesFishingNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesInspectionNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesNationalNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesOwnerShip:[{required:!0,message:"该选项必填！",trigger:"blur"}],mobile:[{required:!0,validator:c,trigger:"blur",length:11,decimal:0,message:"请输入正确的手机号码！"}],portRegister:[{required:!0,message:"该选项必填！",trigger:"change"}],shipId:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipName:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipShare:[{required:!0,message:"该选项必填！",trigger:"change"}],shipowner:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipownerIdcard:[{required:!0,validator:s,trigger:"blur",length:33333333,decimal:0,message:"请输入正确的身份证号码！"}],updateTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],workMode:[{required:!0,message:"该选项必填！",trigger:"change"}],workMode2:[{required:!0,message:"该选项必填！",trigger:"change"}]},p=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},m=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},g=function(e){var t=Object(o["g"])(m(),e);return t.shipName=e.shipName?e.shipName:null,t.shipNo=e.shipNo?e.shipNo:null,t.shipowner=e.shipowner?e.shipowner:null,t.shipownerIdcard=e.shipownerIdcard?e.shipownerIdcard:null,t},f=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"certificateHolderName",label:"持证人姓名"},{prop:"auditState",label:"审核状态",type:"dictGroup",dictName:"audit_state"},{prop:"rejectReason",label:"驳回理由"}]},ade3:function(e,t,r){"use strict";r.d(t,"p",function(){return i}),r.d(t,"c",function(){return l}),r.d(t,"k",function(){return s}),r.d(t,"b",function(){return c}),r.d(t,"m",function(){return u}),r.d(t,"o",function(){return d}),r.d(t,"d",function(){return p}),r.d(t,"w",function(){return m}),r.d(t,"e",function(){return g}),r.d(t,"l",function(){return f}),r.d(t,"q",function(){return h}),r.d(t,"r",function(){return b}),r.d(t,"j",function(){return w}),r.d(t,"n",function(){return v}),r.d(t,"s",function(){return k}),r.d(t,"g",function(){return y}),r.d(t,"h",function(){return x}),r.d(t,"i",function(){return N}),r.d(t,"f",function(){return $}),r.d(t,"u",function(){return I}),r.d(t,"v",function(){return O}),r.d(t,"a",function(){return q}),r.d(t,"t",function(){return T});var o=r("b5c6"),a=r("2f9e"),n="/tybship/tybship";function i(e){return Object(o["a"])({url:"".concat(n,"/otherpage"),method:"get",params:e})}function l(e,t){return Object(o["a"])({url:"".concat(n,"/updateVillage?shipId=").concat(e,"&&villageId=").concat(t),method:"post"})}function s(e,t){return Object(o["a"])({url:"".concat(n,"/getFixOrgIds?shipId=").concat(e,"&&orgId=").concat(t),method:"get"})}function c(e,t){return Object(o["a"])({url:"".concat(n,"/updateOrgId?shipId=").concat(e,"&&orgId=").concat(t),method:"post"})}function u(e){return Object(o["a"])({url:"".concat(n,"/").concat(e),method:"get",params:e})}function d(e){return Object(o["a"])({url:"".concat(n,"/").concat(e),method:"get"})}function p(e){return Object(o["a"])({url:"".concat(n,"/save"),method:"post",data:e})}function m(e){return Object(o["a"])({url:"".concat(n,"/update"),method:"post",data:e})}function g(e){return Object(o["a"])({url:"".concat(n,"/del/").concat(e),method:"post"})}function f(e){return Object(o["a"])({url:"".concat(n,"/mypage"),method:"get",params:e})}function h(e){return Object(o["a"])({url:"".concat(n,"/findship/").concat(e),method:"get"})}function b(e){return Object(o["a"])({url:"".concat(n,"/findshipWithOutOrg/").concat(e),method:"get"})}function w(e){return Object(o["a"])({url:"".concat(n,"/findmyship/").concat(e),method:"get"})}function v(e){return Object(o["a"])({url:"".concat(n,"/searchByshipNo"),method:"get",params:{shipNo:e}})}function k(e){return Object(o["a"])({url:"".concat(n,"/newpage"),method:"get",params:e})}function y(e){return Object(a["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:e,title:"渔船信息"})}function x(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:e,title:e.shipName})}function N(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:e,title:e.shipName})}function $(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:e,title:e.shipName})}function I(e){return Object(o["a"])({url:"tmlms/tyb_order/page",method:"get",params:e})}function O(e){return Object(o["a"])({url:"tmlms/tyb_order/getById",method:"get",params:e})}function q(e){return Object(o["a"])({url:"tmlms/tyb_order/agree",method:"post",data:e})}function T(e){return Object(o["a"])({url:"tmlms/tyb_order/reject",method:"post",data:e})}},d6f2:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:e.getTitle,backOption:e.backOption}}),r("el-form",{ref:"form",attrs:{disabled:"view"===e.type,model:e.form,rules:e.rules,"label-width":"150px",size:"small"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"渔船名：",prop:"shipName"}},[r("el-input",{attrs:{maxlength:"20"},model:{value:e.form.shipName,callback:function(t){e.$set(e.form,"shipName",t)},expression:"form.shipName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"渔船编号：",prop:"shipNo"}},[r("el-input",{attrs:{maxlength:"50"},model:{value:e.form.shipNo,callback:function(t){e.$set(e.form,"shipNo",t)},expression:"form.shipNo"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"持证人：",prop:"shipowner"}},[r("el-input",{attrs:{maxlength:"20"},model:{value:e.form.shipowner,callback:function(t){e.$set(e.form,"shipowner",t)},expression:"form.shipowner"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"持证人身份证号码：",prop:"shipownerIdcard"}},[r("el-input",{attrs:{maxlength:"18"},model:{value:e.form.shipownerIdcard,callback:function(t){e.$set(e.form,"shipownerIdcard",t)},expression:"form.shipownerIdcard"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"渔船股份性质：",prop:"shipShare"}},[r("el-select",{model:{value:e.form.shipShare,callback:function(t){e.$set(e.form,"shipShare",t)},expression:"form.shipShare"}},e._l(e.$store.getters.dictGroup.tyb_contract_ship_attr,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"所属行政区域：",prop:"regionId"}},[r("el-cascader",{attrs:{options:e.options,props:e.props},on:{"active-item-change":e.handleItemChange},model:{value:e.form.regionId,callback:function(t){e.$set(e.form,"regionId",t)},expression:"form.regionId"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"邮政编码：",prop:"zipcode"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.zipcode,callback:function(t){e.$set(e.form,"zipcode",t)},expression:"form.zipcode"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"手机号码：",prop:"mobile"}},[r("el-input",{attrs:{maxlength:"13"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系地址：",prop:"address"}},[r("el-input",{attrs:{maxlength:"100"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"渔船所有权登记证书：",prop:"licensesOwnerShip"}},[r("el-input",{attrs:{maxlength:"30"},model:{value:e.form.licensesOwnerShip,callback:function(t){e.$set(e.form,"licensesOwnerShip",t)},expression:"form.licensesOwnerShip"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"捕捞许可证编号：",prop:"licensesFishingNo"}},[r("el-input",{attrs:{maxlength:"50"},model:{value:e.form.licensesFishingNo,callback:function(t){e.$set(e.form,"licensesFishingNo",t)},expression:"form.licensesFishingNo"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"国籍证书编号：",prop:"licensesNationalNo"}},[r("el-input",{attrs:{maxlength:"50"},model:{value:e.form.licensesNationalNo,callback:function(t){e.$set(e.form,"licensesNationalNo",t)},expression:"form.licensesNationalNo"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船舶检验证书编号：",prop:"licensesInspectionNo"}},[r("el-input",{attrs:{maxlength:"50"},model:{value:e.form.licensesInspectionNo,callback:function(t){e.$set(e.form,"licensesInspectionNo",t)},expression:"form.licensesInspectionNo"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"licensesDateExpire","label-name":"证书有效期"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.licensesDateExpire,callback:function(t){e.$set(e.form,"licensesDateExpire",t)},expression:"form.licensesDateExpire"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主机总功率(kw)：",prop:"engineTotalPower"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.engineTotalPower,callback:function(t){e.$set(e.form,"engineTotalPower",t)},expression:"form.engineTotalPower"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主机功率(kw)：",prop:"mainEnginePower"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.mainEnginePower,callback:function(t){e.$set(e.form,"mainEnginePower",t)},expression:"form.mainEnginePower"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"双控功率(kw)：",prop:"dualPower"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.dualPower,callback:function(t){e.$set(e.form,"dualPower",t)},expression:"form.dualPower"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主机型号：",prop:"mainEngineModel"}},[r("el-input",{attrs:{maxlength:"50"},model:{value:e.form.mainEngineModel,callback:function(t){e.$set(e.form,"mainEngineModel",t)},expression:"form.mainEngineModel"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"总吨位：",prop:"grossTonnage"}},[r("el-input",{attrs:{maxlength:"3"},model:{value:e.form.grossTonnage,callback:function(t){e.$set(e.form,"grossTonnage",t)},expression:"form.grossTonnage"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船长（m）：",prop:"hullLength"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.hullLength,callback:function(t){e.$set(e.form,"hullLength",t)},expression:"form.hullLength"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船体材料：",prop:"hullMaterial"}},[r("el-select",{model:{value:e.form.hullMaterial,callback:function(t){e.$set(e.form,"hullMaterial",t)},expression:"form.hullMaterial"}},e._l(e.$store.getters.dictGroup.tyb_ship_material,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船籍港：",prop:"portRegister"}},[r("el-select",{model:{value:e.form.portRegister,callback:function(t){e.$set(e.form,"portRegister",t)},expression:"form.portRegister"}},e._l(e.$store.getters.dictGroup.tyb_ship_port,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"渔具名称：",prop:"fishingGear"}},[r("el-select",{model:{value:e.form.fishingGear,callback:function(t){e.$set(e.form,"fishingGear",t)},expression:"form.fishingGear"}},e._l(e.$store.getters.dictGroup.tyb_fishing_gear,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"建造完工日期：",prop:"buildDate"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.buildDate,callback:function(t){e.$set(e.form,"buildDate",t)},expression:"form.buildDate"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"作业类型：",prop:"activityType"}},[r("el-select",{model:{value:e.form.activityType,callback:function(t){e.$set(e.form,"activityType",t)},expression:"form.activityType"}},e._l(e.$store.getters.dictGroup.tyb_resume_worktype,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"实际作用方式：",prop:"workMode"}},[r("el-select",{model:{value:e.form.workMode,callback:function(t){e.$set(e.form,"workMode",t)},expression:"form.workMode"}},e._l(e.$store.getters.dictGroup.tyb_work_mode,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"作业方式2：",prop:"workMode"}},[r("el-select",{model:{value:e.form.workMode2,callback:function(t){e.$set(e.form,"workMode2",t)},expression:"form.workMode2"}},e._l(e.$store.getters.dictGroup.tyb_work_mode,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主捕种类：",prop:"fishType"}},[r("el-input",{attrs:{maxlength:"100"},model:{value:e.form.fishType,callback:function(t){e.$set(e.form,"fishType",t)},expression:"form.fishType"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"型宽：",prop:"mouldedBreadth"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.mouldedBreadth,callback:function(t){e.$set(e.form,"mouldedBreadth",t)},expression:"form.mouldedBreadth"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"型深：",prop:"mouldedDepth"}},[r("el-input",{attrs:{maxlength:"6"},model:{value:e.form.mouldedDepth,callback:function(t){e.$set(e.form,"mouldedDepth",t)},expression:"form.mouldedDepth"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"净吨位：",prop:"netTonnage"}},[r("el-input",{attrs:{maxlength:"3"},model:{value:e.form.netTonnage,callback:function(t){e.$set(e.form,"netTonnage",t)},expression:"form.netTonnage"}})],1)],1)],1),"view"!==e.type?r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1):e._e()],1)],1)],1)},a=[],n=(r("ac6a"),r("ade3")),i=r("23d6"),l=r("6d74"),s={data:function(){var e=this;return{backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},rules:l["e"],form:Object(l["c"])(),regions:{province:[],city:[],district:[],town:[],village:[]},regionChosen:{province:"",city:"",district:"",town:"",village:""},init:!1,options:[],props:{value:"areaCode",label:"name",children:"childList"},arr:[]}},computed:{type:function(){return this.$route.params.type},shipId:function(){return this.$route.params.id},getTitle:function(){return"渔船信息".concat("create"===this.type?"新增":"update"===this.type?"编辑":"")}},created:function(){var e=this;"create"!==this.type&&this.shipId?this.getShipDetail():Object(i["c"])(33e10).then(function(t){e.options=t.data.data,e.options.forEach(function(t){e.$set(t,"childList",[])})})},mounted:function(){},methods:{handleItemChange:function(e){var t=this;Object(i["c"])(e[e.length-1]).then(function(r){var o=r.data.data;t.getNode(t.options,e[e.length-1],o)})},getNode:function(e,t,r){var o=this;e.forEach(function(e){e.areaCode==t?(e.childList=r,e.level<3&&e.childList.forEach(function(e){void 0===e.childList&&o.$set(e,"childList",[])})):e.childList&&0!==e.childList.length&&o.getNode(e.childList,t,r)})},getShipDetail:function(){var e=this;Object(n["o"])(this.shipId).then(function(t){var r=t.data;0===r.code&&(0!==r.data.regionId&&Object(i["a"])(r.data.regionId).then(function(t){e.options=t.data.data}),0===r.data.regionId?(e.form=r.data,Object(i["c"])(33e10).then(function(t){e.options=t.data.data,e.options.forEach(function(t){e.$set(t,"childList",[])})}),e.form.regionId=e.options):Object(i["b"])(r.data.regionId).then(function(t){e.getarr(t.data.data,e.arr),r.data.regionId=e.arr,e.form=r.data}))},function(t){e.$message.error(t.message)})},getarr:function(e){this.arr.push(e.areaCode),e.child&&this.getarr(e.child)},handleSubmit:function(){var e=this;this.$refs.form.validate(function(t){t?(e.form.regionId=e.form.regionId[e.form.regionId.length-1],"create"===e.type?Object(n["d"])(e.form).then(function(t){var r=t.data;0===r.code&&(e.$message.success("添加成功！"),e.onGoBack())},function(t){e.$message.error(t.message)}):"update"===e.type&&Object(n["w"])(e.form).then(function(t){var r=t.data;0===r.code&&(e.$message.success("修改成功！"),e.onGoBack())},function(t){e.$message.error(t.message)})):e.$message.error("请按规则输入填写表单！")})},onGoBack:function(){this.$router.history.go(-1)}},watch:{}},c=s,u=r("0c7c"),d=Object(u["a"])(c,o,a,!1,null,null,null);t["default"]=d.exports}}]);