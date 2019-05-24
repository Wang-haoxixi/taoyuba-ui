import request from '@/router/request'
const baseUrl = '/msg/govmsgnotice'

//列表
export function fetchList (listQuery) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//发送消息(新增)
export function sendMsg (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//查看
export function getInfo (queryData) {
  return request.post(`${baseUrl}/info`,queryData) 
}

//编辑
export function editMsg (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

//逻辑删除
export function deleteMsg (id) {
  return request.post(`${baseUrl}/logicDelete/${id}`)
}

