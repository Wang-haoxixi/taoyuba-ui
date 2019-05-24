<template>
  <el-select v-model="deptId" :placeholder="placeholder">
    <el-option v-for="(item,index) in deptAll" :key="index" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
// import { mapGetters } from 'vuex'
import {getDept} from '@/util/dic'

// const deptAll = getDept()
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '请选择实施机构',
    },
  },
  data () {
    return {
      deptAll: getDept(),
      deptId: this.value || null,
    }
  },
  computed: {
    // ...mapGetters(['deptAll']),
  },
  watch: {
    deptId (n) {
      this.$emit('input', n)
    },
    value (n) {
      this.deptId = n
    },
  },
}
</script>
