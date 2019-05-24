<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    :title="dialog.detail.title"
    :isBtnGroup="status !== dialog.detail.status"
    width="80%">
    数量：{{total}}
    <gov-layout-button-group>
      <gov-button type="primary" permission="diagnostics_diagnosis_export" @click="handleExport">导出诊断</gov-button>
    </gov-layout-button-group>
    <!-- <avue-crud ref="table" :data="tableData" :option="diagnosisResultTableOption">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <gov-button @click="handleDetail(scope.row)" type="text">查看详情</gov-button>
        </div>
      </template>
    </avue-crud> -->
    <govTableTree
      @handleDetail="handleDetail"
      :tableData="tableData"
      :id="form.id"
      >
    </govTableTree>
    <!-- 详情 -->
    <diagnosis-result-detail-dialog ref="diagnosisResultDetailDialog" :status="dialogStatus" @submit="infoFormSubmit"></diagnosis-result-detail-dialog>
    <!-- 导出 -->
     <gov-dialog-export
       :params="{diagnosticsId:id}"
       :url="exportData.url"
       :data="exportData.data"
       :listQuery="exportData.listQuery"
       title="诊断结果"
       ref="exportDialog"/>
  </gov-dialog>
</template>

<script>
import { diagnosisResultTableOption } from './const/diagnosis'
import mixin from '@/mixins/mixin'
import diagnosisResultDetailDialog from './diagnosisResultDetailDialog'
import govTableTree from './govTableTree/mainResult.vue'
import { getDiagnostics } from '@/api/infoSystem/diagnosis'
import { exportFields } from '../systemRegister/const/fields'

import { getDept } from '@/util/dic'
export default {
  name: 'diagnosisDialog',
  mixins: [mixin],
  components: {
    diagnosisResultDetailDialog,
    govTableTree,
  },
  data () {
    return {
      total: 0,
      dialog: {
        detail: {
          title: '诊断结果',
          status: 'detail',
        },
      },
      exportData: {
        url: '/survey/dnasystemdiagnostics/downloadData',
        listQuery: {
          fields: [],
        },
        data: exportFields,
      },
      id: null,
      form: {},
      tableData: [],
      diagnosticTheme: null,
      dialogStatus: 'detail',
    }
  },
  computed: {
    diagnosisResultTableOption () {
      return diagnosisResultTableOption
    },
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    status: {
      type: String,
      default: 'detail',
    },
  },

  methods: {
    open (id,diagnosticTheme) {
      this.diagnosticTheme = diagnosticTheme
      this.id = id
      this.$nextTick(()=>{
        this.$refs['dialog'].open()
        this.$nextTick(()=>{
          this.$refs['diagnosisForm'] ? this.$refs['diagnosisForm'].clearValidate() : ''
        })
      })
      if (this.status !== 'create') {
        getDiagnostics({ id: id, limit: 9999 }).then(({data})=>{
          let newTableData = []
          let transData = data.data || []
          let deptList = getDept()
          for(let key in transData){
            let deptId = null
            for(let item of deptList){
              if(item.value == key){
                deptId = item.label
              }
            }
            if(transData[key].length>1){
              newTableData.push({
                deptId: deptId + "(" + transData[key].length+")",
                sysDsgt: transData[key][0].sysDsgt+'、'+ transData[key][1].sysDsgt + ' ...',
                children: transData[key],
              })
            }else{

              console.log('tarna',transData,key,deptId)
              transData[key][0].deptId = deptId + "(1)"

              newTableData.push(transData[key][0])
            }
          }
          this.tableData = newTableData
          this.total = newTableData.length
          if(this.total){
            this.$message.success(data.msg)
          }else{
            this.$message.warning(data.msg)
          }
        })
      }
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 审查详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$nextTick(()=>{
        this.$refs['diagnosisResultDetailDialog'].open({...row})
      })
    },

    // 提交
    infoFormSubmit (formData) {
      console.log("formData",formData)
    },
    //导出
    handleExport () {
      this.$refs.exportDialog.open()
    },
    //关闭弹窗
    handleClosedDialog () {
      this.form = {}
      this.form.id = ''
      this.tableData = []
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['diagnosisForm'].resetForm() : ''
      })
    },
  },
}

</script>
<style lang="scss">
.form-btn-group-container {
  margin: 10px 0;
}
</style>
