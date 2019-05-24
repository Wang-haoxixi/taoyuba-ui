// import { mergeByFirst } from '@/util/util'

import { dictsMap } from '../options'

const tabList = [
  {
    label: '借出',
    value: 'outOrgId',
  },
  {
    label: '借入',
    value: 'inOrgId',
  },
]

const colMap = {
	'inOrgId': [
		{
			prop: 'outOrgName',
			label: '借出组织',
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
	],
	'outOrgId': [
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
	],
}

const initForm = () => {
	return {
		orgId: '',
	}
}
export {
	dictsMap,
	colMap,
	initForm,
	tabList,
}
