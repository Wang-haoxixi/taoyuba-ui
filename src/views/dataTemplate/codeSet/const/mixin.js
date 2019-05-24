import {getStandardData} from '../../const/index'
export default {
  data () {
    return {
      form: {
        id: '',
        cdCollNm: '',
        cdRule: '',
        stdDocId: '',
        remrk: '',
        infoItemList: [],
      },
      standardData: [],
    }
  },
  computed: {
    column () {
      return [
        {
          label: '代码集名称',
          prop: 'cdCollNm',
          span: 24,
          maxlength: 50,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '编码规则',
          prop: 'cdRule',
          span: 24,
          maxlength: 200,
          type: 'textarea',
        },
        {
          label: '引用标准',
          prop: 'stdDocId',
          span: 24,
          type: 'select',
          dicData: this.standardData,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
        },
        {
          label: '备注',
          prop: 'remrk',
          maxlength: 200,
          span: 24,
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
        labelWidth: 100,
        column: this.column,
      }
    },
    searchOption () {
      return [
        { label: '代码集名称', prop: 'cdCollNm', type: 'input', placeholder: '请输入代码集名称' },
        { label: '引用标准', prop: 'stdDocId', type: 'select', placeholder: '请输入标准文件名称', data: this.standardData},
      ]
    },
    tableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: true,
        menuWidth: '180',
        indexLabel: '序号',
        index: false,
        align: 'center',
        border: false,
        column: [
          { label: '代码集名称', prop: 'cdCollNm' },
          { label: '引用标准', prop: 'stdDocIdForShow', type: 'dic', dicData: [] },
        ],
      }
    },
  },
  created () {
    getStandardData().then((data) => {
      this.standardData = data.data
    })
  },
}
