<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="'关联接口'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="detail-wrapper">
        <!-- <avue-form ref="form" v-model="form" :option="editOption"></avue-form> -->
        <div v-if="status !== dialog.textName.detail">
          <gov-button type="primary" @click="handleSelected">选择已有接口</gov-button>
        </div>
        <div class="form-block">
          <avue-crud
            ref="infoCrud"
            @current-change="currentChange"
            :data="tableList"
            :page="pagination"
            :table-loading="tableLoading"
            :option="tableOption">
            <template slot-scope="scope" slot="menu">
              <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
            </template>
          </avue-crud>
        </div>
      </div>
    </gov-layout-form>
    <child-interface-dialog
      @successForm="successForm"
      ref="childDialog">
    </child-interface-dialog>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/mixins/mixin'
import { tableOption } from './const/interface'
import childInterfaceDialog from './childInterfaceDialog'
import {updateRelationInterface, getInterfaceList, getInterfaceListByIds} from '@/api/supply/dataSharing'
export default {
  mixins: [mixin],
  components: { childInterfaceDialog },
  data () {
    return {
      tableOption,
      currentIndex: -1, // 当前选中的信息项
      saveBtnLoading: false,
      tableList: [],
      _id: null,
      _interfaceList: [],
      _directoryList: [],
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
    // 获取接口数据   directoryList
    getListPageItem (row) {
      this.tableLoading = true
      let ids = []
      if(row.interfaceList && row.interfaceList.length >0){
        ids = row.interfaceList
      }else{
        ids = [-1]
      }
      let params = {
        ids: ids
      }
      getInterfaceListByIds(params).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data
        }
        this.tableLoading = false
      }).catch(()=>{
        this.tableLoading = false
      })
    },
    // 打开时操作
    handleOpen () {

    },
    open (row) {
      if(row.id){
        this._id = row.id
        this._interfaceList = row.interfaceList
        this._directoryList = row.directoryList
      }
      this.$refs['dialog'].open()
      setTimeout(() => {
        this.getListPageItem(row)
      }, 50)
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 选择已有接口
    handleSelected () {
      this.$refs['childDialog'].open(this._directoryList,this._interfaceList)
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        this.tableList.splice(row.$index, 1)
        this._interfaceList.splice(this._interfaceList.indexOf(row.id),1)
      })
    },
    // 保存
    dialogSubmit () {
      let ids = []
      this.tableList.map((item)=>{
        ids.push(item.id)
      })
      let params={
        id: this._id,
        ids: ids,
      }
      this.saveBtnLoading = true
      updateRelationInterface(params).then(({data}) => {
        if(data.code === 0){
          this.$emit('successForm','保存成功')
          this.close()
        }
        this.saveBtnLoading = false
      }).catch(()=>{
        this.saveBtnLoading = false
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      // this.resetFormData(this.form, true)
      // this.form.id = ''
      // console.log('this.form', this.form)
      this.tableList = []
      this.$emit('cancelForm')
    },
    //子弹窗修改成功
    successForm (tableList) {
      if(tableList){
        this._interfaceList = tableList
        this.getListPageItem({
          interfaceList: tableList
        })
      }
    },
  },
}
</script>
