<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in dictGroup[this.dictName]" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IepDictSelect',
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
