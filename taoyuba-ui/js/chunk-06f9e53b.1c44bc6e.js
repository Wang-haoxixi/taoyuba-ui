(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06f9e53b"],{"0f9b":function(t,e,s){"use strict";s.d(e,"c",function(){return i}),s.d(e,"d",function(){return r}),s.d(e,"a",function(){return l}),s.d(e,"b",function(){return o}),s.d(e,"e",function(){return c});var a=s("b5c6"),n="/tybhrms/tybtrain";function i(t){return Object(a["a"])({url:"".concat(n,"/page"),method:"get",params:t})}function r(t){return Object(a["a"])({url:"".concat(n,"/save"),method:"post",data:t})}function l(t){return Object(a["a"])({url:"".concat(n,"/del/").concat(t),method:"post"})}function o(t){return Object(a["a"])({url:"".concat(n,"/").concat(t),method:"get"})}function c(t){return Object(a["a"])({url:"".concat(n,"/update"),method:"post",data:t})}},"187e":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"training_detail"},[s("basic-container",[s("div",{staticStyle:{display:"flex"}},[s("h1",{staticStyle:{flex:"1"}},[t._v(t._s(t.$route.query.edit?"编辑":"新增")+"培训开班信息")]),s("el-button",{staticStyle:{width:"60px",height:"35px"},attrs:{size:"mini"},on:{click:function(e){return t.$router.push("/article_spa/class_list")}}},[t._v("返回")])],1),s("el-form",{ref:"form",attrs:{model:t.trainClass,"label-width":"150px",rules:t.rules}},[s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"开班名称:",prop:"title"}},[s("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:t.trainClass.title,callback:function(e){t.$set(t.trainClass,"title",e)},expression:"trainClass.title"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"培训时间:",prop:"classTime"}},[s("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"-","start-placeholder":"开班日期","end-placeholder":"结束日期",size:"mini"},model:{value:t.classTime,callback:function(e){t.classTime=e},expression:"classTime"}})],1)],1)],1),s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"报名时间:",prop:"applyTime"}},[s("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:t.applyTime,callback:function(e){t.applyTime=e},expression:"applyTime"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"开班地点:",prop:"address"}},[s("el-input",{attrs:{placeholder:"",size:"mini"},model:{value:t.trainClass.address,callback:function(e){t.$set(t.trainClass,"address",e)},expression:"trainClass.address"}})],1)],1)],1),s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"人数:",prop:"persons"}},[s("el-input",{attrs:{placeholder:"",type:"number",size:"mini"},model:{value:t.trainClass.persons,callback:function(e){t.$set(t.trainClass,"persons",e)},expression:"trainClass.persons"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"培训天数:",prop:"trainDays"}},[s("el-input",{attrs:{placeholder:"",type:"number",size:"mini"},model:{value:t.trainClass.trainDays,callback:function(e){t.$set(t.trainClass,"trainDays",e)},expression:"trainClass.trainDays"}})],1)],1)],1),s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"注意事项:",prop:"note"}},[s("el-input",{attrs:{placeholder:"",type:"textarea"},model:{value:t.trainClass.note,callback:function(e){t.$set(t.trainClass,"note",e)},expression:"trainClass.note"}})],1)],1)],1),s("el-row",[s("el-col",{attrs:{span:24}},[s("el-form-item",{attrs:{label:"内容:",prop:"content"}},[s("iep-froala-editor",{model:{value:t.trainClass.content,callback:function(e){t.$set(t.trainClass,"content",e)},expression:"trainClass.content"}})],1)],1)],1)],1),s("page-header",{staticStyle:{"margin-top":"50px"},attrs:{title:"课程项目"}}),t._l(t.trainClass.tybTrainLessonList,function(e,a){return s("div",{key:a},[s("el-form",{attrs:{"label-width":"150px",size:"small"}},[s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"课程标题：",prop:"title"}},[s("el-input",{model:{value:e.title,callback:function(s){t.$set(e,"title",s)},expression:"item.title"}})],1)],1),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"课程时间：",prop:"lessonTime"}},[s("el-date-picker",{attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00"],size:"mini"},model:{value:e.lessonTime,callback:function(s){t.$set(e,"lessonTime",s)},expression:"item.lessonTime"}})],1)],1)],1),s("el-row",[s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"课程内容：",prop:"content"}},[s("el-input",{attrs:{type:"textarea"},model:{value:e.content,callback:function(s){t.$set(e,"content",s)},expression:"item.content"}})],1)],1),s("el-col",{staticStyle:{"text-align":"center"},attrs:{span:4}},[s("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(e){return t.remove(a)}}},[t._v("删除")])],1)],1)],1)],1)}),s("div",{staticStyle:{"text-align":"center"}},[s("iep-button",{staticStyle:{width:"86%","margin-top":"5px","margin-bottom":"8px"},attrs:{icon:"el-icon-plus",plain:""},on:{click:t.newMember}},[t._v("新增")])],1),s("div",{staticStyle:{"margin-left":"150px"}},[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.save}},[t._v("提交")])],1)],2)],1)},n=[],i=(s("6b54"),s("ac6a"),s("0f9b")),r={data:function(){return{show:!1,trainClass:{title:"",openTime:"",finishTime:"",applyStartTime:"",applyEndTime:"",address:"",persons:"",trainDays:"",content:"",note:"",tybTrainLessonList:[],listOfIds:[]},rules:{title:[{required:!0,message:"请输入开班名称",trigger:"blur"}]},applyTime:[],classTime:[],dels:[]}},methods:{save:function(){var t=this;this.$refs["form"].validate(function(e){if(t.applyTime.length>0&&(t.trainClass.applyStartTime=t.applyTime[0],t.trainClass.applyEndTime=t.applyTime[1]),t.classTime.length>0&&(t.trainClass.openTime=t.classTime[0],t.trainClass.finishTime=t.classTime[1]),t.trainClass.tybTrainLessonList.length>0&&t.trainClass.tybTrainLessonList.forEach(function(t){t.lessonStart=t.lessonTime[0],t.lessonEnd=t.lessonTime[1]}),t.dels.length>0&&(t.trainClass.listOfIds=t.dels),t.trainClass.tybTrainLessonList.forEach(function(t){"string"===typeof t.lid?t.flag="ad":t.flag="up"}),!e)return!1;t.trainClass.applyEndTime<t.trainClass.openTime?0===+t.$route.query.add?Object(i["d"])(t.trainClass).then(function(){t.$message.success("提交成功！"),t.$router.push("/article_spa/class_list")}).catch(function(e){t.$message.error(e.msg)}):t.$route.query.edit&&Object(i["e"])(t.trainClass).then(function(){t.$message.success("修改成功！"),t.$router.push("/article_spa/class_list")}).catch(function(e){t.$message.error(e.msg)}):t.$message.error("报名结束时间必须小于培训开班时间！")})},getData:function(){var t=this;Object(i["b"])(this.$route.query.edit).then(function(e){if(t.trainClass=e.data.data,t.applyTime.push(t.trainClass.applyStartTime),t.applyTime.push(t.trainClass.applyEndTime),t.classTime.push(t.trainClass.openTime),t.classTime.push(t.trainClass.finishTime),t.trainClass.tybTrainLessonList){var s=0;t.trainClass.tybTrainLessonList.forEach(function(e){t.$set(e,"lessonTime",[]),e.lessonTime.push(e.lessonStart),e.lessonTime.push(e.lessonEnd),t.$set(e,"lid",s++)})}})},newMember:function(){this.trainClass.tybTrainLessonList||this.$set(this.trainClass,"tybTrainLessonList",[]);var t=this.trainClass.tybTrainLessonList.length;this.trainClass.tybTrainLessonList.push({lid:t?(parseInt(this.trainClass.tybTrainLessonList[t-1].lid)+1).toString():"0"})},remove:function(t){var e=this;if(this.trainClass.tybTrainLessonList){var s=0;this.trainClass.tybTrainLessonList.forEach(function(t){e.$set(t,"lid",s++)})}this.$confirm("此操作将永久删除该课程, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){if(e.trainClass.tybTrainLessonList.length>1){var s=e.trainClass.tybTrainLessonList.filter(function(e){return e.lid!=t});e.dels.push(e.trainClass.tybTrainLessonList[t].id),e.trainClass.tybTrainLessonList=s}else if(1===e.trainClass.tybTrainLessonList.length){var a=e.trainClass.tybTrainLessonList.filter(function(t){return 2==t.lid});e.dels.push(e.trainClass.tybTrainLessonList[t].id),e.trainClass.tybTrainLessonList=a}e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}},computed:{},created:function(){this.$route.query.edit&&this.getData()}},l=r,o=(s("3be4"),s("2877")),c=Object(o["a"])(l,a,n,!1,null,null,null);e["default"]=c.exports},"3be4":function(t,e,s){"use strict";s("6b67")},"6b67":function(t,e,s){}}]);