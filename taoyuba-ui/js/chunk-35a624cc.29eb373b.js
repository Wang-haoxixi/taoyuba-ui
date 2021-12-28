(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35a624cc"],{"6ff8":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"iep-page-form"},[a("basic-container",[a("page-header",{attrs:{title:"开票通知详情","back-option":t.backOption}}),a("el-form",{ref:"form",staticClass:"form-detail",attrs:{model:t.form,"label-width":"150px",size:"small"}},[a("h4",{staticClass:"iep-sub-title"},[t._v("购买方信息")]),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"名称"}},[a("iep-div-detail",{attrs:{value:t.form.buyerName}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"纳税人识别号"}},[a("iep-div-detail",{attrs:{value:t.form.buyerNumber}})],1),a("iep-form-item",{attrs:{"label-name":"地址"}},[a("iep-div-detail",{attrs:{value:t.form.buyerAddress}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"电话号码"}},[a("iep-div-detail",{attrs:{value:t.form.buyerPhone}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"开户行及账户"}},[a("iep-div-detail",{attrs:{value:t.form.buyerAccount}})],1),a("iep-form-item",{attrs:{"label-name":"发票邮寄地址"}},[a("iep-div-detail",{attrs:{value:t.form.buyerMail}})],1),a("h4",{staticClass:"iep-sub-title"},[t._v("货物或应税劳务、服务名称")]),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"一级科目"}},[a("iep-dict-detail",{attrs:{"dict-name":"fams_tax_subject"},model:{value:t.form.firstSubject,callback:function(e){t.$set(t.form,"firstSubject",e)},expression:"form.firstSubject"}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"二级科目"}},[a("iep-div-detail",{attrs:{value:t.form.secondSubject}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"税率"}},[a("el-select",{attrs:{disabled:""},model:{value:t.form.rate,callback:function(e){t.$set(t.form,"rate",e)},expression:"form.rate"}},t._l(t.dictGroup["fams_billing_rate"],function(t){return a("el-option",{key:t.value,attrs:{label:t.label+"%",value:+t.label/100}})}),1)],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"单位"}},[a("iep-div-detail",{attrs:{value:t.form.unit}})],1),a("iep-form-item",{staticClass:"form-half",attrs:{"label-name":"金额"}},[a("iep-div-detail",{attrs:{value:t.form.amount}})],1),a("iep-form-item",{attrs:{"label-name":"关联项目"}},[a("el-input",{model:{value:t.form.projectId,callback:function(e){t.$set(t.form,"projectId",e)},expression:"form.projectId"}})],1),a("h4",{staticClass:"iep-sub-title"},[t._v("销售方")]),a("iep-form-item",{attrs:{"label-name":"销售方公司"}},[a("iep-select-detail",{attrs:{"prefix-url":"fams/company"},model:{value:t.form.companyId,callback:function(e){t.$set(t.form,"companyId",e)},expression:"form.companyId"}})],1),a("iep-form-item",{attrs:{"label-name":"纳税人识别号"}},[a("span",[t._v(t._s(t.companyForm.taxpayerNumber))])]),a("iep-form-item",{attrs:{"label-name":"电话"}},[a("span",[t._v(t._s(t.companyForm.phone))])]),a("iep-form-item",{attrs:{"label-name":"地址"}},[a("span",[t._v(t._s(t.companyForm.address))])]),a("iep-form-item",{attrs:{"label-name":"开户行及账号"}},[a("span",[t._v(t._s(t.companyForm.name))])]),a("iep-form-item",{attrs:{"label-name":"经营范围"}},[a("span",[t._v(t._s(t.companyForm.businessScope))])]),a("iep-form-item",{attrs:{"label-name":"备注"}},[a("iep-div-detail",{attrs:{value:t.form.remarks}})],1),t.form.status?[a("h4",{staticClass:"iep-sub-title"},[t._v("审批内容")]),a("iep-form-item",{attrs:{"label-name":"状态"}},[a("iep-div-detail",{attrs:{value:t.dictsMap.status[t.form.status]}})],1),a("iep-form-item",{attrs:{"label-name":"理由"}},[a("iep-div-detail",{attrs:{value:t.form.content}})],1)]:t._e()],2)],1)],1)},n=[],o=a("be94"),i=a("d95c"),c=a("2f62"),s=a("d3c9"),l=a("aecb");function u(){return{taxpayerNumber:"请选择一个销售方公司",phone:"请选择一个销售方公司",address:"请选择一个销售方公司",name:"请选择一个销售方公司",businessScope:"请选择一个销售方公司"}}var m={props:{record:{type:Object,default:function(){}}},data:function(){return{dictsMap:i["b"],form:Object(i["c"])(),companyForm:u(),backOption:{isBack:!0}}},computed:Object(o["a"])({},Object(c["c"])(["dictGroup"]),{id:function(){return this.$route.params.id}}),created:function(){var t=this;Object(s["c"])(this.id).then(function(e){var a=e.data;t.form=t.$mergeByFirst(Object(i["c"])(),a.data),Object(l["b"])(t.form.companyId).then(function(e){var a=e.data;t.companyForm=a.data})})}},f=m,d=a("2877"),p=Object(d["a"])(f,r,n,!1,null,null,null);e["default"]=p.exports},aecb:function(t,e,a){"use strict";a.d(e,"c",function(){return o}),a.d(e,"b",function(){return i}),a.d(e,"d",function(){return c}),a.d(e,"e",function(){return s}),a.d(e,"a",function(){return l});var r=a("b5c6"),n="/fams/company";function o(t){return Object(r["a"])({url:"".concat(n,"/page"),method:"get",params:t})}function i(t){return Object(r["a"])({url:"".concat(n,"/").concat(t),method:"get"})}function c(t){return Object(r["a"])({url:"".concat(n,"/create"),method:"post",data:t})}function s(t){return Object(r["a"])({url:"".concat(n,"/update"),method:"post",data:t})}function l(t){return Object(r["a"])({url:"".concat(n,"/delete/batch"),method:"post",data:[t]})}},d3c9:function(t,e,a){"use strict";a.d(e,"e",function(){return o}),a.d(e,"d",function(){return i}),a.d(e,"c",function(){return c}),a.d(e,"g",function(){return s}),a.d(e,"h",function(){return l}),a.d(e,"j",function(){return u}),a.d(e,"b",function(){return m}),a.d(e,"a",function(){return f}),a.d(e,"i",function(){return d}),a.d(e,"f",function(){return p});var r=a("b5c6"),n="/fams/billing";function o(t){return Object(r["a"])({url:"".concat(n,"/my/page"),method:"get",params:t})}function i(t){return Object(r["a"])({url:"".concat(n,"/financial_page"),method:"get",params:t})}function c(t){return Object(r["a"])({url:"".concat(n,"/").concat(t),method:"get"})}function s(t){return Object(r["a"])({url:"".concat(n,"/create"),method:"post",data:t})}function l(t){return Object(r["a"])({url:"".concat(n,"/refer/").concat(t),method:"post"})}function u(t){return Object(r["a"])({url:"".concat(n,"/withdraw/").concat(t),method:"post"})}function m(t){return Object(r["a"])({url:"".concat(n,"/delete/batch"),method:"post",data:[t]})}function f(t){return Object(r["a"])({url:"".concat(n,"/delete/batch"),method:"post",data:t})}function d(t){return Object(r["a"])({url:"".concat(n,"/financial_refuse"),method:"post",data:t})}function p(t){return Object(r["a"])({url:"".concat(n,"/financial_agree"),method:"post",data:t})}},d95c:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r}),a.d(e,"c",function(){return o});var r={status:{0:"待提交",1:"待确认",2:"已确认",3:"拒绝"}},n=[{prop:"buyerName",label:"购买方"},{prop:"companyName",label:"销售方"},{prop:"amount",label:"开票金额"},{prop:"createTime",label:"申请日期"},{prop:"status",label:"状态",type:"dict"},{prop:"auditorName",label:"审核人"},{prop:"auditingTime",label:"审核日期"}],o=function(){return{id:0,buyerName:"",buyerNumber:"",buyerAddress:"",buyerPhone:"",buyerAccount:"",buyerMail:"",firstSubject:"",secondSubject:"",rate:"",unit:"",amount:"",projectId:"",companyId:"",remarks:"",status:"",content:""}}}}]);