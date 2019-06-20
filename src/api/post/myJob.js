import request from '@/router/axios'

const prefixUrl = 'tmlms/recruit_apply'

export function getPage (query) {
  return request ({
    url:`${prefixUrl}/myApply`,
    method: 'get',
    params: query,
  })
}

export function deleteById (id) {
    return request({
      url: `${prefixUrl}/delete/${id}`,
      method: 'post',
    })
}