import request from '@/router/axios'

export function getMaterialPage (query) {
  return request({
    url: '/mdl/material/page',
    method: 'get',
    params: query,
  })
}

export function deleteMaterial (ids) {
  return request({
    url: '/mdl/material/delete',
    method: 'post',
    data: ids,
  })
}

export function deleteMaterialById (id) {
  return request({
    url: `/mdl/material/delete/${id}`,
    method: 'post',
  })
}

export function getMaterialFormById (id) {
  return request({
    url: `/mdl/material/${id}`,
    method: 'get',
  })
}

export function getMaterialNrPage (query) {
  return request({
    url: '/cbs/material/nr_page',
    method: 'get',
    params: query,
  })
}
