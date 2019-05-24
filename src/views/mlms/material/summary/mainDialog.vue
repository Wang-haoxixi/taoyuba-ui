<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}纪要`" :backOption="backOption"></page-header>
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;">
        <el-form-item label="会议类型：" prop="meetingType">
          <el-radio-group v-model="formData.meetingType">
            <el-radio v-for="(item, index) in dictGroup.mlms_meeting_type" :key="index" :label="item.value" @change="typeChange">
              {{item.label}}
              <iep-tip :content="tipContent.meetingType[item.value]"></iep-tip>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="拜访对象：" prop="visitingUserId" v-if="formData.type == 1">
          <iep-select prefix-url="crm/customer" v-model="formData.visitingUserId" multiple></iep-select>
        </el-form-item> -->
        <el-form-item label="拜访对象：" prop="visitingUserId" v-if="formData.type == 1">
          <IepCrmsSelectMultiple v-model="formData.visitingUserId" :option="formData.visitingUser" prefixUrl="crm/customer/all/list"></IepCrmsSelectMultiple>
        </el-form-item>
        <el-form-item :label="`${formData.type == 0 ? '会议主题 ':'会议标题'}：`" prop="title">
          <el-input v-model="formData.title" maxlength="50" :placeholder="tipContent.title"></el-input>
        </el-form-item>
        <el-form-item label="会议内容：" prop="meetingContent">
          <iep-froala-editor v-model="formData.meetingContent" :placeholder="tipContent.meetingContent"></iep-froala-editor>
        </el-form-item>
        <el-form-item label="会议总结：" prop="meetingCon">
          <!-- <el-input type="textarea" v-model="formData.meetingCon" rows=8 maxlength="1000" :placeholder="tipContent.meetingCon"></el-input> -->
<el-input type="textarea" v-model="formData.meetingCon" rows=8 maxlength="1000" placeholder="一、简明扼要说明会议精神，如1、2、3......
二、清晰罗列下一步工作计划，如1、2、3......（关联人员需要着重说明）"></el-input>
        </el-form-item>
        <el-form-item label="感想与困惑：" prop="thoughtsProblem">
          <!-- <el-input type="textarea" v-model="formData.thoughtsProblem" rows=5 maxlength="1000" :placeholder="tipContent.thoughtsProblem"></el-input> -->
<el-input type="textarea" v-model="formData.thoughtsProblem" rows=5 maxlength="1000" placeholder="1、分段发表感想和说明困惑之处，如1、2、3......
2、感想主要围绕会议中所汇报内容和指导意见如何应用到之后工作中；
3、困惑主要围绕目前工作中疑惑不解，需要寻求帮助的事情。"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会议时间" prop="meetingTime">
              <!-- <IepDatePicker v-model="formData.meetingTime"></IepDatePicker> -->
              <span slot="label">
                会议时间
                <iep-tip :content="tipContent.meetingTime"></iep-tip>：
              </span>
              <el-date-picker v-model="formData.meetingTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.type == 0">
            <el-form-item label="会议地点：" prop="meetingLocation">
              <span slot="label">
                会议地点
                <iep-tip :content="tipContent.meetingLocation"></iep-tip>：
              </span>
              <el-input v-model="formData.meetingLocation" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="拜访形式：" prop="visitType" v-if="formData.type == 1">
          <el-radio-group v-model="formData.visitType">
            <el-radio v-for="(item, index) in dictGroup.mlms_visit_type" :key="index" :label="''+item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="visitingAddress" v-if="formData.visitType == '1' && formData.type == 1">
          <el-input v-model="formData.visitingAddress" placeholder="请输入面访具体地址"></el-input>
        </el-form-item>
        <el-form-item label="会议标签：" prop="tagKeyWords">
          <iep-tag v-model="formData.tagKeyWords"></iep-tag>
          <div style="font-size: 12px;color: #aaa;">{{tipContent.tagKeyWords}}</div>
        </el-form-item>
        <el-form-item label="主持人：" prop="hostList">
          <span slot="label">
            主持人
            <iep-tip :content="tipContent.hostList"></iep-tip>：
          </span>
          <div style="width: 200px;">
            <iep-contact-select v-model="formData.hostList"></iep-contact-select>
          </div>
        </el-form-item>
        <el-form-item label="参会人：" prop="attendeeList">
          <span slot="label">
            参会人
            <iep-tip :content="tipContent.attendeeList"></iep-tip>：
          </span>
          <iep-contact-multiple v-model="formData.attendeeList" :filterUserList="attendeeUserList"></iep-contact-multiple>
        </el-form-item>
        <el-form-item label="抄送人：" prop="receiverList">
          <span slot="label">
            抄送人
            <iep-tip :content="tipContent.receiverList"></iep-tip>：
          </span>
          <iep-contact-multiple v-model="formData.receiverList" :filterUserList="receiverUserList"></iep-contact-multiple>
        </el-form-item>
        <!-- <el-form-item label="接收人" prop="">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item> -->
        <!-- <el-form-item label="关联报表" prop="baobiao">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item> -->
        <el-form-item label="关联项目：" prop="projectList">
          <el-tag type="info" v-for="(item, index) in formData.projectList" :key="index">{{item.name}}</el-tag>
          <iep-button @click="selectProject"><i class="el-icon-plus"></i></iep-button>
        </el-form-item>

      </el-form>
      <footer-tool-bar>
        <iep-button type="primary" @click="handlePreview">预览</iep-button>
        <iep-button type="primary" @click="saveDraft('form')" v-if="formData.status == 1 || methodName == '创建'" :loading="loadState">保存草稿</iep-button>
        <iep-button type="primary" @click="saveForm('form')" :loading="loadState">{{formData.isSend == 0 ? '保存' : '保存并发送'}}</iep-button>
        <iep-button @click="resetForm('form')">取消</iep-button>
      </footer-tool-bar>
    </basic-container>
    <!-- 关联项目 -->
    <projectDialog ref="project" @selectProject="submitProject"></projectDialog>
    <!-- 预览 -->
    <previewDialog ref="preview"></previewDialog>
  </div>
</template>
<script>
import { initFormData, dictsMap, rules, tipContent } from './options'
import { mapGetters } from 'vuex'
import { getCustomerPage } from '@/api/crms/customer'
import { createData, updateData, getDataById, meetingSend } from '@/api/mlms/material/summary'
import projectDialog from './projectDialog'
import previewDialog from './previewDialog'

export default {
  components: { projectDialog, previewDialog },
  data () {
    return {
      loadState: false,
      dictsMap,
      tipContent,
      formRequestFn: createData,
      methodName: '创建',
      methodType: 'create',
      formData: initFormData(),
      rules,
      clientList: [],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.goBack()
        },
      },
      backRouter: '/wel/material/summary',
      pageState: 'summary',
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    attendeeUserList () {
      let list = []
      if (this.formData.hostList.id) {
        list.push(this.formData.hostList.id)
      }
      for (let item of this.formData.receiverList.orgs) {
        list.push(item.id)
      }
      for (let item of this.formData.receiverList.users) {
        list.push(item.id)
      }
      return list
    },
    receiverUserList () {
      let list = []
      if (this.formData.hostList.id) {
        list.push(this.formData.hostList.id)
      }
      for (let item of this.formData.attendeeList.orgs) {
        list.push(item.id)
      }
      for (let item of this.formData.attendeeList.users) {
        list.push(item.id)
      }
      return list
    },
  },
  methods: {
    // 保存
    saveForm (formName) {
      delete this.formData.createTime
      delete this.formData.updateTime
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.status = 0
          this.submitForm()
        } else {
          return false
        }
      })
    },
    // 保存草稿
    saveDraft () {
      if (this.formData.title == '') {
        this.$message.error('请至少填写会议的标题！')
        return
      }
      this.formData.status = 1 // 草稿状态为 1
      this.submitForm()
    },
    // 提交数据
    submitForm () {
      this.loadState = true
      this.formData.hostId = this.formData.hostList.id
      this.formData.attendee = {
        orgIds: this.formData.attendeeList.orgs.map(m => m.id),
        userIds: this.formData.attendeeList.users.map(m => m.id),
      }
      this.formData.receiver = {
        orgIds: this.formData.receiverList.orgs.map(m => m.id),
        userIds: this.formData.receiverList.users.map(m => m.id),
      }
      if (this.formData.projectList.length > 0) {
        this.formData.projectIds = this.formData.projectList.map(m => m.id)
      } else {
        this.formData.projectIds = []
      }
      // 发送链接
      this.formRequestFn(this.formData).then(({ data }) => {
        // 新建纪要及修改草稿，自动发送
        let id = this.methodType == 'create' ? data.data : this.formData.id
        this.loadState = false
        if (this.formData.status == 0 && this.formData.isSend == 1) {
          meetingSend(id).then(({ data }) => {
            if (data.data) {
              this.$message.success('您成功发送一篇会议纪要，继续加油！')
              this.goBack(true)
            } else {
              this.$message.error('当前网络异常，请稍后再试！')
            }
          })
        } else {
          this.$message({
            message: `${this.methodName}成功`,
            type: 'success',
          })
          this.goBack(true)
        }
      })
    },
    // 重置表单
    resetForm () {
      this.goBack()
    },
    // 纪要类型转换
    typeChange (val) {
      let type = val == 6 ? 1 : 0
      this.$set(this.formData, 'type', type)
    },
    goBack (state) {
      // this.$router.push(this.backRouter)
      if (this.pageState == 'summary') {
        this.$router.go(-1)
      } else if (this.pageState == 'project') {
        this.$emit('close', state === true ? true : false)
      }
    },
    // 项目获取
    selectProject () {
      this.$refs['project'].open(this.formData.projectList)
    },
    submitProject (data) {
      let fn = (obj) => {
        return { id: obj.id, name: obj.projectName }
      }
      this.formData.projectList = data.map(fn)
    },
    // 项目关联材料新增入口 -- 为解决路由式新增返回时tab错乱等问题
    projectOpen (obj) {
      this.formData = initFormData()
      this.formData.projectList = [obj]
      this.pageState = 'project'
    },
    // 预览
    handlePreview () {
      this.$refs['preview'].open(this.formData)
    },
  },
  created () {
    // 首先获取query
    let query = this.$route.params
    // 若存在 id， 即为修改
    if (query.id && this.$route.name == '修改纪要') { // 可能是从别的项目进来新增的
      this.methodType = 'update'
      getDataById(query.id).then(({ data }) => {
        data.data.receiverList = {
          orgs: data.data.receiver.orgs ? data.data.receiver.orgs : [],
          users: data.data.receiver.users ? data.data.receiver.users : [],
          unions: [],
        }
        data.data.attendeeList = {
          orgs: data.data.attendee.orgs ? data.data.attendee.orgs : [],
          users: data.data.attendee.users ? data.data.attendee.users : [],
          unions: [],
        }
        data.data.hostList = data.data.host.length > 0 ? data.data.host[0] : { id: '', name: '' }
        this.formData = { ...data.data }
        this.methodName = '修改'
        this.formRequestFn = updateData
      })
    }
    // 获取客户的数据
    getCustomerPage({ type: 1 }).then(({ data }) => {
      this.clientList = data.data.records
    })
  },
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
.tooltip {
  position: absolute;
  left: -19px;
  width: 17px;
}
</style>
