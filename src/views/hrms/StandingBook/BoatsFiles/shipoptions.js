import { initNow } from '@/util/date'
const   initForm = ()=>{          
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
          villageId: '',
          workMode: '',
          workMode2: '',
          zipcode: '',
        }
}

const  columnsMap = [                   
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

const insureColumnsMap = [
  {
    prop: 'type',
    label: '类型',
  },
  {
    prop: 'amount',
    label: '保额',
  },
  {
    prop: 'premium',
    label: '保费',
  },
  {
    prop: 'insureDate',
    label: '投保日期',
  },
]

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

  const initSearchForm = () => {    
    return {
      contactName: '', // 联系人
      positionName: '', // 岗位名称
    }
  }
  const initDtoSearchForm = () => {
    return {
      contactName: '', // 联系人
      positionName: '', // 岗位名称', 
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


  export{columnsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm, insureColumnsMap}





