(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8298a8b4"],{"10eb":function(t,e,r){},"1e7a":function(t,e,r){"use strict";r.d(e,"e",(function(){return n})),r.d(e,"f",(function(){return o})),r.d(e,"a",(function(){return c})),r.d(e,"d",(function(){return s})),r.d(e,"b",(function(){return l})),r.d(e,"c",(function(){return u}));var a=r("b5c6"),i="/tmlms/dept";function n(t){return Object(a["a"])({url:"".concat(i,"/page"),method:"get",params:t})}function o(t,e){return Object(a["a"])({url:"".concat(i,"/create?type=").concat(e),method:"post",data:t})}function c(t){return Object(a["a"])({url:"".concat(i,"/delete?userId=").concat(t),method:"post"})}function s(t,e){return Object(a["a"])({url:"".concat(i,"/edit?type=").concat(e),method:"post",data:t})}function l(t){return Object(a["a"])({url:"".concat(i,"/detail?userId=").concat(t),method:"get"})}function u(t){return Object(a["a"])({url:"".concat(i,"/editSort"),method:"post",data:t})}},"2a09":function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return n})),r.d(e,"f",(function(){return d})),r.d(e,"d",(function(){return p})),r.d(e,"c",(function(){return c})),r.d(e,"e",(function(){return l})),r.d(e,"g",(function(){return m}));var a=r("84df"),i=r("0e0b"),n={isRcmd:{0:"不推荐",1:"推荐"}},o=[{label:"资讯标题",prop:"title"},{label:"来源",prop:"source"},{label:"资讯类别",prop:"type",dictName:"tyb_article_type",type:"dictGroup"},{label:"是否跳转链接",prop:"isDispatch"},{label:"创建时间",prop:"createTime"}],c=function(t){var e=Object(i["g"])(s(),t);return e},s=function(){return{articleId:"",title:"",type:"",source:"",image:"",description:"",isRcmd:"",createTime:Object(a["a"])(),updateTime:Object(a["a"])(),articleContent:"",isDispatch:0,httpSrc:"",train:""}},l=function(){return{title:"",source:""}},u=function(){return{title:"",source:""}},m=function(t){var e=Object(i["g"])(u(),t);return e.title=t.title?t.title:null,e.source=t.source?t.source:null,e},p=function(){return{articleId:"",title:"",type:"",source:"",image:"",description:"",isRcmd:0,createTime:Object(a["a"])(),updateTime:Object(a["a"])(),articleContent:"",isDispatch:0,httpSrc:""}},d={title:[{required:!0,message:"请填资讯标题",trigger:"blur"},{min:0,max:50,message:"长度在 0 到 50 个字符",trigger:"blur"}],source:[{required:!0,message:"请填来源",trigger:"blur"},{min:0,max:50,message:"长度在 0 到 50 个字符",trigger:"blur"}],type:[{required:!0,message:"请填分类",trigger:"blur"}],isRcmd:[{required:!0,message:"请填是否推荐",trigger:"blur"}],description:[{required:!0,message:"请填描述",trigger:"blur"},{min:0,max:50,message:"长度在 0 到 50 个字符",trigger:"blur"}],isDispatch:[{required:!0,message:"请选择一个选项",trigger:"blur"}]}},"84df":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var a=r("c1df"),i=r.n(a),n=function(){return i()().format("YYYY-MM-DD HH:mm:ss")}},9100:function(t,e,r){"use strict";r("10eb")},ce40:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:t.methodName+"资讯",backOption:t.backOption}}),r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"140px",size:"small"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"资讯标题：",prop:"title"}},[r("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"分类：",prop:"type"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_article_type"},on:{change:t.changType},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"来源：",prop:"source"}},[r("el-input",{model:{value:t.form.source,callback:function(e){t.$set(t.form,"source",e)},expression:"form.source"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"是否推荐：",prop:"isRcmd"}},[r("el-radio-group",{model:{value:t.form.isRcmd,callback:function(e){t.$set(t.form,"isRcmd",e)},expression:"form.isRcmd"}},t._l(t.dictsMap.isRcmd,(function(e,a){return r("el-radio",{key:a,attrs:{label:+a}},[t._v(t._s(e))])})),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"描述：",prop:"description"}},[r("el-input",{model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"是否跳转：",prop:"isDispatch"}},[r("el-radio-group",{on:{change:t.radioChange},model:{value:t.form.isDispatch,callback:function(e){t.$set(t.form,"isDispatch",e)},expression:"form.isDispatch"}},[r("el-radio",{attrs:{label:0}},[t._v("不跳转链接")]),r("el-radio",{attrs:{label:1}},[t._v("跳转链接")])],1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"图片：",prop:"image"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccess,headers:t.headers,accept:"image/*"}},[t.form.image?r("img",{staticClass:"avatar",attrs:{src:t.form.image}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],attrs:{label:"资讯跳转链接：",prop:"httpSrc"}},[r("el-input",{attrs:{maxlength:"80"},model:{value:t.form.httpSrc,callback:function(e){t.$set(t.form,"httpSrc",e)},expression:"form.httpSrc"}},[r("template",{slot:"prepend"},[t._v("http://")])],2)],1)],1)],1),t.isTrain?r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"代办机构：",prop:"train"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.train,callback:function(e){t.$set(t.form,"train",e)},expression:"form.train"}},t._l(t.trainList,(function(t){return r("el-option",{key:t.value,attrs:{label:t.deptName,value:t.userId}})})),1)],1)],1)],1):t._e(),r("el-row",[r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:t.isArticle,expression:"isArticle"}],attrs:{label:"资讯内容：",prop:"articleContent"}},[r("iep-froala-editor",{model:{value:t.form.articleContent,callback:function(e){t.$set(t.form,"articleContent",e)},expression:"form.articleContent"}})],1)],1),r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1)],1)],1)],1)],1)},i=[],n=r("f874"),o=r("1e7a"),c=r("2a09"),s=r("4360"),l={data:function(){var t=this;return{backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},rules:c["f"],form:Object(c["d"])(),init:!1,dictsMap:c["b"],headers:{Authorization:"Bearer "+s["a"].getters.access_token},isShow:!1,isArticle:!0,methodName:"",trainList:"",isTrain:!1}},computed:{articleId:function(){return this.$route.params.articleId}},mounted:function(){this.methodName=0==this.articleId?"发布":"编辑"},created:function(){var t=this;0!=this.articleId&&Object(n["c"])(this.articleId).then((function(e){var r=e.data;t.form=t.$mergeByFirst(Object(c["d"])(),r.data);var a=t.form.isDispatch;t.isShow=1==a,t.isArticle=0==a,t.form.httpSrc&&(t.form.httpSrc=t.form.httpSrc.substring(7))})),Object(o["e"])().then((function(e){t.trainList=e.data.data.records}))},methods:{changType:function(t){this.isTrain=8==t},handleSubmit:function(t){var e=this,r=0==this.articleId?n["a"]:n["e"];this.$refs["form"].validate((function(a){if(a){e.form.httpSrc="http://"+e.form.httpSrc;var i=!0===t;r(Object(c["c"])(e.form),i).then((function(t){var r=t.data;r.data&&(e.$message({message:"资讯信息".concat(e.methodName,"成功"),type:"success"}),e.onGoBack())}))}}))},onGoBack:function(){this.$router.push({path:"/article_spa/article_list"})},handleAvatarSuccess:function(t){this.form.image=t.data.url},radioChange:function(t){1===t&&(this.isShow=!0,this.isArticle=!1),0===t&&(this.isShow=!1,this.isArticle=!0)}},watch:{}},u=l,m=(r("9100"),r("2877")),p=Object(m["a"])(u,a,i,!1,null,null,null);e["default"]=p.exports},f874:function(t,e,r){"use strict";r.d(e,"d",(function(){return n})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return c})),r.d(e,"e",(function(){return s})),r.d(e,"b",(function(){return l}));var a=r("b5c6"),i="/tybhrms/tybarticle";function n(t){return Object(a["a"])({url:"".concat(i,"/page"),method:"get",params:t})}function o(t){return Object(a["a"])({url:"".concat(i,"/").concat(t),method:"get"})}function c(t){return Object(a["a"])({url:"".concat(i,"/create"),method:"post",data:t})}function s(t){return Object(a["a"])({url:"".concat(i,"/update"),method:"post",data:t})}function l(t){return Object(a["a"])({url:"".concat(i,"/del/").concat(t),method:"post"})}}}]);