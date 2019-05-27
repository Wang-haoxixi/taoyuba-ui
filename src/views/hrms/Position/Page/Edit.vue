<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位名称" prop="positionName">
              <el-input v-model="form.positionName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="form.contactPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="递增人数" prop="raiseNo">
              <el-input v-model="form.raiseNo"></el-input>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招聘人数" prop="recruitNo">
              <el-input v-model="form.recruitNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪水" prop="salary">
              <el-input v-model="form.salary"></el-input>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-row>
          <el-col :span="12">
           <el-form-item label="结算方式" prop="settlement">
              <iep-dict-select v-model="form.settlement" dict-name="tyb_settlement"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作类型" prop="workCls">
              <iep-dict-select v-model="form.workCls" dict-name="tyb_work_cls">></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作地点" prop="workPlace">
              <el-input v-model="form.workPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作时间" prop="workTime">
              <el-input v-model="form.workTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="startTime" label-name="开始时间" tip="此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日">
              <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="endTime" label-name="结束时间" tip="此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日">
              <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>

        <iep-form-item class="form-half" prop="workSpecification" label-name="岗位描述" tip="请务必准确规范填写且不少于6条：<br />1、内容要有条理性，次序性，以1、2、3、4.....序列的形式描述；<br />2、岗位职责清晰，语言简练，忌口语化描述；<br />3、岗位职责为该岗位的工作方向，而非具体内容的操作方法；">
          <iep-input-area v-model="form.workSpecification"></iep-input-area>
        </iep-form-item>

        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getPositionById, addPosition, putPosition } from '@/api/post/position'
import { initForm, formToDto, rules, dictsMap } from '../options'
export default {
  data () {
    return {
      dictsMap,
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
    positionId () {
      return +this.$route.params.positionId
    },
    methodName () {
      return this.positionId ? '编辑' : '发布'
    },
  },
  created () {
    if (this.positionId) {
      getPositionById(this.positionId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.form.settlement = this.form.settlement.toString()
        this.form.workCls = this.form.workCls.toString()
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
    handleSubmit (isPublish) {
      const submitFunction = this.positionId ? putPosition : addPosition
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