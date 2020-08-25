import request from '@/router/axios'
const prefixUrl = '/tmlms/tybContractModel'

export function addContractModel (params) {
    return request({
        url: `${prefixUrl}/save`,
        method: 'post',
        data: params,
    })
}
export function editContractModel (params) {
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: params,
    })
}
export function getContractModel (shipName) {
    return request({
        url: `${prefixUrl}/getByShipName?shipName=${shipName}`,
        method: 'get',
        params: shipName,
    })
}
export function checkIsExist (shipName) {
    return request({
        url: `${prefixUrl}/checkByShipName?shipNaem=${shipName}`,
        method: 'get',
        params: shipName,
    })
}
// export function getContractList (query) {
//     return request({
//         url: `${prefixUrl}/getPage`,
//         method: 'get',
//         params: query,
//     })
// }

// export function getContractListAdmin (query) {
//     return request({
//         url: `${prefixUrl}/getPage`,
//         method: 'get',
//         params: query,
//     })
// }

// export function getContract (id) {
//     return request({
//         url: `${prefixUrl}/detail`,
//         method: 'get',
//         params: {
//             contractId: id,
//         },
//     })
// }



// export function editContract (contract) {
//     return request({
//         url: `${prefixUrl}/edit`,
//         method: 'post',
//         data: contract,
//     })
// }

// export function deleteContract (contractId) {
//     return request({
//         url: `${prefixUrl}/delete`,
//         method: 'post',
//         params: {
//             contractId,
//         },
//     })
// }

// export function getDict (key) {
//   return request({
//     url: `/admin/dict/type/${key}`,
//     method: 'get',
//   })
// }

// //新增PDF文件名
// export  function  addContractFile (data) {
//     return  request({
//           url:`${prefixUrl}/addfile`,
//           method:'post',
//           data,
//     })
// }

// export function getChild (id) {
//     return request({
//       url: `/admin/dict/getChild/${id}`,
//       method: 'get',
//     })
//   }

//   export function getById (id) {
//     return request({
//       url: `/admin/dict/${id}`,
//       method: 'get',
//     })
//   }