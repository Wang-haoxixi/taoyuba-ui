<template>
  <!-- 系统用户角色字段TAG -->
  <div v-if="type === 'SYSUSERROLELIST'">
    <el-tag v-for="(item, index) in listData" :key="index">{{
      item.roleName
      }}</el-tag>
    <el-tag v-if="!listData.length">暂无产品经理</el-tag>
  </div>
  <!-- 系统日志类型字段TAG -->
  <div v-else-if="type === 'SYSLOGTYPEDICT'">
    <el-tag :type="`${listData ? 'success' : 'danger'}`" v-text="`${listData ? '正常' : '异常'}`"></el-tag>
  </div>
  <!-- 系统TAG状态 -->
  <div v-else-if="type === 'TAGSTATUS'">
    <el-tag :type="`${listData ? 'success' : 'danger'}`" v-text="`${listData ? '启用' : '待审核'}`" size="small"></el-tag>
  </div>
  <!-- 系统TAG状态 -->
  <div v-else-if="type === '所属分类'">
    {{所属分类NAME}}
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: [Array, String, Number],
      require: true,
      default: () => [],
    },
    type: {
      type: String,
      require: true,
      default: '',
    },
  },
  computed: {
    所属分类NAME () {
      if (!this.listData.length) {
        return '无'
      }
      return this.listData.join('；')
    },
  },
}
</script>
