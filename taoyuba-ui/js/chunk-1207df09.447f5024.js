(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1207df09"],{"0a0b":function(e,t,a){},"3a2d":function(e,t,a){"use strict";a("0a0b")},4917:function(e,t,a){"use strict";var r=a("cb7c"),n=a("9def"),l=a("0390"),o=a("5f1b");a("214f")("match",1,function(e,t,a,i){return[function(a){var r=e(this),n=void 0==a?void 0:a[t];return void 0!==n?n.call(a,r):new RegExp(a)[t](String(r))},function(e){var t=i(a,e,this);if(t.done)return t.value;var s=r(e),c=String(this);if(!s.global)return o(s,c);var u=s.unicode;s.lastIndex=0;var d,g=[],h=0;while(null!==(d=o(s,c))){var f=String(d[0]);g[h]=f,""===f&&(s.lastIndex=l(c,n(s.lastIndex),u)),h++}return 0===h?null:g}]})},daa6:function(e,t,a){"use strict";a.d(t,"f",function(){return l}),a.d(t,"g",function(){return o}),a.d(t,"i",function(){return i}),a.d(t,"a",function(){return s}),a.d(t,"c",function(){return c}),a.d(t,"b",function(){return u}),a.d(t,"k",function(){return d}),a.d(t,"h",function(){return g}),a.d(t,"d",function(){return h}),a.d(t,"e",function(){return f}),a.d(t,"j",function(){return v});var r=a("b5c6"),n="/tmlms/village";function l(e){return Object(r["a"])({url:"".concat(n,"/page"),method:"get",params:e})}function o(){return Object(r["a"])({url:"".concat(n,"/getVillageByOrg"),method:"get"})}function i(e,t){return Object(r["a"])({url:"".concat(n,"/create?type=").concat(t),method:"post",data:e})}function s(e){return Object(r["a"])({url:"".concat(n,"/delete?userId=").concat(e),method:"post"})}function c(e,t){return Object(r["a"])({url:"".concat(n,"/edit?type=").concat(t),method:"post",data:e})}function u(e){return Object(r["a"])({url:"".concat(n,"/detail?userId=").concat(e),method:"get"})}function d(e,t){return Object(r["a"])({url:"".concat(n,"/review?status=").concat(e,"&userId=").concat(t),method:"post"})}function g(e){return Object(r["a"])({url:"".concat(n,"/page/villageshipowner"),method:"get",params:e})}function h(e){return Object(r["a"])({url:"".concat(n,"/getByVillagename"),method:"get",params:e})}function f(e){return Object(r["a"])({url:"/tmlms/relationship/countRecordWithShip",method:"get",params:e})}function v(e){return Object(r["a"])({url:"/tmlms/trainMeet/createTime?id=".concat(e.id,"&type=").concat(e.type),method:"post"})}},e420:function(e,t,a){"use strict";a("7f7f");var r=a("7ded");t["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(e,t){var a=this;Object(r["c"])().then(function(r){-1===r.data.data.roles.indexOf(1)&&-1===r.data.data.roles.indexOf(111)&&(r.data.data.sysUser.phone&&(a.$set(a.haveInfo,"phone",!0),a[e][t[0]]=r.data.data.sysUser.phone),r.data.data.sysUser.realName&&(a.$set(a.haveInfo,"realName",!0),a[e][t[1]]=r.data.data.sysUser.realName),r.data.data.sysUser.idCard&&[t[2]]&&(a.$set(a.haveInfo,"idcard",!0),a[e].idcard=r.data.data.sysUser.idCard))})}}}},fa38:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bvillage_detail"},[e.show?a("basic-container",[e.$route.query.userId?e._e():a("h1",[e._v(e._s(e.$route.query.see?"查看":e.$route.query.edit?"编辑":"新增")+"基层组织")]),e.$route.query.userId?a("h1",[e._v("完善个人信息")]):e._e(),a("el-form",{ref:"form",attrs:{model:e.bvillage,"label-width":"150px",rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"基层名称:",prop:"villageName"}},[e.$route.query.see?a("div",[e._v(e._s(e.bvillage.villageName))]):a("el-input",{attrs:{placeholder:""},model:{value:e.bvillage.villageName,callback:function(t){e.$set(e.bvillage,"villageName",t)},expression:"bvillage.villageName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人:",prop:"contactName"}},[e.$route.query.see?a("div",[e._v(e._s(e.bvillage.contactName))]):a("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.realName},model:{value:e.bvillage.contactName,callback:function(t){e.$set(e.bvillage,"contactName",t)},expression:"bvillage.contactName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"手机号码:",prop:"phone"}},[e.$route.query.see?a("div",[e._v(e._s(e.bvillage.phone))]):a("el-input",{attrs:{placeholder:"",disabled:e.haveInfo.phone},model:{value:e.bvillage.phone,callback:function(t){e.$set(e.bvillage,"phone",t)},expression:"bvillage.phone"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"基层组织类型:",prop:"type"}},[a("el-radio-group",{model:{value:e.bvillage.type,callback:function(t){e.$set(e.bvillage,"type",t)},expression:"bvillage.type"}},[a("el-radio",{attrs:{label:1}},[e._v("公司")]),a("el-radio",{attrs:{label:2}},[e._v("服务站")])],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"amap-page-container",attrs:{label:"基层地址:",prop:"address"}},[e.$route.query.see?a("div",[e._v(e._s(e.bvillage.address))]):a("el-input",{attrs:{placeholder:"请输入地址"},model:{value:e.bvillage.address,callback:function(t){e.$set(e.bvillage,"address",t)},expression:"bvillage.address"}})],1)],1),a("el-col",{attrs:{span:16}},[a("el-form-item",{attrs:{label:"介绍:",prop:"content"}},[e.$route.query.see?a("div",[e._v(e._s(e.bvillage.content))]):a("el-input",{attrs:{type:"textarea",placeholder:""},model:{value:e.bvillage.content,callback:function(t){e.$set(e.bvillage,"content",t)},expression:"bvillage.content"}})],1)],1)],1)],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:e.save}},[e._v("提交")]),a("el-button",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)],1):e._e()],1)},n=[],l=(a("96cf"),a("1da1")),o=(a("7f7f"),a("ac6a"),a("4917"),a("daa6")),i=a("8f9b"),s=a("23d6"),c=a("e420"),u={mixins:[c["a"]],data:function(){var e=function(e,t,a){""===t?a(new Error("请输入联系电话")):t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?a():a(new Error("请输入正确的手机号码!"))};return{show:!1,bvillage:{address:"",phone:"",contactName:"",content:"",villageId:"",villageName:"",type:1},rules:{villageName:[{required:!0,message:"请输入基层组织名称",trigger:"blur"}],contactName:[{required:!0,message:"请输入联系人",trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:e,trigger:"blur"}]},options:[],marker:[121.59996,31.197646],searchOption:{city:"全国",citylimit:!1},mapCenter:[121.59996,31.197646],plugin:[],props:{value:"areaCode",label:"name",children:"childList"},arr:[]}},methods:{save:function(){var e=this;this.$refs["form"].validate(function(t){if(!t)return!1;var a=1;if(e.$route.query.edit){var r=JSON.parse(JSON.stringify(e.bvillage));r.lat=e.marker[1],r.lng=e.marker[0],r.villageId=r.villageId[r.villageId.length-1],e.$route.query.userId&&(a=2,r.userId=e.$route.query.userId),Object(o["c"])(r,a).then(function(t){console.log(t.data.code),e.$message({message:t.data.msg,type:"success"}),e.$router.go(-1)}).catch(function(t){e.$message.error(t.message)})}else{var n=JSON.parse(JSON.stringify(e.bvillage));n.lat=e.marker[1],n.lng=e.marker[0],n.villageId=n.villageId[n.villageId.length-1],e.$route.query.userId&&(a=2,n.userId=e.$route.query.userId),Object(o["i"])(n,a).then(function(t){console.log(t.data.code),e.$message({message:t.data.msg,type:"success"}),e.$router.go(-1)}).catch(function(t){e.$message.error(t.message)})}})},onSearchResult:function(e){this.mapCenter=[e[0].lng,e[0].lat],this.marker=[e[0].lng,e[0].lat]},handleItemChange:function(e){var t=this;Object(s["c"])(e[e.length-1]).then(function(a){var r=a.data.data;t.getNode(t.options,e[e.length-1],r)})},getNode:function(e,t,a){var r=this;e.forEach(function(e){e.areaCode==t?(e.childList=a,e.level<3&&e.childList.forEach(function(e){void 0===e.childList&&r.$set(e,"childList",[])})):e.childList&&0!==e.childList.length&&r.getNode(e.childList,t,a)})},getarr:function(e){this.$route.query.edit?(this.arr.push(e.areaCode),e.child&&this.getarr(e.child)):this.$route.query.see&&(console.log(this.arr instanceof Array),this.arr instanceof Array&&(this.arr=""),this.arr="".concat(this.arr).concat(this.arr?"/":"").concat(e.name),console.log(this.arr),e.child&&this.getarr(e.child))}},computed:{},created:function(){var e=this;function t(){return a.apply(this,arguments)}function a(){return a=Object(l["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("看看"),console.log(this.$route.query.edit),e.next=4,Object(o["b"])(this.$route.query.edit||this.$route.query.see).then(function(e){return e.data.data});case 4:t=e.sent,this.bvillage=t,console.log("数据再这里"),console.log(this.bvillage);case 8:case"end":return e.stop()}},e,this)})),a.apply(this,arguments)}i["lazyAMapApiLoaderInstance"].load().then(function(){setTimeout(function(){e.show=!0,e.$route.query.edit||e.$route.query.see?t.call(e):Object(s["c"])(0).then(function(t){e.options=t.data.data,e.options.forEach(function(t){e.$set(t,"childList",[])})})},100)}),this.getInformation("bvillage",["phone","contactName"])}},d=u,g=(a("3a2d"),a("2877")),h=Object(g["a"])(d,r,n,!1,null,null,null);t["default"]=h.exports}}]);