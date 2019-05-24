// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const pagedTable = [
  {
      id: 1,
      sendman:'邵万炯',
      theme:'2019年2月21日18：00-19：00的内网更新维护公告',
      time:'2019-02-15 09:39',
  },
    {
        id: 2,
        sendman:'崔颖',
        theme:'关于20190221李柱微信培训的通知',
        time:'2019-02-15 09:39',
    },
    {
        id: 3,
        sendman:'邵万炯',
        theme:'2019年2月21日18：00-19：00的内网更新维护公告',
        time:'2019-02-15 09:39',
    },
    {
        id: 4,
        sendman:'崔颖',
        theme:'关于20190221李柱微信培训的通知',
        time:'2019-02-15 09:39',
    },
    {
        id: 5,
        sendman:'崔颖',
        theme:'2019年2月21日18：00-19：00的内网更新维护公告',
        time:'2019-02-15 09:39',
    },
    {
        id: 6,
        sendman:'邵万炯',
        theme:'关于20190221李柱微信培训的通知',
        time:'2019-02-15 09:39',
    },
    {
        id: 7,
        sendman:'崔颖',
        theme:'2019年2月21日18：00-19：00的内网更新维护公告',
        time:'2019-02-15 09:39',
    },
]

const initOrgForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}

export { dictsMap, pagedTable, initOrgForm, initSearchForm }