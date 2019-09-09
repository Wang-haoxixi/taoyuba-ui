import { mergeByFirst } from '@/util/util'
// import { initNow } from '@/util/date'

const columnsMap = [
    {
      prop: 'shipName',
      label: '渔船名',
    },
    {
      prop: 'shipNo',
      label: '渔船编号',
    },
    {
      prop: 'shipowner',
      label: '持证人',
    },
    {
      prop: 'shipownerIdcard',
      label: '持证人身份证',
    },
    {
      prop: 'engineTotalPower',
      label: '主机总功率(kw)',
    },
    {
      prop: 'hullLength',
      label: '船长(m)',
    },
    {
      prop: 'dualPower',
      label: '双控功率(kw)',
    },
  ]

  const initForm = () => {      
    return {
      activityType: '',
      address: '',
      buildDate: '',
      createTime: '',
      dualPower: '',
      engineTotalPower: '',
      fishType: '',
      fishingGear: '',
      grossTonnage: '',
      hullLength: '',
      hullMaterial: '',
      licensesDateExpire: '',
      licensesDateIssue: '',
      licensesFishingNo: '',
      licensesInspectionNo: '',
      licensesNationalNo: '',
      licensesOwnerShip: '',
      mainEngineModel: '',
      mainEnginePower: '',
      mobile: '',
      mouldedBreadth: '',
      mouldedDepth: '',
      netTonnage: '',
      portRegister: '',
      shipId: '',
      shipName: '',
      shipNo: '',
      shipShare: '',
      shipowner: '',
      shipownerIdcard: '',
      updateTime: '',
      userId: '',
      // villageId: '',
      workMode: '',
      workMode2: '',
      zipcode: '',
      regionId: '',
    }
  }               
                 
  const initDtoForm = () => {
    return {
      activityType: '',
      address: '',
      buildDate: '',
      createTime: '',
      dualPower: '',
      engineTotalPower: '',
      fishType: '',
      fishingGear: '',
      grossTonnage: '',
      hullLength: '',
      hullMaterial: '',
      licensesDateExpire: '',
      licensesDateIssue: '',
      licensesFishingNo: '',
      licensesInspectionNo: '',
      licensesNationalNo: '',
      licensesOwnerShip: '',
      mainEngineModel: '',
      mainEnginePower: '',
      mobile: '',
      mouldedBreadth: '',
      mouldedDepth: '',
      netTonnage: '',
      portRegister: '',
      shipId: '',
      shipName: '',
      shipNo: '',
      shipShare: '',
      shipowner: '',
      shipownerIdcard: '',
      updateTime: '',
      userId: '',
      // villageId: '',
      workMode: '',
      workMode2: '',
      zipcode: '',
      regionId: '',
    }
  }

  function isNumberValidate (value, length = 3, decimal = 0) {
    let reg = new RegExp('^\\d{0,' + length + '}$')
    if (decimal === 0) {
      return reg.test(value)
    }
    let reg1 = new RegExp('^\\d{0,' + length + '}\\.\\d{0,' + decimal + '}$')
    return reg.test(value) || reg1.test(value)
  }

  function isIdCard (value) {
    let idCard = /^\d{0,18}$/
    let idCard1 = /^\d{17}X$/
    return idCard.test(value) || idCard1.test(value)
  }

  function idCardValidate (rule, value, callback) {
    if (value === '') {
      callback(new Error())
    }else  if (!isIdCard(value)){
      callback(new Error())
    }else {
      callback()
    }
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
    // zipcode: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 6, message: '请输入正确的邮政！'},
    // ],
    // engineTotalPower: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    // ],
    // mainEnginePower: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    // ],
    // dualPower: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    // ],
    // mainEngineModel: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    // grossTonnage: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 0, message: '请输入0~999的整数！'},
    // ],
    // hullLength: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    // ],
    // mouldedBreadth: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    // ],
    // mouldedDepth: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    // ],
    // netTonnage: [
    //   {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 0, message: '请输入0~999的整数！'},
    // ],
    // villageId: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    regionId: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    // activityType: [
    //   {required: true, message: '该选项必填！', trigger: 'change'},
    // ],
    address: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    // buildDate: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    createTime: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    // fishType: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    // fishingGear: [
    //   {required: true, message: '该选项必填！', trigger: 'change'},
    // ],
    // hullMaterial: [
    //   {required: true, message: '该选项必填！', trigger: 'change'},
    // ],
    // licensesDateExpire: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    // licensesDateIssue: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    licensesFishingNo: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    // licensesInspectionNo: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    // licensesNationalNo: [
    //   {required: true, message: '该选项必填！', trigger: 'blur'},
    // ],
    licensesOwnerShip: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    mobile: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 11, decimal: 0, message: '请输入正确的手机号码！'},
    ],
    // portRegister: [
    //   {required: true, message: '该选项必填！', trigger: 'change'},
    // ],
    shipId: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    shipName: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    shipNo: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    shipShare: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    shipowner: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    shipownerIdcard: [
      {required: true, validator: idCardValidate, trigger: 'blur', length: 3, decimal: 0, message: '请输入正确的身份证号码！'},
    ],
    updateTime: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    // workMode: [
    //   {required: true, message: '该选项必填！', trigger: 'change'},
    // ],
    // workMode2: [
    //   {required: true, message: '该选项必填！', trigger: 'change'},
    // ],
  }

  const initSearchForm = () => {
    return {
      shipName: '', // 船名号
      shipNo: '', // 渔船编号
      shipowner: '', //持证人姓名
      shipownerIdcard: '', //持证人身份证
    }
  }
  const initDtoSearchForm = () => {
    return {
      shipName: '', // 船名号
      shipNo: '', // 渔船编号
      shipowner: '', //持证人姓名
      shipownerIdcard: '', //持证人身份证
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