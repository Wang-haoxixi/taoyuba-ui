(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bab9948"],{"03ea":function(t,e,a){},"266e":function(t,e,a){"use strict";a.d(e,"g",(function(){return o})),a.d(e,"d",(function(){return r})),a.d(e,"e",(function(){return i})),a.d(e,"h",(function(){return s})),a.d(e,"a",(function(){return l})),a.d(e,"n",(function(){return u})),a.d(e,"f",(function(){return d})),a.d(e,"m",(function(){return f})),a.d(e,"b",(function(){return p})),a.d(e,"j",(function(){return m})),a.d(e,"c",(function(){return h})),a.d(e,"i",(function(){return g})),a.d(e,"l",(function(){return b})),a.d(e,"k",(function(){return v})),a.d(e,"o",(function(){return y})),a.d(e,"p",(function(){return j}));var n=a("b5c6"),c="/tmlms/tybcontract";function o(t){return Object(n["a"])({url:"".concat(c,"/page"),method:"get",params:t})}function r(t){return Object(n["a"])({url:"".concat(c,"/del/").concat(t),method:"post"})}function i(t){return Object(n["a"])({url:"".concat(c,"/shipcrew/").concat(t),method:"get"})}function s(t){return Object(n["a"])({url:"/admin/dict/type/".concat(t),method:"get"})}function l(t){return Object(n["a"])({url:"".concat(c,"/save"),method:"post",data:t})}function u(t){return Object(n["a"])({url:"".concat(c,"/update"),method:"post",data:t})}function d(t){return Object(n["a"])({url:"".concat(c,"/").concat(t),method:"get"})}function f(t){return Object(n["a"])({url:"".concat(c,"/review"),method:"post",params:t})}function p(t){return Object(n["a"])({url:"".concat(c,"/cancel"),method:"post",data:t})}function m(t){return Object(n["a"])({url:"".concat(c,"/checkIdcard"),method:"get",params:{employeeIdcard:t}})}function h(t){return Object(n["a"])({url:"".concat(c,"/complant"),method:"post",params:t})}function g(t){return Object(n["a"])({url:"".concat(c,"/villagePage"),method:"get",params:t})}function b(t){return Object(n["a"])({url:"".concat(c,"/refuse"),method:"post",params:{contractId:t}})}function v(t,e){return Object(n["a"])({url:"".concat(c,"/recall"),method:"post",params:{contractId:t,status:e}})}function y(t,e){return Object(n["a"])({url:"".concat(c,"/updateImage"),method:"post",params:{contractId:t,contractImage:e}})}function j(t,e){return Object(n["a"])({url:"".concat(c,"/createImages"),method:"post",params:{contractId:t,addPhoto:e}})}},"31ff":function(t,e,a){},"63c5":function(t,e,a){"use strict";a("31ff")},7216:function(t,e,a){},"94d4":function(t,e,a){"use strict";a("03ea")},b9d0:function(t,e,a){"use strict";a("7216")},e1ca:function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"c",(function(){return r})),a.d(e,"b",(function(){return i}));var n=a("b5c6"),c="/tmlms/tybcontractcancel";function o(t){return Object(n["a"])({url:"".concat(c,"/save"),method:"post",data:t})}function r(t){return Object(n["a"])({url:"".concat(c,"/newpage"),method:"get",params:t})}function i(t){return Object(n["a"])({url:"".concat(c,"/review"),method:"post",params:{cancelId:t}})}},ffc3:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-box"},[a("basic-container",[a("page-header",{attrs:{title:"解除列表"}}),a("operation-container",[a("template",{slot:"left"},[t.contractList.length<1?a("iep-button",{attrs:{type:"primary",icon:"el-icon-plus",plain:""},on:{click:t.handleAdd}},[t._v("申请解除")]):t._e()],1),a("template",{slot:"right"},[a("iep-button",{attrs:{plain:""},on:{click:t.back}},[t._v("返回")])],1)],2),a("avue-tree-table",{staticStyle:{"margin-top":"20px"},attrs:{option:t.options}},[a("el-table-column",{attrs:{label:"图片证据上传"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"auto",height:"auto","max-width":"100%","max-height":"100%"},attrs:{src:t.row.image}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return["待通过"===e.row.status&&"解除合同"===e.row.type&&e.row.receiverId===t.recName?a("el-button",{attrs:{type:"text",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.agree(e.row.contractId,e.row.id)}}},[t._v("同意解除合同")]):t._e()]}}])})],1),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next, total",total:t.total,"page-size":t.params.size},on:{"current-change":t.currentChange}})],1),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,"before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[a("span",{staticStyle:{color:"red"}},[t._v("*")]),t._v("解除原因：")]),a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}}),a("span",[t._v("图片证明：")]),a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccess,headers:t.headers,accept:"image/*"}},[t.form.image?a("img",{staticClass:"avatar",attrs:{src:t.form.image}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancel}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"提示",visible:t.complainDialog,"before-close":t.complainClose},on:{"update:visible":function(e){t.complainDialog=e}}},[a("span",[a("span",{staticStyle:{color:"red"}},[t._v("*")]),t._v("投诉原因：")]),a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}}),a("span",[t._v("图片证明：")]),a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/file/upload/avatar","show-file-list":!1,"on-success":t.handleAvatarSuccess,headers:t.headers,accept:"image/*"}},[t.form.image?a("img",{staticClass:"avatar",attrs:{src:t.form.image}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.complainCancel}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.complainSave}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"提示",visible:t.canDialog,width:"30%","before-close":t.canClose},on:{"update:visible":function(e){t.canDialog=e}}},[a("span",[t._v("是否同意解除合同")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.agreeRelieve}},[t._v("同 意")]),a("el-button",{attrs:{type:"primary"},on:{click:t.cancelRelieve}},[t._v("拒 绝")])],1)])],1)],1)},c=[],o=(a("ac6a"),a("96cf"),a("1da1")),r=a("266e"),i=a("e1ca"),s=a("7ded"),l=a("e17e"),u=a("4360"),d={name:"relieve",data:function(){return{contractList:[],params:{idcard:"",current:1,size:10},total:0,idCard:"",dialogVisible:!1,canDialog:!1,complainDialog:!1,form:{content:"",image:""},headers:{Authorization:"Bearer "+u["a"].getters.access_token},contId:"",contType:[{id:1,label:"解除合同"},{id:2,label:"投诉"}],contStatus:[{id:0,label:"待通过"},{id:1,label:"通过"},{id:2,label:"不通过"}],recName:"",cont:{content:"",image:""},contStat:"",i:"",cd:""}},created:function(){this.getContractList()},computed:{options:function(){return{expandAll:!1,columns:[{text:"合同号",value:"contractId"},{text:"发起人",value:"userId"},{text:"接受人",value:"receiverId"},{text:"解除原因",value:"content"},{text:"合同类型",value:"type"},{text:"合同状态",value:"status"}],data:this.contractList}}},methods:{getContractList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["c"])().then((function(t){return t.data.data.sysUser.realName}));case 2:this.recName=t.sent,this.params.contractId=this.$route.params.contractId,this.params.type=1,Object(i["c"])(this.params).then((function(t){var a=t.data;0===a.code&&(e.contractList=a.data.records,e.contractList.forEach((function(t){Object(l["d"])(t.userId).then((function(e){t.userId=e.data.data.realName})),Object(l["d"])(t.receiverId).then((function(e){t.receiverId=e.data.data.realName})),e.contStatus.forEach((function(e){t.status===e.id&&(t.status=e.label)})),e.contType.forEach((function(e){t.type===e.id&&(t.type=e.label)}))})),e.total=a.data.total)}),(function(t){e.$message.error(t.message)}));case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),back:function(){this.$router.push({path:"/tmlms_spa/contract_list"})},currentChange:function(t){this.params.current=t,this.getContractList()},handleClose:function(){this.dialogVisible=!1},handleAvatarSuccess:function(t){this.form.image=t.data.url},cancel:function(){this.dialogVisible=!1},canClose:function(){this.canDialog=!1},save:function(){var t=this;""!==this.form.content?(this.form.contractId=this.$route.params.contractId,this.form.type=1,Object(i["a"])(this.form).then((function(){t.$message.success("提交申请成功！"),t.getContractList(),t.dialogVisible=!1})).catch((function(){t.$message.error("提交申请失败！")}))):this.$message.error("解除理由必须填写！")},agree:function(t,e){this.canDialog=!0,this.cd=t,this.i=e},agreeRelieve:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(r["f"])(this.cd).then((function(t){return t.data.data.status}));case 2:this.contStat=t.sent,3===this.contStat?Object(r["b"])({contractId:this.cd}).then((function(){e.$message.success("解除成功！"),e.getContractList(),e.canDialog=!1})).catch((function(){e.$message.error("解除失败！"),e.getContractList(),e.canDialog=!1})):(this.$message.error("合同状态不正确，需要管理员审核！"),this.canDialog=!1);case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleAdd:function(){this.dialogVisible=!0},cancelRelieve:function(){var t=this;Object(r["l"])(this.cd).then((function(){t.$message.success("已拒绝对方解除申请"),t.getContractList(),t.canDialog=!1})).catch((function(){t.$message.error("拒绝失败！"),t.getContractList(),t.canDialog=!1}))},complain:function(){this.complainDialog=!0},complainClose:function(){this.complainDialog=!1},complainCancel:function(){this.complainDialog=!1},complainSave:function(){var t=this;""!==this.form.content?(this.form.contractId=this.$route.params.contractId,this.form.type=2,Object(i["a"])(this.form).then((function(){t.$message.success("提交投诉成功！"),t.getContractList(),t.complainDialog=!1})).catch((function(){t.$message.error("提交投诉失败！")}))):this.$message.error("投诉理由必须填写！")}}},f=d,p=(a("63c5"),a("b9d0"),a("94d4"),a("2877")),m=Object(p["a"])(f,n,c,!1,null,"8b3688ec",null);e["default"]=m.exports}}]);