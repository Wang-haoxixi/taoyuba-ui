import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

const dictsMap = {

}

const columnsMap = [
    {
      prop: 'realName',
      label: '联系人',
    },
    {
      prop: 'address',
      label: '地址',
    },
    {
      prop: 'contactName',
      label: '联系人',
    },
    {
      prop: 'remark',
      label: '备注',
    },
    {
      prop: 'phone',
      label: '电话号码',
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
  const rules = {
    realName: [
      { required: true, message: '请填写个人姓名', trigger: 'blur' },
    ],
    contactName: [
      { required: true, message: '请填联系人', trigger: 'blur' },
    ],
    gender: [
      { required: true, message: '请填写性别', trigger: 'blur' },
    ],
    idcard: [
      { required: true, message: '请填写身份证信息', trigger: 'blur' },
    ],
    birthday: [
      { required: true, message: '请填写生日信息', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: '请填写联系电话', trigger: 'blur' },
    ],
  }

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

export{columnsMap, dictsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm}