<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}部门`" width="400px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item v-show="form._level!==1" label="上级部门" prop="superiorDepartment">
        <el-input v-model="form.parentName" disabled></el-input>
        <el-input v-show="false" v-model="form.parentId"></el-input>
      </el-form-item>
      <el-form-item label="部门编号" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userId">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="成立时间" prop="establishedTime">
        <iep-date-picker v-model="form.establishedTime" type="date" placeholder="选择日期">
        </iep-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, toDtoForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        number: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        establishedTime: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(toDtoForm(this.form)).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.close()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

