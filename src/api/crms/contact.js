import request from '@/router/axios'

const crmsUrl = '/crm/contact'

export function fetchList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function createData (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteDataById (id) {
  return request({
    url: `${crmsUrl}/delete/batch/${id}`,
    method: 'post',
  })
}
export function getContactById (id) {
  return request({
    url: `${crmsUrl}/${id}`,
    method: 'get',
  })
}
export function getContactAssociate (query) {
  return request({
    url: `${crmsUrl}/associate`,
    method: 'get',
    params: query,
  })
}
