// org config options
const dictsMap = {
  status: {
    0: '正常',
    1: '待审核',
    2: '锁定',
    3: '待配置',
  },
}

const columnsMap = [
  {
    prop: 'username',
    label: '用户名',
  },
  {
    prop: 'realName',
    label: '真实姓名',
  },
  {
    prop: 'phone',
    label: '手机',
  },
]

const initMemberForm = () => {
  return {
    userId: '',
    username: '',
    realName: '',
    roleList: [],
    phone: '',
    orgNames: [],
    assetOrgId: '',
    avatar: '',
  }
}


export { dictsMap, columnsMap, initMemberForm }