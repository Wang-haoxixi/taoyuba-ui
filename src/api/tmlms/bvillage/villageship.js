import request from '@/router/axios'
const prefixUrl = '/tmlms/tybvillageshipinfo'

export  function  getVillageshipinfoByuser (userId) {                
    return request({
        url: `${prefixUrl}/getbyuser/${userId}`,
        method: 'get',
    })
}

//批量新增
export  function  batchsave (data) {
    return request({
        url: `${prefixUrl}/batchship`,      
        method: 'post',
        data,           
      })
}

//批量修改
export  function  batchUpdate (data,userId) {       
    return request({
        url: `${prefixUrl}/batchedit?userId=${userId}`,      
        method: 'post',
        data,           
      })
}

export  function  getVillageshipinfoById (id) {                
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}

export  function  getVillageshipinfoByName (shipowner) {                
    return request({
        url: `${prefixUrl}/getbyShipowner`,
        method: 'get',
        params: {
          shipowner:shipowner,
        },
    })
}
