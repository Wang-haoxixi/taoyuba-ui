<template>
  <el-cascader :placeholder="placeholder" :options="dictGroup[this.dictName]" v-bind="$attrs" v-on="$listeners">
  </el-cascader>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IepDictCascader',
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    dictName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
}
</script>
