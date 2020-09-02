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
      prop: 'hullLength',
      label: '船长(m)',
    },
  ]
  
  const crewColumnsMap = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证号码',
    },
    {
      prop: 'phone',
      label: '联系电话',
    },
    {
      prop: 'positionId',
      label: '现任职位',     
      dictName: 'tyb_resume_position',
      type: 'dictGroup',
    },
    {
      prop: 'workStatus',
      label: '用工状态',     
      // dictName: 'tyb_resume_position',
      // type: 'dictGroup',
    },
  ]
  const allcrewColumnsMap = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证号码',
    },
    {
      prop: 'workStatus',
      label: '用工状态',     
      // dictName: 'tyb_resume_position',
      // type: 'dictGroup',
    },
    {
      prop: 'phone',
      label: '手机号码',     
    },
    {
      prop: 'flag',
      label: '来源',     
    },
  ]
  const addcrewColumnsMap = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证号码',
    },
    {
      prop: 'address',
      label: '地址',     
      // dictName: 'tyb_resume_position',
      // type: 'dictGroup',
    },
  ]
  const shipColumnsMap = [
    {
      prop: 'employeeName',
      label: '姓名',
    },
    {
      prop: 'employeeIdcard',
      label: '身份证号码',
    },
    {
      prop: 'employeePhone',
      label: '联系电话',
    },
    {
      prop: 'employeePosition',
      label: '职位',
      dictName: 'tyb_resume_position',
      type: 'dictGroup',
    },
  ]
  const operatColumnsMap = [
    {
      prop: 'shipName',
      label: '船名号',
    },
    {
      prop: 'realname',
      label: '姓名',
    },
  ]
  const shareHolderColumnsMap = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证',
    },
    {
      prop: 'positionId',
      label: '职位',
      dictName: 'tyb_resume_position',
      type: 'dictGroup',
    },
    {
      prop: 'phone',
      label: '电话',
    },
    {
      prop: 'address',
      label: '地址',
    },
  ]
  const CrewRegisteColumnsMap = [
    {
      prop: 'realName',
      label: '姓名',
      width:'180',
    },
    {
      prop: 'idcard',
      label: '身份证',
      width:'230',
    },
    // {
    //   prop: 'positionId',
    //   label: '职位',
    //   dictName: 'tyb_resume_position',
    //   type: 'dictGroup',
    // },
    {
      prop: 'shipNames',
      label: '已登记的渔船',
    },
    {
      prop: 'leftTime',
      label: '最近上船时间',
      width:'210',
    },
    // {
    //   prop: 'address',
    //   label: '地址',
    // },
  ]
  const CrewRecordColumnsMap = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证',
    },
    {
      prop: 'shipId',
      label: '船名',
    },
    {
      prop: 'flag',
      label: '上下船类型',
    },
    {
      prop: 'sourceType',
      label: '来源',
    },
    // {
    //   prop: 'positionId',
    //   label: '职位',
    //   dictName: 'tyb_resume_position',
    //   type: 'dictGroup',
    // },
    {
      prop: 'leftTime',
      label: '最近上船时间',
    },
    // {
    //   prop: 'address',
    //   label: '地址',
    // },
  ]
  // const insureColumnsMap = [
  //   {
  //     prop: 'certNo',
  //     label: '证书编码',
  //   },
  //   {
  //     prop: 'certType',
  //     label: '证书类型',
  //     dictName: 'tyb_crew_cert_type',
  //     type: 'dictGroup',
  //   },
  //   {
  //     prop: 'certLevel',
  //     label: '证书等级',
  //     dictName: 'tyb_crew_cert_level',
  //     type: 'dictGroup',
  //   },
  //   {
  //     prop: 'certTitle',
  //     label: '证书职务',
  //     dictName: 'tyb_crew_cert_title',
  //     type: 'dictGroup',
  //   },
  //   {
  //     prop: 'createTime',
  //     label: '日期',
  //   },
  // ]

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
      licensesFishingExpireDate:'',
      licensesInspectionExpireDate:'',
      licensesNationalExpireDate:'',
      licensesOwnerExpireDate:'',
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

export{columnsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm, crewColumnsMap,allcrewColumnsMap,addcrewColumnsMap, operatColumnsMap ,shipColumnsMap,shareHolderColumnsMap,CrewRegisteColumnsMap,CrewRecordColumnsMap}