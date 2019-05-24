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
  props: {
    currentValue: {
      type: [Array, Number],
      required: true,
    },
    dictName: {
      type: String,
      required: false,
      default: 'MAT_ITEM_TYPE',
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
    ...mapGetters(['dicList']),
    itemTypes () {
      return this.dicList[this.dictName]
    },
    currentLabels () {
      let options = this.itemTypes
      let labels = []
      let inputValue = []
      if (!this.currentValue.length) {
        inputValue = ['' + this.currentValue]
      } else {
        inputValue = this.currentValue
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
