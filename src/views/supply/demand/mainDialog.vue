<template>
  <div class="main-form">
    <gov-dialog
      ref="dialog"
      width="80%"
      :title="status[state]"
      @closed="handleClosed"
      @handleSubmit="handleSubmit"
      :is-btn-group="state!='detail'">
      <gov-layout-form>
        <template v-if="state==='detail'">
          <div class="detail-wrapper">
            <gov-detail-form v-model="demFormData" :option="demDetailFormData"></gov-detail-form>
          </div>
        </template>
        <template v-else>
          <avue-form ref="form" v-model="demFormData" :option="formOption">
          </avue-form>
          <div class="form-block">
            <div class="form-block-label">材料</div>
            <div class="form-block-input">
              <el-button type="primary" @click="matHandleCreate">添加</el-button>
            </div>
          </div>
        </template>
        <div class="form-block">
          <avue-crud
            :data="tableData"
            :option="matTableOption"
            :page="matPage"
            @size-change="(pageSize)=>{matPage.pageSize=pageSize}"
            @current-change="materialCurrentChange">
            <template slot-scope="scope" slot="matMenu">
              <div class="table-btn-group">
                <gov-button type="text" @click="matHandleDetail(scope.row)" text="详情"></gov-button>
                <gov-button v-if="sup_demand_material_edit && state!=='detail'" type="text" @click="matHandleUpdate(scope.row)" text="编辑"></gov-button>
                <gov-button v-if="sup_demand_material_del && state!=='detail'" type="text" @click="matHandleDelete(scope.row)" text="删除"></gov-button>
              </div>
            </template>
          </avue-crud>
        </div>
      </gov-layout-form>
    </gov-dialog>
    <mat-dialog ref="matDialog" :state="matState" @getMatData="getMatData" :dept-list="deptList" :material-list="materialList"></mat-dialog>
  </div>

</template>

<script>
import { mainFormOption, matTableOption } from './const/index'
import matDialog from './matDialog'
import { putFormData, postFormData, deleteMaterialData } from '@/api/supply/demand'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      materialList: [],
      matTableData: [],
      tableData: [],
      matFormData: {},
      demFormData: {...this.formData},
      matState: 'create',
      status: {update: '编辑', create: '新增', detail: '详情'},
      rules: {
        deptId: [{ required: true, message: '请选择需求部门', trigger: 'change' }],
        matName: [{ required: true, message: '请选择事项', trigger: 'blur' }],
        matCode: [{ required: true, message: '请填写事项编码', trigger: 'blur' }],
        matType: [{ required: true, message: '请选择事项类别', trigger: 'blur' }],
        anlAvgVol: [{ required: true, message: '请填写年平均办理量', trigger: 'blur' }],
        applyReason: [{ required: true, message: '请填写申请理由', trigger: 'blur' }],
      },
      sup_demand_material_edit: false,
      sup_demand_material_del: false,
    }
  },
  components: { matDialog },
  computed: {
    matTableOption () {
      return matTableOption
    },
    formOption () {
      return mainFormOption
    },
    matPage () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: this.matTableData.length,
      }
    },
    demDetailFormData () {
      return {option: [{column: this.formOption.column}]}
    },
    ...mapGetters(['permissions']),
  },
  props: {
    deptList: {
      type: Array,
      default: () =>{},
    },
    state: {
      type: String,
      default: 'create',
    },
  },
  created (){
    this.sup_demand_material_edit = this.permissions['sup_demand_material_edit']
    this.sup_demand_material_del = this.permissions['sup_demand_material_del']

  },
  methods: {
    open (data) {
      this.$refs['dialog'].open()
      this.demFormData = data
      this.matPage.currentPage = 1
      this.matPage.pageSize = 10
      this.matTableData = data.materials ? data.materials : []
      this.$nextTick(() => {
        if (this.state !== 'detail') {
          this.$refs.form.clearValidate()
        }
        this.tableData = this.getTableData(this.matTableData)
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      if (this.state != 'detail') {
        this.$refs.form.clearValidate()
        this.$refs.form.resetForm()
      }
      this.matTableData = []
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        if (this.matTableData.length === 0) {
          this.$message.error('请至少填写一条材料！')
          return
        }
        // 遍历数据将 itemVOs 转化
        for (let item of this.matTableData) {
          if (!item.items) {
            item.items = item.itemVOs
          }
          delete item.modifiedTime
          delete item.createTime
          for (let t of item.items) {
            delete t.modifiedTime
            delete t.createTime
          }
        }
        delete this.demFormData.modifiedTime
        delete this.demFormData.createTime
        this.demFormData.materials = this.matTableData
        let submitList = {create: postFormData, update: putFormData}
        submitList[this.state](this.demFormData).then(() => {
          this.$emit('successSubmit')
          this.close()
          this.$message.success('保存成功！')
        })
      })
    },
    // 接收申请数据的数据
    getMatData (data, state) {
      if (state === 'create') {
        // 新增 -- 直接讲接收到的数据push进去
        this.matTableData.push(data)
      } else if (state === 'update') {
        // 更新 -- 讲接收到的数据根本原先的位置替换
        this.$set(this.matTableData, (this.matPage.currentPage-1)*10+data.$index, data)
      }
      this.$nextTick(() => {
        this.tableData = this.getTableData(this.matTableData)
      })
    },
    // 新增
    matHandleCreate () {
      this.matState = 'create'
      this.$refs['matDialog'].open({})
    },
    // 详情
    matHandleDetail (row) {
      this.matState = 'detail'
      this.matFormData = {...row}
      this.$refs['matDialog'].open(this.matFormData)
    },
    // 修改
    matHandleUpdate (row) {
      this.matState = 'update'
      this.matFormData = {...row}
      this.$refs['matDialog'].open(this.matFormData)
    },
    // 删除
    matHandleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        this.$delete(this.matTableData, (this.matPage.currentPage-1)*10+row.$index)
        this.tableData = this.getTableData(this.matTableData)
        if (row.id) {
          deleteMaterialData(row.id).then(()=>{})
        }
      }).catch(() => {})
    },
    getTableData (data) {
      var list = []
      let fn = (() => {
        let min = (this.matPage.currentPage-1)*this.matPage.pageSize
        let max = this.matPage.currentPage*this.matPage.pageSize
        list = data.slice(min, max)
      })
      fn()
      if (list.length == 0 && this.matPage.currentPage > 1) {
        --this.matPage.currentPage
        fn()
      }
      return list
    },
    materialCurrentChange (data) {
      this.matPage.currentPage = data
      this.tableData = this.getTableData(this.matTableData)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-block {
  display: flex;
  line-height: 40px;
  margin-bottom: 20px;
  .form-block-label {
    width: 150px;
    text-align: right;
    padding: 0 12px 0 0;
  }
  .form-block-input {
    flex: 1;
  }
}
</style>
