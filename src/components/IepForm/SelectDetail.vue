<template>
  <label>
    <span>
      <template v-for="(label, index) in currentLabels">
        {{ label }}
        <span v-if="index < currentLabels.length - 1" :key="index"> / </span>
      </template>
    </span>
  </label>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepSelectDetail',
  props: {
    value: {
      type: [Array, Number, String],
      required: true,
    },
    prefixUrl: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      valueKey: 'value',
      labelKey: 'label',
      childrenKey: 'children',
      itemTypes: [],
    }
  },
  computed: {
    currentLabels () {
      let options = this.itemTypes
      let labels = []
      let inputValue = []
      const v = +this.value
      if (!v.length) {
        inputValue = [v]
      } else {
        inputValue = v
      }
      inputValue.forEach(value => {
        const targetOption = options && options.filter(option => option[this.valueKey] === value)[0]
        if (targetOption) {
          labels.push(targetOption[this.labelKey])
          options = targetOption[this.childrenKey]
        }
      })
      if (!labels.length) {
        return '无'
      }
      return labels
    },
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getCommonList(this.prefixUrl).then(({ data }) => {
        this.itemTypes = data.data
      })
    },
  },
}
</script>
