<template>
  <gov-layout-main>
    <collapse-form @clear="formInline={}" @search="search()" :showCollapse="false">
      <template slot="search-header">
        <el-form-item label="角色名称">
          <el-input placeholder="请输入角色名称" v-model="formInline.roleName" clearable></el-input>
        </el-form-item>
      </template>
    </collapse-form>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button v-if="roleManager_btn_add" type="primary" icon="el-icon-plus" @click="handleCreate();" class="btn-default">新增</el-button>
      </el-form-item>
    </el-form>
    <crud-table :isStripe="true" align="center" :isLoadTable="isLoadTable" :pagedTable="pagedTable" :columnMap="columnMap">
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <el-button size="mini" type="text" v-if="roleManager_btn_edit" @click="handleUpdate(scope.row);">编辑
            </el-button>
            <el-button size="mini" type="text" v-if="roleManager_btn_del" @click="handleDelete(scope.row);">删除
            </el-button>
            <el-button size="mini" type="text" @click="handlePermission(scope.row);" v-if="roleManager_btn_perm">权限</el-button>
          </div>
        </template>
      </el-table-column>
    </crud-table>

    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :paginationOption="paginationOption"></pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="roleCode">
          <el-input v-model="form.roleCode" placeholder="角色标识"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="form.deptName" placeholder="选择部门" @focus="handleDept()" readonly></el-input>
          <el-input type="hidden" v-model="form.roleDeptId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form');">取 消</el-button>
        <el-button v-if="dialogStatus === 'create'" type="primary" @click="create('form');">确 定</el-button>
        <el-button v-else type="primary" @click="update('form');">修 改</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeptVisible">
      <el-tree class="filter-tree" :data="treeDeptData" :default-checked-keys="checkedKeys" node-key="id" highlight-current ref="deptTree" @node-click="getNodeData" :props="defaultProps" :filter-node-method="filterNode" default-expand-all>
      </el-tree>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogPermissionVisible">
      <el-tree class="filter-tree" :data="treeData" :default-checked-keys="checkedKeys" :check-strictly="false" node-key="id" highlight-current :props="defaultPropsPer" show-checkbox ref="menuTree" :filter-node-method="filterNode" default-expand-all>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePermession(id, roleCode)">更 新</el-button>
      </div>
    </el-dialog>
  </gov-layout-main>
</template>

<script>
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj,
  permissionUpd,
  fetchRoleTree,
  fetchDeptTree,
} from '@/api/umps/role'
import { fetchTree } from '@/api/umps/menu'
import { mapGetters } from 'vuex'
import collapseForm from '@/components/collapse-form'
import CrudTable from '@/components/crud-table'
import paginationMixins from '@/mixins/pagination_mixins'
import waves from '@/directive/waves/index.js' // 水波纹指令
const columnMap = [
  {
    prop: 'id',
    label: '序号',
    width: '120',
  },
  {
    prop: 'roleName',
    label: '角色名称',
    width: 'null',
  },
  {
    prop: 'roleCode',
    label: '角色标识',
    width: null,
  },
  {
    prop: 'roleDesc',
    label: '角色描述',
    width: null,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'time',
  },
]

