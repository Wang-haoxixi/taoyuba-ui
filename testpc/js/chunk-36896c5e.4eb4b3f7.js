(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36896c5e"],{"01e9":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:"船员信息",backOption:t.backOption}}),r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"140px",size:"small",disabled:""}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"个人姓名：",prop:"realName"}},[r("el-input",{model:{value:t.form.realName,callback:function(e){t.$set(t.form,"realName",e)},expression:"form.realName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"性别",prop:"gender"}},[r("el-radio",{attrs:{label:1},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}},[t._v("男")]),r("el-radio",{attrs:{label:2},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}},[t._v("女")])],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证号码：",prop:"idcard"}},[r("el-input",{model:{value:t.form.idcard,callback:function(e){t.$set(t.form,"idcard",e)},expression:"form.idcard"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"birthday","label-name":"出生日期"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.birthday,callback:function(e){t.$set(t.form,"birthday",e)},expression:"form.birthday"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"地址："}},[r("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"省级地区"},on:{change:function(e){return t.choseProvince(t.form.provinceId)}},model:{value:t.form.provinceId,callback:function(e){t.$set(t.form,"provinceId",e)},expression:"form.provinceId"}},t._l(t.province,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.areaCode,prop:"provinceId"}})}),1),r("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"市级地区"},on:{change:function(e){return t.choseCity(t.form.cityId)}},model:{value:t.form.cityId,callback:function(e){t.$set(t.form,"cityId",e)},expression:"form.cityId"}},t._l(t.city,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.areaCode,prop:"cityId"}})}),1),r("el-select",{staticStyle:{width:"33%!important"},attrs:{placeholder:"区级地区"},on:{change:function(e){return t.choseDistrict(t.form.districtId)}},model:{value:t.form.districtId,callback:function(e){t.$set(t.form,"districtId",e)},expression:"form.districtId"}},t._l(t.district,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.areaCode,prop:"districtId"}})}),1)],1)],1),r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"国籍",prop:"nationality"}},[r("el-input",{model:{value:t.form.nationality,callback:function(e){t.$set(t.form,"nationality",e)},expression:"form.nationality"}})],1)],1),r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"名族",prop:"nation"}},[r("el-select",{attrs:{placeholder:"请输入名族"},model:{value:t.form.nation,callback:function(e){t.$set(t.form,"nation",e)},expression:"form.nation"}},t._l(t.nationals,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭地址：",prop:"address"}},[r("el-input",{model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[r("el-input",{model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭联系人：",prop:"contactName"}},[r("el-input",{model:{value:t.form.contactName,callback:function(e){t.$set(t.form,"contactName",e)},expression:"form.contactName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭联系电话",prop:"contactPhone"}},[r("el-input",{model:{value:t.form.contactPhone,callback:function(e){t.$set(t.form,"contactPhone",e)},expression:"form.contactPhone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船民证号码",prop:"crewCert"}},[r("el-input",{model:{value:t.form.crewCert,callback:function(e){t.$set(t.form,"crewCert",e)},expression:"form.crewCert"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"certExpDate","label-name":"船民证有效期限"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.certExpDate,callback:function(e){t.$set(t.form,"certExpDate",e)},expression:"form.certExpDate"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"职位",prop:"positionId"}},[r("el-select",{attrs:{placeholder:"职位"},model:{value:t.form.positionId,callback:function(e){t.$set(t.form,"positionId",e)},expression:"form.positionId"}},t._l(t.position,function(t){return r("el-option",{key:t.id,attrs:{label:t.label,value:t.value}})}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证正面照片：",prop:"photoFront"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccessFront,headers:t.headers,accept:"image/*"}},[t.form.photoFront?r("img",{staticClass:"avatar",attrs:{src:t.form.photoFront}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证反面照片：",prop:"photoReverse"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccessReverse,headers:t.headers,accept:"image/*"}},[t.form.photoReverse?r("img",{staticClass:"avatar",attrs:{src:t.form.photoReverse}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),r("iep-form-item",{staticClass:"form-half",attrs:{prop:"remark","label-name":"备注信息",tip:"请输入备注信息"}},[r("iep-input-area",{model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1)],1)],1)},o=[],n=r("c533b"),i=r("b0ed"),c={data:function(){var t=this;return{dictsMap:i["c"],backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},rules:i["g"],form:Object(i["e"])(),province:[],city:[],district:[],village:[],parentCode:0,position:[],regions:{province:[],city:[],district:[],town:[],village:[]},regionChosen:{province:"",city:"",district:"",town:"",village:"",shipId:""},dicID:"tyb_resume_position"}},computed:{userId:function(){return+this.$route.params.userId},methodName:function(){return this.userId?"编辑":"发布"}},created:function(){var t=this;this.getRogionList(0,"province"),this.userId?Object(n["e"])(this.userId).then(function(e){var r=e.data;t.form=t.$mergeByFirst(Object(i["e"])(),r.data);var a=t.form.villageId,o=t.form.districtId,n=t.form.cityId,c=t.form.provinceId;t.getAllInfo(a,4),t.getAllInfo(o,3),t.getAllInfo(n,2),t.getAllInfo(c,1)}):this.init=!0,Object(n["d"])(this.parentCode).then(function(e){var r=e.data;t.province=r.data}),Object(n["f"])(this.dicID).then(function(e){var r=e.data;t.position=r.data})},mounted:function(){var t=this;if(this.$route.query.position){var e=this.$route.query.position.map(function(t){return+t})||[];this.form.position=e||[],setTimeout(function(){t.$refs["IepCascader"].handleChange(e)},2e3)}},watch:{"regionChosen.province":function(t){this.init&&(this.regionChosen.city="",this.regionChosen.district="",this.regionChosen.town="",this.regionChosen.village=""),this.regions.city=[],this.regions.district=[],this.regions.town=[],this.regions.village=[],t&&this.getRogionList(t,"city")},"regionChosen.city":function(t){this.init&&(this.regionChosen.district="",this.regionChosen.town="",this.regionChosen.village=""),this.regions.district=[],this.regions.town=[],this.regions.village=[],t&&this.getRogionList(t,"district")},"regionChosen.district":function(t){this.init&&(this.regionChosen.town="",this.regionChosen.village=""),this.regions.town=[],this.regions.village=[],t&&this.getRogionList(t,"town")},"regionChosen.town":function(t){this.init&&(this.regionChosen.village=""),this.regions.village=[],t&&this.getRogionList(t,"village")},"regionChosen.village":function(t){this.form.villageId=t}},methods:{getRogionList:function(t,e){var r=this;Object(n["h"])(t).then(function(t){var a=t.data;0===a.code&&(r.regions[e]=a.data)},function(t){r.$message.error(t.message)})},getAllInfo:function(t,e){var r=this;Object(n["i"])(t).then(function(t){var a=t.data;1==e?r.province.push(a.data):2==e?r.city.push(a.data):3==e?r.district.push(a.data):r.village.push(a.data)})},choseProvince:function(t){var e=this;this.form.cityId="",this.form.districtId="",this.form.villageId="",Object(n["d"])(t).then(function(t){var r=t.data;e.city=r.data})},choseCity:function(t){var e=this;Object(n["d"])(t).then(function(t){var r=t.data;e.district=r.data})},choseDistrict:function(t){var e=this;Object(n["d"])(t).then(function(t){var r=t.data;e.village=r.data})},onGoBack:function(){this.$router.push({path:"/hrms_spa/crew_admin_list"})},handleSubmit:function(){var t=this,e=this.userId?n["j"]:n["a"];this.$refs["form"].validate(function(r){r&&e(Object(i["d"])(t.form)).then(function(e){var r=e.data;r.data&&(t.$message({message:"操作成功",type:"success"}),t.onGoBack())},function(e){t.$message.error(e.message)})})}}},s=c,l=(r("88d8"),r("0c7c")),d=Object(l["a"])(s,a,o,!1,null,"09d3bca9",null);e["default"]=d.exports},4917:function(t,e,r){"use strict";var a=r("cb7c"),o=r("9def"),n=r("0390"),i=r("5f1b");r("214f")("match",1,function(t,e,r,c){return[function(r){var a=t(this),o=void 0==r?void 0:r[e];return void 0!==o?o.call(r,a):new RegExp(r)[e](String(a))},function(t){var e=c(r,t,this);if(e.done)return e.value;var s=a(t),l=String(this);if(!s.global)return i(s,l);var d=s.unicode;s.lastIndex=0;var u,p=[],m=0;while(null!==(u=i(s,l))){var f=String(u[0]);p[m]=f,""===f&&(s.lastIndex=n(l,o(s.lastIndex),d)),m++}return 0===m?null:p}]})},"84df":function(t,e,r){"use strict";r.d(e,"a",function(){return n});var a=r("c1df"),o=r.n(a),n=function(){return o()().format("YYYY-MM-DD HH:mm:ss")}},"88d8":function(t,e,r){"use strict";var a=r("fe59"),o=r.n(a);o.a},b0ed:function(t,e,r){"use strict";r.d(e,"b",function(){return c}),r.d(e,"c",function(){return i}),r.d(e,"g",function(){return p}),r.d(e,"e",function(){return l}),r.d(e,"d",function(){return h}),r.d(e,"f",function(){return m}),r.d(e,"h",function(){return g}),r.d(e,"a",function(){return s});r("4917");var a=r("0e0b"),o=r("84df"),n=r("7ded"),i={isTrain:{0:"否",1:"是"}},c=[{prop:"userId",label:"用户ID"},{prop:"realName",label:"联系人"},{prop:"address",label:"地址"},{prop:"contactName",label:"联系人"},{prop:"remark",label:"备注"},{prop:"phone",label:"电话号码"}],s=[{prop:"certType",label:"证书种类",dictName:"tyb_crew_cert_type",type:"dict"},{prop:"certLevel",label:"证书等级",dictName:"tyb_crew_cert_level",type:"dict"},{prop:"certTitle",label:"证书职务",dictName:"tyb_crew_cert_title",type:"dict"},{prop:"certNo",label:"证书编号"},{prop:"certDateIssue",label:"有效起始日期",type:"date"},{prop:"certDateExpire",label:"有效终止日期",type:"date"},{prop:"certFile",label:"附件",type:"file"}],l=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(o["a"])(),updateTime:Object(o["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"中国",nation:"",applyType:1,isTrain:0}},d=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(o["a"])(),updateTime:Object(o["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:"",nationality:"",nation:"",applyType:1,isTrain:0}},u=function(t,e,r){""===e?r(new Error("请输入联系电话")):e.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)?Object(n["l"])(e).then(function(t){t.data.data?r():r(new Error(t.data.msg))}):r(new Error("请输入正确的手机号码!"))},p={realName:[{required:!0,message:"请填写个人姓名",trigger:"blur"}],contactName:[{required:!0,message:"请填联系人",trigger:"blur"}],gender:[{required:!0,message:"请填写性别",trigger:"blur"}],idcard:[{required:!0,message:"请填写身份证信息",trigger:"blur"}],birthday:[{required:!0,message:"请填写生日信息",trigger:"blur"}],phone:[{required:!0,message:"请填写联系电话",trigger:"blur"},{validator:u,trigger:"blur"}]},m=function(){return{contactName:"",positionName:""}},f=function(){return{contactName:"",positionName:""}},h=function(t){var e=Object(a["g"])(d(),t);return e},g=function(t){var e=Object(a["g"])(f(),t);return e.contactName=t.contactName?t.contactName:null,e.positionName=t.positionName?t.positionName:null,e}},c533b:function(t,e,r){"use strict";r.d(e,"i",function(){return c}),r.d(e,"f",function(){return s}),r.d(e,"d",function(){return l}),r.d(e,"g",function(){return d}),r.d(e,"c",function(){return u}),r.d(e,"a",function(){return p}),r.d(e,"e",function(){return m}),r.d(e,"j",function(){return f}),r.d(e,"h",function(){return h}),r.d(e,"b",function(){return g});var a=r("b5c6"),o="tmlms/crew",n="admin/region",i="admin/dict";function c(t){return Object(a["a"])({url:"".concat(n,"/getinfo/")+t,method:"get"})}function s(t){return Object(a["a"])({url:"".concat(i,"/type/")+t,method:"get"})}function l(t){return Object(a["a"])({url:"".concat(n,"/area"),method:"get",params:{parentCode:t}})}function d(t){return Object(a["a"])({url:"".concat(o,"/Page"),method:"get",params:t})}function u(t){return Object(a["a"])({url:"".concat(o,"/delete"),method:"post",params:{userId:t}})}function p(t){return Object(a["a"])({url:"".concat(o,"/create"),method:"post",data:t,params:{type:1}})}function m(t){return Object(a["a"])({url:"".concat(o,"/getCrewByUserId"),method:"get",params:{userId:t}})}function f(t){return Object(a["a"])({url:"".concat(o,"/edit"),method:"post",params:{type:1},data:t})}function h(t){return Object(a["a"])({url:"/tybship/tybregion/parent/".concat(t),method:"get"})}function g(t,e,r){return Object(a["a"])({url:"".concat(o,"/upWork?idcard=").concat(e,"&workStatus=").concat(r),method:"post",data:t})}},fe59:function(t,e,r){}}]);