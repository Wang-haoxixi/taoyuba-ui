<template>
  <div>
    <gov-dialog
      ref="dialog"
      :title="status[state]"
      @closed="handleClosed"
      @handleSubmit="handleSubmit"
      :is-btn-group="state=='detail'?false:true">
      <gov-layout-form>
        <template v-if="state==='detail'">
          <div class="detail-wrapper">
            <gov-detail-form ref="form" v-model="matFormData" :option="matDeatilFormOption"></gov-detail-form>
          </div>
        </template>
        <template v-else>
          <avue-form ref="form" v-model="matFormData" :option="matFormOption"></avue-form>
          <div class="form-block" v-if="isChild">
            <div class="form-block-label">数据项</div>
            <div class="form-block-input">
              <el-button type="primary" @click="eleHandleCreate">添加</el-button>
            </div>
          </div>
        </template>
        <div class="form-block" v-if="isChild">
          <avue-crud
            :data="tableData"
            :option="eleTableOption"
            :page="matPage"
            @size-change="(pageSize)=>{matPage.pageSize=pageSize}"
            @current-change="itemCurrentChange">
            <template slot-scope="scope" slot="matMenu">
              <div class="table-btn-group">
                <gov-button type="text" @click="eleHandleDetail(scope.row)" text="详情"></gov-button>
                <gov-button v-if="state!=='detail'" type="text" @click="eleHandleUpdate(scope.row)" text="编辑"></gov-button>
                <gov-button v-if="state!=='detail'" type="text" @click="eleHandleDelete(scope.row)" text="删除"></gov-button>
              </div>
            </template>
          </avue-crud>
        </div>
      </gov-layout-form>
    </gov-dialog>
    <ele-dialog ref="eleDialog" :state="matState" @getEleData="getEleData" :dept-list="deptList" :material-list="materialList"></ele-dialog>
  </div>
</template>

<script>
import { matFormOption, matDeptFormOption , eleTableOption } from './const/index'
import eleDialog from './eleDialog'
import { deleteItemData } from '@/api/supply/demand'
export default {
  data () {
    return {
      matState: 'create',
      matFormData: {},
      eleFormData: {},
      status: {update: '编辑', create: '新增', detail: '详情'},
      itemList: [],
      eleTableData: [],
      tableData: [],
    }
  },
  components: { eleDialog },
  computed: {
    eleTableOption () {
      return eleTableOption
    },
    matFormOption () {
      if (this.isChild) {
        return matFormOption
      } else {
        return matDeptFormOption
      }
    },
    matDeatilFormOption () {
      return {option: [{
        column: this.matFormOption.column,
      }]}
    },
    matPage () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: this.eleTableData.length,
      }
    },
    isChild () {
      let state = this.matFormData.materialType == 1 ? true : false
      return state
    },
  },
  props: {
    materialList: {
      type: Array,
      default: () => {},
    },
    deptList: {
      type: Array,
      default: () => {},
    },
    state: {
      type: String,
      default: 'create',
    },
  },
  methods: {
    open (data) {
      this.$refs['dialog'].open()
      this.matFormData = data
      this.matPage.currentPage = 1
      this.matPage.pageSize = 10
      this.eleTableData = data.itemVOs ? data.itemVOs : []
      this.tableData = this.getTableData(this.eleTableData)
      this.isChild = true
    },
    close () {
      this.$refs['dialog'].close()
      this.handleClosed()
    },
    handleClosed () {
      if (this.state != 'detail') {
        this.$refs.form.clearValidate()
        this.$refs.form.resetForm()
      }
    },
    // 提交事件
    handleSubmit () {
      // 首先判断材料类型是否是表格类型，若类型为表格，填写信息项，若类型为其他，则填写责任部门
      this.$nextTick(() => {
        if (this.matFormData.materialType == 1) {
          if (this.eleTableData.length == 0) {
            this.$message.error('请至少填写一条信息项！')
            return
          }
        } else {
          this.eleTableData = []
        }
        this.matFormData.itemVOs = this.eleTableData
        this.$refs['form'].validate().then(()=>{
          this.$emit('getMatData', this.matFormData, this.state)
          this.close()
        })
      })
    },
    // 接收申请数据的数据
    getEleData (data, state) {
      if (state === 'create') {
        // 新增 -- 直接讲接收到的数据push进去
        this.eleTableData.push(data)
      } else if (state === 'update') {
        // 更新 -- 讲接收到的数据根本原先的位置替换
        this.$set(this.eleTableData, (this.matPage.currentPage-1)*10+data.$index, data)
      }
      this.$nextTick(() => {
        this.tableData = this.getTableData(this.eleTableData)
      })
    },
    // 新增
    eleHandleCreate () {
      this.matState = 'create'
      this.eleFormData = {}
      this.$refs['eleDialog'].open(this.eleFormData)
    },
    // 详情
    eleHandleDetail (row) {
      this.matState = 'detail'
      this.eleFormData = {...row}
      this.$refs['eleDialog'].open(this.eleFormData)
    },
    // 修改
    eleHandleUpdate (row) {
      this.matState = 'update'
      this.eleFormData = {...row}
      this.$refs['eleDialog'].open(this.eleFormData)
    },
    // 删除
    eleHandleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        this.$delete(this.eleTableData, (this.matPage.currentPage-1)*10+row.$index)
        this.tableData = this.getTableData(this.eleTableData)
        if (row.id) {
          deleteItemData(row.id).then(() => {})
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
      console.log("list: ", list)
      return list
    },
    itemCurrentChange (data) {
      this.matPage.currentPage = data
      this.tableData = this.getTableData(this.eleTableData)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-block {
  display: flex;
  .form-block-label {
    width: 150px;
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    line-height: 40px;
  }
}
</style>

