export const dictsMap = {
  businessType: {
    '1': '立项申请',
    '2': '立项申请',
    '3': '立项申请',
    '4': '立项申请',
  },
  approvalStatus: {
    '1': '未提交',
    '2': '待审核',
    '3': '审核通过',
    '4': '审核不通过',
  },
}

export const columnsMap = [
  {
    prop: 'projectName',
    label: '项目名称',
  }, {
    prop: 'budget',
    label: '申请类别',
    // type: 'dict',
  }, {
    prop: 'serialNo',
    label: '编号',
  }, {
    prop: 'approvalStatus',
    label: '审批状态',
    type: 'dict',
  }, {
    prop: 'applicantName',
    label: '申请人',
  }, {
    prop: 'approverName',
    label: '审批人',
  },
]
