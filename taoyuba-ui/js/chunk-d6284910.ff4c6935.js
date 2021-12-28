(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d6284910"],{"823d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iep-page-form"},[a("basic-container",[a("page-header",{attrs:{title:"新增资金调拨","back-option":t.backOption}},[a("iep-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit()}}},[t._v("保存")])],1),a("el-form",{ref:"form",staticClass:"form-detail",attrs:{model:t.form,"label-width":"200px",size:"small"}},[a("h4",{staticClass:"iep-sub-title"},[t._v("基础信息")]),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调拨金额(元)"}},[a("iep-input-number",{model:{value:t.form.amount,callback:function(e){t.$set(t.form,"amount",e)},expression:"form.amount"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调拨方式"}},[a("el-radio-group",{model:{value:t.form.allocationWay,callback:function(e){t.$set(t.form,"allocationWay",e)},expression:"form.allocationWay"}},t._l(t.dictsMap.allocationWay,function(e,n){return a("el-radio",{key:n,attrs:{label:+n}},[t._v(t._s(e))])}),1)],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"日利息(%)"}},[a("iep-input-number",{model:{value:t.form.interest,callback:function(e){t.$set(t.form,"interest",e)},expression:"form.interest"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调拨天数(日)"}},[a("iep-input-number",{attrs:{precision:0},model:{value:t.form.allocationDays,callback:function(e){t.$set(t.form,"allocationDays",e)},expression:"form.allocationDays"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"执行日期"}},[a("iep-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.form.implementRangeTime,callback:function(e){t.$set(t.form,"implementRangeTime",e)},expression:"form.implementRangeTime"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"预计时间"}},[a("el-input",{attrs:{disabled:""},model:{value:t.estimatedTime,callback:function(e){t.estimatedTime=e},expression:"estimatedTime"}})],1),a("h4",{staticClass:"iep-sub-title"},[t._v("调出组织")]),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调出组织"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"admin/org/all",placeholder:"请选择调出组织"},model:{value:t.form.callOutOrgId,callback:function(e){t.$set(t.form,"callOutOrgId",e)},expression:"form.callOutOrgId"}})],1),t.form.allocationWay?a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"线下公司"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"fams/company",placeholder:"请选择线下公司"},model:{value:t.form.callOutCompanyId,callback:function(e){t.$set(t.form,"callOutCompanyId",e)},expression:"form.callOutCompanyId"}})],1):t._e(),t.callOutBankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"银行账户："}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":t.callOutBankAmountOption.prefixUrl,placeholder:"请选择银行账户"},model:{value:t.form.callOutCompanyBankId,callback:function(e){t.$set(t.form,"callOutCompanyBankId",e)},expression:"form.callOutCompanyBankId"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调出方财务"}},[a("iep-contact-select",{model:{value:t.form.callOutUser,callback:function(e){t.$set(t.form,"callOutUser",e)},expression:"form.callOutUser"}})],1),a("h4",{staticClass:"iep-sub-title"},[t._v("调入组织")]),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调入组织"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"admin/org/all",placeholder:"请选择调入组织",disabled:""},model:{value:t.form.callInOrgId,callback:function(e){t.$set(t.form,"callInOrgId",e)},expression:"form.callInOrgId"}})],1),t.form.allocationWay?a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"线下公司"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"fams/company",placeholder:"请选择线下公司"},model:{value:t.form.callInCompanyId,callback:function(e){t.$set(t.form,"callInCompanyId",e)},expression:"form.callInCompanyId"}})],1):t._e(),t.callInBankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"银行账户："}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":t.callInBankAmountOption.prefixUrl,placeholder:"请选择银行账户"},model:{value:t.form.callInCompanyBankId,callback:function(e){t.$set(t.form,"callInCompanyBankId",e)},expression:"form.callInCompanyBankId"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"调入方财务"}},[a("iep-contact-select",{model:{value:t.form.callInUser,callback:function(e){t.$set(t.form,"callInUser",e)},expression:"form.callInUser"}})],1)],1)],1)],1)},o=[],r=a("be94"),c=a("bb43"),l=a("b611"),i=a("f07c"),m=a("c169"),u=a("2f62"),s={props:{record:{type:Object,default:function(){}}},data:function(){return{dictsMap:c["d"],pickerOptions:i["a"],form:Object(c["g"])(),backOption:{isBack:!0}}},computed:Object(r["a"])({},Object(u["c"])(["dictGroup"]),{id:function(){return+this.$route.params.id},estimatedTime:function(){var t=this.form.implementRangeTime[1];return Object(c["b"])(t,this.form.allocationDays)},callOutBankAmountOption:function(){return this.form.callOutCompanyId?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.form.callOutCompanyId)}:{disabled:!0}},callInBankAmountOption:function(){return this.form.callInCompanyId?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.form.callInCompanyId)}:{disabled:!0}}}),created:function(){this.loadPage()},methods:{loadPage:function(){var t=this;Object(m["c"])(this.id).then(function(e){var a=e.data;t.form=Object(c["a"])(a.data)})},handleSubmit:function(){var t=this;Object(l["e"])(Object(c["e"])(this.form)).then(function(e){var a=e.data;a.data?(t.$message.success("操作成功"),t.handleGoBack()):t.$message(a.msg)})}}},f=s,d=a("2877"),p=Object(d["a"])(f,n,o,!1,null,null,null);e["default"]=p.exports},"84df":function(t,e,a){"use strict";a.d(e,"a",function(){return r});var n=a("c1df"),o=a.n(n),r=function(){return o()().format("YYYY-MM-DD HH:mm:ss")}},b611:function(t,e,a){"use strict";a.d(e,"d",function(){return r}),a.d(e,"c",function(){return c}),a.d(e,"f",function(){return l}),a.d(e,"b",function(){return i}),a.d(e,"a",function(){return m}),a.d(e,"e",function(){return u});var n=a("b5c6"),o="/fams/fund_transfer";function r(t){return Object(n["a"])({url:"".concat(o,"/page"),method:"get",params:t})}function c(t){return Object(n["a"])({url:"".concat(o,"/").concat(t),method:"get"})}function l(t){return Object(n["a"])({url:"".concat(o,"/revoke/").concat(t),method:"get"})}function i(t){return Object(n["a"])({url:"".concat(o,"/finish/").concat(t),method:"get"})}function m(t){return Object(n["a"])({url:"".concat(o,"/confirm/").concat(t),method:"get"})}function u(t){return Object(n["a"])({url:"".concat(o,"/create"),method:"post",data:t})}},bb43:function(t,e,a){"use strict";a.d(e,"d",function(){return l}),a.d(e,"c",function(){return i}),a.d(e,"g",function(){return u}),a.d(e,"f",function(){return s}),a.d(e,"e",function(){return f}),a.d(e,"a",function(){return d}),a.d(e,"b",function(){return m});var n=a("be94"),o=a("84df"),r=a("c1df"),c=a.n(r),l={status:{0:"调拨中",1:"调出方确认",2:"调入方确认",3:"已还款",4:"发起方取消"},allocationWay:{0:"国脉贝",1:"线下支付"}},i=[{prop:"inOrgName",label:"调入组织"},{prop:"outOrgName",label:"调出组织"},{prop:"amount",label:"调拨金额"},{prop:"allocationWay",label:"资金调拨方式",type:"dict"},{prop:"status",label:"状态",type:"dict"},{prop:"creator",label:"资金调拨发起人"},{prop:"createTime",label:"创建时间"}],m=function(t,e){return c()(t).add(e,"day").format("YYYY-MM-DD")},u=function(){return{id:0,amount:0,allocationWay:0,interest:0,allocationDays:0,implementRangeTime:[Object(o["a"])(),Object(o["a"])()],implementStartTime:"",implementEndTime:"",callOutOrgId:"",callOutCompanyId:"",callOutCompanyBankId:"",callOutUser:{id:"",name:""},callOutUserId:"",callInOrgId:"",callInCompanyId:"",callInCompanyBankId:"",callInUser:{id:"",name:""},callInUserId:""}},s=function(){return{id:"",amount:"",allocationWay:"",interest:"",allocationDays:"",implementStartTime:"",implementEndTime:"",creator:"",outOrgName:"",callOutCompany:"",callOutCompanyBank:"",callOutUser:"",inOrgName:"",callInCompany:"",callInCompanyBank:"",callInUser:"",status:"",createTime:"",updateTime:"",flag:""}},f=function(t){var e=Object(n["a"])({},t);return e.implementStartTime=e.implementRangeTime[0],e.implementEndTime=e.implementRangeTime[1],e.callOutUserId=e.callOutUser.id,e.callInUserId=e.callInUser.id,e},d=function(t){var e=u();return e.amount=t.amount,e.callInOrgId=t.inOrgId,e}},c169:function(t,e,a){"use strict";a.d(e,"d",function(){return c}),a.d(e,"e",function(){return l}),a.d(e,"c",function(){return i}),a.d(e,"l",function(){return m}),a.d(e,"a",function(){return u}),a.d(e,"j",function(){return s}),a.d(e,"f",function(){return f}),a.d(e,"g",function(){return d}),a.d(e,"i",function(){return p}),a.d(e,"h",function(){return b}),a.d(e,"m",function(){return O}),a.d(e,"b",function(){return h}),a.d(e,"k",function(){return g});var n=a("be94"),o=a("b5c6"),r="/fams/borrow";function c(t){return Object(o["a"])({url:"".concat(r,"/page"),method:"get",params:Object(n["a"])({},t,{borrowObjectType:1})})}function l(t){return Object(o["a"])({url:"".concat(r,"/page"),method:"get",params:Object(n["a"])({},t,{borrowObjectType:2})})}function i(t){return Object(o["a"])({url:"".concat(r,"/").concat(t),method:"get"})}function m(t){return Object(o["a"])({url:"".concat(r,"/create"),method:"post",data:t})}function u(t){return Object(o["a"])({url:"".concat(r,"/cancel/").concat(t),method:"get"})}function s(t){return Object(o["a"])({url:"".concat(r,"/out/org/confirm/").concat(t),method:"get"})}function f(t){return Object(o["a"])({url:"".concat(r,"/group/confirm/").concat(t),method:"get"})}function d(t){return Object(o["a"])({url:"".concat(r,"/group/reject/").concat(t),method:"get"})}function p(t){return Object(o["a"])({url:"".concat(r,"/org/reject/").concat(t),method:"get"})}function b(t){return Object(o["a"])({url:"".concat(r,"/in/org/confirm/").concat(t),method:"get"})}function O(t){return Object(o["a"])({url:"".concat(r,"/repayment"),method:"post",data:t})}function h(t){return Object(o["a"])({url:"".concat(r,"/repayment/confirm/").concat(t),method:"get"})}function g(t){return Object(o["a"])({url:"".concat(r,"/out/org/reconfirm"),method:"post",data:t})}},f07c:function(t,e,a){"use strict";a.d(e,"a",function(){return n});var n={shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]}}}]);