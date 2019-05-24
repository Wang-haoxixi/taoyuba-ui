import request from '@/router/axios'
import { prefixUrl } from '../../cpms/product'
export function getProductList () {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
  })
}
