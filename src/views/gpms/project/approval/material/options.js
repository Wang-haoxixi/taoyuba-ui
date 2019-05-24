import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}

export const dictsMap = {
  meetingType: changeDict(dicData.mlms_meeting_type),
}

export const columnsMap = [
  {
    prop: 'title',
    label: '会议标题',
  },
  // {
  //   prop: 'meetingTime',
  //   label: '会议时间',
  //   width: '200px',
  // },
  {
    prop: 'meetingType',
    label: '会议类型',
    width: '200px',
    type: 'dict',
  },
]
