(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1839d8b7"],{"3fad":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:"建议详情"}},[r("iep-button",{on:{click:function(t){return e.onGoBack()}}},[e._v("返回建议列表")])],1),r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[r("iep-form-item",{attrs:{prop:"theme","label-name":"建议主题"}},[r("div",{staticClass:"content"},[e._v(e._s(e.form.theme))])]),r("iep-form-item",{attrs:{prop:"proposeContent","label-name":"建议内容"}},[r("div",{staticClass:"content"},[e._v(e._s(e.form.proposeContent))])]),r("iep-form-item",{attrs:{prop:"attendeeList","label-name":"接收对象"}},e._l(e.form.attendeeList,(function(t,n){return r("div",{key:n,staticClass:"content",staticStyle:{"margin-right":"5px"}},[e._v(e._s(t))])})),0),r("hr"),r("iep-form-item",{attrs:{prop:"status","label-name":"处理意见"}},[r("el-radio",{attrs:{disabled:e.isEdit,label:"2"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[e._v("采纳")]),r("el-radio",{attrs:{disabled:e.isEdit,label:"3"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[e._v("驳回")])],1),r("iep-form-item",{attrs:{prop:"proposeRelatioList[0].feedbackOpinion","label-name":"反馈意见"}},[r("iep-input-area",{attrs:{disabled:e.isEdit},model:{value:e.form.proposeRelatioList[0].feedbackOpinion,callback:function(t){e.$set(e.form.proposeRelatioList[0],"feedbackOpinion",t)},expression:"form.proposeRelatioList[0].feedbackOpinion"}})],1),r("iep-form-item",{attrs:{prop:"proposeRelatioList[0].gratuity","label-name":"打赏"}},[r("el-input",{attrs:{disabled:e.isEdit,value:e.val,maxlength:"4",size:"small"},model:{value:e.form.proposeRelatioList[0].gratuity,callback:function(t){e.$set(e.form.proposeRelatioList[0],"gratuity",e._n(t))},expression:"form.proposeRelatioList[0].gratuity"}},[r("template",{slot:"append"},[e._v("贝")])],2)],1),r("hr"),r("iep-form-item",{attrs:{"label-name":"附件"}},[e.form.annexList.length>0?r("div",e._l(e.form.annexList,(function(t){return r("a-tag",{key:t.url,on:{click:function(r){return e.handleDownload(t)}}},[r("a-icon",{attrs:{type:"paper-clip"}}),e._v(e._s(t.name))],1)})),1):r("span",[e._v("无附件")])]),r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary",disabled:e.isEdit},on:{click:e.handlePublish}},[e._v("确定")]),r("iep-button",{on:{click:e.onGoBack}},[e._v("取消")])],1)],1)],1)],1)],1)},o=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("ade3")),i=r("6a8a"),s=r("b9b5"),c=r("2934"),u=r("2f62");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={data:function(){return{rules:s["e"],id:this.$route.params.id,pageLoading:!0,disabled:!1,form:Object(s["d"])()}},computed:p(p({},Object(u["c"])(["userInfo"])),{},{isEdit:function(){return this.userInfo.userId===this.form.userId||this.disabled}}),created:function(){this.loadPage()},methods:{onGoBack:function(){this.$router.history.go(-1)},handlePublish:function(){var e=this;this.$refs["form"].validate((function(t){t&&(e.form.annexList.length>0&&(e.form.annex=e.form.annexList[0].url),e.form.proposeRelatioList.length>0&&(e.form.feedbackOpinion=e.form.proposeRelatioList[0].feedbackOpinion,e.form.gratuity=e.form.proposeRelatioList[0].gratuity),Object(i["h"])(Object(s["c"])(e.form),!0).then((function(t){var r=t.data;r.data?(e.$message({message:"回复建议成功",type:"success"}),e.onGoBack()):e.$message({message:r.msg})})))}))},handleDownload:function(e){Object(c["a"])(e)},loadPage:function(){var e=this;this.pageLoading=!0,Object(i["c"])(this.id).then((function(t){var r=t.data;e.form=e.$mergeByFirst(Object(s["d"])(),r.data),e.disabled="2"===e.form.status||"3"===e.form.status,e.pageLoading=!1}))}}},f=d,m=(r("e07d"),r("2877")),b=Object(m["a"])(f,n,o,!1,null,"221226c0",null);t["default"]=b.exports},"6a8a":function(e,t,r){"use strict";r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return i})),r.d(t,"c",(function(){return s})),r.d(t,"f",(function(){return c})),r.d(t,"g",(function(){return u})),r.d(t,"h",(function(){return l})),r.d(t,"b",(function(){return p})),r.d(t,"a",(function(){return d}));var n=r("b5c6"),o="/cpms/suggestion";function a(e){return Object(n["a"])({url:"".concat(o,"/pageIssue"),method:"get",params:e})}function i(e){return Object(n["a"])({url:"".concat(o,"/pageReceived"),method:"get",params:e})}function s(e){return Object(n["a"])({url:"".concat(o,"/").concat(e),method:"get"})}function c(e){return Object(n["a"])({url:"".concat(o,"/create"),method:"post",data:e})}function u(e){return Object(n["a"])({url:"".concat(o,"/update"),method:"post",data:e})}function l(e){return Object(n["a"])({url:"".concat(o,"/feedback"),method:"post",data:e})}function p(e){return Object(n["a"])({url:"".concat(o,"/delete/batch"),method:"post",data:[e]})}function d(e){return Object(n["a"])({url:"".concat(o,"/delete/batch"),method:"post",data:e})}},b9b5:function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return s})),r.d(t,"d",(function(){return c})),r.d(t,"c",(function(){return u})),r.d(t,"e",(function(){return l}));r("8e6e"),r("ac6a"),r("456d");var n=r("ade3");function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){Object(n["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i={status:{0:"草稿",1:"未处理",2:"以采纳",3:"已驳回"}},s=[{prop:"status",label:"状态",type:"dict"},{prop:"sendTime",label:"发送时间"}],c=function(){return{id:"",userId:"",theme:"",status:"",proposeContent:"",attendeeList:"",attendeeId:"",feedbackOpinion:"",gratuity:"",disabled:"",annexList:[],fileName:"",proposeRelatioList:""}},u=function(e){var t=a({},e);return t},l={theme:[{required:!0,message:"请填写建议主题",trigger:"blur"}],proposeContent:[{required:!0,message:"请填写建议内容",trigger:"blur"}],attendeeId:[{required:!0,message:"请填写接收对象",trigger:"blur"}],feedbackStatus:[{required:!0,message:"请填写处理意见",trigger:"blur"}],feedbackOpinion:[{required:!0,message:"请填写反馈意见",trigger:"blur"}],gratuity:[{required:!0,message:"请输入打赏金额",trigger:"blur"}]}},e07d:function(e,t,r){"use strict";r("e799")},e799:function(e,t,r){}}]);