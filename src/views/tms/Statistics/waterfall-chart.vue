<template>
  <div class="water-fall-wrapper">
    <h1>常用标签瀑布图</h1>
    <no-data v-if="!commontag.length" style="height: 300px;"></no-data>
    <el-menu v-if="commontag.length" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="item in commontag" :index="item.id+''" :key="item.id">{{item.name}}</el-menu-item>
    </el-menu>
    <waterfall :data="data"></waterfall>
  </div>
</template>

<script>
import waterfall from './waterfall'
import { getTagCommon, getTagRelationList } from '@/api/tms/statistics'
import noData from './no-data'
export default {
  components: { waterfall, noData },
  data () {
    return {
      data: [],
      activeIndex: '1',
      commontag: [],
    }
  },
  created () {
    this.loadCommonTag()
  },
  methods: {
    loadCommonTag () {
      getTagCommon().then(res => {
        this.commontag = res.data
        this.activeIndex = res.data[0].id + ''
        this.loadRelationList(this.activeIndex)
      })
    },
    loadRelationList (id) {
      getTagRelationList(id).then(res => {
        this.data = [...res.data]
        const countArray = this.data.map(m => m.count)
        let sum = 0
        countArray.forEach(element => {
          sum += element
        })
        this.data.push({
          name: '关联总数',
          count: sum,
        })
      })
    },
    handleSelect (index) {
      this.loadRelationList(index)
    },
  },
}
</script>
<style lang="scss" scoped>
.water-fall-wrapper {
  > .el-menu {
    display: flex;
    justify-content: center;
  }
  > .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
}
</style>
