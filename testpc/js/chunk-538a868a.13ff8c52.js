(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-538a868a"],{3662:function(t,e,r){"use strict";r.d(e,"l",(function(){return n})),r.d(e,"d",(function(){return i})),r.d(e,"p",(function(){return o})),r.d(e,"k",(function(){return s})),r.d(e,"n",(function(){return l})),r.d(e,"j",(function(){return u})),r.d(e,"c",(function(){return c})),r.d(e,"o",(function(){return d})),r.d(e,"i",(function(){return f})),r.d(e,"m",(function(){return m})),r.d(e,"f",(function(){return p})),r.d(e,"a",(function(){return h})),r.d(e,"e",(function(){return b})),r.d(e,"h",(function(){return g})),r.d(e,"g",(function(){return v})),r.d(e,"b",(function(){return y}));var a=r("b5c6");function n(t){return Object(a["a"])({url:"admin/tybadpos/page",method:"get",params:t})}function i(t){return Object(a["a"])({url:"admin/tybadpos/add",method:"post",data:t})}function o(t){return Object(a["a"])({url:"admin/tybadpos/update",method:"post",data:t})}function s(t){return Object(a["a"])({url:"admin/tybadpos/".concat(t),method:"get"})}function l(t){return Object(a["a"])({url:"admin/tybadpos/delete/".concat(t),method:"post"})}function u(t){return Object(a["a"])({url:"admin/tybad/pageAndSort",method:"get",params:t})}function c(t){return Object(a["a"])({url:"admin/tybad/add",method:"post",data:t})}function d(t){return Object(a["a"])({url:"admin/tybad/update",method:"post",data:t})}function f(t){return Object(a["a"])({url:"admin/tybad/".concat(t),method:"get"})}function m(t){return Object(a["a"])({url:"admin/tybad/delete/".concat(t),method:"post"})}function p(t){return Object(a["a"])({url:"/tmlms/e_ac_column/page",method:"get",params:t})}function h(t){return Object(a["a"])({url:"/tmlms/e_ac_column/saveOrUpdate",method:"post",data:t})}function b(t){return Object(a["a"])({url:"/tmlms/e_ac_column/".concat(t),method:"get"})}function g(t){return Object(a["a"])({url:"/tmlms/e_ac/page",method:"get",params:t})}function v(t){return Object(a["a"])({url:"/tmlms/e_ac/".concat(t),method:"get"})}function y(t){return Object(a["a"])({url:"/tmlms/e_ac/saveOrUpdate",method:"post",data:t})}},"50dd":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("basic-container",[r("page-header",{attrs:{title:t.title,backOption:t.backOption}}),r("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":"150px",disabled:"createAd"===t.status}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"广告位置",prop:"title"}},[r("el-input",{attrs:{disabled:"create"!==t.status},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title","string"===typeof e?e.trim():e)},expression:"form.title"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"客户端",prop:"client"}},[r("el-select",{model:{value:t.form.client,callback:function(e){t.$set(t.form,"client",e)},expression:"form.client"}},t._l(t.maps.client,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"广告宽度"}},[r("el-input",{attrs:{type:"number",disabled:"create"!==t.status},model:{value:t.form.width,callback:function(e){t.$set(t.form,"width","string"===typeof e?e.trim():e)},expression:"form.width"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"广告长度"}},[r("el-input",{attrs:{type:"number",disabled:"create"!==t.status},model:{value:t.form.height,callback:function(e){t.$set(t.form,"height","string"===typeof e?e.trim():e)},expression:"form.height"}})],1)],1)],1)],1),"createAd"===t.status?r("ad-table",{ref:"adTable",attrs:{id:t.posId,width:t.form.width,height:t.form.height}}):t._e(),"createAd"!==t.status?r("operation-wrapper",[r("iep-button",{staticStyle:{"margin-left":"150px"},attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")])],1):t._e()],1)},n=[],i=r("be08"),o=r("3662"),s=r("5491"),l={components:{adTable:s["default"]},data:function(){var t=this;return{maps:i["a"],backOption:{isBack:!0,backPath:null,backFunction:function(){t.onGoBack()}},rules:{client:[{required:!0,message:"请选择客户端",trigger:"change"}],title:[{required:!0,message:"请输入广告名",trigger:"blur"}]},status:"",form:{},posId:""}},computed:{title:function(){return"create"===this.status?"新增广告位管理":"update"===this.status?"编辑广告位管理":"广告位管理"}},mounted:function(){var t=this,e=this.$route.query;e.status&&(this.status=e.status);var r=e.id;r&&"update"===this.status?this.getList(r):r&&"createAd"===this.status&&(this.getList(r),this.posId=r,this.$nextTick((function(){console.log("ref",t.$refs.adTable),t.$refs.adTable.getList()})))},methods:{onGoBack:function(){this.$router.history.go(-1)},getList:function(t){var e=this;Object(o["k"])(t).then((function(t){var r=t.data;0===r.code&&(e.form=r.data)}))},handleSubmit:function(){var t=this;this.$refs["ruleForm"].validate((function(e){if(e){var r="create"===t.status?o["d"]:o["p"];r(t.form).then((function(e){var r=e.data;0===r.code?(t.$notify({message:"create"===t.status?"新增成功":"编辑成功",type:"success"}),t.onGoBack()):t.$notify({message:r.msg||"create"===t.status?"新增失败":"编辑失败",type:"warning"})}))}}))}}},u=l,c=r("2877"),d=Object(c["a"])(u,a,n,!1,null,"0f9f7c87",null);e["default"]=d.exports},5491:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[r("el-col",{attrs:{span:24}},[r("el-button",{attrs:{type:"primary"},on:{click:t.handleAdd}},[t._v("广告图片上传")])],1),r("el-col",{attrs:{span:24}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pagedTable,stripe:""}},[r("el-table-column",{attrs:{prop:"title",label:"广告名称"}}),r("el-table-column",{attrs:{prop:"url",label:"广告链接"}}),r("el-table-column",{attrs:{label:"操作",fixed:"right","label-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){return t.handleEdit(e.row)}}},[t._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1)],1)],1),r("ad-dialog",{ref:"adDialog",attrs:{status:t.status,width:+t.width,height:+t.height},on:{end:t.getList}})],1)},n=[],i=(r("c5f6"),r("3662")),o=r("d8c3"),s={components:{adDialog:o["default"]},props:{id:String,width:[Number,String],height:[Number,String]},data:function(){return{pagedTable:[],status:""}},methods:{getList:function(){var t=this;Object(i["j"])({posId:this.id}).then((function(e){var r=e.data;0===r.code&&(t.pagedTable=r.data.records)}))},handleAdd:function(){this.status="create",this.$refs.adDialog.open({posId:this.id})},handleEdit:function(t){this.status="update",this.$refs.adDialog.open({id:t.id,posId:this.id})},handleDelete:function(t){var e=this;this.$confirm("是否确认删除此条数据","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(i["m"])(t.id).then((function(t){var r=t.data;0===r.code&&(e.$notify({message:"删除成功",type:"success"}),e.getList())}))}))}}},l=s,u=r("2877"),c=Object(u["a"])(l,a,n,!1,null,null,null);e["default"]=c.exports},be08:function(t,e,r){"use strict";e["a"]={client:[{label:"PC",value:1},{label:"微信端",value:2}]}},d8c3:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,"before-close":t.handleBeforeClose,width:"60%"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.close}},[r("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":"150px",disabled:"detail"===t.status}},[r("el-form-item",{attrs:{label:"广告名称",prop:"title"}},[r("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title","string"===typeof e?e.trim():e)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:"广告链接"}},[r("el-input",{model:{value:t.form.url,callback:function(e){t.$set(t.form,"url","string"===typeof e?e.trim():e)},expression:"form.url"}})],1),r("el-form-item",{attrs:{label:"排序"}},[r("el-input",{attrs:{maxlength:3},model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort","string"===typeof e?e.trim():e)},expression:"form.sort"}})],1),r("el-form-item",{attrs:{label:"图片上传",prop:"fileList"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:"/api/admin/file/upload/avatar","on-success":t.handleSuccess,"on-remove":t.handleRemove,"before-upload":t.handleBeforeUpload,"file-list":t.form.fileList,limit:1,headers:t.headers,"list-type":"picture"}},[r("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v(t._s("只能上传图片文件，且不超过2M，图片宽度为"+t.width+",高度为"+t.height))])],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.close}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")])],1)],1)},n=[],i=(r("8e6e"),r("ac6a"),r("456d"),r("ade3")),o=(r("c5f6"),r("3662")),s=r("2f62");function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(i["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c=function(){return{id:"",posId:"",image:"",url:"",fileList:[],title:""}},d={props:{status:String,width:Number,height:Number},data:function(){var t=function(t,e,r){var a=/^[+]{0,1}(\d+)$/;""===e?r():a.test(e)||r(new Error("请输入正整数")),r()};return{rules:{fileList:[{required:!0,message:"请上传图片",trigger:"change"}],title:[{required:!0,message:"请输入广告名",trigger:"blur"}],url:[{required:!0,message:"请输入广告链接",trigger:"blur"}],sort:[{validator:t,trigger:"blur"}]},form:c(),dialogVisible:!1}},computed:u(u({},Object(s["c"])(["access_token"])),{},{headers:function(){return{Authorization:"Bearer "+this.access_token}}}),methods:{open:function(t){this.dialogVisible=!0,this.form.posId=t.posId,t.id&&this.getList(t.id)},close:function(){this.$refs["ruleForm"].resetFields(),this.resetForm(),this.dialogVisible=!1},resetForm:function(){this.form=c()},getList:function(t){var e=this;Object(o["i"])(t).then((function(t){var r=t.data;0===r.code&&(e.form=r.data,e.form.fileList=[{name:"",url:e.form.image}])}))},handleBeforeUpload:function(t){var e=this,r=t.size/1024/1024<2;r||this.$message.error("上传图片大小不能超过2MB");var a=this,n=new Promise((function(e,r){var n=new Image,i=window.URL||window.webkitURl;n.onload=function(){t.width=n.width,t.height=n.height;var i=n.width===a.width&&n.height===a.height;i?e():r(new Error("error"))},n.src=i.createObjectURL(t)})).then((function(){return t}),(function(){return a.$message.error("上传图片尺寸必须为".concat(e.width,"*").concat(e.height)),Promise.reject(new Error("error"))}));return r&&n},handleSuccess:function(t,e,r){console.log(t,e,r);var a={name:"",url:e.response.data.url};this.form.fileList.push(a),this.form.image=e.response.data.url},handleRemove:function(){this.form.fileList=[],this.form.image=""},handleBeforeClose:function(){this.$refs["ruleForm"].resetFields(),this.resetForm(),this.close()},handleSubmit:function(){var t=this;this.$refs["ruleForm"].validate((function(e){if(e){var r="create"===t.status?o["c"]:o["o"];r(t.form).then((function(e){var r=e.data;0===r.code?(t.$notify({message:"create"===t.status?"新增成功":"编辑成功",type:"success"}),t.$emit("end"),t.close()):t.$notify({message:"create"===t.status?"新增失败":"编辑失败",type:"warning"})}))}}))}}},f=d,m=r("2877"),p=Object(m["a"])(f,a,n,!1,null,"f6237048",null);e["default"]=p.exports}}]);