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

const initForm = () => {
	return {
		id: 0, //开票id
  
		buyerName: '', //购买方名称
		buyerNumber: '', //纳税人识别号
		buyerAddress: '', //地址
		buyerPhone: '', //电话号码
		buyerAccount: '',//开户行及账户
		buyerMail: '',//发票邮寄地址
		firstSubject: '',//一级科目 字典fams_tax_subject
		secondSubject: '',//二级科目
		rate: '',//税率
		unit: '',//单位
		amount: '', //开票金额
		projectId: '',//关联项目
		companyId: '', //销售方公司ID
		remarks: '',//备注

		status: '',//状态
		content: '',//理由
	}
}

export {
	columnsMap,
	dictsMap,
	initForm,
}
