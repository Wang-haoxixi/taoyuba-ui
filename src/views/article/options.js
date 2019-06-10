import {initNow}  from  '@/util/date'

const   initForm = ()=> {
        return {                                              
            articleId:'', 
            userId:'',
            title:'', 
            type:'',        
            source:'',
            image:'',   
            description:'',
            isRcmd:'',
            createTime:'',
            updateTime:'',
            articleContent:'',
        }
}


const  columnsMap = [
        {
            label:'资讯标题',
            prop:'title',
        },
        {
            label:'来源',     
            prop:'source',
        },
        {
            label:'描述',     
            prop:'description',             
        },
        {
            label:'创建时间',
            prop:'createTime',     
        },        
]     

                                                                            
const initDtoForm = () => {                                                                                                 
    return {      
        articleId:'',
        title:'',
        userId:'',
        type:'',
        source:'',
        image:'',
        description:'',
        isRcmd:'',
        createTime: initNow(), 
        updateTime: initNow(), 
        articleContent:'',
    }
  }

  const initSearchForm = () => {                    
    return {                                                                              
        title: '', 
        source: '', 
    }
  }

  const initDtoSearchForm = () => {                                                      
    return {
        title: '', 
        source: '', 
    }
  }

  const formToDto = (row) => {
      return  initDtoForm(row)          
  }


  const toDtoSearchForm = (row) => {        
      return  initSearchForm(row)       
  }                             

  function isNumberValidate (value, length = 3, decimal = 0) {
    let reg = new RegExp('^\\d{0,' + length + '}$')
    if (decimal === 0) {
      return reg.test(value)
    }
    let reg1 = new RegExp('^\\d{0,' + length + '}\\.\\d{0,' + decimal + '}$')
    return reg.test(value) || reg1.test(value)
  }


  function numberValidate (rule, value, callback) {         
    if (value === '') {
      callback(new Error())
    }else  if (!isNumberValidate(value, rule.length, rule.decimal)){
      callback(new Error())
    }else {
      callback()
    }
  }


  const rules = {               
    title: [
      {required: true, message: '该选项必填！',trigger:'blur'},
    ],
    price: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    origPrice: [        
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    keyword: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    description: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    press: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    author: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    content: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    views: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
  }


  export{columnsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm}





