// import { mergeByFirst } from '@/util/util'
const dictsMap = {
  borrowMoneyType: {
    '0': '国脉贝',
    '1': '线下支付',
	},
	status: {
		'0': '向集团申请中',
		'1': '集团审核通过且发起资金调拨',
		'2': '调拨对象汇款确认',
		'3': '调入对象收款确认',
		'4': '向组织借款申请中',
		'5': '被借款组织确认且打款',
		'6': '借款组织确认收款',
		'7': '已还款',
		'8': '已撤回',
		'9': '已逾期',
		'10': '借款组织还款确认',
		'11': '被借款组织确认',
	},
}

//【0向集团申请中，1集团审核通过且发起资金调拨，2调拨对象汇款确认，3调入对象收款确认】
  //向组织借款状态
  //【4，向组织借款申请中，5被借款组织确认且打款，6借款组织确认收款】
  //7已还款，8已撤回,9已逾期）

const columnsMap = [
	{
		prop: 'inOrgName',
		label: '借入组织',
	},
	{
		prop: 'amount',
		label: '调拨金额',
	},
	{
		prop: 'borrowMoneyType',
		label: '支付类型',
		type: 'dict',
	},
	{
		prop: 'status',
		label: '拆借状态',
		type: 'dict',
	},
	{
		prop: 'repaymentTime',
		label: '还款时间',
	},
]

const initForm = () => {
	return {
		orgId: '',
	}
}
export {
	dictsMap,
	columnsMap,
	initForm,
}
