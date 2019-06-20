<template>
  <div>
    <basic-container>
      <page-header title="证书库管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button @click="handleDeleteAll">批量删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="selectionChange" is-mutiple-selection is-index>
        <el-table-column prop="subject" label="科目" min-width="100">
          <template slot-scope="scope">
            {{scope.row.subject}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="levelName" label="级别">
          <template slot-scope="scope">
            {{scope.row.levelName}}
          </template>
        </el-table-column>
        <el-table-column prop="statistics" label="颁发人数">
          <template slot-scope="scope">
            {{scope.row.statistics}}
          </template>
        </el-table-column>
        <el-table-column prop="associatedState" label="状态">
          <template slot-scope="scope">
            <el-tag type="warning" size="medium" v-if="scope.row.associatedState === 0">无关联</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.associatedState === 1">关联中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="颁发机构">
          <template slot-scope="scope">
            {{scope.row.deptName}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)">修改</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    </basic-container>
  </div>
</template>
<script>
import { getCertificatePage, postCertificate, putCertificate, deleteById, deleteIdAll } from '@/api/exam/review'
import AdvanceSearch from './AdvanceSearch'
import DialogForm from './DialogForm'
import { initForm } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, DialogForm },
  data () {
    return {
      selectValue: false,
      selectionValue: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取证书分页数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCertificatePage)
    },

    /**
     * 新增
     */
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postCertificate
      this.$refs['DialogForm'].dialogShow = true
    },

    /**
     * 编辑
     */
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '修改'
      this.$refs['DialogForm'].formRequestFn = putCertificate
      this.$refs['DialogForm'].dialogShow = true
    },

    /**
     * 删除
     */
    handleDelete (row) {
      this._handleComfirm([row.id], deleteById, '删除')
      console.log(row.id)
    },

    /**
     * 选择证书选项，判断是否选择
     */
    selectionChange (val) {
      console.log(val.map(m => m.id))
      if (val.map(m => m.id) == '') {
        this.selectValue = false
        return
      }
      else {
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
        return
      }
    },

    /**
     * 批量删除
     */
    handleDeleteAll () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项试题！')
        return
      }
      if (this.selectValue == true) {
        deleteIdAll(this.selectionValue).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success',
          })
          this.loadPage()
        })
      }
    },
  },
}
</script>

