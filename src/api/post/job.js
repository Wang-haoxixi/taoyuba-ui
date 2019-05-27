import request from '@/router/axios'

const prefixUrl = 'tybhrms/resume'

export function getJobPage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function deleteJobById (id) {
  return request({
    url: `${prefixUrl}/delete/` +id,
    method: 'post',
    data: id,
  })
}