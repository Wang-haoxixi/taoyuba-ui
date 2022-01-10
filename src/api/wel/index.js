import request from '@/router/axios'

const prefixUrl = '/admin/wel'
// @/api/wel/index
export function getAside () {
  return request({
    url: `${prefixUrl}/aside`,
    method: 'get',
  })
}

export function getIndex () {
  return request({
    url: `${prefixUrl}/index`,
    method: 'get',
  })
}

export function getMaterials () {
  return request({
    url: '/mlms/material/wel/list',
    method: 'get',
  })
}

export function getPending (type) {
  return request({
    url: `${prefixUrl}/pending/list`,
    method: 'get',
    params: {
      type,
    },
  })
}

export function getContractList (query) {
  return request({
    url: '/crm/cms/wel/contract/list',
    method: 'get',
    params: query,
  })
}

export function getCustomerList (query) {
  return request({
    url: '/crm/cms/wel/customer/list',
    method: 'get',
    params: query,
  })
}

export function countShipAndCrew () {
  return request({
    url: '/tmlms/workSpace/countShipAndCrew',
    method: 'get',
  })
}
export function countRecordByVillageId () {
  return request({
    url: '/tmlms/workSpace/countRecordByVillageId',
    method: 'get',
  })
}
export function countInfo () {
  return request({
    url: '/tmlms/workSpace/countInfo',
    method: 'get',
  })
}
export function countPortByOrg () {
  return request({
    url: '/tmlms/workSpace/countPortByOrg',
    method: 'get',
  })
}
export function countShipAndCrewByOrg () {
  return request({
    url: '/tmlms/workSpace/countShipAndCrewByOrg',
    method: 'get',
  })
}
export function countSignAndContractByOrg () {
  return request({
    url: '/tmlms/workSpace/countSignAndContractByOrg',
    method: 'get',
  })
}

export function owner_ranking () {
  return request({
    // url: '/tmlms/workSpace/countVillageByOrg',
    url: '/tmlms/relationship/owner_ranking',
    method: 'get',
  })
}

export function countWithDate () {
  return request({
    url: '/tmlms/crew_cert/countWithDate',
    method: 'get',
  })
}

export function jobRecruitment () {
  return request({
    url: '/tmlms/workSpace/job_recruitment',
    method: 'get',
  })
}