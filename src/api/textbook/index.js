 import  request   from  '@/router/axios'    
 const  prefixUrl  =  '/tybhrms/tybtextbook'
 
 export  function  getTextbookList (params){            
        return  request({
                url:`${prefixUrl}/page`,
                method:'get',
                params:params,
        })    
 }

 export  function  getTextbookDetail (id){
            return  request({
                url:`${prefixUrl}/${id}`,
                method:'get',
        })    
}


export  function  createTextbook (data){
        return  request({
                url:`${prefixUrl}/save`,
                method:'post',
                data,
        })    
}

export  function  updateTextbook (data){
        return  request({
                url:`${prefixUrl}/update`,                     
                method:'post',
                data,
        })    
}
//单删除
export  function  delTextbook (id){                                    
                return  request({
                        url:`${prefixUrl}/del/${id}`,
                        method:'post',
                })    
}
//批量删除
export  function   delTextList (data){
        return  request({
                url:`${prefixUrl}/delete`,                     
                method:'post',
                data,
        })     
}










