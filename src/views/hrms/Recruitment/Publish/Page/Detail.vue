<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="查看招聘" :backOption="backOption">
        <!-- <iep-button type="primary">我要推荐</iep-button> -->
      </page-header>
      <el-card class="recruit-headers" shadow="hover">
        <span class="state"><i class="iconfont icon-shijian"></i><span>{{dictsMap.status[form.status]}}</span></span>
        <div class="con">
          <div class="left">
            <h4 class="name">
              {{form.positionName}}
            </h4>
            <div class="address"><span>{{form.deptName}}</span>{{form.place}}</div>
          </div>
          <div class="right">
            <div class="pay">薪资：
              <iep-dict-detail :value="form.treatment" dict-name="hrms_wages_salaries"></iep-dict-detail>
            </div>
            <div class="info-detail">
              <label>学历要求：
                <iep-dict-detail :value="form.academicId" dict-name="hrms_highest_educational"></iep-dict-detail>
              </label>
              <label>工作经验：
                <iep-dict-detail :value="form.years" dict-name="hrms_working_life"></iep-dict-detail>
              </label>
              <label>招{{form.recruitsCount}}人</label>
              <label>{{form.targetCount ? '紧急' : '不紧急'}}</label>
            </div>
          </div>
        </div>
      </el-card>
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
            <div class="content">
              <iep-dict-detail :value="form.language" dict-name="hrms_foreign_language"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>性别要求：</label>
            <div class="content">{{form.sexName}}</div>
          </div>
          <div class="info-item">
            <label>福利待遇：</label>
            <div class="content">
              <iep-tag-detail :value="form.welfareTreatmentList"></iep-tag-detail>
            </div>
          </div>
          <div class="info-item">
            <label>招聘期限：</label>
            <div class="content">{{form.term}}</div>
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
import { getPublishRecruitmentById } from '@/api/hrms/publish_recruitment'
import { initForm, dictsMap } from '../options'
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
      dictsMap,
      middleBodyStyle: {
        padding: '20px',
        border: 0,
      },
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getPublishRecruitmentById(this.record.id).then(({ data }) => {
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