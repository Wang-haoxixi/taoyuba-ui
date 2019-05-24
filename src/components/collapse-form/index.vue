<template>
  <div>
    <el-form :inline="true" size="small">
      <slot name="search-header"></slot>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" class="btn-default">搜索</el-button>
        <el-button @click="handleClear" class="btn-default">重置</el-button>
        <el-button v-if="showCollapse" :icon="collapseIcon" @click="showFormInline = !showFormInline">{{collapseName}}</el-button>
      </el-form-item>
      <br />
      <el-collapse-transition>
        <div v-show=" showFormInline">
          <slot name="search-body"></slot>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'collapseForm',
  props: {
    showCollapse: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      showFormInline: false,
    }
  },
  computed: {
    collapseIcon () {
      return this.showFormInline ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    collapseName () {
      return this.showFormInline ? '收起' : '展开'
    },
  },
  methods: {
    handleClear () {
      this.$emit('clear')
    },
    handleSearch () {
      this.$emit('search')
    },
  },
}
</script>
