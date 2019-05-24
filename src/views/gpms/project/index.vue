<template>
  <basic-container>
    <div v-if="pageState === 'list'">
      <page-header title="我的项目" :replaceText="replaceText" :data="[16]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Total'" v-slot:Total>
          <total ref="table" :isShow="addDialogShow" @toggle-show="dealForm"></total>
        </template>
        <template v-if="activeTab ==='Release'" v-slot:Release>
          <total ref="table" :isShow="addDialogShow" @toggle-show="dealForm" :tabType="'1'"></total>
        </template>
        <template v-if="activeTab === 'TakePartIn'" v-slot:TakePartIn>
          <total ref="table" :isShow="addDialogShow" @toggle-show="dealForm" :tabType="'2'"></total>
        </template>
      </iep-tabs>
    </div>
    <add-dialog v-else @close="closeForm" ref="form"></add-dialog>
  </basic-container>
</template>
<script>
import Total from './Total/'
import addDialog from './addDialog'
import { getDataDetail } from '@/api/gpms/index'

export default {
  components: { Total, addDialog },
  data () {
    return {
      replaceText: (data) => `[共${data[0]}条数据]`,
      addDialogShow: false,
      tabList: [{
        label: '全部',
        value: 'Total',
      }, {
        label: '我发布的',
        value: 'Release',
      }, {
        label: '我参与的',
        value: 'TakePartIn',
      }],
      activeTab: 'Total',
      pageState: 'list',
    }
  },
  methods: {
    dealForm (type, row) {
      if (row) {
        getDataDetail(row.id).then(({data}) => {
          this.pageState = 'form'
          this.$nextTick(() => {
            this.$refs['form'].open(type, data.data)
          })
        })
      } else {
        this.pageState = 'form'
        this.$nextTick(() => {
          this.$refs['form'].open(type, false)
        })
      }
    },
    closeForm () {
      this.pageState = 'list'
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
