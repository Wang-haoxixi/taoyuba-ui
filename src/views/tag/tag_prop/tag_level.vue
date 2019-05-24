<template>
  <div>
    <collapse-form @clear="formInline={}" @search="search()" :showCollapse="false">
      <template slot="search-header">
        <el-form-item label="标签级别:">
          <el-input placeholder="请输入标签级别" :maxlength="16" v-model="formInline.levelname" clearable></el-input>
        </el-form-item>
      </template>
    </collapse-form>

    <el-form :inline="true" size="small">
      <el-form-item v-if="gov_tagLevel_add">
        <gov-button @click="handleClick()" type="primary" icon="el-icon-plus" class="btn-default">新增</gov-button>
      </el-form-item>
    </el-form>

  <!-- <avue-tree-table
  :option="pagedTableTreeOption"
  :page='pagination'
  > -->
    <crud-table :isLoadTable="isLoadTable" :pagedTable="pagedTable" :columnMap="columnMap" isStripe>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <gov-button :disabled="!gov_tagLevel_edit" @click="handleClick(scope.row)" type="text" size="small">编辑</gov-button>
            <gov-button :disabled="!gov_tagLevel_del" @click="handleDelete(scope.row)" type="text" size="small">删除</gov-button>
          </div>
        </template>
      </el-table-column>
    </crud-table>
  <!-- </avue-tree-table> -->
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :paginationOption="paginationOption"></pagination>

    <gov-dialog
      ref="formDialog"
      title="新增"
      @handleSave="handleSave"
      :btnGroup="btnGroup"
      width="40%">
      <template>
        <avue-form ref="chanForm" :option="options" v-model="formTagLevel">
        </avue-form>
      </template>
    </gov-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTagLevelPage, postTagLevel, putTagLevel, deleteTagLevelById } from '@/api/tms/tag-level'
import CrudTable from '@/components/crud-table'
import mixin from '@/mixins/mixin'
import dialogMixins from '@/mixins/dialog_mixins'
import collapseForm from '@/components/collapse-form'
import paginationMixins from '@/mixins/pagination_mixins'
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
  mixins: [dialogMixins, paginationMixins,mixin],
  components: {
    CrudTable,
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
      btnGroup: [
        {
          label: '保存',
          loading: false,
          disabled: false,
          fn: 'handleSave',
        },
      ],
      options : {
        labelWidth: '150',
        menuBtn: false,
        column: [{
          label: '标签名称',
          prop: 'name',
          span: 24,
        }],
      },
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
          this.load()
        })
      } else {
        postTagLevel(this.formTagLevel).then(() => {
          this.load()
        })
      }
      this.$refs['formDialog'].close()
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
      this.$refs['formDialog'].open()
    },
  },
}
</script>
