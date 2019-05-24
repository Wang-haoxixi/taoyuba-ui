<template>
  <div class="business">
    <ve-map :data="chartData" height="630px"></ve-map>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chartData: {
        columns: ['位置', '数据服务', '软件服务', '基础服务'],
        rows: [
          { '位置': '吉林', '数据服务': 123, '软件服务': 123, '基础服务': 92134 },
          { '位置': '北京', '数据服务': 1223, '软件服务': 2123, '基础服务': 29234 },
          { '位置': '上海', '数据服务': 2123, '软件服务': 1243, '基础服务': 94234 },
          { '位置': '浙江', '数据服务': 4123, '软件服务': 5123, '基础服务': 29234 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.business {
  padding: 20px;
  height: 630px;
  margin: 20px 0;
  border: 1px solid #eee;
}
</style>
