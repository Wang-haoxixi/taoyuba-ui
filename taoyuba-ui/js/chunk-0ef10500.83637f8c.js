(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ef10500"],{"244c":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return s})),n.d(e,"e",(function(){return l}));var r=n("b5c6"),o="/tybhrms/tybbook";function a(t){return Object(r["a"])({url:"".concat(o,"/save"),method:"post",data:t})}function i(t){return Object(r["a"])({url:"".concat(o,"/page"),method:"get",params:t})}function c(t){return Object(r["a"])({url:"".concat(o,"/").concat(t),method:"get"})}function s(t){return Object(r["a"])({url:"".concat(o,"/del/").concat(t),method:"post"})}function l(t){return Object(r["a"])({url:"".concat(o,"/update"),method:"post",data:t})}},"2f21":function(t,e,n){"use strict";var r=n("79e5");t.exports=function(t,e){return!!t&&r((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"55dd":function(t,e,n){"use strict";var r=n("5ca1"),o=n("d8e8"),a=n("4bf8"),i=n("79e5"),c=[].sort,s=[1,2,3];r(r.P+r.F*(i((function(){s.sort(void 0)}))||!i((function(){s.sort(null)}))||!n("2f21")(c)),"Array",{sort:function(t){return void 0===t?c.call(a(this)):c.call(a(this),o(t))}})},ec9b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"教材管理"}}),n("operation-container",[n("template",{slot:"left"},[t.hrms_book_add?n("iep-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleAdd}},[t._v("新增")]):t._e()],1),n("template",{slot:"right"},[n("span",[n("el-input",{attrs:{placeholder:"请输入教材名称",size:"small",clearable:""},model:{value:t.params.title,callback:function(e){t.$set(t.params,"title","string"===typeof e?e.trim():e)},expression:"params.title"}})],1),n("span",[n("el-input",{attrs:{type:"number",min:"0",placeholder:"价格",size:"small",clearable:""},model:{value:t.params.price,callback:function(e){t.$set(t.params,"price","string"===typeof e?e.trim():e)},expression:"params.price"}})],1),n("el-button",{attrs:{size:"small"},on:{click:t.getData}},[t._v("搜索")])],1)],2),n("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:t.bookList,"header-cell-style":{background:"#eef1f6",color:"#606266"},stripe:""}},[n("el-table-column",{attrs:{label:"编号",prop:"id",width:"100"}}),n("el-table-column",{attrs:{label:"分类",prop:"dictLabel"}}),t._l(t.options.columns,(function(t,e){return n("el-table-column",{key:e,attrs:{prop:t.value,label:t.text,width:t.width}})})),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.hrms_book_edit?n("el-button",{attrs:{type:"default",size:"mini",plain:""},on:{click:function(n){return t.handleEdit(e.row.id)}}},[t._v("编辑\n            ")]):t._e(),t.hrms_book_del?n("el-button",{attrs:{type:"warning",icon:"el-icon-delete",size:"mini"},on:{click:function(n){return t.handleDelete(e.row.id)}}}):t._e()]}}])}),n("el-table-column",{staticStyle:{width:"40px"},attrs:{label:"排序",prop:"sort"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-input-number",{attrs:{"controls-position":"right",min:1,max:100,size:"mini",id:t.inputNum},on:{change:function(n){return t.handleChange(e.row)},blur:function(n){return t.handleChange(e.row)}},model:{value:e.row.sort,callback:function(n){t.$set(e.row,"sort",n)},expression:"scope.row.sort"}})]}}])})],2)],1)],1)},o=[],a=(n("8e6e"),n("456d"),n("55dd"),n("ac6a"),n("ade3")),i=n("244c"),c=n("2f62");function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){Object(a["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var u={data:function(){return{bookList:[],total:10,params:{current:1,size:10,title:""},options:{expandAll:!1,columns:[{text:"教材名称",value:"title"},{text:"教材介绍",value:"info",width:350},{text:"单价",value:"price",width:150}]},hrms_book_add:!1,hrms_book_edit:!1,hrms_book_del:!1,num:"1"}},created:function(){this.getData(),this.hrms_book_add=this.permissions["hrms_book_add"],this.hrms_book_edit=this.permissions["hrms_book_edit"],this.hrms_book_del=this.permissions["hrms_book_del"]},computed:l(l({},Object(c["c"])(["permissions"])),{},{inputNum:function(){return"num"+this._uid}}),methods:{currentChange:function(t){this.params.current=t,this.getData()},handleDelete:function(t){var e=this;this.$confirm("确定要删除此教材？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["b"])(t).then((function(){e.$message.success("删除成功"),e.getData()})).catch((function(t){e.$message.error(t.data.msg)}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},handleAdd:function(){this.$router.push({path:"/textbook_spa/detail/create/0"})},handleEdit:function(t){this.$router.push({path:"/textbook_spa/detail/update/".concat(t)})},getData:function(){var t=this;Object(i["d"])(this.params).then((function(e){t.bookList=e.data.data.records,t.total=e.data.data.total,t.bookList.forEach((function(t){t.price=t.price+"元"}))}))},handleChange:function(t){var e=this,n={id:t.id,sort:t.sort};Object(i["e"])(n).then((function(t){t.data.data&&e.getData()}))}}},d=u,p=n("2877"),h=Object(p["a"])(d,r,o,!1,null,null,null);e["default"]=h.exports}}]);