<template>
  <gov-layout-main>
    <collapse-form @clear="formInline={}" @search="search()" :showCollapse="false">
      <template slot="search-header">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="formInline.username" maxlength="15"></el-input>
        </el-form-item>
      </template>
    </collapse-form>
    <el-form :inline="true" size="small">
      <el-form-item>
        <gov-button type="add" permission="sys_user_add" @click="handleClick();"></gov-button>
      </el-form-item>
    </el-form>
    <crud-table :isStripe="true" align="center" :isLoadTable="isLoadTable" :pagedTable="pagedTable" :columnMap="columnMap" width='600px'>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <gov-button @click="handleClick(scope.row);" permission="sys_user_edit" type="text" size="small">编辑</gov-button>
          <gov-button @click="handleDeleteById(scope.row);" permission="sys_user_del" type="text" size="small">删除</gov-button>
        </template>
      </el-table-column>
    </crud-table>

    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :paginationOption="paginationOption"></pagination>

    <form-dialog :dialogShow="dialogShow" :title="textMap+'用户'" @close="dialogShow=false" width="50%" :isNeedConfirm="false">
      <el-form :model="userForm" label-width="120px" ref="userForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" @blur="checkName" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item v-if="!isEdit" label="密码" prop="newpassword1">
          <el-input type="password" v-model="userForm.newpassword1"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="userForm.deptName" placeholder="选择部门" @focus="handleDept()" readonly></el-input>
          <input type="hidden" v-model.number="userForm.deptId" />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select class="filter-item" v-model="userForm.role" placeholder="请选择" multiple>
            <el-option v-for="item in transedRolesOptions" :key="item.id" :label="item.roleName" :value="item.id">
              <span style="float: left">{{ item.roleName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="text-right">
          <el-button type="primary" @click="handleSubmit('userForm');">保存</el-button>
        </el-form-item>
      </el-form>
    </form-dialog>

    <el-dialog :title="textMap" :visible.sync="dialogDeptVisible">
      <el-tree
        class="filter-tree"
        :data="treeDeptData"
        :default-checked-keys="checkedKeys"
        check-strictly
        node-key="id"
        highlight-current
        ref="deptTree"
        :props="defaultProps"
        @node-click="getNodeData"
        default-expand-all>
      </el-tree>
    </el-dialog>
  </gov-layout-main>
</template>

<script>

import { deptRoleList, fetchDeptTree, checkName } from '@/api/umps/role'
import collapseForm from '@/components/collapse-form'
import CrudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import { userInfoConfig } from './const/index'

import {
  getUserPage,
  getUserById,
  putUser,
  postUser,
  deleteUser,
  // UserVerification,
} from '@/api/umps/user'

export default {
  components: {
    CrudTable,
    collapseForm,
  },
  mixins: [dialogMixins, paginationMixins],
  data () {
    return {
      ...userInfoConfig,
      userForm: this.initUserForm(),
      rolesOptions: [],
      treeDeptData: [],
      checkedKeys: [],
      formInline: {},
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    textMap () {
      return this.isEdit ? '编辑' : '创建'
    },
    transedRolesOptions (){
      //!isDisabled[item.isDeleted]
      let newRolesOptions = []
      let options = this.rolesOptions
      for(let item of options){
        if(!this.isDisabled[item.isDeleted]){
          newRolesOptions.push(item)
        }
      }
      return newRolesOptions
    },
  },
  created () {
    this.load()
  },
  methods: {
    checkName () {
      if (this.userForm.username !== '' && this.userForm.username !== this.checkUsernameState.const) {
        checkName({username: this.userForm.username}).then((res) => {
          this.checkUsernameState.state = res.data.data
          if (!this.checkUsernameState.state) {
            this.$message.error('用户名重复，请修改')
          }
        })
      } else if (this.userForm.username == this.checkUsernameState.const) {
        this.checkUsernameState.state = true
      }
    },
    async load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      this.dialogShow = false
      const res = await getUserPage({ ...params, ...pageOption })
      const { data } = res
      this.loadTable(data)
    },
    handleDeleteById (row) {
      this._handleGlobalById(row.id, deleteUser)
    },
    getNodeData (data) {
      this.dialogDeptVisible = false
      this.userForm.deptId = data.id
      this.userForm.deptName = data.name
      this.userForm.role = []
      this.userForm.roleList = []
      deptRoleList(data.id).then(response => {
        this.rolesOptions = response.data
      })
    },
    handleDept () {
      fetchDeptTree().then(response => {
        // console.log(response.data)
        this.treeDeptData = response.data
        this.dialogDeptVisible = true
      })
    },
    _initUserRole () {
      this.userForm.role = this.userForm.roleList.map(m => m.id)
    },
    handleClick (rows) {
      this.checkUsernameState = {
        state: true,
        const: '',
      }
      if (rows === undefined) {
        this.isEdit = false
        this.userForm = this.initUserForm()
        this.dialogShow = true
      } else {
        this.checkUsernameState.const = rows.username
        this.isEdit = true
        getUserById(rows.id).then(response => {
          this.userForm = this.initUserForm()
          this.userForm = { ...this.userForm, ...response.data }
          this._initUserRole()
          deptRoleList(response.data.deptId).then(response => {
            this.rolesOptions = response.data
            this.dialogShow = true
          })
        })
      }
    },
    handleSubmit (formName) {
      if (!this.checkUsernameState.state) {
        this.$message.error('用户名重复，请修改')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            // UserVerification(this.userForm.username).then((res)=>{
              // console.log(res)
              putUser(this.userForm).then((res) => {
                console.log(res)
                this.load()
              })
            // }).catch(()=>{
              // console.log("Error1")
            // })
          } else {
            // UserVerification(this.userForm.username).then((res)=>{
              // console.log(res)
              postUser(this.userForm).then((res) => {
                console.log(res)
                this.load()
              })
            // }).catch(()=>{
              // console.log("Error2")
            // })
          }
          this.$emit('hideDialog', false)
        } else {
          return false
        }
      })
    },
    //初始化UserForm
    initUserForm () {
      return {
        username: '',
        role: [],
      }
    },
  },
}
</script>
