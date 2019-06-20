<template>
  <basic-container>
    <page-header title="试卷库管理"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd">新增试卷</iep-button>
        <iep-button @click="handleDeleteAll">批量删除</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" prop="title" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap"
      :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      @selection-change="selectionChange" is-index is-mutiple-selection>

      <el-table-column prop="operation" label="操作" width="250">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
            <iep-button @click="handleSelect(scope.row)">查看</iep-button>
            <iep-button @click="handleDelete([scope.row.id],'删除')">删除</iep-button>
            <iep-button @click="share(scope.row)">分享</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { columnsMap, dictsMap } from './option'
import { getExamPagerList, deletePaperById } from '@/api/examPaper/examPaperApi'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      columnsMap,
      dictsMap,
      selectValue: false,
      selectionValue: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {

    /**
      * 获取试卷列表数据
      */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExamPagerList)
    },

    /**
     * 新增试题
     */
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '创建',
        id: '',
      })
    },

    /**
     * 编辑试卷
     */
    handleEdit (row) {
      this.$emit('onEdit', {
        methodName: '编辑',
        id: row.id,
      })
    },

    /**
     * 删除按钮
     */
    handleDelete (idArray, handleName) {
      this._handleComfirm(idArray, deletePaperById, handleName)
    },

    /**
     * 查看试卷
     */
    handleSelect (row) {
      this.$emit('onEdit', {
        methodName: '查看',
        id: row.id,
      })
    },

    /**
      * 选择试卷
      */
    selectionChange (val) {
      if (val.map(m => m.id) == '') {
        this.selectValue = false
      }
      else {
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
      }
    },
    /**
     * 批量删除
     */
    handleDeleteAll () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项试卷！')
        return
      }
      this.handleDelete(this.selectionValue, '批量删除')
    },


  },
}
</script>

