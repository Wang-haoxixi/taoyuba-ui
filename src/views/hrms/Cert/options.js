import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'


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
      certId: '',
      certType: '', //证书类型
      certLevel: '', //证书等级
      certTitle: '', //证书职务
      certNo: '', //证书编号
      certDateIssue: initNow(), //有效起始日期
      certDateExpire: initNow(), //有效终止日期
      certFile: '', //附件
    }
  }

  const initDtoForm = () => {
    return {
      certId: '',
      certType: '', //证书类型
      certLevel: '', //证书等级
      certTitle: '', //证书职务
      certNo: '', //证书编号
      certDateIssue: initNow(), //有效起始日期
      certDateExpire: initNow(), //有效终止日期
      certFile: '', //附件
    }
  }


  const  queryForm = ()  =>{
      return  {
            userId:'',
            certType:'',
            certName:'',
      }
  }

  const formToDto = (row) => {
    const newForm = mergeByFirst(initDtoForm(), row)
    return newForm
  }

  const initSearchForm = () => {
    return {
      idCard: '',
      crewName: '',
      certIssueUnit: '',
      certTitle: '',
      certLevel: '',
      certType: '', // 证书类型
      certNo: '', // 证书编号
    }
  }
  
  const initDtoSearchForm = () => {
    return {
      idCard: '',
      crewName: '',
      certIssueUnit: '',
      certTitle: '',
      certLevel: '',
      certType: '', // 证书类型
      certNo: '', // 证书编号
    }
  }
  
  const toDtoSearchForm = (row) => {
    const newForm = mergeByFirst(initDtoSearchForm(), row)
    newForm.certType = row.certType ? row.certType : null
    newForm.certNo = row.certNo ? row.certNo : null
    return newForm
  }


  const rules = {
    certType: [
      { required: true, message: '请填证书类型', trigger: 'blur' },
    ],
    certLevel: [
      { required: true, message: '请填证书等级', trigger: 'blur' },
    ],
    certTitle: [
      { required: true, message: '请填证书职务', trigger: 'blur' },
    ],
    certNo: [
      { required: true, message: '请填描述', trigger: 'blur' },
      { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'},
    ],
    certFile: [
      { required: true, message: '请填附件', trigger: 'blur' },
    ],
  }

  const  searchForm = () => {
        return {
            realName: '',
            idcard: '',
            certIssueUnit: '',
            certNo: '',
            certLevel: '',
            certType: '',
            certTitle: '',
        }
  }

export{ columnsMap, dictsMap, initForm, formToDto, rules, initSearchForm, toDtoSearchForm,queryForm,searchForm }