<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :before-close="handleBeforeClose"
    @close="close"
    width="60%">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" :disabled="status === 'detail'">
      <el-form-item label="广告名称" prop="title">
        <el-input v-model.trim="form.title"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" prop="fileList">
        <el-upload
          class="upload-demo"
          action="/api/admin/file/upload/avatar"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-upload="handleBeforeUpload"
          :file-list="fileList"
          :limit="1"
          :headers="headers"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过1M</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { createPicPage, updatePicPage, getPicById } from '@/api/admin/ad'
import { mapGetters } from 'vuex'
export default {
  props: {
    status: String,
  },
  data () {
    return {
      rules: {
        fileList: [{ required: true, message: '请上传图片', trigger: 'change' }],
        title: [{ required: true, message: '请输入广告名', trigger: 'blur' }],
      },
      fileList: [],
      form: {
        title: '',
      },
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters([
      'access_token',
    ]),
    headers () {
      return {
        'Authorization': 'Bearer ' + this.access_token,
      }
    },
  },
  methods: {
    open (row) {
      this.dialogVisible = true
      this.form.posId = row.posId
      if (row.id) {
        this.getList(row.id)
      }
    },
    close () {
      this.$refs['ruleForm'].resetFields()
      this.resetForm()
      this.dialogVisible = false
    },
    resetForm () {
      this.form.title = ''
      this.form.image = ''
      this.form.id = ''
      this.form.posId = ''
      this.form.url = ''
    },
    getList (id) {
      getPicById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
        }
      })
    },
    handleBeforeUpload () {

    },
    handleSuccess () {},
    handleRemove () {
      this.fileList = []
      this.form.image = ''
      this.form.url = ''
    },
    handleBeforeClose () {
      this.$refs['ruleForm'].resetFields()
      this.resetForm()
      this.close()
    },
    handleSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let api = this.status === 'create' ? createPicPage : updatePicPage
            api(this.form).then(({ data }) => {
              if (data.code === 0) {
                this.$notify({
                  message: this.status === 'create' ? '新增成功' : '编辑成功',
                  type: 'success',
                })
                this.$emit('end')
                this.close()
              } else {
                this.$notify({
                  message: this.status === 'create' ? '新增失败' : '编辑失败',
                  type: 'warning',
                })
              }
            })
          }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>