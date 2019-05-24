<template>
  <div class="draft">
    <div v-show="dialogShow">
      <page-header title="草稿箱" class="title"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" @click="allDelete">删除</iep-button>
          <iep-button size="small" @click="forward">转发</iep-button>
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
        </template>
      </operation-container>
      <table-dialog ref="table" @switchDialog="handleDetail" @multipleSelection="multipleSelect" pageState="draft"></table-dialog>
    </div>
    <!-- <main-form-dialog ref="mainDialog" v-show="!dialogShow" @backWeb="backPage"></main-form-dialog> -->
    <update-form-dialog ref="updateDialog" v-show="!dialogShow" @backWeb="backPage" @load-page="loadPage"></update-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import TableDialog from '../tableTpl/table.vue'
// import mainFormDialog from '../tableTpl/mainDialog'
import UpdateFormDialog from '../new/index'
import { getDraftList, deleteEmailByIds } from '@/api/mlms/email/index'

export default {
  components: { UpdateFormDialog, TableDialog },
  mixins: [mixins],
  data () {
    return {
      dialogShow: true,
      selectList: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.dialogShow = false
      this.$nextTick(() => {
        this.$refs['updateDialog'].open(row)
      })
    },
    backPage (state) {
      this.dialogShow = true
      if (state) {
        this.$refs['table'].loadPage({})
      }
    },
    multipleSelect (val, list) {
      this.multipleSelection = val
      this.selectList = list
    },
    // 批量删除
    allDelete () {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请至少选择一条数据！')
        return
      }
      deleteEmailByIds(this.multipleSelection).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$refs['table'].loadPage({})
      })
    },
    loadPage (state) {
      this.dialogShow = true
      if (state) {
        this.$refs['table'].loadPage({})
      }
    },
    // 转发
    forward () {
      // 首先判断是否勾选
      if (this.selectList.length !== 1) {
        this.$message.error('请选择且只能选择一条邮件进行转发！')
        return
      }
      this.dialogShow = false
      this.$refs['updateDialog'].resetForm()
      this.$refs['updateDialog'].pageState = 'forward'
      this.$refs['updateDialog'].backOption.isBack = true
      this.$refs['updateDialog'].formData.content = this.selectList[0].content
    },
  },
  mounted () {
    this.$refs['table'].requestFn = getDraftList
    this.$nextTick(() => {
      this.$refs['table'].loadPage({})
    })
  },
}
</script>

<style lang="scss" scoped>
.draft {
  padding: 20px;
  background-color: #fff;
}
</style>
