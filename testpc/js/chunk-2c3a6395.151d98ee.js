(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c3a6395"],{"0f9b":function(t,e,a){"use strict";a.d(e,"c",(function(){return i})),a.d(e,"d",(function(){return r})),a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return c})),a.d(e,"e",(function(){return l}));var n=a("b5c6"),s="/tybhrms/tybtrain";function i(t){return Object(n["a"])({url:"".concat(s,"/page"),method:"get",params:t})}function r(t){return Object(n["a"])({url:"".concat(s,"/save"),method:"post",data:t})}function o(t){return Object(n["a"])({url:"".concat(s,"/del/").concat(t),method:"post"})}function c(t){return Object(n["a"])({url:"".concat(s,"/").concat(t),method:"get"})}function l(t){return Object(n["a"])({url:"".concat(s,"/update"),method:"post",data:t})}},"9b20d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-box"},[a("basic-container",[a("page-header",{attrs:{title:"培训开班"}}),a("div",{staticClass:"shipowner_title"},[t.train_class_add?a("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:t.addTrainClass}},[t._v("+新增")]):t._e(),a("div",{staticStyle:{float:"right"}},[a("span",[a("el-input",{attrs:{placeholder:"请输入开班名称",size:"mini",clearable:""},model:{value:t.params.title,callback:function(e){t.$set(t.params,"title",e)},expression:"params.title"}})],1),a("span",[a("el-date-picker",{attrs:{type:"date",size:"mini","value-format":"yyyy-MM-dd",placeholder:"请输入开班日期"},model:{value:t.params.openTime,callback:function(e){t.$set(t.params,"openTime",e)},expression:"params.openTime"}})],1),a("span",[a("el-input",{attrs:{placeholder:"请输入开班地点",size:"mini",clearable:""},model:{value:t.params.address,callback:function(e){t.$set(t.params,"address",e)},expression:"params.address"}})],1),a("el-button",{attrs:{size:"mini"},on:{click:t.getData}},[t._v("搜索")])],1)],1),a("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:t.trainClassList,"header-cell-style":{background:"#eef1f6",color:"#606266"},stripe:""}},[t._l(t.options.columns,(function(t,e){return a("el-table-column",{key:e,attrs:{prop:t.value,label:t.text,width:t.width}})})),a("el-table-column",{attrs:{label:"状态",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return["报名中"===e.row.classStatus?a("el-button",{attrs:{type:"success",size:"mini",plain:""}},[t._v(t._s(e.row.classStatus))]):t._e(),"未报名"===e.row.classStatus?a("el-button",{attrs:{type:"danger",size:"mini",plain:""}},[t._v(t._s(e.row.classStatus))]):t._e()]}}])}),a("el-table-column",{attrs:{label:"开班",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["已开班"===e.row.openClass?a("span",{staticStyle:{color:"#0099FF"}},[t._v("● "+t._s(e.row.openClass))]):t._e(),"未开班"===e.row.openClass?a("span",{staticStyle:{color:"#B0B0B0"}},[t._v("● "+t._s(e.row.openClass))]):t._e()]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.train_class_aud&&0===e.row.status?a("el-button",{attrs:{type:"warning",size:"mini",plain:""},on:{click:function(a){return t.handleAudit(e.row.id)}}},[t._v("审核\n            ")]):t._e(),t.train_class_edit?a("el-button",{attrs:{type:"warning",size:"mini",plain:""},on:{click:function(a){return t.handleEdit(e.row.id)}}},[t._v("编辑\n            ")]):t._e(),t.train_class_sign&&"已开班"===e.row.openClass?a("el-button",{attrs:{size:"mini",plain:""},on:{click:function(a){return t.handleSign(e.row.id)}}},[t._v("签到记录\n            ")]):t._e(),a("el-button",{attrs:{size:"mini",plain:""},on:{click:function(a){return t.handleLesson(e.row.id)}}},[t._v("课程\n            ")]),t.train_class_del?a("el-button",{attrs:{icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.handleDel(e.row.id)}}}):t._e()]}}])})],2),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next, total",total:t.total,"page-size":t.params.size},on:{"current-change":t.currentChange}})],1),a("el-dialog",{attrs:{title:"提示",visible:t.audDialog,width:"30%","before-close":t.audClose},on:{"update:visible":function(e){t.audDialog=e}}},[a("span",[t._v("是否同意审核")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.agreeAudit}},[t._v("同 意")]),a("el-button",{attrs:{type:"primary"},on:{click:t.cancelAudit}},[t._v("拒 绝")])],1)])],1)],1)},s=[],i=(a("8e6e"),a("456d"),a("ac6a"),a("ade3")),r=a("0f9b"),o=a("7ded"),c=a("e17e"),l=a("b5c6"),u="/tmlms/tybaudit";function d(t,e,a,n){return Object(l["a"])({url:"".concat(u,"/check"),method:"post",params:{id:t,statusAudit:e,statusTable:a,tableName:n}})}var p=a("2f62");function h(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?h(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m={data:function(){return{trainClassList:[],total:10,params:{current:1,size:10,title:"",openTime:"",address:""},options:{expandAll:!1,columns:[{text:"开班名称",value:"title",width:150},{text:"机构名称",value:"userId",width:150},{text:"开班地点",value:"address",width:250},{text:"开班时间",value:"openTime",width:120}]},train_class_add:!1,train_class_edit:!1,train_class_del:!1,train_class_aud:!1,train_class_sign:!1,audDialog:!1,aid:"",now:"",mangner:!1}},computed:f({},Object(p["c"])(["permissions"])),methods:{currentChange:function(t){this.params.current=t,this.getData()},addTrainClass:function(){this.$router.push({path:"/article_spa/Class_Detial/0",query:{add:0}})},handleEdit:function(t){this.$router.push({path:"/article_spa/Class_Detial/".concat(t),query:{edit:t}})},handleAudit:function(t){this.audDialog=!0,this.aid=t},getData:function(){var t=this;Object(o["c"])().then((function(e){-1===e.data.data.roles.indexOf(111)&&(t.params.userId=e.data.data.sysUser.userId),Object(r["c"])(t.params).then((function(e){t.trainClassList=e.data.data.records;var a=new Date(t.now);t.trainClassList.forEach((function(t){var e=new Date(t.openTime);a.getTime()>e.getTime()?t.openClass="已开班":t.openClass="未开班";var n=new Date(t.applyStartTime),s=new Date(t.applyEndTime);t.classStatus=a>=n&&a<=s?"报名中":"未报名",Object(c["d"])(t.userId).then((function(e){t.userId=e.data.data.realName}))}))}))}))},handleDel:function(t){var e=this;this.$confirm("此操作将永久删除该培训开班数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(r["a"])(t).then((function(t){e.$message({type:"success",message:t.data.msg}),e.getData()})).catch((function(t){e.$message.error(t.data.msg)}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},audClose:function(){this.audDialog=!1},agreeAudit:function(){var t=this,e=1,a=1,n="tyb_train";d(this.aid,e,a,n).then((function(){t.$message.success("审核通过！"),t.getData(),t.audDialog=!1})).catch((function(e){t.message.error(e.msg)}))},cancelAudit:function(){var t=this,e=2,a=2,n="tyb_train";d(this.aid,e,a,n).then((function(){t.$message.success("审核不通过！"),t.getData(),t.audDialog=!1})).catch((function(e){t.message.error(e.msg)}))},handleSign:function(t){this.$router.push({path:"/article_spa/sign_information/".concat(t)})},handleLesson:function(t){this.$router.push({path:"/article_spa/lesson_list/".concat(t)})},getNow:function(){var t=new Date,e="-",a=t.getFullYear(),n=t.getMonth()+1,s=t.getDate();n>=1&&n<=9&&(n="0"+n),s>=0&&s<=9&&(s="0"+s),this.now=a+e+n+e+s},getUserInfo:function(){var t=this;Object(o["c"])().then((function(e){-1===e.data.data.roles.indexOf(111)?t.mangner=!1:t.mangner=!0,!1===t.mangner&&t.options.columns.splice(1,1)}))}},created:function(){this.getNow(),this.getData(),this.getUserInfo(),this.train_class_add=this.permissions["train_class_add"],this.train_class_edit=this.permissions["train_class_edit"],this.train_class_del=this.permissions["train_class_del"],this.train_class_aud=this.permissions["train_class_aud"],this.train_class_sign=this.permissions["train_class_sign"]}},_=m,g=(a("ace0"),a("2877")),b=Object(g["a"])(_,n,s,!1,null,"7b5e0f4e",null);e["default"]=b.exports},a9ce:function(t,e,a){},ace0:function(t,e,a){"use strict";a("a9ce")}}]);