<template>
  <div class="contract-box">
    <basic-container>
      <div style="display: flex">
        <page-header title="课程项目" style="flex: 1" ></page-header>
        <el-button size="mini" style="width: 60px; height:35px" @click="$router.push('/article_spa/class_list')">返回</el-button>
      </div>
      <el-table
        :data="lessonList"
        :header-cell-style="{background:'#eef1f6', color:'#606266'}"
        stripe
        style="width: 100%; margin-top: 30px">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>  
</template>
<script>
import { getLessonPage } from '@/api/train/lesson'
export default {
  data () {
    return {
      lessonList: [],
      total: 10,
      params: {
        current: 1,
        size: 10,
        trainId: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '课程名称',
            value: 'title',
          },
          {
            text: '开始时间',
            value: 'lessonStart',
          },
          {
            text: '结束时间',
            value: 'lessonEnd',
          },
          {
            text: '创建时间',
            value: 'createTime',
          },
        ],
      },
    }
  }, 
  created () {
    this.getData()
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    getData () {
      this.params.trainId = this.$route.params.id
      getLessonPage(this.params).then(data => {
        this.lessonList = data.data.data.records
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>