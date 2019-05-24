<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>

      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>

      <iep-form-item class="form-half" prop="startTime" label-name="开始时间" tip="请务必精确到几点几分">
        <iep-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </iep-form-item>

      <iep-form-item class="form-half" prop="endTime" label-name="结束时间" tip="请务必精确到几点几分">
        <iep-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" @change="endChange(form.endTime)"></iep-date-picker>
      </iep-form-item>

      <iep-form-item class="form-half" prop="busTripDistrict" label-name="出差地点" tip="请务必精确市区，如舟山市定海区">
        <el-input v-model="form.busTripDistrict"></el-input>
      </iep-form-item>

      <el-form-item label="出差时长：" class="form-half">
        <el-input v-model="form.duration" disabled></el-input>
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
      </el-form-item>

      <iep-form-item prop="reason" label-name="申请理由" tip="请务必说明出差对象+出差类型，如北京政务服务中心商务洽谈。">
        <iep-input-area v-model="form.reason"></iep-input-area>
      </iep-form-item>

      <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item>

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
import { initNow } from '../options'
export default {
  mixins: [mixins],
  methods: {
    loadSelf () {
      this.fnSelf().then(({ data }) => {
        this.form = this.selfToVo(data.data)
        this.form.startTime = initNow()
      })
    },
    handlePublish () {
    },
  },
}
</script>
