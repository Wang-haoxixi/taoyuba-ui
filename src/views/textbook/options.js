import {initNow}  from  '@/util/date'

const   initForm = ()=>{          
        return {
            textbookId:'',
            title:'',
            price:'',
            origPrice:'',
            keyword:'',
            description:'',
            press:'',
            author:'',
            content:'',
            views:'',
            createTime:'',
            updateTime:'',
        }
}

const  columnsMap = [                   
        {
            label:'教材标题',
            prop:'title',
        },
        {
            label:'商品价格',
            prop:'price',
        },
        {
            label:'商品价格',
            prop:'price',     
        },
        {
            label:'出版社',
            prop:'press',     
        },
        {
            label:'作者',
            prop:'author',           
        },           
]


const initDtoForm = () => {
    return {
        textbookId:'',
        title:'',
        price:'',
        origPrice:'',
        keyword:'',
        description:'',
        press:'',
        author:'',
        content:'',
        views:'',
      createTime: initNow(), 
      updateTime: initNow(), 

    }
  }

  const initSearchForm = () => {    
    return {
        title: '', 
        keyword: '', 
    }
  }
  const initDtoSearchForm = () => {
    return {
        title: '', 
        keyword: '', 
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





