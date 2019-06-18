
const   initForm = ()=>{          
        return {              
            userId:'',
            villageId:'',
            villageName:'',
            origPrice:'',
            contactName:'',
            phone:'',
            address:'',
            content:'',
            lng:'',
            lat:'',
            status:'',
        }
}

const  columnsMap = [                   
        {
            label:'渔村名称',
            prop:'villageName',
        },
        {
            label:'联系人',
            prop:'contactName',
        },
        {
            label:'联系电话',
            prop:'phone',     
        },
        {
            label:'机构地址',
            prop:'address',     
        },          
]


const initDtoForm = () => {
    return {
      userId:'',
      villageId:'',
      villageName:'',
      origPrice:'',
      contactName:'',
      phone:'',
      address:'',
      content:'',
      lng:'',
      lat:'',
      status:'',
    }
  }

  const initSearchForm = () => {    
    return {
        villageName: '', 
        contactName: '', 
    }
  }
  const initDtoSearchForm = () => {
    return {
        villageName: '', 
        contactName: '', 
    }
  }
                                                      
  const formToDto = (row) => {
      return  initDtoForm(row)
  }

  const toDtoSearchForm = (row) => {
      return  initSearchForm(row)
  }

  // function isNumberValidate (value, length = 3, decimal = 0) {
  //   let reg = new RegExp('^\\d{0,' + length + '}$')
  //   if (decimal === 0) {
  //     return reg.test(value)
  //   }
  //   let reg1 = new RegExp('^\\d{0,' + length + '}\\.\\d{0,' + decimal + '}$')
  //   return reg.test(value) || reg1.test(value)
  // }


  // function numberValidate (rule, value, callback) {
  //   if (value === '') {
  //     callback(new Error())
  //   }else  if (!isNumberValidate(value, rule.length, rule.decimal)){
  //     callback(new Error())
  //   }else {
  //     callback()
  //   }
  // }


  const rules = {               
    villageName: [
      {required: true, message: '该选项必填！',trigger:'blur'},
    ],
  }


  export{columnsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm}





