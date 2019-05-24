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
        <div v-if="permissions['ele_database_put'] && status !== dialog.textName.detail">
          <gov-button type="primary" @click="handleAdd">添加数据库</gov-button>
        </div>
        <div class="form-block">
          <avue-crud
            @current-change="currentChange"
            :data="tableList"
            :table-loading="tableLoading"
            :option="tableOption">
            <template slot-scope="scope" slot="menu">
              <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
            </template>
          </avue-crud>
        </div>
      </div>
    </gov-layout-form>
    <child-info-dialog
      @connectTest="handleConnectSubmit"
      @successForm="successForm"
      ref="childDialog">
    </child-info-dialog>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/mixins/mixin'
import { tableOption } from './const/dbConnect'
import childInfoDialog from './childDbDialog'
import { mapGetters } from 'vuex'
// import {getList} from '@/api/element/element'
import {
  // getDbs,
  batchDelete,
} from '@/api/infoSystem/dataBase'
import {
  getDbsBySystemId,
  testDatabaseConnect,
} from '@/api/infoSystem/dataBase'
// import {saveRelation} from '@/api/infoSystem/index'
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
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 获取信息项数据
    getList (row) {
      this.tableLoading = true
      console.log('row',row)
      this.tableList = row.dbsList
      // let ids = []
      // if(row.dbList && row.dbList.length >0){
      //   ids = row.dbList
      // }else{
      //   ids = [0]
      // }
      // let params = {
      //   ids: ids,
      // }
      // getDbs(ids).then(({data}) => {
      //   if (data.code === 0) {
      //     this.tableList = data.data
      //   }
      //   this.tableLoading = false
      // })
      this.tableLoading = false
    },
    // 打开时操作
    handleOpen () {

    },
    open (row) {
      if(row.id){
        this._id = row.id
        this._list = []
        this._sysDept = row.sysDept
      }
      this.$refs['dialog'].open()
      setTimeout(() => {
        this.getList(row)
      }, 50)
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 连接数据库
    handleAdd () {
      this.$refs['childDialog'].open({
        sysDept:this._sysDept,
        id: this._id,
      })
    },
    // 删除
    handleDelete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        this.tableList.splice(row.$index, 1)
        this._list.push(row.id)
      })
    },
    // 保存
    dialogSubmit () {
      this.saveBtnLoading = true
      batchDelete(this._list).then(({data}) => {
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
      this._id = null
      this._list = []
      this._sysDept = null
      this.$emit('cancelForm')
    },
    //测试连接
    handleConnectSubmit (formData) {
      testDatabaseConnect(formData).then(({data})=>{
        if (data.code === 0 && data.data === true) {
          this.$message.success('连接成功')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    //子弹窗修改成功
    successForm (tableList) {
      console.log("改变啦",this._id)
      getDbsBySystemId(this._id).then(({data})=>{
        console.log("daadada",data)
        this.tableList = data.data
      })
      // if(tableList){
      //   this.getList({
      //     dbList: tableList
      //   })
      // }
    },
  },
}
</script>
