<template>
  <iep-dialog :dialog-show="dialogShow" title="关联纪要" width="60%" @close="close">
    <iep-table 
      :isLoadTable="isLoadTable" 
      :pagination="pagination" 
      :columnsMap="columnsMap" 
      :pagedTable="pagedTable" 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      is-mutiple-selection 
      @selection-change="selectionChange"
      :dictsMap="dictsMap">
    </iep-table>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import { getTableData } from '@/api/mlms/material/summary'
import { relationSummarys } from '@/api/gpms/material'

export default {
  mixins: [mixins],
  props: {
    projectId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      columnsMap,
      dictsMap,
      dialogShow: false,
      selectList: [],
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, getTableData)
    },
    open () {
      this.dialogShow = true
      this.loadPage()
    },
    close () {
      this.dialogShow = false
    },
    submitForm () {
      console.log('multipleSelection: ', this.multipleSelection)
      let obj = {
        materialChartIdList: this.selectList.map(m => m.id),
        materialType: 1,
        projectId: this.projectId,
      }
      relationSummarys(obj).then(({data}) => {
        console.log('data: ', data)
      })
    },
    selectionChange (val) {
      this.selectList = val.map(m => {return { id: m.id, materialName: m.title }})
    },
  },
}
</script>
