<template>
  <gov-dialog
    ref="cdialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="'选择已有信息资源'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="detail-wrapper">
        <!-- <avue-form ref="form" v-model="form" :option="editOption"></avue-form> -->
        <div class="form-block">
          <avue-crud
            ref="infoCrud"
            @current-change="currentChange"
            @selection-change="selectionChange2"
            @set-current="setCurrent"
            :data="tableList"
            :page="pagination"
            :table-loading="tableLoading"
            :option="tableOptionChild">
          </avue-crud>
        </div>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/mixins/mixin'
import { tableOptionChild } from './const/infoMenu'
import {getList as getListPageInformtionItem} from '@/api/element/element'
import {updateRelationCatalog} from '@/api/supply/dataSharing'
export default {
  mixins: [mixin],
  data () {
    return {
      tableOptionChild,
      saveBtnLoading: false,
      tableList: [],
      _directoryList: null,
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
    selectionChange2 (val) {
      this.tableList.map((item)=>{
        if(this.queryData.indexOf(item.id)>-1){
          this.queryData.splice(this.queryData.indexOf(item.id),1)
        }
      })
      let newVal = val.map((item) => {
        return item.id
      })
      let newQueryData = this.queryData.concat(newVal)
      this.queryData = [...newQueryData]
    },
    // 获取信息项数据
    getList () {
      // console.log('queryData',this.queryData)
      let oldQueryData = [...this.queryData]
      this.tableLoading = true
      let params = {
        isDeleted: 1,
        page: this.pagination.currentPage,
        limit: 10,
        status: 3,
      }
      getListPageInformtionItem(params).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
          this.$nextTick(()=>{
            let currentTableList = this.tableList.filter((item)=>{
              if(oldQueryData.indexOf(item.id)>-1){
                return true
              }else{
                return false
              }
            })
            this.$refs.infoCrud.toggleSelection(currentTableList)
          })
        }
        this.tableLoading = false
      })
    },
    // 打开时操作
    handleOpen () {

    },
    open (directoryList) {
      this._directoryList = directoryList ? [...directoryList] : []
      this.queryData = directoryList ? [...directoryList] : []
      this.$refs['cdialog'].open()
      setTimeout(() => {
        this.getList()
      }, 50)
    },
    close () {
      this.$refs['cdialog'].close()
    },
    // 保存
    dialogSubmit () {
      this.$message.success("操作成功！")
      this.$emit('successForm',this.queryData)
      this.close()
    },
    // 弹窗关闭后
    handleClosedDialog () {
      // this.resetFormData(this.form, true)
      // this.form.id = ''
      // this.tableList = []
    },
  },
}
</script>
