<template>
  <div class="label">
    <div v-for="(item,index) in dataList" :key="index" class="piece">
      {{typeof item === 'object' ? item[name] : item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppLabelCard',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    name: {
      type: String,
      default: 'name',
    },
  },
}
</script>
<style lang="scss" scoped>
.label{
  .piece{
    padding: 2px 5px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    float: left;
    margin: 7px 5px;
    color: #333;
    transition-duration: 0.3s;
    &:hover{
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
      cursor: pointer;
    }
  }
}
</style>
