<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="'选择已有接口'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="detail-wrapper">
        <div class="form-block">
          <avue-crud
            ref="infoCrud"
            @current-change="currentChange"
            @selection-change="selectionChange2"
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
import { tableOptionChild } from './const/interface'
// import {getList} from '@/api/element/element'
import {updateRelationCatalog,getInterfaceList} from '@/api/supply/dataSharing'
export default {
  mixins: [mixin],
  data () {
    return {
      tableOptionChild,
      currentIndex: -1, // 当前选中的信息项
      saveBtnLoading: false,
      tableList: [],
      _directoryList: null,
      _interfaceList: null,
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
    // 获取接口数据   directoryList
    getList () {
      let oldQueryData = [...this.queryData]
      this.tableLoading = true
      console.log('ids',this._directoryList)
      let params = {
        page: this.pagination.currentPage,
        limit: 10,
        ids: (this._directoryList && this._directoryList.length > 0) ? this._directoryList : [-1]
      }
      if(!this._directoryList){
        this.tableLoading = false
        return
      }
      getInterfaceList(params).then(({data}) => {
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
    open (directoryList,interfaceList) {
      this._directoryList = directoryList ? [...directoryList] : []
      this._interfaceList = interfaceList ? [...interfaceList] : []
      this.queryData = interfaceList ? [...interfaceList] : []
      this.$refs['dialog'].open()
      setTimeout(() => {
        this.getList()
      }, 50)
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      this.$message.success("操作成功！")
      this.$emit('successForm',this.queryData)
      this.close()
    },
    // 弹窗关闭后
    handleClosedDialog () {
      // this.tableList = []
    },
  },
}
</script>
