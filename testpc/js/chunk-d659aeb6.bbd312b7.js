(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d659aeb6"],{"89c6":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"text-align":"center","font-size":"25px"}},[t._v("全国渔业船员培训统编教材订购清单")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"span-method":t.objectSpanMethod,border:""}},[a("el-table-column",{attrs:{prop:"createTime",label:"日期",width:"50",align:"center"}}),a("el-table-column",{attrs:{prop:"department",label:"单位",width:"70",align:"center"}}),a("el-table-column",{attrs:{prop:"address",label:"收件地址",width:"80",align:"center"}}),a("el-table-column",{attrs:{prop:"contactName",label:"联系人",width:"50",align:"center"}}),a("el-table-column",{attrs:{prop:"phone",label:"手机",width:"70",align:"center"}}),a("el-table-column",{attrs:{prop:"title",label:"书 目",width:"120",align:"center"}}),a("el-table-column",{attrs:{prop:"price",label:"定价（元）",width:"70",align:"center"}}),a("el-table-column",{attrs:{prop:"quantity",label:"订购数（册）",width:"70",align:"center"}}),a("el-table-column",{attrs:{prop:"total",label:"小计金额（元）",width:"70",align:"center"}}),a("el-table-column",{attrs:{prop:"tso",label:"大写合计（元）",width:"70",align:"center"}})],1),a("table",{staticStyle:{border:"1px solid #EBEEF5"}},[a("tr",[a("th",{staticStyle:{border:"1px solid #EBEEF5",width:"510px","text-align":"center"}},[t._v("合计")]),a("th",{staticStyle:{border:"1px solid #EBEEF5",width:"70px","text-align":"center"}},[t._v(t._s(t.tolmun))]),a("th",{staticStyle:{border:"1px solid #EBEEF5",width:"70px","text-align":"center"}},[t._v(t._s(t.tolmen))])])]),a("div",{staticStyle:{border:"1px solid #EBEEF5",width:"360px",height:"150px",float:"left"}},[a("div",[t._v("付款方信息")]),a("div",[t._v("名       称：  "+t._s(t.form.payerTitle))]),a("div",[t._v("纳税人识别号："+t._s(t.form.payerTaxNum))]),a("div",[t._v("地 址、电 话："+t._s(t.form.payerAddress)+"，"+t._s(t.form.payerPhone))]),a("div",[t._v("开户行及账号："+t._s(t.form.payerBank)+"，"+t._s(t.form.payerAccount))])]),t._m(0)],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{border:"1px solid #EBEEF5",width:"360px",height:"150px",float:"left"}},[a("div",[t._v("收款方信息")]),a("div",[t._v("名       称：")]),a("div",[t._v("纳税人识别号：")]),a("div",[t._v("地 址、电 话：")]),a("div",[t._v("开户行及账号：")])])}],l=(a("a481"),a("ac6a"),a("fcea3")),o={data:function(){return{tableData:[],rows:0,tolmun:0,tolmen:0,form:{payerTitle:"",payerTaxNum:"",payerAddress:"",payerPhone:"",payerBank:"",payerAccount:""}}},created:function(){this.getData()},methods:{getData:function(){var t=this;Object(l["c"])(this.$route.params.id).then(function(e){t.rows=e.data.data.tybBookOrderLists.length,t.form=e.data.data,e.data.data.tybBookOrderLists.forEach(function(a){var r={createTime:e.data.data.createTime.substring(0,10),department:e.data.data.department,address:e.data.data.address,contactName:e.data.data.contactName,phone:e.data.data.phone};t.$set(r,"title",a.title),t.$set(r,"price",a.price),t.$set(r,"quantity",a.quantity),t.$set(r,"total",a.quantity*a.price),t.tableData.push(r)}),t.tableData.forEach(function(e){t.tolmun+=e.quantity,t.tolmen+=e.total}),t.$set(t.tableData[0],"tso",t.moneyTransilate(t.tolmen))})},moneyTransilate:function(t){if(""==t)return"";if(!/^(0|[1-9]\d*)(\.\d+)?$/.test(t))return"数据非法";var e="京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分",a="";t+="00";var r=t.indexOf(".");r>=0&&(t=t.substring(0,r)+t.substr(r+1,2)),e=e.substr(e.length-t.length);for(var n=0;n<t.length;n++)a+="零壹贰叁肆伍陆柒捌玖".charAt(t.charAt(n))+e.charAt(n);return a.replace(/零(仟|佰|拾|角)/g,"零").replace(/(零)+/g,"零").replace(/零(兆|万|亿|元)/g,"$1").replace(/(兆|亿)万/g,"$1").replace(/(京|兆)亿/g,"$1").replace(/(京)兆/g,"$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g,"$1$2零$3仟").replace(/^元零?|零分/g,"").replace(/(元|角)$/g,"$1整")},objectSpanMethod:function(t){var e=t.rowIndex,a=t.columnIndex;if(0===a||1===a||2===a||3===a||4===a||9===a)return 0===e?{rowspan:this.rows,colspan:1}:{rowspan:0,colspan:0}}}},c=o,i=a("0c7c"),d=Object(i["a"])(c,r,n,!1,null,null,null);e["default"]=d.exports},fcea3:function(t,e,a){"use strict";a.d(e,"e",function(){return l}),a.d(e,"d",function(){return o}),a.d(e,"c",function(){return c}),a.d(e,"a",function(){return i}),a.d(e,"f",function(){return d}),a.d(e,"b",function(){return s});var r=a("b5c6"),n="/tybhrms/tybbookorder";function l(t){return Object(r["a"])({url:"".concat(n,"/save"),method:"post",data:t})}function o(t){return Object(r["a"])({url:"".concat(n,"/page"),method:"get",params:t})}function c(t){return Object(r["a"])({url:"".concat(n,"/").concat(t),method:"get"})}function i(t){return Object(r["a"])({url:"".concat(n,"/cancel/").concat(t),method:"post"})}function d(t){return Object(r["a"])({url:"".concat(n,"/ticket"),method:"get",params:t})}function s(t){return Object(r["a"])({url:"".concat(n,"/delivery"),method:"get",params:t})}}}]);