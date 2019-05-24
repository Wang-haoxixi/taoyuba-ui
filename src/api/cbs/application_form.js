import request from '@/router/axios'

export function getApplicationReviewPage (query) {
  const q = {
    materialType: 0,
  }
  const newQuery = { ...q, ...query }
  return request({
    url: '/cbs/material/page',
    method: 'get',
    params: newQuery,
  })
}

export function getApplicationFormPage (query) {
  const q = {
    materialType: 1,
  }
  const newQuery = { ...q, ...query }
  return request({
    url: '/cbs/material/page',
    method: 'get',
    params: newQuery,
  })
}

export function getItemPage (query) {
  return request({
    url: '/cbs/item/page',
    method: 'get',
    params: query,
  })
}
export function postMaterial (obj) {
  return request({
    url: '/cbs/material/create',
    method: 'post',
    data: obj,
  })
}

export function putMaterial (obj) {
  return request({
    url: '/cbs/material/update',
    method: 'post',
    data: obj,
  })
}

export function deleteMaterialById (id) {
  return request({
    url: `/cbs/material/delete/${id}`,
    method: 'post',
  })
}

export function deleteMaterial (ids) {
  return request({
    url: '/cbs/material/delete',
    method: 'post',
    data: ids,
  })
}

export function getApplicationFormById (id) {
  return request({
    url: `/cbs/material/${id}`,
    method: 'get',
  })
}

export function submitApplication (id) {
  return request({
    url: `/cbs/material/submit/${id}`,
    method: 'get',
  })
}

export function validMaterialName (materialName,id) {
  return request({
    url: '/cbs/material/repeat',
    method: 'get',
    params: {
      materialName,
      id,
    },
  })
}
