(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c8a10ab8"],{"092b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"edit-wrapper"},[a("basic-container",[a("page-header",{attrs:{title:"查看招聘",backOption:t.backOption}}),a("el-card",{staticClass:"recruit-headers",attrs:{shadow:"hover"}},[a("div",{staticClass:"con"},[a("div",{staticClass:"left"},[a("h4",{staticClass:"name"},[t._v("\n            "+t._s(t.form.contactName)+"\n          ")]),a("div",{staticClass:"address"},[a("iep-dict-detail",{attrs:{value:t.form.positionId,"dict-name":"tyb_resume_position"}}),t._v(t._s(t.form.province)+t._s(t.form.city))],1)]),a("div",{staticClass:"right"},[a("div",{staticClass:"pay"},[t._v("薪资："+t._s(t.form.salary))]),a("div",{staticClass:"info-detail"},[a("label",[t._v("联系电话："+t._s(t.form.contactPhone))]),a("label",[t._v("招"+t._s(t.form.recruitNo)+"人")])])])])]),a("el-card",{staticClass:"middle-card",attrs:{"body-style":t.middleBodyStyle,shadow:"never"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("其他要求")])]),a("div",{staticClass:"info"},[a("div",{staticClass:"info-item"},[a("label",[t._v("货币种类：")]),a("div",{staticClass:"content"},[1==t.form.salaryCurrency?a("div",[t._v("人民币（RMB)")]):t._e(),2==t.form.salaryCurrency?a("div",[t._v("美元（USD）")]):t._e()])]),a("div",{staticClass:"info-item"},[a("label",[t._v("证书要求：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:t.form.certRequire,"dict-name":"tyb_position_certtype"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[t._v("年龄要求：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:t.form.ageRequire,"dict-name":"tyb_position_agerequirement"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[t._v("作业方式：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:t.form.workMode,"dict-name":"tyb_resume_worktype"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[t._v("船长（m）：")]),a("div",{staticClass:"content"},[t._v(t._s(t.form.hullLength))])]),a("div",{staticClass:"info-item"},[a("label",[t._v("主机总功率：")]),a("div",{staticClass:"content"},[t._v(t._s(t.form.totalPower))])])])])],1)],1)},i=[],r=(a("7f7f"),a("2f4e")),o=a("23d6"),c={props:{record:{type:Object,default:function(){}}},data:function(){return{backOption:{isBack:!0,backPath:null},middleBodyStyle:{padding:"20px",border:0},form:{}}},created:function(){this.loadPage()},methods:{loadPage:function(){var t=this;Object(r["g"])(this.$route.query.see).then((function(e){var a=e.data;t.form=a.data,t.getProvince(),t.getCity()}))},getProvince:function(){var t=this;Object(o["d"])(this.form.province).then((function(e){var a=e.data;t.form.province=a.data.name}))},getCity:function(){var t=this;Object(o["d"])(this.form.city).then((function(e){var a=e.data;t.form.city=a.data.name}))}}},s=c,d=(a("1f67"),a("2877")),l=Object(d["a"])(s,n,i,!1,null,"1a8dfbc0",null);e["default"]=l.exports},"1f67":function(t,e,a){"use strict";a("f7a5")},"2f4e":function(t,e,a){"use strict";a.d(e,"h",(function(){return o})),a.d(e,"f",(function(){return c})),a.d(e,"b",(function(){return s})),a.d(e,"a",(function(){return d})),a.d(e,"g",(function(){return l})),a.d(e,"i",(function(){return u})),a.d(e,"c",(function(){return f})),a.d(e,"d",(function(){return v})),a.d(e,"e",(function(){return m}));var n=a("b5c6"),i=a("2f9e"),r="tybhrms/tybrecruit";function o(t){return Object(n["a"])({url:"".concat(r,"/page"),method:"get",params:t})}function c(t){return Object(n["a"])({url:"".concat(r,"/mypage"),method:"get",params:t})}function s(t){return Object(n["a"])({url:"".concat(r,"/")+t,method:"post",data:t})}function d(t){return Object(n["a"])({url:"".concat(r,"/save"),method:"post",data:t})}function l(t){return Object(n["a"])({url:"".concat(r,"/")+t,method:"get",params:t})}function u(t,e){return Object(n["a"])({url:"".concat(r,"/update"),method:"post",params:{publish:e},data:t})}function f(t){return Object(i["a"])({url:"tybhrms/tybExcelExport/recruit",data:t,title:"招聘信息"})}function v(t,e,a){return Object(i["a"])({url:"/tmlms/tybmlmsExcelExport/sign_export?userType=".concat(t,"&trainMeetId=").concat(a),title:e,method:"get"})}function m(t){return Object(n["a"])({url:"/tybship/tybship/findmyship/".concat(t),method:"get"})}},"2f9e":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("ac6a"),a("28a5"),a("a481");var n=a("b5c6");function i(t){var e=t.url,a=t.method,i=void 0===a?"post":a,o=t.data,c=void 0===o?{}:o,s=t.title,d=void 0===s?"":s;return console.log(e),new Promise((function(t){return Object(n["a"])({url:e,method:i,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(e){r({title:d,response:e}).then((function(){t()}))}))}))}function r(t){var e=t.title,a=void 0===e?"":e,n=t.response,i=o(n.headers["content-disposition"].replace(/"/g,""));return new Promise((function(t){var e=n.headers,r=new Blob([n.data],{type:e["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(r,a);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(r),o.download=a?"".concat(a,".").concat(i.suffix):i.filename,document.body.appendChild(o),o.style.display="none",o.click()}t()}))}function o(t){var e={},a=t.split(";");return a.forEach((function(t){var a=t.replace(/^\s+|\s+$/g,""),n=a.split("=");n[1]?e[n[0]]=n[1]:e[n[0]]=n[0]})),e.suffix=e.filename.split(".")[1],e}},f7a5:function(t,e,a){}}]);