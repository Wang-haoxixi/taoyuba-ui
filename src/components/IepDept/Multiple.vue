<template>
  <div class="multiple-box">
    <el-tag type="warning" closable v-for="tag in deptList" :key="tag.id" @close="handleClose(tag)">{{tag.name}}</el-tag>
    <el-popover placement="right" width="300" trigger="click" v-model="dialogShow">
      <el-tree ref="tree" :props="props" :data="deptData" :show-checkbox="showCheckbox" :expand-on-click-node="true" :filter-node-method="filterNodeMethod">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click.stop="() => selectDept(data, node)">
              选择
            </el-button>
          </span>
        </span>
      </el-tree>
      <iep-button slot="reference">选择</iep-button>
    </el-popover>
  </div>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepDeptMultiple',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
      deptData: [],
    }
  },
  watch: {
    deptList: {
      handler: function (newVal) {
        this.$refs.tree.filter(newVal)
      },
      deep: true,
    },
  },
  computed: {
    deptList: {
      get: function () { return this.value },
      set: function (value) { this.$emit('input', value) },
    },
    deptIds: function () { return this.deptList.map(m => m.id) },
  },
  created () {
    getCommonList('admin/dept').then(({ data }) => {
      this.deptData = data.data
    })
  },
  methods: {
    handleClose (tag) {
      const newData = this.deptList.filter(item => item.id !== tag.id)
      this.deptList = newData
    },
    filterNodeMethod (value, data) {
      if (!value) return true
      return !this.deptIds.includes(data.value)
    },
    selectDept (data) {
      if (!this.deptIds.includes(data.value)) {
        this.deptList.push({
          id: data.value,
          name: data.label,
        })
      }
      this.dialogShow = false
    },
  },
}
</script>
<style scoped>
.multiple-box > .el-tag {
  margin-right: 5px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>