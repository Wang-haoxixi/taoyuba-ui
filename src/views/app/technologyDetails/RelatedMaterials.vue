
<template>
  <div class="related-materials">
    <div class="title">
      <div>相关材料</div>
    </div>
    <iep-no-data v-if="!form.materialRelations.length"></iep-no-data>
    <IepAppListCard :dataList="form.materialRelations.map(m => m.name)"></IepAppListCard>
  </div>
</template>
<script>
export default {
  props: ['form'],
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
