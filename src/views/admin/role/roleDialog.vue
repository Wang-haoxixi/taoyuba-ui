<template>
  <gov-dialog 
    ref="formDialog" 
    @open="handleOpen"
    title="分配权限"
    isBtnGroup
    :btnGroup="btnGroup"
    @closed="handleClosed"
    @handleUpdate="handleUpdate"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <el-tree 
          v-loading="loading"
          class="filter-tree" 
          :data="treeData" 
          :default-checked-keys="checkedKeys" 
          :check-strictly="false" 
          node-key="id" 
          highlight-current 
          :props="defaultPropsPer" 
          show-checkbox 
          ref="menuTree" 
          :filter-node-method="filterNode" 
          default-expand-all>
        </el-tree>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import { fetchTree } from '@/api/umps/menu'
import {fetchRoleTree, permissionUpd} from '@/api/umps/role'
import {cloneDeep} from 'lodash'
export default {
  mixins: [mixin],
  data () {
    return {
      loading: false,
      treeData: [],
      checkedKeys: [],
      defaultPropsPer: {
        children: 'children',
        label: 'label',
      },
      btnGroup: [
        {
          label: '更新',
          fn: 'handleUpdate',
          type: 'primary',
        },
        {
          label: '取消',
          fn: 'handleCancel',
          type: 'default',
        },
      ],
    }
  },
  created () {
    this.getTreeAll()
  },
  methods: {
    handleOpen () {
      this.getPressiomByRole()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getTreeAll () {
      fetchTree().then(({data}) => {
        this.treeData = data
      })
    },
    // 根据权限查找对应数据
    getPressiomByRole () {
      console.log('this.temp', this.temp)
      fetchRoleTree(this.temp.roleCode).then(({data}) => {
        this.checkedKeys = data
      })
    },
    handleUpdate () {
      let result = {
        roleId: this.temp.id,
        menuIds: this.checkedKeys.join(','),
      }
      this.loading = true
      permissionUpd(result.roleId, result.menuIds).then(() => {
        this.loading = false
        this.close()
        this.$store.dispatch('GetUserInfo')
        this.$emit('success')
      })
    },
    handleClosed () {
      this.checkedKeys = cloneDeep([])
      console.log('this.checkedKeys', this.checkedKeys)
    },
  },
}
</script>
