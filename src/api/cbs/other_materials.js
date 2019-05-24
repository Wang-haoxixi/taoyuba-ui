import request from '@/router/axios'

export function getOtherMaterialsPage (query) {
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
