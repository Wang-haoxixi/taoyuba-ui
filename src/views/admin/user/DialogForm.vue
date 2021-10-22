<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="500px" @close="loadPage" @slot-mounted="load">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled" :rules="rules">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" :disabled="status !== 'create'"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="realName">
        <el-input v-model="form.realName" :disabled="status !== 'create'"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone" v-if="status === 'create'">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="配置角色：" prop="role">
        <el-select v-model="form.roleList" multiple placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配置区域：" v-if="roles.indexOf(1) > -1" prop="orgIds">
        <el-select v-model="form.orgIds" multiple placeholder="请选择">
          <el-option v-for="item in orgList" :key="item.orgId" :label="item.name" :value="item.orgId">
          </el-option>
        </el-select>
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
import { fetchList as getOrgPage } from '@/api/admin/org'
import { fetchList as getRolePage } from '@/api/admin/role'
export default {
  props: {
    loadImage: {
      type: String,
    },
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号不正确'))
      } else {
        callback()
      }
    }
    return {
      dialogShow: false,
      disabled: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initMemberForm(),
      orgNames: [],
      rolesOptions: [],
      roleList: [],
      orgList: [],
      status: 'update',
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        orgIds: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'roles',
    ]),
  },
  methods: {
    handleCancelAsset () {
      this.form.assetOrgId = 0
    },
    handleSetAsset (row) {
      this.form.assetOrgId = row.id
      // console.log(row.id)
    },
    load () {
      // getRoleOrgList().then(({ data }) => {
      //   const roleList = data.data.map(m => {
      //     return {
      //       label: m.roleName,
      //       value: m.roleId,
      //     }
      //   })
      //   this.roleList = [
      //     { value: 1, label: '超级管理员', disabled: true },
      //     { value: 2, label: '游客权限', disabled: true },
      //     { value: 3, label: '组织成员', disabled: true },
      //     ...roleList,
      //   ]
      // })
      this.getRoleList()
      this.getOrgList()
    },
    getOrgList () {
      getOrgPage({
        current: 1,
        size: 100,
      }).then(({ data }) => {
        if (data.code === 0) {
          this.orgList = data.data.records
        }
      })
    },
    getRoleList () {
      getRolePage({
        current: 1,
        size: 100,
      }).then(({ data }) => {
        if (data.code === 0) {
          let arr = data.data.records
          if (arr && arr.length > 0) {
            let result = []
            arr.forEach((item) => {
              // if (!(item.roleId === 114 || item.roleId === 3 || item.roleId === 1)) {
              //   let obj = {
              //     label: item.roleName,
              //     value: item.roleId,
              //   }
              //   result.push(obj)
              // }
                if (!(item.roleId === 1 ||item.roleId === 114)) {
                let obj = {
                  label: item.roleName,
                  value: item.roleId,
                }
                result.push(obj)
              }
            })
            this.roleList = result
            // console.log(this.roleList)
          }
        }
      })
    },
    loadPage () {
      this.form = initMemberForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
       this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn({
            phone: this.status === 'create' ? this.form.phone : undefined,
            username: this.status === 'create' ? this.form.username : undefined,
            realName: this.status === 'create' ? this.form.realName : undefined,
            userId: this.status === 'create' ? undefined : this.form.userId,
            role: this.form.roleList,
            password: this.status === 'create' ? '123456' : undefined,
            orgIds: this.roles.indexOf(1) > -1 ? this.form.orgIds : [],
          }).then(({ data }) => {
            if (data.data) {
              this.$message.success('修改成功')
              this.loadPage()
            } else {
              this.$message(data.msg)
            }
          })
        }
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
