<template>
  <div class="recommend-tags">
    <span v-for="(item) in tags[selectIdx]" :key="item.id" @click="TagsDetail(item)">
      {{item.name+'('+ item.refers +')'}}
    </span>
  </div>
</template>
<script>
import chunk from 'lodash/chunk'
import { getRecTags } from '@/api/tms/tag'
export default {
  data () {
    return {
      tags: [],
      selectIdx: 0,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getRecTags()
      this.tags = chunk(data.data, 20)
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
.recommend-tags {
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
