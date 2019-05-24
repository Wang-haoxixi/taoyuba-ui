<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${methodName}加班申请单`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人：">
              {{form.name}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起时间：">
              {{form.applyStartTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职务：">
              {{form.job}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称：">
              {{form.title}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入职时间：">
              {{form.entryTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="离职时间：">
              <el-input v-model="form.applyStartTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间：">
              <el-input v-model="form.startTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间：">
              <el-input v-model="form.endTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出差地点：">
              <el-input v-model="form.businessPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出差时长：">
              <el-input v-model="form.businessTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="请假类型：">
              <el-input v-model="form.leavingType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请假时长：">
              <el-input v-model="form.leavingTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <el-input v-model="form.positionId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调岗时长：">
              <el-input v-model="form.transferTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <el-input v-model="form.positionId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="加班时长：">
          <el-input v-model="form.overtime"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <el-input v-model="form.annex"></el-input>
        </el-form-item>
        <el-form-item label="审批人：">
          <el-input v-model="form.approver"></el-input>
        </el-form-item>
        <el-form-item label="抄送人：">
          <el-input v-model="form.copyPerson"></el-input>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
            <iep-button @click="handlePublish">保存并发布</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getApprovalInitiateById } from '@/api/hrms/wel'
import { initForm, formToDto } from '../options'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      id: false,
      methodName: '发布',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      form: initForm(),
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getApprovalInitiateById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const publish = isPublish === true ? true : false
      this.formRequestFn(formToDto(this.form), publish).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: `招聘信息${this.methodName}成功`,
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>

<style lang="scss" scoped>
</style>
