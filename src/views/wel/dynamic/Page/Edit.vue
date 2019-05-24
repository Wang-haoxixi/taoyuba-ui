<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：" prop="position">
              <iep-cascader ref="IepCascader" v-model="form.position" prefix-url="hrms/post_type" @change="handlePositionChange"></iep-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="dept">
              <span slot="label">
                所属部门
                <iep-tip content="请准确选择人才需求部门"></iep-tip>
                ：
              </span>
              <iep-cascader v-model="form.dept" prefix-url="admin/dept" change-on-select></iep-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘人数：" prop="recruitsCount">
              <iep-input-number v-model="form.recruitsCount"></iep-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标人数：" prop="targetCount">
              <iep-input-number v-model="form.targetCount"></iep-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学历要求：" prop="academicId">
              <iep-dict-select v-model="form.academicId" dict-name="hrms_highest_educational"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作类型：" prop="jobTypeId">
              <iep-dict-select v-model="form.jobTypeId" dict-name="hrms_work_type"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作年限：" prop="years">
              <iep-dict-select v-model="form.years" dict-name="hrms_working_life"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="profession">
              <span slot="label">
                专业要求
                <iep-tip content="多项内容时使用“/”分开，如无要求则填“无”"></iep-tip>
                ：
              </span>
              <el-input v-model="form.profession" :maxlength="2010"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作地点：" prop="place">
              <iep-dict-select v-model="form.place" dict-name="hrms_work_place"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="3">不限</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="treatment">
              <span slot="label">
                工资待遇
                <iep-tip content="请务必以区间形式体现且标明年薪还是月薪，如3000-5000元/月，5-6万/年"></iep-tip>
                ：
              </span>
              <iep-dict-select v-model="form.treatment" dict-name="hrms_wages_salaries"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="language">
              <span slot="label">
                外语要求
                <iep-tip content="此处填写语种+等级，如大学英语四级，日语二级"></iep-tip>
                ：
              </span>
              <iep-dict-select v-model="form.language" dict-name="hrms_foreign_language"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="term">
              <span slot="label">
                招聘期限
                <iep-tip content="此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日"></iep-tip>
                ：
              </span>
              <iep-date-picker v-model="form.term" type="date" placeholder="选择日期"></iep-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="welfare">
              <span slot="label">
                福利待遇
                <iep-tip content="此处如需填写多项内容时，请用“/”分开"></iep-tip>
                ：
              </span>
              <iep-dict-select v-model="form.welfare" dict-name="hrms_fringe_benefits"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="duties">
          <span slot="label">
            岗位职责
            <iep-tip content="请务必准确规范填写且不少于6条：<br />1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br />2、岗位职责清晰，语言简练，忌口语化描述；<br />3、岗位职责为该岗位的工作方向，而非具体内容的操作方法；"></iep-tip>
            ：
          </span>
          <iep-input-area v-model="form.duties"></iep-input-area>
        </el-form-item>
        <el-form-item prop="claim">
          <span slot="label">
            岗位要求
            <iep-tip content="请务必准确规范填写：<br/>1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br/>2、岗位要求具体内容与岗位职责描述相匹配，切记不搭边。"></iep-tip>
            ：
          </span>
          <iep-input-area v-model="form.claim"></iep-input-area>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
            <iep-button @click="handlePublish">保存并发布</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentById, postPublishRecruitment, putPublishRecruitment } from '@/api/hrms/publish_recruitment'
import { initForm, formToDto, rules } from '../options'
import _ from 'lodash'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '发布'
    },
  },
  created () {
    if (this.id) {
      getPublishRecruitmentById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  mounted () {
    if (this.$route.query.position) {
      const position = this.$route.query.position.map(m => +m) || []
      this.form.position = position || []
      setTimeout(() => {
        this.$refs['IepCascader'].handleChange(position)
      }, 2000)
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePositionChange (item, options) {
      const value = item[item.length - 1]
      const position = _(options)
        .thru(function (coll) {
          return _.union(coll, _.map(coll, 'children'))
        })
        .flatten()
        .find({ value })
      if (position) {
        this.form.duties = position.duty
        this.form.claim = position.rqmt
      }
    },
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const submitFunction = this.id ? putPublishRecruitment : postPublishRecruitment
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `招聘信息${this.methodName}成功`,
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })

    },
  },
}
</script>