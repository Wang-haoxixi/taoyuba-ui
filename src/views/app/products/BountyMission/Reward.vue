<template>
  <div class="reward">
    <IepAppListCard :dataList="dataList"></IepAppListCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '突击队招募任务',
      dataList: [
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0'],
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
