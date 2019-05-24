<template>
  <div>
    <page-header title="我的审批" :backOption="backOption"></page-header>
    <!-- 立项信息 -->
    <div class="contianBox">
      <el-row class="title">
        <el-col class="data">立项信息</el-col>
      </el-row>
      <el-row class="topBot">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="12" class="item" v-for="(item, index) in setUpList" :key="index">
              <el-form-item :label="item.label" v-if="item.type === 'dict'">
                {{getDictMap(setUpData[item.value], dictMap[item.value])}}
              </el-form-item>
              <el-form-item :label="item.label" v-else-if="item.type === 'tag'">
                <el-tag type='info' v-for="(item, index) in setUpData[item.value]" :key="index">{{item}}</el-tag>
              </el-form-item>
              <el-form-item :label="item.label" v-else>{{setUpData[item.value]}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </div>
    <!-- 立项信息 -->
    <div class="contianBox">
      <el-row class="title">
        <el-col class="data">立项信息</el-col>
      </el-row>
      <el-row class="topBot">
        <p class="summary">2019年的内网启动会GM12323纪要</p>
        <p class="summary">2019年国脉针对内网培训的会议纪要GM2132321</p>
      </el-row>
    </div>
    <footer-toolbar>
      <iep-button @click="resetForm">返回</iep-button>
      <iep-button @click="handleNotAgree">不同意</iep-button>
      <iep-button type="primary" @click="handleAgree">同意</iep-button>
    </footer-toolbar>

    <agreeDailog ref="agree" @close="closeDialog" @submitAgree="submitAgree"></agreeDailog>
    <notAgreeDialog ref="notAgree" @close="closeDialog" @submitNotAgree="submitNotAgree"></notAgreeDialog>
  </div>
</template>

<script>
import FooterToolbar from '@/components/FooterToolbar/'
import agreeDailog from './agreeDialog'
import notAgreeDialog from './notAgreeDialog'
import { updateData } from '@/api/gpms/index'
const setUpList = [
  { label: '编号：', value: 'serialNo' },
  { label: '项目名称：', value: 'projectName' },
  { label: '项目类型：', value: 'projectType', type: 'dict' },
  { label: '业务类型：', value: 'businessType', type: 'dict' },
  { label: '相关客户：', value: 'relatedClientName' },
  { label: '项目预算（万元）：', value: 'projectBudget' },
  { label: '项目标签：', value: 'projectTagList', type: 'tag' },
  { label: '是否关联产品：', value: 'isRelevanceProduct', type: 'dict' },
  { label: '相关产品：', value: 'aa-aa', type: 'tag' },
  { label: '承接部门：', value: 'inChargeDeptName' },
  { label: '合作部门：', value: 'coopDeptName' },
  { label: '集团外部合作伙伴：', value: 'groupExternalCooperatePartnerName' },
  { label: '发布人：', value: 'publisherName' },
  { label: '发布时间：', value: 'publishTime' },
]

const dictMap = {
  projectType: [
    { value: 1, label: '项目类型一' },
  ],
  businessType: [
    { value: 1, label: '业务类型一' },
  ],
  isRelevanceProduct: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  approvalStatus: [
    { value: 1, label: '未提交' },
    { value: 2, label: '待审核' },
    { value: 3, label: '审核通过' },
    { value: 4, label: '审核不通过' },
  ],
}

export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  components: { FooterToolbar, agreeDailog, notAgreeDialog },
  data () {
    return {
      setUpList,
      dictMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.resetForm()
        },
      },
    }
  },
  computed: {
    setUpData () {
      let formData = this.form
      let list = [
        { name: 'applicantName', list: 'applicantList' },
        { name: 'approverName', list: 'approverList' },
        { name: 'inChargeDeptName', list: 'inChargeDeptList' },
        { name: 'coopDeptName', list: 'coopDeptList' },
        { name: 'publisherName', list: 'publisherList' },
        { name: 'relatedClientName', list: 'relatedClientList' },
        { name: 'groupExternalCooperatePartnerName', list: 'groupExternalCooperatePartnerList' },
      ]
      for (let item of list) {
        if (formData[item.list]) {
          formData[item.name] = formData[item.list].name
        } else {
          formData[item.name] = '无'
        }
      }
      return formData
    },
  },
  methods: {
    resetForm () {
      this.$emit('close', true)
    },
    // 同意
    handleAgree () {
      this.$refs['agree'].dialogShow = true
    },
    // 不同意
    handleNotAgree () {
      this.$refs['notAgree'].dialogShow = true
    },
    closeDialog (state) {
      if (state) {
        this.$emit('close', true)
      }
    },
    getDictMap (value, list) {
      for (let item of list) {
        if (item.value == value) {
          return item.label
        }
      }
    },
    submitAgree (guideSugges) {
      let form = {
        id: this.setUpData.id,
        guideSugges: guideSugges,
        approvalStatus: 3,
      }
      updateData(form).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$emit('close', true)
      })
    },
    submitNotAgree (approvalFailReason) {
      let form = {
        id: this.setUpData.id,
        approvalFailReason: approvalFailReason,
        approvalStatus: 4,
      }
      updateData(form).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$emit('close', true)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.contianBox {
  margin-bottom: 20px;
  .title {
    background-color: #f5f5f5;
    border-radius: 5px;
    .data {
      padding: 10px 15px;
    }
    .edit {
      float: right;
      right: 0;
      width: 30px;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .topBot {
    margin: 20px 0 30px;
    .summary {
      margin-left: 20px;
    }
  }
  .item {
    height: 30px;
    margin-bottom: 10px;
  }
}
</style>
