(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1618a4ce"],{"0e09":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c}));var a=[{label:"渔村名称",prop:"villageName"},{label:"联系人",prop:"contactName"},{label:"联系电话",prop:"phone"},{label:"机构地址",prop:"address"}],r=function(){return{villageName:"",contactName:""}},c=function(e){return r(e)}},"258c":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"船员列表"}}),n("operation-container",[n("template",{slot:"left"}),n("template",{slot:"right"},[n("operation-search",{attrs:{"advance-search":"",prop:e.searchData},on:{"search-page":e.searchPage}},[n("advance-search",{on:{"search-page":e.searchPage}})],1)],1)],2),n("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.columnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}})],1)],1)},r=[],c=(n("8e6e"),n("ac6a"),n("456d"),n("ade3")),o=(n("96cf"),n("1da1")),i=n("c726"),s=n("46b4"),u=n("502e"),l=(n("84df"),[{prop:"realName",label:"联系人"},{prop:"address",label:"地址"},{prop:"contactName",label:"联系人"},{prop:"remark",label:"备注"},{prop:"phone",label:"电话号码"}]);function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){Object(c["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f={components:{advanceSearch:s["default"]},mixins:[u["a"]],data:function(){return{columnsMap:l,searchData:"realName"}},created:function(){this.loadPage()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},loadPage:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=n.length>0&&void 0!==n[0]?n[0]:this.searchForm,this.loadTable(m({shipId:this.shipId},t),i["f"]);case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},computed:{shipId:function(){return this.$route.params.shipId}}},d=f,h=n("2877"),g=Object(h["a"])(d,a,r,!1,null,null,null);t["default"]=g.exports},"46b4":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{attrs:{model:e.form,"label-width":"120px",size:"mini"}},[n("el-form-item",{attrs:{label:"教材标题："}},[n("el-input",{model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1),n("el-form-item",{attrs:{label:"关键字："}},[n("el-input",{model:{value:e.form.positionName,callback:function(t){e.$set(e.form,"positionName",t)},expression:"form.positionName"}})],1),n("el-form-item",[n("operation-wrapper",[n("iep-button",{attrs:{type:"primary"},on:{click:e.searchPage}},[e._v("搜索")]),n("iep-button",{on:{click:e.clearSearchParam}},[e._v("清空")])],1)],1)],1)},r=[],c=n("0e09"),o={data:function(){return{form:Object(c["b"])(),pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]}}},methods:{searchPage:function(){this.$emit("search-page",Object(c["c"])(this.form))},clearSearchParam:function(){this.form=Object(c["b"])()}}},i=o,s=n("2877"),u=Object(s["a"])(i,a,r,!1,null,null,null);t["default"]=u.exports},"502e":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var a=n("ade3"),r=(n("96cf"),n("1da1")),c=n("51f4");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(c["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){var a,r,c,o,s,u,l,p,m,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=f.length>2&&void 0!==f[2]?f[2]:function(e){return e},this.isLoadTable=!0,e.next=4,n(i(i({},this.pageOption),t));case 4:return r=e.sent,c=r.data,o=c.data,s=o.records,u=o.size,l=o.total,p=o.current,m=l/u+1===p,m&&0!==l?this.searchPage({current:p-1,size:u,total:l}):this.pagination={current:p,size:u,total:l},this.pagedTable=s.map(a),this.isLoadTable=!1,e.abrupt("return",c.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",r=s[a];this.$confirm("此操作将".concat(r,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?n.$message({type:"success",message:"".concat(r,"成功!")}):n.$message({type:"info",message:"".concat(r,"失败，").concat(e.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,a,c,o=this,i=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=i.length>1&&void 0!==i[1]?i[1]:"delete",a=this.multipleSelection,c=s[n],void 0!==a&&0!==a.length){e.next=6;break}return this.$message("请先选择需要".concat(c,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(c,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(a);case 2:n=e.sent,r=n.data,r.data?(o.$message({type:"success",message:"".concat(c,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(c,"失败，").concat(r.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,n,a,c){var o=this;this.$confirm(a||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function a(){var r,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t(e);case 2:r=a.sent,i=r.data,i.data?o.$message({type:"success",message:c||"".concat(n,"成功!")}):o.$message({type:"info",message:"".concat(i.msg)}),o.loadPage();case 6:case"end":return a.stop()}}),a)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"84df":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("c1df"),r=n.n(a),c=function(){return r()().format("YYYY-MM-DD HH:mm:ss")}},c726:function(e,t,n){"use strict";n.d(t,"g",(function(){return i})),n.d(t,"e",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"f",(function(){return l})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return m})),n.d(t,"d",(function(){return f})),n.d(t,"h",(function(){return d}));var a=n("b5c6"),r="tmlms/crew",c="admin/region",o="admin/dict";function i(e){return Object(a["a"])({url:"".concat(c,"/getinfo/")+e,method:"get"})}function s(e){return Object(a["a"])({url:"".concat(o,"/type/")+e,method:"get"})}function u(e){return Object(a["a"])({url:"".concat(c,"/area"),method:"get",params:{parentCode:e}})}function l(e){return Object(a["a"])({url:"".concat(r,"/Page"),method:"get",params:e})}function p(e){return Object(a["a"])({url:"".concat(r,"/delete"),method:"post",params:{userId:e}})}function m(e){return Object(a["a"])({url:"".concat(r,"/create"),method:"post",data:e,params:{type:2}})}function f(e){return Object(a["a"])({url:"".concat(r,"/getCrewByUserId"),method:"get",params:{userId:e}})}function d(e){return Object(a["a"])({url:"".concat(r,"/edit"),method:"post",params:{type:2},data:e})}}}]);