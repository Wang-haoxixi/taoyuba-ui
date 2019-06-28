import request from '@/router/axios'
const prefixUrl = '/tmlms/ship_owner'

export function getShipOwners (realName) {              
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: {
      realName,
      size: 10000,
      status: 2,
    },
  })
}
export function getShip (realName) {              
  return request({
    url: `/tybship/tybship/findship/${realName}`,
    method: 'get',
  })
}




         


