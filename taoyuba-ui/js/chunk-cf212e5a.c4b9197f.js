(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cf212e5a"],{"0299":function(e,t,r){},"1deb":function(e,t,r){},"343b":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-table",{attrs:{data:e.form.materialRelations,border:""}},[r("el-table-column",{attrs:{label:"标题"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(t.row.name))])]}}])}),r("el-table-column",{attrs:{label:"类别"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("iep-dict-detail",{attrs:{value:e.row.materialType,"dict-name":"mlms_material_type"}})]}}])})],1)},n=[],s={name:"IepCpmsMaterial",props:{form:{type:Object,required:!0}}},i=s,o=r("2877"),l=Object(o["a"])(i,a,n,!1,null,null,null);t["default"]=l.exports},"3ae1":function(e,t,r){"use strict";r.d(t,"e",(function(){return n})),r.d(t,"c",(function(){return s})),r.d(t,"d",(function(){return i})),r.d(t,"f",(function(){return o})),r.d(t,"b",(function(){return l})),r.d(t,"a",(function(){return c}));var a=r("b5c6"),n="/cpms/product";function s(e){return Object(a["a"])({url:"".concat(n,"/page"),method:"get",params:e})}function i(e){return Object(a["a"])({url:"".concat(n,"/create"),method:"post",data:e})}function o(e){return Object(a["a"])({url:"".concat(n,"/update"),method:"post",data:e})}function l(e){return Object(a["a"])({url:"".concat(n,"/").concat(e),method:"get"})}function c(e){return Object(a["a"])({url:"".concat(n,"/delete/").concat(e),method:"post"})}},"502e":function(e,t,r){"use strict";r("8e6e"),r("ac6a"),r("456d");var a=r("ade3"),n=(r("96cf"),r("1da1")),s=r("51f4");function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l={delete:"删除",shelf:"上架",submit:"提交",cancel:"撤销"};t["a"]={data:function(){return{pagedTable:[],multipleSelection:[],isLoadTable:!0,pagination:this._pageOption(),pageOption:this._pageOption(),searchForm:{}}},methods:{_pageOption:function(){return Object(s["a"])()},searchPage:function(e){this.pageOption=this._pageOption(),this.searchForm=e,this.loadPage(e)},loadTable:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var a,n,s,i,l,c,u,d,m,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=f.length>2&&void 0!==f[2]?f[2]:function(e){return e},this.isLoadTable=!0,e.next=4,r(o(o({},this.pageOption),t));case 4:return n=e.sent,s=n.data,i=s.data,l=i.records,c=i.size,u=i.total,d=i.current,m=u/c+1===d,m&&0!==u?this.searchPage({current:d-1,size:c,total:u}):this.pagination={current:d,size:c,total:u},this.pagedTable=l.map(a),this.isLoadTable=!1,e.abrupt("return",s.data);case 12:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pageOption.size=e,this.loadPage()},handleCurrentChange:function(e){this.pageOption.current=e,this.loadPage()},_handleGlobalDeleteById:function(e,t){this._handleGlobalById(e,t,"delete")},_handleGlobalDeleteAll:function(e){this._handleGlobalAll(e,"delete")},_handleGlobalById:function(e,t){var r=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"delete",n=l[a];this.$confirm("此操作将".concat(n,"该数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t(e).then((function(e){e.data.data?r.$message({type:"success",message:"".concat(n,"成功!")}):r.$message({type:"info",message:"".concat(n,"失败，").concat(e.data.msg)}),r.loadPage()}))}))},_handleGlobalAll:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,a,s,i=this,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=o.length>1&&void 0!==o[1]?o[1]:"delete",a=this.multipleSelection,s=l[r],void 0!==a&&0!==a.length){e.next=6;break}return this.$message("请先选择需要".concat(s,"的选项")),e.abrupt("return");case 6:this.$confirm("此操作将".concat(s,"这些数据, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t(a);case 2:r=e.sent,n=r.data,n.data?(i.$message({type:"success",message:"".concat(s,"成功!")}),i.pageOption=i._pageOption()):i.$message({type:"info",message:"".concat(s,"失败，").concat(n.msg)}),i.loadPage();case 6:case"end":return e.stop()}}),e)}))));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),_handleComfirm:function(e,t,r,a,s){var i=this;this.$confirm(a||"是否".concat(r),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function a(){var n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t(e);case 2:n=a.sent,o=n.data,o.data?i.$message({type:"success",message:s||"".concat(r,"成功!")}):i.$message({type:"info",message:"".concat(o.msg)}),i.loadPage();case 6:case"end":return a.stop()}}),a)})))).catch((function(e){i.$message({type:"info",message:"".concat(e,", 已取消").concat(r)})}))},mixinsCellPointerStyle:function(e){var t=e.column;return"index"!==t.type&&"selection"!==t.type&&"操作"!==t.label&&"cursor:pointer"}}}},5304:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-table",{attrs:{data:e.form.versions,border:""}},[r("el-table-column",{attrs:{label:"版本号"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(t.row.versionNumber))])]}}])}),r("el-table-column",{attrs:{label:"上线日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",[e._v(e._s(e._f("parseTime")(t.row.onlineTime,"{y}-{m}-{d}")))])]}}])}),r("el-table-column",{attrs:{label:"更新说明"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.updateContent)+"\n      ")]}}])})],1)],1)},n=[],s={props:{form:{type:Object,required:!0}}},i=s,o=r("2877"),l=Object(o["a"])(i,a,n,!1,null,null,null);t["default"]=l.exports},"6f89":function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"c",(function(){return o})),r.d(t,"b",(function(){return l}));r("8e6e"),r("ac6a"),r("456d");var a=r("ade3");function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i=function(){return{id:"",imageUrl:"",number:"",name:"",website:"",onlineTime:"",tagKeywords:[],tapeLibrary:"",valuation:0,instructions:"",synopsis:"",description:"",versions:[],moduleRelations:[],materialRelations:[],userRelationCharges:[],userRelationDemands:[],userRelationTechnologys:[],userRelationProducts:[],userRelationTeams:[]}},o=function(e){var t=s({},e);return t.userCharges=e.userRelationCharges.map((function(e){return e.id})),t.userDemands=e.userRelationDemands.map((function(e){return e.id})),t.userTechnologys=e.userRelationTechnologys.map((function(e){return e.id})),t.userProducts=e.userRelationProducts.map((function(e){return e.id})),t.userTeams=e.userRelationTeams.map((function(e){return e.id})),t.modules=e.moduleRelations.map((function(e){return e.id})),t.materials=e.materialRelations.map((function(e){return e.id})),delete t.userRelationCharges,delete t.userRelationDemands,delete t.userRelationTechnologys,delete t.userRelationProducts,delete t.userRelationTeams,delete t.moduleRelations,delete t.materialRelations,t},l={imageUrl:[{required:!0,message:"请上传图片",trigger:"blur"}],number:[{required:!0,message:"请填写产品编号",trigger:"blur"}],name:[{required:!0,message:"请填写产品名称",trigger:"blur"}],website:[{required:!0,message:"请填写产品网址",trigger:"blur"}],onlineTime:[{required:!0,message:"请填写上线时间",trigger:"blur"}],tapeLibrary:[{required:!0,message:"请选择是否带库",trigger:"blur"}],tagKeywords:[{type:"array",min:3,message:"标签至少 3 个",trigger:"change"},{type:"array",required:!0,message:"请填写标签",trigger:"change"}],valuation:[{required:!0,message:"请填写产品估值",trigger:"blur"}],instructions:[{required:!0,message:"请填写估值说明",trigger:"blur"}],synopsis:[{required:!0,message:"请填写产品简介",trigger:"blur"}],description:[{required:!0,message:"请填写产品介绍",trigger:"blur"}],userRelationCharges:[{required:!0,type:"array",message:"请填写负责人",trigger:"blur"}]}},"7cd3":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("basic-container",[r("iep-page-header",{attrs:{"is-advance":"",backOption:e.backOption}},[r("template",{slot:"custom"},[r("el-row",[r("el-col",{staticClass:"img",attrs:{span:4}},[r("iep-img",{attrs:{src:e.form.imageUrl,alt:""}})],1),r("el-col",{staticClass:"title",attrs:{span:14}},[r("div",[r("div",{staticClass:"tags"},[r("span",{staticClass:"weight"},[e._v(e._s(e.form.name))]),r("span",{staticClass:"time"},[e._v("上线时间："+e._s(e._f("parseTime")(e.form.onlineTime,"{y}-{m}-{d}")))])]),r("div",{staticClass:"tags"},[r("iep-tag-detail",{attrs:{value:e.form.tagKeywords}})],1)])])],1)],1)],2),r("iep-tab-scroll",{attrs:{"tab-list":e.tabList,height:270}},[r("div",e._l(e.tabList,(function(t){return r("div",{key:t.value,staticClass:"base",attrs:{id:t.value}},[r("div",{staticClass:"title"},[e._v(e._s(t.label))]),r("div",{staticClass:"context"},[r(t.value,{tag:"component",attrs:{form:e.form}})],1)])})),0)])],1)],1)},n=[],s=r("502e"),i=r("b503"),o=r("b2c7"),l=r("5304"),c=r("fbea"),u=r("343b"),d=r("6f89"),m=r("3ae1"),f={name:"detail",components:{BaseInfo:i["default"],TeamInfo:o["default"],Versions:l["default"],Modules:c["default"],Materials:u["default"]},mixins:[s["a"]],props:["record"],data:function(){return{backOption:{isBack:!0,backPath:null,backFunction:this.handleGoBack},form:Object(d["a"])(),tabList:[{label:"基本信息",value:"BaseInfo"},{label:"团队信息",value:"TeamInfo"},{label:"全新版本",value:"Versions"},{label:"包含模块",value:"Modules"},{label:"相关材料",value:"Materials"}]}},computed:{id:function(){return this.$route.params.id||this.record.id}},created:function(){var e=this;Object(m["b"])(this.id).then((function(t){var r=t.data;e.form=e.$mergeByFirst(Object(d["a"])(),r.data)}))},methods:{handleGoBack:function(){this.$emit("onGoBack")}}},p=f,b=(r("edde"),r("2877")),g=Object(b["a"])(p,a,n,!1,null,"03b2c503",null);t["default"]=g.exports},a570:function(e,t,r){"use strict";r("1deb")},b2c7:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{attrs:{size:"small","label-width":"100px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"负责人："}},[r("iep-contact-multiple-user",{attrs:{disabled:""},model:{value:e.form.userRelationCharges,callback:function(t){e.$set(e.form,"userRelationCharges",t)},expression:"form.userRelationCharges"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"需求方："}},[r("iep-contact-multiple-user",{attrs:{disabled:""},model:{value:e.form.userRelationDemands,callback:function(t){e.$set(e.form,"userRelationDemands",t)},expression:"form.userRelationDemands"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"技术经理："}},[r("iep-contact-multiple-user",{attrs:{disabled:""},model:{value:e.form.userRelationTechnologys,callback:function(t){e.$set(e.form,"userRelationTechnologys",t)},expression:"form.userRelationTechnologys"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"产品经理："}},[r("iep-contact-multiple-user",{attrs:{disabled:""},model:{value:e.form.userRelationProducts,callback:function(t){e.$set(e.form,"userRelationProducts",t)},expression:"form.userRelationProducts"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"团队成员："}},[r("iep-contact-multiple-user",{attrs:{disabled:""},model:{value:e.form.userRelationTeams,callback:function(t){e.$set(e.form,"userRelationTeams",t)},expression:"form.userRelationTeams"}})],1)],1)],1)],1)},n=[],s={props:{form:{type:Object,required:!0}}},i=s,o=r("2877"),l=Object(o["a"])(i,a,n,!1,null,null,null);t["default"]=l.exports},b503:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{attrs:{size:"small","label-width":"100px"}},[r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"产品编号："}},[r("div",[e._v(e._s(e.form.number))])])],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"产品官网："}},[r("iep-div-detail",{attrs:{value:e.form.website}})],1)],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"是否带库："}},[r("div",[e._v("否")])])],1),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"产品估值："}},[r("div",[e._v(e._s(e.form.valuation)+"元")])])],1)],1),r("el-row",[r("el-col",[r("el-form-item",{attrs:{label:"估值说明："}},[r("div",[e._v(e._s(e.form.instructions))])])],1)],1),r("el-row",[r("el-col",[r("el-form-item",{attrs:{label:"产品介绍："}},[r("div",[e._v(e._s(e.form.description))])])],1)],1)],1)},n=[],s={props:{form:{type:Object,required:!0}},data:function(){return{}}},i=s,o=r("2877"),l=Object(o["a"])(i,a,n,!1,null,null,null);t["default"]=l.exports},edde:function(e,t,r){"use strict";r("0299")},fbea:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.form.moduleRelations.length?e._l(e.form.moduleRelations,(function(t){return r("div",{key:t.id,staticClass:"module"},[r("div",{staticClass:"img"},[r("iep-img",{attrs:{src:t.imageUrl,alt:""}})],1),r("div",{staticClass:"module-title iep-ellipsis"},[e._v(e._s(t.name))])])})):r("iep-no-data",{attrs:{message:"暂无关联模块"}})],2)},n=[],s={props:{form:{type:Object,required:!0}}},i=s,o=(r("a570"),r("2877")),l=Object(o["a"])(i,a,n,!1,null,"e5e042ce",null);t["default"]=l.exports}}]);