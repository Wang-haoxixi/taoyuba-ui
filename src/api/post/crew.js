import request from '@/router/axios'

const prefixUrl = 'tmlms/crew'
const regionUrl = 'admin/region'
const dictUrl = 'admin/dict'

export function getWholeInfo (id) {
  return request({
    url: `${regionUrl}/getinfo/`+id,
    method: 'get',
  })
}
export function getPosition (id) {
  return request({
    url: `${dictUrl}/type/`+id,
    method: 'get',
  })
}
export function getArea (id) {
  return request({
    url: `${regionUrl}/area`,
    method: 'get',
    params: {
      parentCode:id,
    },
  })
}
export function getPositionPage (query) {
  return request({
    url: `${prefixUrl}/Page`,
    method: 'get',
    params: query,
  })
}

export function deleteCrewById (id) {
  return request({
    url: `${prefixUrl}/delete`,
    method: 'post',
    params: {
      userId:id,
    },
  })
}

export function addPosition (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
    params: {
      type:2,
    },
  })
}

export function getCrewByUserId (id) {
  return request({
    url: `${prefixUrl}/getCrewByUserId`,
    method: 'get',
    params: {
      userId:id,
    },
  })
}

export function putPosition (obj) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    params: {
      type:2,
    },
    data: obj,
  })
}



