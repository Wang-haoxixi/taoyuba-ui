import request from '@/router/axios'
import { prefixUrl, getModuleById } from '../../cpms/module'
const  getModuleList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}

export { getModuleById, getModuleList }