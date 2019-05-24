<template>
  <div class="abs">
    <div class="contianBox">
      <el-row class="topBot">
        <el-col :span="4">审批状态：{{approvalStatus[form.approvalStatus]}}</el-col>
        <el-col :span="5">申请人：{{form.applicantName}}</el-col>
        <el-col :span="5">申请时间：{{form.applyTime}}</el-col>
        <el-col :span="5">审批人：{{form.approverName}}</el-col>
        <el-col :span="5">审批时间：{{form.approvalTime}}</el-col>
      </el-row>
      <el-row class="bot">
        <el-col :span="12">审批不通过理由：{{form.approvalFailReason}}</el-col>
        <el-col :span="12">指导建议：{{form.guideSugges}}</el-col>
      </el-row>
    </div>
    <approval-contract :data="contractData" :form="form" :author="authorData"></approval-contract>
  </div>
</template>

<script>
import ApprovalContract from './ApprovalContract'
import { getDataDetail } from '@/api/gpms/index'
import { getDetailById } from '@/api/gpms/author'

export default {
  name: 'detail-dialog',
  components: { ApprovalContract },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('close', false)
        },
      },
      contractData: {},
      approvalStatus: {
        '1': '未提交',
        '2': '待审核',
        '3': '审核通过',
        '4': '审核不通过',
      },
      form: {},
      authorData: {},
    }
  },
  methods: {
    open (author, project) {
      // 需要获取到这个项目的详情和项目经理的详情
      getDataDetail(project).then(({data}) => {
        let list = [
          { name: 'applicantName', list: 'applicantList' },
          { name: 'approverName', list: 'approverList' },
          { name: 'inChargeDeptName', list: 'inChargeDeptList' },
          { name: 'coopDeptName', list: 'coopDeptList' },
          { name: 'publisherName', list: 'publisherList' },
          { name: 'relatedClientName', list: 'relatedClientList' },
          { name: 'groupExternalCooperatePartnerName', list: 'groupExternalCooperatePartnerList' },
        ]
        for (let item of list) {
          if (data.data[item.list]) {
            data.data[item.name] = data.data[item.list].name
          } else {
            data.data[item.name] = '无'
          }
        }
        this.form = data.data
      })
      getDetailById(author).then(({data}) => {
        let res = data.data.data
        res.projectManagerName = res.projectManagerList.name
        res.authCompanyName = res.authCompanyList.name
        res.projectManagerName = res.projectManagerList.name
        this.authorData = res
      })
    },
    close () {
      this.$emit('close',false)
    },
  },
}
</script>

<style scoped lang="scss">
  .abs{
    background: #fff;
    .contianBox{
      padding: 20px 25px;
      font-size: 14px;
      margin: 0 20px 15px;
      background-color: #f9f9f9;
      .topBot {
        margin-bottom: 15px;
      }
    }
  }
</style>