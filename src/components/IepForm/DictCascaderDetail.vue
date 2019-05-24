<template>
  <span>
    <template v-for="(label, index) in currentLabels">
      {{ label }}
      <span v-if="index < currentLabels.length - 1" :key="index"> / </span>
    </template>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IepDictCascaderDetail',
  props: {
    value: {
      type: [Array, Number],
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
    ...mapGetters(['dictGroup']),
    itemTypes () {
      return this.dictGroup[this.dictName]
    },
    currentLabels () {
      let options = this.itemTypes
      let labels = []
      let inputValue = []
      if (!this.value.length) {
        inputValue = ['' + this.value]
      } else {
        inputValue = this.value
      }
      inputValue.forEach(value => {
        const targetOption = options && options.filter(option => option[this.valueKey] === value)[0]
        if (targetOption) {
          labels.push(targetOption[this.labelKey])
          options = targetOption[this.childrenKey]
        }
      })
      return labels
    },
  },
}
</script>
