
import request from '@/router/axios'
const prefixUrl = '/mlms/material'

// δΌη§ζζ
export const getExcellentList = (params) => {
  return request({
    url: `${prefixUrl}/excellent`,
    method: 'get',
    params: params,
  })
}
