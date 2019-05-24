<template>
  <page-dialog :page-show="editDialogShow" :title="infoFormTitle" @close="editDialogShow=false">
    <template slot="page">
      <collapse-form ref="collapseForm" @clear="formInline=initFormInline()" @search="search()">
        <template slot="search-header">
          <el-form-item label="标签名称:">
            <el-input placeholder="请输入标签名称" v-model="formInline.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="标签分类:">
            <el-select v-model="formInline.typeid" clearable placeholder="请选择">
              <el-option v-for="item in typeNameOpts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <template slot="search-body">
          <el-form-item label="标签级别:">
            <el-select v-model="formInline.levelid" clearable placeholder="请选择">
              <el-option v-for="item in levelNameOpts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="formInline.status" clearable placeholder="请选择">
              <el-option key="0" label="待审核" :value="0"></el-option>
              <el-option key="1" label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </collapse-form>

      <el-form :inline="true" size="small">
        <el-form-item v-if="gov_tag_add">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-menu" @click="handleMerge()">合并</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-check" @click="handleReviewPass()">审核通过</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-remove-outline" @click="handleDisabled()">禁用</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-delete" @click="handleDelete()">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-upload" @click="handleImport()">Excel导入</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-download" @click="handleExport()">导出</el-button>
        </el-form-item>
      </el-form>

      <div v-if="showMergeBox" class="merge-tag-list">
        <span class="label">已选择的合并标签：</span>
        <el-tag v-for="tag in toMergeTagList" :key="tag.name" closable @close="handleRemoveMergeTag(tag)">
          {{tag.name}}
        </el-tag>
      </div>

      <crud-table :is-load-table="isLoadTable" align="center" :paged-table="pagedTable" :column-map="columnMap" :is-mutiple-selection="true" @handleSelectionChange="handleSelectionChange">
        <el-table-column prop="operation" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleAddToMerge(scope.row)" type="text" size="small">合并</el-button>
            <a-divider type="vertical" />
            <el-button :disabled="!gov_tag_edit" @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
            <a-divider type="vertical" />
            <el-button :disabled="!gov_tag_del" @click="handleDeleteTag(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </crud-table>

      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>

      <form-dialog :dialog-show="addDialogShow" :title="infoFormTitle" @close="addDialogShow=false" width="60%" :is-need-confirm="false">
        <tag-form-add :form-data="addTagInfoForm" @hideDialog="load();" :level-name-opts="levelNameOpts" :type-name-opts="typeNameOpts" :tag-function="tagFunction"></tag-form-add>
      </form-dialog>

      <form-dialog :dialog-show="mergeDialogShow" title="合并标签" @close="mergeDialogShow=false" width="50%" :is-need-confirm="false">
        <el-form label-position="top" label-width="80px" :model="mergeForm">
          <el-form-item label="请选择主标签">
            <el-radio-group v-model="mergeForm.mainId">
              <el-radio v-for="item in toMergeTagList" :label="item.tagId" :key="item.tagId">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onMerge">合并</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </form-dialog>

      <form-dialog :dialog-show="importDialogShow" title="上传数据" @close="importDialogShow=false" width="500px" :is-need-confirm="false">
        <tag-import @close="handleCloseImport"></tag-import>
      </form-dialog>
    </template>
    <template slot="form">
      <tag-form-edit :form-data="editTagInfoForm" @hideDialog="load();" :level-name-opts="levelNameOpts" :type-name-opts="typeNameOpts" @close="editDialogShow=false" :tag-function="tagFunction"></tag-form-edit>
    </template>
  </page-dialog>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getTagExcelExport } from '@/api/tms/excel'
