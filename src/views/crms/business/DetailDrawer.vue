<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'商机'+methodName" width="40%" @close="loadPage">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="客户名称：">
        <el-input v-model="formData.clientName" placeholder="客户名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：">
        <el-input v-model="formData.projectName" placeholder="项目名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：">
        <el-tag type="info" class="tag-style" v-for="(item,index) in formData.businessType" :key="index">{{item.commonName}}</el-tag>
      </el-form-item>
      <el-form-item label="意向程度：">
        <a-tag type="info">{{formData.intentionLevelValue}}</a-tag>
      </el-form-item>
      <el-form-item label="商机描述：">
        <span>{{formData.opportunityDes}}</span>
      </el-form-item>
      <el-form-item label="商机标签：">
        <iep-tag-detail v-model="formData.tags"></iep-tag-detail>
      </el-form-item>
      <el-form-item label="发布者：">
        <span>{{formData.publisher}} </span>
      </el-form-item>
      <el-form-item label="发布日期：">
        <span>{{formData.publishDate}}</span>
      </el-form-item>
      <el-form-item label="认领状态：">
        <span>{{formData.statusValue}}</span>
      </el-form-item>
      <el-form-item label="创建状态：">
        <span v-if="formData.isCreate==0">未创建</span>
        <span v-if="formData.isCreate==1">已创建</span>
      </el-form-item>
      <el-form-item label="认领人：" v-if="formData.statusKey == 1">
        <span>{{formData.reciver}}</span>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="claimBusiness" v-if="this.formData.statusKey == 0" v-show="this.userInfo.userId !==this.formData.creatorId">认领</iep-button>
    </template>
  </iep-drawer>
</template>

<script>
import { claimById } from '@/api/crms/business'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formData: {},
      methodName: '',
      drawerShow: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleCancel () {
      this.drawerShow = false
    },
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
    },
    claimBusiness () {
      let claim = {
        opportunityId: this.formData.opportunityId,
        status: this.formData.statusKey,
        creatorId: this.formData.creatorId,
      }
      claimById({ ...claim }).then(res => {
        if (res.status == 200) {
          this.$message.success('认领成功！')
          this.drawerShow = false
          this.$emit('load-page')
        } else {
          this.$message.info(`认领失败，${res.data.msg}`)
        }
      })
    },
    handleGoBack () {
      this.drawerShow = false
    },
  },
}
</script>
<style>
.tag-style {
  margin-right: 10px;
}
</style>
