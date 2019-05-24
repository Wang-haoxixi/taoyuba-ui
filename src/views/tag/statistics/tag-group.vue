<template>
  <div class="tag-group-wrapper">
    <h1>本周新增</h1>
    <p>本区域只显示前20条数据，更多请转到<span class="link" @click="open('标签列表')">标签列表页</span>查看</p>
    <div class="tag-wrapper">
      <el-tag size="medium" :type="item.type" v-for="(item) in data" :key="item.id">{{item.name}}</el-tag>
    </div>
  </div>
</template>
<script>
import { getTagWeekNew } from '@/api/tms/statistics'
const colorMap = ['primary', 'success', 'info', 'warning', 'danger']
export default {
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
  height: 250px;
  h1 {
    font-size: 20px;
  }
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
    /deep/ .el-tag {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
