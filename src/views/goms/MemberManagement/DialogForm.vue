<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}成员信息`" width="500px" @close="loadPage" @slot-mounted="load">
    <div class="avatar" style="text-align: center;margin-bottom:20px;">
      <iep-img-avatar :size="128" :src="form.avatar"></iep-img-avatar>
    </div>
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="form.realName" disabled></el-input>
      </el-form-item>
      <el-form-item label="配置角色：" prop="role">
        <el-select v-model="form.roleList" multiple placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input v-model="form.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属组织：" prop="orgNames">
        <li v-for="item in form.orgNames" :class="{isAsset: item.id === form.assetOrgId}" :key="item.id">{{item.name}}
          <a-tag v-if="item.id === form.assetOrgId && userInfo.orgId===item.id" @click="handleCancelAsset()">取消</a-tag>
          <a-tag v-if="form.assetOrgId===0 && userInfo.orgId===item.id" @click="handleSetAsset(item)">设置为资产所属</a-tag>
        </li>
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
import { mapGetters } from 'vuex'
import { initMemberForm } from './options'
import { getRoleOrgList } from '@/api/admin/org'
export default {
  props: {
    loadImage: {
      type: String,
    },
  },
  data () {
    return {
      dialogShow: false,
      disabled: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initMemberForm(),
      orgNames: [],
      rolesOptions: [],
      roleList: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleCancelAsset () {
      this.form.assetOrgId = 0
    },
    handleSetAsset (row) {
      this.form.assetOrgId = row.id
      console.log(row.id)
    },
    load () {
      getRoleOrgList().then(({ data }) => {
        const roleList = data.data.map(m => {
          return {
            label: m.roleName,
            value: m.roleId,
          }
        })
        this.roleList = [
          { value: 1, label: '超级管理员', disabled: true },
          { value: 2, label: '游客权限', disabled: true },
          { value: 3, label: '组织成员', disabled: true },
          ...roleList,
        ]
      })
    },
    loadPage () {
      this.form = initMemberForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn({
        userId: this.form.userId,
        role: this.form.roleList,
        assetOrg: this.form.assetOrgId,
      }).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
