<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    :btnGroup="btnGroup"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <!-- 详情 -->
        <gov-detail-form v-if="status === dialog.textName.detail" v-model="temp" :option="detailOption">
          <template slot="stdDocFileList" slot-scope="scope">
            <div class="stdDocFileList">
              {{scope.row.stdDocFileList[0].label}}
              <i
                v-if="scope.row.stdDocFileList[0].value"
                element-loading-background="rgba(0, 0, 0, 0.6)"
                element-loading-text="正在导出数据..."
                class="el-icon-download icon-download"
                @click="downloadFile(scope.row)"
                v-loading.fullscreen.lock="fullscreenLoading"></i>
            </div>
          </template>
        </gov-detail-form>
        <!-- 新增编辑 -->
        <avue-form
          ref="form"
          v-else
          v-model="form"
          :option="editOption"
          :upload-after="uploadAfter">
        </avue-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {updateData, createData, downloadData} from '@/api/dataTemplate/standardFile'
import currentMixin from './const/mixin'
import {getFieldClassify} from '@/api/dataTemplate/domainClassification'
export default {
  mixins: [mixin, currentMixin],
  data () {
    return {
      formData: {},
      fullscreenLoading: false,
      saveBtnLoading: false,
    }
  },
  watch: {
    "form.stdDocNo": {
      deep: true,
      handler (val) {
        console.log(val)
      },
    },
    "form.stdDocFileList": {
      deep: true,
      handler (val) {
        console.log(val.length)
      },
    },
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
    open () {
      getFieldClassify().then(({data})=>{
        if(data.code === 0){
          this.$set(this.editOption.column[4],"dicData",data.data)
          this.$nextTick(()=>{
            this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
          })
        }
      })
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      delete this.form.updTm
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
      // console.log('this.form', this.form)
      this.tableList = []
    },
    //下载
    downloadFile (row) {
      let params = {
        id: row.id,
      }
      this.fullscreenLoading = true
      downloadData({params, title: row.stdDocFileList[0].label.split('.')[0]}).then(()=>{
        this.fullscreenLoading = false
        // this.$message.info('正在导出数据...')
      })
    },
    uploadAfter (res, done) {
      this.validate()
      if (res.status && res.status === 200) {
        done()
      } else {
        done()
      }
    },
  },
}
</script>
<style scoped lang="scss">
  .stdDocFileList {
    position: relative;
    .icon-download {
      position: absolute;
      top: 12px;
      right: 0;
      cursor: pointer;
      color: #999;
      :hover {
        color: #333;
      }
    }
  }
</style>
