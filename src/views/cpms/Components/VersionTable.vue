<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
      </template>
    </operation-container>
    <el-table :data="tableData">
      <el-table-column label="版本号">
        <template slot-scope="scope">
          {{scope.row.versionNumber}}
        </template>
      </el-table-column>
      <el-table-column label="上线时间">
        <template slot-scope="scope">
          {{scope.row.onlineTime | parseTime('{y}-{m}-{d}')}}
        </template>
      </el-table-column>
      <el-table-column label="更新内容">
        <template slot-scope="scope">
          {{scope.row.updateContent}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <iep-dialog :dialog-show="dialogShow" :title="`${title}版本`" width="400px" @close="loadPage">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="版本号">
          <el-input v-model="form.versionNumber"></el-input>
        </el-form-item>
        <el-form-item label="上线时间">
          <iep-date-picker v-model="form.onlineTime" type="date" placeholder="请选择上线时间"></iep-date-picker>
        </el-form-item>
        <el-form-item label="更新内容">
          <iep-input-area v-model="form.updateContent" :maxlength="200"></iep-input-area>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { postVersion, putVersion, deleteVersionById } from '@/api/cpms/version'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  name: 'IepCpmsVersionTable',
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    productId: {
      type: [Number, String],
      default: null,
    },
    moduleId: {
      type: [Number, String],
      default: null,
    },
  },
  data () {
    return {
      dialogShow: false,
      form: this.initForm(),
      formRequestFn: () => { },
      title: '添加',
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
    initForm () {
      return {
        id: '',
        productId: this.productId,//产品id
        moduleId: this.moduleId,//模块id
        versionNumber: '',//版本号
        updateContent: '',//更新内容
        onlineTime: '', // 上线时间
      }
    },
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteVersionById)
      this.loadPage()
    },
    handleAdd () {
      this.title = '添加'
      this.formRequestFn = postVersion
      this.form = this.initForm()
      this.dialogShow = true
    },
    handleEdit (row) {
      this.title = '修改'
      this.formRequestFn = putVersion
      this.form = this.$mergeByFirst(this.initForm(), row)
      this.dialogShow = true
    },
  },
}
</script>