import { getTagTypeList } from '@/api/tms/tag-type'
import { getTagLevelList } from '@/api/tms/tag-level'
import { getTagFunctionMap } from '@/api/tms/function'
import { getTagPage, deleteTagById, getTagById, mergeTag, reviewTag, disableTag, deleteTag } from '@/api/tms/tag'
import tagFormAdd from './tag_form_add'
import tagFormEdit from './tag_form_edit'
import tagImport from './tag_import'
import crudTable from '@/components/deprecated/crud-table'
import collapseForm from '@/components/deprecated/collapse-form'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
function initAddTagForm () {
  return {
    name: null,
    levelId: null,
    typeId: null,
    typeObjs: [],
    typeIds: [],
    tagList: [],
    tagsList: [],
    description: null,
    orderNum: 1,
  }
}
function initEditTagForm () {
  return {
    name: null,
    levelId: null,
    typeId: null,
    typeObjs: [],
    typeIds: [],
    tagList: [],
    tagsList: [],
    description: null,
    orderNum: 1,
  }
}
function initFormInline () {
  return {
    name: null,
    typeid: null,
    levelid: null,
    status: null,
  }
}
function initMergeForm () {
  return {
    mainId: null,
    mergeIds: [],
  }
}
function initTagFunction () {
  return {
    'tagReview': null, 'tagNotes': null, 'tagRelation': null,
  }
}
const columnMap = [
  {
    prop: 'tagId',
    label: 'ID',
    width: '55',
  },
  {
    prop: 'name',
    label: '标签名称',
  },
  {
    prop: 'levelName',
    label: '标签级别',
  },
  {
    prop: 'typeNames',
    label: '所属分类',
    type: '所属分类',
  },
  {
    prop: 'refers',
    label: '应用次数',
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    type: 'date',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'TAGSTATUS',
  },
]
export default {
  components: {
    crudTable,
    tagFormAdd,
    tagFormEdit,
    collapseForm,
    tagImport,
  },
  mixins: [dialogMixins, paginationMixins],
  data () {
    return {
      columnMap,
      mergeMainName: '',
      isEdit: true,
      initFormInline,
      formInline: initFormInline(),
      tagFunction: initTagFunction(),
      addTagInfoForm: initAddTagForm(),
      editTagInfoForm: initEditTagForm(),
      mergeForm: initMergeForm(),
      addDialogShow: false,
      editDialogShow: false,
      mergeDialogShow: false,
      importDialogShow: false,
      typeNameOpts: [],
      levelNameOpts: [],
      toMergeTagList: [],
      gov_tag_add: false,
      gov_tag_del: false,
      gov_tag_edit: false,
    }
  },
  computed: {
    infoFormTitle () {
      return this.isEdit ? '修改标签' : '新增标签'
    },
    params () {
      return this.formInline
    },
    showMergeBox () {
      return this.toMergeTagList.length > 0 ? true : false
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.load()
    this.loadTagProp()
    this.loadFunction()
    this.gov_tag_add = this.permissions['gov_tag_add']
    this.gov_tag_del = this.permissions['gov_tag_del']
    this.gov_tag_edit = this.permissions['gov_tag_edit']
  },
  methods: {
    handleImport () {
      this.importDialogShow = true
    },
    handleCloseImport (res) {
      this.importDialogShow = false
      this.load()
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: 'success',
        })
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: 'warning',
        })
      }
    },
    handleExport () {
      getTagExcelExport()
    },
    handleDelete () {
      this._handleGlobalDeleteAll(deleteTag)
    },
    handleDisabled () {
      disableTag(this.mutipleSelection).then(() => {
        this.load()
      })
    },
    handleReviewPass () {
      reviewTag(this.mutipleSelection).then(() => {
        this.load()
      })
    },
    onMerge () {
      this.$confirm(`是否确认将这些标签归并到“${this.mergeMainName}”？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        mergeTag(this.mergeForm).then(() => {
          this.$message({
            type: 'success',
            message: '合并成功!',
          })
          this.mergeDialogShow = false
          this.toMergeTagList = []
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消合并',
        })
      })
    },
    handleMerge () {
      if (this.toMergeTagList.length < 2) {
        this.$message('请至少选择两个标签。')
        return
      }
      this.mergeDialogShow = true
    },
    handleRemoveMergeTag (tag) {
      const { toMergeTagList } = this
      this.$set(this, 'toMergeTagList', _.filter(toMergeTagList, item => item.tagId !== tag.tagId))
    },
    handleAddToMerge (rows) {
      this.toMergeTagList.push(rows)
      this.toMergeTagList = _.uniqWith(this.toMergeTagList, _.isEqual)
    },
    handleDeleteTag (rows) {
      const { tagId } = rows
      this._handleGlobalDeleteById(tagId, deleteTagById, 'delete')
    },
    handleAdd () {
      this.isEdit = false
      this.addTagInfoForm = initAddTagForm()
      this.addDialogShow = true
    },
    handleEdit (rows) {
      this.isEdit = true
      getTagById(rows.tagId).then(res => {
        this.editTagInfoForm = { ...res.data }
        const { tagList } = this.editTagInfoForm
        // 标签
        this.editTagInfoForm.tagsList = this._mapPickTagIdName(tagList)
        this.editTagInfoForm.tagList = this.editTagInfoForm.tagsList.map(m => m.name)
        this.editDialogShow = true
      })
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.tagId)
    },
    loadFunction () {
      getTagFunctionMap().then(res => {
        this.tagFunction = res.data
      })
    },
    loadTagProp () {
      getTagTypeList().then(res => {
        this.typeNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.typeId,
          }
        })
      })
      getTagLevelList().then(res => {
        this.levelNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.levelId,
          }
        })
      })
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      this.editDialogShow = false
      this.addDialogShow = false
      getTagPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
  },
  watch: {
    'mergeForm.mainId': function (mainId) {
      this.mergeMainName = this.toMergeTagList.find(m => m.tagId === mainId).name
      const mergeIds = _.filter(this.toMergeTagList.map(m => m.tagId), item => item !== mainId)
      this.mergeForm.mergeIds = mergeIds
    },
  },
}
</script>
<style lang="scss" scoped>
.merge-tag-list {
  margin-bottom: 18px;
  & > span.label {
    line-height: 32px;
    font-size: 14px;
    color: #606266;
  }
  > .el-tag {
    margin-right: 5px;
  }
}
</style>
