(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50230d72"],{2189:function(t,e,a){},8231:function(t,e,a){"use strict";a("2189")},"8ffb":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-box"},[a("basic-container",[a("page-header",{attrs:{title:"基层浏览记录"}}),a("div",{staticClass:"shipowner_title"},[a("div",{staticStyle:{float:"right"}},[a("span",[a("el-input",{attrs:{placeholder:"请输入用户名",size:"small",clearable:""},model:{value:t.params.realName,callback:function(e){t.$set(t.params,"realName","string"===typeof e?e.trim():e)},expression:"params.realName"}})],1),a("span",{staticStyle:{width:"240px"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",clearable:"","value-format":"yyyy-MM-dd",size:"small"},model:{value:t.params.timeLists,callback:function(e){t.$set(t.params,"timeLists",e)},expression:"params.timeLists"}})],1),a("el-button",{attrs:{size:"small"},on:{click:t.onSearch}},[t._v("搜索")])],1)]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.historyList,stripe:""}},t._l(t.options.columns,(function(t,e){return a("el-table-column",{key:e,attrs:{prop:t.value,label:t.text}})})),1),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.total,"current-page":t.params.current,"page-size":t.params.size},on:{"update:currentPage":function(e){return t.$set(t.params,"current",e)},"update:current-page":function(e){return t.$set(t.params,"current",e)},"current-change":t.currentChange}})],1)],1)],1)},s=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),i=(a("a481"),a("b5c6")),l="/tmlms/visitRecord";function c(t){return Object(i["a"])({url:"".concat(l,"/page"),method:"get",params:t})}var o=a("2f62");function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m={data:function(){return{historyList:[],timeLists:[],total:0,params:{current:1,size:10,realName:""},options:{expandAll:!1,columns:[{text:"基层组织",value:"realName"},{text:"浏览内容",value:"content"},{text:"浏览时间",value:"createTime"}]},status:[{label:"审核中",value:1},{label:"审核通过",value:2},{label:"审核失败",value:3}],userId:"",villageId:""}},methods:{onSearch:function(){this.params.current=1,this.getData()},currentChange:function(t){this.params.current=t,this.getData()},addShipowner:function(){this.$router.push({path:"/hrms_spa/village_shipOwner_detail"})},handleView:function(t){this.$router.push({path:"/hrms_spa/village_shipOwner_detail",query:{see:t}})},handleEdit:function(t){this.$router.push({path:"/hrms_spa/village_shipOwner_detail",query:{edit:t}})},getData:function(){var t=this;this.params.realName=this.params.realName.replace(/\s*/g,""),this.params.timeLists&&(this.params.timeStart=this.params.timeLists[0],this.params.timeEnd=this.params.timeLists[1]),this.params.orgId=this.userInfo.orgId,c(this.params).then((function(e){t.historyList=e.data.data.records,t.total=e.data.data.total}))}},computed:u({},Object(o["c"])(["userInfo"])),created:function(){this.getData()},filters:{typeFilter:function(t){var e={1:"审核中",2:"审核通过",3:"审核失败"};return e[t]}}},h=m,d=(a("8231"),a("2877")),f=Object(d["a"])(h,r,s,!1,null,"71578c86",null);e["default"]=f.exports}}]);