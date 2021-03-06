import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcontractDraft' 

export function getContractList (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function getContractDraftList (query) {
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
export function getContractByidcard (idcard) {
    return request({
        url: `${prefixUrl}/shipcrew/${idcard}`,
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

export function getDartContractDetail (id) {
    return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
    })
}

export function reviewContract (params) {
    return request({
        url: `${prefixUrl}/review`,
        method: 'post',
        params: params,
    })
}

export function cancelContract (data) {
    return request({
        url: `${prefixUrl}/cancel`,
        method: 'post',
        data: data,
    })
}

export function isCheckIdcard (idCard) {
    return request({
      url: `${prefixUrl}/checkIdcard`,
      method: 'get',
      params: {
        employeeIdcard: idCard,
      },
    })
}

export function complantContract (cancelId) {
    return request({
        url: `${prefixUrl}/complant`,
        method: 'post',
        params: cancelId,
    })
}

export function getList (query) {
    return request({
        url: `${prefixUrl}/villagePage`,
        method: 'get',
        params: query,
    })
}

export function refuseContract (id) {
    return request({
      url:`${prefixUrl}/refuse`,
      method: 'post',
      params: {
        contractId : id,
      },
    })
  }

  
export function recallContract (id,status) {        
    return request({
      url:`${prefixUrl}/recall`,
      method: 'post',
      params: {
        contractId : id,
        status: status,
      },
    })
  }

    
export function uploadContravt (contractId,contractImage) {        
    return request({
      url:`${prefixUrl}/updateImage`,
      method: 'post',
      params: {
        contractId : contractId,
        contractImage: contractImage,
      },
    })
  }

  export function uploadImages (contractId,addPhoto) {        
    return request({
      url:`${prefixUrl}/createImages`,
      method: 'post',
      params: {
        contractId : contractId,
        addPhoto: addPhoto,
      },
    })
  }  