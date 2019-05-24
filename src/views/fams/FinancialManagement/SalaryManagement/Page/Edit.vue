<template>
  <basic-container>
    <div class="edit-wrapper">
      <el-card class="edit-card" shadow="hover">
        <div slot="header" class="title">
          <span>{{methodName}}提现<span class="sub-name">{{subName}}</span></span>
        </div>
        <el-steps :active="active" align-center finish-status="success">
          <el-step description="填写提现信息"></el-step>
          <el-step description="确认提现信息"></el-step>
          <el-step description="财务审核"></el-step>
          <el-step description="财务发放"></el-step>
          <el-step description="完成"></el-step>
        </el-steps>
        <div v-if="active === 0">
          <el-form ref="form" :model="form" label-width="120px" size="small">
            <el-form-item label="提现金额：">
              <el-input v-model="form.sum"></el-input>
            </el-form-item>
            <el-form-item label="发票抵税：">
              <el-input v-model="form.invoice"></el-input>
            </el-form-item>
            <el-form-item>
              <iep-button type="primary" class="next" @click="next">下一步</iep-button>
            </el-form-item>
          </el-form>
          <div class="explain-con">
            <span>说明</span>
            <span>提现</span>
            <p>1、如有显示冻结金额，一般是已有相应金额在提现申请中，请核对</p>
            <p>2、财务每月处理提现日期：16日、17日、18日、19日、20日、21日！提现起始额度100。</p>
            <span>发票抵税</span>
            <p>可使用已上传发票进行抵税，提现税率为5.5%，如不填写则默认不使用发票；发票抵税起始额度100起。</p>
          </div>
        </div>
        <div v-if="active === 1">
          <el-form ref="form" :model="form" size="small">
            <div class="tips">
              <i class="el-icon-warning"></i>确认提现后，财务将对您的提现申请进行审核。
            </div>
            <div class="cashc-confirmation">
              <p>提现金额：<span class="sum">{{sum1}}</span><span class="sumCap">({{sumCap1}})</span></p>
              <p>发票抵税：<span class="sum">{{sum2}}</span><span class="sumCap">({{sumCap2}})</span></p>
            </div>
            <el-form-item>
              <iep-button type="primary" class="submit" @click="next">提交</iep-button>
              <iep-button @click="back">上一步</iep-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active === 2">
          <div class="success-tips">
            <i class="el-icon-success"></i>
            <span>操作成功</span>
            <p>等待财务审核，财务审核通过后提现资金将被冻结。同时在财务未审核通过前撤销申请。</p>
          </div>
          <el-form ref="form" :model="form" size="small">
            <div class="cashc-confirmation">
              <p>提现金额：<span class="sum">{{sum1}}</span><span class="sumCap">({{sumCap1}})</span></p>
              <p>发票抵税：<span class="sum">{{sum2}}</span><span class="sumCap">({{sumCap2}})</span></p>
            </div>
            <el-form-item>
              <iep-button type="primary" @click="back">上一步</iep-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
      </footer-tool-bar>
    </div>
  </basic-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { getTalentPoolById } from '@/api/hrms/talent_pool'
// import { initForm } from '../options'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      sum1: '50,000,00',
      sum2: '50,000,00',
      sumCap1: '伍万元整',
      sumCap2: '伍万元整',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      input4: '',
      activeNames: ['1'],
      methodName: '申请',
      subName: '（每一笔提现均需提交为5.5%的税费，税费可用发票抵消。）',
      form: {},
      formRequestFn: () => { },
      checked: true,
      active: 0,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  created () {
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getTalentPoolById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst({}, data.data)
      })
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    next () {
      if (this.active++ > 3) this.active = 0
    },
    back () {
      if (this.active++ < 3) this.active = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
  .explain-con {
    margin-left: 70px;
    padding-bottom: 50px;
    width: 80%;
  }
  .cashc-confirmation {
    display: flex;
    margin-bottom: 18px;
    width: 70%;
    align-items: center;
    flex-direction: column;
  }
  .tips {
    margin-bottom: 18px;
    padding: 5px 30px;
    border: 1px solid #ebeef5;
    background-color: #fafafa;
    i {
      display: inline-block;
      margin-right: 10px;
      color: #999;
    }
  }
  .success-tips {
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
      display: block;
      margin: 30px 0 15px;
      font-size: 64px;
      color: #cb3737;
    }
    span {
      font-size: 18px;
    }
  }
  .el-form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 0;
    .el-form-item {
      width: 70%;
      text-align: center;
      .next {
        margin-left: -120px;
      }
    }
    .sum {
      font-size: 16px;
      color: #cb3737;
    }
    .sumCap {
      font-size: 12px;
    }
  }
  .edit-card {
    .title {
      font-weight: 600;
      font-size: 16px;
    }
    .sub-name {
      font-weight: 400;
      font-size: 14px;
      color: #999;
    }
  }
  .sub-title {
    margin-bottom: 10px;
    font-weight: 700;
  }
}
.el-button + .el-button {
  margin-left: 10px;
}
</style>
<style scoped>
.edit-wrapper >>> .el-step__icon.is-text {
  border-width: 1px;
  border-color: #f0f0f0;
  background-color: #f0f0f0;
  color: #c0c4cc;
}
.edit-wrapper >>> .el-step__icon-inner {
  font-weight: 400;
}
.edit-wrapper >>> .el-step__line {
  background: none;
  border: 1px dashed#d7d7d7;
}
.edit-wrapper >>> .el-step__line-inner {
  border: 0;
}
.edit-wrapper >>> .el-step__head.is-finish,
.edit-wrapper >>> .el-step__description.is-finish {
  color: #666;
}
.edit-wrapper >>> .el-step.is-center .el-step__description {
  margin-top: 5px;
  font-size: 14px;
}
.edit-wrapper >>> .el-step__title.is-process {
  font-weight: 400;
}
.edit-wrapper >>> .is-process .el-step__icon.is-text {
  border-color: #bf051a;
  background-color: #bf051a;
  color: #fff;
}
.edit-wrapper >>> .el-step__description.is-success {
  color: #666;
}
.edit-wrapper >>> .is-success .el-step__icon.is-text {
  border-color: #bf051a;
  background-color: #faebeb;
  color: #bf051a;
}
.edit-wrapper >>> .is-success .el-step__line {
  border-color: #bf051a;
}
</style>

