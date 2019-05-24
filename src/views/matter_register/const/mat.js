const auditStatus = {
  1: '待提交',
  2: '待审核',
  3: '已审定',
  4: '审核驳回',
  5: '已发布',
}

const auditStateDic = [
  {key:"1",value:"待提交"},
  {key:"2",value:"待审核"},
  {key:"3",value:"已审定"},
  {key:"4",value:"审核驳回"},
  {key:"5",value:"已发布"},
]

export function checkboxInit (row) {
  if (row.auditState === 5)
    return 0 //不可勾选
  else
    return 1 //可勾选
}
export { auditStatus, auditStateDic }
