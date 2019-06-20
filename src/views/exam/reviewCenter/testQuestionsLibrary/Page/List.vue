<template>
  <div>
    <basic-container>
      <page-header title="试题库管理" :data="[10, 5]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" icon="el-icon-plus" type="primary" plain>新增试题</iep-button>
          <iep-button @click="handleDeleteAll">批量删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="title" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <div class="table">
        <iep-table
          :isLoadTable="isLoadTable"
          :pagination="pagination"
          :pagedTable="pagedTable"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @select="handleSelectChange"
          @select-all="handleSelectAllChange"
          is-mutiple-selection
          is-index
        >
          <el-table-column prop="fieldName" label="科目" min-width="100" sortable>
            <template slot-scope="scope">
              {{scope.row.fieldName}}
            </template>
          </el-table-column>
          <el-table-column prop="questionTypeName" label="题型" sortable>
            <template slot-scope="scope">
              {{scope.row.questionTypeName}}
            </template>
          </el-table-column>
          <el-table-column prop="kindName" label="题类" sortable>
            <template slot-scope="scope">
              {{scope.row.kindName}}
            </template>
          </el-table-column>
          <el-table-column prop="title" label="内容" min-width="80" sortable>
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column prop="difficultyName" label="难度" sortable min-width="75">
            <template slot-scope="scope">
              {{scope.row.difficultyName}}
            </template>
          </el-table-column>
          <el-table-column prop="associatedState" label="关联" sortable min-width="68">
            <template slot-scope="scope">
              <el-tag
                type="success"
                size="medium"
                v-if="scope.row.associatedState === 0"
              >不限</el-tag>
              <el-tag
                type="warning"
                size="medium"
                v-if="scope.row.associatedState === 1"
              >限考试</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" sortable>
            <template slot-scope="scope">
              <el-tag
                type="info"
                size="medium"
                v-if="scope.row.status === 0"
              >审核中</el-tag>
              <el-tag
                type="success"
                size="medium"
                v-if="scope.row.status === 1"
              >通过</el-tag>
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content">未通过原因：<br/>{{scope.row.reason}}</div>
                <el-tag
                  type="warning"
                  size="medium"
                  v-if="scope.row.status === 2"
                >未通过</el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="提交者" sortable>
            <template slot-scope="scope">
              {{scope.row.username}}
            </template>
          </el-table-column>
          <el-table-column prop="creatTime" label="提交时间" width="148" sortable>
            <template slot-scope="scope">
              {{scope.row.creatTime}}
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="250">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button type="warning" plain @click="handleExamine(scope.row)">审核</iep-button>
                <iep-button @click="handleModify(scope.row)">修改</iep-button>
                <iep-button @click="handleDelete(scope.row)">删除</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </div>

    </basic-container>

    <iep-dialog :dialog-show="dialogExamine" title="审核" width="520px" @close="handleExamineCancel" center>
      <div style="text-align: center;">
        <el-radio-group v-model="states">
          <el-radio :label="0">审核通过</el-radio>
          <el-radio :label="1">审核不通过</el-radio>
        </el-radio-group>
        <el-input
          v-if="states === 1" v-model="content"
          type="textarea"
          maxlength="1000"
          rows="4"
          style="margin-top:25px;"
          placeholder="请输入理由，字数不超过 1000 ！">
        </el-input>
      </div>
      <template slot="footer">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          <iep-button @click="handleExamineCancel">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>

    <iep-dialog :dialog-show="dialogModify" title="修改试题" width="500px" @close="handleModifyCancel" center>
      <el-form :label-position="labelPosition" label-width="100px" :model="reForm">
        <div class="select">
          <el-form-item style="padding-right: 25px;" label="科目：" prop="field">
            <el-select class="select" v-model="reForm.field" size="small" @change="dialogModifyChange">
              <el-option
                v-for="(item, index) in res.exms_subjects"
                :key="index"
                :label="item.label"
                :value="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="题型：" prop="questionType">
            <el-select v-model="reForm.questionType" size="small" @change="dialogModifyChange">
              <el-option
                v-for="(item, index) in res.exms_question_type"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="题类：" prop="kind">
            <el-select v-model="reForm.kind" size="small" @change="dialogModifyChange">
              <el-option
                v-for="(item, index) in res.exms_question_category"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="难度：" prop="difficulty">
            <el-select v-model="reForm.difficulty" size="small" @change="dialogModifyChange">
              <el-option
                v-for="(item, index) in res.exms_difficulty"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="关联：" prop="associatedState">
            <el-select v-model="reForm.associatedState" size="small" @change="dialogModifyChange">
              <el-option
                v-for="(item, index) in associatedStateList"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="titleList" label="内容：" prop="title">
            <el-input type="textarea" :rows="4" v-model="reForm.title" @change="dialogModifyChange"></el-input>
          </el-form-item>
          <el-form-item class="titleList" label="关联标签：" prop="tagLists">
            <mutiply-tag-select v-model="reForm.tagLists" :select-objs="reForm.tagsList"></mutiply-tag-select>
          </el-form-item>
        </div>
      </el-form>
      <template slot="footer">
        <operation-wrapper>
          <iep-button :disabled="isModifyChange" type="primary" @click="handleModifySave">提交</iep-button>
          <iep-button @click="handleModifyCancel">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>

  </div>
