<template>
  <div>
    <iep-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px;" @click="handleEdit()">添 加</iep-button>
    <!-- TODO:expand-all失效 -->
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :is-pagination="false" is-tree :expand-all="true">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <iep-button v-if="scope.row._level <= 1" type="text" icon="el-icon-plus" size="mini" @click="handleEdit(scope.row, scope.index, true)">子项
          </iep-button>
          <iep-button type="text" icon="el-icon-check" size="mini" @click="handleEdit(scope.row, scope.index)">编辑
          </iep-button>
          <iep-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row, scope.index)">删除
          </iep-button>
        </template>
      </el-table-column>
    </iep-table>
    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}字典`" width="60%" @close="loadPage">
      <avue-form ref="form" v-model="row" :option="option" @submit="handleSubmit"></avue-form>
    </iep-dialog>
  </div>
</template>
<script>
import { getChild, postChild, putChild, deleteChildById } from '@/api/admin/dict'
export default {
  props: {
    currentId: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      methodName: '添加',
      dialogShow: false,
      pagedTable: [],
      columnsMap: [
        {
          label: 'ID',
          prop: 'id',
          width: 100,
        },
        {
          label: '字典值',
          prop: 'value',
        },
        {
          label: '字典名',
          prop: 'label',
        },
        {
          label: '排序',
          prop: 'sort',
          width: 100,
        },
      ],
      isLoadTable: false,
      id: this.currentId,
      option: {
        emptyBtn: true,
        submitBtn: true,
        column: [
          {
            label: '字典值',
            prop: 'value',
            rules: [
              {
                required: true,
                message: '请输入字典值',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '字典名',
            prop: 'label',
            rules: [
              {
                required: true,
                message: '请输入字典名',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '排序',
            prop: 'sort',
            type: 'number',
            rules: [
              {
                required: true,
                message: '请输入排序',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
      row: this._initRow(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    _initRow () {
      return {
        dictId: this.id,
        parentId: null,
        id: null,
        sort: 1,
        label: '',
        value: '',
      }
    },
    loadPage () {
      this.isLoadTable = true
      getChild(this.id).then(({ data }) => {
        this.pagedTable = data.data
        this.isLoadTable = false
        this.dialogShow = false
      })
    },
    handleSubmit (row) {
      let submitChild = null
      if (row.id) {
        submitChild = putChild
      } else {
        submitChild = postChild
      }
      submitChild(row).then(() => {
        this.loadPage()
      })
    },
    handleEdit (row, index, isChild) {
      if (row) {
        this.row = this.$mergeByFirst(this._initRow(), row)
        this.title = '修改'
      } else {
        this.row = this._initRow()
        this.title = '添加'
      }
      if (isChild) {
        this.row = this._initRow()
        this.title = `添加至<${row.label}>`
        this.row.parentId = row.id
      }
      this.dialogShow = true
    },
    handleDel (row) {
      deleteChildById(row.id).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>