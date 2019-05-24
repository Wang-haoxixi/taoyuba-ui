<template>
  <el-dialog :visible.sync="dialogVisible">
    <el-tree class="filter-tree" :data="treeData" :default-checked-keys="checkedKeys" :check-strictly="false" node-key="id" highlight-current :props="defaultPropsPer" show-checkbox ref="menuTree" :filter-node-method="filterNode" default-expand-all>
    </el-tree>
    <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="updatePermession(id)">更 新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { projectMenu, getProjectRole, updateRoleMenu } from '@/api/projectManagement/projectRole'
export default {
  data () {
    return {
      dialogVisible: false,
      treeData: [],
    }
  },
  methods: {
    open (row) {
      this.dialogVisible = true
      this.handlePermission(row)
    },
    handlePermission (row) {
      var params = {id:100} 
      getProjectRole({roleCode:row.roleCode})
        .then(response => {
          this.checkedKeys = response.data
          return projectMenu(params)
        })
        .then(response => {
          this.treeData = response.data
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
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
    updatePermession (id) {
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree.getCheckedKeys(false).concat(this.$refs.menuTree.getHalfCheckedKeys())
      

      updateRoleMenu({roleId: id, menuIdList: this.menuIds}).then(({data}) => {
        if (data.code === 0) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000,
          })
          this.dialogVisible = false
        } else {
          this.$notify({
            title: '失败',
            message: '修改失败',
            type: 'error',
            duration: 2000,
          })
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
