<template>
  <div>
    <basic-container>
      <page-header title="我的今日内网使用动态"></page-header>
       <div class="dynamic-info">
        <span>我的动态频道用于记录用户在内网的所有行为轨迹，用于记录与分析用户行为，构建用户画像，为大数据、数据赋能提供基础</span>
        <span>我的动态频道回顾和追溯个人在内网中的行为记录，帮助大家记录和查询内网的工作内容，帮助大家养成良好的工作习惯，形成数据思维意思</span>
        <span class="red">我的动态模块还在开发中，敬请期待，本页面仅为样式效果演示</span>
      </div>
      <operation-container>
        <template slot="left">
          <iep-button plain>按日期查询</iep-button>
        </template>
        <template slot="right">
          <operation-search advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" is-mutiple-selection>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable:[
        {time:'2019-04-25 11:41:39',behavior:'查询内网材料库，进行关键字数据治理搜索，对材料上海徐汇区综合数据资料方案提交了纠错邮件'},
        {time:'2019-04-25 11:41:39',behavior:'查询内网材料库，进行关键字数据治理搜索，对材料上海徐汇区综合数据资料方案提交了纠错邮件'},
        {time:'2019-04-25 11:41:39',behavior:'查询内网材料库，进行关键字数据治理搜索，对材料上海徐汇区综合数据资料方案提交了纠错邮件'},
        {time:'2019-04-25 11:41:39',behavior:'查询内网材料库，进行关键字数据治理搜索，对材料上海徐汇区综合数据资料方案提交了纠错邮件'},
        {time:'2019-04-25 11:41:39',behavior:'查询内网材料库，进行关键字数据治理搜索，对材料上海徐汇区综合数据资料方案提交了纠错邮件'},
        {time:'2019-04-25 11:41:39',behavior:'查询内网材料库，进行关键字数据治理搜索，对材料上海徐汇区综合数据资料方案提交了纠错邮件'},     
      ],
    }
  },
}
</script>
<style scoped lang='scss'>
.dynamic-info{
  padding:15px;
  margin-bottom: 15px;
  border: 1px solid #ffdbc1;
  background-color: #fffbf6;
  span{
    display:block;
    line-height: 28px;
    color: #333;
  }
}
.red{
  color:#ba1b21!important;
}

</style>
