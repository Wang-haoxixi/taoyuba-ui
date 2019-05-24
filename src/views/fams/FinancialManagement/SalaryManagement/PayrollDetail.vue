<template>
  <basic-container class="wages-details">
    <page-header title="我的工资条" :backOption="backOption"></page-header>
    <el-table class="first-table" :data="tableData" border style="width: 100%">
      <el-table-column prop="staffId" label="工号">
      </el-table-column>
      <el-table-column prop="realName" label="姓名">
      </el-table-column>
      <el-table-column prop="joinTime" label="入职时间">
      </el-table-column>
      <el-table-column prop="duties" label="职务">
      </el-table-column>
      <el-table-column prop="positional" label="职称">
      </el-table-column>
      <el-table-column prop="postTaxWage" label="税后工资/实发工资">
      </el-table-column>
      <el-table-column prop="bankPay" label="银行代发">
      </el-table-column>
      <el-table-column prop="innerPay" label="内网发放">
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="应发工资">
        <el-table-column label="基础工资">
          <el-table-column prop="basicPay" label="基本工资">
          </el-table-column>
          <el-table-column prop="jobSubsidy" label="职务补贴">
          </el-table-column>
          <el-table-column prop="titleSubsidy" label="职称补贴">
          </el-table-column>
          <el-table-column prop="manageAllowance" label="管理津贴">
          </el-table-column>
          <el-table-column prop="urbanSubsidy" label="城市补贴">
          </el-table-column>
          <el-table-column prop="basicPaySubtotal" label="小计">
          </el-table-column>
        </el-table-column>
        <el-table-column label="浮动工资">
          <el-table-column prop="thanksgivingFund" label="感恩基金">
          </el-table-column>
          <el-table-column prop="computerAid" label="电脑补助">
          </el-table-column>
          <el-table-column prop="fullTime" label="全勤">
          </el-table-column>
          <el-table-column prop="managerAward" label="总经理特别奖" width="180">
          </el-table-column>
          <el-table-column prop="floatingWageSubtotal" label="小计">
          </el-table-column>
          <el-table-column prop="totalWagePayable" label="合计">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="扣发事项">
        <el-table-column label="事假">
          <el-table-column prop="leaveDays" label="天"></el-table-column>
          <el-table-column prop="leaveAmount" label="金额"></el-table-column>
        </el-table-column>
        <el-table-column label="病假">
          <el-table-column prop="sickLeaveDays" label="天"></el-table-column>
          <el-table-column prop="sickLeaveAmount" label="金额"></el-table-column>
        </el-table-column>
        <el-table-column prop="lateLeaveEarly" label="迟到早退">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="lateOtherAmount" label="其他扣/补发事项" width="150">
      </el-table-column>
      <el-table-column prop="preTaxWage" label="税前工资/应发工资" width="150">
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="代扣代缴">
        <el-table-column prop="withHoldingFund" label="感恩基金">
        </el-table-column>
        <el-table-column prop="socialInsurance" label="社保">
        </el-table-column>
        <el-table-column prop="providentFund" label="公积金">
        </el-table-column>
        <el-table-column prop="taxBasicNumber" label="个税计提基数">
        </el-table-column>
        <el-table-column prop="personalIncomeTax" label="个人所得税">
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="人员成本">
        <el-table-column prop="preTaxSalary" label="人员税前工资"></el-table-column>
        <el-table-column prop="socialInsuranceCompanySection" label="社保公司部分"></el-table-column>
        <el-table-column prop="providentFundCompanySection" label="公积金公司部分"></el-table-column>
        <el-table-column prop="bonus" label="奖金"></el-table-column>
        <el-table-column prop="otherIncome" label="其他收益"></el-table-column>
      </el-table-column>
      <el-table-column prop="totalStaffCosts" label="合计" width="150">
      </el-table-column>
    </el-table>
  </basic-container>
</template>
<script>
import { getPayrollById } from '@/api/fams/salary'
import { payRollForm } from './options'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: payRollForm(),
    }
  },
  computed: {
    tableData () {
      return [this.form]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getPayrollById(this.$route.params.id).then(({ data }) => {
        this.form = data.data
      })
    },
  },
}
</script>
<style lang="css" scoped>
.wages-details >>> .first-table.el-table--border td:nth-child(6) .cell,
.wages-details >>> .first-table.el-table--border td:nth-child(7) .cell,
.wages-details >>> .first-table.el-table--border td:nth-child(8) .cell {
  color: #cb3737;
}
.wages-details >>> .el-table {
  margin-bottom: 20px;
}
.wages-details >>> .el-table thead th {
  background-color: #f5f7fa;
  text-align: center;
}
.wages-details >>> .el-table td {
  text-align: center;
}
</style>
