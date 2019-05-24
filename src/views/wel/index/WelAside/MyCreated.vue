<template>
  <div class="created">
    <div class="title">我要创建</div>
    <div class="created-content">
      <div class="handelCreate" v-for="(item,index) in dataList" :key="index" @click="item.callback">{{item.title}}</div>
      <div class="add"><i class="el-icon-plus"></i></div>
    </div>
    <new-approval ref="NewApproval"></new-approval>
  </div>
</template>
<script>
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  components: { NewApproval },
  data () {
    return {
      dataList: [
        {
          title: '纪要',
          callback: () => {
            this.$router.push('/mlms_spa/summary/create')
          },
        },
        {
          title: '报表',
          callback: () => {
            this.$router.push('/wel/material/report')
          },
        },
        {
          title: '材料',
          callback: () => {
            this.$router.push('/wel/material/datum')
          },
        },
        {
          title: '任务',
          callback: () => {
            this.$message.success('功能开发中')
          },
        },
        {
          title: '审批',
          callback: () => {
            this.$refs['NewApproval'].dialogShow = true
          },
        },
        {
          title: '建议',
          callback: () => {
            this.$router.push('/hrms_spa/suggestion_new')
          },
        },
        {
          title: '感想',
          callback: () => {
            this.$message.success('功能开发中')
          },
        },
        {
          title: '邮件',
          callback: () => {
            this.$router.push('/wel/mail/new')
          },
        },
        {
          title: '考试',
          callback: () => {
            this.$message.success('功能开发中')
          },
        },
        {
          title: '调研',
          callback: () => {
            this.$message.success('功能开发中')
          },
        },
        {
          title: '建模',
          callback: () => {
            this.$message.success('功能开发中')
          },
        },
      ],
    }
  },
  methods: {
    //创建标签事件
    handelCreate () {

    },
    //+添加事件
    handelAdd () {

    },
  },
}
</script>
<style  lang="scss" scoped>
.created {
  box-sizing: border-box;
  margin: 10px;
}
.created-content {
  display: grid;
  grid-template-columns: auto auto auto auto;
  text-align: center;
  background: #ececec;
  grid-gap: 1px;
  color: #666;
  div {
    padding: 10px 0;
    font-size: 14px;
    background-color: #fafafa;
    cursor: pointer;
    &:hover {
      color: #cb132d;
    }
  }
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
</style>


