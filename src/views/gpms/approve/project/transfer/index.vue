<template>
  <iep-dialog :dialog-show="dialogShow" title="转交-立项申请" width="50%" @close="resetForm(false)">
    <p class="tipes">"立项申请"审批规则：项目预算小于等于100万的项目由班长审批，项目预算大于100万的项目由项目执行与质量委员会审批。</p>
    <el-form :model="formData" :rules="rules" ref="form" label-width="150px">
      <el-form-item label="编号：">{{formData.serialNo}}</el-form-item>
      <el-form-item label="项目名称：">{{formData.projectName}}</el-form-item>
      <el-form-item label="项目预算（万元）：">{{formData.projectBudget}}</el-form-item>
      <el-form-item label="审批人：" prop="approverList">
        <iep-contact-select v-model="formData.approverList" style="width: 200px;"></iep-contact-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm(false)">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { updateData } from '@/api/gpms/index'

export default {
  mixins: [mixins],
  data () {
    var validate = (rule, value, callback) => {
      if (value.name === '') {
        callback(new Error())
      } else {
        callback()
      }
    }
    return {
      dialogShow: false,
      formData: {
        approverList: { id: 0, name: '' },
      },
      rules: {
        approverList: [
          { validator: validate, message: '必填', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    open (data) {
      this.formData = {
        id: data.id,
        serialNo: data.serialNo,
        projectName: data.projectName,
        projectBudget: data.projectBudget,
        approverList: { id: 0, name: '' },
      }
      this.dialogShow = true
    },
    resetForm (state) {
      this.dialogShow = false
      if (state) {
        this.$emit('load-page', true)
      }
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateData(this.formData).then(() => {
            this.$message({
              message: '操作成功',
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
.dial .el-dialog .el-dialog__header {
  border-bottom: 1px solid gray;
  font-weight: bold;
  padding-top: 17px;
}
.dial .el-dialog__body {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.tipes {
  font-size: 12px;
  padding: 10px;
  margin: 0 20px 15px 20px;
  background-color: #ebf5ff;
  border-radius: 4px;
  line-height: 20px;
}
.RIGH {
  text-align: right;
}
.padl {
  padding-left: 9px;
}
</style>
