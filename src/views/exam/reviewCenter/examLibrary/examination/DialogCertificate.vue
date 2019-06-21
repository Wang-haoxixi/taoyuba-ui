<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" plain @click="replaceCertificate" v-if="isShowContactBtn===false">替换证书</iep-button>
        <iep-button type="primary" plain style="margin-left: 10px;" @click="uploadCertificate"
          :disabled="tableData.length>0" v-if="isShowContactBtn===false">上传证书</iep-button>
      </template>
    </operation-container>
    <div class="choice-certificate">
      <el-table :data="tableData" class="table" border :header-cell-style="getRowClass">
        <el-table-column prop="title" label="名称" width="250">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="levelName" label="级别">
          <template slot-scope="scope">
            {{scope.row.levelName}}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="颁发机构">
          <template slot-scope="scope">
            {{scope.row.deptName}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180" v-if="isShowContactBtn===false">
          <iep-button @click="handleDelete()">删除</iep-button>
        </el-table-column>
      </el-table>
    </div>
    <iep-dialog :dialog-show="dialogShow" title="证书选择" width="50%" @close="dialogShow=false">
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable"
        @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="选择" width="50" center>
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
        </template>
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
        <el-table-column prop="deptName" label="颁发机构">
          <template slot-scope="scope">
            {{scope.row.deptName}}
          </template>
        </el-table-column>
      </iep-table>
      <template slot="footer">
        <iep-button type="primary" @click="handleSelect()">选择</iep-button>
        <iep-button @click="dialogShow=false">取消</iep-button>
      </template>
    </iep-dialog>
    <dialog-form ref="DialogForm" @load-data="loadData"></dialog-form>
  </div>
</template>
<script>
import AdvanceSearch from '@/views/exam/reviewCenter/certificateLibrary/AdvanceSearch'
import DialogForm from '@/views/exam/reviewCenter/certificateLibrary/DialogForm'
import mixins from '@/mixins/mixins'
import { getCertificatePage, postCertificate } from '@/api/exam/review'
export default {
  props: {
    isShowContactBtn: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  mixins: [mixins],
  components: { AdvanceSearch, DialogForm },
  data () {
    return {
      dialogShow: false,
      radio: false,
      currentRow: '',
    }
  },
  computed: {
    tableData: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {

    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#000'
      } else {
        return ''
      }
    },
    /**
     * 获取证书分页数据
    */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCertificatePage)
    },

    /**
     * 上传证书
     */
    uploadCertificate () {
      this.$refs['DialogForm'].methodName = '上传'
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].formRequestFn = postCertificate
    },

    /**
     * 替换证书
     */
    replaceCertificate () {
      this.dialogShow = true
      this.loadPage()
    },

    /**
     * 选择证书
     */
    getCurrentRow (row) {
      this.currentRow = row
    },

    /**
     * 上传证书后显示
     */
    loadData (data) {
      if (this.tableData.length > 0) {
        this.tableData.splice(0, 1, data)
      } else {
        this.tableData.push(data)
      }
    },

    /**
     * 删除证书
     */
    handleDelete () {
      this.tableData = []
    },

    /**
     * 选择操作
     */
    handleSelect () {
      if (this.tableData.length > 0) {
        this.tableData.splice(0, 1, this.currentRow)
      } else {
        this.tableData.push(this.currentRow)
      }

      this.dialogShow = false
      this.currentRow = ''
      this.radio = false
    },
  },
}
</script>
<style scoped>
.table >>> .th {
  background: #ccc;
}
.table >>> .ms-tree-space {
  position: relative;
  top: 1px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.table >>> .cell {
  display: flex;
  flex-wrap: wrap;
}
</style>