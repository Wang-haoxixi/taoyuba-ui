<template>
  <div>
    <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
      <template slot="search-header">
        <el-form-item label="标签分类:">
          <el-input placeholder="请输入标签分类" v-model="formInline.typename" clearable></el-input>
        </el-form-item>
      </template>
    </collapse-form>

    <el-form :inline="true" size="small">
      <el-form-item v-if="gov_tagType_add">
        <el-button @click="handleClick()" type="primary" icon="el-icon-plus">新增父分类</el-button>
      </el-form-item>
    </el-form>
    <crud-tree-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" border>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime | dateFormatSS}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.parentId===-1 || scope.row._level >= 4" @click="handleAddChild(scope.row)" type="text" size="small">添加子分类</el-button>
          <a-divider type="vertical" />
          <el-button :disabled="!gov_tagType_edit || scope.row.parentId===-1" @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <a-divider type="vertical" />
          <el-button :disabled="!gov_tagType_del || scope.row.parentId===-1" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </crud-tree-table>
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    <form-dialog :dialog-show="dialogShow" :title="titleForm" @close="handleDialogClose" width="40%" :is-need-confirm="false">
      <el-form :model="formTagType" class="form-inline" label-width="120px" ref="form">
        <el-form-item v-if="isEdit=== false && formTagType.parentId" label="父类型">
          <el-input v-model="formTagType.parentName" :disabled="true"></el-input>
          <input v-model="formTagType.parentId" type="hidden" />
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="formTagType.name"></el-input>
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
import { getTagTypePage, deleteTagTypeById, putTagType, postTagType } from '@/api/tms/tag-type'
import collapseForm from '@/components/deprecated/collapse-form'
import crudTreeTable from '@/components/deprecated/crud-tree-table'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
function initFormTagType () {
  return {
    parentId: null,
    name: null,
  }
}
function initFormInline () {
  return {
    typename: null,
  }
}
const columnMap = [
  {
    label: 'ID',
    prop: 'typeId',
    width: 200,
  },
  {
    label: '分类名称',
    prop: 'name',
  },
]
export default {
  mixins: [dialogMixins, paginationMixins],
  components: {
    crudTreeTable,
    collapseForm,
  },
  data () {
    return {
      columnMap,
      initFormInline,
      formInline: initFormInline(),
      formTagType: initFormTagType(),
      isEdit: true,
      gov_tagType_add: false,
      gov_tagType_del: false,
      gov_tagType_edit: false,
      parentTypeList: [],
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    titleForm () {
      return this.isEdit ? '修改标签类型' : '新增标签类型'
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.load()
    this.gov_tagType_add = this.permissions['gov_tagType_add']
    this.gov_tagType_del = this.permissions['gov_tagType_del']
    this.gov_tagType_edit = this.permissions['gov_tagType_edit']
  },
  methods: {
    handleSave () {
      delete this.formTagType._expanded
      delete this.formTagType.children
      delete this.formTagType._level
      delete this.formTagType._show
      if (this.isEdit) {
        putTagType(this.formTagType).then(() => {
          this.dialogShow = false
          this.load()
        })
      } else {
        postTagType(this.formTagType).then(() => {
          this.dialogShow = false
          this.load()
        })
      }
    },
    handleDelete (rows) {
      const { typeId } = rows
      this._handleGlobalDeleteById(typeId, deleteTagTypeById, 'delete')
    },
    async load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      this.dialogShow = false
      const res = await getTagTypePage({ ...params, ...pageOption })
      const { data } = res
      this.loadTable(data)
    },
    handleAddChild (row) {
      this.formTagType.parentId = row.typeId
      this.formTagType.parentName = row.name
      this.handleClick()
    },
    handleClick (rows) {
      if (rows) {
        this.isEdit = true
        this.formTagType = { ...rows }
        this.dialogShow = true
      } else {
        this.isEdit = false
        if (this.formTagType.parentId) {
          this.formTagType = { ...initFormTagType(), parentId: this.formTagType.parentId, parentName: this.formTagType.parentName }
          this.dialogShow = true
        } else {
          this.formTagType = initFormTagType()
          this.dialogShow = true
        }
      }
      this.dialogShow = true
    },
  },
}
</script>
