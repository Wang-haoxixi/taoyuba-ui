<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    @handleSubmit="handleSubmit"
    :title="dialog[status].title ? dialog[status].title : ''"
    :btnGroup="btnGroup"
    :isBtnGroup="status !== 'detail'"
    width="80%">
    <layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="diagnosisMainFormDetailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <avue-form ref="diagnosisForm" :option="diagnosisMainFormOption" v-model="form">
        </avue-form>
      </template>
      <gov-layout-button-group v-if="status !== 'detail'">
        <gov-button type="primary" @click="handleAdd">新增条件</gov-button>
        <gov-button type="primary" @click="handleAddCondition">配置运算条件</gov-button>
      </gov-layout-button-group>
      <avue-crud
        :data="tableData"
        :option="tableOption"
        :page="false">
        <template slot-scope="scope" slot="value">
            {{showValue(scope.row.value,scope.row.optionField)}}
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)">详情</gov-button>
            <gov-button v-if="status!=='detail'" type="text" @click="handleUpdate(scope.row)">编辑</gov-button>
            <gov-button v-if="status!=='detail'" type="text" @click="handleDelete(scope.row)">删除</gov-button>
          </div>
        </template>
      </avue-crud>
      <!-- <div class="el-dialog__title mg10">配置运算条件</div> -->
      <!-- <gov-layout-button-group v-if="status !== 'detail'">
        <gov-button type="primary" @click="handleAddCondition">点击选择条件</gov-button>
      </gov-layout-button-group>
      详细条件:{{this.form.detailedValueCn}} -->
    </layout-form>
    <info-dialog ref="infoDialog" :status="infoDialogStatus" @submit="infoFormSubmit"></info-dialog>
    <condition-dialog ref="conditionDialog" @submit="conditionFormSubmit"/>
  </gov-dialog>
</template>

<script>

import scopeMixins from './const/scopeMixin'
import infoDialog from './infoDialog'
import conditionDialog from './conditionDialog'
import {
  getPageList,
} from '@/api/infoSystem/diagnosis'
import {
  getDic,
} from '@/util/dic'
export default {
  name: 'diagnosisDialog',
  mixins: [scopeMixins],
  components: { infoDialog, conditionDialog },
  data () {
    return {
      form: {},
      tableData: [],
    }
  },
  computed: {

  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open (formData) {
      this.form = formData
      this.$refs['dialog'].open()
      this.$nextTick(()=>{
        this.$refs['diagnosisForm'] ? this.$refs['diagnosisForm'].clearValidate() : ''
      })
      if (this.status !== 'create') {
        getPageList({ id: this.form.id, limit: 9999 }).then(({data})=>{
          // console.log(data)
          this.tableData = data.data.children || []
        })
      }
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 更新
    handleUpdate (row) {
      console.log('row',row)
      this.infoDialogStatus = 'update'
      this.$nextTick(()=>{
        this.$refs['infoDialog'].open(row)
      })
    },
    // 条件新增
    handleAdd () {
      this.infoDialogStatus = 'create'
      this.$nextTick(()=>{
        this.$refs['infoDialog'].open(this.setDefaultData())
      })
    },
    // 条件详情
    handleDetail (row) {
      this.infoDialogStatus = 'detail'
      console.log("detail",row)
      this.$nextTick(()=>{
        this.$refs['infoDialog'].open({...row})
      })
    },
    // 配置条件
    handleAddCondition () {
      if(this.tableData.length === 0){
        this.$message.warning("请先添加条件！")
      }else{
        this.$nextTick(()=>{
          this.$refs['conditionDialog'].open(this.tableData)
        })
      }
    },
    // 删除条件
    handleDelete (row) {
      this.$confirm('此操作删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.tableData.splice(row.$index,1)
        this.$message({ type: 'success', message: '删除成功!' })
      }).catch(() => {})
    },

    // 默认值设置
    setDefaultData () {
      let formData = {
        conditionType: '1',
      }
      let hasConnector = '1'  //是否拥有链接符 1 有 2 没有
      this.tableData.length == 0 ? hasConnector = '2' : hasConnector = '1'
      formData.hasConnector = hasConnector
      return formData
    },
    // 提交
    infoFormSubmit (formData,status) {
      // console.log(formData)
      if(status === 'update'){
        this.tableData.splice(formData.$index,1,formData)
        this.$message.success('条件编辑成功')
        this.$refs['infoDialog'].close()
      }else{
        this.tableData.push(formData)
        this.$message.success('条件新增成功')
        this.$refs['infoDialog'].close()
      }
      // console.log('tableData',this.tableData)
    },
    // 条件编辑成功
    conditionFormSubmit (condition) {
      this.$set(this.form,'detailedValueCn',condition.cn)
      this.$set(this.form,'detailedValue',condition.en)
      // this.$set(this.form,'detailedValueCn',condition)
    },
    // 保存
    handleSubmit () {
      this.$refs['diagnosisForm'].validate().then(()=>{
        let data = {...this.form}
        data.children = this.tableData
        this.$emit('submit', data, 'save')
      })
    },
    //关闭弹窗
    handleClosedDialog () {
      this.tableData = []
      this.form.id = ''
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['diagnosisForm'].resetForm() : ''
      })
    },
    //级联字典取值
    showValue (value,optionField) {
      let str = (optionField||"").split('-')
      let res = ''
      if(str.length>1){
        let valueArr = getDic(str[1]) || []
        for(let item of valueArr){
          if(item.value == value){
            res = item.label
          }
        }
      }else{
        res = value
      }
      return res
    },
  },
}

</script>
<style lang="scss" scoped>
.form-btn-group-container {
  margin: 10px 0;
}
.mg10{
  margin: 10px 0 30px;
}
</style>
