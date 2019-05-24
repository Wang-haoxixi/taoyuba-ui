<template>
  <div>
    <basic-container>
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
import mixins from '../mixins'
import { initNow } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
    }
  },
  methods: {
    loadSelf () {
      this.fnSelf().then(({ data }) => {
        this.form = this.selfToVo(data.data)
        this.form.startTime = initNow()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../approval.scss";
</style>