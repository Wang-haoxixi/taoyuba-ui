<template>
  <steps-content v-if="data.resource===1">
    <el-card shadow="never" class="content-wrapper">
      <div slot="header">
        <span>试卷抽取</span>
      </div>
      <operation-container>
        <template slot="right">
          <operation-search prop="title" @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap"
        :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="选择" width="50" center>
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </el-card>
    <template v-slot:action>
      <el-button style="margin-left: 8px" @click="handlePrev">
        上一步
      </el-button>
      <el-button type="primary" @click="handleDraw()">
        抽取
      </el-button>
    </template>
  </steps-content>
  <created-new-paper v-else :data="data" @on-data="onData" @prev="handlePrev"></created-new-paper>
</template>
<script>
import mixins from '@/mixins/mixins'
import AdvanceSearch from '@/views/exam/reviewCenter/testPaperLibrary/AdvanceSearch'
import StepsContent from '@/views/exam/reviewCenter/testPaperLibrary/StepsContent'
import CreatedNewPaper from '@/views/exam/reviewCenter/testPaperLibrary/testPaper/SecondContent'
import { columnsMap, dictsMap } from '../../../testPaperLibrary/option'
import { getExamPagerList } from '@/api/examPaper/examPaperApi'
export default {
  mixins: [mixins],
  props: ['data'],
  components: { StepsContent, AdvanceSearch, CreatedNewPaper },
  data () {
    return {
      columnsMap,
      dictsMap,
      radio: false,
      currentRow: '',
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
     * 选取试卷 
     */
    getCurrentRow (row) {
      this.currentRow = row
    },

    /**
     * 抽取
     */
    handleDraw () {
      if (this.currentRow == null) {
        this.$message.error('请选择一份试卷进行抽取')
        return
      }
      const record = {
        methodName: this.data.methodName,
        iepTestPaperVO: this.currentRow,
      }
      this.$emit('on-data', record)
    },

    /**
     * 上一步
     */
    handlePrev () {
      this.$emit('prev', { ...this.data })
    },

    /**
     * 下一步
     */
    onData (data) {
      const record = {
        methodName: this.data.methodName,
        iepTestPaperVO: data,
      }
      this.$emit('on-data', record)
    },

  },
}
</script>

<style lang="scss" scoped>
.el-radio {
  margin: 0;
}
.content-wrapper {
  width: 100%;
}
</style>
