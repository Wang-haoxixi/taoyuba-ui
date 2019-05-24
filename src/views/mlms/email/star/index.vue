<template>
  <basic-container>
    <div v-show="pageState == 'list'">
      <page-header title="星标邮件" class="title"></page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='alltabTemplate'" v-slot:alltabTemplate>
          <web-tab-tpl @materialDetail="materialDetail"></web-tab-tpl>
        </template>
        <template v-if="tabName ==='InstrTabTemplate'" v-slot:InstrTabTemplate>
          <web-tab-tpl type="1" @materialDetail="materialDetail"></web-tab-tpl>
        </template>
        <template v-if="tabName ==='shareTabTemplate'" v-slot:shareTabTemplate>
          <web-tab-tpl type="2" @materialDetail="materialDetail"></web-tab-tpl>
        </template>
        <template v-if="tabName ==='wrongTabTemplate'" v-slot:wrongTabTemplate>
          <web-tab-tpl type="3" @materialDetail="materialDetail"></web-tab-tpl>
        </template>
      </iep-tabs>
    </div>
    <summary-detail ref="summary" v-if="pageState == 'summary'" @backPage="backPage" :detailState=true></summary-detail>
    <material-detail ref="material" v-if="pageState == 'material'" @backPage="backPage" :detailState=true></material-detail>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import WebTabTpl from './tab'
import SummaryDetail from '@/views/mlms/material/summary/detail'
import MaterialDetail from '@/views/mlms/material/datum/material/detail'

export default {
  name: 'inbox',
  mixins: [mixins],
  components: { WebTabTpl, SummaryDetail, MaterialDetail },
  data () {
    return {
      tabName: 'alltabTemplate',
      tabList: [
        {
          label: '全部',
          value: 'alltabTemplate',
        }, {
          label: '批示',
          value: 'InstrTabTemplate',
        }, {
          label: '分享',
          value: 'shareTabTemplate',
        }, {
          label: '纠错',
          value: 'wrongTabTemplate',
        },
      ],
      pageState: 'list',
    }
  },
  methods: {
    backPage () {
      this.pageState = 'list'
    },
    materialDetail (row, type) {
      let typeList = {
        summary: { name: '纪要', ref: 'summary' },
        material: { name: '材料', ref: 'material' },
      }
      this.pageState = typeList[type].ref
      this.$nextTick(() => {
        console.log('row: ', row)
        this.$refs[typeList[type].ref].open(row.relatiionId)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.datum {
  padding: 20px;
  background-color: #fff;
}
</style>
