import {getFieldClassify} from '@/api/dataTemplate/domainClassification'
import {getStandard} from '@/api/dataTemplate/standardFile'
// 领域分类
export function getFieldClassifyData () {
  return new Promise((resolve) => {
    getFieldClassify().then(({data}) => {
      resolve(data)
    })
  })
}

// 标准文件
export  function getStandardData () {
  return new Promise((resolve) => {
    getStandard().then(({data}) => {
      resolve(data)
    })
  })
}
