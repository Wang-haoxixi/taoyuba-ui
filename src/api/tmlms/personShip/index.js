import request from '@/router/axios'

export function getPage (query) {
    return request({
      url: 'tmlms/tybship/pageForRelation',
      method: 'get',
      params: query,
    })
  }
  export function getShipList () {
    return request({
      url: 'tmlms/tyb_location_ship_data/location_get',
      method: 'get',
    })
  }
  export function getPortList (query) {
    return request({
      url: 'tmlms/tyb_location_port/page',
      method: 'get',
      params: query,
    })
  }