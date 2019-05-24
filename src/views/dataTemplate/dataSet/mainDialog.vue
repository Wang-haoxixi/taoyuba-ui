<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 详情 -->
        <gov-detail-form v-if="status === dialog.textName.detail" v-model="temp" :option="detailOption"></gov-detail-form>
        <!-- 新增编辑 -->
        <avue-form ref="form" v-else v-model="form" :option="editOption"></avue-form>
      </div>
      <div class="form-block" v-if="status !== dialog.textName.create">
        <avue-crud
          :data="tableList"
          :table-loading="tableLoading"
          @size-change="sizeChange"
          @current-change="currentChange"
          :page="pagination"
          :option="elementTableOption">
          <template slot-scope="scope" slot="menu">
            <gov-button @click="handleDelete(scope.row)" type="text" v-if="status === dialog.textName.update">删除</gov-button>
          </template>
        </avue-crud>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import currentMixin from './const/mixin'
import {updateData, createData} from '@/api/dataTemplate/dataSet'
import {deleteBatch, getPage} from '@/api/dataTemplate/element'
import {tableOption as elementTableOption} from './const/element'
import {getStandardByDomainClassification} from '@/api/dataTemplate/standardFile'
export default {
  mixins: [mixin, currentMixin],
  data () {
    return {
      formData: {},
      elementTableOption,
      tableList: [],
      saveBtnLoading: false,
    }
  },
  computed: {
    btnGroup () {
      return [
        {
          label: '保存',
          type: 'primary',
          loading: this.saveBtnLoading,
          disabled: false,
          fn: 'handleSubmit',
        },
        {
          label: '取消', // 按钮文本
          loading: false, // 按钮加载中状态
          disabled: false, // 是否禁用按钮
          fn: 'handleCancel', // 按钮回调方法名称
        },
      ]
    },
  },
  methods: {
    //获取数据元数据
    getDetail (row) {
      this.tableLoading = true
      getPage(row).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
        }
        this.tableLoading = false
      })
    },
    // 打开时操作
    handleOpen () {
      this.$nextTick(()=>{
        this.$refs['form'] && this.$refs['form'].clearValidate()
      })
      if (this.temp.id == null || this.temp.id === '') {
        return
      }
      setTimeout(() => {
        this.getDetail({dtCollId: this.temp.id})
        //控制操作栏的显示隐藏
        if(this.status === this.dialog.textName.update){
          this.$set(this.elementTableOption, "menu", true)
        }else{
          this.$set(this.elementTableOption, "menu", false)
        }
      }, 50)
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        this.tableList.splice(row.$index, 1)
      })
    },
    open () {
      this.$nextTick(()=>{
        if(this.form.infoResrcClsId){
          getStandardByDomainClassification({id:this.form.infoResrcClsId}).then(({data})=>{
            this.standardDataById = data.data
          })
        }
      })
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 删除
    _delete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        deleteBatch({ids: row}).then(() => {
          this.queryData = []
          this.getList()
        })
      }).catch(() => {})
    },
    // 保存
    dialogSubmit () {
      // delete this.form.updTm
      this.form.dtEleList = this.tableList
      this.$refs.form.validate().then(() => {
        this.saveBtnLoading = true
        if (this.status === this.dialog.textName.create) {
          createData(this.form).then(({data}) => {
            if(data.code === 0){
              this.$emit('successForm','新增成功')
              this.close()
            }
            this.saveBtnLoading = false
          }).catch(()=>{
            this.saveBtnLoading = false
          })
        } else if (this.status === this.dialog.textName.update) {
          updateData(this.form).then(({data}) => {
            if(data.code === 0){
              this.$emit('successForm','修改成功')
              this.close()
            }
            this.saveBtnLoading = false
          }).catch(()=>{
            this.saveBtnLoading = false
          })
        }
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      this.resetFormData(this.form, true)
      this.form.id = ''
      this.tableList = []
    },
  },
}
</script>
