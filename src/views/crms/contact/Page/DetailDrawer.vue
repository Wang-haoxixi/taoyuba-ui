<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'联系人详情'" width="40%" @close="loadPage">
    <el-form :model="detailForm" class="form-detail" label-width="100px" size="small">
      <el-form-item label="联系人姓名：" class="form-half">
        <span>{{detailForm.contactName}}</span>
      </el-form-item>
      <el-form-item label="联系人职务：" class="form-half">
        <span>{{detailForm.contactPosition}}</span>
      </el-form-item>
      <el-form-item label="电话：" class="form-half">
        <span>{{detailForm.telephoneNo}}</span>
      </el-form-item>
      <el-form-item label="手机：" class="form-half">
        <span>{{detailForm.cellphone}}</span>
      </el-form-item>
      <el-form-item label="对应客户：">
        <a-tag class="tags" v-for="(item,index) in detailForm.clientInfos" :key="index">{{item.clientName}}</a-tag>
      </el-form-item>
      <el-form-item label="传真：" class="form-half">
        <span>{{detailForm.fax}}</span>
      </el-form-item>
      <el-form-item label="QQ：" class="form-half">
        <span>{{detailForm.qq}}</span>
      </el-form-item>
      <el-form-item label="微信：" class="form-half">
        <span>{{detailForm.wechat}}</span>
      </el-form-item>
      <el-form-item label="邮箱：" class="form-half">
        <span>{{detailForm.email}}</span>
      </el-form-item>
      <el-form-item label="地址：">
        <span>{{detailForm.address}}</span>
      </el-form-item>
      <el-form-item label="客户关注：">
        <span>{{detailForm.clientConcern}}</span>
      </el-form-item>
      <el-form-item label="其他：">
        <span>{{detailForm.other}}</span>
      </el-form-item>
    </el-form>
  </iep-drawer>
</template>
<script>
export default {
  data () {
    return {
      drawerShow: false,
      detailForm: {},
    }
  },
  methods: {
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
    },
  },
}
</script>
<style scoped>
.form-half span {
  display: inline-block;
}
</style>
