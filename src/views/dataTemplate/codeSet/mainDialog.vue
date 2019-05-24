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
    <gov-layout-form>
      <div class="detail-wrapper">
        <!-- 查看 -->
        <gov-detail-form v-if="status === dialog.textName.detail" v-model="temp" :option="detailOption"></gov-detail-form>
        <!-- 新增编辑 -->
        <avue-form ref="form" v-else v-model="form" :option="editOption"></avue-form>
        <div v-if="status !== dialog.textName.detail">
          <gov-button type="primary" @click="handleCreate">新增信息项</gov-button>
        </div>
        <div class="form-block">
          <avue-crud
            :data="tableList"
            :page="pagination"
            :table-loading="tableLoading"
            :option="informationItemTableOption">
            <template slot-scope="scope" slot="menu">
              <gov-button @click="handleDetail(scope.row)" type="text">详情</gov-button>
              <gov-button @click="handleUpdate(scope.row)" type="text" v-if="status !== dialog.textName.detail">编辑</gov-button>
              <gov-button @click="handleDelete(scope.row)" type="text" v-if="status !== dialog.textName.detail">删除</gov-button>
            </template>
          </avue-crud>
        </div>
      </div>
    </gov-layout-form>
    <child-dialog
      @successForm="successForm"
      :temp="formData"
      :status="dialogStatus"
      ref="childDialog">
    </child-dialog>
  </gov-dialog>
</template>
<script>
import {tableOption as informationItemTableOption} from './const/informationItem'
import childDialog from './childDialog'
import mixin from '@/mixins/mixin'
import currentMixin from './const/mixin'
import {getPage as getPageInformtionItem} from '@/api/dataTemplate/informationItem'
import {updateData, createData} from '@/api/dataTemplate/codeSet'
export default {
  mixins: [mixin, currentMixin],
  components: { childDialog },
  data () {
    return {
      informationItemTableOption,
      currentIndex: -1, // 当前选中的信息项
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
    // 获取信息项数据
    getListPageInformtionItem (row) {
      this.tableLoading = true
      row.limit = 10000
      getPageInformtionItem(row).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
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
        this.getListPageInformtionItem({cdCollId: this.temp.id})
      }, 50)
    },
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 新增
    handleCreate () {
      this.currentIndex = -1
      this.dialogStatus = this.dialog.textName.create
      this.formData = Object.assign({}, {})
      this.$refs['childDialog'].open()
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      this.formData = Object.assign({}, row)
      this.$refs['childDialog'].open()
    },
    // 修改
    handleUpdate (row) {
      this.currentIndex = row.$index
      this.dialogStatus = this.dialog.textName.update
      this.formData = Object.assign({}, row)
      this.$refs['childDialog'].open()
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        this.tableList.splice(row.$index, 1)
      })
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        this.form.infoItemList = this.tableList
        if(this.validateInfoLength()){
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
        }else{
          this.$message.warning('请添加两条或以上信息项再进行保存！')
        }
      })
    },
    // 信息项超过两条才允许通过验证
    validateInfoLength () {
      if((this.form.infoItemList || []).length>=2){
        return true
      }else {
        return false
      }
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      this.resetFormData(this.form, true)
      this.form.id = ''
      // console.log('this.form', this.form)
      this.tableList = []
    },
    // 提交成功后
    successForm (form) {
      if (this.currentIndex === -1) {
        this.tableList.splice(this.tableList.length - 1, 0, form)
      } else {
        this.$set(this.tableList, this.currentIndex, form)
      }
      this.currentIndex = -1
    },
  },
}
</script>
