import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectMaterial'

export function getMaterialList (obj) {
  return request({
    url: `${prefixUrl}/standardList`,
    method: 'get',
    params: obj,
  })
}

export function getMeetingList (obj) {
  return request({
    url: `${prefixUrl}/meetingList`,
    method: 'get',
    params: obj,
  })
}

// 删除关联-纪要、周报
export function deleteSummarys (obj) {
  return request({
    url: `${prefixUrl}/deleteSummarys`,
    method: 'post',
    data: obj,
  })
}

// 关联纪要、周报
export function relationSummarys (obj) {
  return request({
    url: `${prefixUrl}/relationSummarys`,
    method: 'post',
    data: obj,
  })
}
