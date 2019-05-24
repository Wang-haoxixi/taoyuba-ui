<template>
  <div class="input-wrapper">
    <el-input :placeholder="placeholder" prefix-icon="el-icon-search" size="small" @keyup.enter.native="handleSearch" v-model="input" :maxlength="20">
      <iep-button class="search-btn" slot="append" @click="handleSearch">搜索</iep-button>
    </el-input>
    <el-popover v-if="advanceSearch" placement="bottom-end" width="350" trigger="click">
      <slot></slot>
      <iep-button class="senior-btn el-icon-arrow-down" slot="reference"></iep-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'OperationSearch',
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字进行搜索',
    },
    prop: {
      type: String,
      default: 'name',
    },
    advanceSearch: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      input: '',
      form: {},
    }
  },
  methods: {
    handleSearch () {
      this.form[this.prop] = this.input
      this.$emit('search-page', this.form)
    },
  },
}
</script>
<style scoped>
.input-wrapper {
  display: flex;
  max-width: 350px;
}
.input-wrapper > * {
  margin-right: 5px;
}
.input-wrapper >>> .el-input.is-active .el-input__inner {
  border-color: #c0c4cc;
}
.input-wrapper >>> .el-input__inner:focus {
  border-color: #c0c4cc;
}
.input-wrapper >>> .senior-btn {
  margin-left: -6px;
  padding: 9px 5px;
  border-radius: 0 3px 3px 0;
}
.input-wrapper >>> .el-input-group {
  width: inherit;
}
.search-btn:hover,
.search-btn:focus {
  opacity: 0.8;
}
</style>
