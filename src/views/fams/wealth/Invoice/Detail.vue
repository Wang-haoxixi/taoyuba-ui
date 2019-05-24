<template>
  <div>
    <basic-container>
      <page-header title="查看发票" :back-option="backOption">
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="140px" size="small">
        <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
          <el-table-column prop="expenditureType" label="支出类型">
            <template slot-scope="scope">
              <iep-dict-cascader-detail dictName="fams_expenditure_type" :value="scope.row.type"></iep-dict-cascader-detail>
            </template>
          </el-table-column>
          <el-table-column label="发票类型">
            <template slot-scope="scope">
              <iep-div-detail :value="dictsMap.invoiceType[scope.row.invoiceType]"></iep-div-detail>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="发票金额(元)">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
        </el-table>
        <a-divider />
        <iep-form-item class="form-half" label-name="发票类型">
          <iep-div-detail :value="dictsMap.referType[form.referType]"></iep-div-detail>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="发票抬头">
          <iep-select-detail :value="form.companyId" prefix-url="fams/company"></iep-select-detail>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="项目">
          <el-input v-model="form.projectId"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="审批人">
          <iep-contact-select disabled v-model="form.auditor"></iep-contact-select>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { dictsMap } from './options'
import { getInvoiceById } from '@/api/fams/invoice'
function initForm () {
  return {
    referType: '',
    companyId: '',
    projectId: '',
    auditor: {
      id: 0,
      name: '',
    },
    relations: [],
  }
}
export default {
  data () {
    return {
      dictsMap,
      form: initForm(),
      backOption: {
        isBack: true,
      },
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
  },
  created () {
    getInvoiceById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {

  },
}
</script>
