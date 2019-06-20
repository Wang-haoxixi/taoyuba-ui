<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="查看简历" :backOption="backOption">
      </page-header>
      <el-card class="recruit-headers" shadow="hover">
        <div class="con">
          <div class="left">
            <h4 class="name">
              {{form.realName}}
            </h4>
            <div class="address"><span>{{form.resumeName}}</span>{{form.province}}{{form.city}}</div>
          </div>
          <div class="right">
            <div class="pay">薪资：{{form.expectSalary}}</div>
            <div class="info-detail">
              <label>联系电话：{{form.contactPhone}}</label>
              <label>出生日期：{{form.birthday}}</label>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>其他信息</span>
        </div>
        <div class="info">
          <div class="info-item">
            <label>教育水平：</label>
            <div class="content">
              <iep-dict-detail :value="form.education" dict-name="tyb_resume_education"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>外语水平：</label>
            <div class="content">
              <iep-dict-detail :value="form.foreignLanguage" dict-name="tyb_resume_language"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>身高CM：</label>
              <div class="content">{{form.height}}</div>
          </div>
          <div class="info-item">
            <label>原任职务：</label>
            <div class="content">
              <iep-dict-detail :value="form.postion" dict-name="tyb_resume_position"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>应聘职位：</label>
            <div class="content">
              <iep-dict-detail :value="form.job" dict-name="tyb_resume_position"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>航海经验：</label>
            <div class="content">
              <iep-dict-detail :value="form.seniority" dict-name="tyb_resume_seniority"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>作业要求：</label>
            <div class="content">
              <iep-dict-detail :value="form.workRequire" dict-name="tyb_resume_worktype"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>特殊技能：</label>
              <div class="content">{{form.skill}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>作业方式</span>
        </div>
        <pre>{{form.workDetail}}</pre>
      </el-card>
    </basic-container>
  </div>
</template>
<script>
import { getResumeById } from '@/api/post/resume'
import { getInfo } from '@/api/post/address'
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
      },
      middleBodyStyle: {
        padding: '20px',
        border: 0,
      },
      form: {},
    }
  },
  created () {
    this.loadPage()
    console.log(this.$route.query.see)
  },
  methods: {
    loadPage () {
      getResumeById(this.$route.query.see).then(({ data }) => {
        this.form = data.data
        console.log(this.form)
        this.getProvince()
        this.getCity()
      })
    },
    getProvince () {
      getInfo(this.form.province).then(({ data }) => {
        this.form.province = data.data.name
      }) 
    },
    getCity () {
      getInfo(this.form.city).then(({ data }) => {
        this.form.city = data.data.name
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
      color: #0185d8;
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