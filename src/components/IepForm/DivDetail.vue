<template>
  <div class="iep-ellipsis" :title="content">
    <slot name="prefix"></slot>
    <span>{{content}}</span>
    <slot></slot>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
export default {
  //TODO: iep-ellipsis 副作用
  name: 'IepDivDetail',
  props: ['value'],
  computed: {
    content () {
      if (validatenull(this.value)) {
        return '暂无'
      } else {
        return this.value
      }
    },
  },
}
</script>
