(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fb1b3736"],{"01b2":function(t,e,r){},"2f9e":function(t,e,r){"use strict";r.d(e,"a",function(){return n});r("ac6a"),r("28a5"),r("a481");var o=r("b5c6");function n(t){var e=t.url,r=t.method,n=void 0===r?"post":r,c=t.data,i=void 0===c?{}:c,d=t.title,s=void 0===d?"":d;return new Promise(function(t){return Object(o["a"])({url:e,method:n,headers:{responseType:"arraybuffer"},data:i,responseType:"blob"}).then(function(e){a({title:s,response:e}).then(function(){t()})})})}function a(t){var e=t.title,r=void 0===e?"":e,o=t.response,n=c(o.headers["content-disposition"].replace(/"/g,""));return new Promise(function(t){var e=o.headers,a=new Blob([o.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(a,r);else{var c=document.createElement("a");c.href=window.URL.createObjectURL(a),c.download=r?"".concat(r,".").concat(n.suffix):n.filename,document.body.appendChild(c),c.style.display="none",c.click()}t()})}function c(t){var e={},r=t.split(";");return r.forEach(function(t){var r=t.replace(/^\s+|\s+$/g,""),o=r.split("=");o[1]?e[o[0]]=o[1]:e[o[0]]=o[0]}),e.suffix=e.filename.split(".")[1],e}},4917:function(t,e,r){"use strict";var o=r("cb7c"),n=r("9def"),a=r("0390"),c=r("5f1b");r("214f")("match",1,function(t,e,r,i){return[function(r){var o=t(this),n=void 0==r?void 0:r[e];return void 0!==n?n.call(r,o):new RegExp(r)[e](String(o))},function(t){var e=i(r,t,this);if(e.done)return e.value;var d=o(t),s=String(this);if(!d.global)return c(d,s);var u=d.unicode;d.lastIndex=0;var l,f=[],m=0;while(null!==(l=c(d,s))){var p=String(l[0]);f[m]=p,""===p&&(d.lastIndex=a(s,n(d.lastIndex),u)),m++}return 0===m?null:f}]})},5612:function(t,e,r){"use strict";r.d(e,"i",function(){return c}),r.d(e,"j",function(){return i}),r.d(e,"l",function(){return d}),r.d(e,"m",function(){return s}),r.d(e,"r",function(){return u}),r.d(e,"c",function(){return l}),r.d(e,"t",function(){return f}),r.d(e,"u",function(){return m}),r.d(e,"d",function(){return p}),r.d(e,"e",function(){return h}),r.d(e,"g",function(){return b}),r.d(e,"v",function(){return v}),r.d(e,"f",function(){return g}),r.d(e,"z",function(){return y}),r.d(e,"k",function(){return S}),r.d(e,"n",function(){return O}),r.d(e,"h",function(){return _}),r.d(e,"p",function(){return j}),r.d(e,"x",function(){return w}),r.d(e,"y",function(){return I}),r.d(e,"w",function(){return $}),r.d(e,"b",function(){return k}),r.d(e,"q",function(){return x}),r.d(e,"a",function(){return C}),r.d(e,"s",function(){return q}),r.d(e,"o",function(){return P});var o=r("b5c6"),n=r("2f9e"),a="/tmlms/crew";function c(t){return Object(o["a"])({url:"".concat(a,"/Page"),method:"get",params:t})}function i(t){return Object(o["a"])({url:"".concat(a,"/findByShipId?shipId=").concat(t),method:"get",params:t})}function d(t){return Object(o["a"])({url:"".concat(a,"/getHistoryByShipId?shipId=").concat(t.shipId),method:"get",params:t})}function s(t){return Object(o["a"])({url:"".concat(a,"/pageWithShip"),method:"get",params:t})}function u(t){return Object(o["a"])({url:"".concat(a,"/shipLogPage"),method:"get",params:t})}function l(t){return Object(o["a"])({url:"".concat(a,"/checkMoreRelations"),method:"post",data:t})}function f(t,e){return Object(o["a"])({url:"".concat(a,"/create?type=").concat(e),method:"post",data:t})}function m(t,e){return Object(o["a"])({url:"".concat(a,"/batchCreate?type=").concat(e),method:"post",data:t,timeout:3e5})}function p(t){return Object(o["a"])({url:"".concat(a,"/delete?idcard=").concat(t),method:"post"})}function h(t,e){return Object(o["a"])({url:"".concat(a,"/deleteRelation?idcard=").concat(t,"&&shipId=").concat(e),method:"post"})}function b(t,e){return Object(o["a"])({url:"".concat(a,"/edit?type=").concat(e),method:"post",data:t})}function v(t,e){return Object(o["a"])({url:"".concat(a,"/review?status=").concat(t,"&userId=").concat(e),method:"post"})}function g(t){return Object(o["a"])({url:"".concat(a,"/getCrewByidcard?idcard=").concat(t),method:"get"})}function y(t){return Object(o["a"])({url:"admin/file/upload/avatar",method:"post",data:t})}function S(t){return Object(o["a"])({url:"".concat(a,"/idcardcheck?idcard=").concat(t),method:"get"})}function O(t){return Object(o["a"])({url:"".concat(a,"/idcardcheck?idcard=").concat(t),method:"get"})}function _(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"船员信息";return Object(n["a"])({url:"tmlms/tybmlmsExcelExport/downloadCrew",data:t,title:e})}function j(t){return Object(o["a"])({url:"".concat(a,"/badPage"),method:"get",params:t})}function w(t){return Object(o["a"])({url:"".concat(a,"/badUpdateBatch"),method:"post",data:t})}function I(t){return Object(o["a"])({url:"".concat(a,"/uploadBaseImage"),method:"post",data:t})}function $(t){return Object(o["a"])({url:"".concat(a,"/updateCertByIdcard"),method:"post",params:t})}function k(t){return Object(o["a"])({url:"".concat(a,"/changeShip"),method:"post",data:t})}function x(t){return Object(o["a"])({url:"".concat(a,"/getShipRelationByIdcard"),method:"get",params:t})}function C(t){return Object(o["a"])({url:"/tmlms/tybship/pageForChange",method:"get",params:t})}function q(t){return Object(o["a"])({url:"/tmlms/importTask/lookTask",method:"get",params:{taksId:t}})}function P(t){return Object(o["a"])({url:"/tmlms/crew_cert/newPage",method:"get",params:t})}},"58ee":function(t,e,r){"use strict";r("01b2")},c533b:function(t,e,r){"use strict";r.d(e,"i",function(){return i}),r.d(e,"f",function(){return d}),r.d(e,"d",function(){return s}),r.d(e,"g",function(){return u}),r.d(e,"c",function(){return l}),r.d(e,"a",function(){return f}),r.d(e,"e",function(){return m}),r.d(e,"j",function(){return p}),r.d(e,"h",function(){return h}),r.d(e,"b",function(){return b});var o=r("b5c6"),n="tmlms/crew",a="admin/region",c="admin/dict";function i(t){return Object(o["a"])({url:"".concat(a,"/getinfo/")+t,method:"get"})}function d(t){return Object(o["a"])({url:"".concat(c,"/type/")+t,method:"get"})}function s(t){return Object(o["a"])({url:"".concat(a,"/area"),method:"get",params:{parentCode:t}})}function u(t){return Object(o["a"])({url:"".concat(n,"/Page"),method:"get",params:t})}function l(t){return Object(o["a"])({url:"".concat(n,"/delete"),method:"post",params:{userId:t}})}function f(t){return Object(o["a"])({url:"".concat(n,"/create"),method:"post",data:t,params:{type:1}})}function m(t){return Object(o["a"])({url:"".concat(n,"/getCrewByUserId"),method:"get",params:{userId:t}})}function p(t){return Object(o["a"])({url:"".concat(n,"/edit"),method:"post",params:{type:1},data:t})}function h(t){return Object(o["a"])({url:"/tybship/tybregion/parent/".concat(t),method:"get"})}function b(t,e,r){return Object(o["a"])({url:"".concat(n,"/upWork?idcard=").concat(e,"&workStatus=").concat(r),method:"post",data:t})}},f67c:function(t,e,r){"use strict";r.d(e,"c",function(){return a}),r.d(e,"b",function(){return c}),r.d(e,"a",function(){return i});var o=r("b5c6"),n="/tybship/tybshipcrew";function a(t){return Object(o["a"])({url:"".concat(n,"/page"),method:"get",params:t})}function c(t){return Object(o["a"])({url:"".concat(n,"/getByidcard/").concat(t),method:"get"})}function i(t){return Object(o["a"])({url:"".concat(n,"/").concat(t),method:"get"})}},ff6f:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"agent-add"},[r("basic-container",[t.$route.query.idcard?t._e():r("h1",[t._v(t._s(t.$route.query.see?"查看":t.$route.query.edit?"编辑":"新增")+"船员信息")]),t.$route.query.idcard?r("h1",[t._v("完善个人信息")]):t._e(),!1===t.isExist?r("el-form",{ref:"form",attrs:{model:t.form,"label-width":"150px",rules:t.rules}},[r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"姓名:",prop:"realName"}},[t.$route.query.see?r("div",[t._v(t._s(t.form.realName))]):r("el-input",{attrs:{placeholder:""},model:{value:t.form.realName,callback:function(e){t.$set(t.form,"realName",e)},expression:"form.realName"}})],1)],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"身份证号:",prop:"idcard"}},[t.$route.query.see?r("div",[t._v(t._s(t.form.idcard))]):r("el-input",{attrs:{placeholder:""},on:{blur:function(e){return t.onBlur(t.form.idcard)}},model:{value:t.form.idcard,callback:function(e){t.$set(t.form,"idcard",e)},expression:"form.idcard"}})],1)],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"手机号码:",prop:"phone"}},[t.$route.query.see?r("div",[t._v(t._s(t.form.phone))]):r("el-input",{attrs:{placeholder:""},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"职位:",prop:"positionId"}},[t.$route.query.see?r("div",[t._v(t._s(t.form.positionId))]):r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:t.form.positionId,callback:function(e){t.$set(t.form,"positionId",e)},expression:"form.positionId"}},[t._v(">")])],1)],1)],1)],1):t._e(),!0===t.isExist?r("el-form",{ref:"formSecond",attrs:{model:t.formSecond,"label-width":"150px",rules:t.rules}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"个人姓名：",prop:"realName"}},[r("div",[t._v(t._s(t.formSecond.realName))])])],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"性别",prop:"gender"}},[r("el-radio",{attrs:{disabled:"",label:1},model:{value:t.formSecond.gender,callback:function(e){t.$set(t.formSecond,"gender",e)},expression:"formSecond.gender"}},[t._v("男")]),r("el-radio",{attrs:{disabled:"",label:2},model:{value:t.formSecond.gender,callback:function(e){t.$set(t.formSecond,"gender",e)},expression:"formSecond.gender"}},[t._v("女")])],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证号码：",prop:"idcard"}},[r("div",[t._v(t._s(t.formSecond.idcard))])])],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"birthday","label-name":"出生日期"}},[r("iep-date-picker",{attrs:{disabled:"",type:"date",placeholder:"选择日期",readonly:""},model:{value:t.formSecond.birthday,callback:function(e){t.$set(t.formSecond,"birthday",e)},expression:"formSecond.birthday"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"籍贯地区：",prop:"districtId"}},[r("span",[t._v(t._s(t.formSecond.provinceId))]),r("span",[t._v(t._s(t.formSecond.cityId))]),r("span",[t._v(t._s(t.formSecond.districtId))])])],1),r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"国籍",prop:"nationality"}},[r("div",[t._v(t._s(t.formSecond.nationality))])])],1),r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"民族",prop:"nation"}},[r("div",[t._v(t._s(t.formSecond.nation))])])],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭地址：",prop:"address"}},[r("div",[t._v(t._s(t.formSecond.address))])])],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[r("div",[t._v(t._s(t.formSecond.phone))])])],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭联系人：",prop:"contactName"}},[r("div",[t._v(t._s(t.formSecond.contactName))])])],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"家庭联系电话：",prop:"contactPhone"}},[r("div",[t._v(t._s(t.formSecond.contactPhone))])])],1)],1),r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"职位：",prop:"positionId"}},[r("div",[t._v(t._s(t.formSecond.positionId))])])],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"是否需要培训：",prop:"isTrain"}},[r("el-radio-group",{model:{value:t.formSecond.isTrain,callback:function(e){t.$set(t.formSecond,"isTrain",e)},expression:"formSecond.isTrain"}},[r("el-radio",{attrs:{disabled:"",label:0}},[t._v("否")]),r("el-radio",{attrs:{disabled:"",label:1}},[t._v("是")])],1)],1)],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"申请类别：",prop:"applyType"}},[r("div",[t._v(t._s(t.formSecond.applyType))])])],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"特长：",prop:"speciality"}},[r("div",[t._v(t._s(t.formSecond.speciality))])])],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证正面照片：",prop:"photoFront"}},[t.formSecond.photoFront?r("img",{staticClass:"avatar",attrs:{src:t.formSecond.photoFront}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证反面照片：",prop:"photoReverse"}},[t.formSecond.photoReverse?r("img",{staticClass:"avatar",attrs:{src:t.formSecond.photoReverse}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身份证头像：",prop:"idcardPhoto"}},[t.formSecond.idcardPhoto?r("img",{attrs:{src:t.formSecond.idcardPhoto}}):r("i",{staticClass:"el-icon-picture-outline"})])],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"人脸照：",prop:"facePhoto"}},[t.formSecond.facePhoto?r("img",{staticStyle:{width:"350px",height:"200px"},attrs:{src:t.formSecond.facePhoto}}):r("i",{staticClass:"el-icon-picture-outline"})])],1)],1),r("iep-form-item",{staticClass:"form-half",attrs:{prop:"remark","label-name":"备注信息",tip:"请输入备注信息"}},[r("iep-input-area",{model:{value:t.formSecond.remark,callback:function(e){t.$set(t.formSecond,"remark",e)},expression:"formSecond.remark"}})],1)],1):t._e(),r("div",{staticStyle:{"text-align":"center"}},[t.$route.query.see?t._e():r("el-button",{on:{click:t.save}},[t._v("提交")]),r("el-button",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1)],1)},n=[],a=(r("7f7f"),r("96cf"),r("1da1")),c=(r("ac6a"),r("53ca")),i=(r("4917"),r("f67c")),d=r("b047"),s=r.n(d),u=r("59fb"),l=r("5612"),f=r("c533b"),m={data:function(){this.getidcardList=s()(this.getidcardList,3e3);var t=function(t,e,r){""===e?r(new Error("请输入联系电话")):e.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?r():r(new Error("请输入正确的手机号码!"))};return{form:{realName:"",idcard:"",phone:"",positionId:""},formSecond:{realName:"",gender:"",idcard:"",birthday:"",provinceId:"",cityId:"",districtId:"",nationality:"",nation:"",address:"",phone:"",contactName:"",contactPhone:"",positionId:"",isTrain:"",applyType:"",speciality:"",photoFront:"",photoReverse:"",idcardPhoto:"",facePhoto:"",remark:""},applyTypes:[{id:1,name:"以旧换新"},{id:2,name:"普通船员"},{id:3,name:"职务船员"},{id:4,name:"证书换发"},{id:5,name:"证书补发"},{id:6,name:"其他"}],rules:{realName:[{required:!0,message:"请输入名称",trigger:"blur"}],idcard:[{required:!0,message:"请输入身份证号码",trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:t,trigger:"blur"}]},idcards:[],loading:!1,isExist:!1,crewIdcard:""}},methods:{save:function(){var t=this;this.$refs["form"].validate(function(e){if(t.form.shipId=t.$route.params.shipId,console.log(t.form),!e)return!1;var r=t.form,o=3;t.$route.params.shipId&&Object(l["t"])(r,o).then(function(){t.$message.success("船员添加成功!"),t.$router.go(-1)})})},getCrewDetail:function(){var t=this;Object(i["b"])(this.$route.query.see).then(function(e){var r=e.data;t.form=r,t.getDict("tyb_resume_position",t.form.positionId).then(function(e){t.form.positionId=e})})},onBlur:function(t){var e=this;this.form.idcard&&Object(i["b"])(this.form.idcard).then(function(r){console.log("测试"),console.log(r.data),r.data?(e.$message.success("船员已在船上!"),e.$router.go(-1)):Object(l["n"])(t).then(function(r){var o=r.data;!0!==o.data?e.$router.push({name:"detailBoatMan",query:{edit:t,shipCrew:!0,shipId:e.$route.params.shipId}}):e.form.idcard=t})})},idcardChange:function(t){var e=this;"object"===Object(c["a"])(t)?this.refreshCard(t):(this.refreshCard({idcard:t}),Object(l["f"])(this.form.idcard).then(function(t){e.formSecond=t.data.data,console.log("打印表单"),console.log(t)})),this.idcards=[]},refreshCard:function(t){if(null!==t){var e=t.idcard,r=void 0===e?"":e,o=t.phone,n=void 0===o?"":o,a=t.realName,c=void 0===a?"":a,i=t.positionId,d=void 0===i?"":i;this.form.phone=n,this.form.idcard=r,this.form.positionId=d,this.form.realName=c}else this.form.phone="",this.form.idcard="",this.form.positionId="",this.form.realName=""},getidcardList:function(t){var e=this;this.loading=!1,""!==t?Object(l["n"])(t).then(function(r){var o=r.data;!0!==o.data?e.idcards.push(o.data):e.form.idcard=t}):this.idcards=[],this.loading=!1},getDict:function(t,e){return Object(u["j"])(t).then(function(t){var r="";return t.data.data.forEach(function(t){t.value===e&&(r=t.label)}),r})},getcrewIdcard:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["a"])(this.$route.query.see).then(function(t){e.crewIdcard=t.data.data.idcard});case 2:Object(l["f"])(this.crewIdcard).then(function(t){"{}"!==JSON.stringify(t.data.data)?(e.isExist=!0,e.formSecond=t.data.data,e.getDict("tyb_resume_position",e.formSecond.positionId).then(function(t){e.formSecond.positionId=t}),e.applyTypes.forEach(function(t){t.id===e.formSecond.applyType&&(e.formSecond.applyType=t.name)}),Object(f["i"])(e.formSecond.provinceId).then(function(t){e.formSecond.provinceId=t.data.data.name}),Object(f["i"])(e.formSecond.cityId).then(function(t){e.formSecond.cityId=t.data.data.name}),Object(f["i"])(e.formSecond.districtId).then(function(t){e.formSecond.districtId=t.data.data.name})):(e.isExist=!1,e.getdetailShipCrew())});case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getdetailShipCrew:function(){var t=this;Object(i["a"])(this.$route.query.see).then(function(e){!1===t.isExist&&(t.form=e.data.data,t.getDict("tyb_resume_position",t.form.positionId).then(function(e){t.form.positionId=e}))})}},computed:{},created:function(){this.$route.query.see&&(this.getcrewIdcard(),this.getCrewDetail())}},p=m,h=(r("58ee"),r("2877")),b=Object(h["a"])(p,o,n,!1,null,null,null);e["default"]=b.exports}}]);