<template>
  <iep-dialog :dialog-show="dialogShow" title="立项申请" width="60%" @close="resetForm(false)">

    <p class="tipes"><i class="el-icon-warning"></i> 项目预算大于100万的项目由项目执行与质量委员会审批。</p>
    <el-form :model="formData" ref="form" label-width="150px">
      <el-form-item label='编号'>{{formData.serialNo}}</el-form-item>
      <el-form-item label='项目名称'>{{formData.projectName}}</el-form-item>
      <el-form-item label='项目预算'>{{formData.projectBudget}}</el-form-item>
      <el-form-item label='审批人'>
        <iep-contact-select v-model="formData.approverObj" style="width: 200px"></iep-contact-select>
      </el-form-item>
      <el-form-item label='抄送人'>
        <iep-contact-multiple v-model="formData.ccPersonLists"></iep-contact-multiple>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <iep-button type="danger" @click="submitForm">提交</iep-button>
      <iep-button @click="resetForm(false)">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { updateData } from '@/api/gpms/index'
import { initFormData } from './option'

export default {
  name: 'index',
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      formData: initFormData(),
      rules: {
        issuename: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    open (data) {
      this.dialogShow = true
      this.formData.id = data.id
      this.formData.serialNo = data.serialNo
      this.formData.projectName = data.projectName
      this.formData.projectBudget = data.projectBudget
    },
    resetForm (state) {
      this.formData = initFormData()
      this.dialogShow = false
      if (state === true) {
        this.$emit('close', true)
      }
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formData.approver = this.formData.approverObj.id
          this.formData.orgIds = this.formData.ccPersonLists.orgs.map(m => m.id),
            this.formData.userIds = this.formData.ccPersonLists.users.map(m => m.id),
            this.formData.ccPersonList = this.formData.userIds
          updateData(this.formData).then(() => {
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            this.resetForm(true)
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
.tipes {
  font-size: 14px;
  padding: 10px;
  margin: 0 20px 15px 20px;
  background-color: #ebf5ff;
  border-radius: 4px;
  line-height: 30px;
}
</style>