<template>
  <iep-dialog :dialog-show="dialogShow" title="新增支出" width="700px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="100px">
      <el-form-item label="支出类型：">
        <iep-dict-cascader dictName="fams_expenditure_type" v-model="form.type"></iep-dict-cascader>
      </el-form-item>
      <el-form-item label="支出时间：">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="支出组织：">
        <iep-div-detail :value="form.orgName"></iep-div-detail>
      </el-form-item>
      <el-form-item label="支出方式：">
        <el-radio-group v-model="form.expenditureMode" @change="handleChange">
          <el-radio v-for="(item, idx) in dictsMap.expenditureMode" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支出公司：">
        <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
      </el-form-item>
      <el-form-item v-if="!bankAmountOption.disabled" label="银行户头：">
        <iep-select v-model="form.accountId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
      </el-form-item>
      <el-form-item label="关联合同：">
        <iep-contract-select v-model="form.protocolId"></iep-contract-select>
      </el-form-item>
      <el-form-item label="支出金额：">
        <iep-input-number v-model="form.amount"></iep-input-number>
      </el-form-item>
      <el-form-item label="税率：">
        <el-select v-model="form.taxRate">
          <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="(+item.label/100)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type[0]==='17'" label="计息比率：">
        <el-select v-model="form.interestRate">
          <el-option v-for="item in dictGroup['fams_interest_rate']" :key="item.value" :label="(+item.label/100)+'%'" :value="(+item.label/10000)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type[0]==='23'" label="预计退款时间：">
        <iep-date-picker v-model="form.estimatedRefundTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="备注：">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, toDtoForm } from './options'
import formMixins from '@/mixins/formMixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    bankAmountOption () {
      if (this.form.companyId && this.form.expenditureMode === '1') {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.companyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.form.companyId}`,
        }
      }
    },
  },
  methods: {
    handleChange () {
      this.form.accountId = ''
    },
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        try {
          const { data } = await this.formRequestFn(toDtoForm(this.form))
          if (data.data) {
            this.$message({
              message: '操作成功',
              type: 'success',
            })
            this.loadPage()
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: 'error',
          })
        }
      } catch (object) {
        let message = ''
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            message = element[0].message
          }
        }
        this.$message(message)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

