import request from '@/router/axios'

const prefixUrl = '/dataclean'
// @/api/dataclean/analysis
export function setAnalysisThreshold (obj) {
  return request({
    url: `${prefixUrl}/analysis/set/threshold`,
    method: 'post',
    data: obj,
  })
}

export function getCenterDataById (id) {
  return request({
    url: `${prefixUrl}/analysis/center_data/${id}`,
    method: 'get',
  })
}

export function automaticCleaning (id) {
  return request({
    url: `${prefixUrl}/analysis/automatic_cleaning/${id}`,
    method: 'get',
  })
}

export function getCenterToSatellite (id) {
  return request({
    url: `${prefixUrl}/analysis/center_to_satellite/${id}`,
    method: 'get',
  })
}

export function postFilterData (type, obj) {
  return request({
    url: `${prefixUrl}/analysis/filter_method`,
    method: 'post',
    params: {
      type,
    },
    data: obj,
  })
}

export function postClean (obj) {
  return request({
    url: `${prefixUrl}/analysis/clean`,
    method: 'post',
    data: obj,
  })
}
