(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d3e5cb8"],{"244c":function(e,t,r){"use strict";r.d(t,"a",function(){return n}),r.d(t,"d",function(){return l}),r.d(t,"c",function(){return i}),r.d(t,"b",function(){return c}),r.d(t,"e",function(){return s});var a=r("b5c6"),o="/tybhrms/tybbook";function n(e){return Object(a["a"])({url:"".concat(o,"/save"),method:"post",data:e})}function l(e){return Object(a["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function i(e){return Object(a["a"])({url:"".concat(o,"/").concat(e),method:"get"})}function c(e){return Object(a["a"])({url:"".concat(o,"/del/").concat(e),method:"post"})}function s(e){return Object(a["a"])({url:"".concat(o,"/update"),method:"post",data:e})}},"3d64":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:e.getTitle,backOption:e.backOption}}),r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"150px",size:"small",disabled:e.isDisabled}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"单位名称：",prop:"department"}},[r("el-input",{model:{value:e.form.department,callback:function(t){e.$set(e.form,"department",t)},expression:"form.department"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"收件地址：",prop:"address"}},[r("el-input",{model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系人：",prop:"contactName"}},[r("el-input",{model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"电话：",prop:"phone"}},[r("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"付款方名称：",prop:"payerTitle"}},[r("el-input",{model:{value:e.form.payerTitle,callback:function(t){e.$set(e.form,"payerTitle",t)},expression:"form.payerTitle"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"纳税人识别号：",prop:"payerTaxNum"}},[r("el-input",{model:{value:e.form.payerTaxNum,callback:function(t){e.$set(e.form,"payerTaxNum",t)},expression:"form.payerTaxNum"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"付款方地址：",prop:"payerAddress"}},[r("el-input",{model:{value:e.form.payerAddress,callback:function(t){e.$set(e.form,"payerAddress",t)},expression:"form.payerAddress"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"付款方电话：",prop:"payerPhone"}},[r("el-input",{model:{value:e.form.payerPhone,callback:function(t){e.$set(e.form,"payerPhone",t)},expression:"form.payerPhone"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"开户行：",prop:"payerBank"}},[r("el-input",{model:{value:e.form.payerBank,callback:function(t){e.$set(e.form,"payerBank",t)},expression:"form.payerBank"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"账号：",prop:"payerAccount"}},[r("el-input",{model:{value:e.form.payerAccount,callback:function(t){e.$set(e.form,"payerAccount",t)},expression:"form.payerAccount"}})],1)],1)],1)],1),r("page-header",{staticStyle:{"margin-top":"50px"},attrs:{title:"书目清单"}}),r("el-table",{ref:"multipleTable",staticStyle:{width:"70%","margin-left":"100px"},attrs:{data:e.tableData,"header-cell-style":{background:"#eef1f6",color:"#606266"},"tooltip-effect":"dark",height:"350"},on:{"row-click":e.handleRowClick,"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"55",selectable:e.isa}}),r("el-table-column",{attrs:{prop:"title",label:"书 目",width:"300"}}),r("el-table-column",{attrs:{prop:"price",label:"单价",width:"120"}}),r("el-table-column",{attrs:{prop:"quantity",label:"订购数（册）"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-input-number",{staticStyle:{width:"50%"},attrs:{min:0,size:"mini"},on:{blur:function(r){return e.handleChange(t.row)}},model:{value:t.row.quantity,callback:function(r){e.$set(t.row,"quantity",r)},expression:"scope.row.quantity"}})]}}])}),r("el-table-column",{attrs:{label:"小计金额（元）",prop:"total",width:"120"}})],1),r("div",{staticStyle:{"margin-left":"100px","margin-top":"50px"}},[e._v("合计："+e._s(e.form.amount))]),r("operation-wrapper",{staticStyle:{"margin-left":"50px","margin-top":"50px"}},[r("iep-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("订购")])],1)],1)],1)},o=[],n=(r("ac6a"),r("4917"),r("244c")),l=r("fcea3"),i={data:function(){var e=this,t=function(e,t,r){""===t?r(new Error("请输入联系电话")):t.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)?r():r(new Error("请输入正确的手机号码!"))};return{backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},form:{department:"",address:"",contactName:"",phone:"",payerTitle:"",payerTaxNum:"",payerAddress:"",payerPhone:"",payerBank:"",payerAccount:"",amount:0,tybBookOrderLists:[]},rules:{department:[{required:!0,message:"请输入单位名称",trigger:"blur"}],address:[{required:!0,message:"请输入收件地址",trigger:"blur"}],contactName:[{required:!0,message:"请输入联系人",trigger:"blur"}],phone:[{required:!0,message:"请输入电话",trigger:"blur"},{validator:t,trigger:"blur"}],payerTitle:[{required:!0,message:"请输入付款方名称",trigger:"blur"}],payerTaxNum:[{required:!0,message:"请输入纳税人识别号",trigger:"blur"}],payerAddress:[{required:!0,message:"请输入付款方地址",trigger:"blur"}],payerPhone:[{required:!0,message:"请输入付款方电话",trigger:"blur"},{validator:t,trigger:"blur"}],payerBank:[{required:!0,message:"请输入开户行",trigger:"blur"}],payerAccount:[{required:!0,message:"请输入账号",trigger:"blur"}]},tableData:[],multipleSelection:[]}},created:function(){var e=this;this.bookList(),this.$route.query.see&&Object(l["c"])(this.$route.query.see).then(function(t){e.form=t.data.data,e.form.tybBookOrderLists?(e.tableData=e.form.tybBookOrderLists.map(function(e){return{bookId:e.bookId,title:e.title,quantity:e.quantity,price:e.price,total:e.quantity*e.price}}),e.$nextTick(function(){e.tableData.forEach(function(t){e.$refs["multipleTable"].toggleRowSelection(t)})})):e.tableData=[]})},methods:{bookList:function(){var e=this;Object(n["d"])().then(function(t){e.bookList=t.data.data.records,e.tableData=e.bookList.map(function(e){return{bookId:e.id,title:e.title,quantity:0,price:e.price,total:0}})})},onGoBack:function(){this.$router.push({path:"/textbook_spa/order_list"})},handleSelectionChange:function(e){var t=this;this.multipleSelection=e,"{}"===JSON.stringify(this.$route.query)&&(this.form.amount=0,this.multipleSelection.forEach(function(e){t.form.amount+=e.total}))},handleRowClick:function(e){var t=this;e.total=e.price*e.quantity,this.multipleSelection.length>0&&(this.form.amount=0,this.multipleSelection.forEach(function(e){t.form.amount+=e.total}))},handleChange:function(e){this.handleRowClick(e)},save:function(){var e=this;0===this.form.amount&&this.multipleSelection.length>0?this.$message.error("总计不能为空！"):(this.multipleSelection.length>0&&(this.form.tybBookOrderLists=this.multipleSelection),this.$refs.form.validate(function(t){0===e.multipleSelection.length&&(e.$message.error("教材订单书目清单不能为空！"),t=!1),e.multipleSelection.length>0&&e.multipleSelection.forEach(function(r){0===r.total&&(e.$message.error("订购数不能为空！"),t=!1)}),t&&"{}"===JSON.stringify(e.$route.query)&&Object(l["e"])(e.form).then(function(){e.$message.success("提交成功！"),e.$router.push({path:"/textbook_spa/order_list"})}).catch(function(t){e.$message.error(t.msg)})}))},isa:function(){return!this.isDisabled}},computed:{getTitle:function(){return"".concat("{}"===JSON.stringify(this.$route.query)?"新增":"查看","教材订购")},isDisabled:function(){return"{}"!==JSON.stringify(this.$route.query)}},watch:{}},c=i,s=r("0c7c"),u=Object(s["a"])(c,a,o,!1,null,null,null);t["default"]=u.exports},4917:function(e,t,r){"use strict";var a=r("cb7c"),o=r("9def"),n=r("0390"),l=r("5f1b");r("214f")("match",1,function(e,t,r,i){return[function(r){var a=e(this),o=void 0==r?void 0:r[t];return void 0!==o?o.call(r,a):new RegExp(r)[t](String(a))},function(e){var t=i(r,e,this);if(t.done)return t.value;var c=a(e),s=String(this);if(!c.global)return l(c,s);var u=c.unicode;c.lastIndex=0;var p,m=[],f=0;while(null!==(p=l(c,s))){var d=String(p[0]);m[f]=d,""===d&&(c.lastIndex=n(s,o(c.lastIndex),u)),f++}return 0===f?null:m}]})},fcea3:function(e,t,r){"use strict";r.d(t,"e",function(){return n}),r.d(t,"d",function(){return l}),r.d(t,"c",function(){return i}),r.d(t,"a",function(){return c}),r.d(t,"f",function(){return s}),r.d(t,"b",function(){return u});var a=r("b5c6"),o="/tybhrms/tybbookorder";function n(e){return Object(a["a"])({url:"".concat(o,"/save"),method:"post",data:e})}function l(e){return Object(a["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function i(e){return Object(a["a"])({url:"".concat(o,"/").concat(e),method:"get"})}function c(e){return Object(a["a"])({url:"".concat(o,"/cancel/").concat(e),method:"post"})}function s(e){return Object(a["a"])({url:"".concat(o,"/ticket"),method:"get",params:e})}function u(e){return Object(a["a"])({url:"".concat(o,"/delivery"),method:"get",params:e})}}}]);