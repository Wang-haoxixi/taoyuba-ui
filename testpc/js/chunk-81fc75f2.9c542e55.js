(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-81fc75f2"],{"1cf0":function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return u}));var r=n("b5c6"),a="/tybship/tybshipmanager";function i(e){return Object(r["a"])({url:"/tmlms/tybshiphaver/otherpage",method:"get",params:e})}function o(e,t){return Object(r["a"])({url:"/tmlms/tybshiphaver/getShiphaver?shipName=".concat(e,"&bindType=").concat(t),method:"get"})}function c(e){return Object(r["a"])({url:"".concat(a,"/save"),method:"post",data:e})}function s(e){return Object(r["a"])({url:"".concat(a,"/update"),method:"post",data:e})}function u(e){return Object(r["a"])({url:"".concat(a,"/del/").concat(e),method:"post"})}},2408:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"渔船经营人"}}),n("operation-container",[n("template",{slot:"left"}),n("template",{slot:"right"},[n("el-button",{on:{click:e.backPage}},[e._v("返回")])],1)],2),n("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.operatColumnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"shipNo",label:"渔船编号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e.getShipNo(t.row.shipName))+"\n        ")]}}])}),n("el-table-column",{attrs:{prop:"phone",label:"联系电话"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e.getPhone(t.row.idcard))+"\n        ")]}}])}),n("el-table-column",{attrs:{prop:"operation",label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("operation-wrapper",[n("iep-button",{attrs:{size:"mini",plain:""},on:{click:function(n){return e.handleView(t.row.shipName)}}},[e._v("查看")])],1)]}}])})],1)],1)],1)},a=[],i=(n("96cf"),n("1da1")),o=n("1cf0"),c=n("6c21"),s=n("502e"),u=n("8b00"),l=n("7ded"),p={mixins:[s["a"]],data:function(){return{operatColumnsMap:u["i"],searchData:"contactName",manager:!1,userData:{},phone:""}},created:function(){this.loadPage(),this.isManager()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleAdd:function(e){this.$router.push({path:"/hrms_spa/shipOperat_Detial/".concat(e),query:{add:e}})},handleEdit:function(e){this.$router.push({path:"/hrms_spa/shipOperat_Detial/".concat(e),query:{edit:e}})},handleDelete:function(e){this._handleGlobalDeleteById(e,o["b"])},handleView:function(e){var t=this.$route.query.shipNo;this.$router.push({path:"/hrms_spa/shipOperat_Detial/".concat(e),query:{see:t}})},getPhone:function(e){var t=this;return Object(c["h"])(e).then((function(e){e.data.data?t.phone=e.data.data.phone:t.phone="暂无"})),this.phone},getShipNo:function(){return this.$route.query.shipNo},loadPage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:this.searchForm,t.shipId=this.$route.params.shipId,e.next=4,this.loadTable(t,o["d"]);case 4:n=e.sent,this.pagedTable=n.records;case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),backPage:function(){this.$router.push({path:"/hrms_spa/shipCrew_list"})},isManager:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(l["c"])().then((function(e){return e.data.data}));case 2:this.userData=e.sent,-1===this.userData.roles.indexOf(111)&&-1===this.userData.roles.indexOf(1)||(this.manager=!0);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},d=p,h=n("2877"),m=Object(h["a"])(d,r,a,!1,null,null,null);t["default"]=m.exports},"2f9e":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("ac6a"),n("28a5"),n("a481");var r=n("b5c6");function a(e){var t=e.url,n=e.method,a=void 0===n?"post":n,o=e.data,c=void 0===o?{}:o,s=e.title,u=void 0===s?"":s;return console.log(t),new Promise((function(e){return Object(r["a"])({url:t,method:a,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(t){i({title:u,response:t}).then((function(){e()}))}))}))}function i(e){var t=e.title,n=void 0===t?"":t,r=e.response,a=o(r.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=r.headers,i=new Blob([r.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,n);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=n?"".concat(n,".").concat(a.suffix):a.filename,document.body.appendChild(o),o.style.display="none",o.click()}e()}))}function o(e){var t={},n=e.split(";");return n.forEach((function(e){var n=e.replace(/^\s+|\s+$/g,""),r=n.split("=");r[1]?t[r[0]]=r[1]:t[r[0]]=r[0]})),t.suffix=t.filename.split(".")[1],t}},"502e":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var r=n("ade3"),a=(n("96cf"),n("1da1")),i=n("51f4");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){Object(r["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,i,o,s,u,l,p,d,h=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=h.length>2&&void 0!==h[2]?h[2]:function(e){return e},this.isLoadTable=!0,e.next=4,n(c(c({},this.pageOption),t));case 4:return a=e.sent,i=a.data,o=i.data,s=o.records,u=o.size,l=o.total,p=o.current,d=l/u+1===p,d&&0!==l?this.searchPage({current:p-1,size:u,total:l}):this.pagination={current:p,size:u,total:l},this.pagedTable=s.map(r),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",a=s[r];this.$confirm("此操作将".concat(a,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?n.$message({type:"success",message:"".concat(a,"成功!")}):n.$message({type:"info",message:"".concat(a,"失败，").concat(e.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,r,i,o=this,c=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:"delete",r=this.multipleSelection,i=s[n],void 0!==r&&0!==r.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(r);case 2:n=e.sent,a=n.data,a.data?(o.$message({type:"success",message:"".concat(i,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(i,"失败，").concat(a.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,n,r,i){var o=this;this.$confirm(r||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function r(){var a,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t(e);case 2:a=r.sent,c=a.data,c.data?o.$message({type:"success",message:i||"".concat(n,"成功!")}):o.$message({type:"info",message:"".concat(c.msg)}),o.loadPage();case 6:case"end":return r.stop()}}),r)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"6c21":function(e,t,n){"use strict";n.d(t,"g",(function(){return o})),n.d(t,"j",(function(){return c})),n.d(t,"a",(function(){return s})),n.d(t,"h",(function(){return u})),n.d(t,"d",(function(){return l})),n.d(t,"b",(function(){return p})),n.d(t,"e",(function(){return d})),n.d(t,"k",(function(){return h})),n.d(t,"l",(function(){return m})),n.d(t,"f",(function(){return f})),n.d(t,"i",(function(){return g})),n.d(t,"c",(function(){return b}));var r=n("b5c6"),a=n("2f9e"),i="/tmlms/ship_owner";function o(e){return Object(r["a"])({url:"".concat(i,"/page"),method:"get",params:e})}function c(e,t){return Object(r["a"])({url:"".concat(i,"/create?type=").concat(t),method:"post",data:e})}function s(e){return Object(r["a"])({url:"".concat(i,"/delete?idcard=").concat(e),method:"post"})}function u(e){return Object(r["a"])({url:"".concat(i,"/getDetail?idcard=").concat(e),method:"get"})}function l(e){return Object(r["a"])({url:"admin/region/wholeInfoList?areaCode=".concat(e),method:"get"})}function p(e,t){return Object(r["a"])({url:"".concat(i,"/edit?type=").concat(t),method:"post",data:e})}function d(e){return Object(r["a"])({url:"admin/region/wholeInfo?areaCode=".concat(e),method:"get"})}function h(e,t){return Object(r["a"])({url:"".concat(i,"/newReview?status=").concat(e,"&idcard=").concat(t),method:"post"})}function m(e){return Object(r["a"])({url:"admin/file/upload/avatar",method:"post",data:e})}function f(e){return Object(r["a"])({url:"".concat(i,"/idcardcheck"),method:"get",params:{idcard:e}})}function g(e,t){return Object(r["a"])({url:"".concat(i,"/newedit?type=").concat(t),method:"post",data:e})}function b(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downloadOwner",data:e,title:"船东信息"})}},"8b00":function(e,t,n){"use strict";n.d(t,"f",(function(){return c})),n.d(t,"d",(function(){return a})),n.d(t,"j",(function(){return g})),n.d(t,"g",(function(){return h})),n.d(t,"h",(function(){return b})),n.d(t,"m",(function(){return v})),n.d(t,"e",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"i",(function(){return u})),n.d(t,"l",(function(){return s})),n.d(t,"k",(function(){return l})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return d}));n("3b2b");var r=n("0e0b"),a=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"shipowner",label:"持证人"},{prop:"shipownerIdcard",label:"持证人身份证"},{prop:"hullLength",label:"船长(m)"}],i=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证号码"},{prop:"phone",label:"联系电话"},{prop:"positionId",label:"现任职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"workStatus",label:"用工状态"}],o=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证号码"},{prop:"workStatus",label:"用工状态"},{prop:"phone",label:"手机号码"},{prop:"certName",label:"职务证书"},{prop:"flag",label:"来源"},{prop:"provinceIdName",label:"籍贯"},{prop:"signStatus",label:"是否培训",type:"dict"}],c={signStatus:{0:"否",1:"是"}},s=[{prop:"employeeName",label:"姓名"},{prop:"employeeIdcard",label:"身份证号码"},{prop:"employeePhone",label:"联系电话"},{prop:"employeePosition",label:"职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"provinceIdName",label:"籍贯"}],u=[{prop:"shipName",label:"船名号"},{prop:"realname",label:"姓名"}],l=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证"},{prop:"positionId",label:"职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"phone",label:"电话"},{prop:"address",label:"地址"}],p=[{prop:"realName",label:"姓名",width:"180"},{prop:"idcard",label:"身份证",width:"230"},{prop:"certNames",label:"职务证书"},{prop:"shipNames",label:"已登记的渔船"},{prop:"leftTime",label:"最近上船时间",width:"210"}],d=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证"},{prop:"shipId",label:"船名"},{prop:"flag",label:"上下船类型"},{prop:"sourceType",label:"来源"},{prop:"leftTime",label:"最近上船时间"}],h=function(){return{activityType:"",address:"",buildDate:"",createTime:"",dualPower:"",engineTotalPower:"",fishType:"",fishingGear:"",grossTonnage:"",hullLength:"",hullMaterial:"",licensesFishingExpireDate:"",licensesInspectionExpireDate:"",licensesNationalExpireDate:"",licensesOwnerExpireDate:"",licensesDateExpire:"",licensesDateIssue:"",licensesFishingNo:"",licensesInspectionNo:"",licensesNationalNo:"",licensesOwnerShip:"",mainEngineModel:"",mainEnginePower:"",mobile:"",mouldedBreadth:"",mouldedDepth:"",netTonnage:"",portRegister:"",shipId:"",shipName:"",shipNo:"",shipShare:"",shipowner:"",shipownerIdcard:"",updateTime:"",userId:"",workMode:"",workMode2:"",zipcode:"",regionId:""}};function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=new RegExp("^\\d{0,"+t+"}$");if(0===n)return r.test(e);var a=new RegExp("^\\d{0,"+t+"}\\.\\d{0,"+n+"}$");return r.test(e)||a.test(e)}function f(e,t,n){""===t?n(new Error):m(t,e.length,e.decimal)?n():n(new Error)}var g={regionId:[{required:!0,message:"该选项必填！",trigger:"blur"}],address:[{required:!0,message:"该选项必填！",trigger:"blur"}],createTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesFishingNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesOwnerShip:[{required:!0,message:"该选项必填！",trigger:"blur"}],mobile:[{required:!0,validator:f,trigger:"blur",length:11,decimal:0,message:"请输入正确的手机号码！"}],shipId:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipName:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipShare:[{required:!0,message:"该选项必填！",trigger:"change"}],shipowner:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipownerIdcard:[{required:!0,trigger:"blur",max:18,min:18,decimal:0,message:"请输入正确的身份证/企业代码！"}],updateTime:[{required:!0,message:"该选项必填！",trigger:"blur"}]},b=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},w=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},v=function(e){var t=Object(r["g"])(w(),e);return t.shipName=e.shipName?e.shipName:null,t.shipNo=e.shipNo?e.shipNo:null,t.shipowner=e.shipowner?e.shipowner:null,t.shipownerIdcard=e.shipownerIdcard?e.shipownerIdcard:null,t}}}]);