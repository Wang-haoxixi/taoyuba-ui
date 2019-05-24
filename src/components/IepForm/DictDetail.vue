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
import { mapGetters } from 'vuex'
export default {
  name: 'IepDictDetail',
  props: {
    value: {
      type: [Array, Number, String],
      required: true,
    },
    dictName: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      valueKey: 'value',
      labelKey: 'label',
      childrenKey: 'children',
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    itemTypes () {
      return this.dictGroup[this.dictName]
    },
    currentLabels () {
      let options = this.itemTypes
      let labels = []
      let inputValue = []
      const value = +this.value
      if (!value.length) {
        inputValue = [value]
      } else {
        inputValue = value
      }
      inputValue.forEach(value => {
        const targetOption = options && options.filter(option => option[this.valueKey] === '' + value)[0]
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
}
</script>
