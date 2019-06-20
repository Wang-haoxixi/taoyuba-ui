<template>
  <iep-dialog :dialog-show="dialogShow" title="查看试题" width="500px" @close="dialogShow = false" center>
    <el-form :model="form" size="small" ref="form" label-width="100px" style="padding-right: 25px;">
        <el-form-item label="科目" prop="fieldName">
            <el-input v-model="form.fieldName" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="题型" prop="questionTypeName">
            <el-input v-model="form.questionTypeName" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="题类" prop="kindName">
            <el-input v-model="form.kindName" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="难度" prop="difficultyName">
            <el-input v-model="form.difficultyName" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="提交时间" prop="creatTime">
            <el-input v-model="form.creatTime" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="title">
            <el-input type="textarea" rows="4" v-model="form.title" size="small" disabled></el-input>
        </el-form-item>
    </el-form>
    <template slot="footer">
        <operation-wrapper>
        <iep-button type="primary" @click="dialogShow = false">确定</iep-button>
        </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
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
  },
  methods: {
  },
}
</script>