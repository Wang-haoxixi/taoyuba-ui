<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="查看招聘" :backOption="backOption">
      </page-header>
      <el-card class="recruit-headers" shadow="hover">
        <div class="con">
          <div class="left">
            <h4 class="name">
              {{form.positionName}}
            </h4>
            <div class="address"><span>{{form.contactName}}</span>{{form.workPlace}}</div>
          </div>
          <div class="right">
            <div class="pay">薪资：{{form.salary}}</div>
            <div class="info-detail">
              <label>联系电话：{{form.contactPhone}}</label>
              <label>招{{form.recruitsCount}}人</label>
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
            <label>结算方式：</label>
            <div class="content">
              <iep-dict-detail :value="form.settlement" dict-name="tyb_settlement"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>工作类型：</label>
            <div class="content">
              <iep-dict-detail :value="form.workCls" dict-name="tyb_work_cls"></iep-dict-detail>
            </div>
          </div>
          <div class="info-item">
            <label>工作时间：</label>
              <div class="content">{{form.workTime}}</div>
          </div>
          <div class="info-item">
            <label>开始时间：</label>
            <div class="content">{{form.startTime}}</div>
          </div>
          <div class="info-item">
            <label>结束时间：</label>
              <div class="content">{{form.endTime}}</div>
          </div>
        </div>
      </el-card>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div slot="header" class="clearfix">
          <span>岗位描述</span>
        </div>
        <pre>{{form.workSpecification}}</pre>
      </el-card>
    </basic-container>
  </div>
</template>
<script>
import { getPositionById } from '@/api/post/position'
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
      getPositionById(this.record.positionId).then(({ data }) => {
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