(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9697229c"],{4525:function(t,e,c){"use strict";c.d(e,"h",function(){return a}),c.d(e,"i",function(){return o}),c.d(e,"b",function(){return u}),c.d(e,"d",function(){return l}),c.d(e,"f",function(){return i}),c.d(e,"e",function(){return d}),c.d(e,"c",function(){return s}),c.d(e,"g",function(){return b}),c.d(e,"a",function(){return f});var r=c("b5c6"),n="tmlms/crew_cert";function a(t){return Object(r["a"])({url:"".concat(n,"/create"),method:"post",data:t})}function o(t){return Object(r["a"])({url:"".concat(n,"/edit"),method:"post",data:t})}function u(t){return Object(r["a"])({url:"".concat(n,"/remove"),method:"post",params:{certId:t}})}function l(t){return Object(r["a"])({url:"".concat(n,"/detail"),method:"get",params:{certId:t}})}function i(t){return Object(r["a"])({url:"".concat(n,"/myCerts"),method:"get",params:{userId:t}})}function d(t,e){return Object(r["a"])({url:"".concat(n,"/getPage"),method:"get",params:t,data:e})}function s(t){return Object(r["a"])({url:"".concat(n,"/")+t,method:"post",data:t})}function b(t){return Object(r["a"])({url:"".concat(n,"/mycertlist"),method:"get",params:{idcard:t}})}function f(t){return Object(r["a"])({url:"".concat(n,"/certStandard/")+t,method:"get"})}},"97fc":function(t,e,c){"use strict";c.r(e);var r=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"contract-box"},[c("basic-container",[c("page-header",{attrs:{title:"船员证书"}}),c("operation-container",[c("template",{slot:"right"},[c("el-button",{on:{click:t.backPage}},[t._v("返回")])],1)],2),c("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[c("el-table-column",{attrs:{prop:"certNo",label:"证书编码"}}),c("el-table-column",{attrs:{prop:"certType",label:"证书类型"}}),c("el-table-column",{attrs:{prop:"certTitle",label:"证书职务"}}),c("el-table-column",{attrs:{prop:"certLevel",label:"证书等级"}}),c("el-table-column",{attrs:{prop:"createTime",label:"日期"}})],1)],1)],1)},n=[],a=(c("ac6a"),c("4525")),o=c("59fb"),u={data:function(){return{tableData:[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;Object(a["g"])(this.$route.params.idcard).then(function(e){t.tableData=e.data.data,console.log(t.tableData),t.tableData.forEach(function(e){e.certType&&t.getDict("tyb_crew_cert_type",e.certType).then(function(t){e.certType=t}),e.certLevel&&t.getDict("tyb_crew_cert_level",e.certLevel).then(function(t){e.certLevel=t}),e.certTitle&&t.getDict("tyb_crew_cert_title",e.certTitle).then(function(t){e.certTitle=t})})})},getDict:function(t,e){return Object(o["j"])(t).then(function(t){var c="";return t.data.data.forEach(function(t){t.value===e&&(c=t.label)}),c})},backPage:function(){this.$router.go(-1)}}},l=u,i=c("0c7c"),d=Object(i["a"])(l,r,n,!1,null,null,null);e["default"]=d.exports}}]);