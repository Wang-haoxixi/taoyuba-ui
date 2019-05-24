import request from '@/router/axios'

const crmsUrl = 'crm/customer'

// 查看所有客户列表
export function fetchList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}

// 查看我的客户列表
// export function myFetchList (query) {
//   return request({
//     url: 'crm/crms/iepclientinfo/page',
//     method: 'get',
//     params: query,
//   })
// }

// 查看客户信息
export function fertchInfo (id) {
  return request({
    url: `${crmsUrl}/${id}`,
    method: 'get',
  })
}

// 客户新增
export function createData (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 修改客户
export function updateData (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 通过id查询客户信息
// export function queryInfo (id) {
//   return request({
//     // url: `crm/crms/iepclientinfo/${id}`,
//     url: `${crmsUrl}/${id}`,
//     method: 'get',
//   })
// }

// 删除客户信息
export function deleteDataById (ids) {
  return request({
    url: `${crmsUrl}/delete/batch/${ids}`,
    method: 'post',
  })
}

// 查看协作客户列表
// export function collaborationFetchList (query) {
//   return request({
//     url: 'crm/crms/iepclientinfo/page/collaboration',
//     method: 'get',
//     params: query,
//   })
// }

// 添加协助人
export function AddCollaborator (query) {
  return request({
    url: `${crmsUrl}/create/collaboration`,
    method: 'post',
    data: query,
  })
}


// 客户全景查询
export function fetchDetail (id) {
  console.log(id)
  return request({
    // url: `${crmsUrl}/${id}`,
    url: `${crmsUrl}`,
    method: 'post',
  })
}

// 拜访记录-新增
export function createVisit (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-编辑
export function updateVisit (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-删除
export function deleteVisit (id) {
  return request({
    url: `${crmsUrl}/delete/${id}`,
    method: 'post',
  })
}

// 方案-查询
export function fetchProgramme (query) {
  return request({
    url: `${crmsUrl}/programme/page`,
    method: 'get',
    params: query,
  })
}

// 方案-新增
export function createProgramme (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-编辑
export function updateProgramme (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 拜访记录-删除
export function deleteProgramme (id) {
  return request({
    url: `${crmsUrl}/delete/${id}`,
    method: 'post',
  })
}

// 资讯-新增
export function createConsultation (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 添加协作人
// export function AddCollaborator (obj) {
//   return request({
//     url: `${crmsUrl}/create`,
//     method: 'post',
//     data: obj,
//   })
// }

