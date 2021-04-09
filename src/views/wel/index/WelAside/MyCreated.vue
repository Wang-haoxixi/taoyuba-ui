<template>
  <div class="created">
    <div class="title">我要创建</div>
    <div class="created-content">
      <div :class="{frame: item.isFrame}" v-for="(item,index) in dataList" :key="index" @click="item.callback">{{item.title}}</div>
      <div class="add"><i class="el-icon-plus"></i></div>
    </div>
    <new-approval ref="NewApproval"></new-approval>
  </div>
</template>
<script>
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
// import { getUserInfo } from '@/api/login'
export default {
  components: { NewApproval },
  data () {
    return {
      dataList: [
        {
          title: '招聘',
          isFrame: false,
          callback: () => {
            // this.$router.push('/hrms_spa/recruit_list')
            if (!this.roleIds.includes(105)) {
              this.$router.push('/hrms_spa/recruit_list')
            } else if (this.roleIds.includes(108)) {
              this.$router.push('/hrms_spa/recruit_list')
            }
          },
        },
        {
          title: '简历',
          isFrame: false,
          callback: () => {
            // this.$router.push('/hrms_spa/resume_list')
            if (!this.roleIds.includes(108)) {
              this.$router.push('/hrms_spa/resume_list')
            } else if (this.roleIds.includes(105)) {
              this.$router.push('/hrms_spa/resume_list')
            }
          },
        },
        {
          title: '工作',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '合同',
          isFrame: false,
          callback: () => {
            this.$router.push('/tmlms_spa/contract_list')
          },
        },
        {
          title: '台账',
          isFrame: false,
          callback: () => {
            // this.$router.push('/empty/empty')
            if (!(this.roleIds.includes(105) || this.roleIds.includes(108))) {
              this.$router.push('/empty/empty')
            }
          },
        },
        {
          title: '代办',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '培训',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '教材',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '考试',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '邮件',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
        {
          title: '说说',
          isFrame: false,
          callback: () => {
            this.$router.push('/empty/empty')
          },
        },
      ],
      roleIds: [],
      isRouter: true,
    }
  },
  created (){
    // getUserInfo().then(res =>{
      this.roleIds = JSON.parse(localStorage.getItem('user')).roles
      this.dataList.map(m => {
        // 105船员 108船东
        if (m.title === '招聘' && this.roleIds.includes(105)) {
          m.isFrame = true
        }
        if (m.title === '招聘' && this.roleIds.includes(108)) {
          m.isFrame = false
        }
        if (m.title === '简历' && this.roleIds.includes(108)) {
          m.isFrame = true
        }
        if (m.title === '简历' && this.roleIds.includes(105)) {
          m.isFrame = false
        }
        if (m.title === '台账' && (this.roleIds.includes(105) || this.roleIds.includes(108))) {
          m.isFrame = true
        }
      })
    // })
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

<style scoped>
.frame {
  background: repeating-radial-gradient(#8E8E8E, transparent 150px);
}
</style>



