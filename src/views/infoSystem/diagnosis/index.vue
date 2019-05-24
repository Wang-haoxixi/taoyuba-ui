<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"
      />
      <!-- 按钮组 -->
      <gov-layout-button-group>
        <gov-button type="primary" permission="diagnostics_diagnosis_save" @click="handleCreate" text="新增诊断"/>
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <layout-body>
      <avue-crud
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="mainTableData"
        :option="diagnosisTableProps"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button
              type="text"
              @click="handleResult(scope.row)"
              text="查看诊断结果"
              permission="diagnostics_diagnosis_start"
              />
            <gov-button
              type="text"
              @click="handleUpdate(scope.row)"
              permission="diagnostics_diagnosis_update"
              text="编辑"
              >
            </gov-button>
            <gov-button
              type="text"
              @click="handleDelete(scope.row)"
              permission="diagnostics_diagnosis_delete"
              text="删除"
              >
            </gov-button>
            <!-- <el-switch
              class="ml10"
              :value="scope.row.createCondition"
              active-value="1"
              inactive-value="2"
              v-if="permissions['diagnostics_diagnosis_create']"
              @change="handleOpenOrClose(scope.row.id,scope.row.createCondition)">
            </el-switch> -->
          </div>
        </template>
      </avue-crud>
    </layout-body>
    <!-- 主弹窗 -->
    <main-dialog
      @submit="diagnosisSubmit"
      :status="dialogStatus"
      ref="formDialog"/>
    <!-- 查看诊断结果 -->
    <diagnosis-result-dialog
      :options="options"
      @submit="diagnosisSubmit"
      :status="dialogStatus"
      ref="formResultDialog"/>
  </gov-layout-main>
</template>
<script>
import mainDialog from './mainDialog'
import diagnosisResultDialog from './diagnosisResultDialog'
import { diagnosisDataProps, diagnosisTableProps } from './const/diagnosis'
import {
  diagnosisTableList,
  createDiagnosis,
  deleteDiagnosis,
  updateDiagnosis,
  updateDiagnosisCreateCondition,
} from '@/api/infoSystem/diagnosis'
import mixin from '@/mixins/mixin'
import { mapGetters } from 'vuex'


export default {
  mixins: [mixin],
  components: {
    mainDialog,
    diagnosisResultDialog,
  },
  data () {
    return {
      diagnosisTableProps,
      ...diagnosisDataProps,
      mainTableData: [],
    }
  },
  computed: {
    // 搜索表单参数
    searchOption () {
      return [
        { label: '诊断主题', prop: 'diagnosticTheme', type: 'input' },
      ]
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
  },
  methods: {
    // 列表
    getList () {
      this.tableLoading = true
      let result = Object.assign({}, this.listQuery)
      diagnosisTableList(result).then(({data}) => {
        this.mainTableData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    // 列表编辑
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$nextTick(()=>{
        this.$refs['formDialog'].open(row)
      })
    },
    // 列表新增
    handleCreate () {
      this.dialogStatus = 'create'
      this.$nextTick(()=>{
        this.$refs['formDialog'].open({})
      })
    },
    // 创建查询条件打开或者关闭
    handleOpenOrClose (id, createCondition) {
      updateDiagnosisCreateCondition({
        id: id,
        createCondition: createCondition == '1' ? '2' : '1',
      }).then(()=>{
        this.$message.success('改变成功')
        this.getList()
      }).catch((err)=>{
        console.log(err)
      })
    },
    // 审查结果
    handleResult (row) {
      this.dialogStatus = 'detail'
      this.$nextTick(()=>{
        this.$refs['formResultDialog'].open(row.id,row.diagnosticTheme)
      })
    },
    // 列表单条删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteDiagnosis({id: [row.id]}).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },

    //保存
    diagnosisSubmit (formData) {
      this.$refs['formDialog'].btnLoading = true
      if (this.dialogStatus === 'create') {
        createDiagnosis(formData).then(()=>{
          this.$message.success('新增成功')
          this.$refs['formDialog'].btnLoading = false
          this.$refs['formDialog'].close()
          this.getList()
        }).catch(()=>{
          this.$refs['formDialog'].btnLoading = false
        })
      } else{
        updateDiagnosis(formData).then(()=>{
          this.$message.success('编辑成功')
          this.$refs['formDialog'].btnLoading = false
          this.$refs['formDialog'].close()
          this.getList()
        }).catch(()=>{
          this.$refs['formDialog'].btnLoading = false
        })
      }
    },
  },
}
</script>
<style scoped>
.ml10{
  margin-left: 10px
}
</style>
