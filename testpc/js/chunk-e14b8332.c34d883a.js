(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e14b8332"],{"228f":function(e,t,a){"use strict";var n=a("40d4"),r=a.n(n);r.a},"2f9e":function(e,t,a){"use strict";a.d(t,"a",function(){return r});a("ac6a"),a("28a5"),a("a481");var n=a("b5c6");function r(e){var t=e.url,a=e.method,r=void 0===a?"post":a,c=e.data,i=void 0===c?{}:c,l=e.title,s=void 0===l?"":l;return console.log(t),new Promise(function(e){return Object(n["a"])({url:t,method:r,headers:{responseType:"arraybuffer"},data:i,responseType:"blob"}).then(function(t){o({title:s,response:t}).then(function(){e()})})})}function o(e){var t=e.title,a=void 0===t?"":t,n=e.response,r=c(n.headers["content-disposition"].replace(/"/g,""));return new Promise(function(e){var t=n.headers,o=new Blob([n.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,a);else{var c=document.createElement("a");c.href=window.URL.createObjectURL(o),c.download=a?"".concat(a,".").concat(r.suffix):r.filename,document.body.appendChild(c),c.style.display="none",c.click()}e()})}function c(e){var t={},a=e.split(";");return a.forEach(function(e){var a=e.replace(/^\s+|\s+$/g,""),n=a.split("=");n[1]?t[n[0]]=n[1]:t[n[0]]=n[0]}),t.suffix=t.filename.split(".")[1],t}},"40d4":function(e,t,a){},4917:function(e,t,a){"use strict";var n=a("cb7c"),r=a("9def"),o=a("0390"),c=a("5f1b");a("214f")("match",1,function(e,t,a,i){return[function(a){var n=e(this),r=void 0==a?void 0:a[t];return void 0!==r?r.call(a,n):new RegExp(a)[t](String(n))},function(e){var t=i(a,e,this);if(t.done)return t.value;var l=n(e),s=String(this);if(!l.global)return c(l,s);var u=l.unicode;l.lastIndex=0;var d,f=[],p=0;while(null!==(d=c(l,s))){var g=String(d[0]);f[p]=g,""===g&&(l.lastIndex=o(s,r(l.lastIndex),u)),p++}return 0===p?null:f}]})},"6c21":function(e,t,a){"use strict";a.d(t,"g",function(){return c}),a.d(t,"j",function(){return i}),a.d(t,"a",function(){return l}),a.d(t,"h",function(){return s}),a.d(t,"d",function(){return u}),a.d(t,"b",function(){return d}),a.d(t,"e",function(){return f}),a.d(t,"k",function(){return p}),a.d(t,"l",function(){return g}),a.d(t,"f",function(){return h}),a.d(t,"i",function(){return m}),a.d(t,"c",function(){return v});var n=a("b5c6"),r=a("2f9e"),o="/tmlms/ship_owner";function c(e){return Object(n["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function i(e,t){return Object(n["a"])({url:"".concat(o,"/create?type=").concat(t),method:"post",data:e})}function l(e){return Object(n["a"])({url:"".concat(o,"/delete?idcard=").concat(e),method:"post"})}function s(e){return Object(n["a"])({url:"".concat(o,"/getDetail?idcard=").concat(e),method:"get"})}function u(e){return Object(n["a"])({url:"admin/region/wholeInfoList?areaCode=".concat(e),method:"get"})}function d(e,t){return Object(n["a"])({url:"".concat(o,"/edit?type=").concat(t),method:"post",data:e})}function f(e){return Object(n["a"])({url:"admin/region/wholeInfo?areaCode=".concat(e),method:"get"})}function p(e,t){return Object(n["a"])({url:"".concat(o,"/newReview?status=").concat(e,"&idcard=").concat(t),method:"post"})}function g(e){return Object(n["a"])({url:"admin/file/upload/avatar",method:"post",data:e})}function h(e){return Object(n["a"])({url:"".concat(o,"/idcardcheck"),method:"get",params:{idcard:e}})}function m(e,t){return Object(n["a"])({url:"".concat(o,"/newedit?type=").concat(t),method:"post",data:e})}function v(e){return Object(r["a"])({url:"tmlms/tybmlmsExcelExport/downloadOwner",data:e,title:"船东信息"})}},"94b4":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bvillage_detail"},[a("basic-container",[a("h1",[e._v("申请基层组织")]),a("el-form",{ref:"form",attrs:{model:e.bvillage,"label-width":"150px",rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"基层名称:",prop:"villageName"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.bvillage.villageName,callback:function(t){e.$set(e.bvillage,"villageName",t)},expression:"bvillage.villageName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人:",prop:"contactName"}},[a("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.realName},model:{value:e.bvillage.contactName,callback:function(t){e.$set(e.bvillage,"contactName",t)},expression:"bvillage.contactName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"手机号码:",prop:"phone"}},[a("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.phone},model:{value:e.bvillage.phone,callback:function(t){e.$set(e.bvillage,"phone",t)},expression:"bvillage.phone"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"基层组织类型:",prop:"type"}},[a("el-radio-group",{model:{value:e.bvillage.type,callback:function(t){e.$set(e.bvillage,"type",t)},expression:"bvillage.type"}},[a("el-radio",{attrs:{label:1}},[e._v("公司")]),a("el-radio",{attrs:{label:2}},[e._v("服务站")])],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"amap-page-container",attrs:{label:"基层地址:",prop:"address"}},[a("el-input",{attrs:{placeholder:"请输入地址"},model:{value:e.bvillage.address,callback:function(t){e.$set(e.bvillage,"address",t)},expression:"bvillage.address"}})],1)],1),a("el-col",{attrs:{span:16}},[a("el-form-item",{attrs:{label:"介绍:",prop:"content"}},[a("el-input",{attrs:{type:"textarea",placeholder:""},model:{value:e.bvillage.content,callback:function(t){e.$set(e.bvillage,"content",t)},expression:"bvillage.content"}})],1)],1)],1)],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:e.save}},[e._v("提交")]),a("el-button",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),c=(a("ac6a"),a("4917"),a("daa6")),i=a("6c21"),l=a("8f9b"),s=a("23d6"),u=a("e420"),d={mixins:[u["a"]],data:function(){var e=function(e,t,a){""===t?a(new Error("请输入联系电话")):t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?a():a(new Error("请输入正确的手机号码!"))};return{bvillage:{address:"",phone:"",contactName:"",content:"",villageId:"",villageName:"",type:1},rules:{villageName:[{required:!0,message:"请输入基层组织名称",trigger:"blur"}],contactName:[{required:!0,message:"请输入联系人",trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:e,trigger:"blur"}]},options:[],marker:[121.59996,31.197646],searchOption:{city:"全国",citylimit:!1},mapCenter:[121.59996,31.197646],plugin:[],props:{value:"areaCode",label:"name",children:"childList"},arr:[],isDetail:{}}},methods:{save:function(){var e=this;this.$refs["form"].validate(function(t){if(!t)return!1;var a=2,n=JSON.parse(JSON.stringify(e.bvillage));n.lat=e.marker[1],n.lng=e.marker[0],n.villageId=n.villageId[n.villageId.length-1],console.log(e.isDetail),e.isDetail?(console.log("2222"),Object(c["c"])(n,a).then(function(t){e.$message({message:t.data.msg,type:"success"}),e.$router.go(-1)}).catch(function(t){e.$message.error(t.message)})):(console.log("1111"),Object(c["i"])(n,a).then(function(t){e.$message({message:t.data.msg,type:"success"}),e.$router.go(-1)}).catch(function(t){e.$message.error(t.message)}))})},onSearchResult:function(e){this.mapCenter=[e[0].lng,e[0].lat],this.marker=[e[0].lng,e[0].lat]},handleItemChange:function(e){var t=this;Object(s["c"])(e[e.length-1]).then(function(a){var n=a.data.data;t.getNode(t.options,e[e.length-1],n)})},getNode:function(e,t,a){var n=this;e.forEach(function(e){e.areaCode==t?(e.childList=a,e.level<3&&e.childList.forEach(function(e){void 0===e.childList&&n.$set(e,"childList",[])})):e.childList&&0!==e.childList.length&&n.getNode(e.childList,t,a)})},getarr:function(e){this.arr.push(e.areaCode),e.child&&this.getarr(e.child)},getAll:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){var t,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["b"])(this.$route.query.userId).then(function(e){return e.data.data});case 2:t=e.sent,this.isDetail=t,t?Object(i["e"])(t.villageId).then(function(e){Object(i["d"])(t.villageId).then(function(e){a.options=e.data.data}),a.getarr(e.data.data,a.arr),t.villageId=a.arr,a.bvillage=t,a.mapCenter=[a.bvillage.lng,a.bvillage.lat],a.marker=[a.bvillage.lng,a.bvillage.lat]}):Object(s["c"])(0).then(function(e){a.options=e.data.data,a.options.forEach(function(e){a.$set(e,"childList",[])})});case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},computed:{},created:function(){var e=this;l["lazyAMapApiLoaderInstance"].load().then(function(){setTimeout(function(){e.$nextTick(function(){e.getAll.call(e)})},100)})}},f=d,p=(a("228f"),a("0c7c")),g=Object(p["a"])(f,n,r,!1,null,null,null);t["default"]=g.exports},daa6:function(e,t,a){"use strict";a.d(t,"f",function(){return o}),a.d(t,"g",function(){return c}),a.d(t,"i",function(){return i}),a.d(t,"a",function(){return l}),a.d(t,"c",function(){return s}),a.d(t,"b",function(){return u}),a.d(t,"j",function(){return d}),a.d(t,"h",function(){return f}),a.d(t,"d",function(){return p}),a.d(t,"e",function(){return g});var n=a("b5c6"),r="/tmlms/village";function o(e){return Object(n["a"])({url:"".concat(r,"/page"),method:"get",params:e})}function c(){return Object(n["a"])({url:"".concat(r,"/getVillageByOrg"),method:"get"})}function i(e,t){return Object(n["a"])({url:"".concat(r,"/create?type=").concat(t),method:"post",data:e})}function l(e){return Object(n["a"])({url:"".concat(r,"/delete?userId=").concat(e),method:"post"})}function s(e,t){return Object(n["a"])({url:"".concat(r,"/edit?type=").concat(t),method:"post",data:e})}function u(e){return Object(n["a"])({url:"".concat(r,"/detail?userId=").concat(e),method:"get"})}function d(e,t){return Object(n["a"])({url:"".concat(r,"/review?status=").concat(e,"&userId=").concat(t),method:"post"})}function f(e){return Object(n["a"])({url:"".concat(r,"/page/villageshipowner"),method:"get",params:e})}function p(e){return Object(n["a"])({url:"".concat(r,"/getByVillagename"),method:"get",params:e})}function g(e){return Object(n["a"])({url:"/tmlms/relationship/countRecordWithShip",method:"get",params:e})}},e420:function(e,t,a){"use strict";a("7f7f");var n=a("7ded");t["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(e,t){var a=this;Object(n["c"])().then(function(n){-1===n.data.data.roles.indexOf(1)&&-1===n.data.data.roles.indexOf(111)&&(n.data.data.sysUser.phone&&(a.$set(a.haveInfo,"phone",!0),a[e][t[0]]=n.data.data.sysUser.phone),n.data.data.sysUser.realName&&(a.$set(a.haveInfo,"realName",!0),a[e][t[1]]=n.data.data.sysUser.realName),n.data.data.sysUser.idCard&&[t[2]]&&(a.$set(a.haveInfo,"idcard",!0),a[e].idcard=n.data.data.sysUser.idCard))})}}}}}]);