# 开发规范 

### 组件命名规范
1. 单文件组件文件 
正例：
```
components/
|- myComponent.vue
```
反例：
```
components/
|- mycomponent.vue
```
2. 基础组件名
正例：
```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```
反例：
```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```
3. 紧密耦合的组件名
正例：
```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```
反例：
```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```
4. 组件名中的单词顺序
正例：
```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```
反例：
```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```
7. 模板中的组件名大小写
正例：
```
<my-component/>
```
反例：
```
<myComponent/>
```
8. 完整单词的组件名
正例：
```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```
反例：
```
components/
|- SdSettings.vue
|- UProfOpts.vue
```
9. 多个特性的元素
多个特性的元素超过3个需分成多行。
正例：
```
<my-component
 foo="a"
 bar="b"
 baz="c"
 fo="d"
/>
```
反例：
```
<my-component foo="a" bar="b" baz="c" fo="d"/>
```
10. 模板中简单的表达式
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。
正例：
```
<!-- 在模板中 -->
{{ normalizedFullName }}
// 复杂表达式已经移入一个计算属性
computed: {
 normalizedFullName: function () {
 return this.fullName.split(' ').map(function (word) {
 return word[0].toUpperCase() + word.slice(1)
 }).join(' ')
 }
}
```
反例：
```
{{
 fullName.split(' ').map(function (word) {
 return word[0].toUpperCase() + word.slice(1)
 }).join(' ')
}}
```
11. 指令缩写
都用指令缩写 (用 : 表示 v-bind: 和用 @ 表示 v-on:)
12. 单文件组件的顶级元素的顺序
正例：
```
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```
13. 基本命名  
    如： 新增接口名：createXXX  
    如： 编辑接口名：updateXXX  
    如： 删除接口名：deleteXXX  
    如： 获取信息接口名：getXXX  

#### 命名可遵循以下规则：
  1. 有意义的 : 不过于具体，也不过于抽象 
  2. 简短 : 2 到 3 个单词  
  3. 具有可读性 : 以便于沟通交流
  4. 公共组件命名以公司名称简拼为命名空间
  
### 结构化规范
```
├─api·······························接口
│ ├─admin
│ │ └─user.js
│ └─element
├─directive·························自定义事件
├─components························组件
│  ├─govLayout
│  │  ├─govLayoutBody···············列表布局
│  │  ├─govLayoutForm···············表单布局
│  │  ├─govLayoutButtonGroup········按钮组布局
│  │  ├─govLayoutDialog·············弹窗布局
│  │  ├─govLayoutMain···············主布局
│  │  └─govLayoutHeader·············搜索布局
│  ├─govButtonGroup·················不用
│  │  ├─govButtonAdd················新增按钮
│  │  ├─govButtonExport·············导入按钮
│  │  ├─govButtonSearch·············搜索按钮
│  │  ├─govButtonReset··············重置按钮
│  │  ├─govButtonImport·············导出按钮
│  │  └─govButtonDeleteQuery········批量删除按钮
│  ├─govSearchBar···················搜索框
│  ├─govDialogImport················导出
│  ├─govDialogExport················导出
│  ├─govNoData······················无数据显示
│  ├─govButton······················通用按钮
│  ├─govDialog························弹窗
│  └─govPagination····················分页
├─config····························常量
│ └─global··························常用常理
├─const·····························data参数 
│ ├─login
│ │ └─index.js
│ └─mainIndex
├─filters···························公共过滤
├─font······························字体
├─mixins····························公共mixin文件
│  ├─theme··························主题
│  ├─menu···························菜单
│  └─mixin··························公共mixin
├─route·····························路由
├─store·····························vuex
├─style·····························样式文件
├─util······························工具类
│  ├─auth···························用户认证
│  ├─date···························时间差计算
│  ├─dic····························字典操作
│  ├─setData························avue数据操作
│  ├─store··························storage操作
│  ├─util···························基础工具类
│  └─validate·······················表单验证规则
├─view······························页面
│ ├─admin
│ │  └─user
│ │    ├─const······················放置data数据（如果data数据过长）
│ │    │ └─index.js
│ │    ├─js·························放置只与user相关的js
│ │    │ └─index.js
│ │    ├─component··················放置页面的部分
│ │    │ └─pieChart.vue
│ │    ├─index.vue
│ │    └─userDialog.vue·············弹窗单独成一个页面
│ └─element
├─page······························公共页面

```
### 注释规范
1. 单行注释
```
 普通方法一般使用单行注释 // 来说明该方法主要作用
```
2. 多行注释
```
公用组件：数据表格
  /**
  - 组件名称
  - @desc 组件描述
  - @param {Object} [title]    - 参数说明
  - @param {String} [columns] - 参数说明
  - @example 调用示例
  -  <hb-table :title="title" :columns="columns" :tableData="tableData"></hb-table>
      */
      
```
3. 以下情况，务必添加注释
```
1. 公共组件使用说明
2. 各组件中重要函数或者类说明
3. 复杂的业务逻辑处理说明
4. 特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
5. 注释块必须以/**（至少两个星号）开头**/；
6. 单行注释使用//；
```
### 编码规范
1. 使用ES6风格编码源码  
    定义变量使用let ,定义常量使用const  
    使用export ，import 模块化  
2. 组件 props 原子化  
    提供默认值  
    使用 type 属性校验类型  
    使用 props 之前先检查该 prop 是否存在  
3. 调试信息console.log() debugger 使用完及时删除

### 提供组件 API 文档
使用 Vue.js 组件的过程中会创建 Vue 组件实例，这个实例是通过自定义属性配置的。为了便于其他开发者使用该组件，对于这些自定义属性即组件API应该在 [README.md](../README.md) 文件中进行说明。