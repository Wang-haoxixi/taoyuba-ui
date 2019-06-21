<template>
  <basic-container>
    <page-header title="试卷库管理"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd" v-if="permission_exam_testPaper_ex_del">新增试卷</iep-button>
        <iep-button @click="handleDeleteAll" v-if="permission_exam_testPaper_del">批量删除</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" prop="title">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap"
      :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      @selection-change="selectionChange" is-index is-mutiple-selection>

      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope" v-if="permission_exam_testPaper_ex_del ||permission_exam_testPaper_del">
          <operation-wrapper>
            <iep-button type="warning" size="small" plain @click="handleEdit(scope.row)">编辑</iep-button>
            <iep-button @click="handleSelect(scope.row)">查看</iep-button>
            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleDelete([scope.row.id],'删除')">删除</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="share(scope.row)">分享</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
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
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      columnsMap,
      dictsMap,
      selectValue: false,
      selectionValue: '',
      permission_exam_testPaper_del: false,
      permission_exam_testPaper_ex_del: false,
    }
  },
  created () {
    this.loadPage()
    this.permission_exam_testPaper_del = this.permissions['exam_testPaper_del']
    this.permission_exam_testPaper_ex_del = this.permissions['exam_testPaper_ex_del']
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
        iepTestPaperVO: {
          id: '',
        },
      })
    },

    /**
     * 编辑试卷
     */
    handleEdit (row) {
      this.$emit('onEdit', {
        methodName: '编辑',
        iepTestPaperVO: {
          id: row.id,
        },
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
        iepTestPaperVO: {
          id: row.id,
        },
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

