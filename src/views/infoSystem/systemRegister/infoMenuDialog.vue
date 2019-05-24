<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="'关联目录'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="detail-wrapper">
        <!-- <avue-form ref="form" v-model="form" :option="editOption"></avue-form> -->
        <div v-if="status !== dialog.textName.detail">
          <gov-button type="primary" @click="handleSelected">选择已有信息资源</gov-button>
        </div>
        <div class="form-block">
          <avue-crud
            @current-change="currentChange"
            :data="tableList"
            :table-loading="tableLoading"
            :option="tableOption">
            //status
            <template slot="status">
              已发布
            </template>
            <template slot-scope="scope" slot="menu">
              <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
            </template>
          </avue-crud>
        </div>
      </div>
    </gov-layout-form>
    <child-info-dialog
      @successForm="successForm"
      ref="childDialog">
    </child-info-dialog>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/mixins/mixin'
import { tableOption } from './const/infoMenu'
import childInfoDialog from './childInfoDialog'
// import {getList} from '@/api/element/element'
// import {getInfoList} from '@/api/supply/dataSharing'
import {saveRelation} from '@/api/infoSystem/index'
export default {
  mixins: [mixin],
  components: { childInfoDialog },
  data () {
    return {
      tableOption,
      saveBtnLoading: false,
      tableList: [],
      _id: null,
      _list: [],
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
    getList (row) {
      this._list = row.resrcList
      this.tableLoading = true
      let ids = []
      if(row.resrcList && row.resrcList.length >0){
        ids = row.resrcList
      }else{
        ids = [-1]
      }
      this.tableList = row.resrcList
      this.tableLoading = false
    },
    // 打开时操作
    handleOpen () {

    },
    open (row) {
      if(row.id){
        this._id = row.id
        this._list = row.resrcList
      }
      this.$refs['dialog'].open()
      setTimeout(() => {
        this.getList(row)
      }, 50)
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 选择信息资源
    handleSelected () {
      this.$refs['childDialog'].open(this._list)
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        this.tableList.splice(row.$index, 1)
        this._list.map((item,index)=>{
          if(item.id == row.id){
            this._list.splice(index,1)
          }
        })
        // this._list.splice(this._list.indexOf(row.id),1)
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
      let id = this._id
      let data =ids
      this.saveBtnLoading = true
      saveRelation(id,data).then(({data}) => {
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
      // this.tableList = []
      this.$emit('cancelForm')
    },
    //子弹窗修改成功
    successForm (tableList) {
      if(tableList){
        this.getList({
          resrcList: tableList
        })
      }
    },
  },
}
</script>
