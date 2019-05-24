const columnsMapByTypeId = [
  { label: '合同名称', prop: 'contractName' },
  { label: '合同类型', prop: 'contractType', type: 'dict' },
  { label: '合同金额', prop: 'contractAmount' },
  { label: '合同状态', prop: 'contractStatusValue' },
  { label: '回款率', prop: 'odds' },
]
const dictsMap = {
  contractType: {
    '0': '内部合同',
    '1': '外部合同',
  },
}
export { columnsMapByTypeId, dictsMap }
