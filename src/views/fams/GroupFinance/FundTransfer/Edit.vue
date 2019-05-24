<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`新增资金调拨`" :back-option="backOption">
        <iep-button type="primary" @click="handleSubmit()">保存</iep-button>
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="200px" size="small">
        <h4 class="iep-sub-title">基础信息</h4>
        <iep-form-item label-name="调拨金额(元)" class="form-half">
          <iep-input-number v-model="form.amount"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="调拨方式" class="form-half">
          <el-radio-group v-model="form.allocationWay">
            <el-radio v-for="(item,i) in dictsMap.allocationWay" :key="i" :label="+i">{{item}}</el-radio>
          </el-radio-group>
        </iep-form-item>
        <iep-form-item label-name="日利息(%)" class="form-half">
          <iep-input-number v-model="form.interest"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="调拨天数(日)" class="form-half">
          <iep-input-number v-model="form.allocationDays" :precision="0"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="执行日期" class="form-half">
          <iep-date-picker v-model="form.implementRangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </iep-date-picker>
        </iep-form-item>
        <iep-form-item label-name="预计时间" class="form-half">
          <el-input v-model="estimatedTime" disabled></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">调出组织</h4>
        <iep-form-item label-name="调出组织" class="form-half">
          <iep-select v-model="form.callOutOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择调出组织"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!!form.allocationWay" label-name="线下公司" class="form-half">
          <iep-select v-model="form.callOutCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择线下公司"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!callOutBankAmountOption.disabled" label-name="银行账户：">
          <iep-select v-model="form.callOutCompanyBankId" autocomplete="off" :prefix-url="callOutBankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
        </iep-form-item>
        <iep-form-item label-name="调出方财务" class="form-half">
          <iep-contact-select v-model="form.callOutUser"></iep-contact-select>
        </iep-form-item>
        <h4 class="iep-sub-title">调入组织</h4>
        <iep-form-item label-name="调入组织" class="form-half">
          <iep-select v-model="form.callInOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择调入组织" disabled></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!!form.allocationWay" label-name="线下公司" class="form-half">
          <iep-select v-model="form.callInCompanyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择线下公司"></iep-select>
        </iep-form-item>
        <iep-form-item v-if="!callInBankAmountOption.disabled" label-name="银行账户：">
          <iep-select v-model="form.callInCompanyBankId" autocomplete="off" :prefix-url="callInBankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
        </iep-form-item>
        <iep-form-item label-name="调入方财务" class="form-half">
          <iep-contact-select v-model="form.callInUser"></iep-contact-select>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm, dictsMap, borrowToForm, formToDto, calculateTime } from './options'
import { postFundTransfer } from '@/api/fams/fund_transfer'
import { pickerOptions } from '@/const/formConfig.js'
import { getOrgBorrowById } from '@/api/fams/org_borrow'
import { mapGetters } from 'vuex'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dictsMap,
      pickerOptions,
      form: initForm(),
      backOption: {
        isBack: true,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    id () {
      return +this.$route.params.id
    },
    estimatedTime () {
      const lastTime = this.form.implementRangeTime[1]
      return calculateTime(lastTime, this.form.allocationDays)
    },
    callOutBankAmountOption () {
      if (this.form.callOutCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.callOutCompanyId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    callInBankAmountOption () {
      if (this.form.callInCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.callInCompanyId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getOrgBorrowById(this.id).then(({ data }) => {
        this.form = borrowToForm(data.data)
      })
    },
    handleSubmit () {
      postFundTransfer(formToDto(this.form)).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.handleGoBack()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
