import request from '@/router/axios'
const prefixUrl = '/tmlms/labor_contract'

export function getContractList (query) {
    return request({
        url: `${prefixUrl}/getPage`,
        method: 'get',
        params: query,
    })
}

export function getContractListAdmin (query) {
    return request({
        url: `${prefixUrl}/getPage`,
        method: 'get',
        params: query,
    })
}

export function getContract (id) {
    return request({
        url: `${prefixUrl}/detail`,
        method: 'get',
        params: {
            contractId: id,
        },
    })
}

export function addContract (contract) {
    return request({
        url: `${prefixUrl}/create`,
        method: 'post',
        data: contract,
    })
}

export function editContract (contract) {
    return request({
        url: `${prefixUrl}/edit`,
        method: 'post',
        data: contract,
    })
}

export function deleteContract (contractId) {
    return request({
        url: `${prefixUrl}/delete`,
        method: 'post',
        params: {
            contractId,
        },
    })
}

export function getDict (key) {
  return request({
    url: `/admin/dict/type/${key}`,
    method: 'get',
  })
}

//新增PDF文件名
export  function  addContractFile (data) {
    return  request({
          url:`${prefixUrl}/addfile`,
          method:'post',
          data,
    })
}