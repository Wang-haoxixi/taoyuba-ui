<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar :formProps="searchBar" :list-query="params" @handleFilter="handleFilter" @handleReset="handleReset">
      </gov-search-bar>
      <gov-button-group>
        <gov-button v-if="gov_tag_add" size="small" type="add" @click="handleAdd()" class="btn-default">新增</gov-button>
        <gov-button size="small" @click="handleMerge()" class="btn-default">合并</gov-button>
        <gov-button size="small" @click="handleReviewPass()" class="btn-default">审核通过</gov-button>
        <gov-button size="small" @click="handleDisabled()" class="btn-default">禁用</gov-button>
        <gov-button v-if="gov_tag_del" size="small" @click="handleDelete()" class="btn-default">删除</gov-button>
        <gov-button size="small" @click="handleImport()" class="btn-default">导入</gov-button>
        <gov-button size="small" @click="handleExport()" class="btn-default">导出</gov-button>
      </gov-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <div v-if="showMergeBox" class="merge-tag-list">
        <span class="label">已选择的合并标签：</span>
        <el-tag v-for="tag in toMergeTagList" :key="tag.name" closable @close="handleRemoveMergeTag(tag)">
          {{tag.name}}
        </el-tag>
      </div>
      <avue-crud
        ref="formCurd"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="handleSelectionChange"
        :table-loading="isLoadTable"
        :data="pagedTable"
        :option="crudOptions">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleAddToMerge(scope.row)" type="text" size="small">合并</gov-button>
            <gov-button :disabled="!gov_tag_edit" @click="handleEdit(scope.row)" type="text" size="small">编辑</gov-button>
            <gov-button :disabled="!gov_tag_del" @click="handleDeleteTag(scope.row)" type="text" size="small">删除</gov-button>
          </div>
        </template>
        <template slot-scope="scope" slot="status">
          {{scope.row.status === 1 ? '启用':'待审核'}}
        </template>
        <template slot-scope="scope" slot="updateTime">
          {{scope.row.updateTime | dateFormatToMinute}}
        </template>
      </avue-crud>

      <form-dialog :dialogShow="mergeDialogShow" title="合并标签" @close="mergeDialogShow=false" width="50%" :isNeedConfirm="false">
        <el-form label-position="top" label-width="80px" :model="mergeForm">
          <el-form-item label="请选择主标签">
            <el-radio-group v-model="mergeForm.mainId">
              <el-radio v-for="item in toMergeTagList" :label="item.tagId" :key="item.tagId">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onMerge">合并</el-button>
            <el-button @click="mergeDialogShow = false">取消</el-button>
          </el-form-item>
        </el-form>
      </form-dialog>
      <form-dialog :dialogShow="importDialogShow" title="上传数据" @close="importDialogShow=false" width="500px" :isNeedConfirm="false">
        <tag-import @close="handleCloseImport"></tag-import>
      </form-dialog>
    </gov-layout-body>

    <tag-form-add
      :formData="tagInfoForm"
      ref="tagFormAdd"
      @hideDialog="getList();"
      :levelNameOpts="levelNameOpts"
      :typeNameOpts="typeNameOpts"
      :tagFunction="tagFunction">
    </tag-form-add>

    <!-- <gov-dialog
      ref="mainDialog"
      title="编辑"
      :is-btn-group="false"
      width="70%">
      <tag-form-edit :formData="tagInfoForm" @hideDialog="getList();" :levelNameOpts="levelNameOpts" :typeNameOpts="typeNameOpts" @close="editDialogShow=false" :tagFunction="tagFunction"></tag-form-edit>
    </gov-dialog> -->

    <tag-form-edit
      ref="tagFormEdit"
      :formData="tagInfoForm"
      @hideDialog="getList();"
      :levelNameOpts="levelNameOpts"
      :typeNameOpts="typeNameOpts"
      :tagFunction="tagFunction">
    </tag-form-edit>

  </gov-layout-main>
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
  // import collapseForm from '@/components/collapse-form'
  // import pagination from '@/mixins/pagination_mixins'
  import dialogMixins from '@/mixins/dialog_mixins'
  import mixins from '@/mixins/mixin'
  import { columnMap, initTagFunction, initMergeForm, initFormInline, initTagForm, _mapPickTagIdName, changeTypeNames } from './const/index'

  const status = [
    {
      label: '待审核',
      value : 0,
    },
    {
      label: '启用',
      value : 1,
    },
  ]
  export default {
    components: {
      tagFormAdd,
      tagFormEdit,
      tagImport,
    },
    mixins: [mixins, dialogMixins],
    data () {
      return {
        isLoadTable: false,
        pagedTable: [],
        columnMap,
        mergeMainName: '',
        isEdit: true,
        initFormInline,
        formInline: initFormInline(),
        tagFunction: initTagFunction(),
        tagInfoForm: initTagForm(),
        mergeForm: initMergeForm(),
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
        return this.isEdit ? '编辑标签' : '新增标签'
      },
      params () {
        return this.formInline
      },
      showMergeBox () {
        return this.toMergeTagList.length > 0 ? true : false
      },
      searchBar (){
        const searchBar = [
          {
            prop: 'name',
            label: '标签名称',
            placeholder: '请输入标签名称',
          },
          {
            prop: 'typeid',
            label: '标签分类',
            placeholder: '请选择',
            type: 'select',
            data: [{label:'全部',value:''}].concat(this.typeNameOpts),
          },
          {
            prop: 'levelid',
            label: '标签级别名称',
            placeholder: '请选择',
            type: 'select',
            data: this.levelNameOpts,
          },
          {
            prop: 'status',
            label: '状态',
            placeholder: '请选择',
            type: 'select',
            data: status,
          },
        ]
        return searchBar
      },
      crudOptions (){
        return {
          selection: true,
          page:true,
          align:'center',
          editBtn: false,
          addBtn:false,
          delBtn: false,
          header: false,
          menuAlign:'center',
          menuType: 'text',
          column:[
            {
              label:'标签名称',
              prop:'name',
            },
            {
              label:'标签级别名称',
              prop:'levelName',
            },
            {
              label:'标签分类',
              prop:'typeName',
            },
            {
              prop: 'refers',
              label: '应用次数',
            },
            {
              prop: 'updateTime',
              label: '更新时间',
              type: 'date',
              solt: true,
            },
            {
              prop: 'status',
              label: '状态',
              type: 'TAGSTATUS',
              solt: true,
            },
          ],
        }
      },
      ...mapGetters([
        'permissions',
      ]),
    },
    created () {
      this.getList()
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
        this.getList()
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
      // 批量删除
      handleDelete () {
        this.$confirm('确定批量删除这些数据吗').then(() => {
          deleteTag(this.mutipleSelection).then(() => {
            this.$message.success('删除成功！')
            this.getList()
          })
        }).catch(() => {})
      },
      handleDisabled () {
        if(!this.mutipleSelection || this.mutipleSelection.length < 1) {
          this.$message.error('请至少选择一条数据')
          return false
        }
        disableTag(this.mutipleSelection).then((res) => {
          if (res.data.code === 0) {
            this.$message.success('禁用标签成功！')
            this.getList()
          } else {
            this.$message.error('禁用标签失败！')
          }
        })
      },
      handleReviewPass () {
        if(!this.mutipleSelection || this.mutipleSelection.length < 1) {
          this.$message.error('请至少选择一条数据')
          return false
        }
        reviewTag(this.mutipleSelection).then((res) => {
          if(res.data.code === 0) {
            this.$message.success('审核通过！')
            this.getList()
          } else {
            this.$message.error('审核失败！')
          }
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
      // 批量合并标签
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
      // 合并标签
      handleAddToMerge (rows) {
        this.toMergeTagList.push(rows)
        this.toMergeTagList = _.uniqWith(this.toMergeTagList, _.isEqual)
      },
      // 删除标签
      handleDeleteTag (rows) {
        this.$confirm('确定要删除吗').then(() => {
          deleteTagById(rows.tagId).then(() => {
            this.$message.success('删除成功！')
            this.getList()
          })
        }).catch(() => {})
      },
      // 新增标签
      handleAdd () {
        this.isEdit = false
        this.tagInfoForm = initTagForm()
        this.$refs.tagFormAdd.open()
      },
      // 编辑标签
      handleEdit (rows) {
        this.isEdit = true
        getTagById(rows.tagId).then(res => {
          this.tagInfoForm = { ...res.data }
          const { tagList } = this.tagInfoForm
          this.tagInfoForm.tagsList = _mapPickTagIdName(tagList)
          this.tagInfoForm.tagList = this.tagInfoForm.tagsList.map(m => m.name)
          this.editDialogShow = true
          this.$refs.tagFormEdit.open()
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
        // 获取标签分类
        getTagTypeList().then(res => {
          this.typeNameOpts = res.data.map(m => {
            return {
              label: m.name,
              value: m.typeId,
            }
          })
        })
        // 获取标签级别名称
        getTagLevelList().then(res => {
          this.levelNameOpts  = res.data.map(m => {
            return {
              label: m.name,
              value: m.levelId,
            }
          })
        })
      },
      getList () {
        this.isLoadTable = true
        this.editDialogShow = false
        getTagPage({...this.params,...this.listQuery}).then(res => {
          this.pagination.total = res.data.total
          this.pagedTable = res.data.records
          this.pagedTable.forEach((item) => {
            item.typeName = changeTypeNames(item.typeNames)
          })
          this.isLoadTable = false
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
    /deep/ .el-tag {
      margin-right: 5px;
    }
  }
</style>
