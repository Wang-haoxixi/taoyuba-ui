(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8bdb6a46"],{"113c":function(e,t,a){},4525:function(e,t,a){"use strict";a.d(t,"h",function(){return i}),a.d(t,"i",function(){return o}),a.d(t,"b",function(){return c}),a.d(t,"d",function(){return s}),a.d(t,"f",function(){return l}),a.d(t,"e",function(){return d}),a.d(t,"c",function(){return _}),a.d(t,"g",function(){return u}),a.d(t,"a",function(){return m});var r=a("b5c6"),n="tmlms/crew_cert";function i(e){return Object(r["a"])({url:"".concat(n,"/create"),method:"post",data:e})}function o(e){return Object(r["a"])({url:"".concat(n,"/edit"),method:"post",data:e})}function c(e){return Object(r["a"])({url:"".concat(n,"/remove"),method:"post",params:{certId:e}})}function s(e){return Object(r["a"])({url:"".concat(n,"/detail"),method:"get",params:{certId:e}})}function l(e){return Object(r["a"])({url:"".concat(n,"/myCerts"),method:"get",params:{userId:e}})}function d(e,t){return Object(r["a"])({url:"".concat(n,"/getPage"),method:"get",params:e,data:t})}function _(e){return Object(r["a"])({url:"".concat(n,"/")+e,method:"post",data:e})}function u(e){return Object(r["a"])({url:"".concat(n,"/mycertlist"),method:"get",params:{idcard:e}})}function m(e){return Object(r["a"])({url:"".concat(n,"/certStandard/")+e,method:"get"})}},4917:function(e,t,a){"use strict";var r=a("cb7c"),n=a("9def"),i=a("0390"),o=a("5f1b");a("214f")("match",1,function(e,t,a,c){return[function(a){var r=e(this),n=void 0==a?void 0:a[t];return void 0!==n?n.call(a,r):new RegExp(a)[t](String(r))},function(e){var t=c(a,e,this);if(t.done)return t.value;var s=r(e),l=String(this);if(!s.global)return o(s,l);var d=s.unicode;s.lastIndex=0;var _,u=[],m=0;while(null!==(_=o(s,l))){var p=String(_[0]);u[m]=p,""===p&&(s.lastIndex=i(l,n(s.lastIndex),d)),m++}return 0===m?null:u}]})},"6428d":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"iep-page-form"},[a("basic-container",[a("page-header",{attrs:{title:e.methodName+"船员信息",backOption:e.backOption}}),a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"个人姓名：",prop:"realName"}},[a("el-input",{model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-radio",{attrs:{label:1},model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[e._v("男")]),a("el-radio",{attrs:{label:2},model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[e._v("女")])],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"身份证号码：",prop:"idcard"}},[a("el-input",{model:{value:e.form.idcard,callback:function(t){e.$set(e.form,"idcard",t)},expression:"form.idcard"}})],1)],1),a("el-col",{attrs:{span:12}},[a("iep-form-item",{staticClass:"form-half",attrs:{prop:"birthday","label-name":"出生日期"}},[a("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"地址："}},[a("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"省级地区"},on:{change:function(t){return e.choseProvince(e.form.provinceId)}},model:{value:e.form.provinceId,callback:function(t){e.$set(e.form,"provinceId",t)},expression:"form.provinceId"}},e._l(e.province,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.areaCode,prop:"provinceId"}})}),1),a("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"市级地区"},on:{change:function(t){return e.choseCity(e.form.cityId)}},model:{value:e.form.cityId,callback:function(t){e.$set(e.form,"cityId",t)},expression:"form.cityId"}},e._l(e.city,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.areaCode,prop:"cityId"}})}),1),a("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"区级地区"},on:{change:function(t){return e.choseDistrict(e.form.districtId)}},model:{value:e.form.districtId,callback:function(t){e.$set(e.form,"districtId",t)},expression:"form.districtId"}},e._l(e.district,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.areaCode,prop:"districtId"}})}),1)],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"国籍",prop:"nationality"}},[a("el-input",{model:{value:e.form.nationality,callback:function(t){e.$set(e.form,"nationality",t)},expression:"form.nationality"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"名族",prop:"nation"}},[a("el-select",{attrs:{placeholder:"请输入名族"},model:{value:e.form.nation,callback:function(t){e.$set(e.form,"nation",t)},expression:"form.nation"}},e._l(e.nationals,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})}),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"家庭地址：",prop:"address"}},[a("el-input",{model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[a("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"家庭联系人：",prop:"contactName"}},[a("el-input",{model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"家庭联系电话",prop:"contactPhone"}},[a("el-input",{model:{value:e.form.contactPhone,callback:function(t){e.$set(e.form,"contactPhone",t)},expression:"form.contactPhone"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"船民证号码",prop:"crewCert"}},[a("el-input",{model:{value:e.form.crewCert,callback:function(t){e.$set(e.form,"crewCert",t)},expression:"form.crewCert"}})],1)],1),a("el-col",{attrs:{span:12}},[a("iep-form-item",{staticClass:"form-half",attrs:{prop:"certExpDate","label-name":"船民证有效期限"}},[a("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.certExpDate,callback:function(t){e.$set(e.form,"certExpDate",t)},expression:"form.certExpDate"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"职位",prop:"positionId"}},[a("el-select",{attrs:{placeholder:"职位"},model:{value:e.form.positionId,callback:function(t){e.$set(e.form,"positionId",t)},expression:"form.positionId"}},e._l(e.position,function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}),1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"是否需要培训",prop:"isTrain"}},[a("el-radio-group",{model:{value:e.form.isTrain,callback:function(t){e.$set(e.form,"isTrain",t)},expression:"form.isTrain"}},e._l(e.dictsMap.isTrain,function(t,r){return a("el-radio",{key:r,attrs:{label:+r}},[e._v(e._s(t))])}),1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"申请类别",prop:"applyType"}},[a("el-select",{attrs:{placeholder:"请输入申请类别"},model:{value:e.form.applyType,callback:function(t){e.$set(e.form,"applyType",t)},expression:"form.applyType"}},e._l(e.applyTypes,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"身份证正面照片：",prop:"photoFront"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":e.handleAvatarSuccessFront,headers:e.headers,accept:"image/*"}},[e.form.photoFront?a("img",{staticClass:"avatar",attrs:{src:e.form.photoFront}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"身份证反面照片：",prop:"photoReverse"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":e.handleAvatarSuccessReverse,headers:e.headers,accept:"image/*"}},[e.form.photoReverse?a("img",{staticClass:"avatar",attrs:{src:e.form.photoReverse}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),a("iep-form-item",{staticClass:"form-half",attrs:{prop:"remark","label-name":"备注信息",tip:"请输入备注信息"}},[a("iep-input-area",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),a("el-form-item",{attrs:{label:""}},[a("operation-wrapper",[a("iep-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)],1)],1)],1)},n=[],i=a("e8ba"),o=i["a"],c=(a("6448"),a("2877")),s=Object(c["a"])(o,r,n,!1,null,null,null);t["default"]=s.exports},6448:function(e,t,a){"use strict";a("113c")},"84df":function(e,t,a){"use strict";a.d(t,"a",function(){return i});var r=a("c1df"),n=a.n(r),i=function(){return n()().format("YYYY-MM-DD HH:mm:ss")}},b0ed:function(e,t,a){"use strict";a.d(t,"b",function(){return c}),a.d(t,"c",function(){return o}),a.d(t,"g",function(){return u}),a.d(t,"e",function(){return l}),a.d(t,"d",function(){return f}),a.d(t,"f",function(){return m}),a.d(t,"h",function(){return h}),a.d(t,"a",function(){return s});a("4917");var r=a("0e0b"),n=a("84df"),i=a("7ded"),o={isTrain:{0:"否",1:"是"}},c=[{prop:"userId",label:"用户ID"},{prop:"realName",label:"联系人"},{prop:"address",label:"地址"},{prop:"contactName",label:"联系人"},{prop:"remark",label:"备注"},{prop:"phone",label:"电话号码"}],s=[{prop:"certType",label:"证书种类",dictName:"tyb_crew_cert_type",type:"dict"},{prop:"certLevel",label:"证书等级",dictName:"tyb_crew_cert_level",type:"dict"},{prop:"certTitle",label:"证书职务",dictName:"tyb_crew_cert_title",type:"dict"},{prop:"certNo",label:"证书编号"},{prop:"certDateIssue",label:"有效起始日期",type:"date"},{prop:"certDateExpire",label:"有效终止日期",type:"date"},{prop:"certFile",label:"附件",type:"file"}],l=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(n["a"])(),updateTime:Object(n["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"中国",nation:"",applyType:1,isTrain:0}},d=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(n["a"])(),updateTime:Object(n["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"",nation:"",applyType:1,isTrain:0}},_=function(e,t,a){""===t?a(new Error("请输入联系电话")):t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)?Object(i["l"])(t).then(function(e){e.data.data?a():a(new Error(e.data.msg))}):a(new Error("请输入正确的手机号码!"))},u={realName:[{required:!0,message:"请填写个人姓名",trigger:"blur"}],contactName:[{required:!0,message:"请填联系人",trigger:"blur"}],gender:[{required:!0,message:"请填写性别",trigger:"blur"}],idcard:[{required:!0,message:"请填写身份证信息",trigger:"blur"}],birthday:[{required:!0,message:"请填写生日信息",trigger:"blur"}],phone:[{required:!0,message:"请填写联系电话",trigger:"blur"},{validator:_,trigger:"blur"}]},m=function(){return{contactName:"",positionName:""}},p=function(){return{contactName:"",positionName:""}},f=function(e){var t=Object(r["g"])(d(),e);return t},h=function(e){var t=Object(r["g"])(p(),e);return t.contactName=e.contactName?e.contactName:null,t.positionName=e.positionName?e.positionName:null,t}},c533b:function(e,t,a){"use strict";a.d(t,"i",function(){return c}),a.d(t,"f",function(){return s}),a.d(t,"d",function(){return l}),a.d(t,"g",function(){return d}),a.d(t,"c",function(){return _}),a.d(t,"a",function(){return u}),a.d(t,"e",function(){return m}),a.d(t,"j",function(){return p}),a.d(t,"h",function(){return f}),a.d(t,"b",function(){return h});var r=a("b5c6"),n="tmlms/crew",i="admin/region",o="admin/dict";function c(e){return Object(r["a"])({url:"".concat(i,"/getinfo/")+e,method:"get"})}function s(e){return Object(r["a"])({url:"".concat(o,"/type/")+e,method:"get"})}function l(e){return Object(r["a"])({url:"".concat(i,"/area"),method:"get",params:{parentCode:e}})}function d(e){return Object(r["a"])({url:"".concat(n,"/Page"),method:"get",params:e})}function _(e){return Object(r["a"])({url:"".concat(n,"/delete"),method:"post",params:{userId:e}})}function u(e){return Object(r["a"])({url:"".concat(n,"/create"),method:"post",data:e,params:{type:1}})}function m(e){return Object(r["a"])({url:"".concat(n,"/getCrewByUserId"),method:"get",params:{userId:e}})}function p(e){return Object(r["a"])({url:"".concat(n,"/edit"),method:"post",params:{type:1},data:e})}function f(e){return Object(r["a"])({url:"/tybship/tybregion/parent/".concat(e),method:"get"})}function h(e,t,a){return Object(r["a"])({url:"".concat(n,"/upWork?idcard=").concat(t,"&workStatus=").concat(a),method:"post",data:e})}},e8ba:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("a481"),core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("7f7f"),core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__),_api_post_admin__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("c533b"),_api_post_cert__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("4525"),_options__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("b0ed"),vue_socket_io__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("5132"),vue_socket_io__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(vue_socket_io__WEBPACK_IMPORTED_MODULE_5__),vue__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("2b0e");vue__WEBPACK_IMPORTED_MODULE_6__["default"].use(new vue_socket_io__WEBPACK_IMPORTED_MODULE_5___default.a({debug:!0,connection:"http://localhost:5000"})),__webpack_exports__["a"]={data:function(){var e=this;return{dictsMap:_options__WEBPACK_IMPORTED_MODULE_4__["c"],backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},rules:_options__WEBPACK_IMPORTED_MODULE_4__["g"],form:Object(_options__WEBPACK_IMPORTED_MODULE_4__["e"])(),province:[],city:[],district:[],village:[],parentCode:0,position:[],regions:{province:[],city:[],district:[],town:[],village:[]},regionChosen:{province:"",city:"",district:"",town:"",village:"",shipId:""},dicID:"tyb_resume_position",nationals:[{id:1,name:"汉族"},{id:2,name:"蒙古族"},{id:3,name:"回族"},{id:4,name:"藏族"},{id:5,name:"维吾尔族"},{id:6,name:"苗族"},{id:7,name:"彝族"},{id:8,name:"壮族"},{id:9,name:"布依族"},{id:10,name:"朝鲜族"},{id:11,name:"满族"},{id:12,name:"侗族"},{id:13,name:"瑶族"},{id:14,name:"白族"},{id:15,name:"土家族"},{id:16,name:"哈尼族"},{id:17,name:"哈萨克族"},{id:18,name:"傣族"},{id:19,name:"黎族"},{id:20,name:"傈僳族"},{id:21,name:"佤族"},{id:22,name:"畲族"},{id:23,name:"高山族"},{id:24,name:"拉祜族"},{id:25,name:"水族"},{id:26,name:"东乡族"},{id:27,name:"纳西族"},{id:28,name:"景颇族"},{id:29,name:"柯尔克孜族"},{id:30,name:"土族"},{id:31,name:"达翰尔族"},{id:32,name:"么佬族"},{id:33,name:"羌族"},{id:34,name:"布朗族"},{id:35,name:"撒拉族"},{id:36,name:"毛南族"},{id:37,name:"仡佬族"},{id:38,name:"锡伯族"},{id:39,name:"阿昌族"},{id:40,name:"普米族"},{id:41,name:"塔吉克族"},{id:42,name:"怒族"},{id:43,name:"乌孜别克族"},{id:44,name:"俄罗斯族"},{id:45,name:"鄂温克族"},{id:46,name:"德昂族"},{id:47,name:"保安族"},{id:48,name:"裕固族"},{id:49,name:"京族"},{id:50,name:"塔塔尔族"},{id:51,name:"独龙族"},{id:52,name:"鄂伦春族"},{id:53,name:"赫哲族"},{id:54,name:"门巴族"},{id:55,name:"珞巴族"},{id:56,name:"基诺族"},{id:57,name:"穿青人"}],applyTypes:[{id:1,name:"以旧换新"},{id:2,name:"普通船员"},{id:3,name:"职务船员"},{id:4,name:"证书换发"},{id:5,name:"证书补发"},{id:6,name:"其他"}],certificateColumns:_options__WEBPACK_IMPORTED_MODULE_4__["a"],tableData:[]}},computed:{userId:function(){return+this.$route.params.userId},methodName:function(){return this.userId?"编辑":"发布"}},created:function(){var e=this;this.getRogionList(0,"province"),this.userId?Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["e"])(this.userId).then(function(t){var a=t.data;console.log(a),e.form=e.$mergeByFirst(Object(_options__WEBPACK_IMPORTED_MODULE_4__["e"])(),a.data);var r=e.form.villageId,n=e.form.districtId,i=e.form.cityId,o=e.form.provinceId;e.getAllInfo(r,4),e.getAllInfo(n,3),e.getAllInfo(i,2),e.getAllInfo(o,1)}):this.init=!0,Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["d"])(this.parentCode).then(function(t){var a=t.data;e.province=a.data}),Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["f"])(this.dicID).then(function(t){var a=t.data;e.position=a.data}),this.getCerts()},mounted:function mounted(){var _this3=this;if(this.$socket.emit("connect"),this.$socket.emit("startRead"),this.sockets.subscribe("card message",function(msg){var base=new Base64,result1=base.decode(msg),data=eval("("+result1+")");_this3.form.realName=data.name,_this3.form.birthday=data.born.slice(0,4)+"-"+data.born.slice(4,6)+"-"+data.born.slice(6),_this3.form.idcard=data.cardno,_this3.form.address=data.address,_this3.form.nation=data.nation,_this3.form.gender="男"==data.sex?1:2,_this3.form.nationality="中国"}),this.$route.query.position){var position=this.$route.query.position.map(function(e){return+e})||[];this.form.position=position||[],setTimeout(function(){_this3.$refs["IepCascader"].handleChange(position)},2e3)}function Base64(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.decode=function(a){var r,n,i,o,c,s,l,d="",_=0;a=a.replace(/[^A-Za-z0-9+/=]/g,"");while(_<a.length)o=e.indexOf(a.charAt(_++)),c=e.indexOf(a.charAt(_++)),s=e.indexOf(a.charAt(_++)),l=e.indexOf(a.charAt(_++)),r=o<<2|c>>4,n=(15&c)<<4|s>>2,i=(3&s)<<6|l,d+=String.fromCharCode(r),64!=s&&(d+=String.fromCharCode(n)),64!=l&&(d+=String.fromCharCode(i));return d=t(d),d};var t=function(e){var t="",a=0,r=0,n=0,i=0;while(a<e.length)r=e.charCodeAt(a),r<128?(t+=String.fromCharCode(r),a++):r>191&&r<224?(n=e.charCodeAt(a+1),t+=String.fromCharCode((31&r)<<6|63&n),a+=2):(n=e.charCodeAt(a+1),i=e.charCodeAt(a+2),t+=String.fromCharCode((15&r)<<12|(63&n)<<6|63&i),a+=3);return t}}},watch:{"regionChosen.province":function(e){this.init&&(this.regionChosen.city="",this.regionChosen.district="",this.regionChosen.town="",this.regionChosen.village=""),this.regions.city=[],this.regions.district=[],this.regions.town=[],this.regions.village=[],e&&this.getRogionList(e,"city")},"regionChosen.city":function(e){this.init&&(this.regionChosen.district="",this.regionChosen.town="",this.regionChosen.village=""),this.regions.district=[],this.regions.town=[],this.regions.village=[],e&&this.getRogionList(e,"district")},"regionChosen.district":function(e){this.init&&(this.regionChosen.town="",this.regionChosen.village=""),this.regions.town=[],this.regions.village=[],e&&this.getRogionList(e,"town")},"regionChosen.town":function(e){this.init&&(this.regionChosen.village=""),this.regions.village=[],e&&this.getRogionList(e,"village")},"regionChosen.village":function(e){this.form.villageId=e},"form.idcard":{handler:function(e){if(18===e.length){var t=e.substr(6,8).replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3");this.form.birthday=t}},deep:!0}},methods:{getRogionList:function(e,t){var a=this;Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["h"])(e).then(function(e){var r=e.data;0===r.code&&(a.regions[t]=r.data)},function(e){a.$message.error(e.message)})},clickButton:function(e){this.$socket.emit("connect",e)},getAllInfo:function(e,t){var a=this;Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["i"])(e).then(function(e){var r=e.data;1==t?a.province.push(r.data):2==t?a.city.push(r.data):3==t?a.district.push(r.data):a.village.push(r.data)})},choseProvince:function(e){var t=this;this.form.cityId="",this.form.districtId="",this.form.villageId="",Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["d"])(e).then(function(e){var a=e.data;t.city=a.data})},choseCity:function(e){var t=this;Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["d"])(e).then(function(e){var a=e.data;t.district=a.data})},choseDistrict:function(e){var t=this;Object(_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["d"])(e).then(function(e){var a=e.data;t.village=a.data})},onGoBack:function(){this.$router.push({path:"/hrms_spa/crew_admin_list"})},handleSubmit:function(){var e=this,t=this.userId?_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["j"]:_api_post_admin__WEBPACK_IMPORTED_MODULE_2__["a"];this.$refs["form"].validate(function(a){a&&t(Object(_options__WEBPACK_IMPORTED_MODULE_4__["d"])(e.form)).then(function(t){var a=t.data;a.data&&(e.$message({message:"操作成功",type:"success"}),e.onGoBack())},function(t){e.$message.error(t.message)})})},getCerts:function(){var e=this;Object(_api_post_cert__WEBPACK_IMPORTED_MODULE_3__["f"])(this.userId).then(function(t){var a=t.data;e.tableData=a.data})}}}}}]);