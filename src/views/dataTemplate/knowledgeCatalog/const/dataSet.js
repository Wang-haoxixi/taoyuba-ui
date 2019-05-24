import {getFieldClassify} from '@/api/dataTemplate/domainClassification'
// 领域分类
function getFieldClassifyData () {
  getFieldClassify().then(({data}) => {
    if (data.code === 0) {
      tableOption.column[1].dicData = data.data
    }
  })
}
getFieldClassifyData()

export let tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  selection: false,
  menuWidth: '100',
  indexLabel: '序号',
  index: false,
  align: 'center',
  border: false,
  column: [
    { label: '信息资源中文名称', prop: 'infoResrcChnNm'},
    { label: '信息资源分类', prop: 'infoResrcClsId', type: 'dic', dicData: [] },
  ],
}
