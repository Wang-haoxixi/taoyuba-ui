<template>
  <steps-content>
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px" class="content-wrapper">
      <el-form-item label="试卷名称：" prop="title">
        <el-input v-model="form.title" :readonly="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="试卷科目：" prop="field">
        <el-select v-model="form.field" clearable placeholder="请选择科目" :disabled="readOnly">
          <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleNext()">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from '../StepsContent'
import { initForm } from '../option'
import { getTestPaperById } from '@/api/examPaper/examPaperApi'
import { getTestOption } from '@/api/exam/createExam/newTest/newTest'
export default {
  props: ['data'],
  components: { StepsContent },
  data () {
    return {
      form: initForm(),
      rules: {
        title: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' },
        ],
        field: [
          { required: true, message: '请选择试卷类型', trigger: 'change' },
        ],
      },
      res: [],
    }
  },
  computed: {
    isEdit () {
      return this.data.id ? true : false
    },
    readOnly () {
      if (this.isEdit) {
        return this.data.methodName === '查看' ? true : false
      } else {
        return false
      }
    },
  },
  created () {
    this.getTestOption()
    this.getTestPaper(this.data.id)
  },
  methods: {
    /**
     * 下一步
     */
    handleNext () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let testPaper = Object.assign(this.data, this.form)
          this.$emit('on-data', testPaper)
        }
      })
    },

    /**
     * 获取试卷
     */
    getTestPaper (id) {
      getTestPaperById({ id: id }).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data[0])
      })
    },

    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },
  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 50%;
}
</style>
