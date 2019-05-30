<template>
  <component @onAdd="handleAdd" @onDetail="handleDetail" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :type="type" :is="currentComponet"></component>
</template>
<script>
import List from './Page/List'
import Detail from '../contract/Page/Detail'
import ContractPrint from '../contract/Page/ContractPrint.vue'

export default {
  name: 'TableListWrapper',
  components: { List, Detail, ContractPrint },
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