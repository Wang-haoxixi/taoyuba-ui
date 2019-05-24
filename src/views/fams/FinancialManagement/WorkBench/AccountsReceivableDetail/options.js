import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    0: '未执行',
    1: '执行中',
    2: '已完成',
  },
}

const columnsMap = [
	{
		prop: 'id',
		label: '序号',
	},
	{
		prop: 'signingTime',
		label: '签订时间',
	},
	{
		prop: 'entryName',
		label: '项目名称',
	},
	{
		prop: 'contractName',
		label: '合同名称',
	},
	{
		prop:'contractAmount',
		label:'合同金额',
	},
	{
		prop:'amountReached',
		label:'已到金额',
	},
	{
		prop:'outstandingAmount',
		label:'未到金额',
	},
	{
		prop:'invoice',
		label:'开票',
	},
	{
		prop:'invoiced',
		label:'已开票金额',
	},
	{
		prop: 'status',
		label: '项目状态',
		type: 'dict',
	},
	{
		prop: 'charge',
		label: '负责人',
	},
	{
		prop: 'refundTime',
		label: '回款时间',
	},
	{
		prop: 'beOverdue',
		label: '逾期(天)',
	},
]
const initSearchForm = () => {
	return {
	  name: '',
	  charge:'',
	  dept: [],
	  position: [],
	  refundTime: [],
	  invoice: false,
	  status: '',
	}
  }
  const initDtoSearchForm = () => {
	return {
		name: '',
		charge:'',
		dept: [],
		position: [],
		refundTime: [],
		invoice: false,
		status: '',
	}
  }
  const toDtoSearchForm = (row) => {
	const newForm = mergeByFirst(initDtoSearchForm(), row)
	// newForm.startTime = row.rangeTime[0]
	// newForm.endTime = row.rangeTime[1]
	// newForm.province = row.cities[0]
	// newForm.city = row.cities[1]
	// newForm.positionId = row.position[row.position.length - 1]
	// newForm.deptId = row.dept[row.dept.length - 1]
	return newForm
  }
export { dictsMap, columnsMap ,initSearchForm,initDtoSearchForm,toDtoSearchForm }