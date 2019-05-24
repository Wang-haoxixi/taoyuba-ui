
import { mapGetters } from 'vuex'
import { postApproval, putApproval } from '@/api/hrms/wel'
import { formToDto, initForm, formToVo, selfToVo } from './options'
import { getEmployeeProfileSelf } from '@/api/hrms/employee_profile'
import { getAdministrativeApprovalById } from '@/api/hrms/administrative_approval'
export default {
  props: {
    type: {
      type: String,
      default: '1',
    },
  },
  data () {
    return {
      form: initForm(),
      rules: {
        reason: [
          { required: true, message: '请输入原因', trigger: 'change' },
        ],
        approver: [
          { required: true, message: '请选择审批人', trigger: 'change' },
        ],
      },
      fnSelf: getEmployeeProfileSelf,
      selfToVo,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    id () {
      return +this.$route.params.id
    },
    filterUserList () {
      return [this.userInfo.userId, ...this.form.cc.map(m => m.id), ...this.form.approver.map(m => m.id)]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.id) {
        getAdministrativeApprovalById(this.id).then(({ data }) => {
          this.form = formToVo(data.data)
          getEmployeeProfileSelf().then(({data}) => {
            this.form.dept = data.data.dept
          })
        })
      } else {
        this.loadSelf()
      }
    },
    async handleSubmit () {
      const submitFunction = this.id ? putApproval : postApproval
      try {
        const valid = await this.$refs['form'].validate()
        if (valid) {
          const { data } = await submitFunction(formToDto(this.form, this.type, this.userInfo.userId))
          console.log(data)
          if (!data.data) {
            this.$message(data.msg)
          } else {
            this.$router.history.go(-1)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 处理时间段
    dealTime (val1, val2) {
      function parseDate (date) {
        return new Date(date)
      }
      const newDate1 = parseDate(val1)
      const newDate2 = parseDate(val2)
      const between = (Number(newDate2) - Number(newDate1)) / 1000
      if (between < 0) {
        this.$message.error('开始时间不能大于结束时间！！！')
        return
      }
      const hours = parseInt(between / 3600)
      const minutes = parseInt((between - 3600 * hours) / 60)
      this.form.duration = hours + '小时' + minutes + '分钟'
    },
    startChange (val) {
      this.form.startTime = val
      this.dealTime(val, this.form.endTime)
    },
    endChange (val) {
      this.form.endTime = val
      this.dealTime(this.form.startTime, val)
    },
  },
}