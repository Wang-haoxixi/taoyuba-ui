<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="danger" @click="handleDeleteAll">批量删除</iep-button>
        <iep-button class="tip">当前已选择<span>{{sumValue}}</span>项</iep-button>
        <iep-button class="empty" @click="handleEmpty" v-show="sumValue != 0">清空</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
      </template>
    </operation-container>

    <iep-table
      :columnsMap="columnsMap"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @selection-change="selectionChange"
      is-mutiple-selection
      is-index>
      <el-table-column prop="remainingTime" label="剩余时间">
        <template slot-scope="scope">
            {{scope.row.remainingTime | setTime}}
          </template>
        </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" size="medium" v-if="scope.row.state === 1">未交卷</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.state === 2">已交卷</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="240">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleRollingTest(scope.row)" v-if="scope.row.state === 1">收卷</iep-button>
            <iep-button @click="handlesetTest(scope.row)" v-if="scope.row.state === 2">设为可考</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form> -->
  </div>
</template>
<script>
import { getExamPaperList,RollingTestById,setTestById,deleteById } from '@/api/exam/examLibrary/examPaper/examPaper'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    label: '姓名',
    prop: 'userName',
  },
  {
    label: '准考证号',
    prop: 'examinationNumber',
  },
  {
    label: '笔试分数',
    prop: 'penScore',
    // type: 'dict',
  },
  {
    label: '面试分数',
    prop: 'interviewScore',
  },
  {
    label: '面试人',
    prop: 'interviewerName',
  },
  // {
  //   label: '剩余时间',
  //   prop: 'remainingTime',
  // },
]
export default {
  mixins: [mixins],
  props: ['record'],

  data () {
    return {
      columnsMap,
      sumValue: 0,
      selectValue: false,
      selectionValue: {},
    }
  },
  filters: {
    setTime (val){
      // console.log('val => ',val)
      var str = new Array()
      str = val.split('-')
      return str[0] + ' : ' + str[1]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取列表分页数据
     */
    loadPage () {
      const param = {
        examinationId: this.record.row.id,
      }
      this.loadTable({...param}, getExamPaperList)
    },

    /**
     * 收卷
     */
    handleRollingTest (val) {
      const param = {
        creatorId: val.creatorId,
        examId: val.examId,
        examinationId: val.examinationId,
      }
      this.$confirm('此操作将对该考生进行收卷，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        RollingTestById(param).then( res => {
          if (res.data.data == true) {
            this.$message({
              type: 'success',
              message: '该试卷已收卷!',
            })
            this.loadPage()
          }
        })
      })
    },


    /**
     * 设为可考
     */
    handlesetTest (val) {
       const param = {
        creatorId: val.creatorId,
        examId: val.examId,
        examinationId: val.examinationId,
      }
      this.$confirm('此操作将对该考生设为可考状态，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        setTestById(param).then( res => {
          if (res.data.data == true) {
            this.$message({
              type: 'success',
              message: '该试卷已设为可考!',
            })
            this.loadPage()
          }
        })
      })
    },

    /**
     * 删除
     */
    handleDelete (val) {
      this._handleComfirm([val.examId], deleteById,'删除')
    },

    /**
     * 选择试题
     */
    selectionChange (val) {
      this.sumValue = val.length
      if (val.map(item => item.id).length > 0){
        this.selectValue = true
        this.selectionValue = val.map(item => item.examId)
      }
      else
        this.selectValue = false
    },

    /**
     * 批量删除
     */
    handleDeleteAll (){
      if (this.selectValue == false){
        this.$message.error('请至少选择一项考试！')
      }

      if (this.selectValue == true) {
        this.$confirm('此操作将删除选中的考试，是否继续？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteById(this.selectionValue).then( res => {
            if (res.data.data == true) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.loadPage()
            }
          })
        })
      }
    },

    /**
     * 清空选择
     */
    handleEmpty () {
    },
  },
}
</script>
<style lang="scss" scoped>
.tip {
  border: 0px solid #ccc;
  &:hover {
    background-color: #fff;
  }
  span {
    color: #419fff;
    font-size: 20px;
    margin: 3px 6px;
  }
}
.empty {
  margin-top: 6px;
  border: 0px solid #ccc;
  color: #419fff;
  &:hover {
    background-color: #fff;
  }
}
</style>
