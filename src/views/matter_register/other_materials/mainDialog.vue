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
          <template slot="材料样本">
            <el-tag
              v-for="item in form.材料样本"
              :key="item.id">
              <span class="curP" @click="downLoadFile(item.nfileName)">{{item.fileName}}</span>
            </el-tag>
          </template>
          <template slot="示范文本">
            <el-tag
              v-for="item in form.示范文本"
              :key="item.id">
              <span class="curP" @click="downLoadFile(item.nfileName)">{{item.fileName}}</span>
            </el-tag>
          </template>
        </gov-detail-form>
        <!-- 新增编辑 -->
        <avue-form ref="form" v-else v-model="form" :option="editOption">
          <template slot="材料样本">
            <div>
              <mat-file-uploader-list class="upload" v-model="form.材料样本" samp-type-name="材料样本" ></mat-file-uploader-list>
            </div>
          </template>
          <template slot="示范文本">
            <mat-file-uploader-list class="upload" v-model="form.示范文本" samp-type-name="示范文本" ></mat-file-uploader-list>
          </template>
        </avue-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import matterMixin from './const/mixin'
import matFileUploaderList from '@/components/mat-file-uploader-list'
import { putMaterial as updateData, postMaterial as createData } from '@/api/cbs/application_form'
import { downloadFile } from '@/api/cbs/file'
export default {
  mixins: [mixin, matterMixin],
  components: {
    matFileUploaderList,
  },
  data () {
    return {}
  },
  methods: {
    handleOpen () {
      if(this.status === this.dialog.textName.create){
        this.initForm()
        this.disabledMaterialIder = false
      }else{
        this.disabledMaterialIder = true
      }
      this.form = Object.assign(this.form,this.temp)
      this._transFiles()
      // this.$set(this.form,"materialType",this.form.materialType+"")
      // console.log("getForm",this.form)
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
    _transFiles () {
      if(this.form.fileList && this.form.fileList.length > 0){
        let 材料样本 = []
        let 示范文本 = []
        this.form.fileList.map(item=>{
          if(item.sampType === 5){
            材料样本.push(item)
          }
          if(item.sampType === 6){
            示范文本.push(item)
          }
        })
        this.$set(this.form,"材料样本",材料样本)
        this.$set(this.form,"示范文本",示范文本)
      }
    },
    _setFids () {
      if(this.form.isMaterialSamp === 1){
        this.$set(this.form,'材料样本',[])
      }
      if(this.form.isDemoSamp === 1){
        this.$set(this.form,'材料样本',[])
      }
      let fids = []
      if(this.form.材料样本 && this.form.材料样本.length > 0){
        this.form.材料样本.map(item=>{
          fids.push(item.id)
        })
      }
      if(this.form.示范文本 && this.form.示范文本.length > 0){
        this.form.示范文本.map(item=>{
          fids.push(item.id)
        })
      }
      this.$set(this.form,'fids',fids)
      // this.$set(this.form,'materialType',this.form.materialType-0)
    },
    //下载文件
    downLoadFile (nFileName) {
      downloadFile(nFileName)
    },
    // 保存
    dialogSubmit () {
      this.$refs.form.validate().then(() => {
        if (this.status === this.dialog.textName.create) {
          this._setFids()
          console.log("addForm",this.form)
          createData(this.form).then(({data}) => {
            if(data.data){
              this.$emit('successForm','添加成功！')
              this.close()
            }else{
              this.$message.warning(data.msg)
            }
          })
        } else if (this.status === this.dialog.textName.update) {
          this._setFids()
          console.log("updateForm",this.form)
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
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      this.initForm()
    },
  },
}
</script>
<style scoped>
.curP{
  cursor: pointer;
}
</style>
