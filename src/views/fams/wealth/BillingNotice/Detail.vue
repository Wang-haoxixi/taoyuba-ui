<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="开票通知详情" :back-option="backOption">
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="150px" size="small">
        <h4 class="iep-sub-title">购买方信息</h4>
        <iep-form-item label-name="名称" class="form-half">
          <iep-div-detail :value="form.buyerName"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="纳税人识别号" class="form-half">
          <iep-div-detail :value="form.buyerNumber"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="地址">
          <iep-div-detail :value="form.buyerAddress"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="电话号码" class="form-half">
          <iep-div-detail :value="form.buyerPhone"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="开户行及账户" class="form-half">
          <iep-div-detail :value="form.buyerAccount"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="发票邮寄地址">
          <iep-div-detail :value="form.buyerMail"></iep-div-detail>
        </iep-form-item>
        <h4 class="iep-sub-title">货物或应税劳务、服务名称</h4>
        <iep-form-item label-name="一级科目" class="form-half">
          <iep-dict-detail v-model="form.firstSubject" dict-name="fams_tax_subject"></iep-dict-detail>
        </iep-form-item>
        <iep-form-item label-name="二级科目" class="form-half">
          <iep-div-detail :value="form.secondSubject"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="税率" class="form-half">
          <el-select v-model="form.rate" disabled>
            <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="(+item.label/100)">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="单位" class="form-half">
          <iep-div-detail :value="form.unit"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="金额" class="form-half">
          <iep-div-detail :value="form.amount"></iep-div-detail>
        </iep-form-item>
        <iep-form-item label-name="关联项目">
          <el-input v-model="form.projectId"></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">销售方</h4>
        <iep-form-item label-name="销售方公司">
          <iep-select-detail v-model="form.companyId" prefix-url="fams/company"></iep-select-detail>
        </iep-form-item>
        <iep-form-item label-name="纳税人识别号">
          <span>{{companyForm.taxpayerNumber}}</span>
        </iep-form-item>
        <iep-form-item label-name="电话">
          <span>{{companyForm.phone}}</span>
        </iep-form-item>
        <iep-form-item label-name="地址">
          <span>{{companyForm.address}}</span>
        </iep-form-item>
        <iep-form-item label-name="开户行及账号">
          <span>{{companyForm.name}}</span>
        </iep-form-item>
        <iep-form-item label-name="经营范围">
          <span>{{companyForm.businessScope}}</span>
        </iep-form-item>
        <iep-form-item label-name="备注">
          <iep-div-detail :value="form.remarks"></iep-div-detail>
        </iep-form-item>
        <template v-if="form.status">
          <h4 class="iep-sub-title">审批内容</h4>
          <iep-form-item label-name="状态">
            <iep-div-detail :value="dictsMap.status[form.status]"></iep-div-detail>
          </iep-form-item>
          <iep-form-item label-name="理由">
            <iep-div-detail :value="form.content"></iep-div-detail>
          </iep-form-item>
        </template>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm, dictsMap } from './options'
import { mapGetters } from 'vuex'
import { getBillingById } from '@/api/fams/billing'
import { getCompanyById } from '@/api/fams/company'
function initCompanyForm () {
  return {
    taxpayerNumber: '请选择一个销售方公司',
    phone: '请选择一个销售方公司',
    address: '请选择一个销售方公司',
    name: '请选择一个销售方公司',
    businessScope: '请选择一个销售方公司',
  }
}
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
      form: initForm(),
      companyForm: initCompanyForm(),
      backOption: {
        isBack: true,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    id () {
      return this.$route.params.id
    },
  },
  created () {
    getBillingById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
      getCompanyById(this.form.companyId).then(({ data }) => {
        this.companyForm = data.data
      })
    })
  },
}
</script>