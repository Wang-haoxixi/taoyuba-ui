(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53209a56"],{"0801":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iep-page-form"},[a("basic-container",[a("div",{staticClass:"select-org-wrapper"},[a("div",{staticClass:"top-wrapper"},[a("i",{staticClass:"el-icon-warning"}),t.noOrg?a("span",{staticClass:"remind-text"},[t._v("您尚未加入任何区域，请选择")]):a("span",{staticClass:"remind-text"},[t._v("您已在 "+t._s(t.userInfo.orgName)+" 的区域")]),a("el-button",{attrs:{type:t.tabsActive?"default":"primary",size:"mini"},on:{click:function(e){t.tabsActive=0}}},[t._v("加入区域")]),t.ifismanage?a("el-button",{attrs:{type:t.tabsActive?"primary":"default",size:"mini"},on:{click:function(e){t.tabsActive=1}}},[t._v("创建区域")]):t._e()],1),a("div",{staticClass:"bottom-wrapper"},[0===t.tabsActive?[a("a-input-search",{staticClass:"search-box",attrs:{placeholder:"请输入组织名进行搜索",enterButton:""},on:{search:t.onSearch}}),t.orgList.length?t._e():a("iep-no-data",{attrs:{message:"无相关组织"}}),a("div",{staticClass:"select-org-container"},t._l(t.orgList,function(e,n){return a("el-button",{key:n,staticClass:"grid-item",attrs:{disabled:!!e.isApplyed},on:{click:function(a){return t.handleApplyJoin(e)}}},[t._v(t._s(e.name))])}),1)]:t._e(),1===t.tabsActive?a("div",{staticClass:"create-org-container"},[a("el-form",{ref:"form",attrs:{rules:t.rules,size:"small",model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"组织名称",prop:"name"}},[a("el-input",{attrs:{maxlength:110},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"Logo",prop:"logo"}},[a("iep-avatar",{model:{value:t.form.logo,callback:function(e){t.$set(t.form,"logo",e)},expression:"form.logo"}})],1),a("el-form-item",{attrs:{label:"组织简介",prop:"intro"}},[a("iep-input-area",{model:{value:t.form.intro,callback:function(e){t.$set(t.form,"intro",e)},expression:"form.intro"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("立即创建")]),a("el-button",{on:{click:function(e){return t.resetForm("form")}}},[t._v("重置")])],1)],1)],1):t._e()],2)])]),a("iep-dialog",{attrs:{title:"申请","dialog-show":t.dialogVisible,width:"520"},on:{close:function(e){return t.loadPage()}}},[a("el-form",{ref:"applyForm",attrs:{model:t.applyForm,size:"small","label-width":"80px"}},[a("el-form-item",{attrs:{label:"组织名称"}},[a("el-input",{attrs:{disabled:""},model:{value:t.applyForm.name,callback:function(e){t.$set(t.applyForm,"name",e)},expression:"applyForm.name"}})],1),a("el-form-item",{attrs:{label:"申请理由"}},[a("iep-input-area",{attrs:{placeholder:"请输入申请理由"},model:{value:t.applyForm.message,callback:function(e){t.$set(t.applyForm,"message",e)},expression:"applyForm.message"}})],1)],1),a("template",{slot:"footer"},[a("iep-button",{attrs:{type:"primary"},on:{click:t.handleSubmitApply}},[t._v("申 请")]),a("iep-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1)],2)],1)},r=[],o=(a("6762"),a("2fdb"),a("7f7f"),a("be94")),i=a("2f62"),s=function(){return{name:"",logo:"",intro:""}},c=a("2531"),l={name:"org",data:function(){var t=function(t,e,a){if(!e)return a(new Error("组织名不能为空"));Object(c["l"])(e).then(function(t){var e=t.data;e.data?a():a(new Error("该组织名已存在。"))})};return{tabsActive:0,orgList:[],logo:"",applyForm:{name:"",orgId:"",message:""},dialogVisible:!1,form:s(),rules:{name:[{required:!0,validator:t,trigger:"blur"},{min:3,max:100,message:"组织名称必须超过 3 个字符，但不得超过 100 个字符",trigger:"blur"}],logo:[{required:!0,message:"请输入LOGO",trigger:"blur"}],intro:[{required:!0,message:"请输入组织简介",trigger:"blur"},{min:3,max:2e3,message:"组织简介必须超过 3 个字符，但不得超过 2000 个字符",trigger:"blur"}]},ifismanage:!1}},computed:Object(o["a"])({},Object(i["c"])(["userInfo","noOrg"])),created:function(){this.loadPage(),this.checkmanage(),console.log(this.ifismanage)},methods:{handleSubmitApply:function(){var t=this;this.$refs["applyForm"].validate(function(e){e&&Object(c["b"])(t.applyForm).then(function(e){var a=e.data;a.data?(t.$message({message:"申请提交成功，请等待审核通过",type:"success"}),t.dialogVisible=!1,t.loadPage()):t.$message({message:a.msg,type:"warning"})})})},handleApplyJoin:function(t){this.applyForm.name=t.name,this.applyForm.orgId=t.orgId,this.applyForm.message="",this.dialogVisible=!0},handleAvatarSuccess:function(t,e){this.logo=URL.createObjectURL(e.raw),this.form.logo=t.data.bucketName+"-"+t.data.fileName},onSearch:function(t){this.loadPage(t)},loadPage:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.dialogVisible=!1,Object(c["d"])(e).then(function(e){var a=e.data;t.orgList=a.data})},resetForm:function(t){this.$refs[t].resetFields()},onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){t&&Object(c["a"])(e.form).then(function(t){var a=t.data;a.data?(e.$message({message:"创建成功，等待审核",type:"success"}),e.tabsActive=0,e.form=s()):e.$message({message:a.msg,type:"warning"})})})},checkmanage:function(){JSON.parse(localStorage.getItem("user")).roles.includes(1)&&(this.ifismanage=!0)}}},u=l,m=(a("42d2"),a("2877")),d=Object(m["a"])(u,n,r,!1,null,"60fa3c18",null);e["default"]=d.exports},2531:function(t,e,a){"use strict";a.d(e,"c",function(){return o}),a.d(e,"e",function(){return i}),a.d(e,"h",function(){return s}),a.d(e,"k",function(){return c}),a.d(e,"i",function(){return l}),a.d(e,"j",function(){return u}),a.d(e,"l",function(){return m}),a.d(e,"d",function(){return d}),a.d(e,"a",function(){return f}),a.d(e,"b",function(){return p}),a.d(e,"g",function(){return g}),a.d(e,"f",function(){return b});var n=a("b5c6"),r="/admin/org";function o(){return Object(n["a"])({url:"".concat(r),method:"get"})}function i(t){return Object(n["a"])({url:"".concat(r,"/log_list"),method:"get",params:{current:t}})}function s(t){return Object(n["a"])({url:"".concat(r,"/update"),method:"post",data:t})}function c(t){return Object(n["a"])({url:"".concat(r,"/unset/admin/").concat(t),method:"get"})}function l(t){return Object(n["a"])({url:"".concat(r,"/set/admin/").concat(t),method:"get"})}function u(){return Object(n["a"])({url:"".concat(r,"/update/open"),method:"get"})}function m(t){return Object(n["a"])({url:"".concat(r,"/repeat/").concat(t),method:"get"})}function d(t){return Object(n["a"])({url:"".concat(r,"/list"),method:"get",params:{name:t}})}function f(t){return Object(n["a"])({url:"".concat(r,"/create"),method:"post",data:t})}function p(t){return Object(n["a"])({url:"".concat(r,"/apply"),method:"post",data:t})}function g(t){return Object(n["a"])({url:"".concat(r,"/pull"),method:"post",data:t})}function b(t){return Object(n["a"])({url:"".concat(r,"/pass/joins"),method:"post",data:t})}},"42d2":function(t,e,a){"use strict";a("90f3")},"90f3":function(t,e,a){}}]);