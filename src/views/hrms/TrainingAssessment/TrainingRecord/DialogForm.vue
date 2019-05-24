<template>
  <iep-dialog :dialog-show="dialogShow" title="培训信息" width="520px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="培训图片：" prop="themePictures">
        <iep-avatar v-model="form.themePictures"></iep-avatar>
      </el-form-item>
      <el-form-item label="培训主题：" prop="trainingTheme">
        <el-input v-model="form.trainingTheme" placeholder="请填入培训主题"></el-input>
      </el-form-item>
      <el-form-item label="培训老师：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="培训时间：" prop="startTime">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="培训类型：" prop="typeId">
        <iep-dict-select v-model="form.typeId" dict-name="hrms_training_type" placeholder="选择类型"></iep-dict-select>
      </el-form-item>
      <el-form-item label="培训方式：" prop="methodId">
        <iep-dict-select v-model="form.methodId" dict-name="hrms_training_mode" placeholder="选择方式"></iep-dict-select>
      </el-form-item>
      <el-form-item label="培训地点：" prop="place">
        <el-input v-model="form.place" placeholder="请填入培训地点"></el-input>
      </el-form-item>
      <el-form-item label="培训标签：" prop="trainingTag">
        <iep-tag v-model="form.trainingTag"></iep-tag>
      </el-form-item>
      <el-form-item label="培训简介：" prop="trainingBrief">
        <iep-input-area v-model="form.trainingBrief"></iep-input-area>
      </el-form-item>
      <el-form-item label="培训材料：" prop="material">
        <iep-upload v-model="form.material">请上传培训材料</iep-upload>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules, formToDto } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
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
          this.formRequestFn(formToDto(this.form)).then(() => {
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
