<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="methodName+'联系人'" width="40%" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="formName" label-width="130px" size="small">
      <el-row>
        <el-col :span='12'>
          <el-form-item prop="contactName">
            <span slot="label">
              联系人姓名
              <iep-tip :content="tipContent.contactName"></iep-tip>
              :
            </span>
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item prop="contactPosition">
            <span slot="label">
              联系人职务
              <iep-tip :content="tipContent.contactPosition"></iep-tip>
              :
            </span>
            <el-input v-model="form.contactPosition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="电话:" prop="telephoneNo">
            <el-input v-model="form.telephoneNo" placeholder="座机（区号+号码）"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="手机:" prop="cellphone">
            <el-input v-model="form.cellphone" placeholder="常用手机号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span='12'>
          <el-form-item label="传真:" prop="fax">
            <el-input v-model="form.fax" placeholder="区号+号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="QQ:" prop="qq">
            <el-input v-model="form.qq" placeholder="qq号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="微信:" prop="wechat">
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="form.email" placeholder="常用邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址:" prop="address">
        <el-input v-model="form.address" placeholder="详细地址"></el-input>
      </el-form-item>
      <el-form-item prop="clientConcern">
        <span slot="label">
          客户关注
          <iep-tip :content="tipContent.clientConcern"></iep-tip>
          :
        </span>
        <el-input type="textarea" v-model="form.clientConcern"></el-input>
      </el-form-item>
      <el-form-item label="其他:" prop="other">
        <el-input type="textarea" v-model="form.other"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="loadPage()">取消</iep-button>
      <iep-button type="primary" @click="submitForm('formName')">提交</iep-button>
    </template>
  </iep-drawer>
</template>
<script>
import { initForm, rules } from './options'
const tipContent = {
  contactName: '请务必填写真实联系人姓名，与⾝份证信息⼀致，切记出现张主任等',
  contactPosition: '请务必准确填写该联系人在其单位/企业所担任的职务',
  clientConcern: '请简明扼要说明该联系人对合作中所关注的方面，如项目进度管理',
}
export default {
  data () {
    return {
      tipContent,
      drawerShow: false,
      methodName: '',
      formRequestFn: () => { },
      form: initForm(),
      id: '',
      clientContactId: '',
      rules,
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.drawerShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.form.clientIds = [this.id]
      this.form.clientContactId = this.clientContactId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.$emit('async')
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

