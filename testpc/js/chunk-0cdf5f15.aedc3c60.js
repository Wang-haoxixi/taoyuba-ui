(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0cdf5f15"],{"2ec0":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{attrs:{model:e.form,"label-width":"120px",size:"mini"}},[r("el-form-item",{attrs:{label:"招聘编号："}},[r("el-input",{model:{value:e.form.recruitId,callback:function(t){e.$set(e.form,"recruitId",t)},expression:"form.recruitId"}})],1),r("el-form-item",{attrs:{label:"联系人："}},[r("el-input",{model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1),r("el-form-item",{attrs:{label:"招聘岗位："}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:e.form.positionId,callback:function(t){e.$set(e.form,"positionId",t)},expression:"form.positionId"}})],1),r("el-form-item",{attrs:{label:"招聘发布时间："}},[r("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.form.startdate,callback:function(t){e.$set(e.form,"startdate",t)},expression:"form.startdate"}})],1),r("el-form-item",[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:e.searchPage}},[e._v("搜索")]),r("iep-button",{on:{click:e.clearSearchParam}},[e._v("清空")])],1)],1)],1)},n=[],o=r("51d6"),i={data:function(){return{dictsMap:o["b"],form:Object(o["e"])(),pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-6048e5),e.$emit("pick",[r,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-2592e6),e.$emit("pick",[r,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-7776e6),e.$emit("pick",[r,t])}}]}}},methods:{searchPage:function(){this.form.startdate&&(this.form.recruitCrestartdate=this.form.startdate[0],this.form.recruitCreenddate=this.form.startdate[1]),this.$emit("search-page",Object(o["g"])(this.form))},clearSearchParam:function(){this.form=Object(o["e"])()}}},c=i,s=r("2877"),l=Object(s["a"])(c,a,n,!1,null,null,null);t["default"]=l.exports},"2f4e":function(e,t,r){"use strict";r.d(t,"h",(function(){return i})),r.d(t,"f",(function(){return c})),r.d(t,"b",(function(){return s})),r.d(t,"a",(function(){return l})),r.d(t,"g",(function(){return u})),r.d(t,"i",(function(){return d})),r.d(t,"c",(function(){return m})),r.d(t,"d",(function(){return f})),r.d(t,"e",(function(){return p}));var a=r("b5c6"),n=r("2f9e"),o="tybhrms/tybrecruit";function i(e){return Object(a["a"])({url:"".concat(o,"/page"),method:"get",params:e})}function c(e){return Object(a["a"])({url:"".concat(o,"/mypage"),method:"get",params:e})}function s(e){return Object(a["a"])({url:"".concat(o,"/")+e,method:"post",data:e})}function l(e){return Object(a["a"])({url:"".concat(o,"/save"),method:"post",data:e})}function u(e){return Object(a["a"])({url:"".concat(o,"/")+e,method:"get",params:e})}function d(e,t){return Object(a["a"])({url:"".concat(o,"/update"),method:"post",params:{publish:t},data:e})}function m(e){return Object(n["a"])({url:"tybhrms/tybExcelExport/recruit",data:e,title:"招聘信息"})}function f(e,t,r){return Object(n["a"])({url:"/tmlms/tybmlmsExcelExport/sign_export?userType=".concat(e,"&trainMeetId=").concat(r),title:t,method:"get"})}function p(e){return Object(a["a"])({url:"/tybship/tybship/findmyship/".concat(e),method:"get"})}},"2f9e":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r("ac6a"),r("28a5"),r("a481");var a=r("b5c6");function n(e){var t=e.url,r=e.method,n=void 0===r?"post":r,i=e.data,c=void 0===i?{}:i,s=e.title,l=void 0===s?"":s;return new Promise((function(e){return Object(a["a"])({url:t,method:n,headers:{responseType:"arraybuffer"},data:c,responseType:"blob"}).then((function(t){o({title:l,response:t}).then((function(){e()}))}))}))}function o(e){var t=e.title,r=void 0===t?"":t,a=e.response,n=i(a.headers["content-disposition"].replace(/"/g,""));return new Promise((function(e){var t=a.headers,o=new Blob([a.data],{type:t["content-type"]});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(o,r);else{var i=document.createElement("a");i.href=window.URL.createObjectURL(o),i.download=r?"".concat(r,".").concat(n.suffix):n.filename,document.body.appendChild(i),i.style.display="none",i.click()}e()}))}function i(e){var t={},r=e.split(";");return r.forEach((function(e){var r=e.replace(/^\s+|\s+$/g,""),a=r.split("=");a[1]?t[a[0]]=a[1]:t[a[0]]=a[0]})),t.suffix=t.filename.split(".")[1],t}},"502e":function(e,t,r){"use strict";r("8e6e"),r("ac6a"),r("456d");var a=r("ade3"),n=(r("96cf"),r("1da1")),o=r("51f4");function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(o["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,o,i,s,l,u,d,m,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=f.length>2&&void 0!==f[2]?f[2]:function(e){return e},this.isLoadTable=!0,e.next=4,r(c(c({},this.pageOption),t));case 4:return n=e.sent,o=n.data,i=o.data,s=i.records,l=i.size,u=i.total,d=i.current,m=u/l+1===d,m&&0!==u?this.searchPage({current:d-1,size:l,total:u}):this.pagination={current:d,size:l,total:u},this.pagedTable=s.map(a),this.isLoadTable=!1,e.abrupt("return",o.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var r=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",n=s[a];this.$confirm("此操作将".concat(n,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?r.$message({type:"success",message:"".concat(n,"成功!")}):r.$message({type:"info",message:"".concat(n,"失败，").concat(e.data.msg)}),r.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,a,o,i=this,c=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=c.length>1&&void 0!==c[1]?c[1]:"delete",a=this.multipleSelection,o=s[r],void 0!==a&&0!==a.length){e.next=6;break}return this.$message("请先选择需要".concat(o,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(o,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(a);case 2:r=e.sent,n=r.data,n.data?(i.$message({type:"success",message:"".concat(o,"成功!")}),i.pageOption=i._pageOption()):i.$message({type:"info",message:"".concat(o,"失败，").concat(n.msg)}),i.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,r,a,o){var i=this;this.$confirm(a||"是否".concat(r),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function a(){var n,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t(e);case 2:n=a.sent,c=n.data,c.data?i.$message({type:"success",message:o||"".concat(r,"成功!")}):i.$message({type:"info",message:"".concat(c.msg)}),i.loadPage();case 6:case"end":return a.stop()}}),a)})))).catch((function(e){i.$message({type:"info",message:"".concat(e,", 已取消").concat(r)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},"51d6":function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return n})),r.d(t,"d",(function(){return i})),r.d(t,"f",(function(){return h})),r.d(t,"c",(function(){return s})),r.d(t,"e",(function(){return l})),r.d(t,"g",(function(){return d}));r("3b2b");var a=r("0e0b"),n={recruitStatus:{0:"待审核",1:"通过",2:"不通过"}},o=[{prop:"recruitId",label:"编号"},{prop:"contactName",label:"联系人"},{prop:"positionId",label:"招聘岗位",dictName:"tyb_resume_position",type:"dictGroup"},{prop:"recruitNo",label:"招聘人数"},{prop:"salary",label:"月薪"},{prop:"updateTime",label:"更新时间"},{prop:"recruitStatus",label:"招聘状态",type:"dict"}],i=function(){return{recruitId:"",contactName:"",positionId:"",contactPhone:"",recruitNo:"",salary:"面议",salaryCurrency:"",certRequire:"",ageRequire:"",workMode:"",province:"",city:"",town:"",hullLength:"",totalPower:"",certLevel:"",certTitle:"",shipName:"",remark:"",workExprience:""}},c=function(){return{recruitId:"",contactName:"",positionId:"",contactPhone:"",recruitNo:"",salary:"",salaryCurrency:"",certRequire:"",ageRequire:"",workMode:"",province:"",city:"",town:"",hullLength:"",totalPower:"",certLevel:"",certTitle:"",shipName:"",remark:"",workExprience:""}},s=function(e){var t=Object(a["g"])(c(),e);return t},l=function(){return{contactName:"",positionId:"",recruitId:"",startdate:"",recruitCrestartdate:"",recruitCreenddate:""}},u=function(){return{contactName:"",positionId:"",recruitId:"",recruitCrestartdate:"",recruitCreenddate:""}},d=function(e){var t=Object(a["g"])(u(),e);return t.contactName=e.contactName?e.contactName:null,t.positionId=e.positionId?e.positionId:null,t},m=function(e,t,r){if(""!==t){var a=/(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/;a.test(t)||r(new Error("请输入11位的手机号码"))}r()};function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=new RegExp("^\\d{0,"+t+"}$");if(0===r)return a.test(e);var n=new RegExp("^\\d{0,"+t+"}\\.\\d{0,"+r+"}$");return a.test(e)||n.test(e)}function p(e,t,r){""===t?r(new Error):f(t,e.length,e.decimal)?r():r(new Error)}var h={contactName:[{required:!0,message:"请填联系人",trigger:"blur"},{min:2,max:4,message:"长度在 2 到 4 个字符",trigger:"blur"}],positionId:[{required:!0,message:"请填招聘岗位",trigger:"blur"},{max:10,message:"长度在 0 到 10 个字符",trigger:"blur"}],contactPhone:[{required:!0,message:"请填联系电话",trigger:"blur"},{validator:m,trigger:"blur"}],recruitNo:[{required:!0,message:"请填招聘人数",trigger:"blur"},{max:4,message:"不得超过5位数",trigger:"blur"}],salary:[{required:!0,message:"请填月薪",trigger:"blur"},{max:10,message:"不得超过10位数",trigger:"blur"}],salaryCurrency:[{required:!0,message:"请填货币种类",trigger:"blur"}],certRequire:[{required:!0,message:"请填证书要求",trigger:"blur"}],ageRequire:[{required:!0,message:"请填年龄要求",trigger:"blur"}],workMode:[{required:!0,message:"请填作业方式",trigger:"blur"}],hullLength:[{required:!0,message:"请填船长（m）",trigger:"blur"},{required:!0,validator:p,trigger:"blur",length:3,decimal:2,message:"请输入0~999.99的整数或小数！"}],totalPower:[{required:!0,message:"请填主机总功率",trigger:"blur"},{required:!0,validator:p,trigger:"blur",length:3,decimal:2,message:"请输入0~999.99的整数或小数！"}],workExprience:[{required:!0,message:"请填工作经验",trigger:"blur"}]}},e420:function(e,t,r){"use strict";r("7f7f");var a=r("7ded");t["a"]={data:function(){return{haveInfo:{}}},methods:{getInformation:function(e,t){var r=this;Object(a["c"])().then((function(a){-1===a.data.data.roles.indexOf(1)&&-1===a.data.data.roles.indexOf(111)&&(a.data.data.sysUser.phone&&(r.$set(r.haveInfo,"phone",!0),r[e][t[0]]=a.data.data.sysUser.phone),a.data.data.sysUser.realName&&(r.$set(r.haveInfo,"realName",!0),r[e][t[1]]=a.data.data.sysUser.realName),a.data.data.sysUser.idCard&&[t[2]]&&(r.$set(r.haveInfo,"idcard",!0),r[e].idcard=a.data.data.sysUser.idCard))}))}}}},f5a7:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"iep-page-form"},[r("basic-container",[r("page-header",{attrs:{title:e.methodName+"招聘",backOption:e.backOption}}),r("el-form",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"140px",size:"small"}},[r("el-row",[e.manager?r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"船名：",prop:"shipName"}},[r("el-input",{attrs:{disabled:e.haveInfo.shipName},on:{blur:e.onBlurShipName},model:{value:e.form.shipName,callback:function(t){e.$set(e.form,"shipName","string"===typeof t?t.trim():t)},expression:"form.shipName"}})],1)],1):e._e(),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系人：",prop:"contactName"}},[r("el-input",{attrs:{disabled:e.haveInfo.realName},model:{value:e.form.contactName,callback:function(t){e.$set(e.form,"contactName",t)},expression:"form.contactName"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"招聘岗位：",prop:"positionId"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_position"},model:{value:e.form.positionId,callback:function(t){e.$set(e.form,"positionId",t)},expression:"form.positionId"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话：",prop:"contactPhone"}},[r("el-input",{attrs:{disabled:e.haveInfo.phone},model:{value:e.form.contactPhone,callback:function(t){e.$set(e.form,"contactPhone",t)},expression:"form.contactPhone"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"招聘人数：",prop:"recruitNo"}},[r("el-input",{model:{value:e.form.recruitNo,callback:function(t){e.$set(e.form,"recruitNo",t)},expression:"form.recruitNo"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"月薪：",prop:"salary"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.salaryCurrency,callback:function(t){e.$set(e.form,"salaryCurrency",t)},expression:"form.salaryCurrency"}},e._l(e.salaryList,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"证书职务：",prop:"certTitle"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_crew_cert_title"},model:{value:e.form.certTitle,callback:function(t){e.$set(e.form,"certTitle",t)},expression:"form.certTitle"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"证书等级：",prop:"certLevel"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.certLevel,callback:function(t){e.$set(e.form,"certLevel",t)},expression:"form.certLevel"}},e._l(e.level,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"作业方式：",prop:"workMode"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_resume_worktype"},model:{value:e.form.workMode,callback:function(t){e.$set(e.form,"workMode",t)},expression:"form.workMode"}},[e._v(">")])],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{type:"number",label:"船长（m）：",prop:"hullLength"}},[r("el-input",{model:{value:e.form.hullLength,callback:function(t){e.$set(e.form,"hullLength",t)},expression:"form.hullLength"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"主机总功率：",prop:"totalPower"}},[r("el-input",{model:{value:e.form.totalPower,callback:function(t){e.$set(e.form,"totalPower",t)},expression:"form.totalPower"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"年龄要求：",prop:"ageRequire"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_position_agerequirement"},model:{value:e.form.ageRequire,callback:function(t){e.$set(e.form,"ageRequire",t)},expression:"form.ageRequire"}},[e._v(">")])],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工作经验：",prop:"workExprience"}},[r("iep-dict-select",{attrs:{"dict-name":"tyb_work_exprience"},model:{value:e.form.workExprience,callback:function(t){e.$set(e.form,"workExprience",t)},expression:"form.workExprience"}},[e._v(">")])],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[e.manager?r("el-form-item",{attrs:{label:"备注：",prop:"remark"}},[r("el-input",{attrs:{autosize:{minRows:4},type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1):e._e()],1)],1),r("el-form-item",{attrs:{label:""}},[r("operation-wrapper",[r("iep-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保存")])],1)],1)],1)],1)],1)},n=[],o=(r("7f7f"),r("6762"),r("2fdb"),r("6b54"),r("2f4e")),i=r("23d6"),c=r("51d6"),s=r("e420"),l=r("7ded"),u={mixins:[s["a"]],data:function(){var e=this;return{dictsMap:c["b"],backOption:{isBack:!0,backPath:null,backFunction:function(){e.onGoBack()}},rules:c["f"],provinces:[],citys:[],towns:[],salaryCurrencys:[{value:"1",label:"人民币（RMB)"},{value:"2",label:"美元（USD）"}],form:Object(c["d"])(),level:[{value:"0",label:"--"},{value:"1",label:"一级"},{value:"2",label:"二级"},{value:"3",label:"三级"}],manager:!1,loading:!1,userId:"",salaryList:[{label:"面议",value:"1"},{label:"4K以下",value:"2"},{label:"4-6K",value:"3"},{label:"6-8K",value:"4"},{label:"8K-10K",value:"5"},{label:"10K及以上",value:"6"}]}},computed:{methodName:function(){return this.recruitId?"编辑":"发布"}},created:function(){},mounted:function(){},methods:{open:function(e){var t=this;this.getInformation("form",["contactPhone","contactName"]),this.recruitId=e||"",this.recruitId&&Object(o["g"])(this.recruitId).then((function(e){var r=e.data;t.form=t.$mergeByFirst(Object(c["d"])(),r.data),0===t.form.salary&&(t.form.salary="面议"),t.form.recruitNo=t.form.recruitNo.toString(),t.form.salary=t.form.salary.toString(),t.form.hullLength=t.form.hullLength.toString(),t.selectCity(),t.selectTown()})),Object(l["c"])().then((function(e){e.data.data.roles.includes(111)?t.manager=!0:t.manager=!1,e.data.data.sysUser.userId,t.loading=!0})),this.getProvince()},onBlurShipName:function(e){var t=this,r=e.target.value;r&&Object(o["e"])(r).then((function(e){var r=e.data;if(0===r.code){var a=r.data;t.form.contactName=a.shipowner,t.form.contactPhone=a.mobile,t.form.hullLength=a.hullLength,t.form.totalPower=a.engineTotalPower}}))},getProvince:function(){var e=this;Object(i["c"])(0).then((function(t){var r=t.data;e.provinces=r.data.map((function(e){return{label:e.name,value:e.areaCode}}))}))},getCity:function(){var e=this;Object(i["c"])(this.form.province).then((function(t){var r=t.data;e.towns=r.data.map((function(e){return{label:e.name,value:e.areaCode}}))})),this.form.city="",this.form.town=""},getTown:function(){var e=this;Object(i["c"])(this.form.town).then((function(t){var r=t.data;e.citys=r.data.map((function(e){return{label:e.name,value:e.areaCode}}))})),this.form.city=""},selectCity:function(){var e=this;Object(i["c"])(this.form.province).then((function(t){var r=t.data;e.towns=r.data.map((function(e){return{label:e.name,value:e.areaCode}}))}))},selectTown:function(){var e=this;Object(i["c"])(this.form.town).then((function(t){var r=t.data;e.citys=r.data.map((function(e){return{label:e.name,value:e.areaCode}}))}))},onGoBack:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$emit("end",e)},handleSubmit:function(e){var t=this,r=this.recruitId?o["i"]:o["a"];this.$refs["form"].validate((function(a){if(a){var n=!0===e;"面议"===t.form.salary&&(t.form.salary=0),t.form.salaryCurrency="1",r(Object(c["c"])(t.form),n).then((function(e){var r=e.data;r.data&&(t.$message({message:"招聘信息".concat(t.methodName,"成功"),type:"success"}),t.onGoBack(!0))}))}}))}}},d=u,m=r("2877"),f=Object(m["a"])(d,a,n,!1,null,null,null);t["default"]=f.exports},fd43:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}]},[r("basic-container",[r("page-header",{attrs:{title:"招聘岗位"}}),r("operation-container",[r("template",{slot:"left"},[r("iep-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleAdd()}}},[e._v("新增")]),r("iep-button",{attrs:{type:"default"},on:{click:function(t){return e.exportExcel()}}},[e._v("导出")])],1),r("template",{slot:"right"},[r("operation-search",{attrs:{"advance-search":"",prop:e.searchData},on:{"search-page":e.searchPage}},[r("advance-search",{on:{"search-page":e.searchPage}})],1)],1)],2),r("iep-table",{attrs:{isLoadTable:e.isLoadTable,pagination:e.pagination,columnsMap:e.columnsMap,pagedTable:e.pagedTable,dictsMap:e.dictsMap,"is-mutiple-selection":""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{prop:"operation",label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("operation-wrapper",[r("iep-button",{attrs:{type:"default",plain:""},on:{click:function(r){return e.handleEdit(t.row)}}},[e._v("编辑")]),r("iep-button",{attrs:{type:"warning"},on:{click:function(r){return e.handleDelete(t.row)}}},[r("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1)],1)],1),e.show?r("div",[r("form-container",{ref:"formContainer",on:{end:e.onEnd}})],1):e._e()])},n=[],o=(r("ac6a"),r("6762"),r("2fdb"),r("96cf"),r("1da1")),i=r("2f4e"),c=r("2ec0"),s=r("502e"),l=r("51d6"),u=r("7ded"),d=r("f5a7"),m={components:{AdvanceSearch:c["default"],formContainer:d["default"]},mixins:[s["a"]],data:function(){return{show:!1,dictsMap:l["b"],columnsMap:l["a"],searchData:"contactName",ids:[],roleDate:[],url:"/tybhrms/tybExcelExport/recruit"}},created:function(){this.loadPage(),this.getIds()},methods:{onEnd:function(e){this.show=!1,e&&this.loadPage()},handleSelectionChange:function(e){this.multipleSelection=e.map((function(e){return e.id}))},handleDelete:function(e){this._handleGlobalDeleteById(e.recruitId,i["b"])},handleAdd:function(){var e=this;this.show=!0,this.$nextTick((function(){e.$refs.formContainer.open()}))},handleEdit:function(e){var t=this;this.show=!0,this.$nextTick((function(){t.$refs.formContainer.open(e.recruitId)}))},handleDetail:function(e){this.$emit("onDetail",e)},exportExcel:function(){var e=this;Object(i["c"])(this.ids).catch((function(t){e.$message({type:"warning",message:t})}))},getIds:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["c"])().then((function(e){return e.data.data.roles}));case 2:this.roleDate=e.sent,this.roleDate.includes(111)||this.roleDate.includes(1)?Object(i["h"])().then((function(e){t.ids=e.data.data.records.map((function(e){return e.recruitId}))})):Object(i["f"])().then((function(e){t.ids=e.data.data.records.map((function(e){return e.recruitId}))}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),loadPage:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,r,a,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:this.searchForm,e.next=3,Object(u["c"])().then((function(e){return e.data.data}));case 3:if(this.userData=e.sent,-1!==this.userData.roles.indexOf(111)||-1!==this.userData.roles.indexOf(1)){e.next=13;break}return e.next=7,this.loadTable(t,i["f"]);case 7:r=e.sent,this.pagedTable=r.records,this.pagedTable.forEach((function(e){0===e.salary&&(e.salary="面议")})),this.manager=!1,e.next=19;break;case 13:return e.next=15,this.loadTable(t,i["h"]);case 15:a=e.sent,this.pagedTable=a.records,this.pagedTable.forEach((function(e){0===e.salary&&(e.salary="面议")})),this.manager=!0;case 19:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},watch:{pagedTable:function(e){this.ids=e.map((function(e){return e.recruitId}))}}},f=m,p=r("2877"),h=Object(p["a"])(f,a,n,!1,null,null,null);t["default"]=h.exports}}]);