export default {
  components: { CrudTable,collapseForm },
  mixins: [paginationMixins],
  name: 'table_role',
  directives: {
    waves,
  },
  data () {
    var Verification = (rule, value, callback) => {
      // console.log(value.indexOf(/(^\s*)|(\s*$)/g,1))
      var reg = /(^\s+)|(\s+$)/g
      if(reg.test(value)){
        callback(new Error("不能使用空格"))
      }
      if (!this.checkSpecificKey(value)) {
        callback(new Error("不能使用特殊字符"))
      } else if (value.length <3 ) {
        callback(new Error("长度在三个以上字符"))
      }else{
        callback()
      }
    }
    return {
      formInline: {},
      columnMap,
      pagedTable: [],
      treeData: [],
      treeDeptData: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      defaultPropsPer: {
        children: 'children',
        label: 'label',
      },
      menuIds: '',
      form: {
        roleName: undefined,
        roleCode: undefined,
        roleDesc: undefined,
        deptName: undefined,
        roleDeptId: undefined,
      },
      id: undefined,
      roleCode: undefined,
      rules: {
        roleName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
          {
            validator: Verification, 
            trigger: ['blur','change'],
          },
        ],
        roleCode: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
          {
            validator: Verification, 
            trigger: ['blur','change'],
          },
        ],
        roleDesc: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
          {
            validator: Verification, 
            trigger: ['blur','change'],
          },
        ],
      },
      statusOptions: ['0', '1'],
      rolesOptions: undefined,
      dialogFormVisible: false,
      dialogDeptVisible: false,
      dialogPermissionVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建',
        permission: '分配权限',
      },
      tableKey: 0,
      roleManager_btn_add: false,
      roleManager_btn_edit: false,
      roleManager_btn_del: false,
      roleManager_btn_perm: false,
    }
  },
  created () {
    this.load()
    console.log(this.pagedTable)
    this.roleManager_btn_add = this.permissions['sys_role_add']
    this.roleManager_btn_edit = this.permissions['sys_role_edit']
    this.roleManager_btn_del = this.permissions['sys_role_del']
    this.roleManager_btn_perm = this.permissions['sys_role_perm']
  },
  computed: {
    ...mapGetters(['elements', 'permissions']),
    params () {
      return this.formInline
    },
  },
  methods: {
    async load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      const res = await fetchList({ ...pageOption, ...params })
      const { data } = res
      this.loadTable(data)
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate (row) {
      getObj(row.id).then(response => {
        this.form = response.data
        this.form.deptName = row.deptName
        this.form.roleDeptId = row.roleDeptId
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      })
    },
    handlePermission (row) {
      fetchRoleTree(row.roleCode)
        .then(response => {
          this.checkedKeys = response.data
          return fetchTree()
        })
        .then(response => {
          this.treeData = response.data
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
          this.dialogStatus = 'permission'
          this.dialogPermissionVisible = true
          this.id = row.id
          this.roleCode = row.roleCode
        })
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId (json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter(id => id === item.id))
        }
      }
      return temp
    },
    handleDept () {
      fetchDeptTree().then(response => {
        this.treeDeptData = response.data
        this.dialogDeptVisible = true
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData (data) {
      this.dialogDeptVisible = false
      this.form.roleDeptId = data.id
      this.form.deptName = data.name
    },
    handleDelete (row) {
      this._handleGlobalById(row.id, delObj)
    },
    _handleGlobalById (id, optFunction) {
      // const optName = optNameMap[opt]
      this.$confirm(`此项可能关联用户, 是否继续删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        optFunction(id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: `成功!`,
            })
          } else {
            this.$message({
              type: 'info',
              message: `失败!`,
            })
          }
          this.load()
        })
      })
    },
    create (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then((res) => {
            console.log("res: ", res)
            if (!res.data.data) {
              this.$message.error('存在重复的角色标识，请修改')
            } else {
              this.dialogFormVisible = false
              this.load()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000,
              })
            }
          })
        } else {
          return false
        }
      })
    },
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
      this.$refs["form"].clearValidate()
    },
    // 关闭弹窗
    closeDialog (){
      this.$refs["form"].clearValidate()
    },
    update (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form).then((res) => {
            if (!res.data.data) {
              this.$message.error('存在重复的角色标识，请修改')
            } else {
              this.dialogFormVisible = false
              this.load()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000,
              })
            }
          })
        } else {
          return false
        }
      })
    },
    updatePermession (id, roleCode) {
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
      permissionUpd(id, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        fetchTree()
          .then(response => {
            this.treeData = response.data
            return fetchRoleTree(roleCode)
          })
          .then(response => {
            this.$store.dispatch('GetUserInfo')
            this.checkedKeys = response.data
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000,
            })
          })
      })
    },
    resetTemp () {
      this.form = {
        id: undefined,
        roleName: undefined,
        roleCode: undefined,
        roleDesc: undefined,
      }
    },
    // 校验
    checkSpecificKey (str) {
      var specialKey = "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false
        }
      }
      return true
    },
  },
}
</script>
