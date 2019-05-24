<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>

      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>

      <iep-form-item class="form-half" prop="levaeType" label-name="请假类型" tip="根据实际情况选择">
        <iep-dict-select v-model="form.levaeType" dict-name="hrms_levae_type"></iep-dict-select>
      </iep-form-item>

      <el-form-item label="请假时长：" class="form-half">
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
        <el-input v-model="form.duration" disabled placeholder="请选择请假时间段"></el-input>
      </el-form-item>

      <iep-form-item class="form-half" prop="startTime" label-name="开始时间" tip="请假实际开始时间，例如5月12日8：30">
        <iep-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </iep-form-item>

      <iep-form-item class="form-half" prop="endTime" label-name="结束时间" tip="请假实际结束时间，例如5月12日17：30">
        <iep-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" @change="endChange(form.endTime)"></iep-date-picker>
      </iep-form-item>

      <iep-form-item prop="reason" label-name="申请理由" tip="因xxxx原因需请假x天，望领导批准。">
        <iep-input-area v-model="form.reason"></iep-input-area>
      </iep-form-item>

      <iep-form-item prop="approver" label-name="审批人" tip="1、一天以内由直属领导审批（含1天）；<br/>2、二天以内由部门班长审批（含2天）；<br/>3、三天及以上总经理（郑总）审批（含3天）。">
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
  data () {
    return {
    }
  },
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
<style scoped>
.el-form-item__content span {
  display: inline-block;
}
</style>
