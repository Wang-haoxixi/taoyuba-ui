(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11a48ba5"],{"35d6":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("basic-container",[n("page-header",{attrs:{title:t.form.name,backOption:t.backOption}}),n("div",{staticClass:"detail-container"},[n("div",{staticClass:"item-title"},[n("ul",[n("li",[n("span",[t._v("接收人：")]),n("span",[t._v(t._s(t.form.receiverName))])]),n("li",[n("span",[t._v("时间：")]),n("span",[t._v(t._s(t.form.time))])])]),n("el-button-group",[n("el-button",{attrs:{icon:"iconfont icon-biaoqian",size:"mini"}}),n("el-button",{attrs:{icon:"iconfont icon-shanchu",size:"mini"}})],1)],1),n("div",{staticClass:"item-con"},[n("div",{staticClass:"paragraph"},[n("msg-link",{attrs:{link:t.form,"ims-path-type":t.imsPathType}})],1)])])],1)},i=[],a=(n("8e6e"),n("ac6a"),n("456d"),n("ade3")),c=n("6eb1"),o=n("4151"),s=n.n(o),u=n("f208"),p=n("c609"),f=n("2f62");function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(a["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var h={beforeRouteUpdate:function(t,e,n){var r=this;console.log(t,e),this.$nextTick((function(){r.loadPage()})),n()},props:{record:{type:Object,default:function(){}}},components:{MsgLink:p["default"]},data:function(){return{backOption:{isBack:!0},pageLoading:!0,form:Object(u["c"])()}},computed:d(d({},Object(f["c"])(["dictGroup"])),{},{imsPathType:function(){var t=this.dictGroup["ims_path_type"];return s()(t,"value")[this.form.pathType]}}),created:function(){this.loadPage()},methods:{handleGoBack:function(){this.$emit("onGoBack")},loadPage:function(){var t=this;Object(c["a"])(this.$route.params.id).then((function(e){var n=e.data;t.form=t.$mergeByFirst(Object(u["c"])(),n.data)}))}}},b=h,m=(n("3a23"),n("2877")),O=Object(m["a"])(b,r,i,!1,null,"0fe3108d",null);e["default"]=O.exports},"386b":function(t,e,n){var r=n("5ca1"),i=n("79e5"),a=n("be13"),c=/"/g,o=function(t,e,n,r){var i=String(a(t)),o="<"+e;return""!==n&&(o+=" "+n+'="'+String(r).replace(c,"&quot;")+'"'),o+">"+i+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(o),r(r.P+r.F*i((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3})),"String",n)}},"3a23":function(t,e,n){"use strict";n("5e94")},"5e94":function(t,e,n){},"6eb1":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return s}));var r=n("b5c6"),i="/ims/system_message";function a(t){return Object(r["a"])({url:"".concat(i,"/page"),method:"get",params:t})}function c(){return Object(r["a"])({url:"".concat(i,"/type_count_map"),method:"get"})}function o(t){return Object(r["a"])({url:"".concat(i,"/").concat(t),method:"get"})}function s(t){return Object(r["a"])({url:"".concat(i,"/read_or_set/batch"),method:"post",data:t,params:{type:8}})}},b54a:function(t,e,n){"use strict";n("386b")("link",(function(t){return function(e){return t(this,"a","href",e)}}))},c609:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  "+t._s(t.link.content)+"\n  ")])},i=[],a=(n("b54a"),{name:"MsgLink",props:{link:{type:Object,required:!0},imsPathType:{type:Object,required:!0}},computed:{isCommon:function(){return this.link.pathId?"3"!==this.link.pathType?"".concat(this.imsPathType.label,"/").concat(this.link.pathId):void 0:"3"!==this.link.pathType?"".concat(this.imsPathType.label):void 0}},methods:{handleOpen:function(){this.$openPage(this.isCommon)}}}),c=a,o=n("2877"),s=Object(o["a"])(c,r,i,!1,null,null,null);e["default"]=s.exports},f208:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return a}));var r={},i=[{prop:"time",label:"时间",width:"200"}],a=function(){return{id:0,name:"",time:"",pathType:"3",pathId:"",receiverName:"",content:"",type:"",isMark:""}}}}]);