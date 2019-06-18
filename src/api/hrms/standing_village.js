 import  request   from  '@/router/axios'    
 const  prefixUrl  =  '/tmlms/village'

 export  function  getVillageList (params){                                                 
        return  request({
                url:`${prefixUrl}/page`,
                method:'get',
                params:params,
        })    
 }

 export  function  getVillageDetail (userId){                               
            return  request({
                url:`${prefixUrl}/detail`,
                method:'get',
                params:{
                        userId: userId,                 
                },
        })    
}                               


export  function  createVillage (data,type){
        return  request({
                url:`${prefixUrl}/create`,
                method:'post',
                data,
                params:{
                        type:type,
                },
        })    
}                                               


export  function  delVillage (userId){                                                                     
                return  request({
                        url:`${prefixUrl}/delete`,
                        method:'post',
                        params:{
                                userId:userId,
                        },
                })    
}











