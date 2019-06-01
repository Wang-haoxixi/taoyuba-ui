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
          title: '招聘',
          callback: () => {
            this.$router.push('/hrms_spa/recruit_list')
          },
        },
        {
          title: '简历',
          callback: () => {
            this.$router.push('/hrms_spa/resume_list')
          },
        },
        {
          title: '工作',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '合同',
          callback: () => {
            this.$router.push('/tmlms_spa/contract_list')
          },
        },
        {
          title: '台账',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '代办',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '培训',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '教材',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '考试',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '邮件',
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '说说',
          callback: () => {
            this.$router.push('/empty/empty')
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
      color: #0185d8;
    }
  }
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
</style>


