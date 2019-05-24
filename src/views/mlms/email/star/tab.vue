<template>
  <div>
    <div v-show="pageState=='list'">
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" @click="allRead"><i class="icon-biaoji"></i> 标记已读</iep-button>
          <!-- <iep-button size="small" @click="allDelete">删除</iep-button> -->
          <iep-button size="small" @click="forward">转发</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="search" :paramForm="searchForm" prop="subject"></operation-search>
        </template>
      </operation-container>
      <table-dialog ref="table" @switchDialog="handleDetail" @multipleSelection="multipleSelect" :type="type"></table-dialog>
    </div>
    <main-form-dialog ref="mainDialog" v-show="pageState=='detail'" @backWeb="backPage" @forward="detailForward" @reply="detailReply" emailType="star" @materialDetail="materialDetail"></main-form-dialog>
    <update-form-dialog ref="updateDialog" v-show="pageState=='form'" @backWeb="backPage" @load-page="loadPage"></update-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import mixinTable from '../tableTpl/mixinTable'
import TableDialog from '../tableTpl/table.vue'
import mainFormDialog from '../tableTpl/mainDialog'
import UpdateFormDialog from '../new/index'
import { getStarList } from '@/api/mlms/email/index'

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
      subTitle: [120, 6],
      searchForm: {
        subject: '',
      },
    }
  },
  methods: {
    subTitleFn (data) {
      return '（共有 ' + data[0] + ' 封邮件，其中未读邮件 ' + data[1] + ' 封）'
    },
    search (val) {
      val.type = this.type
      this.$refs['table'].loadPage(val)
    },
    materialDetail (row, type) {
      this.$emit('materialDetail', row, type)
    },
  },
  mounted () {
    this.$refs['table'].requestFn = getStarList
    this.$nextTick(() => {
      this.$refs['table'].loadPage()
    })
  },
}
</script>

<style lang="scss" scoped>
.icon-biaoji {
  font-size: 12px !important;
}
</style>