</template>

<script>
import AdvanceSearch from './AdvanceSearch'
import { getTestList,deleteApprovalById,getTestOption,postExaminePass,postExamineFalse,postModify } from '@/api/exam/createExam/newTest/newTest'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import mixins from '@/mixins/mixins'

export default {
  mixins: [mixins],
  components: { AdvanceSearch,MutiplyTagSelect },
  data () {
    return {
      examine: {},//审核
      isModifyChange: true,//是否被修改
      selectValue: false,
      selectionValue: {},
      res: {},
      labelPosition: 'right',
      states: 0,
      content: '',
      flag: false,
      dialogExamine: false,
      dialogModify: false,
      reForm: {
        field: '',
        questionType: '',
        kind: '',
        difficulty: '',
        title: '',
        tagLists: [],
        associatedState: '',
      },
      associatedStateList: [
        {id: 0,label: '不限'},
        {id: 1,label: '限考试'},
      ],
    }
  },
  created () {
    this.loadPage ()
    this.getTestOption ()
  },
  methods: {
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },
    /**
     * 获取试题数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTestList)
    },
    /**
     * 新增试题
     */
    handleAdd (){
      // this.$router.push('/exam/createExam/newTest/')
      this.$emit('onEdit')
    },
    /**
     * 审核按钮
     */
    handleExamine (row){
      this.dialogExamine = true
      this.examine = row.id
    },
    /**
     * 修改按钮
     */
    handleModify (rows){
      this.dialogModify = true
      this.reForm = {...rows}
    },
    /**
     * 删除按钮
     */
    handleDelete (row){
      this._handleComfirm([row.id], deleteApprovalById,'删除')
      //console.log(row.id)
    },
    /**
     * 选择试题
     */
    handleSelectChange (row) {
      if (row.map(item => item.id).length > 0){
        this.selectValue = true
        this.selectionValue = row.map(item => item.id)
      }
      else
        this.selectValue = false
    },
    /**
     * 全选按钮
     */
    handleSelectAllChange (row){
      if (row.map(item => item.id).length > 0){
        this.selectValue = true
        this.selectionValue = row.map(item => item.id)
      }
      else
        this.selectValue = false
    },
    /**
     * 批量删除按钮
     */
    handleDeleteAll (){
      if (this.selectValue == false){
        this.$message.error('请至少选择一项试题！')
        return
      }
      if (this.selectValue == true){
        this._handleComfirm(this.selectionValue, deleteApprovalById,'删除')
        this.selectValue = false
      }
    },
    /**
     * 修改取消
     */
    handleModifyCancel (){
      this.dialogModify = false
      this.states = 0
      this.content = ''
      this.isModifyChange = true
      // this.$refs['reform'].resetFields()
    },
    /**
     * 审核取消
     */
    handleExamineCancel (){
      this.dialogExamine = false
      this.states = 0
      this.content = ''
    },
    /**
     * 审核提交
     */
    handleSubmit (){
      if (this.states === 0){
        let postExaminePassList = {
          id: null,
        }
        postExaminePassList.id = this.examine
        postExaminePass(postExaminePassList).then( res => {
          if (res.data.data == true) {
            this.dialogExamine = false,
            this.$message({
              message: '该试题审核通过',
              type: 'success',
            }),
            this.loadPage()
          }
        })
      }
      if (this.states === 1 && this.content != ''){
        let postExamineFalseList = {
          id: null,
          reason: '',
        }
        postExamineFalseList.id = this.examine
        postExamineFalseList.reason = this.content
        postExamineFalseList = JSON.stringify(postExamineFalseList)
        postExamineFalse(postExamineFalseList).then( res => {
          if (res.data.data == true){
            this.dialogExamine = false,
            this.$message({
              message: '该试题审核不通过',
              type: 'success',
            }),
            this.loadPage()
          }
        })
      }
      if (this.states === 1 && this.content == ''){
        this.$message({
          message: '请填写理由！',
          type: 'warning',
        })
      }
    },
    /**
     * 是否修改选项
     */
    dialogModifyChange (){
      this.isModifyChange = false
    },
    /**
     * 保存修改
     */
    handleModifySave (){
      var postModifyList = this.reForm
      postModifyList = JSON.stringify(postModifyList)
      postModify(postModifyList).then( res => {
        if (res.data.data == true) {
          this.dialogModify = false,
          this.$message({
            message: '修改成功',
            type: 'success',
          }),
          this.loadPage()
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.titleList {
  margin-top: -21px;
  padding-right: 23px;
}
</style>
<style scoped>
.table >>> th > .cell {
  line-height: 32px;
}
.select >>> .el-input .el-select__caret {
  line-height: 2.9;
}
</style>

