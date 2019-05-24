<template>
  <div>
    <template v-if="type==='matter'&&scope.row.isChild===2 && scope.row.auditState === 3 && [1,2].includes(scope.row._level)">
      <el-button @click="handleAddChild(scope.row)" type="text" size="small" class="matter-button">{{addChildNameMap[scope.row._level-1]}}</el-button>
    </template>
    <template v-if="[1,4].includes(scope.row.auditState)">
      <el-button @click="handleSubmit(scope.row)" type="text" size="small" class="matter-button">提交</el-button>
    </template>
    <template v-if="[1,2,3,4,5].includes(scope.row.auditState)">
      <el-button @click="handleView(scope.row)" type="text" size="small" class="matter-button">详情</el-button>
    </template>
    <template v-if="[1,4].includes(scope.row.auditState)">
      <el-button @click="handleEdit(scope.row)" type="text" size="small" class="matter-button">编辑</el-button>
    </template>
    <template v-if="[1,2,3,4].includes(scope.row.auditState)">
      <el-button @click="handleDelete(scope.row)" type="text" size="small" class="matter-button">删除</el-button>
    </template>
    <template v-if="[3].includes(scope.row.auditState)">
      <el-button v-if="scope.row._level == 1 || !scope.row._level" @click="handlePublish(scope.row)" type="text" size="small" class="matter-button">发布</el-button>
    </template>
    <template v-if="type==='matter' && scope.row.isTmpl===1 && scope.row.auditState===5 && [1].includes(scope.row._level)">
      <el-button @click="handleTemplate(scope.row)" type="text" size="small" class="matter-button">设为模板</el-button>
    </template>
    <!-- <template v-if="type==='matter'">
      <a-divider type="vertical" />
      <el-button @click="handleCancelTemplate(scope.row)" type="text" size="small" :disabled="!(scope.row.isTmpl===2 && scope.row.auditState===5)">取消模板</el-button>
    </template> -->
  </div>
</template>
<script>
export default {
  props: {
    scope: {
      type: Object,
      default: () => { },
    },
    type: {
      type: String,
      default: 'matter',
    },
  },
  data () {
    return {
      addChildNameMap: ['添加子项', '添加办理项'],
    }
  },
  methods: {
    handleAddChild (row) {
      this.$emit('add-child', row)
    },
    handleSubmit (row) {
      this.$emit('submit', row)
    },
    handleView (row) {
      console.log(this.scope)
      this.$emit('view', row)
    },
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('delete', row)
    },
    handlePublish (row) {
      this.$emit('publish', row)
    },
    handleTemplate (row) {
      this.$emit('template', row)
    },
    handleCancelTemplate (row) {
      this.$emit('cancel-template', row)
    },
  },
}
</script>
 <style lang="scss" scoped>
.matter-button {
  border-right: 1px solid rgb(216, 215, 215);
  padding: 2px 0;
  margin: 0px;
  padding-right: 5px;
  margin-right: 5px;
  &:last-child {
    border-right: none;
  }
}
</style>
