(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ca14eb0"],{"1fd1":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"menus"},[a("a-menu",{attrs:{mode:"inline"},on:{click:t.handleClick}},t._l(t.data,function(e,n){return a("a-menu-item",{key:n},[a("router-link",{attrs:{to:e.path}},[t._v(t._s(e.levelName))])],1)}),1)],1)},r=[],i={data:function(){return{data:[{levelName:"联盟介绍",materialCount:"11",path:"introduction"},{levelName:"联盟大事记",materialCount:"11",path:"memorabilia"},{levelName:"联盟发展历程",materialCount:"11",path:"development"},{levelName:"联盟文化",materialCount:"11",path:"culture"},{levelName:"联盟相册",materialCount:"11",path:"album"},{levelName:"评价管理",materialCount:"11",path:"evaluation"}]}},methods:{handleClick:function(t){this.$emit("change_page",t.key)},titleClick:function(){}}},c=i,l=(a("4225"),a("0c7c")),u=Object(l["a"])(c,n,r,!1,null,"3dee125e",null);e["default"]=u.exports},4225:function(t,e,a){"use strict";var n=a("f581"),r=a.n(n);r.a},"87f2":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"breadcrumb-wrapper"},[a("el-breadcrumb",{staticClass:"breadcrumb-item",attrs:{"separator-class":"el-icon-arrow-right"}},t._l(t.routerMatch,function(e){return a("el-breadcrumb-item",{key:e.path,attrs:{to:{path:e.path}}},[t._v(t._s(e.name))])}),1)],1),a("div",{staticClass:"allianceDetails"},[a("menus"),a("router-view")],1)])},r=[],i=a("1fd1"),c={components:{Menus:i["default"]},data:function(){return{routerMatch:this.$route.matched}},beforeRouteUpdate:function(t,e,a){this.routerMatch=t.matched,a()},created:function(){this.$notify({title:"注意",message:"此页面正在开发中，当前数据仅供参考。",offset:60})}},l=c,u=(a("a4c6"),a("0c7c")),o=Object(u["a"])(l,n,r,!1,null,"b14d67e8",null);e["default"]=o.exports},a4c6:function(t,e,a){"use strict";var n=a("d20c"),r=a.n(n);r.a},d20c:function(t,e,a){},f581:function(t,e,a){}}]);