(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-325817bf"],{"0f1e":function(e,t,r){"use strict";r.d(t,"k",(function(){return c})),r.d(t,"j",(function(){return s})),r.d(t,"m",(function(){return u})),r.d(t,"e",(function(){return l})),r.d(t,"a",(function(){return d})),r.d(t,"i",(function(){return p})),r.d(t,"l",(function(){return m})),r.d(t,"f",(function(){return f})),r.d(t,"h",(function(){return h})),r.d(t,"d",(function(){return g})),r.d(t,"g",(function(){return b})),r.d(t,"n",(function(){return w})),r.d(t,"c",(function(){return v})),r.d(t,"b",(function(){return y}));var n=r("b5c6"),a=r("2f9e"),i="tybhrms/resume",o="tmlms/shipownerRecruit";function c(e){return Object(n["a"])({url:"".concat(i,"/getPage"),method:"get",params:e})}function s(e){return Object(n["a"])({url:"".concat(i,"/getMyCerts"),method:"get",params:e})}function u(e,t){return Object(n["a"])({url:"".concat(i,"/review?status=").concat(e,"&resumeId=").concat(t),method:"post"})}function l(e){return Object(n["a"])({url:"".concat(i,"/delete/")+e,method:"post",data:e})}function d(e){return Object(n["a"])({url:"".concat(i,"/add"),method:"post",data:e})}function p(e){return Object(n["a"])({url:"".concat(i,"/")+e,method:"get",params:e})}function m(e,t){return Object(n["a"])({url:"".concat(i,"/update"),method:"put",params:{publish:t},data:e})}function f(e){return Object(a["a"])({url:"tybhrms/tybExcelExport/resume",data:e,title:"简历信息"})}function h(e){return Object(n["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function g(e){return Object(n["a"])({url:"".concat(o,"/delete/")+e,method:"post",data:e})}function b(e){return Object(n["a"])({url:"".concat(o,"/")+e,method:"get",dparamsata:e})}function w(e){return Object(n["a"])({url:"".concat(o,"/update"),method:"post",data:e})}function v(e){return Object(n["a"])({url:"".concat(o,"/create"),method:"post",data:e})}function y(e){return Object(n["a"])({url:"tybship/tybship/findmyship/"+e,method:"get"})}},"2f9e":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("ac6a"),r("28a5"),r("a481");var n=r("b5c6");function a(e){var t=e.url,r=e.method,a=void 0===r?"post":r,o=e.data,c=void 0===o?{}:o,s=e.title,u=void 0===s?"":s;return console.log(t),new Promise((function(e){return Object(n["a"])({url:t,method:a,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(t){i({title:u,response:t}).then((function(){e()}))}))}))}function i(e){var t=e.title,r=void 0===t?"":t,n=e.response,a=o(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=n.headers,i=new Blob([n.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,r);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=r?"".concat(r,".").concat(a.suffix):a.filename,document.body.appendChild(o),o.style.display="none",o.click()}e()}))}function o(e){var t={},r=e.split(";");return r.forEach((function(e){var r=e.replace(/^\s+|\s+$/g,""),n=r.split("=");n[1]?t[n[0]]=n[1]:t[n[0]]=n[0]})),t.suffix=t.filename.split(".")[1],t}},"502e":function(e,t,r){"use strict";r("8e6e"),r("ac6a"),r("456d");var n=r("ade3"),a=(r("96cf"),r("1da1")),i=r("51f4");function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){Object(n["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var n,a,i,o,s,u,l,d,p,m=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=m.length>2&&void 0!==m[2]?m[2]:function(e){return e},this.isLoadTable=!0,e.next=4,r(c(c({},this.pageOption),t));case 4:return a=e.sent,i=a.data,o=i.data,s=o.records,u=o.size,l=o.total,d=o.current,p=l/u+1===d,p&&0!==l?this.searchPage({current:d-1,size:u,total:l}):this.pagination={current:d,size:u,total:l},this.pagedTable=s.map(n),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",a=s[n];this.$confirm("此操作将".concat(a,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?r.$message({type:"success",message:"".concat(a,"成功!")}):r.$message({type:"info",message:"".concat(a,"失败，").concat(e.data.msg)}),r.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var r,n,i,o=this,c=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=c.length>1&&void 0!==c[1]?c[1]:"delete",n=this.multipleSelection,i=s[r],void 0!==n&&0!==n.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(n);case 2:r=e.sent,a=r.data,a.data?(o.$message({type:"success",message:"".concat(i,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(i,"失败，").concat(a.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,r,n,i){var o=this;this.$confirm(n||"是否".concat(r),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function n(){var a,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t(e);case 2:a=n.sent,c=a.data,c.data?o.$message({type:"success",message:i||"".concat(r,"成功!")}):o.$message({type:"info",message:"".concat(c.msg)}),o.loadPage();case 6:case"end":return n.stop()}}),n)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(r)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"9b20":function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return a})),r.d(t,"e",(function(){return s})),r.d(t,"g",(function(){return l})),r.d(t,"c",(function(){return o})),r.d(t,"f",(function(){return m})),r.d(t,"d",(function(){return d}));var n=r("0e0b"),a={resumeStatus:{0:"待审核",1:"正常",2:"不通过"},isPublic:{0:"不公开",1:"公开"},isRcmd:{0:"不推荐",1:"推荐"}},i=[{prop:"resumeId",label:"编号"},{prop:"realName",label:"姓名"},{prop:"job",label:"应聘职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"updateTime",label:"更新时间"},{prop:"resumeStatus",label:"简历状态",type:"dict"}],o=function(e){var t=Object(n["g"])(c(),e);return t},c=function(){return{resumeId:"",realName:"",birthday:"",province:"",city:"",contactPhone:"",education:"",expectSalary:"",foreignLanguage:"",height:"",isPublic:"",postion:"",job:"",seniority:"",skill:"",workRequire:"",workDetail:"",workExprience:""}},s=function(){return{realName:"",resumeId:"",startdate:"",resumeCrestartdate:"",resumeCreenddate:""}},u=function(){return{realName:"",resumeId:"",startdate:"",resumeCrestartdate:"",resumeCreenddate:""}},l=function(e){var t=Object(n["g"])(u(),e);return t.realName=e.realName?e.realName:null,t},d=function(){return{resumeId:"",realName:"",birthday:"",province:"",city:"",contactPhone:"",education:"",expectSalary:"",foreignLanguage:"",height:"",isPublic:"",postion:"",job:"",seniority:"",skill:"",workRequire:"",workDetail:"",workExprience:""}},p=function(e,t,r){if(""!==t){var n=/(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/;n.test(t)||r(new Error("请输入11位的手机号码"))}r()},m={realName:[{required:!0,message:"请填姓名",trigger:"blur"},{min:2,max:4,message:"长度在 2 到 4 个字符",trigger:"blur"}],birthday:[{required:!0,message:"请填出生日期",trigger:"blur"}],province:[{required:!0,message:"请填省",trigger:"blur"}],city:[{required:!0,message:"请填市",trigger:"blur"}],contactPhone:[{required:!0,message:"请填联系电话",trigger:"blur"},{validator:p,trigger:"blur"}],education:[{required:!0,message:"请填教育程度",trigger:"blur"}],expectSalary:[{required:!0,message:"请填期望月薪",trigger:"blur"},{max:10,message:"不得超过10位数",trigger:"blur"}],foreignLanguage:[{required:!0,message:"请填外语水平",trigger:"blur"}],height:[{required:!0,message:"请填身高",trigger:"blur"},{max:3,message:"不得超过4位数",trigger:"blur"}],isPublic:[{required:!0,message:"请填是否公开",trigger:"blur"}],postion:[{required:!0,message:"请填原任职务",trigger:"blur"}],job:[{required:!0,message:"请填应聘职位",trigger:"blur"}],skill:[{required:!0,message:"请填特殊技能",trigger:"blur"},{max:25,message:"长度在 0 到 25 个字符",trigger:"blur"}],workRequire:[{required:!0,message:"请填作业要求",trigger:"blur"}],workExprience:[{required:!0,message:"请填工作经验",trigger:"blur"}]}},b652:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{attrs:{model:e.form,"label-width":"120px",size:"mini"}},[r("el-form-item",{attrs:{label:"姓名："}},[r("el-input",{model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1),r("el-form-item",{attrs:{label:"简历编号："}},[r("el-input",{model:{value:e.form.resumeId,callback:function(t){e.$set(e.form,"resumeId",t)},expression:"form.resumeId"}})],1),r("el-form-item",{attrs:{label:"简历发布时间："}},[r("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.form.startdate,callback:function(t){e.$set(e.form,"startdate",t)},expression:"form.startdate"}})],1),r("el-form-item",[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:e.searchPage}},[e._v("搜索")]),r("iep-button",{on:{click:e.clearSearchParam}},[e._v("清空")])],1)],1)],1)},a=[],i=r("9b20"),o={data:function(){return{dictsMap:i["b"],form:Object(i["e"])(),pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-6048e5),e.$emit("pick",[r,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-2592e6),e.$emit("pick",[r,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-7776e6),e.$emit("pick",[r,t])}}]}}},methods:{searchPage:function(){this.form.startdate&&(this.form.resumeCrestartdate=this.form.startdate[0],this.form.resumeCreenddate=this.form.startdate[1]),this.$emit("search-page",Object(i["g"])(this.form))},clearSearchParam:function(){this.form=Object(i["e"])()}},watch:{"form.startdate":function(e){console.log(e)}}},c=o,s=r("2877"),u=Object(s["a"])(c,n,a,!1,null,null,null);t["default"]=u.exports},d808:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("basic-container",[r("page-header",{attrs:{title:"求职简历"}}),r("operation-container",[r("template",{slot:"left"},[r("iep-button",{attrs:{type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return e.handleAdd()}}},[e._v("新增")]),r("iep-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.handleExport()}}},[e._v("导出")])],1),r("template",{slot:"right"},[r("operation-search",{attrs:{"advance-search":"",prop:e.searchData},on:{"search-page":e.searchPage}},[r("advance-search",{on:{"search-page":e.searchPage}})],1)],1)],2),r("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,dictsMap:e.dictsMap,columnsMap:e.columnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[e.manager?r("el-table-column",{attrs:{prop:"status",label:"审核操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(r){return e.getStatus(t.row.swith,t.row.resumeId)}},model:{value:t.row.swith,callback:function(r){e.$set(t.row,"swith",r)},expression:"scope.row.swith"}})],1)]}}],null,!1,605836754)}):e._e(),r("el-table-column",{attrs:{prop:"operation",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("operation-wrapper",[r("iep-button",{attrs:{type:"warning",plain:""},on:{click:function(r){return e.handleEdit(t.row)}}},[e._v("编辑")]),r("iep-button",{on:{click:function(r){return e.handleDetail(t.row)}}},[e._v("查看")]),r("iep-button",{attrs:{type:"default"},on:{click:function(r){return e.handleDelete(t.row)}}},[r("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1)],1)],1)},a=[],i=(r("ac6a"),r("6762"),r("2fdb"),r("96cf"),r("1da1")),o=r("0f1e"),c=r("b652"),s=r("7ded"),u=r("502e"),l=r("9b20"),d={components:{AdvanceSearch:c["default"]},mixins:[u["a"]],data:function(){return{dictsMap:l["b"],columnsMap:l["a"],searchData:"realName",userData:{roles:[]},pagedTable:[],manager:!0,ids:[],roleDate:[]}},created:function(){this.loadPage(),this.getIds()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleDelete:function(e){this._handleGlobalDeleteById(e.resumeId,o["e"])},handleAdd:function(){this.$router.push({path:"/hrms_spa/resume_post/0"})},handleEdit:function(e){this.$router.push({path:"/hrms_spa/resume_post/".concat(e.resumeId)})},handleDetail:function(e){this.$emit("onDetail",e)},getStatus:function(e,t){var r=this,n="";n=e?1:2,Object(o["m"])(n,t).then((function(e){r.$message({type:"success",message:e.data.msg}),r.loadPage()}))},handleExport:function(){var e=this;Object(o["f"])(this.ids).catch((function(t){e.$message({type:"warning",message:t})}))},getIds:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["c"])().then((function(e){return e.data.data.roles}));case 2:this.roleDate=e.sent,this.roleDate.includes(111)||this.roleDate.includes(1)?Object(o["k"])().then((function(e){t.ids=e.data.data.records.map((function(e){return e.resumeId}))})):Object(o["j"])().then((function(e){t.ids=e.data.data.records.map((function(e){return e.resumeId}))}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),loadPage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,r,n,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:this.searchForm,e.next=3,Object(s["c"])().then((function(e){return e.data.data}));case 3:if(this.userData=e.sent,-1!==this.userData.roles.indexOf(111)||-1!==this.userData.roles.indexOf(1)){e.next=13;break}return e.next=7,this.loadTable(t,o["j"]);case 7:r=e.sent,this.pagedTable=r.records,this.manager=!1,"姓名"===l["a"][0].label&&l["a"].splice(0,1),e.next=19;break;case 13:return e.next=15,this.loadTable(t,o["k"]);case 15:n=e.sent,this.pagedTable=n.records,this.manager=!0,this.pagedTable.forEach((function(e){1===e.resumeStatus?e.swith=!0:e.swith=!1}));case 19:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},watch:{pagedTable:function(e){this.ids=e.map((function(e){return e.resumeId}))}}},p=d,m=r("2877"),f=Object(m["a"])(p,n,a,!1,null,null,null);t["default"]=f.exports}}]);