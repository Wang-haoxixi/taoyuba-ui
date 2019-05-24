<template>
  <iep-dialog :dialog-show="dialogShow" title="打赏" width="520px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="打赏金额：" prop="amount">
        <iep-input-number v-model="form.amount" :max="maxAmount"></iep-input-number>
      </el-form-item>
      <el-form-item label="打赏对象：" prop="targetUser">
        <iep-contact-select v-model="form.targetUser"></iep-contact-select>
      </el-form-item>
      <el-form-item label="备注：" prop="message">
        <iep-input-area v-model="form.message"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">打赏</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { reward } from '@/api/fams/total'
function initForm () {
  return {
    amount: 0,
    targetUser: {
      id: '',
      name: '',
    },
    message: '',
  }
}
function toDtoForm (row) {
  const newForm = row
  newForm.targetUserId = row.targetUser.id
  return newForm
}
export default {
  name: 'RewardDialog',
  data () {
    const checkContact = (rule, value, callback) => {
      if (!value.id) {
        return callback(new Error('打赏用户不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: initForm(),
      rules: {
        amount: [
          { required: true, message: '请输入打赏金额', trigger: 'blur' },
        ],
        targetUser: [
          { required: true, validator: checkContact, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.fams.rewardDialogShow,
      maxAmount: state => state.fams.withdrawableCash,
    }),
  },
  methods: {
    ...mapMutations({
      setRewardDialogShow: 'SET_REWARD_DIALOG_SHOW',
    }),
    submitForm () {
      this.$refs['form'].validate((valid) => {
        console.log(valid)
        if (valid) {
          reward(toDtoForm(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message('打赏成功')
              this.setRewardDialogShow(false)
              this.form = initForm()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
    close () {
      this.setRewardDialogShow(false)
    },
  },
}
</script>
