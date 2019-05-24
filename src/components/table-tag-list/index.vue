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
    <!-- <el-tag :type="`${listData ? 'success' : 'danger'}`" v-text="`${listData ? '正常' : '异常'}`"></el-tag> -->
    <span v-text="`${listData ? '正常' : '异常'}`"></span>
  </div>
  <!-- 系统TAG状态 -->
  <div v-else-if="type === 'TAGSTATUS'">
    <!-- <el-tag :type="`${listData ? 'success' : 'danger'}`" v-text="`${listData ? '启用' : '待审核'}`" size="small"></el-tag> -->
    <span v-text="`${listData ? '启用' : '待审核'}`"></span>
  </div>
  <!-- 系统TAG状态 -->
  <div v-else-if="type === '所属分类'">
    {{所属分类NAME}}
  </div>
</template>

<script>
export default {
  props: ['listData', 'type'],
  computed: {
    所属分类NAME () {
      let category = []
      if (!this.listData) {
        return ''
      }
      if (this.type === '所属分类') {
        category.push(this.listData.name)
        if (this.listData.parentVo) {
          category.push(this.listData.parentVo.name)
          if (this.listData.parentVo.parentVo) {
            category.push(this.listData.parentVo.parentVo.name)
            if (this.listData.parentVo.parentVo.parentVo) {
              category.push(this.listData.parentVo.parentVo.parentVo.name)
            }
          }
        }
      }
      return category.reverse().join('-')
    },
  },
}
</script>
