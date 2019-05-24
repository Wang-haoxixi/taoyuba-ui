<template>
  <div class="tag-group-wrapper">
    <h1>本周新增</h1>
    <p>本区域只显示前20条数据，更多请转到<span class="link" @click="open('标签列表')">标签列表页</span>查看</p>
    <no-data v-if="!data.length" style="height: 300px;"></no-data>
    <div v-if="data.length" class="tag-wrapper">
      <el-tag size="medium" :type="item.type" v-for="(item) in data" :key="item.id">{{item.name}}</el-tag>
    </div>
  </div>
</template>
<script>
import { getTagWeekNew } from '@/api/tms/statistics'
import noData from './no-data'
const colorMap = ['primary', 'success', 'info', 'warning', 'primary']
export default {
  components: { noData },
  data () {
    return {
      data: [],
    }
  },
  created () {
    this.loadWeekNew()
  },
  methods: {
    open (name) {
      this.$router.push({
        name,
      })
    },
    loadWeekNew () {
      getTagWeekNew().then(res => {
        this.data = res.data.map(m => {
          m.type = colorMap[m.id % colorMap.length]
          return m
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-group-wrapper {
  height: 300px;
  p {
    .link {
      color: #409eff;
      cursor: pointer;
      &:hover {
        text-decoration-line: underline;
      }
    }
    color: #888;
    font-size: 14px;
  }
  .tag-wrapper {
    padding: 20px 20px;
    > .el-tag {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
