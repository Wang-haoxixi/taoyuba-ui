(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e7934c6"],{"0f1e":function(e,t,r){"use strict";r.d(t,"f",function(){return i}),r.d(t,"e",function(){return s}),r.d(t,"h",function(){return l}),r.d(t,"b",function(){return c}),r.d(t,"a",function(){return u}),r.d(t,"d",function(){return m}),r.d(t,"g",function(){return d}),r.d(t,"c",function(){return f});var a=r("b5c6"),o=r("2f9e"),n="tybhrms/resume";function i(e){return Object(a["a"])({url:"".concat(n,"/getPage"),method:"get",params:e})}function s(e){return Object(a["a"])({url:"".concat(n,"/getMyCerts"),method:"get",params:e})}function l(e,t){return Object(a["a"])({url:"".concat(n,"/review?status=").concat(e,"&resumeId=").concat(t),method:"post"})}function c(e){return Object(a["a"])({url:"".concat(n,"/delete/")+e,method:"post",data:e})}function u(e){return Object(a["a"])({url:"".concat(n,"/add"),method:"post",data:e})}function m(e){return Object(a["a"])({url:"".concat(n,"/")+e,method:"get",params:e})}function d(e,t){return Object(a["a"])({url:"".concat(n,"/update"),method:"put",params:{publish:t},data:e})}function f(e){return Object(o["a"])({url:"tybhrms/tybExcelExport/resume",data:e,title:"简历信息"})}},"2f9e":function(e,t,r){"use strict";r.d(t,"a",function(){return o});r("ac6a"),r("28a5"),r("a481");var a=r("b5c6");function o(e){var t=e.url,r=e.method,o=void 0===r?"post":r,i=e.data,s=void 0===i?{}:i,l=e.title,c=void 0===l?"":l;return console.log(t),new Promise(function(e){return Object(a["a"])({url:t,method:o,headers:{responseType:"arraybuffer"},data:s,responseType:"blob"}).then(function(t){n({title:c,response:t}).then(function(){e()})})})}function n(e){var t=e.title,r=void 0===t?"":t,a=e.response,o=i(a.headers["content-disposition"].replace(/"/g,""));return new Promise(function(e){var t=a.headers,n=new Blob([a.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(n,r);else{var i=document.createElement("a");i.href=window.URL.createObjectURL(n),i.download=r?"".concat(r,".").concat(o.suffix):o.filename,document.body.appendChild(i),i.style.display="none",i.click()}e()})}function i(e){var t={},r=e.split(";");return r.forEach(function(e){var r=e.replace(/^\s+|\s+$/g,""),a=r.split("=");a[1]?t[a[0]]=a[1]:t[a[0]]=a[0]}),t.suffix=t.filename.split(".")[1],t}},"9b20":function(e,t,r){"use strict";r.d(t,"a",function(){return n}),r.d(t,"b",function(){return o}),r.d(t,"e",function(){return l}),r.d(t,"g",function(){return u}),r.d(t,"c",function(){return i}),r.d(t,"f",function(){return f}),r.d(t,"d",function(){return m});var a=r("0e0b"),o={resumeStatus:{0:"待审核",1:"正常",2:"不通过"},isPublic:{0:"不公开",1:"公开"},isRcmd:{0:"不推荐",1:"推荐"}},n=[{prop:"resumeId",label:"编号"},{prop:"realName",label:"姓名"},{prop:"job",label:"应聘职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"updateTime",label:"更新时间"},{prop:"resumeStatus",label:"简历状态",type:"dict"}],i=function(e){var t=Object(a["g"])(s(),e);return t},s=function(){return{resumeId:"",realName:"",birthday:"",province:"",city:"",contactPhone:"",education:"",expectSalary:"",foreignLanguage:"",height:"",isPublic:"",postion:"",job:"",seniority:"",skill:"",workRequire:"",workDetail:"",workExprience:""}},l=function(){return{realName:"",resumeId:"",startdate:"",resumeCrestartdate:"",resumeCreenddate:""}},c=function(){return{realName:"",resumeId:"",startdate:"",resumeCrestartdate:"",resumeCreenddate:""}},u=function(e){var t=Object(a["g"])(c(),e);return t.realName=e.realName?e.realName:null,t},m=function(){return{resumeId:"",realName:"",birthday:"",province:"",city:"",contactPhone:"",education:"",expectSalary:"",foreignLanguage:"",height:"",isPublic:"",postion:"",job:"",seniority:"",skill:"",workRequire:"",workDetail:"",workExprience:""}},d=function(e,t,r){if(""!==t){var a=/(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/;a.test(t)||r(new Error("请输入11位的手机号码"))}r()},f={realName:[{required:!0,message:"请填姓名",trigger:"blur"},{min:2,max:4,message:"长度在 2 到 4 个字符",trigger:"blur"}],birthday:[{required:!0,message:"请填出生日期",trigger:"blur"}],province:[{required:!0,message:"请填省",trigger:"blur"}],city:[{required:!0,message:"请填市",trigger:"blur"}],contactPhone:[{required:!0,message:"请填联系电话",trigger:"blur"},{validator:d,trigger:"blur"}],education:[{required:!0,message:"请填教育程度",trigger:"blur"}],expectSalary:[{required:!0,message:"请填期望月薪",trigger:"blur"},{max:10,message:"不得超过10位数",trigger:"blur"}],foreignLanguage:[{required:!0,message:"请填外语水平",trigger:"blur"}],height:[{required:!0,message:"请填身高",trigger:"blur"},{max:3,message:"不得超过4位数",trigger:"blur"}],isPublic:[{required:!0,message:"请填是否公开",trigger:"blur"}],postion:[{required:!0,message:"请填原任职务",trigger:"blur"}],job:[{required:!0,message:"请填应聘职位",trigger:"blur"}],skill:[{required:!0,message:"请填特殊技能",trigger:"blur"},{max:25,message:"长度在 0 到 25 个字符",trigger:"blur"}],workRequire:[{required:!0,message:"请填作业要求",trigger:"blur"}],workExprience:[{required:!0,message:"请填工作经验",trigger:"blur"}]}},abea:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:e.methodName+"简历",backOption:e.backOption}}),r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"姓名：",prop:"realName"}},[r("el-input",{attrs:{disabled:e.haveInfo.realName},model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话：",prop:"contactPhone"}},[r("el-input",{attrs:{disabled:e.haveInfo.phone},model:{value:e.form.contactPhone,callback:function(t){e.$set(e.form,"contactPhone",t)},expression:"form.contactPhone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"出生日期：",prop:"birthday"}},[r("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期","picker-options":e.pickerOptions},model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"现住地址："}},[r("el-select",{staticStyle:{width:"50%!important"},attrs:{placeholder:"请选择"},on:{change:e.getCity},model:{value:e.form.province,callback:function(t){e.$set(e.form,"province",t)},expression:"form.province"}},e._l(e.provinces,function(e){return r("el-option",{key:e.value,attrs:{prop:"province",label:e.label,value:e.value}})}),1),r("el-select",{staticStyle:{width:"50%!important"},attrs:{placeholder:"请选择"},model:{value:e.form.city,callback:function(t){e.$set(e.form,"city",t)},expression:"form.city"}},e._l(e.citys,function(e){return r("el-option",{key:e.value,attrs:{prop:"city",label:e.label,value:e.value}})}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"特殊技能：",prop:"skill"}},[r("el-input",{model:{value:e.form.skill,callback:function(t){e.$set(e.form,"skill",t)},expression:"form.skill"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"教育程度：",prop:"education"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_education"},model:{value:e.form.education,callback:function(t){e.$set(e.form,"education",t)},expression:"form.education"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"期望月薪：",prop:"expectSalary"}},[r("el-input",{model:{value:e.form.expectSalary,callback:function(t){e.$set(e.form,"expectSalary",t)},expression:"form.expectSalary"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"外语水平：",prop:"foreignLanguage"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_language"},model:{value:e.form.foreignLanguage,callback:function(t){e.$set(e.form,"foreignLanguage",t)},expression:"form.foreignLanguage"}},[e._v(">")])],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"身高CM：",prop:"height"}},[r("el-input",{model:{value:e.form.height,callback:function(t){e.$set(e.form,"height",t)},expression:"form.height"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"是否公开：",prop:"isPublic"}},[r("el-radio-group",{model:{value:e.form.isPublic,callback:function(t){e.$set(e.form,"isPublic",t)},expression:"form.isPublic"}},e._l(e.dictsMap.isPublic,function(t,a){return r("el-radio",{key:a,attrs:{label:+a}},[e._v(e._s(t))])}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"原任职务：",prop:"postion"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:e.form.postion,callback:function(t){e.$set(e.form,"postion",t)},expression:"form.postion"}},[e._v(">")])],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"应聘职位：",prop:"job"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:e.form.job,callback:function(t){e.$set(e.form,"job",t)},expression:"form.job"}},[e._v(">")])],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工作经验：",prop:"workExprience"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_work_exprience"},model:{value:e.form.workExprience,callback:function(t){e.$set(e.form,"workExprience",t)},expression:"form.workExprience"}},[e._v(">")])],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"作业方式：",prop:"workRequire"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_worktype"},model:{value:e.form.workRequire,callback:function(t){e.$set(e.form,"workRequire",t)},expression:"form.workRequire"}},[e._v(">")])],1)],1)],1),r("el-row"),r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)],1)],1)],1)},o=[],n=(r("7f7f"),r("6b54"),r("0f1e")),i=r("23d6"),s=r("9b20"),l=r("e420"),c={mixins:[l["a"]],data:function(){var e=this;return{dictsMap:s["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},rules:s["f"],form:Object(s["d"])(),provinces:[],citys:[]}},computed:{resumeId:function(){return+this.$route.params.resumeId},methodName:function(){return this.resumeId?"编辑":"发布"}},created:function(){var e=this;this.resumeId&&Object(n["d"])(this.resumeId).then(function(t){var r=t.data;e.form=e.$mergeByFirst(Object(s["d"])(),r.data),e.form.education=e.form.education.toString(),e.form.foreignLanguage=e.form.foreignLanguage.toString(),e.form.postion=e.form.postion.toString(),e.form.seniority=e.form.seniority.toString(),e.form.workRequire=e.form.workRequire.toString(),e.selectCity()}),this.getProvince()},mounted:function(){this.getInformation("form",["contactPhone","realName"])},methods:{getProvince:function(){var e=this;Object(i["c"])(0).then(function(t){var r=t.data;e.provinces=r.data.map(function(e){return{label:e.name,value:e.areaCode}})})},getCity:function(){var e=this;Object(i["c"])(this.form.province).then(function(t){var r=t.data;e.citys=r.data.map(function(e){return{label:e.name,value:e.areaCode}})}),this.form.city=""},selectCity:function(){var e=this;Object(i["c"])(this.form.province).then(function(t){var r=t.data;e.citys=r.data.map(function(e){return{label:e.name,value:e.areaCode}})})},onGoBack:function(){this.$router.push({path:"/hrms_spa/resume_list"})},handleSubmit:function(e){var t=this,r=this.resumeId?n["g"]:n["a"];this.$refs["form"].validate(function(a){if(a){var o=!0===e;r(Object(s["c"])(t.form),o).then(function(e){var r=e.data;r.data&&(t.$message({message:"简历信息".concat(t.methodName,"成功"),type:"success"}),t.onGoBack())})}})}}},u=c,m=r("0c7c"),d=Object(m["a"])(u,a,o,!1,null,null,null);t["default"]=d.exports},e420:function(e,t,r){"use strict";r("7f7f");var a=r("7ded");t["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(e,t){var r=this;Object(a["c"])().then(function(a){-1===a.data.data.roles.indexOf(1)&&-1===a.data.data.roles.indexOf(111)&&(a.data.data.sysUser.phone&&(r.$set(r.haveInfo,"phone",!0),r[e][t[0]]=a.data.data.sysUser.phone),a.data.data.sysUser.realName&&(r.$set(r.haveInfo,"realName",!0),r[e][t[1]]=a.data.data.sysUser.realName),a.data.data.sysUser.idCard&&[t[2]]&&(r.$set(r.haveInfo,"idcard",!0),r[e].idcard=a.data.data.sysUser.idCard))})}}}}}]);