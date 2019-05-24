import {getFieldClassifyData, getStandardData} from '../../const/index'
import {getStandardByDomainClassification, getStandardInfoById} from '@/api/dataTemplate/standardFile'
export default {
  data () {
    return {
      form: {
        id: '',
        infoResrcChnNm: '',
        infoResrcPrvd: '',
        infoResrcClsId: '',
        stdDocId: '',
      },
      standardData: [],
      fieldClassifyData: [],
      standardDataById: [],
    }
  },
  computed: {
    column () {
      return [
        {
          label: '信息资源中文名称',
          prop: 'infoResrcChnNm',
          span: 24,
          maxlength: 50,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '信息资源分类',
          prop: 'infoResrcClsId',
          span: 24,
          type: 'select',
          dicData: this.fieldClassifyData,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
          change: (val)=>{
            getStandardByDomainClassification({id: val.value}).then(({data})=>{
              if(data.code === 0) {
                this.form.stdDocId = ''
                this.form.infoResrcPrvd = ''
                this.standardDataById = data.data
              }
            })
          },
        },
        {
          label: '引用标准',
          prop: 'stdDocId',
          span: 24,
          type: 'select',
          dicData: this.standardDataById,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
          change: (val)=>{
            if(val.value){
              getStandardInfoById({id: val.value}).then(({data})=>{
                if(data.code === 0){
                  this.form.infoResrcPrvd = data.data.stdDocPrvd.label
                }
              })
            }else{
              this.form.infoResrcPrvd = ''
            }
          },
        },
        {
          label: '信息资源提供方',
          prop: 'infoResrcPrvd',
          span: 24,
          maxlength: 100,
          disabled: true,
          placeholder: " ",
        },
      ]
    },
    detailOption () {
      return {
        option: [
          {
            column: this.column,
          },
        ],
      }
    },
    editOption () {
      return {
        menuBtn: false,
        labelWidth: '180',
        labelPosition: 'right',
        column: this.column,
      }
    },
    searchOption () {
      return [
        { label: '信息资源中文名称', prop: 'infoResrcChnNm'},
        { label: '信息资源提供方', prop: 'infoResrcPrvd' },
        { label: '信息资源分类', prop: 'infoResrcClsId', type: 'select', data: this.fieldClassifyData },
        { label: '引用标准', prop: 'stdDocId', type: 'select', data: this.standardData },
      ]
    },
    tableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: true,
        menuWidth: '180px',
        indexLabel: '序号',
        index: false,
        align: 'center',
        border: false,
        column: [
          { label: '信息资源中文名称', prop: 'infoResrcChnNm'},
          { label: '信息资源提供方', prop: 'infoResrcPrvd' },
          { label: '信息资源分类', prop: 'infoResrcClsId', type: 'dic', dicData: this.fieldClassifyData },
        ],
      }
    },
  },
  created () {
    getStandardData().then((data) => {
      this.standardData = data.data
    })
    getFieldClassifyData().then((data) => {
      this.fieldClassifyData = data.data
    })
  },
}
