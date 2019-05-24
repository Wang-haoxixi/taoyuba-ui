<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="加班申请单" :backOption="backOption">
      </page-header>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>其他要求</span>
        </div>
        <div class="info">
          <div class="info-item">
            <label>专业要求：</label>
            <div class="content">{{form.profession}}</div>
          </div>
          <div class="info-item">
            <label>工作类型：</label>
            <div class="content">
              <iep-dict-detail :value="form.jobTypeId" dict-name="hrms_work_type"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>外语要求：</label>
            <div class="content">{{form.language}}</div>
          </div>
          <div class="info-item">
            <label>性别要求：</label>
            <div class="content">{{form.sexName}}</div>
          </div>
          <div class="info-item">
            <label>福利待遇：</label>
            <div class="content">{{form.welfare}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>岗位职责</span>
        </div>
        <pre>{{form.duties}}</pre>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>岗位要求</span>
        </div>
        <pre>{{form.claim}}</pre>
      </el-card>
    </basic-container>
  </div>
</template>
<script>
import { getApprovalInitiateById } from '@/api/hrms/wel'
import { initForm } from '../options'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      middleBodyStyle: {
        padding: '20px',
        border: 0,
      },
      form: initForm(),
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getApprovalInitiateById(this.record.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.recruit-headers {
  padding: 20px;
  margin-bottom: 10px;
  .con {
    display: flex;
    justify-content: space-between;
  }
  .state {
    font-size: 14px;
    i {
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
      color: #999;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .left {
    margin: 10px 0;
    .name {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
    }
    .address {
      font-size: 14px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  .right {
    display: flex;
    flex-flow: column;
    margin: 10px 0;
    align-items: flex-end;
    .pay {
      margin-bottom: 20px;
      font-size: 24px;
      line-height: 32px;
      color: #cb3737;
    }
    .info-detail {
      font-size: 14px;
      color: #999;
      label {
        padding: 0 20px;
        border-right: 1px solid #eee;
        &:last-child {
          padding-right: 0;
          border: 0;
        }
      }
    }
  }
}
.middle-card {
  margin-top: 20px;
}
.info {
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
</style>