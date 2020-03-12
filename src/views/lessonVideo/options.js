import { mergeByFirst } from '@/util/util'
// import { initNow } from '@/util/date'

const columnsMap = [                    
    {
      prop: 'vedioId',
      label: '视频编号',
    },
    {
      prop: 'vedioName',
      label: '视频标题',
    },
    {
      prop: 'videoDescript',
      label: '视频简介',
    },
    {
      prop: 'videoViewerNum',
      label: '观看人数',
    },
  ]

  const initForm = () => {                
    return {
        vedioName: '',
        videoDescript: '',
        videoImg: '',
        videoSrc: '',
        videoViewerNum: '',
        source:'',
    }
  }               
                 
  const initDtoForm = () => {
    return {
        vedioName: '',
        videoDescript: '',
        videoImg: '',
        videoSrc: '',
        videoViewerNum: '',
        source:'',
    }
  }

    
  
  const rules = { 

    vedioName: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    videoDescript: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    videoImg: [
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
    videoSrc: [
      {required: true, message: '该选项必填！', trigger: 'change'},
    ],
    source: [   
      {required: true, message: '该选项必填！', trigger: 'blur'},
    ],
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