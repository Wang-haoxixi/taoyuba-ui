<template>
  <iep-dialog :dialog-show="dialogShow" title="编辑" width="60%" @close="resetForm">
    <div class="output">
      <el-input type="textarea" placeholder="若无满足规范性材料的要求，请在此处简要说明相关理由" :autosize="{ minRows: 8, maxRows: 10}" v-model="textarea"></el-input>
      <div class="smallfoot">已输入{{textarea.length}}/500</div>
    </div>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './const'
export default {
  data () {
    return {
      dialogShow: false,
      methodName: '创建',
      textarea: '',
    }
  },
  methods: {
    resetForm () {
      // this.$refs[formName].resetFields()
      this.formData = initForm()
      this.dialogShow = false
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm () {

    },
  },
}
</script>
<style scoped lang="scss">
.smallfoot {
  font-size: 14px;
  color: #ccc;
  position: absolute;
  text-align: right;
  bottom: 10px;
  line-height: 20px;
  left: 0;
  right: 20px;
}
.texta {
  height: 150px !important;
  textarea {
    height: 100% !important;
  }
}
.output {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-height: 150px;
  position: relative;
}
</style>