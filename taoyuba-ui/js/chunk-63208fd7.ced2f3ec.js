(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63208fd7"],{"217f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-box"},[a("basic-container",[a("div",{staticClass:"shipowner_title"},[t.manager?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addShipowner}},[t._v("新增")]):t._e(),t.manager?a("el-button",{attrs:{type:"default",size:"small"},on:{click:t.exportInfo}},[t._v("导出信息\n        ")]):t._e(),a("div",{staticStyle:{float:"right"}},[a("span",[a("el-input",{attrs:{placeholder:"请输入身份证",size:"small",clearable:""},model:{value:t.params.idcard,callback:function(e){t.$set(t.params,"idcard","string"===typeof e?e.trim():e)},expression:"params.idcard"}})],1),a("span",[a("el-input",{attrs:{placeholder:"请输入姓名",size:"small",clearable:""},model:{value:t.params.realName,callback:function(e){t.$set(t.params,"realName","string"===typeof e?e.trim():e)},expression:"params.realName"}})],1),a("span",[a("el-input",{attrs:{placeholder:"请输入联系电话",size:"small",clearable:""},model:{value:t.params.phone,callback:function(e){t.$set(t.params,"phone","string"===typeof e?e.trim():e)},expression:"params.phone"}})],1),a("el-button",{attrs:{size:"small"},on:{click:t.getParamData}},[t._v("搜索")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.shipownerList,stripe:""}},[t._l(t.options.columns,(function(e,n){return a("el-table-column",{key:n,attrs:{prop:e.value,label:e.text,width:e.width},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n          "+t._s(a.row[e.value]?a.row[e.value]:"--")+"\n        ")]}}],null,!0)})})),t.smdj?a("el-table-column",{attrs:{prop:"status",label:"审核操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#F00",disabled:e.row.isDisabled},on:{change:function(a){return t.getStatus(e.row.swith,e.row.idcard)}},model:{value:e.row.swith,callback:function(a){t.$set(e.row,"swith",a)},expression:"scope.row.swith"}})],1)]}}],null,!1,2835381525)}):t._e(),t.smdj?a("el-table-column",{attrs:{prop:"status",label:"审核状态",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("typeFilter")(e.row.status))+"\n        ")]}}],null,!1,3599947272)}):t._e(),a("el-table-column",{attrs:{label:"操作",width:"220px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleView(e.row.idcard)}}},[t._v("查看")]),t.manager?a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.row.idcard)}}},[t._v("编辑")]):t._e(),t.manager?a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleDel(e.row.idcard)}}},[t._v("删除")]):t._e()]}}])})],2),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.total,"page-size":t.params.size,"current-page":t.params.current},on:{"update:currentPage":function(e){return t.$set(t.params,"current",e)},"update:current-page":function(e){return t.$set(t.params,"current",e)},"current-change":t.currentChange}})],1)],1)],1)},r=[],i=(a("96cf"),a("1da1")),s=(a("ac6a"),a("6c21")),o=a("7ded"),c=a("6ada"),u={name:"shipOwner",mixins:[c["a"]],data:function(){return{shipownerList:[],total:10,params:{current:1,size:10,idcard:"",realName:"",phone:""},exportParams:{idcard:"",realName:"",status:"",phone:""},options:{expandAll:!1,columns:[{text:"姓名",value:"realName",width:200},{text:"身份证号码",value:"idcard",width:300},{text:"联系地址",value:"address"},{text:"联系电话",value:"phone",width:300}]},status:[{label:"审核中",value:1},{label:"审核通过",value:2},{label:"审核失败",value:3}],manager:!1,userData:{roles:[]}}},mounted:function(){this.params.current=1,this.getData()},methods:{currentChange:function(t){this.params.current=t,this.setQuery({current:this.params.current}),this.getData()},addShipowner:function(){this.$router.push({name:"detailShipowner"})},handleView:function(t){this.$router.push({name:"detailShipowner",query:{see:t}})},handleEdit:function(t){this.$router.push({name:"detailShipowner",query:{edit:t}})},getData:function(){var t=this;Object(s["g"])(this.params).then((function(e){t.shipownerList=e.data.data.records,t.shipownerList.forEach((function(t){2===t.status&&0!==t.userId?t.swith=!0:t.swith=!1})),t.shipownerList.forEach((function(t){!1===t.swith&&0===t.userId?t.isDisabled=!0:t.isDisabled=!1})),t.total=e.data.data.total}))},handleDel:function(t){var e=this;this.$confirm("此操作将永久删除该船东, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(s["a"])(t).then((function(t){0==t.data.code?(e.$message({type:"success",message:"删除成功"}),e.getData()):e.$message.error(t.data.msg)})).catch((function(t){e.$message.error(t.data.msg)}))})).catch((function(){}))},getStatus:function(t,e){var a=this,n="";n=t?2:3,Object(s["k"])(n,e).then((function(t){a.$message({type:"success",message:t.data.msg}),a.getData()}))},isManager:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])().then((function(t){return t.data.data}));case 2:this.userData=t.sent,-1!==this.userData.roles.indexOf(111)&&(this.manager=!0);case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getParamData:function(){this.params.current=1,this.setQuery(),this.getData()},exportInfo:function(){var t=this;Object(s["c"])(this.exportParams).catch((function(e){t.$message({type:"warning",message:e})}))}},computed:{smdj:function(){return this.getQuery(),this.getData(),this.isManager(),this.$route.path.indexOf("admin")>0}},created:function(){this.getQuery(),this.getData(),this.isManager()},filters:{typeFilter:function(t){if(t){var e={1:"审核中",2:"审核通过",3:"审核失败"};return e[t]}return"--"}},watch:{"params.idcard":function(t){this.exportParams.idcard=t},"params.realName":function(t){this.exportParams.realName=t},"params.phone":function(t){this.exportParams.phone=t},"params.status":function(t){this.exportParams.status=t}}},l=u,d=(a("dca5"),a("2877")),p=Object(d["a"])(l,n,r,!1,null,"b301c5f4",null);e["default"]=p.exports},"2f9e":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("ac6a"),a("28a5"),a("a481");var n=a("b5c6");function r(t){var e=t.url,a=t.method,r=void 0===a?"post":a,s=t.data,o=void 0===s?{}:s,c=t.title,u=void 0===c?"":c;return new Promise((function(t){return Object(n["a"])({url:e,method:r,headers:{responseType:"arraybuffer"},data:o,responseType:"blob"}).then((function(e){i({title:u,response:e}).then((function(){t()}))}))}))}function i(t){var e=t.title,a=void 0===e?"":e,n=t.response,r=s(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(t){var e=n.headers,i=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,a);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(i),s.download=a?"".concat(a,".").concat(r.suffix):r.filename,document.body.appendChild(s),s.style.display="none",s.click()}t()}))}function s(t){var e={},a=t.split(";");return a.forEach((function(t){var a=t.replace(/^\s+|\s+$/g,""),n=a.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]})),e.suffix=e.filename.split(".")[1],e}},"6ada":function(t,e,a){"use strict";e["a"]={methods:{getQuery:function(){var t=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var e=JSON.parse(t);for(var a in this.params)e[a]&&(this.params[a]=e[a])}},setQuery:function(t){if(t){var e=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var a=JSON.parse(e);for(var n in t)a[n]=t[n];sessionStorage.setItem("query",JSON.stringify(a))}else sessionStorage.setItem("query",JSON.stringify(t))}else sessionStorage.setItem("query",JSON.stringify(this.params))}}}},"6c21":function(t,e,a){"use strict";a.d(e,"g",(function(){return s})),a.d(e,"j",(function(){return o})),a.d(e,"a",(function(){return c})),a.d(e,"h",(function(){return u})),a.d(e,"d",(function(){return l})),a.d(e,"b",(function(){return d})),a.d(e,"e",(function(){return p})),a.d(e,"k",(function(){return f})),a.d(e,"l",(function(){return m})),a.d(e,"f",(function(){return h})),a.d(e,"i",(function(){return g})),a.d(e,"c",(function(){return w}));var n=a("b5c6"),r=a("2f9e"),i="/tmlms/ship_owner";function s(t){return Object(n["a"])({url:"".concat(i,"/page"),method:"get",params:t})}function o(t,e){return Object(n["a"])({url:"".concat(i,"/create?type=").concat(e),method:"post",data:t})}function c(t){return Object(n["a"])({url:"".concat(i,"/delete?idcard=").concat(t),method:"post"})}function u(t){return Object(n["a"])({url:"".concat(i,"/getDetail?idcard=").concat(t),method:"get"})}function l(t){return Object(n["a"])({url:"admin/region/wholeInfoList?areaCode=".concat(t),method:"get"})}function d(t,e){return Object(n["a"])({url:"".concat(i,"/edit?type=").concat(e),method:"post",data:t})}function p(t){return Object(n["a"])({url:"admin/region/wholeInfo?areaCode=".concat(t),method:"get"})}function f(t,e){return Object(n["a"])({url:"".concat(i,"/newReview?status=").concat(t,"&idcard=").concat(e),method:"post"})}function m(t){return Object(n["a"])({url:"admin/file/upload/avatar",method:"post",data:t})}function h(t){return Object(n["a"])({url:"".concat(i,"/idcardcheck"),method:"get",params:{idcard:t}})}function g(t,e){return Object(n["a"])({url:"".concat(i,"/newedit?type=").concat(e),method:"post",data:t})}function w(t){return Object(r["a"])({url:"tmlms/tybmlmsExcelExport/downloadOwner",data:t,title:"船东信息"})}},dca5:function(t,e,a){"use strict";a("f165")},f165:function(t,e,a){}}]);