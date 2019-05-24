<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud :option="tableOption" :data="list" ref="crud" :page="page" v-model="form" :table-loading="listLoading" :before-open="handleOpenBefore" @on-load="getList" @search-change="handleFilter" @refresh-change="handleRefreshChange" @row-update="update" @row-save="create">
        <template slot="menuLeft">
          <el-button class="filter-item" @click="handleCreate" size="small" type="primary" icon="el-icon-edit">添加
          </el-button>
        </template>
        <template slot="dsScopeForm">
          <div v-if="form.dsType == 1">
            <el-tree class="filter-tree" :data="dsScopeData" :check-strictly="true" node-key="id" highlight-current :props="defaultProps" ref="scopeTree" :default-checked-keys="checkedDsScope" show-checkbox>
            </el-tree>
          </div>
        </template>

        <template slot="menu" slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row, scope.index)">编辑
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row, scope.index)">删除
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-plus" @click="handlePermission(scope.row, scope.index)">权限
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="分配权限" :visible.sync="dialogPermissionVisible">
      <el-tree class="filter-tree" :data="treeData" :default-checked-keys="checkedKeys" :check-strictly="false" node-key="id" highlight-current :props="defaultProps" show-checkbox ref="menuTree" :filter-node-method="filterNode" default-expand-all>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePermession(roleId, roleCode)">更 新
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchList,
  fetchRoleTree,
  permissionUpd,
  putObj,
} from '@/api/admin/role'
import { tableOption } from './role'
import { fetchTree } from '@/api/admin/dept'
import { fetchMenuTree } from '@/api/admin/menu'
import { mapGetters } from 'vuex'

export default {
  name: 'TableRole',
  data () {
    return {
      tableOption: tableOption,
      dsScopeData: [],
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      defaultProps: {
        label: 'name',
        value: 'id',
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      menuIds: '',
      list: [],
      listLoading: true,
      form: {},
      roleId: undefined,
      roleCode: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false,
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    getList (page, params) {
      this.listLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      ).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleRefreshChange () {
      this.getList(this.page)
    },
    handleFilter (param) {
      this.page.page = 1
      this.getList(this.page, param)
    },
    handleCreate () {
      this.$refs.crud.rowAdd()
    },
    handleOpenBefore (show) {
      fetchTree().then(response => {
        this.dsScopeData = response.data.data
        if (this.form.dsScope) {
          this.checkedDsScope = this.form.dsScope.split(',')
        } else {
          this.checkedDsScope = []
        }
      })
      show()
    },
    handleUpdate (row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handlePermission (row) {
      fetchRoleTree(row.roleId)
        .then(response => {
          this.checkedKeys = response.data
          return fetchMenuTree()
        })
        .then(response => {
          this.treeData = response.data.data
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(
            this.treeData,
            this.checkedKeys,
            []
          )
          this.dialogStatus = 'permission'
          this.dialogPermissionVisible = true
          this.roleId = row.roleId
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
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData (data, done) {
      done()
    },
    handleDelete (row, index) {
      var _this = this
      this.$confirm(
        '是否确认删除名称为"' + row.roleName + '"' + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(function () {
          return delObj(row.roleId)
        })
        .then(() => {
          this.getList(this.page)
          this.list.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
        })
        .catch(function () { })
    },
    create (row, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(',')
      }
      addObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$message({
            message: '创建成功',
            type: 'success',
          })
        })
        .catch(() => {
          loading()
        })
    },
    update (row, index, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(',')
      }
      putObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$message({
            message: '修改成功',
            type: 'success',
          })
        })
        .catch(() => {
          loading()
        })
    },
    updatePermession (roleId) {
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree
        .getCheckedKeys()
        .join(',')
        .concat(',')
        .concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
      permissionUpd(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        fetchMenuTree()
          .then(response => {
            this.form = response.data.data
            return fetchRoleTree(roleId)
          })
          .then(response => {
            this.checkedKeys = response.data
            this.$message({
              message: '修改成功',
              type: 'success',
            })
          })
      })
    },
  },
}
</script>
