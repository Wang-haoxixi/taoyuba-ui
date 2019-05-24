<template>
  <div class="hobby">
    <iep-no-data v-if="!data.length"></iep-no-data>
    <span v-for="(item) in data" :key="item.commonId" @click="TagsDetail()">
      {{item.commonName}}
    </span>
    <!-- <span>更多...</span> -->
  </div>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    TagsDetail () {
      return
      // this.$router.push({
      //   path: '/app/tags_detail',
      // })
    },
  },
}
</script>
<style scoped lang="scss">
.hobby {
  span {
    display: inline-block;
    padding: 5px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: #666;
    cursor: pointer;
  }
  & span:hover {
    color: #c73e3e;
    border: 1px solid #c73e3e;
  }
}
</style>
