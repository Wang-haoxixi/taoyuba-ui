(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7261feb8"],{"0770":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contract-box"},[n("basic-container",[n("h1",[t._v(t._s(t.ifexist?"编辑":"新增")+"渔船信息")]),n("el-form",{ref:"form",attrs:{model:t.tybvillage,"label-width":"150px",rules:t.rules}},[n("el-row",[n("el-col",[n("iep-form-item",{attrs:{prop:"workExperience","label-name":"渔船信息"}},[n("inline-form-table",{attrs:{"table-data":t.tybvillage.shiplist,columns:t.certificateColumns,requestName:"certificate",type:"employee_profile"},on:{add:t.setData,changeval:t.changeval}})],1)],1)],1)],1),n("div",{staticStyle:{"text-align":"center"}},[n("el-button",{on:{click:t.save}},[t._v("提交")]),n("el-button",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1)],1)},a=[],i=(n("6762"),n("2fdb"),n("96cf"),n("1da1")),o=n("84c3"),c=n("da1c"),s=n("7ded"),u={data:function(){return{certificateColumns:[{prop:"shipname",label:"渔船名"},{prop:"shipowner",label:"持证人"},{prop:"mobile",label:"联系电话"}],tybvillage:{shiplist:[]},rules:{},options:[],manager:!1,ifexist:!1}},components:{InlineFormTable:o["default"]},methods:{save:function(){var t=this;this.$refs["form"].validate(function(e){if(!e)return!1;var n=t.tybvillage.shiplist,r=t.$route.query.allot;if(t.ifexist){var a=new Array;if(t.tybvillage.shiplist.length>0)for(var i=0;i<n.length;i++){var o={id:"",villageUserid:r,shipname:"",shipno:"",shipowner:"",mobile:""};Object.assign(o,n[i]),a.push(o)}console.log(a);var s=JSON.parse(JSON.stringify(a));Object(c["a"])(s,r).then(function(e){0===e.data.code&&(t.$message({message:"编辑成功",type:"success"}),t.$router.go(-1))}).catch(function(e){t.$message.error(e.message)})}else{if(0===t.tybvillage.shiplist.length)return void t.$message.error("无数据提交");console.log(r);var u=new Array;if(t.tybvillage.shiplist.length>0)for(var l=0;l<n.length;l++){var p={villageUserid:r,shipname:"",shipno:"",shipowner:"",mobile:""};Object.assign(p,n[l]),u.push(p)}var d=JSON.parse(JSON.stringify(u));Object(c["b"])(d).then(function(e){0===e.data.code&&(t.$message({message:"保存成功",type:"success"}),t.$router.go(-1))}).catch(function(e){t.$message.error(e.message)})}})},setData:function(t){this.tybvillage.shiplist=t},changeval:function(t){var e=Object.assign([],t);this.tybvillage.shiplist=e}},computed:{},created:function(){function t(){return e.apply(this,arguments)}function e(){return e=Object(i["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["e"])(this.$route.query.allot).then(function(t){0===t.data.code&&(e.tybvillage.shiplist=t.data.data,e.tybvillage.shiplist.length>0&&(e.ifexist=!0))});case 2:Object(s["c"])().then(function(t){t.data.data.roles.includes(111)?e.manager=!0:e.manager=!1,t.data.data.sysUser.userId});case 3:case"end":return t.stop()}},t,this)})),e.apply(this,arguments)}t.call(this)},watch:{}},l=u,p=(n("92c9"),n("2877")),d=Object(p["a"])(l,r,a,!1,null,"2b49aaaf",null);e["default"]=d.exports},"2f9e":function(t,e,n){"use strict";n.d(e,"a",function(){return a});n("ac6a"),n("28a5"),n("a481");var r=n("b5c6");function a(t){var e=t.url,n=t.method,a=void 0===n?"post":n,o=t.data,c=void 0===o?{}:o,s=t.title,u=void 0===s?"":s;return new Promise(function(t){return Object(r["a"])({url:e,method:a,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then(function(e){i({title:u,response:e}).then(function(){t()})})})}function i(t){var e=t.title,n=void 0===e?"":e,r=t.response,a=o(r.headers["content-disposition"].replace(/"/g,""));return new Promise(function(t){var e=r.headers,i=new Blob([r.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,n);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=n?"".concat(n,".").concat(a.suffix):a.filename,document.body.appendChild(o),o.style.display="none",o.click()}t()})}function o(t){var e={},n=t.split(";");return n.forEach(function(t){var n=t.replace(/^\s+|\s+$/g,""),r=n.split("=");r[1]?e[r[0]]=r[1]:e[r[0]]=r[0]}),e.suffix=e.filename.split(".")[1],e}},"84c3":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data,border:"",size:"small"}},[t._l(t.columns,function(e,r){return n("el-table-column",{key:r,attrs:{label:e.label,width:e.width},scopedSlots:t._u([{key:"default",fn:function(r){return[r.row.editable?["date"===e.type?n("iep-date-picker",{attrs:{type:"date",size:"mini",placeholder:e.label},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"daterange"===e.type?n("iep-date-range-select",{attrs:{size:"mini",placeholder:e.label},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"file"===e.type?n("iep-upload-select",{attrs:{size:"mini",type:!0},on:{input:function(e){return t.getUrl()}},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"dict"===e.type?n("iep-dict-select",{attrs:{size:"mini",placeholder:e.label,"dict-name":e.dictName},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"area"===e.type?n("iep-input-area",{attrs:{maxlength:1e3,size:"mini",placeholder:e.label,autosize:{minRows:1}},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"list"===e.type?n("iep-select",{attrs:{size:"mini",prefixUrl:e.prefixUrl,placeholder:e.label},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"shipname"===e.prop?n("el-autocomplete",{attrs:{maxlength:100,size:"mini","fetch-suggestions":t.querySearchAsync,placeholder:e.label,clearable:""},on:{select:t.handleSelect},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):n("el-input",{attrs:{maxlength:100,size:"mini",placeholder:e.label,clearable:""},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}})]:["dict"===e.type?n("iep-dict-detail",{attrs:{size:"mini",value:r.row[e.prop],"dict-name":e.dictName}}):"daterange"===e.type?n("iep-date-range-select",{attrs:{size:"mini",placeholder:e.label,disabled:""},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):"file"===e.type?n("iep-upload-select",{attrs:{size:"mini",value:r.row[e.prop],disabled:"",type:!0}}):"date"===e.type?n("iep-div-detail",{attrs:{value:t._f("parseTime")(r.row[e.prop],"{y}-{m}-{d}")}}):"list"===e.type?n("iep-select",{attrs:{size:"mini",disabled:"",prefixUrl:e.prefixUrl,placeholder:e.label},model:{value:r.row[e.prop],callback:function(n){t.$set(r.row,e.prop,n)},expression:"scope.row[item.prop]"}}):n("iep-div-detail",{attrs:{value:r.row[e.prop]}})]]}}],null,!0)})}),n("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.editable?[e.row.isNew?n("span",[n("iep-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return t.saveRow(e.row.id)}}},[t._v("添加")]),n("a-divider",{attrs:{type:"vertical"}}),n("a-popconfirm",{attrs:{title:"是否要删除此数据？",okText:"确认",cancelText:"取消"},on:{confirm:function(n){return t.remove(e.row.id)}}},[n("iep-button",{attrs:{type:"text",size:"mini"}},[t._v("删除")])],1)],1):n("span",[n("iep-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return t.saveRow(e.row.id)}}},[t._v("更新")]),n("a-divider",{attrs:{type:"vertical"}}),n("iep-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return t.cancel(e.row.id)}}},[t._v("取消")])],1)]:n("span",[t.onlyLastCanEdit&&t.columns.length-1===t.idx?t._e():n("iep-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return t.toggle(e.row.id)}}},[t._v("编辑")]),n("a-divider",{attrs:{type:"vertical"}}),n("a-popconfirm",{attrs:{title:"是否要删除此数据？",okText:"确认",cancelText:"取消"},on:{confirm:function(n){return t.remove(e.row.id)}}},[n("iep-button",{attrs:{type:"text",size:"mini"}},[t._v("删除")])],1)],1)]}}])})],2),t.onlyLastCanEdit?t._e():n("iep-button",{staticStyle:{width:"100%","margin-top":"5px","margin-bottom":"8px"},attrs:{icon:"el-icon-plus",plain:""},on:{click:t.newMember}},[t._v("新增")])],1)},a=[],i=(n("96cf"),n("1da1")),o=(n("6b54"),n("ac6a"),n("be94")),c=n("ade36"),s={props:{tableData:{type:Array,required:!0},columns:{type:Array,required:!0},requestName:{type:String,required:!0},type:{type:String,required:!0},onlyLastCanEdit:{type:Boolean,default:!1}},data:function(){return{data:[],timeout:null,shipList:[],restaurants:[]}},created:function(){this.initData(),console.log(this.columns)},methods:{initData:function(){this.data=this.tableData.map(function(t){return Object(o["a"])({},t,{editable:!1,isNew:!1})})},newMember:function(){var t=this.data.length,e={};this.columns.forEach(function(t){e[t.prop]=""}),this.data.push(Object(o["a"])({id:t?(parseInt(this.data[t-1].id)+1).toString():"0"},e,{editable:!0,isNew:!0}))},saveRow:function(t){var e=this.data.filter(function(e){return e.id===t})[0];this.$emit("add",this.data),e.editable=!1,e.isNew=!1},remove:function(t){var e=this.data.filter(function(e){return e.id!==t});this.data=e,this.$emit("changeval",this.data)},cancel:function(t){var e=this.data.filter(function(e){return e.id===t})[0];e.editable=!1},toggle:function(t){var e=this.data.filter(function(e){return e.id===t})[0];e.editable=!e.editable},getUrl:function(){console.log(this.data)},querySearchAsync:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e,n){var r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(""===e){t.next=5;break}return t.next=3,Object(c["o"])(e).then(function(t){r.shipList=t.data.data,r.restaurants.push({value:t.data.data.shipName})});case 3:clearTimeout(this.timeout),this.timeout=setTimeout(function(){n(r.restaurants)},500*Math.random());case 5:case"end":return t.stop()}},t,this)}));function e(e,n){return t.apply(this,arguments)}return e}(),handleSelect:function(){this.data[this.data.length-1].mobile=this.shipList.mobile,this.data[this.data.length-1].shipowner=this.shipList.shipowner,this.restaurants=[]}},watch:{tableData:function(){this.initData()}}},u=s,l=n("2877"),p=Object(l["a"])(u,r,a,!1,null,null,null);e["default"]=p.exports},"92c9":function(t,e,n){"use strict";n("b5b7")},ade36:function(t,e,n){"use strict";n.d(e,"w",function(){return o}),n.d(e,"e",function(){return c}),n.d(e,"r",function(){return s}),n.d(e,"d",function(){return u}),n.d(e,"t",function(){return l}),n.d(e,"v",function(){return p}),n.d(e,"h",function(){return d}),n.d(e,"J",function(){return m}),n.d(e,"i",function(){return f}),n.d(e,"s",function(){return h}),n.d(e,"x",function(){return b}),n.d(e,"y",function(){return g}),n.d(e,"o",function(){return y}),n.d(e,"u",function(){return w}),n.d(e,"z",function(){return v}),n.d(e,"k",function(){return O}),n.d(e,"m",function(){return j}),n.d(e,"l",function(){return x}),n.d(e,"n",function(){return k}),n.d(e,"j",function(){return _}),n.d(e,"G",function(){return S}),n.d(e,"H",function(){return $}),n.d(e,"b",function(){return E}),n.d(e,"D",function(){return N}),n.d(e,"I",function(){return z}),n.d(e,"C",function(){return R}),n.d(e,"q",function(){return I}),n.d(e,"A",function(){return C}),n.d(e,"c",function(){return B}),n.d(e,"B",function(){return T}),n.d(e,"f",function(){return U}),n.d(e,"g",function(){return q}),n.d(e,"E",function(){return L}),n.d(e,"a",function(){return D}),n.d(e,"K",function(){return A}),n.d(e,"p",function(){return J}),n.d(e,"F",function(){return P});var r=n("b5c6"),a=n("2f9e"),i="/tybship/tybship";function o(t){return Object(r["a"])({url:"".concat(i,"/otherpage"),method:"get",params:t})}function c(t,e){return Object(r["a"])({url:"".concat(i,"/updateVillage?shipId=").concat(t,"&&villageId=").concat(e),method:"post"})}function s(){return Object(r["a"])({url:"/admin/org/page",method:"get"})}function u(t,e){return Object(r["a"])({url:"".concat(i,"/updateOrgId?shipId=").concat(t,"&&orgId=").concat(e),method:"post"})}function l(t){return Object(r["a"])({url:"".concat(i,"/").concat(t),method:"get",params:t})}function p(t){return Object(r["a"])({url:"".concat(i,"/").concat(t),method:"get"})}function d(t){return Object(r["a"])({url:"".concat(i,"/save"),method:"post",data:t})}function m(t){return Object(r["a"])({url:"".concat(i,"/update"),method:"post",data:t})}function f(t){return Object(r["a"])({url:"".concat(i,"/del/").concat(t),method:"post"})}function h(t){return Object(r["a"])({url:"".concat(i,"/mypage"),method:"get",params:t})}function b(t){return Object(r["a"])({url:"".concat(i,"/findship/").concat(t),method:"get"})}function g(t){return Object(r["a"])({url:"".concat(i,"/findshipWithOutOrg/").concat(t),method:"get"})}function y(t){return Object(r["a"])({url:"/tmlms/tybship/findmyship/".concat(t),method:"get"})}function w(t){return Object(r["a"])({url:"".concat(i,"/searchByshipNo"),method:"get",params:{shipNo:t}})}function v(t){return Object(r["a"])({url:"".concat(i,"/newpageV2"),method:"get",params:t})}function O(t){return Object(a["a"])({url:"tybship/tybshipExcelExport/downShipInfo",data:t,title:"渔船信息"})}function j(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrew",data:t,title:"开航登记表-"+t.shipName})}function x(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewRecord",data:t,title:"实名登记备案表-"+t.shipName})}function k(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downShipCrewTwoOld ",data:t,title:"船员登记表-"+t.shipName})}function _(t){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downContractModel",data:t,title:t.shipName})}function S(t){return Object(r["a"])({url:"tmlms/tyb_order/page",method:"get",params:t})}function $(t){return Object(r["a"])({url:"tmlms/tyb_order/getById",method:"get",params:t})}function E(t){return Object(r["a"])({url:"tmlms/tyb_order/agree",method:"post",data:t})}function N(t){return Object(r["a"])({url:"tmlms/tyb_order/reject",method:"post",data:t})}function z(t){return Object(r["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:t})}function R(t){return Object(r["a"])({url:"/tmlms/tybPortRecord/lastRecord",method:"get",params:t})}function I(t){return Object(r["a"])({url:"/tmlms/tybPortRecord/getCrewByRecordId",method:"get",params:t})}function C(t){return Object(r["a"])({url:"/tybship/tybship/info/".concat(t),method:"get"})}function B(t){return Object(r["a"])({url:"/tmlms/crew_cert/certStandard/".concat(t),method:"get"})}function T(t){return Object(r["a"])({url:"/tmlms/investigationReport/pageByShipName?shipName=".concat(t),method:"get"})}function U(t){return Object(r["a"])({url:"/tmlms/crew/countContractByShipId?shipId=".concat(t),method:"get"})}function q(t){return Object(r["a"])({url:"/tmlms/tybPortRecord/page",method:"get",params:t})}function L(t){return Object(r["a"])({url:"/tmlms/tybTroubleshootReport/pageByShipNo",method:"get",params:t})}function D(t){return Object(r["a"])({url:"/tmlms/tyb_order/pageByShipName",method:"get",params:t})}function A(t){return Object(r["a"])({url:"/tmlms/verification/page",method:"get",params:t})}function J(t){return console.log(t),Object(r["a"])({url:"/tmlms/tyb_order/getById?id=".concat(t.id),method:"get"})}function P(t){return Object(r["a"])({url:"/tmlms/tybmlmsExcelExport/downVerification",method:"post",headers:{"Content-Type":"application/json"},responseType:"arraybuffer",data:t}).then(function(t){var e=new Blob([t.data],{type:"application/vnd.ms-excel"}),n=document.createElement("a");n.href=window.URL.createObjectURL(e),n.download="实船鉴证.xls",n.click()})}},b5b7:function(t,e,n){},da1c:function(t,e,n){"use strict";n.d(e,"e",function(){return i}),n.d(e,"b",function(){return o}),n.d(e,"a",function(){return c}),n.d(e,"c",function(){return s}),n.d(e,"d",function(){return u});var r=n("b5c6"),a="/tmlms/tybvillageshipinfo";function i(t){return Object(r["a"])({url:"".concat(a,"/getbyuser/").concat(t),method:"get"})}function o(t){return Object(r["a"])({url:"".concat(a,"/batchship"),method:"post",data:t})}function c(t,e){return Object(r["a"])({url:"".concat(a,"/batchedit?userId=").concat(e),method:"post",data:t})}function s(t){return Object(r["a"])({url:"".concat(a,"/").concat(t),method:"get"})}function u(t){return Object(r["a"])({url:"".concat(a,"/getbyShipowner"),method:"get",params:{shipowner:t}})}}}]);