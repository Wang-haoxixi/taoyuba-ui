<template>
  <div>
    <div v-show="pageState=='list'">
      <operation-container>
        <template slot="left">
          <iep-button size="small" @click="allDelete">删除</iep-button>
          <iep-button size="small" @click="forward">转发</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="search" :paramForm="searchForm" prop="subject"></operation-search>
        </template>
      </operation-container>
      <table-dialog ref="table" @switchDialog="handleDetail" @multipleSelection="multipleSelect" pageState="sent" :type="type"></table-dialog>
    </div>
    <main-form-dialog ref="mainDialog" v-show="pageState=='detail'" @backWeb="backPage" @forward="detailForward" @reply="detailReply" emailType="send" @materialDetail="materialDetail"></main-form-dialog>
    <update-form-dialog ref="updateDialog" v-show="pageState=='form'" @backWeb="backPage" @load-page="formBack"></update-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import mixinTable from '../tableTpl/mixinTable'
import TableDialog from '../tableTpl/table.vue'
import mainFormDialog from '../tableTpl/mainDialog'
import UpdateFormDialog from '../new/index'
import { getSendList, deleteEmailByIds } from '@/api/mlms/email/index'

export default {
  components: { mainFormDialog, TableDialog, UpdateFormDialog },
  mixins: [mixins, mixinTable],
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      dialogShow: true,
      forwardShow: true,
      searchForm: {
        subject: '',
      },
    }
  },
  methods: {
    allDelete () {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请至少全部一项数据')
        return
      }
      deleteEmailByIds(this.multipleSelection).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.$refs['table'].loadPage({})
      })
    },
    search (val) {
      val.type = this.type
      this.$refs['table'].loadPage(val)
    },
    formBack (state) {
      if (state) {
        this.pageState = 'detail'
      } else {
        this.loadPage()
      }
    },
    materialDetail (row, type) {
      this.$emit('materialDetail', row, type)
    },
  },
  mounted () {
    this.$refs['table'].requestFn = getSendList
    this.$nextTick(() => {
      this.$refs['table'].loadPage()
    })
  },
}
</script>
