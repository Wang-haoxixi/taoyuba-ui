import request from '@/router/axios'
import { prefixUrl, getTechnologyById } from '../../cpms/technology'

const  getTechnologyList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}

export { getTechnologyById, getTechnologyList }