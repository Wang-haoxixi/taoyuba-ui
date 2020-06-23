import request from '@/router/axios'
const prefixUrl = '/tmlms/tybshiphaver'           


export function getShiphaverPage (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function saveShiphaver (data) {
    return request({
        url: `${prefixUrl}/save`,
        method: 'post',
        data: data,
    })
}
export function deleteShiphaver (id) {
    return request({
        url: `${prefixUrl}/del/${id}`,      
        method: 'post',
    })
}
export function getShiphaverDetail (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}

export function editShiphaver (data) {           
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: data,
    })
}
//通过shipId查询控制人
export function bindShiphaver (shipId) {    
    return request({
        url: `${prefixUrl}/bindShip/${shipId}`,
        method: 'get',
    })
}

//用户绑定渔船      
export function userShips (userId) {            
    return request({
        url: `${prefixUrl}/userShip/${userId}`,
        method: 'get',
    })
}
//审核

export function reviewShiphaver (data) {           
    return request({
        url: `${prefixUrl}/review`,
        method: 'post',
        data: data,
    })
}


