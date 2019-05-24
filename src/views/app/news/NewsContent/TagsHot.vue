<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">{{title}}</span>
    </div>
    <el-tag v-for="tag in tagList" :key="tag.id" class="item" type="white">
      {{tag.name}}
    </el-tag>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      title: '热门标签',
      tagList: [
        {
          name: '产品设计',
        },
        {
          name: '项目管理',
        },
        {
          name: '原型设计',
        },
        {
          name: '平台规划',
        },
        {
          name: '互联网+政务服务',
        },
        {
          name: '大数据',
        },
        {
          name: '人工智能',
        },
        {
          name: '区块链',
        },
        {
          name: '知识图谱',
        },
        {
          name: 'DIPS',
        },
        {
          name: '战略合作',
        },
      ],
    }
  },
}
</script>

<style lang="css" scoped>
.el-card {
  border: 0;
}
.el-card >>> .el-card__header {
  padding-top: 0;
}
.el-card >>> .el-card__body {
  padding: 20px 0;
}

.item {
  margin-right: 15px;
  margin-bottom: 18px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.5s;
}

.item:hover {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>