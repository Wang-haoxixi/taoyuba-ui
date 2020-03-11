import {initNow}  from  '@/util/date'
import { mergeByFirst } from '@/util/util'

const dictsMap = { 
  isRcmd: {
    0: '不推荐', 1: '推荐',
  },
}

const  columnsMap = [
  {
      label:'资讯标题',
      prop:'title',
  },
  {
      label:'来源',     
      prop:'source',
  },
  {
      label:'描述',     
      prop:'description',             
  },
  {
      label:'创建时间',
      prop:'createTime',     
  },        
]     


const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  return newForm  
}

const initDtoForm = () => {
  return {
    articleId:'', //资讯ID
    title:'', //资讯标题
    type:'', //分类
    source:'', //来源
    image:'', //图片
    description:'', //描述
    isRcmd:'', //是否推荐
    createTime: initNow(), 
    updateTime: initNow(), 
    articleContent:'', //资讯内容
    isDispatch:'',
    httpSrc:'',
  }
}

const initSearchForm = () => {
  return {
    title: '', //资讯标题
    source: '', //来源  
  }
}

const initDtoSearchForm = () => {
  return {
    title: '', //资讯标题
    source: '', //来源
  }
}

const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.title = row.title ? row.title : null
  newForm.source = row.source ? row.source : null
  return newForm
}

const initForm = () => {
  return {
    articleId:'', //资讯ID
    title:'', //资讯标题
    type:'', //分类
    source:'', //来源
    image:'', //图片
    description:'', //描述
    isRcmd:'', //是否推荐
    createTime: initNow(), 
    updateTime: initNow(), 
    articleContent:'', //资讯内容
    isDispatch:'',
    httpSrc:'',    
  }
}



const rules = {
  title: [
    { required: true, message: '请填资讯标题', trigger: 'blur' },
    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'},
  ],
  source: [
    { required: true, message: '请填来源', trigger: 'blur' },
    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'},
  ],
  type: [
    { required: true, message: '请填分类', trigger: 'blur' },
  ],
  isRcmd: [
    { required: true, message: '请填是否推荐', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请填描述', trigger: 'blur' },
    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'},
  ],    
  isDispatch: [
    { required: true, message: '请选择一个选项', trigger: 'blur' },
  ],
}

  export{columnsMap, dictsMap, rules, initForm, formToDto, initSearchForm, initDtoSearchForm, toDtoSearchForm}





