import request from '@/router/axios'


export function getPage (query) {
  return request ({
    url: '/tybhrms/resume/myReceive',
    method: 'get',
    params: query,
  })
}
