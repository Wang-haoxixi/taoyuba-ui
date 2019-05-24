<template>
  <iep-dialog :dialog-show="dialogShow" title="工作表设置" width="40%" @close="resetForm('form')">
    <el-form class="form" :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="工作表名称：" prop="mingchen">
        <el-input v-model="formData.mingchen"></el-input>
      </el-form-item>
      <div class="title">人员</div>
      <div class="item">
        <div class="head">
          <label>负责人</label><span>拥有工作所有权限</span>
        </div>
        <div class="add"><i class="el-icon-plus"></i></div>
      </div>
      <div class="item">
        <div class="head">
          <label>管理员</label><span>除删除工作表以外所有权限</span>
        </div>
        <div class="add"><i class="el-icon-plus"></i></div>
      </div>
      <div class="item">
        <div class="head">
          <label>普通成员</label><span>可以查看、编辑、导出、分享自己拥有的记录</span>
        </div>
        <div class="add"><i class="el-icon-plus"></i></div>
      </div>

    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, rules } from './option'

export default {
  components: {},
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          { value: 1, label: '选项1' },
          { value: 2, label: '选项2' },
        ],
        dept: [
          { value: 1, label: '部门1' },
          { value: 2, label: '部门2' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  padding: 0 20px;
  .title {
    margin-top: 20px;
    border-top: 1px solid #eee;
    padding-top: 20px;
  }
  .item {
    margin-top: 20px;
    .head {
      margin-bottom: 15px;
      label {
        margin-right: 15px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
    }
    .add {
      width: 40px;
      height: 40px;
      border: 1px dashed #999;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      display: inline-block;
      margin-right: 15px;
      cursor: pointer;
    }
  }
}
</style>
