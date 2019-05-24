
<template>
  <div class="related-materials">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <IepAppListCard :dataList="form.materialRelations.map(m => m.name)"></IepAppListCard>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
      title: '相关材料',
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.related-materials {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
}
</style>
<style scoped>
</style>
