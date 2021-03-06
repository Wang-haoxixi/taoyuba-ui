import { mergeByFirst } from '@/util/util'



  const dictsMap = {
    resumeStatus: {
      0: '待审核', 1: '正常', 2: '不通过',
    },
    isPublic: {
      0: '不公开', 1: '公开',
    },
    isRcmd: {
      0: '不推荐', 1: '推荐',
    },
  }
  
  const columnsMap = [
    {
      prop: 'resumeId',
      label: '编号',
    },
    {
      prop: 'realName',
      label: '姓名',
    },
    // {
    //   prop: 'resumeName',
    //   label: '简历名字',
    // },
    {
      prop: 'job',
      label: '应聘职位',     
      dictName: 'tyb_resume_position',
      type: 'dictGroup',
    },
    {
      prop: 'updateTime',
      label: '更新时间',
    },
    {
      prop: 'resumeStatus',
      label: '简历状态',
      type: 'dict',
    },
  ]
  
  const formToDto = (row) => {
    const newForm = mergeByFirst(initDtoForm(), row)
    return newForm  
  }

  const initDtoForm = () => {
    return {
      resumeId: '',
      realName: '', //姓名
      // resumeName: '', //简历名字
      birthday: '', //出生日期
      province: '', //现住地址 省
      city:'', //现住地址 市
      contactPhone: '', //联系电话
      education: '', //教育程度
      expectSalary: '', //期望月薪
      foreignLanguage: '', //外语水平
      height: '', //身高CM
      isPublic: '', //是否公开
      postion:'', //原任职务
      job:'', //应聘职位
      seniority: '', //航海经验
      skill: '', //特殊技能
      workRequire: '', //作业要求
      workDetail: '', //作业方式
      workExprience: '',
      // isRcmd: '', //是否推荐
    }
  }

  const initSearchForm = () => {    
    return {
      realName: '', //姓名
      resumeId: '',
      startdate: '',
      resumeCrestartdate: '',
      resumeCreenddate: '',
      // resumeName: '', //简历名字  
    }
  }

  const initDtoSearchForm = () => {
    return {
      realName: '', //姓名
      resumeId: '',
      startdate: '',
      resumeCrestartdate: '',
      resumeCreenddate:'',
      // resumeName: '', //简历名字
    }
  }

  const toDtoSearchForm = (row) => {
    const newForm = mergeByFirst(initDtoSearchForm(), row)
    newForm.realName = row.realName ? row.realName : null
    // newForm.resumeName = row.resumeName ? row.resumeName : null
    return newForm
  }

  const initForm = () => {
    return {
      resumeId: '',
      realName: '', //姓名
      // resumeName: '', //简历名字
      birthday: '', //出生日期
      province: '', //现住地址 省
      city:'', //现住地址 市
      contactPhone: '', //联系电话
      education: '', //教育程度
      expectSalary: '', //期望月薪
      foreignLanguage: '', //外语水平
      height: '', //身高CM
      isPublic: '', //是否公开
      postion:'', //原任职务
      job:'', //应聘职位
      seniority: '', //航海经验
      skill: '', //特殊技能
      workRequire: '', //作业要求
      workDetail: '', //作业方式
      workExprience: '',
      // isRcmd: '', //是否推荐
    }
  }

  const cellPhone = (rules, value, callback) => {
    if (value !== '') {
      var reg = /(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/
      if (!reg.test(value)) {
        callback(new Error('请输入11位的手机号码'))
      }
    }
    callback()
  }

  const rules = {
    realName: [
        { required: true, message: '请填姓名', trigger: 'blur' },
        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'},
    ],
    // resumeName: [
    //     { required: true, message: '请填简历名字', trigger: 'blur' },
    //     { max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'},
    // ],
    birthday: [
        { required: true, message: '请填出生日期', trigger: 'blur' },
    ],
    province: [
        { required: true, message: '请填省', trigger: 'blur' },
    ],
    city: [
        { required: true, message: '请填市', trigger: 'blur' },
    ],
    contactPhone: [
        { required: true, message: '请填联系电话', trigger: 'blur' },
        { validator: cellPhone, trigger: 'blur'},
    ],
    education: [
        { required: true, message: '请填教育程度', trigger: 'blur' },
    ],
    expectSalary: [
        { required: true, message: '请填期望月薪', trigger: 'blur' },
        { max: 10, message: '不得超过10位数', trigger: 'blur'},
    ],
    foreignLanguage: [
        { required: true, message: '请填外语水平', trigger: 'blur' },
    ],
    height: [
        { required: true, message: '请填身高', trigger: 'blur' },
        { max: 3, message: '不得超过4位数', trigger: 'blur'},
    ],
    isPublic: [
        { required: true, message: '请填是否公开', trigger: 'blur' },
    ],
    postion: [
        { required: true, message: '请填原任职务', trigger: 'blur' },
    ],
    job: [
        { required: true, message: '请填应聘职位', trigger: 'blur' },
    ],
    skill: [
        { required: true, message: '请填特殊技能', trigger: 'blur' },
        { max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur'},
    ],
    workRequire: [
        { required: true, message: '请填作业要求', trigger: 'blur' },
    ],
    workExprience: [
      { required: true, message: '请填工作经验', trigger: 'blur' },
    ],
    // isRcmd: [
    //   { required: true, message: '请填是否推荐', trigger: 'blur' },
    // ],
  }


  export{columnsMap, dictsMap, initSearchForm, toDtoSearchForm, formToDto, rules, initForm}