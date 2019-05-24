<template>
  <div class="add-tags">
    <span v-for="(item) in pagedTable" :key="item.tagId" @click="TagsDetail(item)">
      {{item.name+'('+ item.refers +')'}}
    </span>
    <iep-pagination @current-change="handleCurrentChange" :pagination-option="pagination" :page-sizes="[10, 20, 30, 40]" layout="prev, next" :pager-count="5" prev-text="上一页" next-text="下一页" background></iep-pagination>
  </div>
</template>
<script>
import { getIndexPage } from '@/api/tms/tag'
function pageOption () {
  return {
    page: 1,
    limit: 100,
  }
}
export default {
  props: ['descs'],
  data () {
    return {
      pagedTable: [],
      isLoadTable: true,
      pagination: pageOption(),
      pageOption: pageOption(),
      searchForm: {},
    }
  },
  created () {
    this.loadPage()
  },
  watch: {
    descs () {
      this.loadPage()
    },
  },
  methods: {
    searchPage (param) {
      this.pageOption = pageOption()
      this.searchForm = param
      this.loadPage(param)
    },
    async loadPage (param = this.searchForm) {
      this.loadTable({ ...param, descs: this.descs }, getIndexPage)
    },
    loadTable (param, requestFn) {
      this.isLoadTable = true
      requestFn({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, size, total, current } = data.data
        const isBug = total / size + 1 === current
        if (isBug && total !== 0) {
          this.searchPage() // 防止分页为空页的情况
        } else {
          this.pagination = { current, size, total }
        }
        this.pagedTable = records
        this.isLoadTable = false
      })
    },
    handleCurrentChange (val) {
      this.pageOption.page = val
      this.loadPage()
    },
    TagsDetail (row) {
      this.$router.push({
        path: `/app/tags_detail/${row.tagId}`,
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
