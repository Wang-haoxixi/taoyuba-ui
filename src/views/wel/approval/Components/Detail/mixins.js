
import { mapGetters } from 'vuex'
// import keyBy from 'lodash/keyBy'
import { dictsMap } from './options'
import { getEmployeeProfileSelf } from '@/api/hrms/employee_profile'
import { deliverApprovaBatch, reviewApprovaBatch } from '@/api/hrms/wel'
import DeliverDialog from '@/views/wel/approval/approval/ExaminApproval/Page/DeliverDialog'
export default {
  components: { DeliverDialog },
  props: {
    type: {
      type: String,
      default: '1',
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      fnSelf: getEmployeeProfileSelf,
      bodyStyle: {
        display: 'flex',
        padding: '20px',
      },
      middleBodyStyle: {
        padding: '20px',
        border: 0,
      },
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
    startTimeLabel () {
      return dictsMap.startTime[this.form.type]
    },
    endTimeLabel () {
      return dictsMap.endTime[this.form.type]
    },
    approvalUserIds () {
      return this.form.approverList.map(m => m.id)
    },
    needApproval () {
      return this.approvalUserIds.includes(this.userInfo.userId) && this.form.status === 0
    },
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
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
    handleReview () {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = this.form.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleDeliver () {
      this.$refs['DeliverDialog'].form.ids = [this.form.id]
      this.$refs['DeliverDialog'].userId = this.form.userId
      this.$refs['DeliverDialog'].formRequestFn = deliverApprovaBatch
      this.$refs['DeliverDialog'].dialogShow = true
    },
  },
}