<template>
  <div>
    <gov-layout-header>
      <gov-search-bar :list-query="listQuery" label-width="80px" :form-props="searchOption" :is-string="false" :reset-ignore="['isAsc', 'limit', 'page']" @handleFilter="handleFilter"></gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud 
        @size-change="sizeChange" 
        @current-change="currentChange" 
        :page="pagination" 
        :table-loading="tableLoading" 
        :data="tableList" 
        :option="mainTableOption"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="openDialog(scope.row)" text="选择"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <gov-dialog
      ref="dialog"
      title="转交部门"
      @closed="handleClosed"
      @handleSubmit="handleSubmit">
      <avue-form ref="form" v-model="form" :option="matFormOption"></avue-form>
    </gov-dialog>
  </div>
</template>

<script>
import { getDept, getDeptById } from '@/util/dic'
import { getResetData, resetDept } from '@/api/supply/material'
import mixin from '@/mixins/mixin'
import { materialTableOption, formOption } from './const/index'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixin],
  data () {
    return {
      form: {},
      visible: false,
      listQuery: {
        matName: null,
        matCode: null,
        deptId: null,
        respDeptId: null,
      }, // 搜索数据
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
        { label: '数源部门', prop: 'dutyId', type: 'select', data: getDept(), show: this.deptType },
      ]
    },
    mainTableOption () {
      return materialTableOption
    },
    matFormOption () {
      return formOption
    },
    ...mapGetters(['userInfo']),
    deptType () {
      return getDeptById(this.userInfo.deptId).type ? true : false
    },
  },
  created () {
  },
  methods: {
    // 表单提交
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.form.attitude = this.form.recDeptId == this.form.demandDeptId ? 0 : 1
        this.form.materialId = this.form.id
        resetDept(this.form).then(() => {
          this.getList()
          this.handleClosed()
        })
      })
    },
    handleClosed () {
      this.$refs['dialog'].close()
      this.$refs.form.clearValidate()
      this.$refs.form.resetForm()
    },
    // 获取主表数据
    getList () {
      getResetData(this.listQuery).then(res => {
        for (let item of res.data.data.records) {
          item.comment = item.flowVOs[item.flowVOs.length-1].comment
        }
        this.tableList = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
    openDialog (row) {
      this.form = { ...row }
      this.$refs.dialog.open()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
