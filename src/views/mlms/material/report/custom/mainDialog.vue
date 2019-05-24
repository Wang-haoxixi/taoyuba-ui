<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}数据`" width="40%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="分类：" prop="type">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称：" prop="mingchen">
        <el-input v-model="formData.mingchen"></el-input>
      </el-form-item>
      <el-form-item label="进度：" prop="jindu">
        <el-input v-model="formData.jindu"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="shijian">
        <el-date-picker v-model="formData.shijian" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="负责人：" prop="fuzeren">
        <el-input v-model="formData.fuzeren"></el-input>
      </el-form-item>
      <el-form-item label="说明：" prop="shuoming">
        <el-input v-model="formData.shuoming" type="textarea" rows=5></el-input>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, rules } from './option'

export default {
  components: {},
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          { value: 1, label: '选项1' },
          { value: 2, label: '选项2' },
        ],
        dept: [
          { value: 1, label: '部门1' },
          { value: 2, label: '部门2' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
