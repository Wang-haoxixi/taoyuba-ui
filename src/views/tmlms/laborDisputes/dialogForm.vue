<template>
  <el-dialog
    :title="status === 'create' ? '新增' : '编辑'"
    :visible.sync="dialogVisible"
    width="90%">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
      <div class="title">船东信息</div>
      <div class="title">船员信息</div>
      <div class="title">纠纷详情</div>
    </el-form>
  </el-dialog>
</template>
<script>
function initForm () {
  return {
    id: undefined,
    shipName: '', // 渔船名
    shipowner: '', // 持证人姓名
    shipownerIdcard: '', // 身份证号
    shipownerMobile: '', // 联系号码
    crewRealName: '', // 船员姓名
    crewIdcard: '', // 身份证号
    crewPhone: '', // 联系电话
    disputeReason: '', // 纠纷原因
    disputeContent: '', // 纠纷描述
    status: '', // 纠纷状态
    result: '', // 处理结果
    shipownerScore: '', // 船东分
    crewScore: '', // 船员分
  }
}
export default {
  props: {
    status: {
      type: String,
      default: 'create',
    },
  },
  data () {
    return {
      form: initForm(),
      maps: {
        status: [
          { label: '解决中', value: '0' },
          { label: '已解决', value: '1' },
          { label: '未解决', value: '2' },
        ],
      },
      dialogVisible: false,
      rules: {
        shipName: [
          { required: true, message: '请输入渔船名', trigger: 'blur' },
        ],
        
      },
    }
  },
  methods: {
    open (row) {
      this.dialogVisible = true
      if (row) {
        this.form = row
      }
    },
    close () {
      this.form = initForm()
      this.dialogVisible = false
    },
  },
}
</script>