<template>
  <el-date-picker :valueFormat="valueFormat" :editable="false" v-bind="$attrs" v-on="$listeners" :picker-options="pickerOptions"  type="datetime">
  </el-date-picker>
</template>
<script>
export default {
  name: 'TimeSelector',
  inheritAttrs: false,
  data () {
    return {
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      pickerOptions:{
        disabledDate (time) {
            return time.getTime() > Date.now()
          },
      },
    }
  },
}
</script>
<style lang="css" scoped>
.el-date-editor >>> span {
  box-sizing: content-box;
}
</style>