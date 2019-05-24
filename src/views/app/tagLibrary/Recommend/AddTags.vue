<template>
  <div class="add-tags">
    <span v-for="(item) in tags" :key="item.id" @click="TagsDetail(item)">
      {{item.name+'('+ item.refers +')'}}
    </span>
  </div>
</template>
<script>
import { getWeekTags } from '@/api/tms/tag'
export default {
  data () {
    return {
      tags: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getWeekTags()
      this.tags = data.data
    },
    TagsDetail (row) {
      this.$router.push({
        path: `/app/tags_detail/${row.id}`,
      })
    },
  },
}
</script>
<style scoped lang="scss">
.add-tags {
  span {
    display: inline-block;
    padding: 5px 12px;
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
