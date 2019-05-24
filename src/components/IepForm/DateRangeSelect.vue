<template>
  <div>
    <el-tooltip :disabled="value===''" effect="dark" :content="showValue" placement="top">
      <el-date-picker v-if="!disabled" v-model="formatValue" type="monthrange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM" value-format="yyyy-MM" :size="size" :editable="false" :clearable="false"></el-date-picker>
    </el-tooltip>
    <div v-if="disabled">{{showValue}}</div>
  </div>
</template>
<script>
export default {
  name: 'IepDateRangeSelect',
  props: {
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  computed: {
    showValue () {
      return this.formatValue.join('至')
    },
    formatValue: {
      get: function () {
        // ''
        // '2018-08-31,2018-09-31'
        if (this.value === '') {
          return []
        }
        return this.value.split(',')
      },
      set: function (v) {
        if (v.length === 0) {
          this.$emit('input', '')
        }
        this.$emit('input', v.join(','))
      },
    },
  },
}
</script>
