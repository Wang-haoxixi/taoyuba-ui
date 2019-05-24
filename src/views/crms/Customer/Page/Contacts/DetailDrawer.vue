<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'联系人'+methodName" width="40%" @close="loadPage">
    <el-form :model="form" label-width="120px" size="small" :disabled="true">
      <el-row>
        <el-col :span=12>
          <el-form-item label="联系人姓名：">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="联系人职务：">
            <el-input v-model="form.contactPosition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="电话：">
            <el-input v-model="form.telephoneNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="手机：">
            <el-input v-model="form.cellphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span=12>
          <el-form-item label="传真：">
            <el-input v-model="form.fax"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="QQ：">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="微信：">
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址：">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="客户关注：">
        <el-input type="textarea" v-model="form.clientConcern"></el-input>
      </el-form-item>
      <el-form-item label="其他：">
        <el-input type="textarea" v-model="form.other"></el-input>
      </el-form-item>
    </el-form>
  </iep-drawer>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      drawerShow: false,
      methodName: '',
      form: initForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.drawerShow = false
      this.$emit('load-page')
    },
  },
}
</script>

