<template>
  <div>
    <span v-if="scope.row.auditState !== 4">{{auditStatus[scope.row.auditState]}}</span>
    <el-tooltip v-else placement="top" effect="light">
      <span slot="content" class="warningStatus">驳回理由：<br/>{{ scope.row.rejection | fliter }}</span>
      <span class="warningStatus">{{auditStatus[scope.row.auditState]}}</span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  data (){
    return {

    }
  },
  filters:{
    fliter (val){
      var reg = /[;；]/g
      val = val.replace(reg,"$&\r\n")
      return val
    },
  },
  props: {
    scope: {
      type: Object,
      default: () => { },
    },
    auditStatus: {
      type: Object,
      default: () => { },
    },
  },
}
</script>
<style lang="scss" scoped>
.warningStatus {
  color: red;
  font-weight: bold;
  white-space: pre;
}
</style>