<template>
  <iep-dialog :dialog-show="dialogShow" title="转交" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="80px">
      <el-form-item label="转交人" prop="user">
        <iep-contact-select v-model="form.user" :filter-user-list="filterUserList">
        </iep-contact-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { initDeliverForm, toDeliverForm } from '../options'
export default {
  data () {
    const checkContact = (rule, value, callback) => {
      if (!value.id) {
        return callback(new Error('用户不能为空'))
      } else {
        callback()
      }
    }
    return {
      id: '',
      userId: '', // 申请人ID
      dialogShow: false,
      rules: {
        user: [
          { required: true, validator: checkContact, trigger: 'blur' },
        ],
      },
      formRequestFn: () => { },
      form: initDeliverForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    filterUserList () {
      return [this.userInfo.userId, this.userId]
    },
  },
  methods: {
    loadPage () {
      this.form = initDeliverForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(toDeliverForm(this.form)).then(() => {
            this.$message({
              message: '转交成功',
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

