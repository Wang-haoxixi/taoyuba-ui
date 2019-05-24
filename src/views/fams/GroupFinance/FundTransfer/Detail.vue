<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="开票通知详情" :back-option="backOption">
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="200px" size="small">
        <h4 class="iep-sub-title">基础信息</h4>
        <iep-form-item label-name="调拨金额(元)" class="form-half">
          <iep-div-detail :value="form.amount"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="调拨方式" class="form-half">
          <iep-div-detail :value="dictsMap.allocationWay[form.allocationWay]"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="日利息(%)" class="form-half">
          <iep-div-detail :value="form.interest"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="调拨天数(日)" class="form-half">
          <iep-div-detail :value="form.allocationDays"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="执行日期" class="form-half">
          <iep-div-detail :value="`${parseDateYMD(form.implementStartTime)} 至 ${parseDateYMD(form.implementEndTime)}`"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="预计时间" class="form-half">
          <iep-div-detail :value="estimatedTime"></iep-div-detail>
        </iep-form-item>
        <h4 class="iep-sub-title">调出组织</h4>
        <iep-form-item label-name="调出组织" class="form-half">
          <iep-div-detail :value="form.outOrgName"></iep-div-detail>
        </iep-form-item>
        <iep-form-item v-if="!!form.allocationWay" label-name="线下公司" class="form-half">
          <iep-div-detail :value="form.callOutCompany"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="银行账户：">
          <iep-div-detail :value="form.callOutCompanyBank"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="调出方财务" class="form-half">
          <iep-div-detail :value="form.callOutUser"></iep-div-detail>
        </iep-form-item>
        <h4 class="iep-sub-title">调入组织</h4>
        <iep-form-item v-if="!!form.allocationWay" label-name="调入组织" class="form-half">
          <iep-div-detail :value="form.inOrgName"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="线下公司" class="form-half">
          <iep-div-detail :value="form.callInCompany"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="银行账户：">
          <iep-div-detail :value="form.callInCompanyBank"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="调入方财务" class="form-half">
          <iep-div-detail :value="form.callInUser"></iep-div-detail>
        </iep-form-item>
        <template v-if="form.flag === 1">
          <h4 class="iep-sub-title">审核</h4>
          <iep-form-item label-name="状态">
            <iep-div-detail :value="dictsMap.status[form.status]"></iep-div-detail>
          </iep-form-item>

          <a-divider></a-divider>
          <operation-wrapper style="padding: 0 200px;">
            <a-button type="primary" v-if="form.status===0" @click="handleFinish()">转账完成</a-button>
            <a-button type="primary" v-if=" form.status===1" @click="handleConfirm()">确认收款</a-button>
          </operation-wrapper>
        </template>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initDetailForm, dictsMap, calculateTime } from './options'
import { mapGetters } from 'vuex'
import { getFundTransferById, finishFundTransferById, confirmFundTransferById } from '@/api/fams/fund_transfer'
import mixins from '@/mixins/mixins'

export default {
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dictsMap,
      form: initDetailForm(),
      backOption: {
        isBack: true,
      },
      parseDateYMD: this.$options.filters.parseDateYMD,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    id () {
      return +this.$route.params.id
    },
    estimatedTime () {
      const lastTime = this.form.implementEndTime
      return calculateTime(lastTime, this.form.allocationDays)
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getFundTransferById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initDetailForm(), data.data)
      })
    },
    handleFinish () {
      this._handleComfirm(this.form.id, finishFundTransferById, '转账完成')
    },
    handleConfirm () {
      this._handleComfirm(this.form.id, confirmFundTransferById, '确认收款')
    },
  },
}
</script>