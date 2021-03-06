import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

const dictsMap = {

}

const columnsMap = [
    {
      prop: 'contactName',
      label: '联系人',
    },
    {
      prop: 'positionName',
      label: '岗位名称',
    },
    {
      prop: 'recruitNo',
      label: '招聘人数',
    },
    {
      prop: 'salary',
      label: '月薪',
    },
    {
      prop: 'updateTime',
      label: '更新时间',
    },
  ]

  const initForm = () => {
    return {
      positionId: '',
      contactName: '', //联系人
      positionName: '', //岗位名称
      contactPhone: '', //联系电话
      raiseNo: '', //递增人数
      recruitNo: '', //招聘人数
      salary:'', //月薪
      settlement: '', //结算方式
      workCls: '', //工作类型
      startTime: initNow(), //开始时间
      endTime: initNow(), //结束时间
      workPlace:'', //工作地点
      workTime: '', //工作时间
      workSpecification: '', //岗位描述
    }
  }

  const initDtoForm = () => {
    return {
      positionId: '',
      contactName: '', //联系人
      positionName: '', //岗位名称
      contactPhone: '', //联系电话
      raiseNo: '', //递增人数
      recruitNo: '', //招聘人数
      salary:'', //月薪
      settlement: '', //结算方式
      workCls: '', //工作类型
      startTime: initNow(), //开始时间
      endTime: initNow(), //结束时间
      workPlace:'', //工作地点
      workTime: '', //工作时间
      workSpecification: '', //岗位描述
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
    contactName: [
      { required: true, message: '请填联系人', trigger: 'blur' },
      { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'},
    ],
    positionName: [
      { required: true, message: '请填岗位名称', trigger: 'blur' },
      { max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'},
    ],
    contactPhone: [
      { required: true, message: '请填联系电话', trigger: 'blur' },
      { validator: cellPhone, trigger: 'blur'},
    ],
    raiseNo: [
      { required: true, message: '请填递增人数', trigger: 'blur' },
      { max: 4, message: '不得超过5位数', trigger: 'blur'},
    ],
    recruitNo: [
      { required: true, message: '请填招聘人数', trigger: 'blur' },
      { max: 4, message: '不得超过5位数', trigger: 'blur'},
    ],
    salary: [
      { required: true, message: '请填月薪', trigger: 'blur' },
      { max: 10, message: '不得超过10位数', trigger: 'blur'},
    ],
    settlement: [
      { required: true, message: '请填结算方式', trigger: 'blur' },
    ],
    workCls: [
      { required: true, message: '请填工作类型', trigger: 'blur' },
    ],
    workPlace: [
      { required: true, message: '请填工作地点', trigger: 'blur' },
      { max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur'},
    ],
    workTime: [
      { required: true, message: '请填工作时间', trigger: 'blur' },
      { max: 25, message: '长度在 0 到 25 个字符', trigger: 'blur'},
    ],
    startTime: [
      { required: true, message: '请填开始时间', trigger: 'blur' },
    ],
    endTime: [
      { required: true, message: '请填结束时间', trigger: 'blur' },
    ],
    workSpecification: [
      { required: true, message: '请填岗位描述', trigger: 'blur' },
      { max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur'},
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