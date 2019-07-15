import request from '@/router/axios'
const prefixUrl = '/tybhrms/databuspayload'

export function searshSn () {
    return request({
        url: `${prefixUrl}/searchsn`,
        method: 'get',
    })
}

export  function  bindSn (query) {
    return request({
        url: `${prefixUrl}/bindsn`,
        method: 'post',
        params: query,
    })
}

export function   cancelSn () {
    return request({
        url: `${prefixUrl}/cancelbind`,
        method: 'post',
    })
}


