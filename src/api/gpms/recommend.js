import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectRecommend'

export function getDepartmentList (obj) {
  return request({
    url: `${prefixUrl}/projectRecommend`,
    method: 'get',
    params: obj,
  })
}
