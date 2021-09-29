<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}港口`" width="50%" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="港口名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="允许加入" prop="isOpen">
        <el-switch v-model="form.isOpen" :active-value="0" :inactive-value="1"></el-switch>
      </el-form-item> -->
      <el-form-item label="东经/度" prop="longitudeDegree">
        <el-input-number v-model="form.longitudeDegree" :min="1"  :max="179" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="东经/分" prop="longitudeBranch">        
        <el-input-number v-model="form.longitudeBranch"  :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="东经/秒" prop="longitudeSecond">
        <el-input-number v-model="form.longitudeSecond" :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="北纬/度" prop="latitudeDegree">
        <el-input-number v-model="form.latitudeDegree" :min="1"  :max="179" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="北纬/分" prop="latitudeBranch">          
        <el-input-number v-model="form.latitudeBranch"  :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="北纬/秒" prop="latitudeSecond">
        <el-input-number v-model="form.latitudeSecond" :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="纬度">
        <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="范围（海里）">
        <el-input oninput="value=value.replace(/[^0-9.]/g,'')"  v-model="form.longitudeUp"></el-input>
      </el-form-item> -->
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
        ],
        intro: [
          { required: true, message: '请填写组织描述', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.isOpen=0
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
