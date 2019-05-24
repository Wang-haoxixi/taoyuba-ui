import { isReadeBatch, deleteEmailByIds, getEmailById } from '@/api/mlms/email/index'

export default {
  data () {
    return {
      pageState: 'list',
      selectList: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.pageState = 'detail'
      this.$refs['mainDialog'].formData = row
    },
    backPage (state) {
      this.pageState = 'list'
      if (state) {
        this.$refs['table'].loadPage({ type: this.type })
      }
    },
    multipleSelect (val, list) {
      this.multipleSelection = val
      this.selectList = list
    },
    // 批量标记已读
    allRead () {
      isReadeBatch(this.multipleSelection).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$refs['table'].loadPage({})
      })
    },
    // 批量删除
    allDelete () {
      deleteEmailByIds(this.multipleSelection).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$refs['table'].loadPage({})
      })
    },
    loadPage (state) {
      if (state === 'list') {
        this.pageState = 'list'
        this.$refs['table'].loadPage({})
      } else {
        this.pageState = 'detail'
      }
    },
    // 转发
    forward () {
      // 首先判断是否勾选
      if (this.selectList.length !== 1) {
        this.$message.error('请选择且只能选择一条邮件进行转发！')
        return
      }
      this.pageState = 'form'
      getEmailById(this.selectList[0].emailId).then(({data}) => {
        this.forwardFn(data.data, 'list')
      })
    },
    // 查看详情的时候转发
    detailForward (row) {
      this.pageState = 'form'
      this.forwardFn(row, 'detail')
    },
    // 转发
    forwardFn (row, type) {
      this.forwardShow = false
      this.$refs['updateDialog'].resetForm()
      this.$refs['updateDialog'].pageState = 'forward'
      this.$refs['updateDialog'].backOption.isBack = true
      this.$refs['updateDialog'].backType = type
      this.$refs['updateDialog'].formData.content = row.content
      this.$refs['updateDialog'].formData.subject = row.subject
      this.$refs['updateDialog'].formData.transferList = { // 所有的关联
        projectIds: this.dealWithTransferList(row.projectRelatios, [{ O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }]),
        summaryIds: [],
        materialIds: this.dealWithTransferList(row.materialRelatios, [{ O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }]),
        reportIds: [],
      }
      this.$refs['updateDialog'].formData.kind = 2
    },
    // 回复
    // detailReply (row) {
    //   this.pageState = 'form'
    //   this.$refs['updateDialog'].resetForm()
    //   this.$refs['updateDialog'].pageState = 'reply'
    //   this.$refs['updateDialog'].backOption.isBack = true
    //   this.$refs['updateDialog'].formData.receiverList = row
    //   this.$refs['updateDialog'].formData.kind = 1
    // },
    // 回复
    detailReply (row) {
      this.pageState = 'form'
      this.$refs['updateDialog'].resetForm()
      this.$refs['updateDialog'].pageState = 'reply'
      this.$refs['updateDialog'].backOption.isBack = true
      this.$refs['updateDialog'].backType = 'detail'
      this.$refs['updateDialog'].formData.receiverList = row.receiverList
      this.$refs['updateDialog'].formData.content = row.content
      this.$refs['updateDialog'].formData.subject = row.subject
      this.$refs['updateDialog'].formData.transferList = { // 所有的关联
        projectIds: this.dealWithTransferList(row.projectRelatios, [{ O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }]),
        summaryIds: [],
        materialIds: this.dealWithTransferList(row.materialRelatios, [{ O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }]),
        reportIds: [],
      }
      this.$refs['updateDialog'].formData.kind = 1
    },
    dealWithTransferList (row, field) {
      let list = []
      for (let item of row) {
        let obj = {}
        for (let t of field) {
          obj[t.O] = item[t.X]
        }
        list.push(obj)
      }
      return list
    },
  },
}
