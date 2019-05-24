<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}开票通知`" :back-option="backOption">
        <iep-button type="primary" @click="handleSubmit()">保存</iep-button>
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="200px" size="small">
        <h4 class="iep-sub-title">购买方信息</h4>
        <iep-form-item label-name="名称" class="form-half">
          <el-input v-model="form.buyerName"></el-input>
        </iep-form-item>
        <iep-form-item label-name="纳税人识别号" class="form-half">
          <el-input v-model="form.buyerNumber"></el-input>
        </iep-form-item>
        <iep-form-item label-name="地址">
          <el-input v-model="form.buyerAddress"></el-input>
        </iep-form-item>
        <iep-form-item label-name="电话号码" class="form-half">
          <el-input v-model="form.buyerPhone"></el-input>
        </iep-form-item>
        <iep-form-item label-name="开户行及账户" class="form-half">
          <el-input v-model="form.buyerAccount"></el-input>
        </iep-form-item>
        <iep-form-item label-name="发票邮寄地址">
          <el-input v-model="form.buyerMail"></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">货物或应税劳务、服务名称</h4>
        <iep-form-item label-name="一级科目" class="form-half">
          <iep-dict-select v-model="form.firstSubject" dict-name="fams_tax_subject"></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="二级科目" class="form-half">
          <el-input v-model="form.secondSubject"></el-input>
        </iep-form-item>
        <iep-form-item label-name="税率" class="form-half">
          <el-select v-model="form.rate">
            <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="(+item.label/100)">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="单位" class="form-half">
          <el-input v-model="form.unit"></el-input>
        </iep-form-item>
        <iep-form-item label-name="金额" class="form-half">
          <iep-input-number v-model="form.amount"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="关联项目">
          <el-input v-model="form.projectId"></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">销售方</h4>
        <iep-form-item label-name="销售方公司">
          <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" @change="handleChangeCompanyId" placeholder="请选择销售方公司"></iep-select>
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
          <iep-input-area v-model="form.remarks" placeholder="请输入备注"></iep-input-area>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm } from '../options'
import { mapGetters } from 'vuex'
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
      form: initForm(),
      companyForm: initCompanyForm(),
      methodName: this.record.methodName || '新增',
      formRequestFn: this.record.formRequestFn || (() => { }),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
  },
  methods: {
    handleChangeCompanyId (value) {
      getCompanyById(value).then(({ data }) => {
        this.companyForm = data.data
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleSubmit () {
      this.formRequestFn(this.form).then(({ data }) => {
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