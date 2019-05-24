import request from '@/router/axios'

const prefixUrl = '/fams/borrow'
// @/api/fams/org_borrow

export function getOrgBorrowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: {
      ...query,
      borrowObjectType: 1,
    },
  })
}

export function getUnionBorrowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: {
      ...query,
      borrowObjectType: 2,
    },
  })
}

export function getOrgBorrowById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postOrgBorrow (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function cancelOrgBorrow (id) {
  return request({
    url: `${prefixUrl}/cancel/${id}`,
    method: 'get',
  })
}

export function outOrgConfirmBorrow (id) {
  return request({
    url: `${prefixUrl}/out/org/confirm/${id}`,
    method: 'get',
  })
}

export function groupConfirmBorrow (id) {
  return request({
    url: `${prefixUrl}/group/confirm/${id}`,
    method: 'get',
  })
}

export function groupRejectBorrow (id) {
  return request({
    url: `${prefixUrl}/group/reject/${id}`,
    method: 'get',
  })
}

export function orgRejectBorrow (id) {
  return request({
    url: `${prefixUrl}/org/reject/${id}`,
    method: 'get',
  })
}

export function inOrgConfirmBorrow (id) {
  return request({
    url: `${prefixUrl}/in/org/confirm/${id}`,
    method: 'get',
  })
}

export function repayOrgBorrow (obj) {
  return request({
    url: `${prefixUrl}/repayment`,
    method: 'post',
    data: obj,
  })
}

export function confirmRepayOrgBorrow (id) {
  return request({
    url: `${prefixUrl}/repayment/confirm/${id}`,
    method: 'get',
  })
}

export function outOrgReconfirmBorrow (obj) {
  return request({
    url: `${prefixUrl}/out/org/reconfirm`,
    method: 'post',
    data: obj,
  })
}
