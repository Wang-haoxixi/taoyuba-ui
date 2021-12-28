(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3be64152"],{"58eb":function(e,t,r){"use strict";r.d(t,"d",function(){return n}),r.d(t,"c",function(){return i}),r.d(t,"f",function(){return s}),r.d(t,"g",function(){return l}),r.d(t,"b",function(){return c}),r.d(t,"a",function(){return u}),r.d(t,"h",function(){return m}),r.d(t,"e",function(){return p});var a=r("b5c6"),o="/hrms/publish_recruitment";function n(e){return Object(a["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function i(e){return Object(a["a"])({url:"".concat(o,"/").concat(e),method:"get"})}function s(e,t){return Object(a["a"])({url:"".concat(o,"/create"),method:"post",params:{publish:t},data:e})}function l(e,t){return Object(a["a"])({url:"".concat(o,"/update"),method:"post",params:{publish:t},data:e})}function c(e){return Object(a["a"])({url:"".concat(o,"/delete/batch"),method:"post",data:[e]})}function u(e){return Object(a["a"])({url:"".concat(o,"/delete/batch"),method:"post",data:e})}function m(e){return d([e],2)}function p(e){return d([e],3)}function d(e,t){return Object(a["a"])({url:"".concat(o,"/status/batch"),method:"post",data:{ids:e,status:t}})}},"5ea7":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:e.methodName+"招聘",backOption:e.backOption}}),r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"岗位名称：",prop:"position"}},[r("iep-cascader",{ref:"IepCascader",attrs:{"prefix-url":"hrms/post_type"},on:{change:e.handlePositionChange},model:{value:e.form.position,callback:function(t){e.$set(e.form,"position",t)},expression:"form.position"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{attrs:{prop:"dept","label-name":"所属部门",tip:"请准确选择人才需求部门"}},[r("iep-cascader",{attrs:{"prefix-url":"admin/dept","change-on-select":""},model:{value:e.form.dept,callback:function(t){e.$set(e.form,"dept",t)},expression:"form.dept"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"招聘人数：",prop:"recruitsCount"}},[r("iep-input-number",{model:{value:e.form.recruitsCount,callback:function(t){e.$set(e.form,"recruitsCount",t)},expression:"form.recruitsCount"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"是否紧缺：",prop:"targetCount"}},[r("el-radio-group",{model:{value:e.form.targetCount,callback:function(t){e.$set(e.form,"targetCount",t)},expression:"form.targetCount"}},e._l(e.dictsMap.targetCount,function(t,a){return r("el-radio",{key:a,attrs:{label:+a}},[e._v(e._s(t))])}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"学历要求：",prop:"academicId"}},[r("iep-dict-select",{attrs:{"dict-name":"hrms_highest_educational"},model:{value:e.form.academicId,callback:function(t){e.$set(e.form,"academicId",t)},expression:"form.academicId"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工作类型：",prop:"jobTypeId"}},[r("iep-dict-select",{attrs:{"dict-name":"hrms_work_type"},model:{value:e.form.jobTypeId,callback:function(t){e.$set(e.form,"jobTypeId",t)},expression:"form.jobTypeId"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工作年限：",prop:"years"}},[r("iep-dict-select",{attrs:{"dict-name":"hrms_working_life"},model:{value:e.form.years,callback:function(t){e.$set(e.form,"years",t)},expression:"form.years"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{attrs:{prop:"profession","label-name":"专业要求",tip:"多项内容时使用“/”分开，如无要求则填“无”"}},[r("el-input",{attrs:{maxlength:2010},model:{value:e.form.profession,callback:function(t){e.$set(e.form,"profession",t)},expression:"form.profession"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工作地点：",prop:"place"}},[r("iep-dict-select",{attrs:{"dict-name":"hrms_work_place"},model:{value:e.form.place,callback:function(t){e.$set(e.form,"place",t)},expression:"form.place"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"性别：",prop:"sex"}},[r("el-radio-group",{model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[r("el-radio",{attrs:{label:1}},[e._v("男")]),r("el-radio",{attrs:{label:2}},[e._v("女")]),r("el-radio",{attrs:{label:3}},[e._v("不限")])],1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"treatment","label-name":"工资待遇",tip:"请务必以区间形式体现且标明年薪还是月薪，如3000-5000元/月，5-6万/年"}},[r("iep-dict-select",{attrs:{"dict-name":"hrms_wages_salaries"},model:{value:e.form.treatment,callback:function(t){e.$set(e.form,"treatment",t)},expression:"form.treatment"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"language","label-name":"外语要求",tip:"此处填写语种+等级，如大学英语四级，日语二级"}},[r("iep-dict-select",{attrs:{"dict-name":"hrms_foreign_language"},model:{value:e.form.language,callback:function(t){e.$set(e.form,"language",t)},expression:"form.language"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"term","label-name":"招聘期限",tip:"此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日"}},[r("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.term,callback:function(t){e.$set(e.form,"term",t)},expression:"form.term"}})],1)],1),r("el-col",{attrs:{span:12}},[r("iep-form-item",{staticClass:"form-half",attrs:{prop:"welfare","label-name":"福利待遇",tip:"此处如需填写多项内容时，请用“/”分开"}},[r("iep-dict-select",{attrs:{multiple:"","dict-name":"hrms_fringe_benefits"},model:{value:e.form.welfare,callback:function(t){e.$set(e.form,"welfare",t)},expression:"form.welfare"}})],1)],1)],1),r("iep-form-item",{staticClass:"form-half",attrs:{prop:"duties","label-name":"岗位职责",tip:"请务必准确规范填写且不少于6条：<br />1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br />2、岗位职责清晰，语言简练，忌口语化描述；<br />3、岗位职责为该岗位的工作方向，而非具体内容的操作方法；"}},[r("iep-input-area",{model:{value:e.form.duties,callback:function(t){e.$set(e.form,"duties",t)},expression:"form.duties"}})],1),r("iep-form-item",{staticClass:"form-half",attrs:{prop:"claim","label-name":"岗位要求",tip:"请务必准确规范填写：<br/>1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br/>2、岗位要求具体内容与岗位职责描述相匹配，切记不搭边。"}},[r("iep-input-area",{model:{value:e.form.claim,callback:function(t){e.$set(e.form,"claim",t)},expression:"form.claim"}})],1),r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保存")]),r("iep-button",{on:{click:e.handlePublish}},[e._v("保存并发布")])],1)],1)],1)],1)],1)},o=[],n=(r("7514"),r("58eb")),i=r("f8bb"),s=r("2ef0"),l=r.n(s),c={data:function(){var e=this;return{dictsMap:i["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},rules:i["f"],form:Object(i["d"])()}},computed:{id:function(){return+this.$route.params.id},methodName:function(){return this.id?"编辑":"发布"}},created:function(){var e=this;this.id&&Object(n["c"])(this.id).then(function(t){var r=t.data;e.form=e.$mergeByFirst(Object(i["d"])(),r.data)})},mounted:function(){var e=this;if(this.$route.query.position){var t=this.$route.query.position.map(function(e){return+e})||[];this.form.position=t||[],setTimeout(function(){e.$refs["IepCascader"].handleChange(t)},2e3)}},methods:{onGoBack:function(){this.$router.history.go(-1)},handlePositionChange:function(e,t){var r=e[e.length-1],a=l()(t).thru(function(e){return l.a.union(e,l.a.map(e,"children"))}).flatten().find({value:r});a&&(this.form.duties=a.duty,this.form.claim=a.rqmt)},handlePublish:function(){this.handleSubmit(!0)},handleSubmit:function(e){var t=this,r=this.id?n["g"]:n["f"];this.$refs["form"].validate(function(a){if(a){var o=!0===e;r(Object(i["c"])(t.form),o).then(function(e){var r=e.data;r.data&&(t.$message({message:"招聘信息".concat(t.methodName,"成功"),type:"success"}),t.onGoBack())})}})}}},u=c,m=r("2877"),p=Object(m["a"])(u,a,o,!1,null,null,null);t["default"]=p.exports},"84df":function(e,t,r){"use strict";r.d(t,"a",function(){return n});var a=r("c1df"),o=r.n(a),n=function(){return o()().format("YYYY-MM-DD HH:mm:ss")}},f8bb:function(e,t,r){"use strict";r.d(t,"b",function(){return n}),r.d(t,"a",function(){return i}),r.d(t,"d",function(){return s}),r.d(t,"e",function(){return u}),r.d(t,"c",function(){return c}),r.d(t,"g",function(){return p}),r.d(t,"f",function(){return d});var a=r("0e0b"),o=r("84df"),n={status:{1:"待发布",2:"招聘中",3:"结束招聘"},targetCount:{0:"否",1:"是"}},i=[{prop:"dept",label:"招聘部门"},{prop:"recruitsCount",label:"招聘人数"},{prop:"jobType",label:"工作类型"},{prop:"applicationTime",label:"招聘发布时间"},{prop:"status",label:"招聘状态",type:"dict"}],s=function(){return{id:"",position:[],positionName:"",dept:[],deptName:"",recruitsCount:0,targetCount:0,academicId:"",jobTypeId:"",years:"",profession:"",place:"",sex:1,sexName:"",treatment:"",language:"",term:Object(o["a"])(),welfare:[],welfareTreatmentList:[],status:"",duties:"",claim:""}},l=function(){return{id:"",positionId:"",deptId:"",recruitsCount:0,targetCount:0,academicId:"",jobTypeId:"",years:0,profession:"",place:"",sex:1,treatment:"",language:"",term:"",welfare:"",duties:"",claim:""}},c=function(e){var t=Object(a["g"])(l(),e);return t.positionId=e.position[e.position.length-1],t.deptId=e.dept[e.dept.length-1],t},u=function(){return{position:[],dept:[],sex:0,status:null,rangeTime:null}},m=function(){return{positionId:null,deptId:null,sex:0,status:null,startTime:null,endTime:null}},p=function(e){var t=Object(a["g"])(m(),e);return t.sex=e.sex?e.sex:null,t.positionId=e.position.length&&e.position[e.position.length-1],t.deptId=e.dept&&e.dept[e.dept.length-1],e.rangeTime&&(t.startTime=e.rangeTime[0],t.endTime=e.rangeTime[1]),t},d={position:[{required:!0,type:"array",message:"请填写岗位",trigger:"blur"}],dept:[{required:!1,message:"请填写部门",trigger:"blur"}],recruitsCount:[{required:!0,message:"请填写招聘人数",trigger:"blur"}],targetCount:[{required:!0,message:"请选择是否紧急",trigger:"blur"}],academicId:[{required:!0,message:"请填写学历要求",trigger:"blur"}],jobTypeId:[{required:!0,message:"请填写工作类型",trigger:"blur"}],years:[{required:!0,message:"请填写工作年限",trigger:"blur"}],profession:[{required:!0,message:"请填写专业要求",trigger:"blur"}],place:[{required:!0,message:"请填写工作地点",trigger:"blur"}],sex:[{required:!0,message:"请填写性别",trigger:"blur"}],treatment:[{required:!0,message:"请填写工资待遇",trigger:"blur"}],language:[{required:!0,message:"请填写外语要求",trigger:"blur"}],term:[{required:!0,message:"请填写招聘期限",trigger:"blur"}],welfare:[{type:"array",required:!0,message:"请填写福利待遇",trigger:"blur"}],duties:[{required:!0,message:"请填写岗位职责",trigger:"blur"}],claim:[{required:!0,message:"请填写岗位要求",trigger:"blur"}]}}}]);