(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e14b8332"],{"228f":function(t,e,a){"use strict";var n=a("40d4"),r=a.n(n);r.a},"2f9e":function(t,e,a){"use strict";a.d(e,"a",function(){return r});a("ac6a"),a("28a5"),a("a481");var n=a("b5c6");function r(t){var e=t.url,a=t.method,r=void 0===a?"post":a,c=t.data,i=void 0===c?{}:c,l=t.title,s=void 0===l?"":l;return console.log(e),new Promise(function(t){return Object(n["a"])({url:e,method:r,headers:{responseType:"arraybuffer"},data:i,responseType:"blob"}).then(function(e){o({title:s,response:e}).then(function(){t()})})})}function o(t){var e=t.title,a=void 0===e?"":e,n=t.response,r=c(n.headers["content-disposition"].replace(/"/g,""));return new Promise(function(t){var e=n.headers,o=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,a);else{var c=document.createElement("a");c.href=window.URL.createObjectURL(o),c.download=a?"".concat(a,".").concat(r.suffix):r.filename,document.body.appendChild(c),c.style.display="none",c.click()}t()})}function c(t){var e={},a=t.split(";");return a.forEach(function(t){var a=t.replace(/^\s+|\s+$/g,""),n=a.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]}),e.suffix=e.filename.split(".")[1],e}},"40d4":function(t,e,a){},4917:function(t,e,a){"use strict";var n=a("cb7c"),r=a("9def"),o=a("0390"),c=a("5f1b");a("214f")("match",1,function(t,e,a,i){return[function(a){var n=t(this),r=void 0==a?void 0:a[e];return void 0!==r?r.call(a,n):new RegExp(a)[e](String(n))},function(t){var e=i(a,t,this);if(e.done)return e.value;var l=n(t),s=String(this);if(!l.global)return c(l,s);var u=l.unicode;l.lastIndex=0;var d,f=[],p=0;while(null!==(d=c(l,s))){var m=String(d[0]);f[p]=m,""===m&&(l.lastIndex=o(s,r(l.lastIndex),u)),p++}return 0===p?null:f}]})},"6c21":function(t,e,a){"use strict";a.d(e,"g",function(){return c}),a.d(e,"j",function(){return i}),a.d(e,"a",function(){return l}),a.d(e,"h",function(){return s}),a.d(e,"d",function(){return u}),a.d(e,"b",function(){return d}),a.d(e,"e",function(){return f}),a.d(e,"k",function(){return p}),a.d(e,"l",function(){return m}),a.d(e,"f",function(){return g}),a.d(e,"i",function(){return h}),a.d(e,"c",function(){return v});var n=a("b5c6"),r=a("2f9e"),o="/tmlms/ship_owner";function c(t){return Object(n["a"])({url:"".concat(o,"/page"),method:"get",params:t})}function i(t,e){return Object(n["a"])({url:"".concat(o,"/create?type=").concat(e),method:"post",data:t})}function l(t){return Object(n["a"])({url:"".concat(o,"/delete?idcard=").concat(t),method:"post"})}function s(t){return Object(n["a"])({url:"".concat(o,"/getDetail?idcard=").concat(t),method:"get"})}function u(t){return Object(n["a"])({url:"admin/region/wholeInfoList?areaCode=".concat(t),method:"get"})}function d(t,e){return Object(n["a"])({url:"".concat(o,"/edit?type=").concat(e),method:"post",data:t})}function f(t){return Object(n["a"])({url:"admin/region/wholeInfo?areaCode=".concat(t),method:"get"})}function p(t,e){return Object(n["a"])({url:"".concat(o,"/newReview?status=").concat(t,"&idcard=").concat(e),method:"post"})}function m(t){return Object(n["a"])({url:"admin/file/upload/avatar",method:"post",data:t})}function g(t){return Object(n["a"])({url:"".concat(o,"/idcardcheck"),method:"get",params:{idcard:t}})}function h(t,e){return Object(n["a"])({url:"".concat(o,"/newedit?type=").concat(e),method:"post",data:t})}function v(t){return Object(r["a"])({url:"tmlms/tybmlmsExcelExport/downloadOwner",data:t,title:"船东信息"})}},"94b4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bvillage_detail"},[a("basic-container",[a("h1",[t._v("申请基层组织")]),a("el-form",{ref:"form",attrs:{model:t.bvillage,"label-width":"150px",rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"基层名称:",prop:"villageName"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.bvillage.villageName,callback:function(e){t.$set(t.bvillage,"villageName",e)},expression:"bvillage.villageName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人:",prop:"contactName"}},[a("el-input",{attrs:{placeholder:"",disabled:t.haveInfo.realName},model:{value:t.bvillage.contactName,callback:function(e){t.$set(t.bvillage,"contactName",e)},expression:"bvillage.contactName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"手机号码:",prop:"phone"}},[a("el-input",{attrs:{placeholder:"",disabled:t.haveInfo.phone},model:{value:t.bvillage.phone,callback:function(e){t.$set(t.bvillage,"phone",e)},expression:"bvillage.phone"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"基层组织类型:",prop:"type"}},[a("el-radio-group",{model:{value:t.bvillage.type,callback:function(e){t.$set(t.bvillage,"type",e)},expression:"bvillage.type"}},[a("el-radio",{attrs:{label:1}},[t._v("公司")]),a("el-radio",{attrs:{label:2}},[t._v("服务站")])],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"amap-page-container",attrs:{label:"基层地址:",prop:"address"}},[a("el-input",{attrs:{placeholder:"请输入地址"},model:{value:t.bvillage.address,callback:function(e){t.$set(t.bvillage,"address",e)},expression:"bvillage.address"}})],1)],1),a("el-col",{attrs:{span:16}},[a("el-form-item",{attrs:{label:"介绍:",prop:"content"}},[a("el-input",{attrs:{type:"textarea",placeholder:""},model:{value:t.bvillage.content,callback:function(e){t.$set(t.bvillage,"content",e)},expression:"bvillage.content"}})],1)],1)],1)],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:t.save}},[t._v("提交")]),a("el-button",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),c=(a("ac6a"),a("4917"),a("daa6")),i=a("6c21"),l=a("8f9b"),s=a("23d6"),u=a("e420"),d={mixins:[u["a"]],data:function(){var t=function(t,e,a){""===e?a(new Error("请输入联系电话")):e.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?a():a(new Error("请输入正确的手机号码!"))};return{bvillage:{address:"",phone:"",contactName:"",content:"",villageId:"",villageName:"",type:1},rules:{villageName:[{required:!0,message:"请输入基层组织名称",trigger:"blur"}],contactName:[{required:!0,message:"请输入联系人",trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:t,trigger:"blur"}]},options:[],marker:[121.59996,31.197646],searchOption:{city:"全国",citylimit:!1},mapCenter:[121.59996,31.197646],plugin:[],props:{value:"areaCode",label:"name",children:"childList"},arr:[],isDetail:{}}},methods:{save:function(){var t=this;this.$refs["form"].validate(function(e){if(!e)return!1;var a=2,n=JSON.parse(JSON.stringify(t.bvillage));n.lat=t.marker[1],n.lng=t.marker[0],n.villageId=n.villageId[n.villageId.length-1],console.log(t.isDetail),t.isDetail?(console.log("2222"),Object(c["c"])(n,a).then(function(e){t.$message({message:e.data.msg,type:"success"}),t.$router.go(-1)}).catch(function(e){t.$message.error(e.message)})):(console.log("1111"),Object(c["i"])(n,a).then(function(e){t.$message({message:e.data.msg,type:"success"}),t.$router.go(-1)}).catch(function(e){t.$message.error(e.message)}))})},onSearchResult:function(t){this.mapCenter=[t[0].lng,t[0].lat],this.marker=[t[0].lng,t[0].lat]},handleItemChange:function(t){var e=this;Object(s["c"])(t[t.length-1]).then(function(a){var n=a.data.data;e.getNode(e.options,t[t.length-1],n)})},getNode:function(t,e,a){var n=this;t.forEach(function(t){t.areaCode==e?(t.childList=a,t.level<3&&t.childList.forEach(function(t){void 0===t.childList&&n.$set(t,"childList",[])})):t.childList&&0!==t.childList.length&&n.getNode(t.childList,e,a)})},getarr:function(t){this.arr.push(t.areaCode),t.child&&this.getarr(t.child)},getAll:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["b"])(this.$route.query.userId).then(function(t){return t.data.data});case 2:e=t.sent,this.isDetail=e,e?Object(i["e"])(e.villageId).then(function(t){Object(i["d"])(e.villageId).then(function(t){a.options=t.data.data}),a.getarr(t.data.data,a.arr),e.villageId=a.arr,a.bvillage=e,a.mapCenter=[a.bvillage.lng,a.bvillage.lat],a.marker=[a.bvillage.lng,a.bvillage.lat]}):Object(s["c"])(0).then(function(t){a.options=t.data.data,a.options.forEach(function(t){a.$set(t,"childList",[])})});case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},computed:{},created:function(){var t=this;l["lazyAMapApiLoaderInstance"].load().then(function(){setTimeout(function(){t.$nextTick(function(){t.getAll.call(t)})},100)})}},f=d,p=(a("228f"),a("0c7c")),m=Object(p["a"])(f,n,r,!1,null,null,null);e["default"]=m.exports},daa6:function(t,e,a){"use strict";a.d(e,"f",function(){return o}),a.d(e,"g",function(){return c}),a.d(e,"i",function(){return i}),a.d(e,"a",function(){return l}),a.d(e,"c",function(){return s}),a.d(e,"b",function(){return u}),a.d(e,"k",function(){return d}),a.d(e,"h",function(){return f}),a.d(e,"d",function(){return p}),a.d(e,"e",function(){return m}),a.d(e,"j",function(){return g});var n=a("b5c6"),r="/tmlms/village";function o(t){return Object(n["a"])({url:"".concat(r,"/page"),method:"get",params:t})}function c(){return Object(n["a"])({url:"".concat(r,"/getVillageByOrg"),method:"get"})}function i(t,e){return Object(n["a"])({url:"".concat(r,"/create?type=").concat(e),method:"post",data:t})}function l(t){return Object(n["a"])({url:"".concat(r,"/delete?userId=").concat(t),method:"post"})}function s(t,e){return Object(n["a"])({url:"".concat(r,"/edit?type=").concat(e),method:"post",data:t})}function u(t){return Object(n["a"])({url:"".concat(r,"/detail?userId=").concat(t),method:"get"})}function d(t,e){return Object(n["a"])({url:"".concat(r,"/review?status=").concat(t,"&userId=").concat(e),method:"post"})}function f(t){return Object(n["a"])({url:"".concat(r,"/page/villageshipowner"),method:"get",params:t})}function p(t){return Object(n["a"])({url:"".concat(r,"/getByVillagename"),method:"get",params:t})}function m(t){return Object(n["a"])({url:"/tmlms/relationship/countRecordWithShip",method:"get",params:t})}function g(t){return Object(n["a"])({url:"/tmlms/trainMeet/createTime?id=".concat(t.id,"&type=").concat(t.type),method:"post"})}},e420:function(t,e,a){"use strict";a("7f7f");var n=a("7ded");e["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(t,e){var a=this;Object(n["c"])().then(function(n){-1===n.data.data.roles.indexOf(1)&&-1===n.data.data.roles.indexOf(111)&&(n.data.data.sysUser.phone&&(a.$set(a.haveInfo,"phone",!0),a[t][e[0]]=n.data.data.sysUser.phone),n.data.data.sysUser.realName&&(a.$set(a.haveInfo,"realName",!0),a[t][e[1]]=n.data.data.sysUser.realName),n.data.data.sysUser.idCard&&[e[2]]&&(a.$set(a.haveInfo,"idcard",!0),a[t].idcard=n.data.data.sysUser.idCard))})}}}}}]);