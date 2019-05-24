<template>
  <iep-dialog :dialog-show="dialogShow" title="调动" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <!-- <el-form-item label="选择部门" prop="dept">
        <iep-cascader v-model="form.dept" prefix-url="admin/dept" change-on-select></iep-cascader>
      </el-form-item> -->
      <el-form-item label="岗位" prop="position">
        <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
      </el-form-item>
      <el-form-item label="职务" prop="jobId">
        <iep-select prefix-url="hrms/job_system" v-model="form.jobId"></iep-select>
      </el-form-item>
      <el-form-item label="职称" prop="titleId">
        <iep-select prefix-url="hrms/title_system" v-model="form.titleId"></iep-select>
      </el-form-item>
      <el-form-item label="调动时间" prop="transferTime">
        <iep-date-picker v-model="form.transferTime" type="date" placeholder="选择日期">
        </iep-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">调动</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
import { initTransferForm, transferFormToDto } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initTransferForm(),
      rules: {
        // dept: [
        //   { required: true, message: '请输入部门', trigger: 'blur' },
        // ],
        position: [
          { required: true, message: '请输入岗位', trigger: 'blur' },
        ],
        jobId: [
          { required: true, message: '请输入职务', trigger: 'blur' },
        ],
        titleId: [
          { required: true, message: '请输入职称', trigger: 'blur' },
        ],
        transferTime: [
          { required: true, message: '请输入时间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadData () {
      getEmployeeProfileById(this.form.id).then(({ data }) => {
        const row = data.data
        // this.form.dept = row.dept
        this.form.position = row.position
        this.form.jobId = row.jobId
        this.form.titleId = row.titleId
      })
    },
    loadPage () {
      this.form = initTransferForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(transferFormToDto(this.form)).then(() => {
            this.$message({
              message: '调动人员成功',
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
