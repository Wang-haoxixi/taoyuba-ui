<template>
  <iep-dialog :dialog-show="dialogShow" title="表头设置" width="800px" @close="dialogShow=false">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group class="grid-checkbox-wrapper" v-model="checkedHeader" @change="handleCheckedHeaderChange">
      <el-checkbox v-for="column in columnsOptions" :label="column" :key="column">{{column}}</el-checkbox>
    </el-checkbox-group>
    <template slot="footer">
      <iep-button type="primary" @click="save()">保存</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  props: {
    defaultColumnsLabel: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      checkAll: false,
      columnsMap: [],
      checkedHeader: this.defaultColumnsLabel,
      isIndeterminate: true,
    }
  },
  computed: {
    columnsOptions () {
      return this.columnsMap.map(m => m.label)
    },
  },
  methods: {
    save () {
      this.dialogShow = false
      this.$emit('save', this.checkedHeader)
    },
    handleCheckAllChange (val) {
      this.checkedHeader = val ? this.columnsOptions : []
      this.isIndeterminate = false
    },
    handleCheckedHeaderChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.columnsOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columnsOptions.length
    },
  },
}
</script>
<style lang="scss" scoped>
.grid-checkbox-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
