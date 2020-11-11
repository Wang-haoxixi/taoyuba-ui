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
      <el-form-item label="广告链接" prop="title">
        <el-input v-model.trim="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="form.sort" :maxlength="3"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" prop="fileList">
        <el-upload
          class="upload-demo"
          action="/api/admin/file/upload/avatar"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-upload="handleBeforeUpload"
          :file-list="form.fileList"
          :limit="1"
          :headers="headers"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">{{`只能上传jpg/png文件，且不超过2M，图片宽度${width},高度${height}`}}</div>
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
const initForm = () => {
  return {
    id: '',
    posId: '',
    image: '',
    url: '',
    fileList: [],
    title: '',
  }
}
export default {
  props: {
    status: String,
    width: Number,
    height: Number,
  },
  data () {
    let validateIsNumber = (rule, value, callback) => {
      let reg = /^[+]{0,1}(\d+)$/
      if (value === '') {
        callback()
      } else if (!reg.test(value)) {
        callback(new Error('请输入正整数'))
      }
      callback()
    }
    return {
      rules: {
        fileList: [{ required: true, message: '请上传图片', trigger: 'change' }],
        title: [{ required: true, message: '请输入广告名', trigger: 'blur' }],
        url: [{ required: true, message: '请输入广告链接', trigger: 'blur' }],
        sort: [{ validator: validateIsNumber, trigger: 'blur' }],
      },
      // fileList: [],
      form: initForm(),
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
      this.form = initForm()
    },
    getList (id) {
      getPicById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
          this.form.fileList = [{ name: '', url: this.form.image}]
        }
      })
    },
    handleBeforeUpload (file) {
      //图片格式
      const isJPG = file.type === 'image/jpg' || file.type === 'image/png'
        //图片大小
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能为jpg或png格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2MB')
      }
      let _this = this
      const isSize = new Promise(function (resolve, reject) {
        const img = new Image()
        const _URL = window.URL || window.webkitURl
        img.onload = function () {
          file.width = img.width//图片宽度
          file.height = img.height//图片高度
          const valid = img.width === _this.width && img.height === _this.height//上传图片尺寸判定
          valid ? resolve() : reject(new Error('error'))
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {return file},
        () => {
          _this.$message.error(`上传图片尺寸必须为${this.width}*${this.height}`)
          return Promise.reject(new Error('error'))
        }
      )
      return isJPG && isLt2M && isSize
    },
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      let obj = {
        name: '',
        url: file.response.data.url,
      }
      this.form.fileList.push(obj)
      this.form.image = file.response.data.url
    },
    handleRemove () {
      this.form.fileList = []
      this.form.image = ''
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