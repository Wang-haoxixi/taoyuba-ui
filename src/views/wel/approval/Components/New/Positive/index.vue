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
      <el-form-item label="转正时间：" class="form-half">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          调入岗位
          <iep-tip content="请选择想要调整的对应岗位"></iep-tip>
          ：
        </div>
        <iep-cascader v-model="form.transferPosition" prefix-url="hrms/post_type"></iep-cascader>
      </el-form-item>
      <el-form-item prop="reason">
        <span slot="label">
          申请理由
          <iep-tip content="建议从工作业绩结果描述，价值观，工作态度和技能，个人优势和不足等几方面描述"></iep-tip>
          ：
        </span>
        <iep-input-area v-model="form.reason"></iep-input-area>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          附件
          <iep-tip content="可上传近期工作相关文档"></iep-tip>
          ：
        </div>
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item>
      <el-form-item prop="approver">
        <span slot="label">
          审批人
          <iep-tip content="请务必选择所属部门（组织）班长审批，谢谢！"></iep-tip>
          ：
        </span>
        <iep-contact-multiple-user v-model="form.approver" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          抄送人
          <iep-tip content="请务必抄送所属部门人力和财务，谢谢！"></iep-tip>
          ：
        </div>
        <iep-contact-multiple-user v-model="form.cc" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </el-form-item>
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
