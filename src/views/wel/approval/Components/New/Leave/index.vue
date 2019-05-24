<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>

      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>

      <el-form-item label="入职时间：" class="form-half">
        <span>{{form.startTime}}</span>
      </el-form-item>

      <el-form-item label="岗位名称：" class="form-half">
        <span>{{form.positionName}}</span>
      </el-form-item>

      <iep-form-item prop="endTime" label-name="离职时间" tip="请根据劳动法规定填写：离职时间为提出申请的一个月后，谢谢！">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </iep-form-item>

      <iep-form-item prop="reason" label-name="申请理由" tip="请说明离职的原因，同事的合作情况，对公司的意见建议等内容">
        <iep-input-area v-model="form.reason"></iep-input-area>
      </iep-form-item>

      <iep-form-item prop="annex" label-name="附件" tip="请上传详细的离职申请书">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </iep-form-item>

      <iep-form-item prop="approver" label-name="审批人" tip="请务必选择所属部门（组织）班长审批，谢谢！">
        <iep-contact-multiple-user v-model="form.approver" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </iep-form-item>

      <iep-form-item prop="cc" label-name="抄送人" tip="请务必抄送所属部门人力和财务，谢谢！">
        <iep-contact-multiple-user v-model="form.cc" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </iep-form-item>

      <el-form-item label="">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
        </operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mixins from '../mixins'
export default {
  mixins: [mixins],
  methods: {
    loadSelf () {
      this.fnSelf().then(({ data }) => {
        this.form = this.selfToVo(data.data)
      })
    },
    handlePublish () {
    },
  },
}
</script>