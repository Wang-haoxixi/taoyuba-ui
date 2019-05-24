<template>
  <iep-dialog :dialog-show="dialogShow" title="项目经理授权申请" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="150px">

      <p class="tips">"项目经理授权申请"审批规则：项目预算小于等于100万的项目由班长审批，项目预算大于100万的项目由高层审批。</p>

      <el-form-item label="编号：">
        {{formData.serialNo}}
      </el-form-item>
      <el-form-item label="项目名称：">
        {{formData.projectName}}
      </el-form-item>
      <el-form-item label="项目预算（万元）：">
        {{formData.projectBudget}}
      </el-form-item>
      <el-form-item label="审批人：" prop="approverList">
        <iep-contact-select v-model="formData.approverList"></iep-contact-select>
      </el-form-item>
      <el-form-item label="抄送人：" prop="ccPersonList">
        <iep-contact-multiple v-model="formData.ccPersonList"></iep-contact-multiple>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { updateData } from '@/api/gpms/author'
function initFormData () {
  return {
    approverList: { id: '', name: '' },
    ccPersonList: {
      unions: [],
      orgs: [],
      users: [],
    },
  }
}

export default {
  data () {
    return {
      rules: {},
      dialogShow: false,
      formData: initFormData(),
      list: [],
    }
  },
  methods: {
    open (list) {
      this.dialogShow = true
      this.formData = initFormData()
      this.formData = {
        serialNo: list.serialNo,
        projectName: list.projectName,
        projectBudget: list.projectBudget,
        id: list.id,
        approverList: { id: '', name: '' },
        ccPersonList: {
          unions: [],
          orgs: [],
          users: [],
        },
        approvalStatus: 2,
      }
    },
    loadPage () {
      this.$emit('load-page')
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.approver = this.formData.approverList.id
          this.formData.ccPersonList = this.formData.ccPersonList.users.map(m => m.id)
          updateData(this.formData).then(() => {
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.tips {
  padding: 15px;
  background-color: #ebf5ff;
}
.item {
  line-height: 40px;
  i {
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
