(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6ad3a60"],{"0e10":function(t,e,a){"use strict";var n=a("1731"),r=a.n(n);r.a},"0e14":function(t,e,a){},1731:function(t,e,a){},"1d9c":function(t,e,a){"use strict";var n=a("db52"),r=a.n(n);r.a},"2e3d":function(t,e,a){"use strict";var n=a("b1eb"),r=a.n(n);r.a},"430f":function(t,e,a){},5165:function(t,e,a){"use strict";var n=a("cdd5"),r=a.n(n);r.a},"54e0c":function(t,e,a){"use strict";var n=a("9504"),r=a.n(n);r.a},"6f36":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("basic-container",[a("page-header",{attrs:{title:"组织申请借款",replaceText:t.replaceText,backOption:t.backOption}}),a("div",{staticClass:"withdraw-wrapper"},[a("a-steps",{attrs:{current:t.current}},t._l(t.steps,function(t){return a("a-step",{key:t.title,attrs:{title:t.title}})}),1),a("keep-alive",[a(t.steps[t.current].content,{tag:"component",attrs:{data:t.steps[t.current].data},on:{"on-data":t.steps[t.current].onData,prev:t.prev,back:t.back}})],1)],1)],1)],1)},r=[],o=a("8748"),i=a("b585"),s=a("fbb0"),c=a("7ced"),u=a("d778"),d=a("8eb0"),l=a("d6c8"),m=a("c169"),p={components:{FirstContent:i["default"],SecondContent:s["default"],ThirdContent:c["default"],FourthContent:u["default"],FifthContent:d["default"],SixthContent:l["default"]},data:function(){return{replaceText:function(){return"（将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。）"},backOption:{isBack:!0},current:0,steps:[{title:"填写借款信息",content:"FirstContent",nextText:"下一步",prevText:"",data:void 0,onData:this.handleFirst},{title:"确认借款信息",content:"SecondContent",nextText:"提交",prevText:"上一步",data:void 0,onData:this.handleSecond},{title:"借出方组织审核",content:"ThirdContent",nextText:"撤销",prevText:"",data:void 0,onData:this.handleThird},{title:"借出方财务操作",content:"FourthContent",nextText:"",prevText:"",data:void 0,onData:this.handleFirst},{title:"借入方财务确认收款",content:"FifthContent",nextText:"",prevText:"",data:void 0,onData:this.handleFirst},{title:"完成",content:"SixthContent",nextText:"",prevText:"",data:void 0,onData:this.handleFirst}]}},computed:{id:function(){return+this.$route.params.id}},created:function(){this.loadPage()},methods:{handleFirst:function(t){this.next(),this.steps[this.current].data=t},handleSecond:function(t){this.next(),this.steps[this.current].data=t},handleThird:function(){this.$router.history.go(-1)},next:function(){this.current++},prev:function(){this.current--},back:function(){this.$router.go(-1)},loadPage:function(){var t=this;this.id&&Object(m["c"])(this.id).then(function(e){var a=e.data;t.current=o["d"][a.data.status],t.steps[t.current].data=a.data})}}},f=p,b=(a("8de4"),a("0c7c")),h=Object(b["a"])(f,n,r,!1,null,"e574c54e",null);e["default"]=h.exports},"7bdd":function(t,e,a){},"7ced":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("steps-content",{scopedSlots:t._u([{key:"action",fn:function(){return[t.data.isOut?t._e():a("a-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:t.handleSubmit}},[t._v("\n      取消借款\n    ")]),t.data.isOut?a("a-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary",loading:t.submitLoading},on:{click:t.handleOutConfirm}},[t._v("\n      审核通过\n    ")]):t._e(),t.data.isOut?a("a-button",{staticStyle:{"margin-left":"8px"},attrs:{loading:t.submitLoading},on:{click:t.handleOrgReject}},[t._v("\n      审核拒绝\n    ")]):t._e(),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.handleBack}},[t._v("\n      返回\n    ")])]},proxy:!0}])},[a("el-form",{ref:"form",staticClass:"content-wrapper",attrs:{size:"small",model:t.data,"label-width":"150px",disabled:""}},[a("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{closable:!0,type:"error",message:"借出方组织审核通过后，将无法撤回！"}}),a("iep-form-item",{attrs:{"label-name":"借出组织"}},[a("iep-div-detail",{attrs:{value:t.data.outOrgName}})],1),a("iep-form-item",{attrs:{"label-name":"支付方式"}},[a("iep-div-detail",{attrs:{value:t.dictsMap.borrowMoneyType[t.data.borrowMoneyType]}})],1),a("iep-form-item",{attrs:{"label-name":"收款公司"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompany}})],1),t.bankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"收款账户"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompanyBank}})],1),a("iep-form-item",{attrs:{"label-name":"还款天数"}},[a("iep-div-detail",{attrs:{value:t.data.borrowDays+"天"}})],1),a("iep-form-item",{attrs:{"label-name":"还款时间"}},[a("iep-div-detail",{attrs:{value:t.data.repaymentTime}})],1),a("iep-form-item",{attrs:{"label-name":"借款利息"}},[a("iep-div-detail",{attrs:{value:t.data.orgInterest+"%"}})],1),a("iep-form-item",{attrs:{"label-name":"借款金额"}},[a("iep-div-detail",{attrs:{value:t.data.amount+"元"}})],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),i=a("c78b"),s=a("c169"),c=a("8748"),u={props:["data"],components:{StepsContent:i["default"]},data:function(){return{dictsMap:c["b"],submitLoading:!1}},computed:{bankAmountOption:function(){return this.data.borrowInCompanyId&&"1"===this.data.borrowMoneyType?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}}},created:function(){},methods:{handleBack:function(){this.$emit("back")},handleOutConfirm:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.handleCommon("审核通过",s["j"]);case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleOrgReject:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.handleCommon("审核通过",s["i"]);case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleSubmit:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.handleCommon("取消借款",s["a"]);case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleCommon:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e,a){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("此操作将".concat(e,", 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return this.submitLoading=!0,t.prev=4,t.next=7,a(this.data.id);case 7:n=t.sent,r=n.data,r.data?(this.$message("操作成功"),this.$emit("on-data",r.data)):this.$message(r.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),this.$message("似乎出现了一些问题");case 15:t.next=20;break;case 17:t.prev=17,t.t1=t["catch"](0),this.$message("操作取消");case 20:return t.prev=20,this.submitLoading=!1,t.finish(20);case 23:case"end":return t.stop()}},t,this,[[0,17,20,23],[4,12]])}));function e(e,a){return t.apply(this,arguments)}return e}()}},d=u,l=(a("1d9c"),a("0c7c")),m=Object(l["a"])(d,n,r,!1,null,"db194f2a",null);e["default"]=m.exports},"7e92":function(t,e,a){"use strict";var n=a("430f"),r=a.n(n);r.a},8748:function(t,e,a){"use strict";a.d(e,"c",function(){return s}),a.d(e,"b",function(){return o}),a.d(e,"d",function(){return i}),a.d(e,"a",function(){return c});var n=a("c1df"),r=a.n(n),o={borrowMoneyType:{0:"国脉贝",1:"线下支付"}},i={4:2,8:5,6:5,10:5,7:5,11:3,5:4},s=function(t){return{borrowObjectType:1,borrowMoneyType:"0",borrowInOrgId:"",borrowInCompanyId:"",borrowInCompanyBankId:"",borrowOutOrgId:"",borrowOutCompanyId:"",borrowOutCompanyBankId:"",borrowDays:"",repaymentTime:"",borrowAmount:0,groupInterest:t.groupInterest||"",orgInterest:t.orgInterest||""}},c=function(t){return r()().add(t,"day").format("YYYY-MM-DD HH:mm:ss")}},"8de4":function(t,e,a){"use strict";var n=a("0e14"),r=a.n(n);r.a},"8eb0":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("steps-content",{scopedSlots:t._u([{key:"action",fn:function(){return[a("a-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:t.handleSubmit}},[t._v("\n      确认收款\n    ")]),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.handleBack}},[t._v("\n      返回\n    ")])]},proxy:!0}])},[a("el-form",{ref:"form",staticClass:"content-wrapper",attrs:{size:"small",model:t.data,"label-width":"150px",disabled:""}},[a("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{closable:!0,type:"error",message:"借出方组织审核通过后，将无法撤回！"}}),a("iep-form-item",{attrs:{"label-name":"借出组织"}},[a("iep-div-detail",{attrs:{value:t.data.outOrgName}})],1),a("iep-form-item",{attrs:{"label-name":"支付方式"}},[a("iep-div-detail",{attrs:{value:t.dictsMap.borrowMoneyType[t.data.borrowMoneyType]}})],1),a("iep-form-item",{attrs:{"label-name":"收款公司"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompany}})],1),t.bankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"收款账户"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompanyBank}})],1),a("iep-form-item",{attrs:{"label-name":"还款天数"}},[a("iep-div-detail",{attrs:{value:t.data.borrowDays+"天"}})],1),a("iep-form-item",{attrs:{"label-name":"还款时间"}},[a("iep-div-detail",{attrs:{value:t.data.repaymentTime}})],1),a("iep-form-item",{attrs:{"label-name":"借款利息"}},[a("iep-div-detail",{attrs:{value:t.data.orgInterest+"%"}})],1),a("iep-form-item",{attrs:{"label-name":"借款金额"}},[a("iep-div-detail",{attrs:{value:t.data.amount+"元"}})],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),i=a("c78b"),s=a("c169"),c=a("8748"),u={props:["data"],components:{StepsContent:i["default"]},data:function(){return{dictsMap:c["b"],submitLoading:!1}},computed:{bankAmountOption:function(){return this.data.borrowInCompanyId&&"1"===this.data.borrowMoneyType?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}}},created:function(){},methods:{handleBack:function(){this.$emit("back")},handleSubmit:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("此操作将确认收款, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return this.submitLoading=!0,t.prev=4,t.next=7,Object(s["h"])(this.data.id);case 7:e=t.sent,a=e.data,a.data?(this.$message("操作成功"),this.$emit("on-data",a.data)):this.$message(a.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),this.$message("似乎出现了一些问题");case 15:t.next=20;break;case 17:t.prev=17,t.t1=t["catch"](0),this.$message("操作取消");case 20:return t.prev=20,this.submitLoading=!1,t.finish(20);case 23:case"end":return t.stop()}},t,this,[[0,17,20,23],[4,12]])}));function e(){return t.apply(this,arguments)}return e}()}},d=u,l=(a("f8dc"),a("0c7c")),m=Object(l["a"])(d,n,r,!1,null,"50f13768",null);e["default"]=m.exports},9504:function(t,e,a){},b1eb:function(t,e,a){},b585:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("steps-content",{scopedSlots:t._u([{key:"action",fn:function(){return[a("a-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("\n      下一步\n    ")])]},proxy:!0}])},[a("el-form",{ref:"form",staticClass:"content-wrapper",attrs:{size:"small",model:t.form,"label-width":"150px"}},[a("iep-form-item",{attrs:{"label-name":"借出组织"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"admin/org/all",placeholder:"请选择向哪个组织借款"},model:{value:t.form.borrowOutOrgId,callback:function(e){t.$set(t.form,"borrowOutOrgId",e)},expression:"form.borrowOutOrgId"}})],1),a("iep-form-item",{attrs:{"label-name":"支付方式"}},[a("el-radio-group",{model:{value:t.form.borrowMoneyType,callback:function(e){t.$set(t.form,"borrowMoneyType",e)},expression:"form.borrowMoneyType"}},t._l(t.dictsMap.borrowMoneyType,function(e,n){return a("el-radio",{key:n,attrs:{label:n}},[t._v(t._s(e))])}),1)],1),a("iep-form-item",{attrs:{"label-name":"收款公司"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"fams/company",placeholder:"请选择收入公司"},model:{value:t.form.borrowInCompanyId,callback:function(e){t.$set(t.form,"borrowInCompanyId",e)},expression:"form.borrowInCompanyId"}})],1),t.bankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"收款账户"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":t.bankAmountOption.prefixUrl,placeholder:"请选择银行账户"},model:{value:t.form.borrowInCompanyBankId,callback:function(e){t.$set(t.form,"borrowInCompanyBankId",e)},expression:"form.borrowInCompanyBankId"}})],1),a("iep-form-item",{attrs:{"label-name":"还款天数(天)"}},[a("iep-input-number",{attrs:{precision:0},model:{value:t.form.borrowDays,callback:function(e){t.$set(t.form,"borrowDays",e)},expression:"form.borrowDays"}})],1),a("iep-form-item",{attrs:{"label-name":"还款时间"}},[a("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:t.form.repaymentTime,callback:function(e){t.$set(t.form,"repaymentTime",e)},expression:"form.repaymentTime"}})],1),a("iep-form-item",{attrs:{"label-name":"借款利息"}},[a("iep-div-detail",{attrs:{value:t.form.orgInterest+"%"}})],1),a("iep-form-item",{attrs:{"label-name":"借款金额"}},[a("iep-input-number",{model:{value:t.form.borrowAmount,callback:function(e){t.$set(t.form,"borrowAmount",e)},expression:"form.borrowAmount"}})],1)],1)],1)},r=[],o=a("cebc"),i=a("2f62"),s=a("c78b"),c=a("8748"),u={components:{StepsContent:s["default"]},data:function(){return{form:{},dictsMap:c["b"]}},computed:Object(o["a"])({},Object(i["c"])(["famsConfig"]),{bankAmountOption:function(){return this.form.borrowInCompanyId&&"1"===this.form.borrowMoneyType?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.form.borrowInCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.form.borrowInCompanyId)}}}),created:function(){this.form=Object(c["c"])(this.famsConfig)},methods:{handleSubmit:function(){this.$emit("on-data",this.form)}},watch:{"form.borrowDays":function(t){this.form.repaymentTime=Object(c["a"])(t)}}},d=u,l=(a("7e92"),a("0c7c")),m=Object(l["a"])(d,n,r,!1,null,"421d9f71",null);e["default"]=m.exports},c169:function(t,e,a){"use strict";a.d(e,"d",function(){return i}),a.d(e,"e",function(){return s}),a.d(e,"c",function(){return c}),a.d(e,"l",function(){return u}),a.d(e,"a",function(){return d}),a.d(e,"j",function(){return l}),a.d(e,"f",function(){return m}),a.d(e,"g",function(){return p}),a.d(e,"i",function(){return f}),a.d(e,"h",function(){return b}),a.d(e,"m",function(){return h}),a.d(e,"b",function(){return y}),a.d(e,"k",function(){return v});var n=a("cebc"),r=a("b5c6"),o="/fams/borrow";function i(t){return Object(r["a"])({url:"".concat(o,"/page"),method:"get",params:Object(n["a"])({},t,{borrowObjectType:1})})}function s(t){return Object(r["a"])({url:"".concat(o,"/page"),method:"get",params:Object(n["a"])({},t,{borrowObjectType:2})})}function c(t){return Object(r["a"])({url:"".concat(o,"/").concat(t),method:"get"})}function u(t){return Object(r["a"])({url:"".concat(o,"/create"),method:"post",data:t})}function d(t){return Object(r["a"])({url:"".concat(o,"/cancel/").concat(t),method:"get"})}function l(t){return Object(r["a"])({url:"".concat(o,"/out/org/confirm/").concat(t),method:"get"})}function m(t){return Object(r["a"])({url:"".concat(o,"/group/confirm/").concat(t),method:"get"})}function p(t){return Object(r["a"])({url:"".concat(o,"/group/reject/").concat(t),method:"get"})}function f(t){return Object(r["a"])({url:"".concat(o,"/org/reject/").concat(t),method:"get"})}function b(t){return Object(r["a"])({url:"".concat(o,"/in/org/confirm/").concat(t),method:"get"})}function h(t){return Object(r["a"])({url:"".concat(o,"/repayment"),method:"post",data:t})}function y(t){return Object(r["a"])({url:"".concat(o,"/repayment/confirm/").concat(t),method:"get"})}function v(t){return Object(r["a"])({url:"".concat(o,"/out/org/reconfirm"),method:"post",data:t})}},c78b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"steps-content"},[t._t("default")],2),a("div",{staticClass:"steps-action"},[t._t("action")],2)])},r=[],o=(a("54e0c"),a("0c7c")),i={},s=Object(o["a"])(i,n,r,!1,null,"566ff4f1",null);e["default"]=s.exports},cdd5:function(t,e,a){},d6c8:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("iep-result",{attrs:{type:"success",description:t.description,title:t.title},scopedSlots:t._u([{key:"action",fn:function(){return[t.data.isOut||6!==t.data.status?t._e():a("a-button",{attrs:{type:"primary"},on:{click:t.handleRepay}},[t._v("还款")]),t.data.isOut&&10===t.data.status?a("a-button",{attrs:{type:"primary"},on:{click:t.handleConfirm}},[t._v("确认收款")]):t._e(),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.handleBack}},[t._v("返回列表")])]},proxy:!0}])},[a("el-form",{ref:"form",staticClass:"content-wrapper",attrs:{size:"small",model:t.data,"label-width":"150px"}},[a("iep-form-item",{attrs:{"label-name":" 借出组织"}},[a("iep-div-detail",{attrs:{value:t.data.outOrgName}})],1),a("iep-form-item",{attrs:{"label-name":"支付方式"}},[a("iep-div-detail",{attrs:{value:t.dictsMap.borrowMoneyType[t.data.borrowMoneyType]}})],1),a("iep-form-item",{attrs:{"label-name":"收款公司"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompany}})],1),t.bankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"收款账户"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompanyBank}})],1),a("iep-form-item",{attrs:{"label-name":"还款天数"}},[a("iep-div-detail",{attrs:{value:t.data.borrowDays+"天"}})],1),a("iep-form-item",{attrs:{"label-name":"还款时间"}},[a("iep-div-detail",{attrs:{value:t.data.repaymentTime}})],1),a("iep-form-item",{attrs:{"label-name":"借款利息"}},[a("iep-div-detail",{attrs:{value:t.data.orgInterest+"%"}})],1),a("iep-form-item",{attrs:{"label-name":"借款金额"}},[a("iep-div-detail",{attrs:{value:t.data.amount+"元"}})],1),t.data.isOut||6!==t.data.status?t._e():[a("a-divider"),a("iep-form-item",{attrs:{"label-name":"还款公司"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"fams/company",placeholder:"请选择收入公司"},model:{value:t.borrowInRepayCompanyId,callback:function(e){t.borrowInRepayCompanyId=e},expression:"borrowInRepayCompanyId"}})],1),t.repayBankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"还款账户"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":t.repayBankAmountOption.prefixUrl,placeholder:"请选择银行账户"},model:{value:t.borrowInRepayCompanyBankId,callback:function(e){t.borrowInRepayCompanyBankId=e},expression:"borrowInRepayCompanyBankId"}})],1)]],2)],1)},r=[],o=(a("96cf"),a("3b8d")),i=a("c169"),s=a("8748"),c={props:["data"],data:function(){return{dictsMap:s["b"],submitLoading:!1,borrowInRepayCompanyId:"",borrowInRepayCompanyBankId:""}},computed:{title:function(){return 8===this.data.status?"借款失败":6===this.data.status?"确认成功":"操作成功"},description:function(){return 8===this.data.status?"具体原因请与借入方联系":6===this.data.status?"已到账，请及时还款，切勿逾期！":""},bankAmountOption:function(){return this.data.borrowInCompanyId&&"1"===this.data.borrowMoneyType?{disabled:!1}:{disabled:!0}},repayBankAmountOption:function(){return this.borrowInRepayCompanyId?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.borrowInRepayCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.borrowInRepayCompanyId)}}},created:function(){},methods:{handleBack:function(){this.$emit("back")},handleConfirm:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("此操作将已收款, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return this.submitLoading=!0,t.prev=4,t.next=7,Object(i["b"])(this.data.id);case 7:e=t.sent,a=e.data,a.data?(this.$message("操作成功"),this.handleBack()):this.$message(a.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),this.$message("似乎出现了一些问题");case 15:t.next=20;break;case 17:t.prev=17,t.t1=t["catch"](0),this.$message("操作取消");case 20:return t.prev=20,this.submitLoading=!1,t.finish(20);case 23:case"end":return t.stop()}},t,this,[[0,17,20,23],[4,12]])}));function e(){return t.apply(this,arguments)}return e}(),handleRepay:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("此操作将还款, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return this.submitLoading=!0,t.prev=4,t.next=7,Object(i["m"])({id:this.data.id,borrowInRepayCompanyId:this.borrowInRepayCompanyId,borrowInRepayCompanyBankId:this.borrowInRepayCompanyBankId});case 7:e=t.sent,a=e.data,a.data?(this.$message("操作成功"),this.handleBack()):this.$message(a.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),this.$message("似乎出现了一些问题");case 15:t.next=20;break;case 17:t.prev=17,t.t1=t["catch"](0),this.$message("操作取消");case 20:return t.prev=20,this.submitLoading=!1,t.finish(20);case 23:case"end":return t.stop()}},t,this,[[0,17,20,23],[4,12]])}));function e(){return t.apply(this,arguments)}return e}()}},u=c,d=(a("2e3d"),a("0c7c")),l=Object(d["a"])(u,n,r,!1,null,"3ab39095",null);e["default"]=l.exports},d778:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("steps-content",{scopedSlots:t._u([{key:"action",fn:function(){return[t.data.isOut?t._e():a("a-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:t.handleSubmit}},[t._v("\n      取消借款\n    ")]),t.data.isOut?a("a-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary",loading:t.submitLoading},on:{click:t.handleOutConfirm}},[t._v("\n      转账完成\n    ")]):t._e(),t.data.isOut?a("a-button",{staticStyle:{"margin-left":"8px"},attrs:{loading:t.submitLoading},on:{click:t.handleOrgReject}},[t._v("\n      转账失败\n    ")]):t._e(),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.handleBack}},[t._v("\n      返回\n    ")])]},proxy:!0}])},[a("el-form",{ref:"form",staticClass:"content-wrapper",attrs:{size:"small",model:t.data,"label-width":"150px"}},[a("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{closable:!0,type:"error",message:"借出方组织审核通过后，将无法撤回！"}}),a("iep-form-item",{attrs:{"label-name":"借出组织"}},[a("iep-div-detail",{attrs:{value:t.data.outOrgName}})],1),a("iep-form-item",{attrs:{"label-name":"支付方式"}},[a("iep-div-detail",{attrs:{value:t.dictsMap.borrowMoneyType[t.data.borrowMoneyType]}})],1),a("iep-form-item",{attrs:{"label-name":"收款公司"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompany}})],1),t.bankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"收款账户"}},[a("iep-div-detail",{attrs:{value:t.data.borrowInCompanyBank}})],1),a("iep-form-item",{attrs:{"label-name":"还款天数"}},[a("iep-div-detail",{attrs:{value:t.data.borrowDays+"天"}})],1),a("iep-form-item",{attrs:{"label-name":"还款时间"}},[a("iep-div-detail",{attrs:{value:t.data.repaymentTime}})],1),a("iep-form-item",{attrs:{"label-name":"借款利息"}},[a("iep-div-detail",{attrs:{value:t.data.orgInterest+"%"}})],1),a("iep-form-item",{attrs:{"label-name":"借款金额"}},[a("iep-div-detail",{attrs:{value:t.data.amount+"元"}})],1),a("a-divider"),a("iep-form-item",{attrs:{"label-name":"支付公司"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"fams/company",placeholder:"请选择收入公司"},model:{value:t.borrowOutCompanyId,callback:function(e){t.borrowOutCompanyId=e},expression:"borrowOutCompanyId"}})],1),t.outBankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"支付账户"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":t.outBankAmountOption.prefixUrl,placeholder:"请选择银行账户"},model:{value:t.borrowOutCompanyBankId,callback:function(e){t.borrowOutCompanyBankId=e},expression:"borrowOutCompanyBankId"}})],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),i=a("c78b"),s=a("c169"),c=a("8748"),u={props:["data"],components:{StepsContent:i["default"]},data:function(){return{dictsMap:c["b"],submitLoading:!1,borrowOutCompanyId:"",borrowOutCompanyBankId:""}},computed:{bankAmountOption:function(){return this.data.borrowInCompanyId&&"1"===this.data.borrowMoneyType?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}},outBankAmountOption:function(){return this.borrowOutCompanyId?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.borrowOutCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.borrowOutCompanyId)}}},created:function(){},methods:{handleBack:function(){this.$emit("back")},handleOutConfirm:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("此操作将转账完成, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return this.submitLoading=!0,t.prev=4,t.next=7,Object(s["k"])({id:this.data.id,borrowOutCompanyId:this.borrowOutCompanyId,borrowOutCompanyBankId:this.borrowOutCompanyBankId});case 7:e=t.sent,a=e.data,a.data?(this.$message("操作成功"),this.handleBack()):this.$message(a.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),this.$message("似乎出现了一些问题");case 15:t.next=20;break;case 17:t.prev=17,t.t1=t["catch"](0),this.$message("操作取消");case 20:return t.prev=20,this.submitLoading=!1,t.finish(20);case 23:case"end":return t.stop()}},t,this,[[0,17,20,23],[4,12]])}));function e(){return t.apply(this,arguments)}return e}(),handleOrgReject:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.handleCommon("审核通过",s["i"]);case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleSubmit:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.handleCommon("取消借款",s["a"]);case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleCommon:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e,a){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("此操作将".concat(e,", 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return this.submitLoading=!0,t.prev=4,t.next=7,a(this.data.id);case 7:n=t.sent,r=n.data,r.data?(this.$message("操作成功"),this.$emit("on-data",r.data)):this.$message(r.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),this.$message("似乎出现了一些问题");case 15:t.next=20;break;case 17:t.prev=17,t.t1=t["catch"](0),this.$message("操作取消");case 20:return t.prev=20,this.submitLoading=!1,t.finish(20);case 23:case"end":return t.stop()}},t,this,[[0,17,20,23],[4,12]])}));function e(e,a){return t.apply(this,arguments)}return e}()}},d=u,l=(a("5165"),a("0c7c")),m=Object(l["a"])(d,n,r,!1,null,"5b744d16",null);e["default"]=m.exports},db52:function(t,e,a){},f8dc:function(t,e,a){"use strict";var n=a("7bdd"),r=a.n(n);r.a},fbb0:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("steps-content",{scopedSlots:t._u([{key:"action",fn:function(){return[a("a-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:t.handleSubmit}},[t._v("\n      提交\n    ")]),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.handlePrev}},[t._v("\n      上一步\n    ")])]},proxy:!0}])},[a("el-form",{ref:"form",staticClass:"content-wrapper",attrs:{size:"small",model:t.data,"label-width":"150px",disabled:""}},[a("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{closable:!0,type:"error",message:"确认借款申请后，将向借出方组织发出借款申请。"}}),a("iep-form-item",{attrs:{"label-name":"借出组织"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"admin/org/all",placeholder:"请选择向哪个组织借款"},model:{value:t.data.borrowOutOrgId,callback:function(e){t.$set(t.data,"borrowOutOrgId",e)},expression:"data.borrowOutOrgId"}})],1),a("iep-form-item",{attrs:{"label-name":"支付方式"}},[a("el-radio-group",{model:{value:t.data.borrowMoneyType,callback:function(e){t.$set(t.data,"borrowMoneyType",e)},expression:"data.borrowMoneyType"}},t._l(t.dictsMap.borrowMoneyType,function(e,n){return a("el-radio",{key:n,attrs:{label:n}},[t._v(t._s(e))])}),1)],1),a("iep-form-item",{attrs:{"label-name":"收款公司"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":"fams/company",placeholder:"请选择收入公司"},model:{value:t.data.borrowInCompanyId,callback:function(e){t.$set(t.data,"borrowInCompanyId",e)},expression:"data.borrowInCompanyId"}})],1),t.bankAmountOption.disabled?t._e():a("iep-form-item",{attrs:{"label-name":"收款账户"}},[a("iep-select",{attrs:{autocomplete:"off","prefix-url":t.bankAmountOption.prefixUrl,placeholder:"请选择银行账户"},model:{value:t.data.borrowInCompanyBankId,callback:function(e){t.$set(t.data,"borrowInCompanyBankId",e)},expression:"data.borrowInCompanyBankId"}})],1),a("iep-form-item",{attrs:{"label-name":"还款天数(天)"}},[a("iep-input-number",{attrs:{precision:0},model:{value:t.data.borrowDays,callback:function(e){t.$set(t.data,"borrowDays",e)},expression:"data.borrowDays"}})],1),a("iep-form-item",{attrs:{"label-name":"还款时间"}},[a("iep-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:t.data.repaymentTime,callback:function(e){t.$set(t.data,"repaymentTime",e)},expression:"data.repaymentTime"}})],1),a("iep-form-item",{attrs:{"label-name":"借款利息"}},[a("iep-div-detail",{attrs:{value:t.data.orgInterest+"%"}})],1),a("iep-form-item",{attrs:{"label-name":"借款金额"}},[a("iep-input-number",{model:{value:t.data.borrowAmount,callback:function(e){t.$set(t.data,"borrowAmount",e)},expression:"data.borrowAmount"}})],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),i=a("c78b"),s=a("c169"),c=a("8748"),u={props:["data"],components:{StepsContent:i["default"]},data:function(){return{dictsMap:c["b"],submitLoading:!1}},computed:{bankAmountOption:function(){return this.data.borrowInCompanyId&&"1"===this.data.borrowMoneyType?{disabled:!1,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}:{disabled:!0,prefixUrl:"fams/bank_account/".concat(this.data.borrowInCompanyId)}}},created:function(){},methods:{handlePrev:function(){this.$emit("prev")},handleSubmit:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.submitLoading=!0,t.prev=1,t.next=4,Object(s["l"])(this.data);case 4:e=t.sent,a=e.data,a.data?this.$emit("on-data",a.data):this.$message(a.msg),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),this.$message("似乎出现了一些问题");case 12:this.submitLoading=!1;case 13:case"end":return t.stop()}},t,this,[[1,9]])}));function e(){return t.apply(this,arguments)}return e}()}},d=u,l=(a("0e10"),a("0c7c")),m=Object(l["a"])(d,n,r,!1,null,"6324b248",null);e["default"]=m.exports}}]);