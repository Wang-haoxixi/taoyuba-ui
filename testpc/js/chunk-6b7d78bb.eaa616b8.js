(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b7d78bb","chunk-325817bf","chunk-8e7934c6"],{"0f1e":function(e,t,a){"use strict";a.d(t,"k",(function(){return s})),a.d(t,"j",(function(){return c})),a.d(t,"m",(function(){return l})),a.d(t,"e",(function(){return u})),a.d(t,"a",(function(){return d})),a.d(t,"i",(function(){return m})),a.d(t,"l",(function(){return f})),a.d(t,"f",(function(){return p})),a.d(t,"h",(function(){return h})),a.d(t,"d",(function(){return b})),a.d(t,"g",(function(){return g})),a.d(t,"n",(function(){return v})),a.d(t,"c",(function(){return y})),a.d(t,"b",(function(){return w}));var r=a("b5c6"),n=a("2f9e"),i="tybhrms/resume",o="tmlms/shipownerRecruit";function s(e){return Object(r["a"])({url:"".concat(i,"/getPage"),method:"get",params:e})}function c(e){return Object(r["a"])({url:"".concat(i,"/getMyCerts"),method:"get",params:e})}function l(e,t){return Object(r["a"])({url:"".concat(i,"/review?status=").concat(e,"&resumeId=").concat(t),method:"post"})}function u(e){return Object(r["a"])({url:"".concat(i,"/delete/")+e,method:"post",data:e})}function d(e){return Object(r["a"])({url:"".concat(i,"/add"),method:"post",data:e})}function m(e){return Object(r["a"])({url:"".concat(i,"/")+e,method:"get",params:e})}function f(e,t){return Object(r["a"])({url:"".concat(i,"/update"),method:"put",params:{publish:t},data:e})}function p(e){return Object(n["a"])({url:"tybhrms/tybExcelExport/resume",data:e,title:"简历信息"})}function h(e){return Object(r["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function b(e){return Object(r["a"])({url:"".concat(o,"/delete/")+e,method:"post",data:e})}function g(e){return Object(r["a"])({url:"".concat(o,"/")+e,method:"get",dparamsata:e})}function v(e){return Object(r["a"])({url:"".concat(o,"/update"),method:"post",data:e})}function y(e){return Object(r["a"])({url:"".concat(o,"/create"),method:"post",data:e})}function w(e){return Object(r["a"])({url:"tybship/tybship/findmyship/"+e,method:"get"})}},"2f9e":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("ac6a"),a("28a5"),a("a481");var r=a("b5c6");function n(e){var t=e.url,a=e.method,n=void 0===a?"post":a,o=e.data,s=void 0===o?{}:o,c=e.title,l=void 0===c?"":c;return console.log(t),new Promise((function(e){return Object(r["a"])({url:t,method:n,headers:{responseType:"arraybuffer"},data:s,responseType:"blob"}).then((function(t){i({title:l,response:t}).then((function(){e()}))}))}))}function i(e){var t=e.title,a=void 0===t?"":t,r=e.response,n=o(r.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=r.headers,i=new Blob([r.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,a);else{var o=document.createElement("a");o.href=window.URL.createObjectURL(i),o.download=a?"".concat(a,".").concat(n.suffix):n.filename,document.body.appendChild(o),o.style.display="none",o.click()}e()}))}function o(e){var t={},a=e.split(";");return a.forEach((function(e){var a=e.replace(/^\s+|\s+$/g,""),r=a.split("=");r[1]?t[r[0]]=r[1]:t[r[0]]=r[0]})),t.suffix=t.filename.split(".")[1],t}},"43cb":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(e.currentComponet,{tag:"component",attrs:{record:e.record},on:{onDetail:e.handleDetail,onEdit:e.handleEdit,onGoBack:e.handleGoBack}})},n=[],i=a("d808"),o=a("abea"),s=a("f163"),c={name:"TableListWrapper",components:{List:i["default"],Edit:o["default"],Detail:s["default"]},data:function(){return{currentComponet:"List",record:""}},created:function(){},methods:{handleEdit:function(e){this.record=e,this.currentComponet="Edit"},handleGoBack:function(){this.record="",this.currentComponet="List"},handleDetail:function(e){this.record=e,this.currentComponet="Detail"}},watch:{"$route.path":function(){this.record="",this.currentComponet="List"}}},l=c,u=a("2877"),d=Object(u["a"])(l,r,n,!1,null,null,null);t["default"]=d.exports},"502e":function(e,t,a){"use strict";a("8e6e"),a("ac6a"),a("456d");var r=a("ade3"),n=(a("96cf"),a("1da1")),i=a("51f4");function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){Object(r["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var c={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(i["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,a){var r,n,i,o,c,l,u,d,m,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=f.length>2&&void 0!==f[2]?f[2]:function(e){return e},this.isLoadTable=!0,e.next=4,a(s(s({},this.pageOption),t));case 4:return n=e.sent,i=n.data,o=i.data,c=o.records,l=o.size,u=o.total,d=o.current,m=u/l+1===d,m&&0!==u?this.searchPage({current:d-1,size:l,total:u}):this.pagination={current:d,size:l,total:u},this.pagedTable=c.map(r),this.isLoadTable=!1,e.abrupt("return",i.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var a=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",n=c[r];this.$confirm("此操作将".concat(n,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?a.$message({type:"success",message:"".concat(n,"成功!")}):a.$message({type:"info",message:"".concat(n,"失败，").concat(e.data.msg)}),a.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,r,i,o=this,s=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=s.length>1&&void 0!==s[1]?s[1]:"delete",r=this.multipleSelection,i=c[a],void 0!==r&&0!==r.length){e.next=6;break}return this.$message("请先选择需要".concat(i,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(i,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(r);case 2:a=e.sent,n=a.data,n.data?(o.$message({type:"success",message:"".concat(i,"成功!")}),o.pageOption=o._pageOption()):o.$message({type:"info",message:"".concat(i,"失败，").concat(n.msg)}),o.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,a,r,i){var o=this;this.$confirm(r||"是否".concat(a),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t(e);case 2:n=r.sent,s=n.data,s.data?o.$message({type:"success",message:i||"".concat(a,"成功!")}):o.$message({type:"info",message:"".concat(s.msg)}),o.loadPage();case 6:case"end":return r.stop()}}),r)})))).catch((function(e){o.$message({type:"info",message:"".concat(e,", 已取消").concat(a)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},5210:function(e,t,a){},"9b20":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n})),a.d(t,"e",(function(){return c})),a.d(t,"g",(function(){return u})),a.d(t,"c",(function(){return o})),a.d(t,"f",(function(){return f})),a.d(t,"d",(function(){return d}));var r=a("0e0b"),n={resumeStatus:{0:"待审核",1:"正常",2:"不通过"},isPublic:{0:"不公开",1:"公开"},isRcmd:{0:"不推荐",1:"推荐"}},i=[{prop:"resumeId",label:"编号"},{prop:"realName",label:"姓名"},{prop:"job",label:"应聘职位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"updateTime",label:"更新时间"},{prop:"resumeStatus",label:"简历状态",type:"dict"}],o=function(e){var t=Object(r["g"])(s(),e);return t},s=function(){return{resumeId:"",realName:"",birthday:"",province:"",city:"",contactPhone:"",education:"",expectSalary:"",foreignLanguage:"",height:"",isPublic:"",postion:"",job:"",seniority:"",skill:"",workRequire:"",workDetail:"",workExprience:""}},c=function(){return{realName:"",resumeId:"",startdate:"",resumeCrestartdate:"",resumeCreenddate:""}},l=function(){return{realName:"",resumeId:"",startdate:"",resumeCrestartdate:"",resumeCreenddate:""}},u=function(e){var t=Object(r["g"])(l(),e);return t.realName=e.realName?e.realName:null,t},d=function(){return{resumeId:"",realName:"",birthday:"",province:"",city:"",contactPhone:"",education:"",expectSalary:"",foreignLanguage:"",height:"",isPublic:"",postion:"",job:"",seniority:"",skill:"",workRequire:"",workDetail:"",workExprience:""}},m=function(e,t,a){if(""!==t){var r=/(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/;r.test(t)||a(new Error("请输入11位的手机号码"))}a()},f={realName:[{required:!0,message:"请填姓名",trigger:"blur"},{min:2,max:4,message:"长度在 2 到 4 个字符",trigger:"blur"}],birthday:[{required:!0,message:"请填出生日期",trigger:"blur"}],province:[{required:!0,message:"请填省",trigger:"blur"}],city:[{required:!0,message:"请填市",trigger:"blur"}],contactPhone:[{required:!0,message:"请填联系电话",trigger:"blur"},{validator:m,trigger:"blur"}],education:[{required:!0,message:"请填教育程度",trigger:"blur"}],expectSalary:[{required:!0,message:"请填期望月薪",trigger:"blur"},{max:10,message:"不得超过10位数",trigger:"blur"}],foreignLanguage:[{required:!0,message:"请填外语水平",trigger:"blur"}],height:[{required:!0,message:"请填身高",trigger:"blur"},{max:3,message:"不得超过4位数",trigger:"blur"}],isPublic:[{required:!0,message:"请填是否公开",trigger:"blur"}],postion:[{required:!0,message:"请填原任职务",trigger:"blur"}],job:[{required:!0,message:"请填应聘职位",trigger:"blur"}],skill:[{required:!0,message:"请填特殊技能",trigger:"blur"},{max:25,message:"长度在 0 到 25 个字符",trigger:"blur"}],workRequire:[{required:!0,message:"请填作业要求",trigger:"blur"}],workExprience:[{required:!0,message:"请填工作经验",trigger:"blur"}]}},abea:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"iep-page-form"},[a("basic-container",[a("page-header",{attrs:{title:e.methodName+"简历",backOption:e.backOption}}),a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"姓名：",prop:"realName"}},[a("el-input",{attrs:{disabled:e.haveInfo.realName},model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系电话：",prop:"contactPhone"}},[a("el-input",{attrs:{disabled:e.haveInfo.phone},model:{value:e.form.contactPhone,callback:function(t){e.$set(e.form,"contactPhone",t)},expression:"form.contactPhone"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"出生日期：",prop:"birthday"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期","picker-options":e.pickerOptions},model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"现住地址："}},[a("el-select",{staticStyle:{width:"50%!important"},attrs:{placeholder:"请选择"},on:{change:e.getCity},model:{value:e.form.province,callback:function(t){e.$set(e.form,"province",t)},expression:"form.province"}},e._l(e.provinces,(function(e){return a("el-option",{key:e.value,attrs:{prop:"province",label:e.label,value:e.value}})})),1),a("el-select",{staticStyle:{width:"50%!important"},attrs:{placeholder:"请选择"},model:{value:e.form.city,callback:function(t){e.$set(e.form,"city",t)},expression:"form.city"}},e._l(e.citys,(function(e){return a("el-option",{key:e.value,attrs:{prop:"city",label:e.label,value:e.value}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"特殊技能：",prop:"skill"}},[a("el-input",{model:{value:e.form.skill,callback:function(t){e.$set(e.form,"skill",t)},expression:"form.skill"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"教育程度：",prop:"education"}},[a("iep-dict-select",{attrs:{"dict-name":"tyb_resume_education"},model:{value:e.form.education,callback:function(t){e.$set(e.form,"education",t)},expression:"form.education"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"期望月薪：",prop:"expectSalary"}},[a("el-input",{model:{value:e.form.expectSalary,callback:function(t){e.$set(e.form,"expectSalary",t)},expression:"form.expectSalary"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"外语水平：",prop:"foreignLanguage"}},[a("iep-dict-select",{attrs:{"dict-name":"tyb_resume_language"},model:{value:e.form.foreignLanguage,callback:function(t){e.$set(e.form,"foreignLanguage",t)},expression:"form.foreignLanguage"}},[e._v(">")])],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"身高CM：",prop:"height"}},[a("el-input",{model:{value:e.form.height,callback:function(t){e.$set(e.form,"height",t)},expression:"form.height"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否公开：",prop:"isPublic"}},[a("el-radio-group",{model:{value:e.form.isPublic,callback:function(t){e.$set(e.form,"isPublic",t)},expression:"form.isPublic"}},e._l(e.dictsMap.isPublic,(function(t,r){return a("el-radio",{key:r,attrs:{label:+r}},[e._v(e._s(t))])})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"原任职务：",prop:"postion"}},[a("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:e.form.postion,callback:function(t){e.$set(e.form,"postion",t)},expression:"form.postion"}},[e._v(">")])],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"应聘职位：",prop:"job"}},[a("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:e.form.job,callback:function(t){e.$set(e.form,"job",t)},expression:"form.job"}},[e._v(">")])],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"工作经验：",prop:"workExprience"}},[a("iep-dict-select",{attrs:{"dict-name":"tyb_work_exprience"},model:{value:e.form.workExprience,callback:function(t){e.$set(e.form,"workExprience",t)},expression:"form.workExprience"}},[e._v(">")])],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"作业方式：",prop:"workRequire"}},[a("iep-dict-select",{attrs:{"dict-name":"tyb_resume_worktype"},model:{value:e.form.workRequire,callback:function(t){e.$set(e.form,"workRequire",t)},expression:"form.workRequire"}},[e._v(">")])],1)],1)],1),a("el-row"),a("el-form-item",{attrs:{label:""}},[a("operation-wrapper",[a("iep-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)],1)],1)],1)},n=[],i=(a("7f7f"),a("6b54"),a("0f1e")),o=a("23d6"),s=a("9b20"),c=a("e420"),l={mixins:[c["a"]],data:function(){var e=this;return{dictsMap:s["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},rules:s["f"],form:Object(s["d"])(),provinces:[],citys:[]}},computed:{resumeId:function(){return+this.$route.params.resumeId},methodName:function(){return this.resumeId?"编辑":"发布"}},created:function(){var e=this;this.resumeId&&Object(i["i"])(this.resumeId).then((function(t){var a=t.data;e.form=e.$mergeByFirst(Object(s["d"])(),a.data),e.form.education=e.form.education.toString(),e.form.foreignLanguage=e.form.foreignLanguage.toString(),e.form.postion=e.form.postion.toString(),e.form.seniority=e.form.seniority.toString(),e.form.workRequire=e.form.workRequire.toString(),e.selectCity()})),this.getProvince()},mounted:function(){this.getInformation("form",["contactPhone","realName"])},methods:{getProvince:function(){var e=this;Object(o["c"])(0).then((function(t){var a=t.data;e.provinces=a.data.map((function(e){return{label:e.name,value:e.areaCode}}))}))},getCity:function(){var e=this;Object(o["c"])(this.form.province).then((function(t){var a=t.data;e.citys=a.data.map((function(e){return{label:e.name,value:e.areaCode}}))})),this.form.city=""},selectCity:function(){var e=this;Object(o["c"])(this.form.province).then((function(t){var a=t.data;e.citys=a.data.map((function(e){return{label:e.name,value:e.areaCode}}))}))},onGoBack:function(){this.$router.push({path:"/hrms_spa/resume_list"})},handleSubmit:function(e){var t=this,a=this.resumeId?i["l"]:i["a"];this.$refs["form"].validate((function(r){if(r){var n=!0===e;a(Object(s["c"])(t.form),n).then((function(e){var a=e.data;a.data&&(t.$message({message:"简历信息".concat(t.methodName,"成功"),type:"success"}),t.onGoBack())}))}}))}}},u=l,d=a("2877"),m=Object(d["a"])(u,r,n,!1,null,null,null);t["default"]=m.exports},b652:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{attrs:{model:e.form,"label-width":"120px",size:"mini"}},[a("el-form-item",{attrs:{label:"姓名："}},[a("el-input",{model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1),a("el-form-item",{attrs:{label:"简历编号："}},[a("el-input",{model:{value:e.form.resumeId,callback:function(t){e.$set(e.form,"resumeId",t)},expression:"form.resumeId"}})],1),a("el-form-item",{attrs:{label:"简历发布时间："}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.form.startdate,callback:function(t){e.$set(e.form,"startdate",t)},expression:"form.startdate"}})],1),a("el-form-item",[a("operation-wrapper",[a("iep-button",{attrs:{type:"primary"},on:{click:e.searchPage}},[e._v("搜索")]),a("iep-button",{on:{click:e.clearSearchParam}},[e._v("清空")])],1)],1)],1)},n=[],i=a("9b20"),o={data:function(){return{dictsMap:i["b"],form:Object(i["e"])(),pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},methods:{searchPage:function(){this.form.startdate&&(this.form.resumeCrestartdate=this.form.startdate[0],this.form.resumeCreenddate=this.form.startdate[1]),this.$emit("search-page",Object(i["g"])(this.form))},clearSearchParam:function(){this.form=Object(i["e"])()}},watch:{"form.startdate":function(e){console.log(e)}}},s=o,c=a("2877"),l=Object(c["a"])(s,r,n,!1,null,null,null);t["default"]=l.exports},d808:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("basic-container",[a("page-header",{attrs:{title:"求职简历"}}),a("operation-container",[a("template",{slot:"left"},[a("iep-button",{attrs:{type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return e.handleAdd()}}},[e._v("新增")]),a("iep-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.handleExport()}}},[e._v("导出")])],1),a("template",{slot:"right"},[a("operation-search",{attrs:{"advance-search":"",prop:e.searchData},on:{"search-page":e.searchPage}},[a("advance-search",{on:{"search-page":e.searchPage}})],1)],1)],2),a("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,dictsMap:e.dictsMap,columnsMap:e.columnsMap,pagedTable:e.pagedTable,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[e.manager?a("el-table-column",{attrs:{prop:"status",label:"审核操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(a){return e.getStatus(t.row.swith,t.row.resumeId)}},model:{value:t.row.swith,callback:function(a){e.$set(t.row,"swith",a)},expression:"scope.row.swith"}})],1)]}}],null,!1,605836754)}):e._e(),a("el-table-column",{attrs:{prop:"operation",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("operation-wrapper",[a("iep-button",{attrs:{type:"warning",plain:""},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),a("iep-button",{on:{click:function(a){return e.handleDetail(t.row)}}},[e._v("查看")]),a("iep-button",{attrs:{type:"default"},on:{click:function(a){return e.handleDelete(t.row)}}},[a("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1)],1)],1)},n=[],i=(a("ac6a"),a("6762"),a("2fdb"),a("96cf"),a("1da1")),o=a("0f1e"),s=a("b652"),c=a("7ded"),l=a("502e"),u=a("9b20"),d={components:{AdvanceSearch:s["default"]},mixins:[l["a"]],data:function(){return{dictsMap:u["b"],columnsMap:u["a"],searchData:"realName",userData:{roles:[]},pagedTable:[],manager:!0,ids:[],roleDate:[]}},created:function(){this.loadPage(),this.getIds()},methods:{handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleDelete:function(e){this._handleGlobalDeleteById(e.resumeId,o["e"])},handleAdd:function(){this.$router.push({path:"/hrms_spa/resume_post/0"})},handleEdit:function(e){this.$router.push({path:"/hrms_spa/resume_post/".concat(e.resumeId)})},handleDetail:function(e){this.$emit("onDetail",e)},getStatus:function(e,t){var a=this,r="";r=e?1:2,Object(o["m"])(r,t).then((function(e){a.$message({type:"success",message:e.data.msg}),a.loadPage()}))},handleExport:function(){var e=this;Object(o["f"])(this.ids).catch((function(t){e.$message({type:"warning",message:t})}))},getIds:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["c"])().then((function(e){return e.data.data.roles}));case 2:this.roleDate=e.sent,this.roleDate.includes(111)||this.roleDate.includes(1)?Object(o["k"])().then((function(e){t.ids=e.data.data.records.map((function(e){return e.resumeId}))})):Object(o["j"])().then((function(e){t.ids=e.data.data.records.map((function(e){return e.resumeId}))}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),loadPage:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a,r,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:this.searchForm,e.next=3,Object(c["c"])().then((function(e){return e.data.data}));case 3:if(this.userData=e.sent,-1!==this.userData.roles.indexOf(111)||-1!==this.userData.roles.indexOf(1)){e.next=13;break}return e.next=7,this.loadTable(t,o["j"]);case 7:a=e.sent,this.pagedTable=a.records,this.manager=!1,"姓名"===u["a"][0].label&&u["a"].splice(0,1),e.next=19;break;case 13:return e.next=15,this.loadTable(t,o["k"]);case 15:r=e.sent,this.pagedTable=r.records,this.manager=!0,this.pagedTable.forEach((function(e){1===e.resumeStatus?e.swith=!0:e.swith=!1}));case 19:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},watch:{pagedTable:function(e){this.ids=e.map((function(e){return e.resumeId}))}}},m=d,f=a("2877"),p=Object(f["a"])(m,r,n,!1,null,null,null);t["default"]=p.exports},e420:function(e,t,a){"use strict";a("7f7f");var r=a("7ded");t["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(e,t){var a=this;Object(r["c"])().then((function(r){-1===r.data.data.roles.indexOf(1)&&-1===r.data.data.roles.indexOf(111)&&(r.data.data.sysUser.phone&&(a.$set(a.haveInfo,"phone",!0),a[e][t[0]]=r.data.data.sysUser.phone),r.data.data.sysUser.realName&&(a.$set(a.haveInfo,"realName",!0),a[e][t[1]]=r.data.data.sysUser.realName),r.data.data.sysUser.idCard&&[t[2]]&&(a.$set(a.haveInfo,"idcard",!0),a[e].idcard=r.data.data.sysUser.idCard))}))}}}},f163:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"edit-wrapper"},[a("basic-container",[a("page-header",{attrs:{title:"查看简历",backOption:e.backOption}}),a("el-card",{staticClass:"recruit-headers",attrs:{shadow:"hover"}},[a("div",{staticClass:"con"},[a("div",{staticClass:"left"},[a("h4",{staticClass:"name"},[e._v("\n            "+e._s(e.form.realName)+"\n          ")]),a("div",{staticClass:"address"},[a("span",[e._v(e._s(e.form.resumeName))]),e._v(e._s(e.form.province)+e._s(e.form.city))])]),a("div",{staticClass:"right"},[a("div",{staticClass:"pay"},[e._v("薪资："+e._s(e.form.expectSalary))]),a("div",{staticClass:"info-detail"},[a("label",[e._v("联系电话："+e._s(e.form.contactPhone))]),a("label",[e._v("出生日期："+e._s(e.form.birthday))])])])])]),a("el-card",{staticClass:"middle-card",attrs:{"body-style":e.middleBodyStyle,shadow:"never"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("其他信息")])]),a("div",{staticClass:"info"},[a("div",{staticClass:"info-item"},[a("label",[e._v("教育水平：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:e.form.education,"dict-name":"tyb_resume_education"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[e._v("外语水平：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:e.form.foreignLanguage,"dict-name":"tyb_resume_language"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[e._v("身高CM：")]),a("div",{staticClass:"content"},[e._v(e._s(e.form.height))])]),a("div",{staticClass:"info-item"},[a("label",[e._v("原任职务：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:e.form.postion,"dict-name":"tyb_resume_position"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[e._v("应聘职位：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:e.form.job,"dict-name":"tyb_resume_position"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[e._v("航海经验：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:e.form.seniority,"dict-name":"tyb_resume_seniority"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[e._v("作业要求：")]),a("div",{staticClass:"content"},[a("iep-dict-detail",{attrs:{value:e.form.workRequire,"dict-name":"tyb_resume_worktype"}})],1)]),a("div",{staticClass:"info-item"},[a("label",[e._v("特殊技能：")]),a("div",{staticClass:"content"},[e._v(e._s(e.form.skill))])])])]),a("el-card",{staticClass:"middle-card",attrs:{"body-style":e.middleBodyStyle,shadow:"never"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("作业方式")])]),a("pre",[e._v(e._s(e.form.workDetail))])])],1)],1)},n=[],i=(a("7f7f"),a("0f1e")),o=a("23d6"),s=a("9b20"),c={props:{record:{type:Object,default:function(){}}},data:function(){var e=this;return{backOption:{isBack:!0,backPath:null,backFunction:function(){e.$emit("onGoBack")}},dictsMap:s["b"],middleBodyStyle:{padding:"20px",border:0},form:Object(s["d"])()}},created:function(){this.loadPage(),console.log(this.record.province)},methods:{loadPage:function(){var e=this;Object(i["i"])(this.record.resumeId).then((function(t){var a=t.data;e.form=e.$mergeByFirst(Object(s["d"])(),a.data),e.getProvince(),e.getCity()}))},getProvince:function(){var e=this;Object(o["d"])(this.record.province).then((function(t){var a=t.data;e.form.province=a.data.name}))},getCity:function(){var e=this;Object(o["d"])(this.record.city).then((function(t){var a=t.data;e.form.city=a.data.name}))}}},l=c,u=(a("f333"),a("2877")),d=Object(u["a"])(l,r,n,!1,null,"c7384ff0",null);t["default"]=d.exports},f333:function(e,t,a){"use strict";a("5210")}}]);