<template>
  <div class="about-task">
    <div class="task-nav">
      <span class="navTitle">我的合同</span>
      <nav-tab :nav-list="dataList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData" @on-detail="handleDetail"></nav-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavTab from './NavTab'
import NavContent from './contractContent'
import { getContractList } from '@/api/tmlms/contract/index'
// import { getUserInfo } from '@/api/login'
const detailUrlMap = {
  approval: '/hrms_spa/approval_detail',
  instruction: '/mlms_spa/email/detail',
}
export default {
  components: { NavTab, NavContent },
  data () {
    return {
      showClass: 0,
      navName: 'instruction',
      contentData: [],
      dataList: [
        {
          subtitle: '劳务合同',
          type: 'instruction',
          id: 0,
        },
        {
          subtitle: '交易合同',
          type: 'approval',
          id: 3,
        },
      ],
      content: [],
      hrms_to_approval: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.tab(this.navName)
    this.hrms_to_approval = this.permissions['hrms_to_approval']
    if (this.hrms_to_approval) {
      this.dataList = [this.dataList[0]]
    }
  },
  methods: {
    handleDetail (row) {
      const path = detailUrlMap[row.type] || false
      if (!path) {
        return
      }
      this.$router.push({
        path: `${detailUrlMap[row.type]}/${row.id}`,
      })
    },
    tab (val) {
      // getUserInfo().then((data) => {
        let userId = ''
        let params = {}
        userId = JSON.parse(localStorage.getItem('user')).sysUser.userId             
        if (userId === 1) {
          params = {size:5}
        } else {
          params = {size:5, userId:userId}
        }
        getContractList(params).then(({ data }) => {
          this.contentData = data.data.records.map(m => {
            return {
              ...m,
              type: val,
            }
          })
        })
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.about-task {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .task-nav {
    display: flex;
    align-items: center;
    .navTitle {
      font-size: 16px;
      padding-right: 20px;
      color: #000;
    }
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: #0185d8;
    }
  }
}
</style>
