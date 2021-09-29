import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'
// import { validRegisterUserPhone } from '@/api/login'

const dictsMap = {
  isTrain: {
    0: '否', 1: '是',
  },
}

const columnsMap = [
    {
      prop: 'realName',
      label: '持证人',
    },
    {
      prop: 'certNo',
      label: '证书编号',
    },
    {
      prop: 'certDateIssue',
      label: '签发日期',
      type: 'ldate',
    },
    {
      prop: 'certDateExpire',
      label: '结束日期',
      type: 'ldate',
    },
    {
      prop: 'certType',
      label: '证书种类',
      dictName: 'tyb_crew_cert_type',
      type: 'dictGroup',
    },
    {
      prop: 'certLevel',
      label: '证书等级',
      dictName: 'tyb_crew_cert_level',
      type: 'dictGroup',
    },
  ]

  const certificateColumns = [
    {
      prop: 'certType',
      label: '证书种类',
      dictName: 'tyb_crew_cert_type',
      type: 'dict',
    },
    {
      prop: 'certLevel',
      label: '证书等级',
      dictName: 'tyb_crew_cert_level',
      type: 'dict',
    },
    {
      prop: 'certTitle',
      label: '证书职务',
      dictName: 'tyb_crew_cert_title',
      type: 'dict',
    },
    {
      prop: 'certNo',
      label: '证书编号',
    },
    {
      prop: 'certDateIssue',
      label: '有效起始日期',
      type: 'date',
    },
    {
      prop: 'certDateExpire',
      label: '有效终止日期',
      type: 'date',
    },
    {
      prop: 'certFile',
      label: '附件',
      type: 'file',
    },
  ]

  const initForm = () => {
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
      remark: '', //岗位描述,
      fourSmallCard:'',//上传附件
      provinceId:'',
      cityId:'',
      districtId:'',
      villageId:'',
      positionId:'',
      shipId:0,//
      userId:'',
      nationality: '中国', //国籍
      nation: '', //名族
      applyType: 1, //申请类别
      isTrain: 0, //是否需要培训
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
      nationality: '', //国籍
      nation: '', //名族
      applyType: 1, //申请类别
      isTrain: 0, //是否需要培训
    }
  }
  var checkPhone = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入联系电话'))
    } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
      callback(new Error('请输入正确的手机号码!'))
    } else{
      callback()
    }
  }
  var checkNumber = (rule, value, callback) => {
    if (Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) < 999) {
      callback()
     } else {
       callback(new Error('请输入1-999的正整数'))
     }
  }

  const rules = {
    shipName: [
      { required: true, message: '请填写完整渔船名', trigger: 'blur' },
    ],
    shipowner: [
      { required: true, message: '请填写持证人姓名', trigger: 'blur' },
    ],
    driverQuantity: [
      { required: true, message: '请填写驾驶类数量', trigger: 'blur' },
      { validator: checkNumber, trigger: 'blur' },
    ],
    normalQuantity: [
      { required: true, message: '请填写普通船员数量', trigger: 'blur' },
      { validator: checkNumber, trigger: 'blur' },
    ],
    engineQuantity: [
      { required: true, message: '请填写轮机类数量', trigger: 'blur' },
      { validator: checkNumber, trigger: 'blur' },
    ],
    // realName: [
    //   { required: true, message: '请填写个人姓名', trigger: 'blur' },
    // ],
    // contactName: [
    //   { required: true, message: '请填联系人', trigger: 'blur' },
    // ],
    // gender: [
    //   { required: true, message: '请填写性别', trigger: 'blur' },
    // ],
    // idcard: [
    //   { required: true, message: '请填写身份证信息', trigger: 'blur' },
    // ],
    // birthday: [
    //   { required: true, message: '请填写生日信息', trigger: 'blur' },
    // ],
    phone: [
      { required: true, message: '请填写联系电话', trigger: 'blur' },
      { validator: checkPhone, trigger: 'blur' },
    ],
  }
  
  // const blurText = (rule, value) => {  
  //     // const reg = /^\-\d\.?\d*$/
  //     // const boolean = reg.test(value)
  //     const boolean = new RegExp('^[1-9][0-9]*$').test(value)
  //    // console.log(boolean)
  //     if (!boolean) {
  //         this.$message.warning('请输入正整数')
  //         this.eyPara.amErrYear = ''
  //       }
  // }

  const initSearchForm = () => {
    return {
      contactName: '', // 联系人
      positionName: '', // 岗位名称
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

export{columnsMap, dictsMap, rules, initForm, formToDto, initSearchForm, 
  initDtoSearchForm, toDtoSearchForm, certificateColumns}