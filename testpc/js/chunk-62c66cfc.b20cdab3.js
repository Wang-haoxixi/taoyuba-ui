(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62c66cfc"],{"18a8":function(e,r,t){"use strict";t.r(r);var _=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"contract-box"},[t("basic-container",[e.$route.query.userId?e._e():t("h1",[e._v(e._s(e.$route.query.see?"查看":e.$route.query.edit?"编辑":"新增")+"船东信息")]),e.$route.query.userId?t("h1",[e._v("完善个人信息")]):e._e(),t("el-form",{ref:"form",attrs:{model:e.shipowner,"label-width":"150px",rules:e.rules}},[t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"姓名:",prop:"realName"}},[e.$route.query.see?t("div",[e._v(e._s(e.shipowner.realName))]):t("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.realName},model:{value:e.shipowner.realName,callback:function(r){e.$set(e.shipowner,"realName",r)},expression:"shipowner.realName"}})],1)],1),t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"身份证号:",prop:"idcard"}},[e.$route.query.see?t("div",[e._v(e._s(e.shipowner.idcard))]):t("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.idcard},model:{value:e.shipowner.idcard,callback:function(r){e.$set(e.shipowner,"idcard",r)},expression:"shipowner.idcard"}})],1)],1),t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"联系地址:",prop:"address"}},[e.$route.query.see?t("div",[e._v(e._s(e.shipowner.address))]):t("el-input",{attrs:{placeholder:""},model:{value:e.shipowner.address,callback:function(r){e.$set(e.shipowner,"address",r)},expression:"shipowner.address"}})],1)],1),t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"手机号码:",prop:"phone"}},[e.$route.query.see?t("div",[e._v(e._s(e.shipowner.phone))]):t("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.phone},model:{value:e.shipowner.phone,callback:function(r){e.$set(e.shipowner,"phone",r)},expression:"shipowner.phone"}})],1)],1)],1)],1),t("div",{staticStyle:{"text-align":"center"}},[e.$route.query.see?e._e():t("el-button",{on:{click:e.save}},[e._v("提交")]),t("el-button",{on:{click:function(r){return e.$router.go(-1)}}},[e._v("返回")]),e.manager?t("el-button",{on:{click:e.collect}},[e._v("数据读取")]):e._e()],1)],1)],1)},a=[],n=t("85a6"),s=n["a"],o=(t("e749"),t("0c7c")),i=Object(o["a"])(s,_,a,!1,null,"235a763d",null);r["default"]=i.exports},"2f9e":function(e,r,t){"use strict";t.d(r,"a",function(){return a});t("ac6a"),t("28a5"),t("a481");var _=t("b5c6");function a(e){var r=e.url,t=e.method,a=void 0===t?"post":t,s=e.data,o=void 0===s?{}:s,i=e.title,c=void 0===i?"":i;return console.log(r),new Promise(function(e){return Object(_["a"])({url:r,method:a,headers:{responseType:"arraybuffer"},data:o,responseType:"blob"}).then(function(r){n({title:c,response:r}).then(function(){e()})})})}function n(e){var r=e.title,t=void 0===r?"":r,_=e.response,a=s(_.headers["content-disposition"].replace(/"/g,""));return new Promise(function(e){var r=_.headers,n=new Blob([_.data],{type:r["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(n,t);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(n),s.download=t?"".concat(t,".").concat(a.suffix):a.filename,document.body.appendChild(s),s.style.display="none",s.click()}e()})}function s(e){var r={},t=e.split(";");return t.forEach(function(e){var t=e.replace(/^\s+|\s+$/g,""),_=t.split("=");_[1]?r[_[0]]=_[1]:r[_[0]]=_[0]}),r.suffix=r.filename.split(".")[1],r}},"40dd":function(e,r,t){},4917:function(e,r,t){"use strict";var _=t("cb7c"),a=t("9def"),n=t("0390"),s=t("5f1b");t("214f")("match",1,function(e,r,t,o){return[function(t){var _=e(this),a=void 0==t?void 0:t[r];return void 0!==a?a.call(t,_):new RegExp(t)[r](String(_))},function(e){var r=o(t,e,this);if(r.done)return r.value;var i=_(e),c=String(this);if(!i.global)return s(i,c);var d=i.unicode;i.lastIndex=0;var u,l=[],h=0;while(null!==(u=s(i,c))){var p=String(u[0]);l[h]=p,""===p&&(i.lastIndex=n(c,a(i.lastIndex),d)),h++}return 0===h?null:l}]})},"6c21":function(e,r,t){"use strict";t.d(r,"g",function(){return s}),t.d(r,"j",function(){return o}),t.d(r,"a",function(){return i}),t.d(r,"h",function(){return c}),t.d(r,"d",function(){return d}),t.d(r,"b",function(){return u}),t.d(r,"e",function(){return l}),t.d(r,"k",function(){return h}),t.d(r,"l",function(){return p}),t.d(r,"f",function(){return f}),t.d(r,"i",function(){return m}),t.d(r,"c",function(){return E});var _=t("b5c6"),a=t("2f9e"),n="/tmlms/ship_owner";function s(e){return Object(_["a"])({url:"".concat(n,"/page"),method:"get",params:e})}function o(e,r){return Object(_["a"])({url:"".concat(n,"/create?type=").concat(r),method:"post",data:e})}function i(e){return Object(_["a"])({url:"".concat(n,"/delete?idcard=").concat(e),method:"post"})}function c(e){return Object(_["a"])({url:"".concat(n,"/getDetail?idcard=").concat(e),method:"get"})}function d(e){return Object(_["a"])({url:"admin/region/wholeInfoList?areaCode=".concat(e),method:"get"})}function u(e,r){return Object(_["a"])({url:"".concat(n,"/edit?type=").concat(r),method:"post",data:e})}function l(e){return Object(_["a"])({url:"admin/region/wholeInfo?areaCode=".concat(e),method:"get"})}function h(e,r){return Object(_["a"])({url:"".concat(n,"/newReview?status=").concat(e,"&idcard=").concat(r),method:"post"})}function p(e){return Object(_["a"])({url:"admin/file/upload/avatar",method:"post",data:e})}function f(e){return Object(_["a"])({url:"".concat(n,"/idcardcheck"),method:"get",params:{idcard:e}})}function m(e,r){return Object(_["a"])({url:"".concat(n,"/newedit?type=").concat(r),method:"post",data:e})}function E(e){return Object(a["a"])({url:"tmlms/tybmlmsExcelExport/downloadOwner",data:e,title:"船东信息"})}},"85a6":function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("a481"),core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("6762"),core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("2fdb"),core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_2__),regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("96cf"),regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__),E_work_tyb_taoyuba_ui_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("3b8d"),core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("7f7f"),core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("ac6a"),core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("4917"),core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_7__),_api_post_address_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("23d6"),_api_tmlms_shipowner__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("6c21"),_api_login__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("7ded"),_api_hrms_databuspayload__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("b440"),vue__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("2b0e"),_mixins_information__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("e420"),vue_socket_io__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("5132"),vue_socket_io__WEBPACK_IMPORTED_MODULE_14___default=__webpack_require__.n(vue_socket_io__WEBPACK_IMPORTED_MODULE_14__);vue__WEBPACK_IMPORTED_MODULE_12__["default"].use(new vue_socket_io__WEBPACK_IMPORTED_MODULE_14___default.a({debug:!0,connection:"http://localhost:5000"})),__webpack_exports__["a"]={mixins:[_mixins_information__WEBPACK_IMPORTED_MODULE_13__["a"]],data:function(){var e=function(e,r,t){""===r?t(new Error("请输入身份证号")):r.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)?t():t(new Error("请输入正确的身份证号码!"))},r=function(e,r,t){""===r?t(new Error("请输入联系电话")):r.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?t():t(new Error("请输入正确的手机号码!"))};return{haveInfo:{phone:!1},certificateColumns:[{prop:"shipName",label:"渔船名"},{prop:"shipNo",label:"渔船编号"},{prop:"licensesFishingNo",label:"捕捞许可证编号"},{prop:"licensesOwnerShip",label:"渔船所有权登记证书"},{prop:"licensesNationalNo",label:"国籍证书编号"},{prop:"licensesInspectionNo",label:"船舶检验证书编号"}],shipowner:{shiplist:[],address:"",idcard:"",realName:"",phone:""},rules:{realName:[{required:!0,message:"请输入姓名",trigger:"blur"}],idcard:[{required:!0,message:"请输入身份证号",trigger:"blur"},{validator:e,trigger:"blur"}],address:[{required:!0,message:"请输入联系地址",trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:r,trigger:"blur"}],villageId:[{required:!0,message:"请输入所属渔村区",trigger:"blur"}]},options:[],props:{value:"areaCode",label:"name",children:"childList"},arr:[],sn:"",manager:!1,cards:"",isIdCard:!1}},methods:{save:function(){var e=this;this.$refs["form"].validate(function(r){if(!r)return!1;var t=JSON.parse(JSON.stringify(e.shipowner)),_=2;if(!0===e.isIdCard){var a=JSON.parse(JSON.stringify(t));Object(_api_tmlms_shipowner__WEBPACK_IMPORTED_MODULE_9__["i"])(a,_).then(function(r){e.$message({message:r.data.msg,type:"success"}),e.$router.go(-1)}).catch(function(r){e.$message.error(r.message)})}else{var n=JSON.parse(JSON.stringify(t));Object(_api_tmlms_shipowner__WEBPACK_IMPORTED_MODULE_9__["j"])(n,_).then(function(r){e.$message({message:r.data.msg,type:"success"}),e.$router.go(-1)}).catch(function(r){e.$message.error(r.message)})}})},handleItemChange:function(e){var r=this;Object(_api_post_address_js__WEBPACK_IMPORTED_MODULE_8__["c"])(e[e.length-1]).then(function(t){var _=t.data.data;r.getNode(r.options,e[e.length-1],_)})},getNode:function(e,r,t){var _=this;e.forEach(function(e){e.areaCode==r?(e.childList=t,e.level<3&&e.childList.forEach(function(e){void 0===e.childList&&_.$set(e,"childList",[])})):e.childList&&0!==e.childList.length&&_.getNode(e.childList,r,t)})},setData:function(e){this.shipowner.shiplist=e},getarr:function(e){this.$route.query.edit?(this.arr.push(e.areaCode),e.child&&this.getarr(e.child)):this.$route.query.see&&(this.arr instanceof Array&&(this.arr=""),this.arr="".concat(this.arr).concat(this.arr?"/":"").concat(e.name),e.child&&this.getarr(e.child))},collect:function(){var e=this;this.sn="",Object(_api_hrms_databuspayload__WEBPACK_IMPORTED_MODULE_11__["a"])({sn:this.sn}).then(function(r){e.shipowner.address=r.data.data.address,e.shipowner.idcard=r.data.data.identityNumber,e.shipowner.realName=r.data.data.name})},getAll:function(){var e=Object(E_work_tyb_taoyuba_ui_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["a"])(regeneratorRuntime.mark(function e(){var r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(_api_login__WEBPACK_IMPORTED_MODULE_10__["c"])().then(function(e){return e.data.data.roles.includes(111)?r.manager=!0:r.manager=!1,e.data.data.sysUser.userId,e.data.data.sysUser.idCard});case 2:this.cards=e.sent,this.getInformation("shipowner",["phone","realName","idCard",!0]),Object(_api_tmlms_shipowner__WEBPACK_IMPORTED_MODULE_9__["h"])(this.cards).then(function(e){e.data.data&&(r.shipowner.address=e.data.data.address,r.isIdCard=!0)});case 5:case"end":return e.stop()}},e,this)}));function r(){return e.apply(this,arguments)}return r}()},computed:{},beforeDestroy:function(){this.sockets.unsubscribe("card message")},created:function(){this.getAll()},mounted:function mounted(){var _this6=this;function Base64(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.decode=function(t){var _,a,n,s,o,i,c,d="",u=0;t=t.replace(/[^A-Za-z0-9+\/=]/g,"");while(u<t.length)s=e.indexOf(t.charAt(u++)),o=e.indexOf(t.charAt(u++)),i=e.indexOf(t.charAt(u++)),c=e.indexOf(t.charAt(u++)),_=s<<2|o>>4,a=(15&o)<<4|i>>2,n=(3&i)<<6|c,d+=String.fromCharCode(_),64!=i&&(d+=String.fromCharCode(a)),64!=c&&(d+=String.fromCharCode(n));return d=r(d),d};var r=function(e){var r="",t=0,_=0,a=0,n=0;while(t<e.length)_=e.charCodeAt(t),_<128?(r+=String.fromCharCode(_),t++):_>191&&_<224?(a=e.charCodeAt(t+1),r+=String.fromCharCode((31&_)<<6|63&a),t+=2):(a=e.charCodeAt(t+1),n=e.charCodeAt(t+2),r+=String.fromCharCode((15&_)<<12|(63&a)<<6|63&n),t+=3);return r}}this.$socket.emit("connect"),this.$socket.emit("startRead"),this.sockets.subscribe("card message",function(msg){var base=new Base64,result1=base.decode(msg),data=eval("("+result1+")");_this6.$set(_this6.shipowner,"realName",data.name),_this6.$set(_this6.shipowner,"idcard",data.cardno),_this6.$set(_this6.shipowner,"address",data.address)})}}},b440:function(e,r,t){"use strict";t.d(r,"a",function(){return n});var _=t("b5c6"),a="/tybhrms/databuspayload";function n(e){return Object(_["a"])({url:"".concat(a,"/getlast"),method:"get",params:e})}},e420:function(e,r,t){"use strict";t("7f7f");var _=t("7ded");r["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(e,r){var t=this;Object(_["c"])().then(function(_){-1===_.data.data.roles.indexOf(1)&&-1===_.data.data.roles.indexOf(111)&&(_.data.data.sysUser.phone&&(t.$set(t.haveInfo,"phone",!0),t[e][r[0]]=_.data.data.sysUser.phone),_.data.data.sysUser.realName&&(t.$set(t.haveInfo,"realName",!0),t[e][r[1]]=_.data.data.sysUser.realName),_.data.data.sysUser.idCard&&[r[2]]&&(t.$set(t.haveInfo,"idcard",!0),t[e].idcard=_.data.data.sysUser.idCard))})}}}},e749:function(e,r,t){"use strict";var _=t("40dd"),a=t.n(_);a.a}}]);