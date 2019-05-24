import request from '@/router/request'
const baseUrl = '/msg/govmsg'

export function fetchList (listQuery) {
  return request({
    url: `${baseUrl}/allMsgPage`,
    method: 'get',
    params: listQuery,
  })
}

//查看
export function getInfo (createDeptId) {
  return request.post(`${baseUrl}/getDialogue/${createDeptId}`) 
}

