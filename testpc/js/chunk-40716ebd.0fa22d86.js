(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40716ebd"],{"01a4":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"船老大招聘"}}),n("operation-container",[n("template",{slot:"left"},[n("iep-button",{attrs:{type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return e.handleAdd()}}},[e._v("新增")])],1),n("template",{slot:"right"},[n("operation-search",{attrs:{"advance-search":"",prop:e.searchData},on:{"search-page":e.searchPage}})],1)],2),n("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.columnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"operation",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("operation-wrapper",[n("iep-button",{attrs:{type:"warning",plain:""},on:{click:function(n){return e.handleEdit(t.row)}}},[e._v("编辑")]),n("iep-button",{attrs:{type:"default"},on:{click:function(n){return e.handleDelete(t.row)}}},[n("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1)],1)],1)},a=[],i=(n("96cf"),n("1da1")),o=n("0f1e"),c=n("502e"),u=n("b0a06"),s={mixins:[c["a"]],data:function(){return{dictsMap:u["b"],columnsMap:u["a"],searchData:"shipName"}},created:function(){this.loadPage()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleDelete:function(e){console.log(e),this._handleGlobalDeleteById(e.id,o["d"])},handleAdd:function(){this.$router.push({path:"/hrms_spa/bot_admin/0"})},handleEdit:function(e){this.$router.push({path:"/hrms_spa/bot_admin/".concat(e.id)})},handleDetail:function(e){this.$router.push({path:"/hrms_spa/crew_view/".concat(e.userId)})},loadPage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=n.length>0&&void 0!==n[0]?n[0]:this.searchForm,this.loadTable(t,o["h"]);case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},l=s,d=n("2877"),p=Object(d["a"])(l,r,a,!1,null,null,null);t["default"]=p.exports},"0f1e":function(e,t,n){"use strict";n.d(t,"k",(function(){return c})),n.d(t,"j",(function(){return u})),n.d(t,"m",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"i",(function(){return p})),n.d(t,"l",(function(){return f})),n.d(t,"f",(function(){return h})),n.d(t,"h",(function(){return m})),n.d(t,"d",(function(){return g})),n.d(t,"g",(function(){return b})),n.d(t,"n",(function(){return v})),n.d(t,"c",(function(){return y})),n.d(t,"b",(function(){return O}));var r=n("b5c6"),a=n("2f9e"),i="tybhrms/resume",o="tmlms/shipownerRecruit";function c(e){return Object(r["a"])({url:"".concat(i,"/getPage"),method:"get",params:e})}function u(e){return Object(r["a"])({url:"".concat(i,"/getMyCerts"),method:"get",params:e})}function s(e,t){return Object(r["a"])({url:"".concat(i,"/review?status=").concat(e,"&resumeId=").concat(t),method:"post"})}function l(e){return Object(r["a"])({url:"".concat(i,"/delete/")+e,method:"post",data:e})}function d(e){return Object(r["a"])({url:"".concat(i,"/add"),method:"post",data:e})}function p(e){return Object(r["a"])({url:"".concat(i,"/")+e,method:"get",params:e})}function f(e,t){return Object(r["a"])({url:"".concat(i,"/update"),method:"put",params:{publish:t},data:e})}function h(e){return Object(a["a"])({url:"tybhrms/tybExcelExport/resume",data:e,title:"简历信息"})}function m(e){return Object(r["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function g(e){return Object(r["a"])({url:"".concat(o,"/delete/")+e,method:"post",data:e})}function b(e){return Object(r["a"])({url:"".concat(o,"/")+e,method:"get",dparamsata:e})}function v(e){return Object(r["a"])({url:"".concat(o,"/update"),method:"post",data:e})}function y(e){return Object(r["a"])({url:"".concat(o,"/create"),method:"post",data:e})}function O(e){return Object(r["a"])({url:"tybship/tybship/findmyship/"+e,method:"get"})}},"2f9e":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("ac6a"),n("28a5"),n("a481");var r=n("b5c6");function a(e){var t=e.url,n=e.method,a=void 0===n?"post":n,o=e.data,c=void 0===o?{}:o,u=e.title,s=void 0===u?"":u;return console.log(t),new Promise((function(e){return Object(r["a"])({url:t,method:a,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(t){i({title:s,response:t}).then((function(){e()}))}))}))}function i(e){var t=e.title,n=void 0===t?"":t,r=e.response,a=o(r.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=r.headers,i=new Blob([r.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,n);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=n?"".concat(n,".").concat(a.suffix):a.filename,document.body.appendChild(o),o.style.display="none",o.click()}e()}))}function o(e){var t={},n=e.split(";");return n.forEach((function(e){var n=e.replace(/^\s+|\s+$/g,""),r=n.split("=");r[1]?t[r[0]]=r[1]:t[r[0]]=r[0]})),t.suffix=t.filename.split(".")[1],t}},4917:function(e,t,n){"use strict";var r=n("cb7c"),a=n("9def"),i=n("0390"),o=n("5f1b");n("214f")("match",1,(function(e,t,n,c){return[function(n){var r=e(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,r):new RegExp(n)[t](String(r))},function(e){var t=c(n,e,this);if(t.done)return t.value;var u=r(e),s=String(this);if(!u.global)return o(u,s);var l=u.unicode;u.lastIndex=0;var d,p=[],f=0;while(null!==(d=o(u,s))){var h=String(d[0]);p[f]=h,""===h&&(u.lastIndex=i(s,a(u.lastIndex),l)),f++}return 0===f?null:p}]}))},"502e":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var r=n("ade3"),a=(n("96cf"),n("1da1")),i=n("51f4");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){Object(r["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,i,o,u,s,l,d,p,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=f.length>2&&void 0!==f[2]?f[2]:function(e){return e},this.isLoadTable=!0,e.next=4,n(c(c({},this.pageOption),t));case 4:return a=e.sent,i=a.data,o=i.data,u=o.records,s=o.size,l=o.total,d=o.current,p=l/s+1===d,p&&0!==l?this.searchPage({current:d-1,size:s,total:l}):this.pagination={current:d,size:s,total:l},this.pagedTable=u.map(r),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",a=u[r];this.$confirm("此操作将".concat(a,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?n.$message({type:"success",message:"".concat(a,"成功!")}):n.$message({type:"info",message:"".concat(a,"失败，").concat(e.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,r,i,o=this,c=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:"delete",r=this.multipleSelection,i=u[n],void 0!==r&&0!==r.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(r);case 2:n=e.sent,a=n.data,a.data?(o.$message({type:"success",message:"".concat(i,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(i,"失败，").concat(a.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,n,r,i){var o=this;this.$confirm(r||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function r(){var a,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t(e);case 2:a=r.sent,c=a.data,c.data?o.$message({type:"success",message:i||"".concat(n,"成功!")}):o.$message({type:"info",message:"".concat(c.msg)}),o.loadPage();case 6:case"end":return r.stop()}}),r)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"7cdf":function(e,t,n){var r=n("5ca1");r(r.S,"Number",{isInteger:n("9c12")})},"84df":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("c1df"),a=n.n(r),i=function(){return a()().format("YYYY-MM-DD HH:mm:ss")}},"9c12":function(e,t,n){var r=n("d3f4"),a=Math.floor;e.exports=function(e){return!r(e)&&isFinite(e)&&a(e)===e}},b0a06:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"f",(function(){return d})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return h})),n.d(t,"e",(function(){return p})),n.d(t,"g",(function(){return m}));n("c5f6"),n("7cdf"),n("4917");var r=n("0e0b"),a=n("84df"),i={isTrain:{0:"否",1:"是"}},o=[{prop:"shipName",label:"渔船名"},{prop:"shipowner",label:"持证人"},{prop:"driverQuantity",label:"驾驶类数量"},{prop:"engineQuantity",label:"轮机类数量"},{prop:"normalQuantity",label:"普通船员数量"},{prop:"phone",label:"电话号码"}],c=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"中国",nation:"",applyType:1,isTrain:0}},u=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"",nation:"",applyType:1,isTrain:0}},s=function(e,t,n){""===t?n(new Error("请输入联系电话")):t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)?n():n(new Error("请输入正确的手机号码!"))},l=function(e,t,n){Number.isInteger(Number(t))&&Number(t)>0&&Number(t)<999?n():n(new Error("请输入1-999的正整数"))},d={shipName:[{required:!0,message:"请填写完整渔船名",trigger:"blur"}],shipowner:[{required:!0,message:"请填写持证人姓名",trigger:"blur"}],driverQuantity:[{required:!0,message:"请填写驾驶类数量",trigger:"blur"},{validator:l,trigger:"blur"}],normalQuantity:[{required:!0,message:"请填写普通船员数量",trigger:"blur"},{validator:l,trigger:"blur"}],engineQuantity:[{required:!0,message:"请填写轮机类数量",trigger:"blur"},{validator:l,trigger:"blur"}],phone:[{required:!0,message:"请填写联系电话",trigger:"blur"},{validator:s,trigger:"blur"}]},p=function(){return{contactName:"",positionName:""}},f=function(){return{contactName:"",positionName:""}},h=function(e){var t=Object(r["g"])(u(),e);return t},m=function(e){var t=Object(r["g"])(f(),e);return t.contactName=e.contactName?e.contactName:null,t.positionName=e.positionName?e.positionName:null,t}}}]);