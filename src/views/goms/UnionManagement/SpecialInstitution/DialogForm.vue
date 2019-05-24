<template>
  <iep-dialog class="dialog-con" :dialog-show="dialogShow" :title="`${methodName}成员信息`" width="500px" @close="loadPage" @slot-mounted="load">
    <div class="avatar" style="text-align: center;margin-bottom:20px;">
      <iep-img-avatar :size="128" :src="form.avatar"></iep-img-avatar>
    </div>
    <el-form :model="form" ref="form" size="small" label-width="100px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="form.realName" disabled></el-input>
      </el-form-item>
      <el-form-item label="配置角色：" prop="role">
        <el-select v-model="form.roleList" multiple placeholder="请选择">
          <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input v-model="form.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属组织：" prop="orgNames">
        <li v-for="item in form.orgNames" :key="item">{{item}}</li>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">保存</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initMemberForm } from './options'
import { getRoleOrgList, updateGomsUser } from '@/api/admin/org'
export default {
  props: {
    loadImage: {
      type: String,
    },
  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initMemberForm(),
      orgNames: [],
      rolesOptions: [],
      roleList: [],
    }
  },
  methods: {
    load () {
      getRoleOrgList().then((res) => {
        this.roleList = res.data.data
      })
    },
    loadPage () {
      this.form = initMemberForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      updateGomsUser({
        userId: this.form.userId,
        role: this.form.roleList,
      }).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>
<style scoped>
</style>