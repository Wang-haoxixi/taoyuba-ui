
import request from '@/router/axios'
const prefixUrl = '/mlms/material'

// 优秀材料
export const getExcellentList = (params) => {
  return request({
    url: `${prefixUrl}/excellent`,
    method: 'get',
    params: params,
  })
}
