<template>
  <el-form size="small" label-width="100px">
    <el-row>
      <el-col :span='12'>
        <el-form-item label="负责人：">
          <iep-contact-multiple-user v-model="form.userRelationCharges" disabled></iep-contact-multiple-user>
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label="需求方：">
          <iep-contact-multiple-user v-model="form.userRelationDemands" disabled></iep-contact-multiple-user>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='12'>
        <el-form-item label="技术经理：">
          <iep-contact-multiple-user v-model="form.userRelationTechnologys" disabled></iep-contact-multiple-user>
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label="产品经理：">
          <iep-contact-multiple-user v-model="form.userRelationProducts" disabled></iep-contact-multiple-user>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
        <el-form-item label="团队成员：">
          <iep-contact-multiple-user v-model="form.userRelationTeams" disabled></iep-contact-multiple-user>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
}
</script>
