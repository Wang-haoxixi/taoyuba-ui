<template>
  <el-input v-model="dept.name" placeholder="请选择一个部门" readonly>
    <el-popover slot="append" placement="right" width="300" trigger="click" v-model="dialogShow">
      <el-tree :props="props" :data="deptData" :show-checkbox="showCheckbox" @node-click="selectDept"></el-tree>
      <iep-button slot="reference">选择</iep-button>
    </el-popover>
  </el-input>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepDeptSelect',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
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
  computed: {
    dept: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  created () {
    getCommonList('admin/dept').then(({ data }) => {
      this.deptData = data.data
    })
  },
  methods: {
    selectDept (data) {
      this.dept = {
        id: data.value,
        name: data.label,
      }
      this.dialogShow = false
    },
  },
}
</script>
