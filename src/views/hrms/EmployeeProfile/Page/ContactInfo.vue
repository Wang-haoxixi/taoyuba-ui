<template>
  <div>
    <iep-form-item class="form-half" prop="accountTypeId" label-name="户口类型" tip="请务必根据实际情况选择">
      <iep-dict-select v-model="form.accountTypeId" dict-name="hrms_resident_type"></iep-dict-select>
    </iep-form-item>

    <el-form-item label="户籍地址：" prop="residenceAddress">
      <div style="display:flex;">
        <iep-cascader style="flex:1;" v-model="form.residenceCities" prefix-url="admin/city"></iep-cascader>
        <el-input style="flex:3;" v-model="form.residenceAddress"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="现住地址：" prop="currentAddress">
      <div style="display:flex;">
        <iep-cascader style="flex:1;" v-model="form.currentCities" prefix-url="admin/city"></iep-cascader>
        <el-input style="flex:3;" v-model="form.currentAddress"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="身份证号码：" class="form-half" prop="IDCard">
      <el-input v-model="form.IDCard"></el-input>
    </el-form-item>
    <el-form-item label="联系电话：" class="form-half" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="微信：" class="form-half" prop="wechat">
      <el-input v-model="form.wechat"></el-input>
    </el-form-item>
    <el-form-item label="QQ：" class="form-half" prop="qq">
      <el-input v-model="form.qq"></el-input>
    </el-form-item>
    <el-form-item label="邮箱：" class="form-half" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="个人主页：" class="form-half" prop="home">
      <el-input v-model="form.home"></el-input>
    </el-form-item>
    <el-form-item label="应急联系人：" class="form-half" prop="emergencyName">
      <el-input v-model="form.emergencyName"></el-input>
    </el-form-item>
    <el-form-item label="应急联系人电话：" class="form-half" prop="emergencyPhone">
      <el-input v-model="form.emergencyPhone"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    form: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>