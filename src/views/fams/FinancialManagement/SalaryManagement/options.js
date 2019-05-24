// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    A: '已发送',
    B: '未发送',
    C: '待发送',
    X: '回收站',
  },
}

const columnsMap = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'title',
    label: '标题',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'payrollTime',
    label: '工资单时间',
  },
  {
    prop: 'createTime',
    label: '上传时间',
  },
]

const detailColumnsMap = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'staffId',
    label: '工号',
  },
  {
    prop: 'realName',
    label: '姓名',
  },
  {
    prop: 'postTaxWage',
    label: '税后工资',
  },
  {
    prop: 'bankPay',
    label: '银行代发',
  },
  {
    prop: 'innerPay',
    label: '内网发放',
  },
  {
    prop: 'sendTime',
    label: '发送时间',
  },
]

const payRollForm = () => {
  return {
    staffId: '', //工号
    realName: '', //姓名
    joinTime: '', //入职时间
    duties: '',//职务
    positional: '',//职称
    postTaxWage: '',//税后工资/实发工资
    bankPay: '',//银行代发
    innerPay: '',//内网发放
    basicPay: '',//基本工资
    jobSubsidy: '',//职务补贴
    titleSubsidy: '',//职称补贴
    manageAllowance: '',//管理津贴
    urbanSubsidy: '',//城市补贴
    basicPaySubtotal: '',//基本工资小计

    thanksgivingFund: '',//浮动工资-感恩基金
    computerAid: '',//浮动工资-电脑补助
    fullTime: '',//浮动工资-全勤
    managerAward: '',//浮动工资-总经理特别奖
    floatingWageSubtotal: '',//浮动工资-小计
    totalWagePayable: '',//应发工资-总计

    leaveDays: '',//扣发事项-事假（天）
    leaveAmount: '',//扣发事项-事假（金额）
    sickLeaveDays: '',//扣发事项-病假（天）
    sickLeaveAmount: '',//扣发事项-病假（金额）
    lateLeaveEarly: '',//扣发事项-迟到早退
    lateOtherAmount: '',//扣发事项-其他扣/补发事项
    preTaxWage: '',//扣发事项-税前工资/应发工资

    withHoldingFund: '',//代扣代缴-感恩基金
    socialInsurance: '',//代扣代缴-社保
    providentFund: '',//代扣代缴-公积金
    taxBasicNumber: '',//代扣代缴-个税计提基数
    personalIncomeTax: '',//代扣代缴-个人所得税

    preTaxSalary: '',//人员成本-人员税前工资
    socialInsuranceCompanySection: '',//人员成本-社保公司部分
    providentFundCompanySection: '',//人员成本-公积金公司部分
    bonus: '',//人员成本-奖金
    otherIncome: '',//人员成本-其他收益
    totalStaffCosts: '',//人员成本-总计
  }
}

export { columnsMap, dictsMap, detailColumnsMap, payRollForm }