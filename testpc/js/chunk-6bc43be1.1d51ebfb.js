(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bc43be1"],{"16e3":function(e,t,r){"use strict";r.d(t,"d",function(){return s}),r.d(t,"b",function(){return u}),r.d(t,"c",function(){return i}),r.d(t,"a",function(){return o}),r.d(t,"e",function(){return l});var n=r("b5c6"),a="/tybship/tybshipinsures";function s(e){return Object(n["a"])({url:"".concat(a,"/page"),method:"get",params:e})}function u(e){return Object(n["a"])({url:"".concat(a,"/del/").concat(e),method:"post"})}function i(e){return Object(n["a"])({url:"".concat(a,"/").concat(e),method:"get"})}function o(e){return Object(n["a"])({url:"".concat(a,"/save"),method:"post",data:e})}function l(e){return Object(n["a"])({url:"".concat(a,"/update"),method:"post",data:e})}},da64:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"contract-box"},[r("basic-container",[r("h1",[e._v(e._s(e.$route.query.edit?"编辑":"新增")+"渔船保单信息")]),r("el-form",{ref:"form",attrs:{model:e.tybShipInsure,"label-width":"150px",rules:e.rules}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"type",label:"保单类型:"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.tybShipInsure.type,callback:function(t){e.$set(e.tybShipInsure,"type",t)},expression:"tybShipInsure.type"}},e._l(e.typeList,function(e){return r("el-option",{key:e.value,attrs:{prop:"type",label:e.label,value:e.value}})}),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"amount",label:"保额:"}},[r("el-input",{model:{value:e.tybShipInsure.amount,callback:function(t){e.$set(e.tybShipInsure,"amount",t)},expression:"tybShipInsure.amount"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"premium",label:"保费:"}},[r("el-input",{model:{value:e.tybShipInsure.premium,callback:function(t){e.$set(e.tybShipInsure,"premium",t)},expression:"tybShipInsure.premium"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"insureDate",label:"投保日期:"}},[r("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.tybShipInsure.insureDate,callback:function(t){e.$set(e.tybShipInsure,"insureDate",t)},expression:"tybShipInsure.insureDate"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"insureStartDate",label:"保险起期:"}},[r("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.tybShipInsure.insureStartDate,callback:function(t){e.$set(e.tybShipInsure,"insureStartDate",t)},expression:"tybShipInsure.insureStartDate"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{prop:"insureEndDate",label:"保险止期:"}},[r("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.tybShipInsure.insureEndDate,callback:function(t){e.$set(e.tybShipInsure,"insureEndDate",t)},expression:"tybShipInsure.insureEndDate"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[2===e.tybShipInsure.type?r("el-form-item",{attrs:{prop:"persons",label:"承保人数:"}},[r("el-input",{model:{value:e.tybShipInsure.persons,callback:function(t){e.$set(e.tybShipInsure,"persons",t)},expression:"tybShipInsure.persons"}})],1):e._e()],1)],1)],1),r("div",{staticStyle:{"text-align":"center"}},[r("el-button",{on:{click:e.save}},[e._v("提交")]),r("el-button",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)],1)],1)},a=[],s=(r("96cf"),r("3b8d")),u=r("16e3"),i={data:function(){return{tybShipInsure:{id:"",shipName:"",type:1,amount:"",premium:"",insureDate:"",insureStartDate:"",insureEndDate:"",persons:""},rules:{type:[{required:!0,message:"请输入保单类型",trigger:"blur"}],amount:[{required:!0,message:"请输入保单保额",trigger:"blur"}],premium:[{required:!0,message:"请输入保单保费",trigger:"blur"}],insureDate:[{required:!0,message:"请输入投保日期",trigger:"blur"}],insureStartDate:[{required:!0,message:"请输入保险起期",trigger:"blur"}],insureEndDate:[{required:!0,message:"请输入保险止期",trigger:"blur"}]},manager:!1,typeList:[{label:"渔船险",value:1},{label:"雇主责任险",value:2}]}},methods:{save:function(){var e=this;this.$refs["form"].validate(function(t){if(!t)return!1;e.$route.query.edit?(e.tybShipInsure.id=e.insureId,Object(u["e"])(e.tybShipInsure).then(function(t){0===t.data.code&&(e.$message({message:"编辑成功",type:"success"}),e.$router.go(-1))}).catch(function(t){e.$message.error(t.message)})):(e.tybShipInsure.shipName=e.$route.query.add,Object(u["a"])(e.tybShipInsure).then(function(t){0===t.data.code&&(e.$message({message:"保存成功",type:"success"}),e.$router.go(-1))}).catch(function(t){e.$message.error(t.message)}))})}},computed:{insureId:function(){return this.$route.query.edit}},created:function(){function e(){return t.apply(this,arguments)}function t(){return t=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["c"])(this.insureId).then(function(e){0===e.data.code&&e.data.data&&(t.tybShipInsure=e.data.data)});case 2:case"end":return e.stop()}},e,this)})),t.apply(this,arguments)}"number"!==typeof this.insureId||isNaN(this.insureId)||e.call(this)},watch:{"tybShipInsure.type":function(e){1===e&&(this.tybShipInsure.persons=0)}}},o=i,l=r("0c7c"),c=Object(l["a"])(o,n,a,!1,null,null,null);t["default"]=c.exports}}]);