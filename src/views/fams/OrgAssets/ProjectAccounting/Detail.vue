<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="form.name" :back-option="backOption">
      </page-header>
      <el-card class="box-card" :body-style="{ display: 'flex' }">
        <div class="left-wrapper">
          <span>项目实施</span>
          <div class="content">￥{{form.projectImplementation}}</div>
        </div>
        <div class="info">
          <div class="info-item">
            <label>创建人：</label>
            <div class="content">{{form.founder}}</div>
          </div>
          <div class="info-item">
            <label>项目编号：</label>
            <div class="content">{{form.number}}</div>
          </div>
          <div class="info-item">
            <label>项目经理：</label>
            <div class="content">{{form.projectManager}}</div>
          </div>
          <div class="info-item">
            <label>市场经理：</label>
            <div class="content">{{form.marketingNumber}}</div>
          </div>
          <div class="info-item">
            <label>立项时间：</label>
            <div class="content">{{form.projectTime}}</div>
          </div>
          <div class="info-item">
            <label>完结时间：</label>
            <div class="content">{{form.endTime}}</div>
          </div>
        </div>
      </el-card>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-if="activeTab ==='Accounting'" v-slot:Accounting>
          <accounting v-loading="activeTab !=='Accounting'"></accounting>
        </template>
        <template v-if="activeTab ==='Budget'" v-slot:Budget>
          <budget v-loading="activeTab !=='Budget'"></budget>
        </template>
        <template v-if="activeTab ==='Cost'" v-slot:Cost>
          <cost v-loading="activeTab !=='Cost'"></cost>
        </template>
        <template v-if="activeTab ==='Payback'" v-slot:Payback>
          <payback v-loading="activeTab !=='Payback'"></payback>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import { dictsMap } from './options'
import Accounting from './Accounting/'
import Budget from './Budget/'
import Cost from './Cost/'
import Payback from './Payback/'
export default {
  components: { Accounting, Budget, Cost, Payback },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      dictsMap,
      //form: initForm(),
      form: {projectImplementation:'585.00',name:'项目名称',number:'101222',projectManager:'xxx',marketingNumber:'xxx',projectTime:'2019-04-01',endTime:'2019-06-30'},
      tabList: [{
        label: '项目核算表',
        value: 'Accounting',
      }, {
        label: '项目预算表',
        value: 'Budget',
      }, {
        label: '项目费用表',
        value: 'Cost',
      }, {
        label: '项目回款表',
        value: 'Payback',
      }],
      activeTab: 'Accounting',
    }
  },
  computed: {
  },
  created () {
  },
}
</script>
<style lang="scss" scoped>
  .left-wrapper {
    flex: 1;
    text-align: center;
    > span{
      width:100%;
      font-size:15px;
      height:40px;
      line-height:40px;
      display: block;
      margin-top: 20px;
    }
    .content{
      font-size: 16px;
      font-weight: bold;
    }
  }
  .info {
    flex: 5;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .info-item {
      & > label {
        width: 120px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }
      .content {
        margin-left: 120px;
        line-height: 40px;
        position: relative;
        font-size: 14px;
      }
    }
  }
</style>
