<template>
  <div>
    <avue-crud
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination"
      :data="tableData"
      :option="column.tableProps">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <slot name="menu" :data="scope.row"></slot>
        </div>
      </template>
    </avue-crud>
    <dialog-demo
      @handleClosedDialog="handleClosedDialog"
      @handleOpenDialog="handleOpenDialog"
      @handleCloseDialog="handleCloseDialog"
      @handleSubmit="handleSubmit"
      ref="kdialog">
      <!-- <template slot="name">
        <slot></slot>
      </template> -->
    </dialog-demo>
  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
import dialogDemo from './dialog'
import mergeWith from 'lodash/mergeWith'
import {getDicAll} from '@/util/dic'
export default {
  name: 'kGroup',
  mixins: [mixin],
  components: {dialogDemo},
  data () {
    return {}
  },
  computed: {
    dicList () {
      return getDicAll()
    },
  },
  props: {
    // 列表数据
    tableData: {
      type: Array,
      default () {
        return []
      },
    },
    column: {
      type: Object,
      default () {
        return {
          tableProps: [],
          detailOption: [],
          formOption: [],
        }
      },
    },
    // 表单
    form: {
      type: Object,
      default () {
        return {}
      },
    },
    // 字典数据
    options: {
      type: Object,
      detault () {
        return {}
      },
    },
  },
  watch: {
    options: {
      handler (newVal) {
        this.dicList = mergeWith(this.dicList, newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 打开
    openDialog () {
      this.$refs.kdialog.openDialog()
    },
    // 关闭
    closeDialog () {
      this.$refs.kdialog.closeDialog()
    },
    // 提交
    handleSubmit () {
      this.$emit('handleSubmit')
    },
    // 关闭后动画结束后操作
    handleClosedDialog () {
      this.$emit('handleClosedDialog')
    },
    // 打开后操作
    handleOpenDialog () {
      this.$emit('handleOpenDialog')
    },
    // 关闭后操作
    handleCloseDialog () {
      this.$emit('handleCloseDialog')
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>
