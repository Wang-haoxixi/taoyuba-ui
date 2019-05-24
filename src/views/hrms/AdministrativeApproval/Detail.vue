<template>
  <div>
    <basic-container>
      <page-header :title="`${form.name}的${typeMap[form.type].label}`" :backOption="backOption"></page-header>
      <el-card class="top-card" :body-style="bodyStyle" shadow="hover">
        <div class="avatar-wrapper">
          <iep-img-avatar :size="90" :src="form.avatar" alt="头像"></iep-img-avatar>
        </div>
        <div class="info">
          <div class="info-item">
            <label>申请人：</label>
            <div class="content">{{form.name}}</div>
          </div>
          <div class="info-item">
            <label>所属部门：</label>
            <div class="content">
              <iep-tag-detail :value="form.deptList"></iep-tag-detail>
            </div>
          </div>
          <div class="info-item">
            <label>创建时间：</label>
            <div class="content">{{form.createTime}}</div>
          </div>
          <div class="info-item">
            <label>{{startTimeLabel}}：</label>
            <div class="content">{{form.startTime}}</div>
          </div>
          <div class="info-item">
            <label>{{endTimeLabel}}：</label>
            <div class="content">{{form.endTime}}</div>
          </div>
          <div class="info-item">
            <label>职务：</label>
            <div class="content">{{form.job}}</div>
          </div>
          <div class="info-item">
            <label>职称：</label>
            <div class="content">{{form.title}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>申请理由</span>
        </div>
        <pre>
          {{form.reason}}
        </pre>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>附件</span>
        </div>
        <iep-no-data v-if="!form.attachFile.length"></iep-no-data>
        <pre v-else>
          <iep-download :value="form.attachFile"></iep-download>
        </pre>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>申请流程</span>
        </div>
        <iep-no-data v-if="!form.processList.length"></iep-no-data>
        <el-timeline v-else>
          <el-timeline-item v-for="p in form.processList" :key="p.id" :timestamp="p.time" placement="top">
            <el-card>
              <h4>{{p.username}} {{p.status}}</h4>
              <p v-if="p.msg.length">审批意见：{{p.msg}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>抄送人</span>
        </div>
        <iep-tag-detail :value="form.ccList.map(m => m.name)"></iep-tag-detail>
      </el-card>
      <el-card v-if="needApproval" class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>操作</span>
        </div>
        <operation-wrapper>
          <iep-button type="warning" @click="handleReview()" plain>审核</iep-button>
          <iep-button @click="handleDeliver()">转交</iep-button>
        </operation-wrapper>
      </el-card>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <deliver-dialog ref="DeliverDialog" @load-page="loadPage"></deliver-dialog>
  </div>
</template>
<script>
import { deliverApprovaBatch, reviewApprovaBatch } from '@/api/hrms/wel'
import { getAdministrativeApprovalById } from '@/api/hrms/administrative_approval'
import { initForm, dictsMap } from './options'
import { mapGetters } from 'vuex'
import keyBy from 'lodash/keyBy'
import DeliverDialog from '@/views/wel/approval/approval/ExaminApproval/Page/DeliverDialog'
export default {
  components: { DeliverDialog },
  data () {
    return {
      id: this.$route.params.id,
      backOption: {
        isBack: true,
      },
      bodyStyle: {
        display: 'flex',
        padding: '20px',
      },
      middleBodyStyle: {
        padding: '20px',
        border: 0,
      },
      pageLoading: true,
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
    typeMap () {
      return keyBy(this.dictGroup['hrms_applic_type'], 'value')
    },
    needApproval () {
      return this.approvalUserIds.includes(this.userInfo.userId) && this.form.status === 0
    },
    startTimeLabel () {
      return dictsMap.startTime[this.form.type]
    },
    endTimeLabel () {
      return dictsMap.endTime[this.form.type]
    },
    approvalUserIds () {
      return this.form.approverList.map(m => m.id)
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleReview () {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = this.form.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleDeliver () {
      this.$refs['DeliverDialog'].form.ids = [this.form.id]
      this.$refs['DeliverDialog'].userId = this.form.userId
      this.$refs['DeliverDialog'].formRequestFn = deliverApprovaBatch
      this.$refs['DeliverDialog'].dialogShow = true
    },
    loadPage () {
      this.pageLoading = true
      getAdministrativeApprovalById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.top-card {
  .avatar-wrapper {
    flex: 1;
    text-align: center;
  }
  .avatar {
    border-radius: 50%;
    border: 1px solid #fff;
    height: 100px;
    width: 100px;
  }
  .info {
    flex: 5;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .info-item {
      & > label {
        width: 120px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }
      .content {
        margin-left: 120px;
        line-height: 40px;
        position: relative;
        font-size: 14px;
      }
    }
  }
}
.middle-card {
  margin-top: 20px;
}
</style>
