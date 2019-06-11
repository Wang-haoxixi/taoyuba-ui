import { mergeByFirst } from '@/util/util'


const dictsMap = {

}

const columnsMap = [
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
      {
        prop: 'certTitle',
        label: '证书职务',
        dictName: 'tyb_crew_cert_title',
        type: 'dictGroup',
      },
      {
        prop: 'certNo',
        label: '证书编号',
      },
]

  const initForm = () => {
    return {
      recruitId: '',
      contactName: '', //联系人
      positionId: '', //招聘岗位
      contactPhone: '', //联系电话
      recruitNo: '', //招聘人数
      salary: '', //月薪
      salaryCurrency: '', //货币种类
      certRequire: '', //证书要求
      ageRequire: '', //年龄要求
      workMode: '', //作业方式
      province: '',//上船地点
      city: '', //上船地点
      hullLength: '', //船长（m）
      totalPower: '', //主机总功率
      // isRcmd: '', //是否推荐
    }
  }

  const initDtoForm = () => {
    return {
      recruitId: '',
      contactName: '', //联系人
      positionId: '', //招聘岗位
      contactPhone: '', //联系电话
      recruitNo: '', //招聘人数
      salary: '', //月薪
      salaryCurrency: '', //货币种类
      certRequire: '', //证书要求
      ageRequire: '', //年龄要求
      workMode: '', //作业方式
      province: '',//上船地点
      city: '', //上船地点
      hullLength: '', //船长（m）
      totalPower: '', //主机总功率
      // isRcmd: '', //是否推荐
    }
  }

  const formToDto = (row) => {
    const newForm = mergeByFirst(initDtoForm(), row)
    return newForm
  }

  const rules = {
    contactName: [
      { required: true, message: '请填联系人', trigger: 'blur' },
      { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'},
    ],
    positionId: [
      { required: true, message: '请填招聘岗位', trigger: 'blur' },
      { max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'},
    ],
 
    recruitNo: [
      { required: true, message: '请填招聘人数', trigger: 'blur' },
      { max: 4, message: '不得超过5位数', trigger: 'blur'},
    ],
    salary: [
      { required: true, message: '请填月薪', trigger: 'blur' },
      { max: 10, message: '不得超过10位数', trigger: 'blur'},
    ],
    salaryCurrency: [
      { required: true, message: '请填货币种类', trigger: 'blur' },
    ],
    certRequire: [
      { required: true, message: '请填证书要求', trigger: 'blur' },
    ],
    ageRequire: [
      { required: true, message: '请填年龄要求', trigger: 'blur' },
    ],
    workMode: [
      { required: true, message: '请填作业方式', trigger: 'blur' },
    ],

    // isRcmd: [
    //   { required: true, message: '请填是否推荐', trigger: 'blur' },
    // ],
  }

export{ columnsMap, dictsMap, initForm, formToDto, rules }