(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b471e9b2"],{"266e":function(e,t,n){"use strict";n.d(t,"g",(function(){return o})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"h",(function(){return u})),n.d(t,"a",(function(){return s})),n.d(t,"n",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"m",(function(){return p})),n.d(t,"b",(function(){return m})),n.d(t,"j",(function(){return h})),n.d(t,"c",(function(){return f})),n.d(t,"i",(function(){return b})),n.d(t,"l",(function(){return g})),n.d(t,"k",(function(){return w})),n.d(t,"o",(function(){return O})),n.d(t,"p",(function(){return y}));var r=n("b5c6"),a="/tmlms/tybcontract";function o(e){return Object(r["a"])({url:"".concat(a,"/page"),method:"get",params:e})}function c(e){return Object(r["a"])({url:"".concat(a,"/del/").concat(e),method:"post"})}function i(e){return Object(r["a"])({url:"".concat(a,"/shipcrew/").concat(e),method:"get"})}function u(e){return Object(r["a"])({url:"/admin/dict/type/".concat(e),method:"get"})}function s(e){return Object(r["a"])({url:"".concat(a,"/save"),method:"post",data:e})}function l(e){return Object(r["a"])({url:"".concat(a,"/update"),method:"post",data:e})}function d(e){return Object(r["a"])({url:"".concat(a,"/").concat(e),method:"get"})}function p(e){return Object(r["a"])({url:"".concat(a,"/review"),method:"post",params:e})}function m(e){return Object(r["a"])({url:"".concat(a,"/cancel"),method:"post",data:e})}function h(e){return Object(r["a"])({url:"".concat(a,"/checkIdcard"),method:"get",params:{employeeIdcard:e}})}function f(e){return Object(r["a"])({url:"".concat(a,"/complant"),method:"post",params:e})}function b(e){return Object(r["a"])({url:"".concat(a,"/villagePage"),method:"get",params:e})}function g(e){return Object(r["a"])({url:"".concat(a,"/refuse"),method:"post",params:{contractId:e}})}function w(e,t){return Object(r["a"])({url:"".concat(a,"/recall"),method:"post",params:{contractId:e,status:t}})}function O(e,t){return Object(r["a"])({url:"".concat(a,"/updateImage"),method:"post",params:{contractId:e,contractImage:t}})}function y(e,t){return Object(r["a"])({url:"".concat(a,"/createImages"),method:"post",params:{contractId:e,addPhoto:t}})}},"2f9e":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("ac6a"),n("28a5"),n("a481");var r=n("b5c6");function a(e){var t=e.url,n=e.method,a=void 0===n?"post":n,c=e.data,i=void 0===c?{}:c,u=e.title,s=void 0===u?"":u;return console.log(t),new Promise((function(e){return Object(r["a"])({url:t,method:a,headers:{responseType:"arraybuffer"},data:i,responseType:"blob"}).then((function(t){o({title:s,response:t}).then((function(){e()}))}))}))}function o(e){var t=e.title,n=void 0===t?"":t,r=e.response,a=c(r.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=r.headers,o=new Blob([r.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,n);else{var c=document.createElement("a");c.href=window.URL.createObjectURL(o),c.download=n?"".concat(n,".").concat(a.suffix):a.filename,document.body.appendChild(c),c.style.display="none",c.click()}e()}))}function c(e){var t={},n=e.split(";");return n.forEach((function(e){var n=e.replace(/^\s+|\s+$/g,""),r=n.split("=");r[1]?t[r[0]]=r[1]:t[r[0]]=r[0]})),t.suffix=t.filename.split(".")[1],t}},"502e":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var r=n("ade3"),a=(n("96cf"),n("1da1")),o=n("51f4");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){Object(r["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(o["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,o,c,u,s,l,d,p,m=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=m.length>2&&void 0!==m[2]?m[2]:function(e){return e},this.isLoadTable=!0,e.next=4,n(i(i({},this.pageOption),t));case 4:return a=e.sent,o=a.data,c=o.data,u=c.records,s=c.size,l=c.total,d=c.current,p=l/s+1===d,p&&0!==l?this.searchPage({current:d-1,size:s,total:l}):this.pagination={current:d,size:s,total:l},this.pagedTable=u.map(r),this.isLoadTable=!1,e.abrupt("return",o.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",a=u[r];this.$confirm("此操作将".concat(a,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?n.$message({type:"success",message:"".concat(a,"成功!")}):n.$message({type:"info",message:"".concat(a,"失败，").concat(e.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,r,o,c=this,i=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=i.length>1&&void 0!==i[1]?i[1]:"delete",r=this.multipleSelection,o=u[n],void 0!==r&&0!==r.length){e.next=6;break}return this.$message("请先选择需要".concat(o,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(o,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(r);case 2:n=e.sent,a=n.data,a.data?(c.$message({type:"success",message:"".concat(o,"成功!")}),c.pageOption=c._pageOption()):c.$message({type:"info",message:"".concat(o,"失败，").concat(a.msg)}),c.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,n,r,o){var c=this;this.$confirm(r||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function r(){var a,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t(e);case 2:a=r.sent,i=a.data,i.data?c.$message({type:"success",message:o||"".concat(n,"成功!")}):c.$message({type:"info",message:"".concat(i.msg)}),c.loadPage();case 6:case"end":return r.stop()}}),r)})))).catch((function(e){c.$message({type:"info",message:"".concat(e,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"8b00":function(e,t,n){"use strict";n.d(t,"f",(function(){return i})),n.d(t,"d",(function(){return a})),n.d(t,"j",(function(){return b})),n.d(t,"g",(function(){return m})),n.d(t,"h",(function(){return g})),n.d(t,"m",(function(){return O})),n.d(t,"e",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"i",(function(){return s})),n.d(t,"l",(function(){return u})),n.d(t,"k",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return p}));n("3b2b");var r=n("0e0b"),a=[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"shipowner",label:"持证人"},{prop:"shipownerIdcard",label:"持证人身份证"},{prop:"hullLength",label:"船长(m)"}],o=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证号码"},{prop:"phone",label:"联系电话"},{prop:"positionId",label:"现任职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"workStatus",label:"用工状态"}],c=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证号码"},{prop:"workStatus",label:"用工状态"},{prop:"phone",label:"手机号码"},{prop:"certName",label:"职务证书"},{prop:"flag",label:"来源"},{prop:"provinceIdName",label:"籍贯"},{prop:"signStatus",label:"是否培训",type:"dict"}],i={signStatus:{0:"否",1:"是"}},u=[{prop:"employeeName",label:"姓名"},{prop:"employeeIdcard",label:"身份证号码"},{prop:"employeePhone",label:"联系电话"},{prop:"employeePosition",label:"职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"provinceIdName",label:"籍贯"}],s=[{prop:"shipName",label:"船名号"},{prop:"realname",label:"姓名"}],l=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证"},{prop:"positionId",label:"职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"phone",label:"电话"},{prop:"address",label:"地址"}],d=[{prop:"realName",label:"姓名",width:"180"},{prop:"idcard",label:"身份证",width:"230"},{prop:"certNames",label:"职务证书"},{prop:"shipNames",label:"已登记的渔船"},{prop:"leftTime",label:"最近上船时间",width:"210"}],p=[{prop:"realName",label:"姓名"},{prop:"idcard",label:"身份证"},{prop:"shipId",label:"船名"},{prop:"flag",label:"上下船类型"},{prop:"sourceType",label:"来源"},{prop:"leftTime",label:"最近上船时间"}],m=function(){return{activityType:"",address:"",buildDate:"",createTime:"",dualPower:"",engineTotalPower:"",fishType:"",fishingGear:"",grossTonnage:"",hullLength:"",hullMaterial:"",licensesFishingExpireDate:"",licensesInspectionExpireDate:"",licensesNationalExpireDate:"",licensesOwnerExpireDate:"",licensesDateExpire:"",licensesDateIssue:"",licensesFishingNo:"",licensesInspectionNo:"",licensesNationalNo:"",licensesOwnerShip:"",mainEngineModel:"",mainEnginePower:"",mobile:"",mouldedBreadth:"",mouldedDepth:"",netTonnage:"",portRegister:"",shipId:"",shipName:"",shipNo:"",shipShare:"",shipowner:"",shipownerIdcard:"",updateTime:"",userId:"",workMode:"",workMode2:"",zipcode:"",regionId:""}};function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=new RegExp("^\\d{0,"+t+"}$");if(0===n)return r.test(e);var a=new RegExp("^\\d{0,"+t+"}\\.\\d{0,"+n+"}$");return r.test(e)||a.test(e)}function f(e,t,n){""===t?n(new Error):h(t,e.length,e.decimal)?n():n(new Error)}var b={regionId:[{required:!0,message:"该选项必填！",trigger:"blur"}],address:[{required:!0,message:"该选项必填！",trigger:"blur"}],createTime:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesFishingNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],licensesOwnerShip:[{required:!0,message:"该选项必填！",trigger:"blur"}],mobile:[{required:!0,validator:f,trigger:"blur",length:11,decimal:0,message:"请输入正确的手机号码！"}],shipId:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipName:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipNo:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipShare:[{required:!0,message:"该选项必填！",trigger:"change"}],shipowner:[{required:!0,message:"该选项必填！",trigger:"blur"}],shipownerIdcard:[{required:!0,trigger:"blur",max:18,min:18,decimal:0,message:"请输入正确的身份证/企业代码！"}],updateTime:[{required:!0,message:"该选项必填！",trigger:"blur"}]},g=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},w=function(){return{shipName:"",shipNo:"",shipowner:"",shipownerIdcard:""}},O=function(e){var t=Object(r["g"])(w(),e);return t.shipName=e.shipName?e.shipName:null,t.shipNo=e.shipNo?e.shipNo:null,t.shipowner=e.shipowner?e.shipowner:null,t.shipownerIdcard=e.shipownerIdcard?e.shipownerIdcard:null,t}},"940a":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"渔船船员"}}),n("operation-container",[n("template",{slot:"left"},[n("iep-button",{attrs:{type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return e.getShipDetail(e.$route.params.shipNo)}}},[e._v("新增")])],1),n("template",{slot:"right"},[n("el-button",{on:{click:e.backPage}},[e._v("返回")])],1)],2),n("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.crewColumnsMap,pagedTable:e.pagedTable,emptyText:e.message,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"operation",label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("operation-wrapper",[n("iep-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleView(t.row.idcard)}}},[e._v("查看")]),"上船，已签合同"!=t.row.workStatus?n("iep-button",{attrs:{size:"mini",plain:""},on:{click:function(n){return e.handleEdit(t.row.idcard)}}},[e._v("编辑")]):e._e(),n("iep-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.handleCrew(t.row.idcard,t.row.workStatus)}}},[e._v("离船")])],1)]}}])}),n("el-table-column",{attrs:{prop:"particular",label:"详情",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return["上船，已签合同"==t.row.workStatus?n("operation-wrapper",[n("iep-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.handleProtocol(t.row.idcard)}}},[e._v("协议")]),n("iep-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.handleInsure(t.row.idcard)}}},[e._v("证书")])],1):e._e()]}}])})],1)],1),n("el-dialog",{attrs:{title:"船员离船原因",visible:e.dialogCrewVisible,width:"70%","append-to-body":""},on:{"update:visible":function(t){e.dialogCrewVisible=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,"label-width":"150px",rules:e.rules}},[n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"离船原因:",prop:"reason"}},[n("el-select",{attrs:{placeholder:"请选择",reasons:""},model:{value:e.form.reason,callback:function(t){e.$set(e.form,"reason",t)},expression:"form.reason"}},e._l(e.reasons,(function(e){return n("el-option",{key:e.index,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1)],1),n("div",{staticStyle:{"text-align":"center"}},[n("el-button",{on:{click:e.save}},[e._v("提交")]),n("el-button",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)},a=[],o=(n("6b54"),n("28a5"),n("96cf"),n("1da1")),c=n("f67c"),i=n("c533b"),u=n("266e"),s=n("502e"),l=n("8b00"),d=n("ade36"),p=n("7ded"),m=n("4151"),h=n.n(m),f={mixins:[s["a"]],data:function(){return{form:{idcard:"",workStatus:"",reason:""},reasons:[{label:"船员觉得开船时间太久",value:0},{label:"船员觉得工资太低",value:1},{label:"船员工作不认真",value:2}],crewColumnsMap:l["e"],searchData:"contactName",message:"此渔船暂无相关船员",manager:!1,shipId:"",userData:{},dialogCrewVisible:!1,workStatus:[{label:"未用工",value:0},{label:"上船，已签合同",value:1},{label:"离船，未解除合同 ",value:2},{label:"上船，未签合同",value:3},{label:"离船，未签合同",value:4}],rules:{reason:[{required:!0,message:"该选项必填！",trigger:"blur"}]},conCrew:[]}},created:function(){this.loadPage(),this.isManager()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},getShipDetail:function(e){var t=this;Object(d["u"])(e).then((function(e){var n=e.data;t.handleAdd(n.data.shipId)}))},handleAdd:function(e){this.$router.push({path:"/hrms_spa/shipCrew_Detial/".concat(e)})},handleEdit:function(e){this.$router.push({name:"detailBoatMan",query:{edit:e,shipCrew:!0}})},handleView:function(e){this.$router.push({name:"detailBoatMan",query:{see:e,shipCrew:!0}})},loadPage:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,n,r=this,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:this.searchForm,e.next=3,Object(d["u"])(this.$route.params.shipNo).then((function(e){var t=e.data;return t.data.shipId}));case 3:return t.shipId=e.sent,e.next=6,this.loadTable(t,c["c"]);case 6:n=e.sent,this.conCrew=n.records.filter((function(e){e.workStatus})),n.records.map((function(e){e.workStatus=h()(r.workStatus,"value")[e.workStatus].label})),this.pagedTable=n.records;case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleProtocol:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=window.location.href.split("/")[2],r="%7B%7D",e.next=4,Object(u["e"])(t).then((function(e){return e.data.data.contractId}));case 4:a=e.sent,this.$openPage("//".concat(n,"/api/tmlms/downLoad/intoContractHtml?contractId=").concat(a,"&dataMap=").concat(r),"url");case 6:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleInsure:function(e){console.log(e),this.$router.push({path:"/hrms_spa/shipCrew_Insure/".concat(e)})},handleCrew:function(e,t){var n=this;this.$confirm("您确定此船员离船?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){if(n.form.idcard=e.toString(),n.workStatus.map((function(e){if(e.label==t)switch(e.value){case 1:n.form.workStatus=2;break;case 3:n.form.workStatus=4;break}})),n.form){var r=n.form.idcard,a=n.form.workStatus;Object(i["b"])(n.form,r,a).then((function(){console.log(n.form),n.$message.success("船员已离船!"),n.$router.go(0)}))}})).catch((function(){}))},backPage:function(){this.$router.go(-1)},isManager:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(p["c"])().then((function(e){return e.data.data}));case 2:this.userData=e.sent,-1===this.userData.roles.indexOf(111)&&-1===this.userData.roles.indexOf(1)||(this.manager=!0);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),save:function(){var e=this;if(this.form){var t=this.form.idcard,n=this.form.workStatus;Object(i["b"])(this.form,t,n).then((function(){console.log(e.form),e.$message.success("船员已离船!"),e.$router.go(-1)}))}}}},b=f,g=n("2877"),w=Object(g["a"])(b,r,a,!1,null,null,null);t["default"]=w.exports},ade36:function(e,t,n){"use strict";n.d(t,"w",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"r",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"t",(function(){return l})),n.d(t,"v",(function(){return d})),n.d(t,"h",(function(){return p})),n.d(t,"J",(function(){return m})),n.d(t,"i",(function(){return h})),n.d(t,"s",(function(){return f})),n.d(t,"x",(function(){return b})),n.d(t,"y",(function(){return g})),n.d(t,"o",(function(){return w})),n.d(t,"u",(function(){return O})),n.d(t,"z",(function(){return y})),n.d(t,"k",(function(){return v})),n.d(t,"m",(function(){return j})),n.d(t,"l",(function(){return x})),n.d(t,"n",(function(){return I})),n.d(t,"j",(function(){return k})),n.d(t,"G",(function(){return N})),n.d(t,"H",(function(){return S})),n.d(t,"b",(function(){return _})),n.d(t,"D",(function(){return T})),n.d(t,"I",(function(){return P})),n.d(t,"C",(function(){return C})),n.d(t,"q",(function(){return E})),n.d(t,"A",(function(){return B})),n.d(t,"c",(function(){return R})),n.d(t,"B",(function(){return $})),n.d(t,"f",(function(){return D})),n.d(t,"g",(function(){return q})),n.d(t,"E",(function(){return z})),n.d(t,"a",(function(){return M})),n.d(t,"K",(function(){return L})),n.d(t,"p",(function(){return G})),n.d(t,"F",(function(){return F}));var r=n("b5c6"),a=n("2f9e"),o="/tybship/tybship";function c(e){return Object(r["a"])({url:"".concat(o,"/otherpage"),method:"get",params:e})}function i(e,t){return Object(r["a"])({url:"".concat(o,"/updateVillage?shipId=").concat(e,"&&villageId=").concat(t),method:"post"})}function u(){return Object(r["a"])({url:"/admin/org/page",method:"get"})}function s(e,t){return Object(r["a"])({url:"".concat(o,"/updateOrgId?shipId=").concat(e,"&&orgId=").concat(t),method:"post"})}function l(e){return Object(r["a"])({url:"".concat(o,"/").concat(e),method:"get",params:e})}function d(e){return Object(r["a"])({url:"".concat(o,"/").concat(e),method:"get"})}function p(e){return Object(r["a"])({url:"".concat(o,"/save"),method:"post",data:e})}function m(e){return Object(r["a"])({url:"".concat(o,"/update"),method:"post",data:e})}function h(e){return Object(r["a"])({url:"".concat(o,"/del/").concat(e),method:"post"})}function f(e){return Object(r["a"])({url:"".concat(o,"/mypage"),method:"get",params:e})}function b(e){return Object(r["a"])({url:"".concat(o,"/findship/").concat(e),method:"get"})}function g(e){return Object(r["a"])({url:"".concat(o,"/findshipWithOutOrg/").concat(e),method:"get"})}function w(e){return Object(r["a"])({url:"".concat(o,"/findmyship/").concat(e),method:"get"})}function O(e){return Object(r["a"])({url:"".concat(o,"/searchByshipNo"),method:"get",params:{shipNo:e}})}function y(e){return Object(r["a"])({url:"".concat(o,"/newpage"),method:"get",params:e})}function v(e){return Object(a["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:e,title:"渔船信息"})}function j(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:e,title:"开航登记表-"+e.shipName})}function x(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewRecord",data:e,title:"实名登记备案表-"+e.shipName})}function I(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:e,title:"船员登记表-"+e.shipName})}function k(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:e,title:e.shipName})}function N(e){return Object(r["a"])({url:"tmlms/tyb_order/page",method:"get",params:e})}function S(e){return Object(r["a"])({url:"tmlms/tyb_order/getById",method:"get",params:e})}function _(e){return Object(r["a"])({url:"tmlms/tyb_order/agree",method:"post",data:e})}function T(e){return Object(r["a"])({url:"tmlms/tyb_order/reject",method:"post",data:e})}function P(e){return Object(r["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:e})}function C(e){return Object(r["a"])({url:"/tmlms/tybPortRecord/lastRecord",method:"get",params:e})}function E(e){return Object(r["a"])({url:"/tmlms/tybPortRecord/getCrewByRecordId",method:"get",params:e})}function B(e){return Object(r["a"])({url:"/tybship/tybship/info/".concat(e),method:"get"})}function R(e){return Object(r["a"])({url:"/tmlms/crew_cert/certStandard/".concat(e),method:"get"})}function $(e){return Object(r["a"])({url:"/tmlms/investigationReport/pageByShipName?shipName=".concat(e),method:"get"})}function D(e){return Object(r["a"])({url:"/tmlms/crew/countContractByShipId?shipId=".concat(e),method:"get"})}function q(e){return Object(r["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:e})}function z(e){return Object(r["a"])({url:"/tmlms/tybTroubleshootReport/pageByShipNo",method:"get",params:e})}function M(e){return Object(r["a"])({url:"/tmlms/tyb_order/pageByShipName",method:"get",params:e})}function L(e){return Object(r["a"])({url:"/tmlms/verification/page",method:"get",params:e})}function G(e){return console.log(e),Object(r["a"])({url:"/tmlms/tyb_order/getById?id=".concat(e.id),method:"get"})}function F(e){return Object(r["a"])({url:"/tmlms/tybmlmsExcelExport/downVerification",method:"post",headers:{"Content-Type":"application/json"},responseType:"arraybuffer",data:e}).then((function(e){var t=new Blob([e.data],{type:"application/vnd.ms-excel"}),n=document.createElement("a");n.href=window.URL.createObjectURL(t),n.download="实船鉴证.xls",n.click()}))}},c533b:function(e,t,n){"use strict";n.d(t,"i",(function(){return i})),n.d(t,"f",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"g",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"a",(function(){return p})),n.d(t,"e",(function(){return m})),n.d(t,"j",(function(){return h})),n.d(t,"h",(function(){return f})),n.d(t,"b",(function(){return b}));var r=n("b5c6"),a="tmlms/crew",o="admin/region",c="admin/dict";function i(e){return Object(r["a"])({url:"".concat(o,"/getinfo/")+e,method:"get"})}function u(e){return Object(r["a"])({url:"".concat(c,"/type/")+e,method:"get"})}function s(e){return Object(r["a"])({url:"".concat(o,"/area"),method:"get",params:{parentCode:e}})}function l(e){return Object(r["a"])({url:"".concat(a,"/Page"),method:"get",params:e})}function d(e){return Object(r["a"])({url:"".concat(a,"/delete"),method:"post",params:{userId:e}})}function p(e){return Object(r["a"])({url:"".concat(a,"/create"),method:"post",data:e,params:{type:1}})}function m(e){return Object(r["a"])({url:"".concat(a,"/getCrewByUserId"),method:"get",params:{userId:e}})}function h(e){return Object(r["a"])({url:"".concat(a,"/edit"),method:"post",params:{type:1},data:e})}function f(e){return Object(r["a"])({url:"/tybship/tybregion/parent/".concat(e),method:"get"})}function b(e,t,n){return Object(r["a"])({url:"".concat(a,"/upWork?idcard=").concat(t,"&workStatus=").concat(n),method:"post",data:e})}},f67c:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return i}));var r=n("b5c6"),a="/tybship/tybshipcrew";function o(e){return Object(r["a"])({url:"".concat(a,"/page"),method:"get",params:e})}function c(e){return Object(r["a"])({url:"".concat(a,"/getByidcard/").concat(e),method:"get"})}function i(e){return Object(r["a"])({url:"".concat(a,"/").concat(e),method:"get"})}}}]);