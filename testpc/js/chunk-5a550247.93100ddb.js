(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a550247"],{"244c":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"d",(function(){return c})),a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return l})),a.d(e,"e",(function(){return u}));var r=a("b5c6"),n="/tybhrms/tybbook";function o(t){return Object(r["a"])({url:"".concat(n,"/save"),method:"post",data:t})}function c(t){return Object(r["a"])({url:"".concat(n,"/page"),method:"get",params:t})}function i(t){return Object(r["a"])({url:"".concat(n,"/").concat(t),method:"get"})}function l(t){return Object(r["a"])({url:"".concat(n,"/del/").concat(t),method:"post"})}function u(t){return Object(r["a"])({url:"".concat(n,"/update"),method:"post",data:t})}},"9138a":function(t,e,a){"use strict";a("bf26")},"9cda":function(t,e,a){"use strict";a.d(e,"g",(function(){return o})),a.d(e,"f",(function(){return c})),a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return l})),a.d(e,"b",(function(){return u})),a.d(e,"h",(function(){return s})),a.d(e,"e",(function(){return d})),a.d(e,"d",(function(){return p}));var r=a("b5c6"),n="/tmlms/labor_contract";function o(t){return Object(r["a"])({url:"".concat(n,"/getPage"),method:"get",params:t})}function c(t){return Object(r["a"])({url:"".concat(n,"/detail"),method:"get",params:{contractId:t}})}function i(t){return Object(r["a"])({url:"".concat(n,"/create"),method:"post",data:t})}function l(t){return Object(r["a"])({url:"".concat(n,"/edit"),method:"post",data:t})}function u(t){return Object(r["a"])({url:"".concat(n,"/delete"),method:"post",params:{contractId:t}})}function s(t){return Object(r["a"])({url:"/admin/dict/type/".concat(t),method:"get"})}function d(t){return Object(r["a"])({url:"/admin/dict/getChild/".concat(t),method:"get"})}function p(t){return Object(r["a"])({url:"/admin/dict/".concat(t),method:"get"})}},"9ffa":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iep-page-form"},[a("basic-container",[a("page-header",{attrs:{title:t.getTitle,backOption:t.backOption}}),a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"150px",size:"small"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"分类：",prop:"type"}},[a("el-cascader",{attrs:{options:t.typeList},on:{change:t.handleChange},model:{value:t.typeVal,callback:function(e){t.typeVal=e},expression:"typeVal"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"教材名称：",prop:"title"}},[a("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"定价：",prop:"price"}},[a("el-input",{model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"教材封面：",prop:"bookImg"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccessFront,headers:t.headers,accept:"image/*"}},[t.form.bookImg?a("img",{staticClass:"avatar",attrs:{src:t.form.bookImg}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"教材介绍：",prop:"info"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.form.info,callback:function(e){t.$set(t.form,"info",e)},expression:"form.info"}})],1)],1)],1),a("el-form-item",{attrs:{label:""}},[a("operation-wrapper",[a("iep-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1)],1)],1)],1)},n=[],o=(a("8e6e"),a("456d"),a("7f7f"),a("ac6a"),a("ade3")),c=a("244c"),i=a("2f62"),l=a("9cda"),u=a("4360");function s(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?s(Object(a),!0).forEach((function(e){Object(o["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var p={data:function(){var t=this;return{backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},form:{type:"",title:"",price:"",info:"",bookImg:""},init:!1,rules:{type:[{required:!0,message:"请输入分类",trigger:"blur"}],title:[{required:!0,message:"请输入教材名称",trigger:"blur"}],price:[{required:!0,message:"请输入定价",trigger:"blur"}],info:[{required:!0,message:"请输入具体适用对象",trigger:"blur"}],bookImg:[{required:!0,message:"请上传教材封面",trigger:"blur"}]},typeVal:[],typeList:[{value:1,label:"内陆普通船员",children:[]},{value:2,label:"内陆渔业职务船员",children:[]},{value:3,label:"海洋普通船员",children:[]},{value:4,label:"海洋渔业职务船员",children:[]},{value:5,label:"教材新增",children:[]}],headers:{Authorization:"Bearer "+u["a"].getters.access_token}}},computed:d({type:function(){return this.$route.params.type},textBookId:function(){return this.$route.params.id},getTitle:function(){return"教材信息".concat("create"===this.type?"新增":"update"===this.type?"编辑":"")}},Object(i["c"])(["dictGroup"])),created:function(){"create"!==this.type&&this.textBookId&&this.getTextbookDetail(),this.getTypeList()},mounted:function(){},methods:{getTextbookDetail:function(){var t=this;Object(c["c"])(this.$route.params.id).then((function(e){t.form=e.data.data,Object(l["e"])(t.form.type).then((function(e){Object(l["d"])(e.data.data.dictId).then((function(a){t.typeList.forEach((function(r){r.label===a.data.data.name&&(t.typeVal.push(r.value),t.typeVal[0]&&t.typeVal.push(e.data.data.id))}))}))}))}))},getTypeList:function(){var t=this;Object(l["h"])("tyb_inland_pricrew").then((function(e){var a={value:e.data.data[0].id,label:e.data.data[0].label};t.typeList[0].children.push(a)})),Object(l["h"])("tyb_inland_positioncrew").then((function(e){e.data.data.forEach((function(e){t.typeList[1].children.push({value:e.id,label:e.label})}))})),Object(l["h"])("tyb_ocean_pricrew").then((function(e){var a={value:e.data.data[0].id,label:e.data.data[0].label};t.typeList[2].children.push(a)})),Object(l["h"])("tyb_ocean_positioncrew").then((function(e){e.data.data.forEach((function(e){t.typeList[3].children.push({value:e.id,label:e.label})}))})),Object(l["h"])("tyb_textbook_new").then((function(e){e.data.data.forEach((function(e){t.typeList[4].children.push({value:e.id,label:e.label})}))}))},handleSubmit:function(){var t=this;this.$refs.form.validate((function(e){e?"create"===t.type?Object(c["a"])(t.form).then((function(){t.$message.success("新增成功！"),t.$router.go(-1)})).catch((function(e){t.$message.error(e.data.msg)})):"update"===t.type&&Object(c["e"])(t.form).then((function(){t.$message.success("修改成功！"),t.$router.go(-1)})).catch((function(e){t.$message.error(e.data.msg)})):t.$message.error("请按规则输入填写表单！")}))},onGoBack:function(){this.$router.push({path:"/textbook_spa/textbook_list"})},handleChange:function(t){this.form.type=t[1]},handleAvatarSuccessFront:function(t){this.form.bookImg=t.data.url}},watch:{}},f=p,b=(a("9138a"),a("2877")),h=Object(b["a"])(f,r,n,!1,null,null,null);e["default"]=h.exports},bf26:function(t,e,a){}}]);