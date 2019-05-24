<template>
  <div class="download">
    <IepAppListCard :dataList="list"></IepAppListCard>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  data () {
    return {}
  },
}
</script>
<style lang="scss" scoped>
</style>


