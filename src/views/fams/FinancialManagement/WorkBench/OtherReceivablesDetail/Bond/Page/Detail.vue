<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="详情支出项目税费" :backOption="backOption">
        <!-- <iep-button type="primary">我要推荐</iep-button> -->
      </page-header>
      <el-card class="middle-card" :body-style="middleBodyStyle" shadow="never">
        <div class="info">
          <div class="info-item" v-for="item in itemList" :key="item.id">
            <label>{{item.name}}:</label>
            <div class="content" :class="item.show">{{item.con}}</div>
          </div>
        </div>
        <div class="info info2">
          <div class="info-item">
            <label>备注:</label>
            <div class="content">备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div>
          </div>
        </div>
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
      itemList: [
        {
          name: '支出类型',
          con: '项目税费',
        },
        {
          name: '支出时间',
          con: '2016-06-12',
        },
        {
          name: '支出组织',
          con: '舟山研发中心',
        },
        {
          name: '支付方式',
          con: '银行存款',
        },
        {
          name: '支出公司',
          con: '浙江蟠桃会网络技术有限公司',
        },
        {
          name: '银行户头',
          con: '浙江蟠桃会网络技术有限公司建设银行舟山支行',
        },
        {
          name: '关联合同',
          con: '浙江蟠桃会网络技术有限公司建设银行舟山支行',
          show: 'show',
        },
        {
          name: '状态',
          con: '完结/逾期/待回款',
        },
      ],
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
  border: 0;
  margin-top: 20px;
}
.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
    .show {
      padding: 10px;
      height: 40px;
      line-height: 18px !important;
      border-radius: 3px;
      border: 1px solid #eee;
    }
    .content {
      margin-left: 120px;
      line-height: 40px;
      position: relative;
      font-size: 14px;
    }
  }
}
.info2 {
  display: block;
  margin-top: 10px;
}
</style>