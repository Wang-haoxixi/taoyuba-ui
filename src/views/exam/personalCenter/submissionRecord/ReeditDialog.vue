<template>
  <iep-dialog :dialog-show="dialogShow" title="重新修改试题" width="500px" @close="handleClose" center>
    <el-form :model="form" size="small" ref="form" label-width="90px">
        <el-form-item label="科目" prop="field">
            <el-select v-model="form.field" size="small" @change="dialogModifyChange">
                <el-option
                v-for="(item, index) in res.exms_subjects"
                :key="index"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="questionType">
            <el-select v-model="form.questionType" size="small" @change="dialogModifyChange">
                <el-option
                v-for="(item, index) in res.exms_question_type"
                :key="index"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="题类" prop="kind">
            <el-select v-model="form.kind" size="small" @change="dialogModifyChange">
                <el-option
                v-for="(item, index) in res.exms_question_category"
                :key="index"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
            <el-select v-model="form.difficulty" size="small" @change="dialogModifyChange">
                <el-option
                v-for="(item, index) in res.exms_difficulty"
                :key="index"
                :label="item.label"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="title">
            <el-input type="textarea" :rows="4" v-model="form.title" size="small" @change="dialogModifyChange"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" prop="creatTime">
            <el-input v-model="form.creatTime" size="small" disabled></el-input>
        </el-form-item>
    </el-form>
    <template slot="footer">
        <operation-wrapper>
        <iep-button :disabled="isModifyChange" type="primary" @click="handleModifySave">提交</iep-button>
        <iep-button @click="handleClose">取消</iep-button>
        </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { getTestOption,postModify } from '@/api/exam/personalCenter/submissionRecord/submissionRecord'
export default {
  data () {
    return {
        isModifyChange: true,
        res: {},
        dialogShow: false,
        form: {
            fieldName: '',
            creatTime: '',
            questionTypeName: '',
            kindName: '',
            difficultyName: '',
            title: '',
        },
    }
  },
  created () {
      this.getTestOption ()
  },
  methods: {
    /**
     * 保存修改
     */
    handleModifySave (){
      var postModifyList = this.form
      postModifyList = JSON.stringify(postModifyList)
      postModify(postModifyList).then( res => {
        if (res.data.data == true){
          this.dialogShow = false,
          this.$message({
            message: '修改成功',
            type: 'success',
          }),
          this.$emit('reload')   
        }
      })
    },
    /**
     * 是否修改选项
     */
    dialogModifyChange (){
      this.isModifyChange = false
    },
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
     * 关闭
     */
    handleClose () {
        this.dialogShow = false
        this.isModifyChange = true
    },
  },
}
</script>