<template>
  <div>
    <el-input v-model="mName" @focus="hanldeFocusTemplate" readonly></el-input>
    <form-dialog :dialog-show="templateDialogShow" title="模板" @close="templateDialogShow=false" width="600" :is-need-confirm="false">
      <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
        <template slot="search-header">
          <el-form-item label="事项名称">
            <el-input placeholder="请输入事项名称" v-model="formInline.name" clearable></el-input>
          </el-form-item>
        </template>
      </collapse-form>
      <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap">
        <el-table-column prop="operation" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="handleSelect(scope.row);" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </crud-table>
      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    </form-dialog>
  </div>
</template>
<script>
import { getGuidePage, getGuideById } from '@/api/mdl/guide'
import paginationMixins from '@/mixins/pagination_mixins'
import dialogMixins from '@/mixins/dialog_mixins'
import crudTable from '@/components/crud-table'
import collapseForm from '@/components/collapse-form'
function initFormInline () {
  return {
    matName: null,
  }
}
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    guideType: {
      type: String,
      required: true,
    },
  },
  mixins: [dialogMixins, paginationMixins],
  components: { crudTable, collapseForm },
  data () {
    return {
      mName: this.value,
      templateDialogShow: false,
      isLoadTable: true,
      columnMap: [
        {
          prop: 'name',
          label: '名称',
        },
      ],
      formInline: initFormInline(),
    }
  },
  computed: {
    params () {
      return this.formInline
    },
  },
  created () {
  },
  methods: {
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      if (this.guideType === '行政权力') {
        params.type = 1
      } else {
        params.type = 2
      }
      getGuidePage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    hanldeFocusTemplate () {
      this.templateDialogShow = true
      this.load()
    },
    handleSelect (row) {
      getGuideById(row.id).then(res => {
        this.mName = row.name
        this.templateDialogShow = false
        const templateMatterForm = res.data
        templateMatterForm.tmplName = row.name
        this.$emit('fillData', templateMatterForm)
      })
    },
  },
}
</script>
