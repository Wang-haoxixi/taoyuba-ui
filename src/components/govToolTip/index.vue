<template>
   <div>
     <template v-if="tooltip">
      <el-tooltip 
        class="gov-tool-tip" 
        :effect="effect" 
        :content="content" 
        :placement="placement">
        <span class="gov-tool-tip-style" :class="status ? `tool-tip-style-${status}` : ''">
          <slot></slot>
        </span>
      </el-tooltip>
     </template>
     <template v-else>
       <slot></slot>
     </template>
   </div>
</template>
<script>
export default {
  name: 'GovToolTip',
  props: {
    tooltip:{
      type: Boolean,
      default: false,
    },
    effect: {
      type: String,
      default: 'dark',
    },
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top-start',
    },
    status: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped lang="scss">
  .gov-tool-tip-style {
    display: inline-block;
    &.tool-tip-style-error {
      color: #ff0000;
    }
    &.tool-tip-style-success {
      color: #67C23A
    }
    &.tool-tip-style-primary {
      color: #409EFF;
    }
  }
</style>
