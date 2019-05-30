<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="查看招聘" :backOption="backOption">
      </page-header>
      <el-card class="recruit-headers" shadow="hover">
        <div class="con">
          <div class="left">
            <h4 class="name">
              {{form.contactName}}
            </h4>
            <div class="address"><iep-dict-detail :value="form.positionId" dict-name="tyb_resume_position"></iep-dict-detail>{{form.province}}{{form.city}}</div>
          </div>
          <div class="right">
            <div class="pay">薪资：{{form.salary}}</div>
            <div class="info-detail">
              <label>联系电话：{{form.contactPhone}}</label>
              <label>招{{form.recruitNo}}人</label>
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
            <label>货币种类：</label>
            <div class="content">
              <div v-if="form.salaryCurrency == 1">人民币（RMB)</div>
              <div v-if="form.salaryCurrency == 2">美元（USD）</div>
            </div>
          </div>
          <div class="info-item">
            <label>证书要求：</label>
            <div class="content">
              <iep-dict-detail :value="form.certRequire" dict-name="tyb_position_certtype"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>年龄要求：</label>
            <div class="content">
              <iep-dict-detail :value="form.ageRequire" dict-name="tyb_position_agerequirement"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>作业方式：</label>
            <div class="content">
              <iep-dict-detail :value="form.workMode" dict-name="tyb_resume_worktype"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>船长（m）：</label>
              <div class="content">{{form.hullLength}}</div>
          </div>
          <div class="info-item">
            <label>主机总功率：</label>
              <div class="content">{{form.totalPower}}</div>
          </div>
        </div>
      </el-card>
    </basic-container>
  </div>
</template>
<script>
import { getRecruitById } from '@/api/post/recruit'
import { getInfo } from '@/api/post/address'
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
      getRecruitById(this.record.recruitId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
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
      getInfo(this.record.city).then(({ data }) => {
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