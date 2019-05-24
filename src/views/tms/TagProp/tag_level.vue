<template>
  <div>
    <collapse-form @clear="formInline={}" @search="search()" :show-collapse="false">
      <template slot="search-header">
        <el-form-item label="标签级别:">
          <el-input placeholder="请输入标签级别" v-model="formInline.levelname" clearable></el-input>
        </el-form-item>
      </template>
    </collapse-form>

    <el-form :inline="true" size="small">
      <el-form-item v-if="gov_tagLevel_add">
        <el-button @click="handleClick()" type="primary" icon="el-icon-plus">新增</el-button>
      </el-form-item>
    </el-form>

    <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" :border="true" :stripe="true">
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button :disabled="!gov_tagLevel_edit" @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <a-divider type="vertical" />
          <el-button :disabled="!gov_tagLevel_del" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </crud-table>

    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    <form-dialog :dialog-show="dialogShow" title="新增级别" @close="handleDialogClose" width="40%">
      <el-form :model="formTagLevel" class="form-inline" label-width="120px" ref="form">
        <el-form-item label="级别名称">
          <el-input v-model="formTagLevel.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </form-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTagLevelPage, postTagLevel, putTagLevel, deleteTagLevelById } from '@/api/tms/tag-level'
import crudTable from '@/components/deprecated/crud-table'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import collapseForm from '@/components/deprecated/collapse-form'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
// mockColumnMap
const columnMap = [
  {
    prop: 'levelId',
    label: 'ID',
    width: '180',
  },
  {
    prop: 'name',
    label: '级别名称',
    width: null,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: null,
    type: 'date',
  },
]
export default {
  mixins: [dialogMixins, paginationMixins],
  components: {
    crudTable,
    collapseForm,
  },
  data () {
    return {
      columnMap,
      formInline: {},
      formTagLevel: {},
      isEdit: true,
      gov_tagLevel_add: false,
      gov_tagLevel_del: false,
      gov_tagLevel_edit: false,
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.load()
    this.gov_tagLevel_add = this.permissions['gov_tagLevel_add']
    this.gov_tagLevel_del = this.permissions['gov_tagLevel_del']
    this.gov_tagLevel_edit = this.permissions['gov_tagLevel_edit']
  },
  methods: {
    handleSave () {
      if (this.isEdit) {
        putTagLevel(this.formTagLevel).then(() => {
          this.dialogShow = false
          this.load()
        })
      } else {
        postTagLevel(this.formTagLevel).then(() => {
          this.dialogShow = false
          this.load()
        })
      }
    },
    handleDelete (rows) {
      const { levelId } = rows
      this._handleGlobalDeleteById(levelId, deleteTagLevelById, 'delete')
    },
    async load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      this.dialogShow = false
      const res = await getTagLevelPage({ ...params, ...pageOption })
      const { data } = res
      this.loadTable(data)
    },
    handleClick (rows) {
      if (rows) {
        this.isEdit = true
        this.formTagLevel = rows
      } else {
        this.isEdit = false
        this.formTagLevel = {}
      }
      this.dialogShow = true
    },
  },
}
</script>
