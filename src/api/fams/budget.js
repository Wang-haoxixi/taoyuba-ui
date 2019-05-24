import request from '@/router/axios'

const prefixUrl = '/fams/budget'
// @/api/fams/budget

export function getBudgetYearList () {
  return request({
    url: `${prefixUrl}/year/list`,
    method: 'get',
  })
}

export function postYearBudget (year) {
  return request({
    url: `${prefixUrl}/create/${year}`,
    method: 'post',
  })
}

export function getBudgetQuarterList (id) {
  return request({
    url: `${prefixUrl}/quarter/list/${id}`,
    method: 'get',
  })
}

export function getBudgetQuarterDetail (yearId) {
  return request({
    url: `${prefixUrl}/quarter/${yearId}`,
    method: 'get',
  })
}
export function getBudgetMonthDetail (id) {
  return request({
    url: `${prefixUrl}/month/${id}`,
    method: 'get',
  })
}

export function getBudgetYearById (id) {
  return request({
    url: `${prefixUrl}/year/${id}`,
    method: 'get',
  })
}

export function putBudgetYearRelation (obj) {
  return request({
    url: `${prefixUrl}/update/year/relation`,
    method: 'post',
    data: obj,
  })
}

export function putBudgetQuarterRelation (obj) {
  return request({
    url: `${prefixUrl}/update/quarter/relation`,
    method: 'post',
    data: obj,
  })
}

export function putBudgetMonthRelation (obj) {
  return request({
    url: `${prefixUrl}/update/month/relation`,
    method: 'post',
    data: obj,
  })
}
