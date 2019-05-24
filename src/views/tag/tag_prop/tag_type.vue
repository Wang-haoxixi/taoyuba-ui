<template>
  <div>
    <collapse-form @clear="formInline=initFormInline()" @search="search()" :showCollapse="false">
      <template slot="search-header">
        <el-form-item label="标签分类:">
          <el-input placeholder="请输入标签分类" :maxlength="16" v-model="formInline.name" clearable></el-input>
        </el-form-item>
      </template>
    </collapse-form>

    <el-form :inline="true" size="small">
      <el-form-item v-if="gov_tagType_add">
        <el-button @click="handleClick()" type="primary" icon="el-icon-plus" class="btn-default">新增父分类</el-button>
      </el-form-item>
    </el-form>
    <avue-tree-table :option="pagedTableTreeOption">
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime | dateFormatSS}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <el-button :disabled="scope.row.parentId===-1 || scope.row._level >= 4" @click="handleAddChild(scope.row)" type="text" size="small">添加子分类</el-button>
            <el-button :disabled="!gov_tagType_edit || scope.row.parentId===-1" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button :disabled="!gov_tagType_del || scope.row.parentId===-1" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </avue-tree-table>
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :paginationOption="paginationOption"></pagination>

    <gov-dialog
      ref="formDialog"
      :title="titleForm"
      @handleSave="handleSave"
      :btnGroup="btnGroup">
      <template>
        <avue-form ref="chanForm" :option="options" v-model="formTagType"></avue-form>
      </template>
    </gov-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTagTypePage, deleteTagTypeById, putTagType, postTagType } from '@/api/tms/tag-type'
import collapseForm from '@/components/collapse-form'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
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
export default {
  mixins: [dialogMixins, paginationMixins],
  components: {
    // CrudTable,
    collapseForm,
  },
  data () {
    return {
      // columnMap,
      initFormInline,
      formInline: initFormInline(),
      formTagType: initFormTagType(),
      isEdit: true,
      gov_tagType_add: false,
      gov_tagType_del: false,
      gov_tagType_edit: false,
      parentTypeList: [],
      btnGroup: [
        {
          label: '保存',
          loading: false,
          disabled: false,
          fn: 'handleSave',
        },
      ],
    }
  },
  computed: {
    pagedTableTreeOption () {
      return {
        columns: [
          {
            text: '',
            value: '',
            width: 100,
          },
          {
            text: '分类名称',
            value: 'name',
          },
        ],
        data: this.pagedTable,
      }
    },
    params () {
      return this.formInline
    },
    titleForm () {
      return this.isEdit ? '编辑标签类型' : '新增标签类型'
    },
    ...mapGetters([
      'permissions',
    ]),
    options () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [],
      }
    },
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
          this.$refs['formDialog'].close()
          this.formTagType.parentId = undefined
          this.load()
        })
      } else {
        postTagType(this.formTagType).then(() => {
          this.$refs['formDialog'].close()
          this.formTagType.parentId = undefined
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
        this.options.column = [
          {
            label: '标签名称',
            prop: 'name',
            span: 24,
          },
        ]
      } else {
        this.isEdit = false
        if (this.formTagType.parentId) {
          this.formTagType = { ...initFormTagType(), parentId: this.formTagType.parentId, parentName: this.formTagType.parentName }
          this.options.column = [
            {
              label: '父类型',
              prop: 'parentName',
              span: 24,
              disabled: true,
            },
            {
              prop: 'parentId',
              span: 24,
              visdiplay: false,
            },
            {
              label: '标签名称',
              prop: 'name',
              span: 24,
            },
          ]
        } else {
          this.formTagType = initFormTagType()
          this.options.column = [
            {
              label: '标签名称',
              prop: 'name',
              span: 24,
            },
          ]
        }
      }
      this.$refs['formDialog'].open()
    },
    handleDialogClose (val) {
      this.dialogShow = val
      this.formTagType.parentId = undefined
    },
  },
}
</script>
