(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f5010db"],{"056e":function(t,e,a){},"2f9e":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("ac6a"),a("28a5"),a("a481");var n=a("b5c6");function r(t){var e=t.url,a=t.method,r=void 0===a?"post":a,o=t.data,c=void 0===o?{}:o,s=t.title,u=void 0===s?"":s;return new Promise((function(t){return Object(n["a"])({url:e,method:r,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(e){i({title:u,response:e}).then((function(){t()}))}))}))}function i(t){var e=t.title,a=void 0===e?"":e,n=t.response,r=o(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(t){var e=n.headers,i=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,a);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=a?"".concat(a,".").concat(r.suffix):r.filename,document.body.appendChild(o),o.style.display="none",o.click()}t()}))}function o(t){var e={},a=t.split(";");return a.forEach((function(t){var a=t.replace(/^\s+|\s+$/g,""),n=a.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]})),e.suffix=e.filename.split(".")[1],e}},"40b8":function(t,e,a){"use strict";a("056e")},4917:function(t,e,a){"use strict";var n=a("cb7c"),r=a("9def"),i=a("0390"),o=a("5f1b");a("214f")("match",1,(function(t,e,a,c){return[function(a){var n=t(this),r=void 0==a?void 0:a[e];return void 0!==r?r.call(a,n):new RegExp(a)[e](String(n))},function(t){var e=c(a,t,this);if(e.done)return e.value;var s=n(t),u=String(this);if(!s.global)return o(s,u);var l=s.unicode;s.lastIndex=0;var d,p=[],h=0;while(null!==(d=o(s,u))){var f=String(d[0]);p[h]=f,""===f&&(s.lastIndex=i(u,r(s.lastIndex),l)),h++}return 0===h?null:p}]}))},5612:function(t,e,a){"use strict";a.d(e,"i",(function(){return o})),a.d(e,"j",(function(){return c})),a.d(e,"l",(function(){return s})),a.d(e,"m",(function(){return u})),a.d(e,"r",(function(){return l})),a.d(e,"c",(function(){return d})),a.d(e,"t",(function(){return p})),a.d(e,"u",(function(){return h})),a.d(e,"d",(function(){return f})),a.d(e,"e",(function(){return m})),a.d(e,"g",(function(){return g})),a.d(e,"v",(function(){return b})),a.d(e,"f",(function(){return v})),a.d(e,"z",(function(){return w})),a.d(e,"k",(function(){return y})),a.d(e,"n",(function(){return O})),a.d(e,"h",(function(){return k})),a.d(e,"p",(function(){return S})),a.d(e,"x",(function(){return j})),a.d(e,"y",(function(){return x})),a.d(e,"w",(function(){return I})),a.d(e,"b",(function(){return _})),a.d(e,"q",(function(){return D})),a.d(e,"a",(function(){return P})),a.d(e,"s",(function(){return C})),a.d(e,"o",(function(){return $}));var n=a("b5c6"),r=a("2f9e"),i="/tmlms/crew";function o(t){return Object(n["a"])({url:"".concat(i,"/Page"),method:"get",params:t})}function c(t){return Object(n["a"])({url:"".concat(i,"/findByShipId?shipId=").concat(t),method:"get",params:t})}function s(t){return Object(n["a"])({url:"".concat(i,"/getHistoryByShipId?shipId=").concat(t.shipId),method:"get",params:t})}function u(t){return Object(n["a"])({url:"".concat(i,"/pageWithShip"),method:"get",params:t})}function l(t){return Object(n["a"])({url:"".concat(i,"/shipLogPage"),method:"get",params:t})}function d(t){return Object(n["a"])({url:"".concat(i,"/checkMoreRelations"),method:"post",data:t})}function p(t,e){return Object(n["a"])({url:"".concat(i,"/create?type=").concat(e),method:"post",data:t})}function h(t,e){return Object(n["a"])({url:"".concat(i,"/batchCreate?type=").concat(e),method:"post",data:t,timeout:3e5})}function f(t){return Object(n["a"])({url:"".concat(i,"/delete?idcard=").concat(t),method:"post"})}function m(t,e){return Object(n["a"])({url:"".concat(i,"/deleteRelation?idcard=").concat(t,"&&shipId=").concat(e),method:"post"})}function g(t,e){return Object(n["a"])({url:"".concat(i,"/edit?type=").concat(e),method:"post",data:t})}function b(t,e){return Object(n["a"])({url:"".concat(i,"/review?status=").concat(t,"&userId=").concat(e),method:"post"})}function v(t){return Object(n["a"])({url:"".concat(i,"/getCrewByidcard?idcard=").concat(t),method:"get"})}function w(t){return Object(n["a"])({url:"admin/file/upload/avatar",method:"post",data:t})}function y(t){return Object(n["a"])({url:"".concat(i,"/idcardcheck?idcard=").concat(t),method:"get"})}function O(t){return Object(n["a"])({url:"".concat(i,"/idcardcheck?idcard=").concat(t),method:"get"})}function k(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"船员信息";return Object(r["a"])({url:"tmlms/tybmlmsExcelExport/downloadCrew",data:t,title:e})}function S(t){return Object(n["a"])({url:"".concat(i,"/badPage"),method:"get",params:t})}function j(t){return Object(n["a"])({url:"".concat(i,"/badUpdateBatch"),method:"post",data:t})}function x(t){return Object(n["a"])({url:"".concat(i,"/uploadBaseImage"),method:"post",data:t})}function I(t){return Object(n["a"])({url:"".concat(i,"/updateCertByIdcard"),method:"post",params:t})}function _(t){return Object(n["a"])({url:"".concat(i,"/changeShip"),method:"post",data:t})}function D(t){return Object(n["a"])({url:"".concat(i,"/getShipRelationByIdcard"),method:"get",params:t})}function P(t){return Object(n["a"])({url:"/tmlms/tybship/pageForChange",method:"get",params:t})}function C(t){return Object(n["a"])({url:"/tmlms/importTask/lookTask",method:"get",params:{taksId:t}})}function $(t){return Object(n["a"])({url:"/tmlms/crew_cert/newPage",method:"get",params:t})}},"6ada":function(t,e,a){"use strict";e["a"]={methods:{getQuery:function(){var t=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var e=JSON.parse(t);for(var a in this.params)e[a]&&(this.params[a]=e[a])}},setQuery:function(t){if(t){var e=sessionStorage.getItem("query");if(sessionStorage.getItem("query")){var a=JSON.parse(e);for(var n in t)a[n]=t[n];sessionStorage.setItem("query",JSON.stringify(a))}else sessionStorage.setItem("query",JSON.stringify(t))}else sessionStorage.setItem("query",JSON.stringify(this.params))}}}},ae20:function(t,e,a){},b461:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"change-man"},[a("el-dialog",{attrs:{title:"渔船变更",visible:t.dialogVisible,width:"70%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"ship-change"},[a("h3",[t._v("当前船员所在渔船")]),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,(function(t){return a("el-option",{key:t.shipId,attrs:{label:t.shipName,value:t.shipId}})})),1)],1),a("div",[a("h3",[t._v("请选择要登入的渔船")]),a("div",[a("span",{staticStyle:{width:"120px",display:"inline-block","margin-right":"20px"}},[a("el-input",{attrs:{placeholder:"渔船名",size:"small",clearable:""},model:{value:t.params.shipName,callback:function(e){t.$set(t.params,"shipName","string"===typeof e?e.trim():e)},expression:"params.shipName"}})],1),a("el-button",{attrs:{size:"small"},on:{click:function(e){return t.getData()}}},[t._v("搜索")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"shipName",label:"渔船名"}}),a("el-table-column",{attrs:{prop:"shipNo",label:"渔船编号"}}),a("el-table-column",{attrs:{prop:"shipowner",label:"持证人"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){return t.handleClick(e.row)}}},[t._v("选择")])]}}])})],1),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.page.total,"page-size":t.page.size,"current-page":t.page.current},on:{"update:currentPage":function(e){return t.$set(t.page,"current",e)},"update:current-page":function(e){return t.$set(t.page,"current",e)},"size-change":t.handleSizeChange,"current-change":t.currentChange}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1)])],1)},r=[],i=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),o=a("5612");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function s(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={mixins:[],data:function(){return{options:[],dialogVisible:!1,value:"",tableData:[],page:{total:0,size:10,current:1},idcard:"",params:{}}},methods:{getData:function(){var t=this;Object(o["a"])(s(s({},this.params),{},{current:this.page.current})).then((function(e){t.tableData=e.data.data.records,t.page=e.data.data}))},getOption:function(t){var e=this;this.idcard=t,Object(o["q"])({idcard:t}).then((function(t){e.options=t.data.data,0!==e.options.length&&(e.value=t.data.data[0].shipId)}))},handleSizeChange:function(t){this.page.size=t,this.page.current=1,this.getData()},currentChange:function(t){this.page.current=t,this.getData()},handleClick:function(t){var e=this;if(0!==this.options.length&&!this.value)return this.$message.warning("请先选择登出渔船!"),!1;this.$confirm("确认将此船员更改为".concat(t.shipName,"?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["b"])({shipId:e.value,changeShipId:t.shipId,idcard:e.idcard}).then((function(){e.$message.success("操作成功!"),e.dialogVisible=!1,e.$emit("back")}))}))}},computed:{},created:function(){this.getData()},filters:{}},l=u,d=(a("40b8"),a("2877")),p=Object(d["a"])(l,n,r,!1,null,"9e6b8296",null);e["default"]=p.exports},bf0a:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-box"},[a("basic-container",[a("div",{staticClass:"shipowner_title"},[t.manager?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addShipowner}},[t._v("新增")]):t._e(),t.manager?a("el-button",{attrs:{type:"default",size:"small"},on:{click:t.exportInfo}},[t._v("导出信息")]):t._e(),a("el-button",{attrs:{type:"default",size:"small"},on:{click:t.handleFresh}},[t._v("刷新")]),a("div",{staticStyle:{float:"right",display:"flex","align-items":"center"}},[a("span",{staticStyle:{width:"120px"}},[a("el-input",{attrs:{placeholder:"姓名",size:"small",clearable:""},model:{value:t.params.realName,callback:function(e){t.$set(t.params,"realName","string"===typeof e?e.trim():e)},expression:"params.realName"}})],1),a("span",{staticStyle:{width:"120px"}},[a("el-input",{attrs:{placeholder:"身份证",size:"small",clearable:""},model:{value:t.params.idcard,callback:function(e){t.$set(t.params,"idcard","string"===typeof e?e.trim():e)},expression:"params.idcard"}})],1),a("span",{staticStyle:{width:"120px"}},[a("el-input",{attrs:{placeholder:"联系电话",size:"small",clearable:""},model:{value:t.params.phone,callback:function(e){t.$set(t.params,"phone","string"===typeof e?e.trim():e)},expression:"params.phone"}})],1),a("span",{staticStyle:{width:"10s0px"}},[a("el-select",{attrs:{placeholder:"证书等级",size:"small",clearable:""},model:{value:t.params.certLevel,callback:function(e){t.$set(t.params,"certLevel",e)},expression:"params.certLevel"}},t._l(t.certGrade,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("span",{staticStyle:{width:"120px"}},[a("iep-dict-select",{attrs:{clearable:"",placeholder:"证书职位",size:"small","dict-name":"tyb_crew_cert_title"},model:{value:t.params.certTitle,callback:function(e){t.$set(t.params,"certTitle",e)},expression:"params.certTitle"}})],1),a("span",{staticStyle:{width:"120px"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"用工状态",size:"small",clearable:""},model:{value:t.params.workStatus,callback:function(e){t.$set(t.params,"workStatus",e)},expression:"params.workStatus"}},t._l(t.workStatus,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("span",{staticStyle:{width:"120px"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"户籍",size:"small",clearable:""},model:{value:t.params.provinceId,callback:function(e){t.$set(t.params,"provinceId",e)},expression:"params.provinceId"}},t._l(t.rogionList,(function(t){return a("el-option",{key:t.areaCode,attrs:{label:t.name,value:t.areaCode}})})),1)],1),a("el-button",{attrs:{size:"small"},on:{click:t.getParamData}},[t._v("搜索")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{"cell-style":t.tableCellStyle,data:t.shipownerList,stripe:""}},[a("el-table-column",{attrs:{prop:"realName",label:"姓名",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[""==e.row.idcard||""==e.row.phone||t.checIdCard(e.row.idcard)||t.checkPhone(e.row.phone)?a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[""==e.row.idcard||t.checIdCard(e.row.idcard)?a("p",[t._v("身份证缺失或有误")]):t._e(),""==e.row.phone||t.checkPhone(e.row.phone)?a("p",[t._v("联系方式缺失或有误")]):t._e(),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[t._v("\n                  "+t._s(e.row.realName?e.row.realName:"--")+"\n                ")])]):a("div",[t._v("\n                "+t._s(e.row.realName?e.row.realName:"--")+"\n              ")])]}}])}),t._l(t.options.columns,(function(e,n){return a("el-table-column",{key:n,attrs:{prop:e.value,label:e.text,width:e.css},scopedSlots:t._u([{key:"default",fn:function(n){return["dictGroup"===e.type?[a("div",[t._v(t._s(t.dictJS(e,n)))])]:"province"===e.type?[a("div",[t._v(t._s(t.provincesName(e,n)))])]:[a("iep-table-detail",{attrs:{value:n.row[e.value]}})]]}}],null,!0)})})),t.manager&&t.showSwith?a("el-table-column",{attrs:{prop:"status",label:"审核操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#F00",disabled:e.row.isDisabled},on:{change:function(a){return t.getStatus(e.row.swith,e.row.userId)}},model:{value:e.row.swith,callback:function(a){t.$set(e.row,"swith",a)},expression:"scope.row.swith"}})],1)]}}],null,!1,994230064)}):t._e(),a("el-table-column",{attrs:{label:"操作",width:"400",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleChange(e.row.idcard)}}},[t._v("变更\n              ")]),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleView(e.row.idcard)}}},[t._v("查看\n              ")]),t.manager?a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.row.idcard)}}},[t._v("编辑\n              ")]):t._e(),t.onlyManager?a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleDel(e.row.idcard)}}},[t._v("删除\n              ")]):t._e(),t.onlyManager?a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleUpdateCertificate(e.row.idcard)}}},[t._v("证书更新\n              ")]):t._e()]}}])})],2),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next, jumper",total:t.total,"page-size":t.params.size,"current-page":t.params.current},on:{"update:currentPage":function(e){return t.$set(t.params,"current",e)},"update:current-page":function(e){return t.$set(t.params,"current",e)},"current-change":t.currentChange}})],1)],1),a("el-dialog",{attrs:{title:"导出信息",visible:t.dialogVisible,width:"45%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"export-btn-wrapper"},[t._l(Math.ceil(t.total/3e3),(function(e,n){return[Math.ceil(t.total/3e3)>n+1?[a("el-button",{key:n,staticClass:"export-btn",on:{click:function(e){t.downloadInfo("船员信息第"+(3e3*n+1)+"条第至"+3e3*(n+1)+"条",n+1)}}},[t._v(t._s("导出信息第"+(3e3*n+1)+"条至第"+3e3*(n+1)+"条"))])]:[a("el-button",{key:n,staticClass:"export-btn",on:{click:function(e){t.downloadInfo("船员信息第"+(3e3*n+1)+"条第至"+t.total+"条",n+1)}}},[t._v(t._s("导出信息第"+(3e3*n+1)+"条至第"+t.total+"条"))])]]}))],2)]),a("change-man",{ref:"changeMan",on:{back:function(e){return t.getData()}}})],1)},r=[],i=(a("8e6e"),a("ade3")),o=(a("96cf"),a("1da1")),c=(a("a481"),a("28a5"),a("7f7f"),a("ac6a"),a("456d"),a("6b54"),a("4917"),a("5612")),s=a("7ded"),u=a("c533"),l=a("4151"),d=a.n(l),p=a("2f62"),h=a("6ada"),f=a("b461"),m=a("4360");function g(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function b(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?g(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var v={mixins:[h["a"]],components:{changeMan:f["default"]},data:function(){return{headers:{Authorization:"Bearer "+m["a"].getters.access_token},importA:"船员证书导入",dialogVisible:!1,rogionList:[],shipownerList:[],provinces:[],total:10,params:{current:1,size:10,idcard:"",realName:"",workStatus:"",phone:"",certLevel:"",certTitle:"",provinceId:""},exportParams:{idcard:"",realName:"",status:"",phone:"",remark:"",startDate:"",endDate:"",workStatus:"",provinceId:""},options:{expandAll:!1,columns:[{text:"身份证号码",value:"idcard"},{text:"年龄",value:"birthday",css:"100"},{text:"联系电话",value:"phone"},{text:"用工状态",value:"workStatus",css:"150"},{text:"当前职位",value:"positionId",dictName:"tyb_resume_position",type:"dictGroup",css:"150"},{text:"证书职位",value:"certTitle",dictName:"tyb_crew_cert_title",type:"dictGroup",css:"150"},{text:"证书日期",value:"certDateIssue",css:"150"},{text:"户籍",value:"provinceId",type:"province",css:"150"}]},workStatus:[{label:"待求职",value:9},{label:"未用工",value:0},{label:"上船，已签合同",value:1},{label:"上船，未签合同",value:3}],status:[{label:"审核中",value:1},{label:"审核通过",value:2},{label:"审核失败",value:3}],certGrade:[{label:"--",value:"0"},{label:"一级",value:"1"},{label:"二级",value:"2"},{label:"三级",value:"3"}],manager:!1,onlyManager:!1,showSwith:!1,userData:{roles:[]},loading:!1}},methods:{checkPhone:function(t){return!t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)},checIdCard:function(t){return!t.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)},tableCellStyle:function(t){var e=t.row,a=t.column;if("姓名"==a.label&&(""==e.idcard||""==e.phone||this.checIdCard(e.idcard)||this.checkPhone(e.phone)))return"color:red"},parseInt:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){var e=t.successCount+t.failCount;this.importA=parseInt(e/t.total*100)+"%"})),onBeforeUpload:function(t){var e=this;this.loading=!0,Object(c["s"])(t.data).then((function(t){var a=t.data;if(e.parseInt(a.data),1!=a.data.status)var n=e,r=setInterval((function(){var t=this,e={data:a.data.midId};Object(c["s"])(e.data).then((function(e){var a=e.data,i=a.data,o=i.successCount+i.failCount;n.importA=parseInt(o/i.total*100)+"%",console.log(t.importA),1==a.data.status&&(clearInterval(r),n.$refs.upload.clearFiles(),n.loading=!1,n.importA="船员证书导入")}))}),1e3)}))},handleUpdateCertificate:function(t){var e=this;this.$confirm("是否更新船员证书","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(c["w"])({idcard:t}).then((function(t){var a=t.data;0===a.code?e.$message({type:"success",message:a.data||"证书更新成功"}):e.$message({type:"warning",message:"证书更新失败"})}))}))},getRogionList:function(){var t=this;Object(u["h"])(0).then((function(e){var a=e.data;0===a.code&&(t.rogionList=a.data)}))},handleFresh:function(){this.getData(),this.isManager(),this.getProvince(),this.isAdminPath()},provincesName:function(t,e){if(!e.row[t.value])return"--";var a=d()(this.provinces,"value");return Object.keys(a).length?d()(this.provinces,"value")&&d()(this.provinces,"value")[e.row[t.value]]?d()(this.provinces,"value")[e.row[t.value]].label:void 0:"--"},dictJS:function(t,e){return e.row[t.value]?"0"===e.row[t.value]?"--":d()(this.dictGroup[t.dictName],"value")[e.row[t.value]].label:"--"},currentChange:function(t){this.params.current=t,this.setQuery({current:t}),this.getData()},addShipowner:function(){this.$router.push({name:"detailBoatMan"})},handleView:function(t){this.$router.push({name:"detailBoatMan",query:{see:t}})},handleEdit:function(t){this.$router.push({path:"/boatMan/detail",query:{edit:t}})},getProvince:function(){var t=this;Object(u["d"])(0).then((function(e){var a=e.data;t.provinces=a.data.map((function(t){return{label:t.name,value:t.areaCode}}))}))},getData:function(){var t=this;Object(c["i"])(this.params).then((function(e){t.shipownerList=e.data.data.records,t.shipownerList.map((function(t){t.remark.length>19&&(t.remark=t.remark.substring(0,20)+"....");var e=new Date,a=e.getFullYear();t.birthday=a-t.birthday.substring(0,4)})),t.shipownerList.forEach((function(e){2===e.status&&0!==e.userId?e.swith=!0:e.swith=!1,t.workStatus.map((function(t){t.value==e.workStatus&&(e.workStatus=t.label)})),0==e.salary&&(e.salary="面议"),e.certList&&e.certList.forEach((function(t){t.certTitle==e.certTitle&&(e.certDateIssue=t.certDateIssue.split(" ")[0])}))})),t.shipownerList.forEach((function(t){!1===t.swith&&0===t.userId?t.isDisabled=!0:t.isDisabled=!1})),t.total=e.data.data.total}))},getParamData:function(){this.params.realName=(this.params.realName||"").replace(/\s*/g,""),this.params.idcard=(this.params.idcard||"").replace(/\s*/g,""),this.params.phone=(this.params.phone||"").replace(/\s*/g,""),this.params.current=1,this.getData()},handleDel:function(t){var e=this;this.$confirm("此操作将永久删除该船员, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(c["d"])(t).then((function(t){e.$message({type:"success",message:t.data.msg}),e.getData()})).catch((function(t){e.$message.error(t.data.msg)}))})).catch((function(){}))},getStatus:function(t,e){var a=this,n="";n=t?2:3,Object(c["v"])(n,e).then((function(t){a.$message({type:"success",message:t.data.msg}),a.getData()}))},isManager:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["c"])().then((function(t){return t.data.data}));case 2:this.userData=t.sent,-1===this.userData.roles.indexOf(111)&&-1===this.userData.roles.indexOf(1)&&-1===this.userData.roles.indexOf(112)&&-1===this.userData.roles.indexOf(109)||(this.manager=!0),-1===this.userData.roles.indexOf(111)&&-1===this.userData.roles.indexOf(1)||(this.onlyManager=!0);case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),isAdminPath:function(){1==this.$route.path.indexOf("admin")?this.showSwith=!0:this.showSwith=!1},downloadInfo:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=Object.assign({},this.params);console.log(),Math.ceil(this.total/3e3)>1&&(n.nowPage=a),Object(c["h"])(n,e).catch((function(e){t.$message({type:"warning",message:e})}))},exportInfo:function(){1===Math.ceil(this.total/3e3)?this.downloadInfo("船员信息"):this.dialogVisible=!0},handleChange:function(t){this.$refs.changeMan.dialogVisible=!0,this.$refs.changeMan.getOption(t)}},computed:b({},Object(p["c"])(["dictGroup"])),created:function(){if(sessionStorage.getItem("query")){var t=sessionStorage.getItem("query");this.params=JSON.parse(t),this.params.realName=this.$route.query.realName}else this.params={current:1,size:10,idcard:"",realName:"",workStatus:"",phone:"",certLevel:"",certTitle:""},this.params.realName=this.$route.query.realName;this.getData(),this.isManager(),this.getProvince(),this.isAdminPath(),this.getRogionList()},filters:{typeFilter:function(t){var e={1:"审核中",2:"审核通过",3:"审核失败"};return e[t]}},watch:{"params.idcard":function(t){this.exportParams.idcard=t},"params.realName":function(t){this.exportParams.realName=t},"params.phone":function(t){this.exportParams.phone=t},"params.remark":function(t){this.exportParams.remark=t},"params.workStatus":function(t){this.exportParams.workStatus=t},"params.provinceId":function(t){this.exportParams.provinceId=t},params:function(){sessionStorage.setItem("query",JSON.stringify(this.params))}},beforeUpdate:function(){sessionStorage.setItem("query",JSON.stringify(this.params))},beforeRouteLeave:function(t,e,a){"/boatMan/detail"!==t.path&&sessionStorage.removeItem("query"),a()}},w=v,y=(a("ef5b"),a("2877")),O=Object(y["a"])(w,n,r,!1,null,"17938f96",null);e["default"]=O.exports},c533:function(t,e,a){"use strict";a.d(e,"i",(function(){return c})),a.d(e,"f",(function(){return s})),a.d(e,"d",(function(){return u})),a.d(e,"g",(function(){return l})),a.d(e,"c",(function(){return d})),a.d(e,"a",(function(){return p})),a.d(e,"e",(function(){return h})),a.d(e,"j",(function(){return f})),a.d(e,"h",(function(){return m})),a.d(e,"b",(function(){return g}));var n=a("b5c6"),r="tmlms/crew",i="admin/region",o="admin/dict";function c(t){return Object(n["a"])({url:"".concat(i,"/getinfo/")+t,method:"get"})}function s(t){return Object(n["a"])({url:"".concat(o,"/type/")+t,method:"get"})}function u(t){return Object(n["a"])({url:"".concat(i,"/area"),method:"get",params:{parentCode:t}})}function l(t){return Object(n["a"])({url:"".concat(r,"/Page"),method:"get",params:t})}function d(t){return Object(n["a"])({url:"".concat(r,"/delete"),method:"post",params:{userId:t}})}function p(t){return Object(n["a"])({url:"".concat(r,"/create"),method:"post",data:t,params:{type:1}})}function h(t){return Object(n["a"])({url:"".concat(r,"/getCrewByUserId"),method:"get",params:{userId:t}})}function f(t){return Object(n["a"])({url:"".concat(r,"/edit"),method:"post",params:{type:1},data:t})}function m(t){return Object(n["a"])({url:"/tybship/tybregion/parent/".concat(t),method:"get"})}function g(t,e,a){return Object(n["a"])({url:"".concat(r,"/upWork?idcard=").concat(e,"&workStatus=").concat(a),method:"post",data:t})}},ef5b:function(t,e,a){"use strict";a("ae20")}}]);