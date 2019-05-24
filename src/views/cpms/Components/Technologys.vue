<template>
  <div>
    <iep-no-data v-if="!form.technologyRelations.length" message="暂无关联技术"></iep-no-data>
    <div v-else class="module" v-for="(item) in form.technologyRelations" :key="item.id">
      <div class="img">
        <iep-img :src="item.imageUrl" alt=""></iep-img>
      </div>
      <div class="module-title iep-ellipsis">{{item.name}}</div>
    </div>
  </div>
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

<style lang="scss" scoped>
.module {
  width: 150px;
  height: 150px;
  margin-right: 40px;
  display: inline-block;
  padding: 10px 25px;
  border: 1px solid #ccc;
  position: relative;
  .clear {
    position: absolute;
    right: 10px;
    .icon-shanchu1 {
      font-size: 12px !important;
      padding: 4px;
      border: 1px solid #ccc;
      border-radius: 50%;
    }
  }
  .img {
    padding: 5px;
    img {
      width: 88px;
      height: 88px;
      padding: 0;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }
  }
  .module-title {
    width: 100%;
    padding-top: 10px;
    text-align: center;
  }
}
</style>
