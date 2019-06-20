<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" plain @click="handleAdd()">选择试题</iep-button>
      </template>
    </operation-container>
    <iep-no-data v-if="!tableData.length" message="暂无关联试题"></iep-no-data>
    <div class="choice-question">
      <el-row class="item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="18">
          <div class="title iep-ellinsis">
            {{item.title}}
          </div>
        </el-col>
        <el-col :span="4">
          <span class="el-icon-delete" @click="handleDelete(item)"></span>
        </el-col>
      </el-row>
    </div>
    <iep-dialog :dialog-show="dialogShow" title="试题选择" width="50%" @close="dialogShow=false">
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="title" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap"
        :checkbox-init="checkboxInit" :pagedTable="pagedTable" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-index
        is-mutiple-selection>
      </iep-table>
      <template slot="footer">
        <iep-button type="primary" @click="handleSelect()">选择</iep-button>
        <iep-button @click="dialogShow=false">取消</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>

<script>

const columnsMap = [
  {
    label: '科目',
    prop: 'fieldName',
  },
  {
    label: '题型',
    prop: 'questionTypeName',
  },
  {
    label: '题类',
    prop: 'kindName',
  },
  {
    label: '内容',
    prop: 'title',
  },
  {
    label: '难度',
    prop: 'difficultyName',
  },
  {
    label: '提交时间',
    prop: 'creatTime',
    width: '250px',
  },
]
import mixins from '@/mixins/mixins'
import AdvanceSearch from '../testQuestionsLibrary/Page/AdvanceSearch'
import { getPaperTest } from '@/api/examPaper/examPaperApi'
import uniqBy from 'lodash/uniqBy'
export default {
  props: ['value', 'questionType', 'fieldType'],
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      dialogShow: false,
      columnsMap,
    }
  },
  computed: {
    tableData: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('show-number', value)
        this.$emit('input', value)
      },
    },
  },
  methods: {

    checkboxInit (row) {
      const isIncludes = this.tableData.map(m => m.id).includes(row.id)
      if (isIncludes) {
        return 0
      } else {
        return 1
      }
    },

    /**
     * 添加关联的试题
     */
    handleAdd () {
      this.dialogShow = true
      this.loadPage({ questionType: this.questionType, subject: this.fieldType })
    },

    /**
     * 删除关联的试题
     */
    handleDelete (row) {
      if (row === undefined) {
        this.tableData = []
      } else {
        const tableData = this.tableData.filter(m => m.id !== row.id)
        this.tableData = tableData
      }

    },

    /**
    * 获取试题数据
    */
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getPaperTest)
    },

    /**
     * 选择操作
     */
    handleSelect () {
      const selectData = this.pagedTable.filter(m => this.multipleSelection.includes(m.id))
      let tableData = this.tableData
      tableData = [...tableData, ...selectData]
      this.tableData = uniqBy(tableData, 'id')
      this.dialogShow = false
      this.multipleSelection = []
    },

    /**
     * 选择试题
     */
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },

  },
}
</script>

