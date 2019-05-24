<template>
  <el-form size="small" label-width="100px">
    <el-row>
      <el-col :span='16'>
        <el-form-item label="负责人：">
          <iep-contact-multiple-user v-model="form.userRelationCharges" disabled></iep-contact-multiple-user>
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
