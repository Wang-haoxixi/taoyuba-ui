<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}证书库`" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="科目：" prop="field">
        <el-select v-model="form.field" size="small" clearable>
          <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input :maxlength="80" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="级别：" prop="level">
        <el-select v-model="form.level" size="small" clearable>
          <el-option v-for="(item, index) in res.exam_certificate_level" :key="index" :label="item.label"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="颁发机构：" prop="deptId">
        <el-select v-model="form.deptId" size="small" clearable>
          <el-option v-for="(item, index) in resdata" :key="index" :label="item.name" :value="item.orgId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传图标：" prop="iconurl">
        <iep-avatar v-model="form.iconurl"></iep-avatar>
      </el-form-item>
      <el-form-item label="上传证书：" prop="imgurl">
        <iep-avatar v-model="form.imgurl"></iep-avatar>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="loadData('form')" v-if="`${methodName==='上传'}`">确定</iep-button>
      <iep-button type="primary" @click="submitForm('form')" v-else>提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getTestOption } from '@/api/exam/createExam/newTest/newTest'
import { getOrgList } from '@/api/admin/org'
import { initForm } from './options'
export default {
  name: 'DialogForm',
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '',
      form: initForm(),
      limit: 1,
      res: {},
      resdata: {},
      rules: {
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        field: [{ required: true, message: '请选择科目', trigger: 'blur' }],
        level: [{ required: true, message: '请选择级别', trigger: 'blur' }],
        deptId: [{ required: true, message: '请选择颁发机构', trigger: 'blur' }],
      },
    }
  },
  created () {
    this.getTestOption()
    this.getOrgList()
  },
  methods: {
    /**
     * 关闭弹窗并传函数回列表页触发刷新
     */
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },

    /**
    * 获取下拉科目、级别数据
    */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//科目
          'exam_certificate_level',//级别
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },

    /**
    * 获取组织部门数据
    */
    async getOrgList () {
      const params = ''
      const { data } = await getOrgList(params)
      this.resdata = data.data
      //console.log(this.resdata)
    },

    /**
     * 确定
     */
    loadData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.form.levelName = this.res.exam_certificate_level.find(item => {
            return item.id === this.form.level
          }).label

          this.form.deptName = this.resdata.find(item => {
            return item.orgId === this.form.deptId
          }).name
          this.$emit('load-data', this.form)
          this.form = initForm()
          this.dialogShow = false
        } else {
          return false
        }
      })
    },

    /**
     * 提交
     */
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            //console.log(this.form)
            this.$message({
              message: `证书库${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

