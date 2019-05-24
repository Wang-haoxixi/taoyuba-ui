<template>
  <k-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    @close="handleCloseDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <form-layout>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <avue-form-detail v-model="form" :option="column.detailOption"></avue-form-detail>
        </div>
      </template>
      <template v-else>
        <avue-form ref="form" :option="formOption" v-model="form">
        </avue-form>
      </template>
    </form-layout>
    <!-- <slot name="body"></slot> -->
  </k-dialog>
</template>
<script>
import kDialog from '@/components/dialog'
import mixin from '@/mixins/mixin'
import {setAvueData} from '@/util/setData'
export default {
  name: 'dialog',
  mixins: [mixin],
  components: {kDialog},
  data () {
    return {
      avueOption: {},
    }
  },
  props: {
    status: {
      type: String,
      default: 'create',
    },
    column: {
      type: Object,
      default () {
        return {
          detailOption: [],
          formOption: [],
        }
      },
    },
    form: {
      type: Object,
      default () {
        return {}
      },
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    data: {
      type: Array,
      default () {
        return []
      },
    },
  },
  methods: {
    getData () {
      this.avueOption = setAvueData({data: this.data})
    },
    // 打开
    openDialog () {
      this.$refs.dialog.open()
    },
    // 关闭
    closeDialog () {
      this.$refs.dialog.close()
    },
    // 提交
    handleSubmit () {
      this.$refs.lineForm.validate().then(() => {
        this.$emit('handleSubmit')
      })
    },
    // 关闭后动画结束后操作
    handleClosedDialog () {
      this.$emit('handleClosedDialog')
    },
    // 关闭后操作
    handleCloseDialog () {
      this.$emit('handleCloseDialog')
    },
    // 打开后操作
    handleOpenDialog () {
      this.$emit('handleOpenDialog')
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
