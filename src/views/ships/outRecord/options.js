import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

const columnsMap = [
    {
      prop: 'shipName',
      label: '渔船名',
    },
    {
      prop: 'createTime',
      label: '出港时间',
    },
    {
      prop: 'portName',
      label: '港口',
    },
    {
      prop: 'seaworthStatus',
      label: '船舶适航',
      type:'shipStatus',
    },
    // {
    //   prop: 'shipId',
    //   label: '船员适任',
    //   type:'certStandard',
    // },
    // {
    //   prop: 'address',
    //   label: '船员适任',
    // },
    // {
    //   prop: 'areaCode',
    //   label: '港口所属区域',
    //   type:'areaCode',
    //   text:'暂无',
    // },
    // {
    //   prop: 'phone',
    //   label: '船员联系电话',
    // },
    // {
    //   prop: 'leftTime',
    //   label: '离船时间',
    // },
    // {
    //   prop: 'hullLength',
    //   label: '船长(m)',
    // },
    // {
    //   prop: 'dualPower',
    //   label: '双控功率(kw)',
    // },
  ]
  const columnsMapDetail = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'idcard',
      label: '身份证号',
    },
    {
      prop: 'idcardPhoto',
      label: '身份证正面照',
      type:'image',
    },
    {
      prop: 'facePhoto',
      label: '人脸照',
      type:'image',
    },
    {
      prop: 'certPhoto',
      label: '证书照',
      type:'image',
    },
    {
      prop: 'boatMan',
      label: '职务',
      type:'position',
    },
    // {
    //   prop: 'shipId',
    //   label: '船员适任',
    //   type:'certStandard',
    // },
    // {
    //   prop: 'address',
    //   label: '船员适任',
    // },
    // {
    //   prop: 'areaCode',
    //   label: '港口所属区域',
    //   type:'areaCode',
    //   text:'暂无',
    // },
    // {
    //   prop: 'phone',
    //   label: '船员联系电话',
    // },
    // {
    //   prop: 'leftTime',
    //   label: '离船时间',
    // },
    // {
    //   prop: 'hullLength',
    //   label: '船长(m)',
    // },
    // {
    //   prop: 'dualPower',
    //   label: '双控功率(kw)',
    // },
  ]

  const initForm = () => {
    return {
      portName:'',
      address: '',
      areaCode: '',
      lat:'',
      lng:'',
    }
  }               
                 
  const initDtoForm = () => {
    return {
      realName:'',//个人姓名
      gender:'',//性别
      idcard:'',//身份证号码
      birthday: '', //出生日期
      address: '', //家庭地址
      phone: '', //联系电话
      contactName: '', //家庭联系人
      contactPhone: '', //家庭联系电话
      crewCert:'', //船民证号码
      certExpDate: '', //船民证有效期限
      createTime: initNow(), //开始时间
      updateTime: initNow(), //结束时间
      remark: '', //岗位描述
      fourSmallCard:'',//上传附件
      provinceId:'',
      cityId:'',
      districtId:'',
      villageId:'',
      positionId:'',
      shipId:0,//
      userId:'',
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
    zipcode: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 6, message: '请输入正确的邮政！'},
    ],
    engineTotalPower: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    mainEnginePower: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    dualPower: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    mainEngineModel: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    grossTonnage: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 0, message: '请输入0~999的整数！'},
    ],
    hullLength: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    mouldedBreadth: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    mouldedDepth: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
    ],
    netTonnage: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 0, message: '请输入0~999的整数！'},
    ],
    villageId: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    activityType: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    address: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    buildDate: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    createTime: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    fishType: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    fishingGear: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    hullMaterial: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    licensesDateExpire: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    licensesDateIssue: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    licensesFishingNo: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    licensesInspectionNo: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    licensesNationalNo: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    licensesOwnerShip: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    mobile: [
      {required: true, validator: numberValidate, trigger: 'blur', length: 11, decimal: 0, message: '请输入正确的手机号码！'},
    ],
    portRegister: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    shipId: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    portName: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    shipNo: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    areaCode: [
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
    workMode: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    workMode2: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
  }

  const initSearchForm = () => {
    return {
      shipName: '', 
      realName: '', 
      idcard:'',
      startDate:'',
      endDate:'',
    }
  }
  const initDtoSearchForm = () => {
    return {
      contactName: '', // 联系人
      positionName: '', // 岗位名称
    }
  }

  const formToDto = (row) => {
    const newForm = mergeByFirst(initDtoForm(), row)
    return newForm
  }

  const toDtoSearchForm = (row) => {
    const newForm = mergeByFirst(initDtoSearchForm(), row)
    newForm.contactName = row.contactName ? row.contactName : null
    newForm.positionName = row.positionName ? row.positionName : null
    return newForm
  }

export{columnsMap,columnsMapDetail, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm}