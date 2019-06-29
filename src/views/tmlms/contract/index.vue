<template>
  <component @onAdd="handleAdd" @onDetail="handleDetail" @onEdit="handleEdit" @onGoBack="handleGoBack" @onPdf="handleToCopy"  :record="record" :type="type" :is="currentComponet"></component>
</template>
<script>
import List from './Page/List'
import Detail from './Page/Detail'
import ContractPrint from './Page/ContractPrint.vue'
import ContractPrintCopy  from './Page/ContractPrintCopy.vue'
                  
export default {
  name: 'TableListWrapper',
  components: { List, Detail, ContractPrint,ContractPrintCopy },
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
    handleToCopy (id) {                                                           
        this.record = id
        this.type = ''
        this.currentComponet = 'ContractPrintCopy'
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