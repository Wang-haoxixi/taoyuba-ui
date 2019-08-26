import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcontract' 

export function getContractList (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}

export function deleteContract (contractId) {
    return request({
        url: `${prefixUrl}/del/${contractId}`,
        method: 'post',
    })
}

export function getContract (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}

export function getDict (key) {
    return request({
      url: `/admin/dict/type/${key}`,
      method: 'get',
    })
}

export function addContract (contract) {
    return request({
        url: `${prefixUrl}/save`,
        method: 'post',
        data: contract,
    })
}

export function updateContract (contract) {
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: contract,
    })
}

export function getContractDetail (id) {
    return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
    })
}