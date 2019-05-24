<template>
  <el-form :model="matterForm" ref="matterForm" class="form-inline" label-width="160px" size="small" :rules="rules" :disabled="disabled">
    <el-form-item label="实施机构：" prop="deptId">
      <dept-select v-model="matterForm.deptId" placeholder="请选择该事项的实施机构"></dept-select>
    </el-form-item>
    <el-form-item label="事项类别：" prop="type">
      <el-cascader :options="dicList['MAT_ITEM_TYPE']" v-model="matterForm.type" :disabled="deptDisabled" placeholder="请选择事项类别">
      </el-cascader>
    </el-form-item>
    <el-form-item label="事项名称：" prop="name">
      <el-input v-model="matterForm.name" placeholder="新增事项的名称" :maxlength="50"></el-input>
    </el-form-item>
    <el-form-item label="事项代码：" prop="code" :rules="[
    { required: true, message: '请输入事项代码', trigger: 'blur' },
    { min: maxlength, max: maxlength, message: `长度在 ${maxlength} 个字符`, trigger: 'blur' }
    ]">
      <el-input v-model="matterForm.code" :maxlength="maxlength" :placeholder="`最长长度为 ${maxlength} 位`"></el-input>
    </el-form-item>
    <el-form-item v-if="matterForm.level < 3" :label="`是否有${levelChildName}：`">
      <el-switch v-model="matterForm.isChild" active-text="是" inactive-text="否" :active-value="2" :inactive-value="1">
      </el-switch>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!disabled" type="primary" @click="handleSubmit('matterForm');">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { postMatter, putMatter } from '@/api/cbs/matter'
import deptSelect from '../DeptSelect'
// import {initMatterForm} from './init'
export default {
  components: { deptSelect },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    form: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  data () {
    console.log(this.form)
    return {
      matterForm: this.form,
      rules: {
        deptId: [{ required: true, message: '请输入填入部门', trigger: 'blur' }],
        type: [{ required: true, message: '请输入事项类别', trigger: 'blur' }],
        name: [{ required: true, message: '请输入事项名称', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    deptDisabled () {
      return this.form.level > 1 ? true : false && !this.form.id
    },
    maxlength () {
      const maxlengthTemplate = [5, 5, 3, 2]
      return maxlengthTemplate[this.form.level]
    },
    levelChildName () {
      const levelChildNameTemplate = ['子项', '子项', '办理项']
      return levelChildNameTemplate[this.form.level]
    },
    isEdit () {
      return this.form.id ? true : false
    },
  },
  created () {
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const submitFunction = this.isEdit ? putMatter : postMatter
          submitFunction(this.matterForm).then(({ data }) => {
            if (!data.data) {
              this.$message({
                message: data.msg,
                type: 'warning',
              })
            }
            this.$emit('close')
          })
        }
      })
    },
  },
}
</script>
