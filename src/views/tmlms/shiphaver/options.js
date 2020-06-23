import { mergeByFirst } from '@/util/util'
// import { initNow } from '@/util/date'

const columnsMap = [                    
    {
      prop: 'realname',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证',
    },
  ]

        
  const initForm = () => {                    
    return {
        id: '',
        realname: '',
        idcard: '',
        shipId: '',
        bindType: '',
        idcardPhoto: '',
        shipCertPhoto: '',
    }
  }               
                 
  const initDtoForm = () => {
    return {
      id: '',
      realname: '',
      idcard: '',
      shipId: '',
    }
  }

    
  const rules = {                     
    realname: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    idcard: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    bindType: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
  }

  const initSearchForm = () => {
    return {
      realname: '',
      shipName: '', // 
      idcard: '', // 
    }
  }

  const initDtoSearchForm = () => {
    return {
      shipName: '', // 渔船名
      realname: '', // 姓名
      idcard: '', //身份证
    }
  }

  const formToDto = (row) => {
    const newForm = mergeByFirst(initDtoForm(), row)
    return newForm
  }

  const toDtoSearchForm = (row) => {
    const newForm = mergeByFirst(initDtoSearchForm(), row)
    newForm.shipName = row.shipName ? row.shipName : null
    newForm.shipNo = row.shipNo ? row.shipNo : null
    newForm.shipowner = row.shipowner ? row.shipowner : null
    newForm.shipownerIdcard = row.shipownerIdcard ? row.shipownerIdcard : null
    return newForm
  }

export{columnsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm}