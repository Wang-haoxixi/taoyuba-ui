// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    0: '待提交',
    1: '待确认',
    2: '已确认',
    3: '拒绝',
  },
}

const columnsMap = [
	{
		prop: 'buyerName',
		label: '购买方',
	},
	{
		prop: 'companyName',
		label: '销售方',
	},
	{
		prop: 'amount',
		label: '开票金额',
	},
	{
		prop: 'createTime',
		label: '申请日期',
	},
	{
		prop: 'status',
		label: '状态',
		type: 'dict',
	},
	{
		prop: 'auditorName',
		label: '审核人',
	},
	{
		prop: 'auditingTime',
		label: '审核日期',
	},
]

export { dictsMap, columnsMap }