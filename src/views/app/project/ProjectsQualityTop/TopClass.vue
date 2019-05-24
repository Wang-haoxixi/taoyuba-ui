<template>
  <el-card class="top-class" shadow="never">
    <div class="top-class-list" v-for="item in items" :key="item.id">
      <span class="numTotal">{{item.numTotal}}<span class="num">{{item.num}}</span>个</span>
      <span class="numProjects">{{item.numProjects}}</span>
      <span class="numNow">{{item.numNow}}</span>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          id: '1',
          numTotal: '项目总数',
          num: '23',
          numProjects: '已建项目19个',
          numNow: '在建项目4个',
        },
        {
          id: '2',
          numTotal: '项目合同',
          num: '23',
          numProjects: '待签项目19个',
          numNow: '',
        },
        {
          id: '3',
          numTotal: '项目软件',
          num: '12',
          numProjects: '咨询项目6个',
          numNow: '其它项目5个',
        },
        {
          id: '4',
          numTotal: '国家及项目',
          num: '12',
          numProjects: '省级项目6个',
          numNow: '市区级项目13个',
        },
        {
          id: '5',
          numTotal: '项目经理',
          num: '5',
          numProjects: '技术类6个',
          numNow: '咨询类17个',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.top-class {
  margin: 25px auto;
  width: 1200px;
  .top-class-list {
    flex: 1;
    margin: 25px 0;
    padding: 0 50px 0 20px;
    border-right: 1px solid #ddd;
    .numTotal,
    .numProjects,
    .numNow {
      display: block;
      line-height: 28px;
    }
    .num {
      margin: 0 5px;
      font-size: 24px;
    }
    &:last-child {
      border-right: 0;
    }
  }
}
</style>
<style scoped>
.top-class >>> .el-card__body {
  display: flex;
  padding: 0;
  justify-content: space-between;
}
</style>
