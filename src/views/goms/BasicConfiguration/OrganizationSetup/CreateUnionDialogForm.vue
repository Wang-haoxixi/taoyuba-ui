<template>
  <iep-dialog :dialog-show="dialogShow" title="创建联盟" width="60%" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="100px">
      <el-form-item label="联盟名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入联盟名称"></el-input>
      </el-form-item>
      <el-form-item label="Logo" prop="logo">
        <iep-avatar v-model="form.logo"></iep-avatar>
      </el-form-item>
      <el-form-item label="选择组织" prop="orgIds">
        <iep-select v-model="form.orgIds" multiple prefix-url="admin/union/no_union_org"></iep-select>
      </el-form-item>
      <el-form-item label="联盟简介" prop="intro">
        <el-input v-model="form.intro" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initOrgForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initOrgForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initOrgForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(({ data }) => {
            if (!data.data) {
              this.$message({
                message: '创建失败',
                type: 'error',
              })
            } else {
              this.$message({
                message: '创建成功',
                type: 'success',
              })
              this.loadPage()
            }
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.members {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 20px;
  .member {
    width: 100%;
    text-align: center;
  }
}
</style>

