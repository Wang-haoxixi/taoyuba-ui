(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23acdc20"],{"0521":function(e,t,n){"use strict";n.d(t,"g",(function(){return r})),n.d(t,"h",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"k",(function(){return o})),n.d(t,"e",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"j",(function(){return u})),n.d(t,"b",(function(){return p})),n.d(t,"l",(function(){return d})),n.d(t,"c",(function(){return m})),n.d(t,"i",(function(){return h})),n.d(t,"d",(function(){return f}));var a=n("b5c6");function r(e){return Object(a["a"])({url:"tmlms/exam_examination/oldPage",method:"get",params:e})}function i(e){return Object(a["a"])({url:"/tmlms/exam_examination/".concat(e),method:"get",data:e})}function s(e){return Object(a["a"])({url:"tmlms/exam_examination/save",method:"post",data:e})}function o(e){return Object(a["a"])({url:"tmlms/exam_examination/update",method:"post",data:e})}function c(e){return Object(a["a"])({url:"tmlms/exam_question/kinds",method:"get",data:e})}function l(e){return Object(a["a"])({url:"tmlms/exam_question/levels?kind=".concat(e),method:"get",data:e})}function u(e){return Object(a["a"])({url:"tmlms/exam_question/page",method:"get",params:e})}function p(e){return Object(a["a"])({url:"tmlms/exam_question/batch_save",method:"post",data:e})}function d(e){return Object(a["a"])({url:"tmlms/exam_question/update",method:"post",data:e})}function m(e){return Object(a["a"])({url:"tmlms/exam_question/delete?id=".concat(e),method:"post",data:e})}function h(e){return Object(a["a"])({url:"tmlms/exam_question/".concat(e),method:"get",data:e})}function f(e){return Object(a["a"])({url:"tmlms/exam_question/batchDelete",method:"post",data:e})}},"502e":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var a=n("ade3"),r=(n("96cf"),n("1da1")),i=n("51f4");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){var a,r,i,s,c,l,u,p,d,m=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=m.length>2&&void 0!==m[2]?m[2]:function(e){return e},this.isLoadTable=!0,e.next=4,n(o(o({},this.pageOption),t));case 4:return r=e.sent,i=r.data,s=i.data,c=s.records,l=s.size,u=s.total,p=s.current,d=u/l+1===p,d&&0!==u?this.searchPage({current:p-1,size:l,total:u}):this.pagination={current:p,size:l,total:u},this.pagedTable=c.map(a),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",r=c[a];this.$confirm("此操作将".concat(r,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?n.$message({type:"success",message:"".concat(r,"成功!")}):n.$message({type:"info",message:"".concat(r,"失败，").concat(e.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,a,i,s=this,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=o.length>1&&void 0!==o[1]?o[1]:"delete",a=this.multipleSelection,i=c[n],void 0!==a&&0!==a.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(a);case 2:n=e.sent,r=n.data,r.data?(s.$message({type:"success",message:"".concat(i,"成功!")}),s.pageOption=s._pageOption()):s.$message({type:"info",message:"".concat(i,"失败，").concat(r.msg)}),s.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,n,a,i){var s=this;this.$confirm(a||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function a(){var r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t(e);case 2:r=a.sent,o=r.data,o.data?s.$message({type:"success",message:i||"".concat(n,"成功!")}):s.$message({type:"info",message:"".concat(o.msg)}),s.loadPage();case 6:case"end":return a.stop()}}),a)})))).catch((function(e){s.$message({type:"info",message:"".concat(e,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"6ada":function(e,t,n){"use strict";t["a"]={methods:{getQuery:function(){var e=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var t=JSON.parse(e);for(var n in this.params)t[n]&&(this.params[n]=t[n])}},setQuery:function(e){if(e){var t=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var n=JSON.parse(t);for(var a in e)n[a]=e[a];sessionStorage.setItem("query",JSON.stringify(n))}else sessionStorage.setItem("query",JSON.stringify(e))}else sessionStorage.setItem("query",JSON.stringify(this.params))}}}},9862:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"试题库"}}),n("operation-container",[n("template",{slot:"left"},[n("iep-button",{attrs:{size:"small"},on:{click:e.getData}},[e._v("刷新")]),n("iep-button",{attrs:{size:"small"},on:{click:e.handleAdd}},[e._v("新增")]),n("iep-button",{attrs:{size:"small"},on:{click:e.handleDeleteAll}},[e._v("批量删除")])],1),n("template",{slot:"right"},[n("span",{staticClass:"width130"},[n("el-input",{attrs:{placeholder:"题目名称",size:"small",clearable:""},model:{value:e.params.title,callback:function(t){e.$set(e.params,"title","string"===typeof t?t.trim():t)},expression:"params.title"}})],1),n("span",{staticStyle:{width:"185px"}},[n("el-select",{attrs:{placeholder:"试题分类",clearable:"",size:"small"},on:{change:e.getLevel},model:{value:e.params.kind,callback:function(t){e.$set(e.params,"kind",t)},expression:"params.kind"}},e._l(e.kindList,(function(e){return n("el-option",{key:e.index,attrs:{value:e.kind}})})),1)],1),n("span",{staticStyle:{width:"110px"}},[n("el-select",{attrs:{placeholder:"职务等级",clearable:"",size:"small"},model:{value:e.params.level,callback:function(t){e.$set(e.params,"level",t)},expression:"params.level"}},e._l(e.levelList,(function(e){return n("el-option",{key:e.index,attrs:{value:e.level}})})),1)],1),n("el-button",{attrs:{size:"small"},on:{click:e.getParamData}},[e._v("搜索")])],1)],2),n("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.columnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,select:e.handleSelectionChange,"select-all":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"operation",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("operation-wrapper",[n("iep-button",{attrs:{plain:""},on:{click:function(n){return e.handleEdit(t.row.id)}}},[e._v("编辑")]),n("iep-button",{attrs:{plain:""},on:{click:function(n){return e.handleDel(t.row.id)}}},[e._v("删除")])],1)]}}])})],1)],1)],1)},r=[],i=(n("8e6e"),n("ac6a"),n("456d"),n("ade3")),s=n("2f62"),o=n("502e"),c=n("0521"),l=n("b0e4"),u=n("6ada");function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m={mixins:[o["a"],u["a"]],data:function(){return{columnsMap:l["a"],permissionAll:!1,permissionAdd:!1,permissionView:!1,params:{current:1,size:10,title:"",kind:"",level:""},levelList:[],kindList:[],multipleSelection:[]}},created:function(){this.getQuery(),this.getKindLevel(),this.getLevel(this.params.kind),console.log("params",this.params),this.loadPage(),this.setPermission()},computed:d({},Object(s["c"])(["userInfo","permissions"])),methods:{getData:function(){this.loadPage()},getKindLevel:function(){var e=this;Object(c["e"])().then((function(t){e.kindList=t.data.data}))},getLevel:function(e){var t=this;this.params.level="",Object(c["f"])(e).then((function(e){t.levelList=e.data.data}))},setPermission:function(){this.permissionAll=this.permissions["exam_library_all"],this.permissionAdd=this.permissions["exam_library_add"],this.permissionView=this.permissions["exam_library_view"]},handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},loadPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.params;this.loadTable(e,c["j"])},getParamData:function(){this.params.current=1,this.setQuery(),this.loadPage()},handleAdd:function(){this.$router.push({path:"/test/test_add"})},handleEdit:function(e){this.$router.push({path:"/test/test_add",query:{edit:e}})},handleDel:function(e){var t=this;this.$confirm("是否确认删除试题","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(c["c"])(e).then((function(e){e.data.data&&(t.$message({showClose:!0,message:"删除成功",type:"success"}),t.multipleSelection=[],t.loadPage())}))})).catch((function(){}))},handleCurrentChange:function(e){this.params.current=e,this.setQuery({current:this.params.current}),this.loadPage()},handleSizeChange:function(e){this.params.size=e,this.setQuery({size:this.params.size}),this.loadPage()},handleDeleteAll:function(){var e=this;0!==this.multipleSelection.length?this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(c["d"])(e.multipleSelection).then((function(){e.$message({message:"操作成功",type:"success"}),e.loadPage()}))})).catch((function(){})):this.$message.error("请至少选择一项试题！")}}},h=m,f=n("2877"),g=Object(f["a"])(h,a,r,!1,null,null,null);t["default"]=g.exports},b0e4:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));var a=[{label:"试题名称",prop:"title",width:"400"},{label:"试题分类",prop:"kind"},{label:"职务等级",prop:"level"},{label:"创建者",prop:"createByName"},{label:"创建时间",prop:"createTime"}],r={title:[{required:!0,message:"必填",trigger:"blur"}],kind:[{required:!0,message:"必填"}],type:[{required:!0,message:"必填",trigger:"blur"}],answer:[{required:!0,message:"必填",trigger:"change"}]}}}]);