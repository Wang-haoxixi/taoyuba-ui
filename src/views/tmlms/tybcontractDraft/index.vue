<template>
  <component @on-add="handleAdd" @onDetail="handleDetail" @onRenew="handleRenew" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :type="type" :is="currentComponet" @on-record="handleRecord" @on-remove="handleRmove"></component>
</template>
<script>
import List from './Page/List'
import Detail from '../contract/Page/dartNewDetail'
import ContractPrint from '../contract/Page/ContractPrint.vue'
import Record from '../contract/Page/record'
import Remove from '../contract/Page/remove'

export default {
  name: 'TableListWrapper',
  components: { List, Detail, ContractPrint, Record, Remove },
  data () {
    return {
      currentComponet: 'List',
      record: '',
      type: '',
    }
  },
  methods: {
    handleAdd () {
      this.record = null
      this.type = 'add'
      this.currentComponet = 'Detail'
    },
    handleEdit (id) {
      this.record = id
      this.type = 'edit'
      this.currentComponet = 'Detail'
    },
    handleDetail (id) {
      this.record = id
      this.type = 'view'
      this.currentComponet = 'Detail'
    },
    handleGoBack () {
      this.record = ''
      this.type = ''
      this.currentComponet = 'List'
      console.log('handleGoBack')
    },
    handleRecord (id) {
      this.record = id
      this.type = 'rec'
      this.currentComponet = 'Record'
    },
    handleRmove (id) {
      this.record = id
      this.type = 'rem'
      this.currentComponet = 'Remove'
    },
    handleRenew (id) {
      this.record = id
      this.type = 'renew',
      this.currentComponet = 'Detail'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
}
</script>