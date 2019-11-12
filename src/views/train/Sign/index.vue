<template>
  <basic-container>
    <page-header title="签到信息"></page-header>
    <div style="float:right">
       <el-button style="margin-bottom: 10px" size="small" v-if="this.mangner === true || this.institution === true" @click="$router.push('/article_spa/class_list')">返回</el-button>
       <el-button style="margin-bottom: 10px"  size="small" v-else @click="$router.push('/article_spa/myClass_list')">返回</el-button>
    </div>
    <el-table
      :data="signList"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item,index) in options.columns"
        :key="index"
        :prop="item.value"  
        :label="item.text"
      >
      </el-table-column>
    </el-table>
  </basic-container>
</template>
<script>
import { getSignPage } from '@/api/train/sign'
import { getUserInfo } from '@/api/login'
export default {
  data () {
    return {
      signList: [],
      options: {
        expandAll: false,
        columns: [
          {
            text: '开班名称',
            value: 'trainTitle',
          },
          {
            text: '签到地点',
            value: 'signPlace',
          },
          {
            text: '签到时间',
            value: 'createTime',
          },
        ],
      },
      mangner: false,
      institution: false,
      uid: '',
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.uid = await getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(111) === -1) {
          this.mangner = false
        } else {
          this.mangner = true
        }
        if (res.data.data.roles.indexOf(110) === -1) {
          this.institution = false
        } else {
          this.institution = true
        }
        return res.data.data.sysUser.userId
      })
      if (this.mangner === true) {
        getSignPage({ trainId: this.$route.params.id }).then(data => {
          this.signList = data.data.data.records
        })
      } else if (this.institution === true) {
        getSignPage({ agentId: this.uid, trainId: this.$route.params.id }).then(data => {
          this.signList = data.data.data.records
        })
      } else {
        getSignPage({ userId: this.uid, trainId: this.$route.params.id }).then(data => {
          this.signList = data.data.data.records
        })
      }
    },
  },
}
</script>