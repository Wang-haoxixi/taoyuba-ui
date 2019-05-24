import request from '@/router/request'
const baseUrl = '/msg/govmsg'

//列表
export function fetchList (listQuery) {
  return request({
    url: `${baseUrl}/myMsgPage`,
    method: 'get',
    params: listQuery,
  })
}

//发送消息(新增)
export function sendMsg (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//查看
export function getInfo (id) {
  return request.post(`${baseUrl}/myInfo/${id}`) 
}

