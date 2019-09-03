import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcontractcancel'

export function addContractCancel (data) {
  return request({
    url:`${prefixUrl}/save`,
    method: 'post',
    data: data,
  })
}