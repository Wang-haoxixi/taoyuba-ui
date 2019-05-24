<template>
  <iep-dialog :dialog-show="dialogShow" :title="methodName[type]" width="40%" @close="resetForm">
    <el-form :model="formData" ref="form" label-width="100px">

      <el-form-item label="材料：">
        <iep-upload v-model="formData.attachFileList" :limit="limit"></iep-upload>
      </el-form-item>

    </el-form>
    
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogShow: false,
      limit: 1,
      formData: {
        attachFileList: [],
      },
      type: 'create',
      methodName: {
        create: '上传材料',
        update: '更新版本',
      },
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    open (type) {
      this.type = type
      this.dialogShow = true
      this.formData = {
        attachFileList: [],
      }
    },
    submitForm () {
      if (this.formData.attachFileList.length == 0) {
        this.$message.error('请先选择一个材料进行上传')
        return
      }
      this.$emit(this.type == 'create' ? 'upload-success' : 'update-success', this.formData.attachFileList)
      this.dialogShow = false
    },
  },
}
</script>
