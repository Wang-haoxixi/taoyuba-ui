(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d7716c9"],{"2a8c":function(e,t,r){"use strict";r.d(t,"a",function(){return c}),r.d(t,"b",function(){return n}),r.d(t,"f",function(){return s}),r.d(t,"d",function(){return i}),r.d(t,"c",function(){return d}),r.d(t,"e",function(){return u}),r.d(t,"g",function(){return p});var a=r("0e0b"),o=r("84df"),n={},c=[{prop:"realName",label:"联系人"},{prop:"address",label:"地址"},{prop:"contactName",label:"联系人"},{prop:"remark",label:"备注"},{prop:"phone",label:"电话号码"}],i=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(o["a"])(),updateTime:Object(o["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:""}},l=function(){return{realName:"",gender:"",idcard:"",birthday:"",address:"",phone:"",contactName:"",contactPhone:"",crewCert:"",certExpDate:"",createTime:Object(o["a"])(),updateTime:Object(o["a"])(),remark:"",fourSmallCard:"",provinceId:"",cityId:"",districtId:"",villageId:"",positionId:"",shipId:0,userId:""}},s={realName:[{required:!0,message:"请填写个人姓名",trigger:"blur"}],contactName:[{required:!0,message:"请填联系人",trigger:"blur"}],gender:[{required:!0,message:"请填写性别",trigger:"blur"}],idcard:[{required:!0,message:"请填写身份证信息",trigger:"blur"}],birthday:[{required:!0,message:"请填写生日信息",trigger:"blur"}]},u=function(){return{contactName:"",positionName:""}},m=function(){return{contactName:"",positionName:""}},d=function(e){var t=Object(a["g"])(l(),e);return t},p=function(e){var t=Object(a["g"])(m(),e);return t.contactName=e.contactName?e.contactName:null,t.positionName=e.positionName?e.positionName:null,t}},"84df":function(e,t,r){"use strict";r.d(t,"a",function(){return n});var a=r("c1df"),o=r.n(a),n=function(){return o()().format("YYYY-MM-DD HH:mm:ss")}},a1ae:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:e.查看船员信息,backOption:e.backOption}}),r("el-form",{ref:"form",attrs:{disabled:"",model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"个人姓名：",prop:"realName"}},[r("el-input",{model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"性别",prop:"gender"}},[r("el-input",{model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证号码：",prop:"idcard"}},[r("el-input",{model:{value:e.form.idcard,callback:function(t){e.$set(e.form,"idcard",t)},expression:"form.idcard"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"出生日期",prop:"birthday"}},[r("el-input",{model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭地址：",prop:"address"}},[r("el-input",{model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[r("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭联系人：",prop:"contactName"}},[r("el-input",{model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭联系电话",prop:"ontactPhone"}},[r("el-input",{model:{value:e.form.ontactPhone,callback:function(t){e.$set(e.form,"ontactPhone",t)},expression:"form.ontactPhone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"createTime","label-name":"开始时间"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.createTime,callback:function(t){e.$set(e.form,"createTime",t)},expression:"form.createTime"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"updateTime","label-name":"更新时间",tip:"此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.updateTime,callback:function(t){e.$set(e.form,"updateTime",t)},expression:"form.updateTime"}})],1)],1)],1),r("iep-form-item",{staticClass:"form-half",attrs:{prop:"remark","label-name":"备注信息",tip:"请输入备注信息"}},[r("iep-input-area",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1)],1)},o=[],n=(r("6b54"),r("c726")),c=r("2a8c"),i={data:function(){var e=this;return{dictsMap:c["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},rules:c["f"],form:Object(c["d"])()}},computed:{userId:function(){return+this.$route.params.userId}},created:function(){var e=this;this.userId&&Object(n["d"])(this.userId).then(function(t){var r=t.data;e.form=e.$mergeByFirst(Object(c["d"])(),r.data),e.form.settlement=e.form.settlement.toString(),e.form.workCls=e.form.workCls.toString()})},mounted:function(){var e=this;if(this.$route.query.position){var t=this.$route.query.position.map(function(e){return+e})||[];this.form.position=t||[],setTimeout(function(){e.$refs["IepCascader"].handleChange(t)},2e3)}},methods:{onGoBack:function(){this.$router.history.go(-1)}}},l=i,s=r("2877"),u=Object(s["a"])(l,a,o,!1,null,null,null);t["default"]=u.exports},c726:function(e,t,r){"use strict";r.d(t,"g",function(){return i}),r.d(t,"e",function(){return l}),r.d(t,"c",function(){return s}),r.d(t,"f",function(){return u}),r.d(t,"b",function(){return m}),r.d(t,"a",function(){return d}),r.d(t,"d",function(){return p}),r.d(t,"h",function(){return f});var a=r("b5c6"),o="tmlms/crew",n="admin/region",c="admin/dict";function i(e){return Object(a["a"])({url:"".concat(n,"/getinfo/")+e,method:"get"})}function l(e){return Object(a["a"])({url:"".concat(c,"/type/")+e,method:"get"})}function s(e){return Object(a["a"])({url:"".concat(n,"/area"),method:"get",params:{parentCode:e}})}function u(e){return Object(a["a"])({url:"".concat(o,"/Page"),method:"get",params:e})}function m(e){return Object(a["a"])({url:"".concat(o,"/delete"),method:"post",params:{userId:e}})}function d(e){return Object(a["a"])({url:"".concat(o,"/create"),method:"post",data:e,params:{type:2}})}function p(e){return Object(a["a"])({url:"".concat(o,"/getCrewByUserId"),method:"get",params:{userId:e}})}function f(e){return Object(a["a"])({url:"".concat(o,"/edit"),method:"post",params:{type:2},data:e})}}}]);