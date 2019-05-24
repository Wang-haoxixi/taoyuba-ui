<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 详情 -->
        <gov-detail-form v-if="status === dialog.textName.detail" v-model="form" :option="detailOption">
          <template slot="fileList">
            <el-tag
              v-for="item in form.fileList"
              :key="item.id">
              <span class="curP" @click="downLoadFile(item.nfileName)">{{item.fileName}}</span>
            </el-tag>
          </template>
        </gov-detail-form>
        <!-- 新增编辑 -->
        <avue-form ref="form" v-else v-model="form" :option="editOption">
          <template slot="fileList">
            <div>
              <mat-file-uploader-list class="upload" v-model="form.fileList" samp-type-name="申请表" ></mat-file-uploader-list>
            </div>
          </template>
          <template slot="itemInformation">
            <div>
              <gov-button type="primary" @click="handleAddItem" text="选择已有信息项"></gov-button>
              <gov-button type="default" @click="handleManualAddItem" text="手动输入信息项"></gov-button>
            </div>
          </template>
        </avue-form>
        <div class="form-block">
          <avue-crud
            :data="tableList"
            :page="pagination"
            :table-loading="tableLoading"
            :option="infoDetailTableOption">
            <template slot-scope="scope" slot="menu">
              <gov-button @click="handleUpdate(scope.row,scope.row.$index)" type="text" v-if="status !== dialog.textName.detail">编辑</gov-button>
              <gov-button @click="handleDelete(scope.row,scope.row.$index)" type="text" v-if="status !== dialog.textName.detail">删除</gov-button>
            </template>
          </avue-crud>
        </div>
      </div>
    </layout-form>
    <select-dialog
      @successForm="successForm"
      :temp="formData"
      :status="dialogStatus"
      ref="selectDialog">
    </select-dialog>
    <manual-dialog
      @successForm="addToList"
      @updateForm="updateToList"
      :temp="formData"
      :status="dialogStatus"
      ref="manualDialog">
    </manual-dialog>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import matterMixin from './const/mixin'
import matFileUploaderList from '@/components/mat-file-uploader-list'
import _ from 'lodash'
// import { postMatter as createData, putMatter as updateData} from '@/api/cbs/matter'
import { postMaterial as createData, putMaterial as updateData } from '@/api/cbs/application_form'
import selectDialog from './selectDialog'
import manualDialog from './manualDialog'
import { downloadFile } from '@/api/cbs/file'
export default {
  mixins: [mixin, matterMixin],
  components: {
    matFileUploaderList,
    selectDialog,
    manualDialog,
  },
  data () {
    return {
      tableList: [],
    }
  },
  methods: {
    handleOpen () {
      this.form = Object.assign(this.form,this.temp)
      if(this.form.itemList && this.form.itemList.length > 0){
        this.tableList = this.form.itemList
      }
      this.$nextTick(()=>{
          this.$refs['form'] && this.$refs['form'].clearValidate()
      })
    },
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleAddItem () {
      this.$refs['selectDialog'].open()
    },
    handleManualAddItem () {
      this.$refs['manualDialog'].open()
    },
    _transForm () {
      if(this.form.fileList.length > 0){
        let fids = this.form.fileList.map(item=>{
          return item.id
        })
        this.form.fids = fids
      }
      if(this.tableList.length>0){
        this.form.itemList = this.tableList
        // this.$set(this.from,'itemList',this.tableList)
      }
      if(!this.form.customForm){
        this.form.customForm = null
      }
      if(!this.form.customForms){
        this.form.customForms = null
      }
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        if (this.status === this.dialog.textName.create) {
          this._transForm()
          console.log('addForm',this.form)
          createData(this.form).then(({data}) => {
            if(data.data){
              this.$emit('successForm','添加成功！')
              this.close()
            }else{
              this.$message.warning(data.msg)
            }
          })
        } else if (this.status === this.dialog.textName.update) {
          this._transForm()
          updateData(this.form).then(({data}) => {
            if(data.data){
              this.$emit('successForm','修改成功！')
              this.close()
            }else {
              this.$message.warning(data.msg)
            }
          })
        }
      })
    },
    //删除
    handleDelete (sItem, i) {
      const itemList = this.tableList
      itemList.splice(i, 1)
    },
    handleUpdate (row,index) {
      this.$refs['manualDialog'].open(row,index)
    },
    //下载文件
    downLoadFile (nFileName) {
      downloadFile(nFileName)
    },
    // 弹窗关闭后
    handleClosedDialog () {
      // if (this.status !== this.dialog.textName.detail) {
      //   this.$refs['form'].resetForm()
      // }
      this.initForm()
    },
    addToList (item){
      this.tableList.push(item)
    },
    updateToList (item,index){
      console.log("更新",item,index)
      this.$set(this.tableList,index,item)
    },
    successForm (items){
      // this.tableList = this.tableList.concat(items)
      let noIds = []
      let ids = []
      // console.log(this.tableList.concat(items))
      this.tableList.map(item=>{
        if(item.id){
          ids.push(item)
        }else{
          noIds.push(item)
        }
      })
      ids = _.uniqBy(ids.concat(items), m =>m.id)
      this.tableList = noIds.concat(ids)
      // this.tableList = _.uniqBy(this.tableList, m =>m.id)
    },
  },
}
</script>
<style scoped>
.curP{
  cursor: pointer;
}
</style>
