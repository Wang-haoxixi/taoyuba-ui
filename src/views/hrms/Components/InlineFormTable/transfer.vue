<template>
  <div>
    <el-table :data="data" style="width: 100%" border size="small">
      <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columns" :key="idx">
        <template slot-scope="scope">
          <iep-dict-detail v-if="item.type === 'dict'" size="mini" :value="scope.row[item.prop]" :dict-name="item.dictName"></iep-dict-detail>
          <iep-date-range-select v-else-if="item.type === 'daterange'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" disabled></iep-date-range-select>
          <iep-div-detail v-else :value="scope.row[item.prop]"></iep-div-detail>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <!-- <iep-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</iep-button>
          <a-divider type="vertical" /> -->
          <a-popconfirm title="是否要删除此数据？" okText="确认" cancelText="取消" @confirm="handleRemove(scope.row)">
            <iep-button type="text" size="mini">删除</iep-button>
          </a-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <iep-button style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="handleAdd" plain>新增</iep-button>
    <iep-dialog :dialog-show="dialogShow" :title="methodName" width="520px" @close="dialogShow=false">
      <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
        <el-form-item label="调动类型" prop="position">
          <iep-dict-select v-model="form.type" dict-name="hrms_transfer_type"></iep-dict-select>
        </el-form-item>
        <el-form-item label="调动日期" prop="transferTime">
          <iep-date-picker v-model="form.transferTime" type="date" placeholder="选择日期">
          </iep-date-picker>
        </el-form-item>
        <el-form-item v-if="form.type == 3" label="岗位：" prop="relationId">
          <iep-cascader v-model="form.relationId" prefix-url="hrms/post_type" :disabled="!!form.staffId"></iep-cascader>
        </el-form-item>
        <el-form-item v-if="form.type == 2" label="职务：" prop="relationId">
          <iep-select prefix-url="hrms/job_system" v-model="form.relationId" :disabled="!!form.staffId"></iep-select>
        </el-form-item>
        <el-form-item v-if="form.type == 1" label="职称：" prop="relationId">
          <iep-select prefix-url="hrms/title_system" v-model="form.relationId" :disabled="!!form.staffId"></iep-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="handleSave('form')">保存</iep-button>
        <iep-button @click="dialogShow=false">取消</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>
<script>
import { post, put, del } from './inline'
function initForm () {
  return {
    type: '',
    transferTime: '',
    relationId: '',
  }
}
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    requestName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rid: {
      type: [Number, String],
      required: true,
    },
  },
  data () {
    return {
      form: initForm(),
      rules: {},
      data: [],
      dialogShow: false,
      methodName: '新增',
      requestFunction: post,
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.data = this.tableData.filter(m => m.type !== 4)
    },
    handleAdd () {
      this.form = initForm()
      this.methodName = '新增'
      this.requestFunction = post
      this.dialogShow = true
    },
    handleEdit (row) {
      this.methodName = '编辑'
      this.requestFunction = put
      this.form = { ...row }
      this.form.relationId = ''
      this.form.type = this.form.type + ''
      this.dialogShow = true
    },
    handleSave () {
      this.form.relationId = this.form.relationId[1] || this.form.relationId
      this.requestFunction(this.form, this.requestName, this.type, this.rid).then(({ data }) => {
        if (data.data) {
          this.form = initForm()
          this.dialogShow = false
          this.$emit('load-page')
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleRemove (row) {
      del(row.id, this.requestName).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.$emit('load-page')
      })
    },
  },
  watch: {
    tableData () {
      this.initData()
    },
  },
}
</script>
