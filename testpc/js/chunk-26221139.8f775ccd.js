(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26221139"],{"2af3":function(t,a,n){"use strict";n.r(a);var i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("div",{staticClass:"article-details"},[n("div",{staticClass:"title"},[t._v(t._s(t.data.trainingTheme))]),n("div",{staticClass:"inform"},[n("div",{staticClass:"info"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:t.data.creatorImage,alt:t.data.creatorName}})]),n("span",[t._v(t._s(t.data.creatorName))]),n("span",{staticClass:"time"},[t._v(t._s(t.data.createTime))]),n("span",[n("i",{staticClass:"iconfont icon-yanjing"}),t._v(t._s(t.data.views))]),n("span",[n("i",{staticClass:"iconfont icon-download1"}),t._v(t._s(t.downloads))])]),n("div",{staticClass:"btn-con"},t._l(t.itemList,function(a){return n("div",{key:a.id,staticClass:"btn"},[n("i",{staticClass:"iconfont",class:a.icon}),t._v(t._s(a.operate))])}),0)]),n("div",{staticClass:"detail"},[n("span",{staticClass:"sub-title"},[t._v(t._s(t.data.trainingBrief))]),n("div",{staticClass:"detail-con"},[n("span",[t._v("培训老师："+t._s(t.data.trainerName))]),n("span",[t._v("培训时间："+t._s(t.data.startTime))]),n("span",[t._v("培训方式："+t._s(t.data.method))]),n("span",[t._v("培训主题："+t._s(t.data.trainingTheme))]),n("span",[t._v("培训地点："+t._s(t.data.place))])]),n("div",{staticClass:"classTag"},t._l(t.data.trainingTags,function(a,i){return n("el-tag",{key:i,attrs:{type:"white"}},[t._v(t._s(a))])}),1)])])])},e=[],c={props:{data:{type:Object,default:function(){}}},data:function(){return{downloads:"88",itemList:[{icon:"icon-shoucang",operate:"收藏"},{icon:"icon-youxiangshixin",operate:"分享"},{icon:"icon-zhuyi",operate:"纠错"}],subTitle:"培训信息"}}},s=c,r=(n("b65d"),n("0c7c")),o=Object(r["a"])(s,i,e,!1,null,"04592625",null);a["default"]=o.exports},3209:function(t,a,n){},5393:function(t,a,n){},"9dec":function(t,a,n){},"9e42":function(t,a,n){"use strict";var i=n("5393"),e=n.n(i);e.a},b65d:function(t,a,n){"use strict";var i=n("3209"),e=n.n(i);e.a},c057:function(t,a,n){"use strict";n.r(a);var i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("div",{staticClass:"material-detail"},[n("div",{staticClass:"library"},[n("train-details",{attrs:{data:t.detailData}}),n("el-row",{staticClass:"down-load"},[t._v("\n        相关附件：\n        "),t._l(t.attachFileList,function(a,i){return n("div",{key:i,staticClass:"file"},[n("div",{on:{click:function(n){return t.downLoad(a)}}},[n("i",{staticClass:"icon-fujian"}),t._v(t._s(a.name)),n("span",{staticClass:"tip"},[t._v("（消耗5国脉贝下载）")])])])})],2),n("IepAppRewardCard"),n("IepAppEvaluationReview")],1),n("div",{staticClass:"piece"},[n("IepAppTabCard",{attrs:{title:t.labelTitle}},[n("IepAppLabelCard",{attrs:{dataList:t.labelList}})],1),n("IepAppTabCard",{attrs:{title:t.listTitle1}},[n("div",{staticClass:"recommended-list"},t._l(t.recommendedList,function(a,i){return n("div",{key:i,staticClass:"piece"},[n("div",{staticClass:"img-con"},[n("img",{staticClass:"img",attrs:{src:a.themePictures}})]),n("div",{staticClass:"box"},[n("div",{staticClass:"piece-title"},[n("span",{staticClass:"sub-title"},[t._v(t._s(a.trainingTheme))])]),n("span",{staticClass:"see"},[n("i",{staticClass:"iconfont icon-yanjing"}),t._v(t._s(a.views))])])])}),0)])],1)])])},e=[],c=n("2af3"),s=n("e387"),r=n("c610"),o={components:{TrainDetails:c["default"]},data:function(){return{detailData:{},labelTitle:"推荐主题",listTitle1:"培训预告",labelList:[],recommendedList:[],routerMatch:this.$route.matched,attachFileList:[{name:"内网2.0改造项目"}]}},beforeRouteUpdate:function(t,a,n){this.routerMatch=t.matched,n()},methods:{getTrainingDetail:function(t){var a=this;Object(r["h"])(t).then(function(t){var n=t.data;a.detailData=n.data})},getRectagsList:function(){var t=this;Object(s["a"])().then(function(a){var n=a.data;t.labelList=n.data})},getNoticeList:function(){var t=this;Object(r["c"])().then(function(a){var n=a.data;t.recommendedList=n.data})}},created:function(){var t=this.$route.params;this.getTrainingDetail(t.id),this.getRectagsList(),this.getNoticeList()}},u=o,d=(n("ddbc"),n("9e42"),n("0c7c")),l=Object(d["a"])(u,i,e,!1,null,"f7e394a8",null);a["default"]=l.exports},c610:function(t,a,n){"use strict";n.d(a,"e",function(){return c}),n.d(a,"b",function(){return s}),n.d(a,"c",function(){return r}),n.d(a,"d",function(){return o}),n.d(a,"k",function(){return u}),n.d(a,"h",function(){return d}),n.d(a,"i",function(){return l}),n.d(a,"g",function(){return f}),n.d(a,"f",function(){return m}),n.d(a,"a",function(){return p}),n.d(a,"l",function(){return v}),n.d(a,"j",function(){return h});var i=n("b5c6"),e="/hrms/channel_recruit",c=function(t){return Object(i["a"])({url:"".concat(e,"/list"),method:"get",params:t})},s=function(t){return Object(i["a"])({url:"".concat(e,"/training_newest"),method:"get",params:t})},r=function(t){return Object(i["a"])({url:"".concat(e,"/training_notice"),method:"get",params:t})},o=function(t){return Object(i["a"])({url:"".concat(e,"/training_past"),method:"get",params:t})},u=function(t){return Object(i["a"])({url:"".concat(e,"/training_page"),method:"get",params:t})},d=function(t){return Object(i["a"])({url:"".concat(e,"/training/").concat(t),method:"get"})},l=function(t){return Object(i["a"])({url:"".concat(e,"/hr_detail/page"),method:"get",params:t})},f=function(){return Object(i["a"])({url:"".concat(e,"/count"),method:"get"})},m=function(){return Object(i["a"])({url:"".concat(e,"/birthday"),method:"get"})},p=function(){return Object(i["a"])({url:"".concat(e,"/training_hottest"),method:"get"})},v=function(){return Object(i["a"])({url:"".concat(e,"/training_teacher"),method:"get"})},h=function(t){return Object(i["a"])({url:"".concat(e,"/recruit_list/").concat(t),method:"get"})}},ddbc:function(t,a,n){"use strict";var i=n("9dec"),e=n.n(i);e.a},e387:function(t,a,n){"use strict";n.d(a,"b",function(){return c}),n.d(a,"a",function(){return s});var i=n("b5c6"),e="/tms/channel_tag",c=function(t){return Object(i["a"])({url:"".concat(e,"/list"),method:"get",params:t})},s=function(t){return Object(i["a"])({url:"".concat(e,"/rectags"),method:"get",params:t})}}}]);