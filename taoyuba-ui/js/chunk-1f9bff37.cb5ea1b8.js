(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f9bff37"],{"0f1e":function(t,e,n){"use strict";n.d(e,"k",(function(){return c})),n.d(e,"j",(function(){return s})),n.d(e,"m",(function(){return l})),n.d(e,"e",(function(){return u})),n.d(e,"a",(function(){return d})),n.d(e,"i",(function(){return p})),n.d(e,"l",(function(){return f})),n.d(e,"f",(function(){return m})),n.d(e,"h",(function(){return h})),n.d(e,"d",(function(){return g})),n.d(e,"g",(function(){return b})),n.d(e,"n",(function(){return v})),n.d(e,"c",(function(){return y})),n.d(e,"b",(function(){return O}));var r=n("b5c6"),a=n("2f9e"),o="tybhrms/resume",i="tmlms/shipownerRecruit";function c(t){return Object(r["a"])({url:"".concat(o,"/getPage"),method:"get",params:t})}function s(t){return Object(r["a"])({url:"".concat(o,"/getMyCerts"),method:"get",params:t})}function l(t,e){return Object(r["a"])({url:"".concat(o,"/review?status=").concat(t,"&resumeId=").concat(e),method:"post"})}function u(t){return Object(r["a"])({url:"".concat(o,"/delete/")+t,method:"post",data:t})}function d(t){return Object(r["a"])({url:"".concat(o,"/add"),method:"post",data:t})}function p(t){return Object(r["a"])({url:"".concat(o,"/")+t,method:"get",params:t})}function f(t,e){return Object(r["a"])({url:"".concat(o,"/update"),method:"put",params:{publish:e},data:t})}function m(t){return Object(a["a"])({url:"tybhrms/tybExcelExport/resume",data:t,title:"简历信息"})}function h(t){return Object(r["a"])({url:"".concat(i,"/page"),method:"get",params:t})}function g(t){return Object(r["a"])({url:"".concat(i,"/delete/")+t,method:"post",data:t})}function b(t){return Object(r["a"])({url:"".concat(i,"/")+t,method:"get",dparamsata:t})}function v(t){return Object(r["a"])({url:"".concat(i,"/update"),method:"post",data:t})}function y(t){return Object(r["a"])({url:"".concat(i,"/create"),method:"post",data:t})}function O(t){return Object(r["a"])({url:"tybship/tybship/findmyship/"+t,method:"get"})}},"2f9e":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("ac6a"),n("28a5"),n("a481");var r=n("b5c6");function a(t){var e=t.url,n=t.method,a=void 0===n?"post":n,i=t.data,c=void 0===i?{}:i,s=t.title,l=void 0===s?"":s;return new Promise((function(t){return Object(r["a"])({url:e,method:a,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(e){o({title:l,response:e}).then((function(){t()}))}))}))}function o(t){var e=t.title,n=void 0===e?"":e,r=t.response,a=i(r.headers["content-disposition"].replace(/"/g,""));return new Promise((function(t){var e=r.headers,o=new Blob([r.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,n);else{var i=document.createElement("a");i.href=window.URL.createObjectURL(o),i.download=n?"".concat(n,".").concat(a.suffix):a.filename,document.body.appendChild(i),i.style.display="none",i.click()}t()}))}function i(t){var e={},n=t.split(";");return n.forEach((function(t){var n=t.replace(/^\s+|\s+$/g,""),r=n.split("=");r[1]?e[r[0]]=r[1]:e[r[0]]=r[0]})),e.suffix=e.filename.split(".")[1],e}},4917:function(t,e,n){"use strict";var r=n("cb7c"),a=n("9def"),o=n("0390"),i=n("5f1b");n("214f")("match",1,(function(t,e,n,c){return[function(n){var r=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,r):new RegExp(n)[e](String(r))},function(t){var e=c(n,t,this);if(e.done)return e.value;var s=r(t),l=String(this);if(!s.global)return i(s,l);var u=s.unicode;s.lastIndex=0;var d,p=[],f=0;while(null!==(d=i(s,l))){var m=String(d[0]);p[f]=m,""===m&&(s.lastIndex=o(l,a(s.lastIndex),u)),f++}return 0===f?null:p}]}))},"502e":function(t,e,n){"use strict";n("8e6e"),n("ac6a"),n("456d");var r=n("ade3"),a=(n("96cf"),n("1da1")),o=n("51f4");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};e["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(o["a"])()},searchPage:function(t){this.pageOption=this._pageOption(),this.searchForm=t,this.loadPage(t)},loadTable:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,n){var r,a,o,i,s,l,u,d,p,f=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=f.length>2&&void 0!==f[2]?f[2]:function(t){return t},this.isLoadTable=!0,t.next=4,n(c(c({},this.pageOption),e));case 4:return a=t.sent,o=a.data,i=o.data,s=i.records,l=i.size,u=i.total,d=i.current,p=u/l+1===d,p&&0!==u?this.searchPage({current:d-1,size:l,total:u}):this.pagination={current:d,size:l,total:u},this.pagedTable=s.map(r),this.isLoadTable=!1,t.abrupt("return",o.data);case 12:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}(),handleSizeChange:function(t){this.pageOption.size=t,this.loadPage()},handleCurrentChange:function(t){this.pageOption.current=t,this.loadPage()},_handleGlobalDeleteById:function(t,e){this._handleGlobalById(t,e,"delete")},_handleGlobalDeleteAll:function(t){this._handleGlobalAll(t,"delete")},_handleGlobalById:function(t,e){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",a=s[r];this.$confirm("此操作将".concat(a,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e(t).then((function(t){t.data.data?n.$message({type:"success",message:"".concat(a,"成功!")}):n.$message({type:"info",message:"".concat(a,"失败，").concat(t.data.msg)}),n.loadPage()}))}))},_handleGlobalAll:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n,r,o,i=this,c=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:"delete",r=this.multipleSelection,o=s[n],void 0!==r&&0!==r.length){t.next=6;break}return this.$message("请先选择需要".concat(o,"的选项")),t.abrupt("return");case 6:this.$confirm("此操作将".concat(o,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e(r);case 2:n=t.sent,a=n.data,a.data?(i.$message({type:"success",message:"".concat(o,"成功!")}),i.pageOption=i._pageOption()):i.$message({type:"info",message:"".concat(o,"失败，").concat(a.msg)}),i.loadPage();case 6:case"end":return t.stop()}}),t)}))));case 7:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),_handleComfirm:function(t,e,n,r,o){var i=this;this.$confirm(r||"是否".concat(n),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function r(){var a,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e(t);case 2:a=r.sent,c=a.data,c.data?i.$message({type:"success",message:o||"".concat(n,"成功!")}):i.$message({type:"info",message:"".concat(c.msg)}),i.loadPage();case 6:case"end":return r.stop()}}),r)})))).catch((function(t){i.$message({type:"info",message:"".concat(t,", 已取消").concat(n)})}))},mixinsCellPointerStyle:function(t){var e=t.column;return"index"!==e.type&&"selection"!==e.type&&"操作"!==e.label&&"cursor:pointer"}}}},"52d8":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.currentComponet,{tag:"component",attrs:{record:t.record},on:{onDetail:t.handleDetail,onEdit:t.handleEdit,onGoBack:t.handleGoBack}})},a=[],o=n("a091"),i=n("c2eb"),c=n("9182"),s={name:"TableListWrapper",components:{List:o["default"],Edit:i["default"],Detail:c["default"]},data:function(){return{currentComponet:"List",record:""}},created:function(){},methods:{handleEdit:function(t){this.record=t,this.currentComponet="Edit"},handleGoBack:function(){this.record="",this.currentComponet="List"},handleDetail:function(t){this.record=t,this.currentComponet="Detail"}},watch:{"$route.path":function(){this.record="",this.currentComponet="List"}}},l=s,u=n("2877"),d=Object(u["a"])(l,r,a,!1,null,null,null);e["default"]=d.exports},5612:function(t,e,n){"use strict";n.d(e,"i",(function(){return i})),n.d(e,"j",(function(){return c})),n.d(e,"l",(function(){return s})),n.d(e,"m",(function(){return l})),n.d(e,"r",(function(){return u})),n.d(e,"c",(function(){return d})),n.d(e,"t",(function(){return p})),n.d(e,"u",(function(){return f})),n.d(e,"d",(function(){return m})),n.d(e,"e",(function(){return h})),n.d(e,"g",(function(){return g})),n.d(e,"v",(function(){return b})),n.d(e,"f",(function(){return v})),n.d(e,"z",(function(){return y})),n.d(e,"k",(function(){return O})),n.d(e,"n",(function(){return w})),n.d(e,"h",(function(){return j})),n.d(e,"p",(function(){return I})),n.d(e,"x",(function(){return k})),n.d(e,"y",(function(){return C})),n.d(e,"w",(function(){return x})),n.d(e,"b",(function(){return $})),n.d(e,"q",(function(){return P})),n.d(e,"a",(function(){return _})),n.d(e,"s",(function(){return N})),n.d(e,"o",(function(){return B}));var r=n("b5c6"),a=n("2f9e"),o="/tmlms/crew";function i(t){return Object(r["a"])({url:"".concat(o,"/Page"),method:"get",params:t})}function c(t){return Object(r["a"])({url:"".concat(o,"/findByShipId?shipId=").concat(t),method:"get",params:t})}function s(t){return Object(r["a"])({url:"".concat(o,"/getHistoryByShipId?shipId=").concat(t.shipId),method:"get",params:t})}function l(t){return Object(r["a"])({url:"".concat(o,"/pageWithShip"),method:"get",params:t})}function u(t){return Object(r["a"])({url:"".concat(o,"/shipLogPage"),method:"get",params:t})}function d(t){return Object(r["a"])({url:"".concat(o,"/checkMoreRelations"),method:"post",data:t})}function p(t,e){return Object(r["a"])({url:"".concat(o,"/create?type=").concat(e),method:"post",data:t})}function f(t,e){return Object(r["a"])({url:"".concat(o,"/batchCreate?type=").concat(e),method:"post",data:t,timeout:3e5})}function m(t){return Object(r["a"])({url:"".concat(o,"/delete?idcard=").concat(t),method:"post"})}function h(t,e){return Object(r["a"])({url:"".concat(o,"/deleteRelation?idcard=").concat(t,"&&shipId=").concat(e),method:"post"})}function g(t,e){return Object(r["a"])({url:"".concat(o,"/edit?type=").concat(e),method:"post",data:t})}function b(t,e){return Object(r["a"])({url:"".concat(o,"/review?status=").concat(t,"&userId=").concat(e),method:"post"})}function v(t){return Object(r["a"])({url:"".concat(o,"/getCrewByidcard?idcard=").concat(t),method:"get"})}function y(t){return Object(r["a"])({url:"admin/file/upload/avatar",method:"post",data:t})}function O(t){return Object(r["a"])({url:"".concat(o,"/idcardcheck?idcard=").concat(t),method:"get"})}function w(t){return Object(r["a"])({url:"".concat(o,"/idcardcheck?idcard=").concat(t),method:"get"})}function j(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"船员信息";return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downloadCrew",data:t,title:e})}function I(t){return Object(r["a"])({url:"".concat(o,"/badPage"),method:"get",params:t})}function k(t){return Object(r["a"])({url:"".concat(o,"/badUpdateBatch"),method:"post",data:t})}function C(t){return Object(r["a"])({url:"".concat(o,"/uploadBaseImage"),method:"post",data:t})}function x(t){return Object(r["a"])({url:"".concat(o,"/updateCertByIdcard"),method:"post",params:t})}function $(t){return Object(r["a"])({url:"".concat(o,"/changeShip"),method:"post",data:t})}function P(t){return Object(r["a"])({url:"".concat(o,"/getShipRelationByIdcard"),method:"get",params:t})}function _(t){return Object(r["a"])({url:"/tmlms/tybship/pageForChange",method:"get",params:t})}function N(t){return Object(r["a"])({url:"/tmlms/importTask/lookTask",method:"get",params:{taksId:t}})}function B(t){return Object(r["a"])({url:"/tmlms/crew_cert/newPage",method:"get",params:t})}},"7cdf":function(t,e,n){var r=n("5ca1");r(r.S,"Number",{isInteger:n("9c12")})},"84df":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("c1df"),a=n.n(r),o=function(){return a()().format("YYYY-MM-DD HH:mm:ss")}},9182:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"iep-page-form"},[n("basic-container",[n("page-header",{attrs:{title:"船员信息",backOption:t.backOption}}),n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"140px",size:"small",disabled:""}},[n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"个人姓名：",prop:"realName"}},[n("el-input",{model:{value:t.form.realName,callback:function(e){t.$set(t.form,"realName",e)},expression:"form.realName"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"性别",prop:"gender"}},[n("el-radio",{attrs:{label:1},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}},[t._v("男")]),n("el-radio",{attrs:{label:2},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}},[t._v("女")])],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"身份证号码：",prop:"idcard"}},[n("el-input",{model:{value:t.form.idcard,callback:function(e){t.$set(t.form,"idcard",e)},expression:"form.idcard"}})],1)],1),n("el-col",{attrs:{span:12}},[n("iep-form-item",{staticClass:"form-half",attrs:{prop:"birthday","label-name":"出生日期"}},[n("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.birthday,callback:function(e){t.$set(t.form,"birthday",e)},expression:"form.birthday"}})],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"地址："}},[n("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"省级地区"},on:{change:function(e){return t.choseProvince(t.form.provinceId)}},model:{value:t.form.provinceId,callback:function(e){t.$set(t.form,"provinceId",e)},expression:"form.provinceId"}},t._l(t.province,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.areaCode,prop:"provinceId"}})})),1),n("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"市级地区"},on:{change:function(e){return t.choseCity(t.form.cityId)}},model:{value:t.form.cityId,callback:function(e){t.$set(t.form,"cityId",e)},expression:"form.cityId"}},t._l(t.city,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.areaCode,prop:"cityId"}})})),1),n("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"区级地区"},on:{change:function(e){return t.choseDistrict(t.form.districtId)}},model:{value:t.form.districtId,callback:function(e){t.$set(t.form,"districtId",e)},expression:"form.districtId"}},t._l(t.district,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.areaCode,prop:"districtId"}})})),1)],1)],1),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"国籍",prop:"nationality"}},[n("el-input",{model:{value:t.form.nationality,callback:function(e){t.$set(t.form,"nationality",e)},expression:"form.nationality"}})],1)],1),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"名族",prop:"nation"}},[n("el-select",{attrs:{placeholder:"请输入名族"},model:{value:t.form.nation,callback:function(e){t.$set(t.form,"nation",e)},expression:"form.nation"}},t._l(t.nationals,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})})),1)],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"家庭地址：",prop:"address"}},[n("el-input",{model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[n("el-input",{model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"家庭联系人：",prop:"contactName"}},[n("el-input",{model:{value:t.form.contactName,callback:function(e){t.$set(t.form,"contactName",e)},expression:"form.contactName"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"家庭联系电话",prop:"contactPhone"}},[n("el-input",{model:{value:t.form.contactPhone,callback:function(e){t.$set(t.form,"contactPhone",e)},expression:"form.contactPhone"}})],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"船民证号码",prop:"crewCert"}},[n("el-input",{model:{value:t.form.crewCert,callback:function(e){t.$set(t.form,"crewCert",e)},expression:"form.crewCert"}})],1)],1),n("el-col",{attrs:{span:12}},[n("iep-form-item",{staticClass:"form-half",attrs:{prop:"certExpDate","label-name":"船民证有效期限"}},[n("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.certExpDate,callback:function(e){t.$set(t.form,"certExpDate",e)},expression:"form.certExpDate"}})],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"职位",prop:"positionId"}},[n("el-select",{attrs:{placeholder:"职位"},model:{value:t.form.positionId,callback:function(e){t.$set(t.form,"positionId",e)},expression:"form.positionId"}},t._l(t.position,(function(t){return n("el-option",{key:t.id,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"身份证正面照片：",prop:"photoFront"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccessFront,headers:t.headers,accept:"image/*"}},[t.form.photoFront?n("img",{staticClass:"avatar",attrs:{src:t.form.photoFront}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"身份证反面照片：",prop:"photoReverse"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccessReverse,headers:t.headers,accept:"image/*"}},[t.form.photoReverse?n("img",{staticClass:"avatar",attrs:{src:t.form.photoReverse}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),n("iep-form-item",{staticClass:"form-half",attrs:{prop:"remark","label-name":"备注信息",tip:"请输入备注信息"}},[n("iep-input-area",{model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1)],1)],1)},a=[],o=n("c533"),i=n("e0de"),c={data:function(){var t=this;return{dictsMap:i["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},rules:i["f"],form:Object(i["d"])(),province:[],city:[],district:[],village:[],parentCode:0,position:[],regions:{province:[],city:[],district:[],town:[],village:[]},regionChosen:{province:"",city:"",district:"",town:"",village:"",shipId:""},dicID:"tyb_resume_position"}},computed:{userId:function(){return+this.$route.params.userId},methodName:function(){return this.userId?"编辑":"发布"}},created:function(){var t=this;this.getRogionList(0,"province"),this.userId?Object(o["e"])(this.userId).then((function(e){var n=e.data;t.form=t.$mergeByFirst(Object(i["d"])(),n.data);var r=t.form.villageId,a=t.form.districtId,o=t.form.cityId,c=t.form.provinceId;t.getAllInfo(r,4),t.getAllInfo(a,3),t.getAllInfo(o,2),t.getAllInfo(c,1)})):this.init=!0,Object(o["d"])(this.parentCode).then((function(e){var n=e.data;t.province=n.data})),Object(o["f"])(this.dicID).then((function(e){var n=e.data;t.position=n.data}))},mounted:function(){var t=this;if(this.$route.query.position){var e=this.$route.query.position.map((function(t){return+t}))||[];this.form.position=e||[],setTimeout((function(){t.$refs["IepCascader"].handleChange(e)}),2e3)}},watch:{"regionChosen.province":function(t){this.init&&(this.regionChosen.city="",this.regionChosen.district="",this.regionChosen.town="",this.regionChosen.village=""),this.regions.city=[],this.regions.district=[],this.regions.town=[],this.regions.village=[],t&&this.getRogionList(t,"city")},"regionChosen.city":function(t){this.init&&(this.regionChosen.district="",this.regionChosen.town="",this.regionChosen.village=""),this.regions.district=[],this.regions.town=[],this.regions.village=[],t&&this.getRogionList(t,"district")},"regionChosen.district":function(t){this.init&&(this.regionChosen.town="",this.regionChosen.village=""),this.regions.town=[],this.regions.village=[],t&&this.getRogionList(t,"town")},"regionChosen.town":function(t){this.init&&(this.regionChosen.village=""),this.regions.village=[],t&&this.getRogionList(t,"village")},"regionChosen.village":function(t){this.form.villageId=t}},methods:{getRogionList:function(t,e){var n=this;Object(o["h"])(t).then((function(t){var r=t.data;0===r.code&&(n.regions[e]=r.data)}),(function(t){n.$message.error(t.message)}))},getAllInfo:function(t,e){var n=this;Object(o["i"])(t).then((function(t){var r=t.data;1==e?n.province.push(r.data):2==e?n.city.push(r.data):3==e?n.district.push(r.data):n.village.push(r.data)}))},choseProvince:function(t){var e=this;this.form.cityId="",this.form.districtId="",this.form.villageId="",Object(o["d"])(t).then((function(t){var n=t.data;e.city=n.data}))},choseCity:function(t){var e=this;Object(o["d"])(t).then((function(t){var n=t.data;e.district=n.data}))},choseDistrict:function(t){var e=this;Object(o["d"])(t).then((function(t){var n=t.data;e.village=n.data}))},onGoBack:function(){this.$router.push({path:"/hrms_spa/crew_admin_list"})},handleSubmit:function(){var t=this,e=this.userId?o["j"]:o["a"];this.$refs["form"].validate((function(n){n&&e(Object(i["c"])(t.form)).then((function(e){var n=e.data;n.data&&(t.$message({message:"操作成功",type:"success"}),t.onGoBack())}),(function(e){t.$message.error(e.message)}))}))}}},s=c,l=(n("be87"),n("2877")),u=Object(l["a"])(s,r,a,!1,null,"0c611b8c",null);e["default"]=u.exports},"9c12":function(t,e,n){var r=n("d3f4"),a=Math.floor;t.exports=function(t){return!r(t)&&isFinite(t)&&a(t)===t}},a017:function(t,e,n){},a091:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("basic-container",[n("page-header",{attrs:{title:"职务证书"}}),n("operation-container",[n("template",{slot:"left"},[n("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"/api/tmlms/crewAndShip/import",accept:"excel","show-file-list":!1,headers:t.headers,"on-success":t.onBeforeUpload,limit:1}},[n("el-button",{attrs:{type:"default",size:"small",loading:t.loading}},[t._v(t._s(t.importA))])],1)],1),n("template",{slot:"right"},[n("operation-search",{attrs:{prop:t.searchData},on:{"search-page":t.searchPage}})],1)],2),n("iep-table",{attrs:{isLoadTable:t.isLoadTable,pagination:t.pagination,columnsMap:t.columnsMap,pagedTable:t.pagedTable,"is-mutiple-selection":""},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"selection-change":t.handleSelectionChange}})],1)],1)},a=[],o=(n("8e6e"),n("ac6a"),n("456d"),n("96cf"),n("1da1")),i=n("ade3"),c=n("5612"),s=n("502e"),l=n("e0de"),u=n("2f62"),d=n("4360");function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){Object(i["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={mixins:[s["a"]],data:function(){return{headers:{Authorization:"Bearer "+d["a"].getters.access_token},importA:"船员证书导入",dictsMap:l["b"],columnsMap:l["a"],searchData:"realName",loading:!1}},created:function(){this.loadPage()},computed:f({},Object(u["c"])(["dictGroup"])),methods:{onBeforeUpload:function(t){var e=this;this.loading=!0,Object(c["s"])(t.data).then((function(t){var n=t.data;if(console.log(n.data),e.parseInt(n.data),1!=n.data.status)var r=e,a=setInterval((function(){var t=this,e={data:n.data.midId};Object(c["s"])(e.data).then((function(e){var n=e.data,o=n.data,i=o.successCount+o.failCount;r.importA=parseInt(i/o.total*100)+"%",console.log(t.importA),1==n.data.status&&(clearInterval(a),r.$refs.upload.clearFiles(),r.loading=!1,r.importA="船员证书导入")}))}),1e3)}))},handleSelectionChange:function(t){this.multipleSelection=t.map((function(t){return t.id}))},loadPage:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,n=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=n.length>0&&void 0!==n[0]?n[0]:this.searchForm,this.loadTable(e,c["o"]);case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},h=m,g=n("2877"),b=Object(g["a"])(h,r,a,!1,null,null,null);e["default"]=b.exports},be87:function(t,e,n){"use strict";n("a017")},c2eb:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"iep-page-form"},[n("basic-container",[n("page-header",{attrs:{title:t.methodName+"招聘",backOption:t.backOption}}),n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"140px",size:"small"}},[n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"渔船名：",prop:"shipName"}},[n("el-input",{on:{blur:function(e){return t.change()}},model:{value:t.form.shipName,callback:function(e){t.$set(t.form,"shipName",e)},expression:"form.shipName"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"联系电话：",prop:"phone"}},[n("el-input",{model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"持证人姓名：",prop:"shipowner"}},[n("el-input",{model:{value:t.form.shipowner,callback:function(e){t.$set(t.form,"shipowner",e)},expression:"form.shipowner"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"驾驶类数量：",prop:"driverQuantity"}},[n("el-input",{model:{value:t.form.driverQuantity,callback:function(e){t.$set(t.form,"driverQuantity",e)},expression:"form.driverQuantity"}})],1)],1)],1),n("el-row",[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"轮机类数量：",prop:"engineQuantity"}},[n("el-input",{model:{value:t.form.engineQuantity,callback:function(e){t.$set(t.form,"engineQuantity",e)},expression:"form.engineQuantity"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"普通船员数量：",prop:"normalQuantity"}},[n("el-input",{model:{value:t.form.normalQuantity,callback:function(e){t.$set(t.form,"normalQuantity",e)},expression:"form.normalQuantity"}})],1)],1)],1),n("el-form-item",{attrs:{label:""}},[n("operation-wrapper",[n("iep-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1)],1)],1)],1)},a=[],o=n("0f1e"),i=n("e0de"),c=n("e420"),s={mixins:[c["a"]],data:function(){var t=this;return{dictsMap:i["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},pickerOptions:{disabledDate:function(t){return t.getTime()>Date.now()}},rules:i["f"],form:Object(i["d"])(),provinces:[],citys:[]}},computed:{id:function(){return+this.$route.params.id},methodName:function(){return this.id?"编辑":"发布"}},created:function(){var t=this;console.log(this.id),this.id&&Object(o["g"])(this.id).then((function(e){var n=e.data;t.form=n.data}))},mounted:function(){},methods:{change:function(){var t=this;Object(o["b"])(this.form.shipName).then((function(e){var n=e.data;if(0==n.data)return t.form={},t.$forceUpdate(),void t.$message({message:"未查询到此船",type:"warning"});n.data.shipowner&&(t.form.shipowner=n.data.shipowner),t.form.phone=n.data.mobile,t.form.shipId=n.data.shipId,t.$forceUpdate()}))},onGoBack:function(){this.$router.push({path:"/hrms_spa/bot_admin_list"})},handleSubmit:function(){var t=this;this.$refs["form"].validate((function(e){e&&(t.id?Object(o["n"])(t.form).then((function(e){var n=e.data;n.data&&(t.$message({message:"操作成功",type:"success"}),t.onGoBack())})):t.form.shipId?Object(o["c"])(t.form).then((function(e){var n=e.data;n.data&&(t.$message({message:"操作成功",type:"success"}),t.onGoBack())})):t.$message({message:"请填写完整数据",type:"warning"}))}))}}},l=s,u=n("2877"),d=Object(u["a"])(l,r,a,!1,null,null,null);e["default"]=d.exports},c533:function(t,e,n){"use strict";n.d(e,"i",(function(){return c})),n.d(e,"f",(function(){return s})),n.d(e,"d",(function(){return l})),n.d(e,"g",(function(){return u})),n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return p})),n.d(e,"e",(function(){return f})),n.d(e,"j",(function(){return m})),n.d(e,"h",(function(){return h})),n.d(e,"b",(function(){return g}));var r=n("b5c6"),a="tmlms/crew",o="admin/region",i="admin/dict";function c(t){return Object(r["a"])({url:"".concat(o,"/getinfo/")+t,method:"get"})}function s(t){return Object(r["a"])({url:"".concat(i,"/type/")+t,method:"get"})}function l(t){return Object(r["a"])({url:"".concat(o,"/area"),method:"get",params:{parentCode:t}})}function u(t){return Object(r["a"])({url:"".concat(a,"/Page"),method:"get",params:t})}function d(t){return Object(r["a"])({url:"".concat(a,"/delete"),method:"post",params:{userId:t}})}function p(t){return Object(r["a"])({url:"".concat(a,"/create"),method:"post",data:t,params:{type:1}})}function f(t){return Object(r["a"])({url:"".concat(a,"/getCrewByUserId"),method:"get",params:{userId:t}})}function m(t){return Object(r["a"])({url:"".concat(a,"/edit"),method:"post",params:{type:1},data:t})}function h(t){return Object(r["a"])({url:"/tybship/tybregion/parent/".concat(t),method:"get"})}function g(t,e,n){return Object(r["a"])({url:"".concat(a,"/upWork?idcard=").concat(e,"&workStatus=").concat(n),method:"post",data:t})}},e0de:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o})),n.d(e,"f",(function(){return d})),n.d(e,"d",(function(){return c})),n.d(e,"c",(function(){return m})),n.d(e,"e",(function(){return p})),n.d(e,"g",(function(){return h}));n("c5f6"),n("7cdf"),n("4917");var r=n("0e0b"),a=n("84df"),o={isTrain:{0:"否",1:"是"}},i=[{prop:"realName",label:"持证人"},{prop:"certNo",label:"证书编号"},{prop:"certDateIssue",label:"签发日期",type:"ldate"},{prop:"certDateExpire",label:"结束日期",type:"ldate"},{prop:"certTitle",label:"证书职务",dictName:"tyb_crew_cert_title",type:"dictGroup"},{prop:"certLevel",label:"证书等级",dictName:"tyb_crew_cert_level",type:"dictGroup"}],c=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"中国",nation:"",applyType:1,isTrain:0}},s=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"",nation:"",applyType:1,isTrain:0}},l=function(t,e,n){""===e?n(new Error("请输入联系电话")):e.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)?n():n(new Error("请输入正确的手机号码!"))},u=function(t,e,n){Number.isInteger(Number(e))&&Number(e)>0&&Number(e)<999?n():n(new Error("请输入1-999的正整数"))},d={shipName:[{required:!0,message:"请填写完整渔船名",trigger:"blur"}],shipowner:[{required:!0,message:"请填写持证人姓名",trigger:"blur"}],driverQuantity:[{required:!0,message:"请填写驾驶类数量",trigger:"blur"},{validator:u,trigger:"blur"}],normalQuantity:[{required:!0,message:"请填写普通船员数量",trigger:"blur"},{validator:u,trigger:"blur"}],engineQuantity:[{required:!0,message:"请填写轮机类数量",trigger:"blur"},{validator:u,trigger:"blur"}],phone:[{required:!0,message:"请填写联系电话",trigger:"blur"},{validator:l,trigger:"blur"}]},p=function(){return{contactName:"",positionName:""}},f=function(){return{contactName:"",positionName:""}},m=function(t){var e=Object(r["g"])(s(),t);return e},h=function(t){var e=Object(r["g"])(f(),t);return e.contactName=t.contactName?t.contactName:null,e.positionName=t.positionName?t.positionName:null,e}},e420:function(t,e,n){"use strict";n("7f7f");var r=n("7ded");e["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(t,e){var n=this;Object(r["c"])().then((function(r){-1===r.data.data.roles.indexOf(1)&&-1===r.data.data.roles.indexOf(111)&&(r.data.data.sysUser.phone&&(n.$set(n.haveInfo,"phone",!0),n[t][e[0]]=r.data.data.sysUser.phone),r.data.data.sysUser.realName&&(n.$set(n.haveInfo,"realName",!0),n[t][e[1]]=r.data.data.sysUser.realName),r.data.data.sysUser.idCard&&[e[2]]&&(n.$set(n.haveInfo,"idcard",!0),n[t].idcard=r.data.data.sysUser.idCard))}))}}}}}]);