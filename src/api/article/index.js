 import  request   from  '@/router/axios'    
 const  prefixUrl  =  '/tybhrms/tybarticle'

 export  function  getArticleList (params){                                 
        return  request({
                url:`${prefixUrl}/page`,
                method:'get',
                params:params,
        })    
 }

 export  function  getArticleDetail (id){                                                                                    
            return  request({                                                           
                url:`${prefixUrl}/${id}`,                                                                                               
                method:'get',
        })    
}                                       


export  function  createArticle (data){         
        return  request({
                url:`${prefixUrl}/create`,
                method:'post',
                data,
        })    
}                               

export  function  updateArticle (data){                          
        return  request({
                url:`${prefixUrl}/update`,                     
                method:'post',
                data,
        })    
}

//单删除                                                        
export  function  delArtilce (id){                                                                                              
                return  request({
                        url:`${prefixUrl}/del/${id}`,
                        method:'post',
                })    
}
//批量删除
export  function   delArticleList (data){                                               
        return  request({
                url:`${prefixUrl}/delete`,                     
                method:'post',
                data,
        })     
}










