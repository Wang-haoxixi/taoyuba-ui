(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-543e1124"],{"023e":function(t,e,r){"use strict";r("5096")},5096:function(t,e,r){},"606c":function(t,e,r){"use strict";r.d(e,"a",function(){return c}),r.d(e,"b",function(){return i}),r.d(e,"f",function(){return f}),r.d(e,"d",function(){return d}),r.d(e,"c",function(){return o}),r.d(e,"e",function(){return l}),r.d(e,"g",function(){return m});var a=r("84df"),n=r("0e0b"),i={isRcmd:{0:"不推荐",1:"推荐"}},c=[{label:"资讯标题",prop:"title"},{label:"来源",prop:"source"},{label:"描述",prop:"description"},{label:"创建时间",prop:"createTime"}],o=function(t){var e=Object(n["g"])(s(),t);return e},s=function(){return{articleId:"",title:"",type:"",source:"",image:"",description:"",isRcmd:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),articleContent:""}},l=function(){return{title:"",source:""}},u=function(){return{title:"",source:""}},m=function(t){var e=Object(n["g"])(u(),t);return e.title=t.title?t.title:null,e.source=t.source?t.source:null,e},d=function(){return{articleId:"",title:"",type:"",source:"",image:"",description:"",isRcmd:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),articleContent:""}},f={title:[{required:!0,message:"请填资讯标题",trigger:"blur"},{min:0,max:50,message:"长度在 0 到 50 个字符",trigger:"blur"}],source:[{required:!0,message:"请填来源",trigger:"blur"},{min:0,max:50,message:"长度在 0 到 50 个字符",trigger:"blur"}],isRcmd:[{required:!0,message:"请填是否推荐",trigger:"blur"}],description:[{required:!0,message:"请填描述",trigger:"blur"},{min:0,max:50,message:"长度在 0 到 50 个字符",trigger:"blur"}],articleContent:[{required:!0,message:"请填资讯内容",trigger:"blur"},{min:0,max:200,message:"长度在 0 到 200 个字符",trigger:"blur"}]}},"84df":function(t,e,r){"use strict";r.d(e,"a",function(){return i});var a=r("c1df"),n=r.n(a),i=function(){return n()().format("YYYY-MM-DD HH:mm:ss")}},9913:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:t.methodName+"培训服务",backOption:t.backOption}}),r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"140px",size:"small"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"资讯标题：",prop:"title"}},[r("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"来源：",prop:"source"}},[r("el-input",{model:{value:t.form.source,callback:function(e){t.$set(t.form,"source",e)},expression:"form.source"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"描述：",prop:"description"}},[r("el-input",{model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"是否推荐：",prop:"isRcmd"}},[r("el-radio-group",{model:{value:t.form.isRcmd,callback:function(e){t.$set(t.form,"isRcmd",e)},expression:"form.isRcmd"}},t._l(t.dictsMap.isRcmd,function(e,a){return r("el-radio",{key:a,attrs:{label:+a}},[t._v(t._s(e))])}),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"图片：",prop:"image"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccess,headers:t.headers,accept:"image/*"}},[t.form.image?r("img",{staticClass:"avatar",attrs:{src:t.form.image}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),r("el-form-item",{attrs:{label:"资讯内容：",prop:"articleContent"}},[r("iep-froala-editor",{model:{value:t.form.articleContent,callback:function(e){t.$set(t.form,"articleContent",e)},expression:"form.articleContent"}})],1),r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1)],1)],1)],1)},n=[],i=r("f874"),c=r("606c"),o=r("4360"),s={data:function(){var t=this;return{backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},rules:c["f"],form:Object(c["d"])(),init:!1,dictsMap:c["b"],headers:{Authorization:"Bearer "+o["a"].getters.access_token}}},computed:{articleId:function(){return+this.$route.params.articleId},methodName:function(){return this.articleId?"编辑":"发布"}},created:function(){var t=this;this.articleId&&Object(i["c"])(this.articleId).then(function(e){var r=e.data;t.form=t.$mergeByFirst(Object(c["d"])(),r.data)})},mounted:function(){},methods:{handleSubmit:function(t){var e=this,r=this.articleId?i["e"]:i["a"];this.$refs["form"].validate(function(a){if(a){var n=!0===t;e.form.type=3,r(Object(c["c"])(e.form),n).then(function(t){var r=t.data;r.data&&(e.$message({message:"资讯信息".concat(e.methodName,"成功"),type:"success"}),e.onGoBack())})}})},onGoBack:function(){this.$router.push({path:"/article_spa/service_list"})},handleAvatarSuccess:function(t){this.form.image=t.data.url}},watch:{}},l=s,u=(r("023e"),r("2877")),m=Object(u["a"])(l,a,n,!1,null,null,null);e["default"]=m.exports},f874:function(t,e,r){"use strict";r.d(e,"d",function(){return i}),r.d(e,"c",function(){return c}),r.d(e,"a",function(){return o}),r.d(e,"e",function(){return s}),r.d(e,"b",function(){return l});var a=r("b5c6"),n="/tybhrms/tybarticle";function i(t){return Object(a["a"])({url:"".concat(n,"/page"),method:"get",params:t})}function c(t){return Object(a["a"])({url:"".concat(n,"/").concat(t),method:"get"})}function o(t){return Object(a["a"])({url:"".concat(n,"/create"),method:"post",data:t})}function s(t){return Object(a["a"])({url:"".concat(n,"/update"),method:"post",data:t})}function l(t){return Object(a["a"])({url:"".concat(n,"/del/").concat(t),method:"post"})}}}]);