import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcertapply' 

export function getCertPage (params) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: params,
    })
}

export function getCertDetail (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}

export function deleteCert (id) {
    return request({
        url: `${prefixUrl}/delete/${id}`,
        method: 'post',
    })
}

export function cancelCert (id, status) {
    return request({
        url: `${prefixUrl}/cancle`,
        method: 'post',
        params: {
          id: id,
          status: status,
        },
    })
}
