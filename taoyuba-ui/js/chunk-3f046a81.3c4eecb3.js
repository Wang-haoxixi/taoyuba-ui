(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f046a81"],{"16e3":function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return s})),n.d(t,"e",(function(){return u}));var a=n("b5c6"),r="/tybship/tybshipinsures";function i(e){return Object(a["a"])({url:"".concat(r,"/page"),method:"get",params:e})}function o(e){return Object(a["a"])({url:"".concat(r,"/del/").concat(e),method:"post"})}function c(e){return Object(a["a"])({url:"".concat(r,"/").concat(e),method:"get"})}function s(e){return Object(a["a"])({url:"".concat(r,"/save"),method:"post",data:e})}function u(e){return Object(a["a"])({url:"".concat(r,"/update"),method:"post",data:e})}},"407d":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));n("84df");var a=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"shipowner",label:"持证人"},{prop:"shipownerIdcard",label:"持证人身份证"},{prop:"engineTotalPower",label:"主机总功率(kw)"},{prop:"hullLength",label:"船长(m)"},{prop:"dualPower",label:"双控功率(kw)"}],r=[{prop:"type",label:"类型"},{prop:"amount",label:"保额"},{prop:"premium",label:"保费"},{prop:"insureDate",label:"投保日期"}]},"502e":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var a=n("ade3"),r=(n("96cf"),n("1da1")),i=n("51f4");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){var a,r,i,o,s,u,l,p,h,d=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=d.length>2&&void 0!==d[2]?d[2]:function(e){return e},this.isLoadTable=!0,e.next=4,n(c(c({},this.pageOption),t));case 4:return r=e.sent,i=r.data,o=i.data,s=o.records,u=o.size,l=o.total,p=o.current,h=l/u+1===p,h&&0!==l?this.searchPage({current:p-1,size:u,total:l}):this.pagination={current:p,size:u,total:l},this.pagedTable=s.map(a),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",r=s[a];this.$confirm("此操作将".concat(r,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?n.$message({type:"success",message:"".concat(r,"成功!")}):n.$message({type:"info",message:"".concat(r,"失败，").concat(e.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,a,i,o=this,c=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:"delete",a=this.multipleSelection,i=s[n],void 0!==a&&0!==a.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(a);case 2:n=e.sent,r=n.data,r.data?(o.$message({type:"success",message:"".concat(i,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(i,"失败，").concat(r.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,n,a,i){var o=this;this.$confirm(a||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function a(){var r,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t(e);case 2:r=a.sent,c=r.data,c.data?o.$message({type:"success",message:i||"".concat(n,"成功!")}):o.$message({type:"info",message:"".concat(c.msg)}),o.loadPage();case 6:case"end":return a.stop()}}),a)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"541ed":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("basic-container",[n("page-header",{attrs:{title:e.$route.params.shipName+"渔船"}}),n("operation-container",[n("template",{slot:"left"},[e.manager?n("iep-button",{attrs:{type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return e.handleAdd(e.$route.params.shipName)}}},[e._v("新增")]):e._e()],1),n("template",{slot:"right"},[n("el-button",{on:{click:e.backPage}},[e._v("返回")])],1)],2),n("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.insureColumnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"operation",label:"操作",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("operation-wrapper",[e.manager?n("iep-button",{attrs:{size:"mini",plain:""},on:{click:function(n){return e.handleEdit(t.row.id)}}},[e._v("编辑")]):e._e(),e.manager?n("iep-button",{attrs:{size:"mini",plain:""},on:{click:function(n){return e.handleDelete(t.row.id)}}},[e._v("删除")]):e._e()],1)]}}])})],1)],1)],1)},r=[],i=(n("ac6a"),n("96cf"),n("1da1")),o=n("16e3"),c=n("502e"),s=n("407d"),u=n("7ded"),l={mixins:[c["a"]],data:function(){return{insureColumnsMap:s["b"],searchData:"contactName",ifexist:!0,typeList:[{label:"渔船险",value:1},{label:"雇主责任险",value:2}],manager:!1,userData:{}}},created:function(){this.loadPage(),this.isManager()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleAdd:function(e){this.$router.push({path:"/hrms_spa/ship_insure",query:{add:e}})},handleEdit:function(e){this.$router.push({path:"/hrms_spa/ship_insure",query:{edit:e}})},handleDelete:function(e){this._handleGlobalDeleteById(e,o["b"])},handleView:function(){},loadPage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,a=this,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:this.searchForm,t.shipName=this.$route.params.shipName,e.next=4,this.loadTable(t,o["d"]);case 4:n=e.sent,n.records.forEach((function(e){a.typeList.forEach((function(t){e.type===t.value&&(e.type=t.label)}))})),this.pagedTable=n.records;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),backPage:function(){this.$router.push({path:"/hrms_spa/shipCrew_list"})},isManager:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["c"])().then((function(e){return e.data.data}));case 2:this.userData=e.sent,-1===this.userData.roles.indexOf(111)&&-1===this.userData.roles.indexOf(1)||(this.manager=!0);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},p=l,h=n("2877"),d=Object(h["a"])(p,a,r,!1,null,null,null);t["default"]=d.exports},"84df":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("c1df"),r=n.n(a),i=function(){return r()().format("YYYY-MM-DD HH:mm:ss")}}}]);