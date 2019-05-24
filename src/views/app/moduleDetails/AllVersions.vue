
<template>
  <div class="all-versions">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <versions :form="form"></versions>
  </div>
</template>
<script>
import Versions from '@/views/cpms/Components/Versions'
export default {
  props: ['form'],
  components: { Versions },
  data () {
    return {
      title: '全部版本',
    }
  },
}
</script>
<style lang="scss" scoped>
.all-versions {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
  .title {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    color: #333;
  }
}
</style>
<style scoped>
</style>
