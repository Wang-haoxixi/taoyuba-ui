
const dictsMap = {
  settleStatus: {
    0: '是',
    1: '否',
	},
	billingStatus: {
    0: '是',
    1: '否',
	},
	projectStatus: {
		0: '未立项',
		1: '未完结',
		2: '已完结',
	},
}

const columnsMap = [
	{
		prop: 'number',
		label: '项目编号',
	},
	{
		prop: 'name',
		label: '项目名称',
	},
	{
		prop: 'projectTime',
		label: '立项日期',
	},
	{
		prop:'contractAmount',
		label:'合同金额',
	},
	{
		prop:'income',
		label:'项目收入',
	},
	{
		prop:'expenditure',
		label:'项目总支出',
	},
	{
		prop:'billingStatus',
		label:'是否开票',
		type: 'dict',
	},
	{
		prop: 'settleStatus',
		label: '是否结清',
		type: 'dict',
	},
	{
		prop: 'profit',
		label: '利润',
	},
]
const initForm = () => {
	return {
		id: 0, //开票id
		
		projectImplementation:'',//项目实施
		name: '', //项目名称
		number: '', //项目编号
		founder:'', //创建人
		projectManager: '', //项目经理
		marketingNumber: '', //市场经理
		projectTime: '', //立项时间
		endTime: '', //完结时间
		projectStatus: '',//项目状态
	}
}
const initSearchForm = () => {
	return {
	}
  }
const initDtoSearchForm = () => {
	return {
	}
}
export { dictsMap, columnsMap, initForm, initSearchForm, initDtoSearchForm }