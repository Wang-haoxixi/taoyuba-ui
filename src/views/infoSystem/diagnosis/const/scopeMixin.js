import {
  getDic,
} from '@/util/dic'
export default {
  data () {
    return {
      updateSpan: 12,
      sysList: [],
      btnLoading: false,
      isOpenDisabled: false,
      openCondShow: false,
      infoDialogStatus: 'detail',
      dialog: {
        detail: {
          title: '详情',
          status: 'detail',
        },
        update: {
          title: '编辑',
          status: 'update',
        },
        create: {
          title: '新增',
          status: 'create',
        },
      },
    }
  },
  computed: {
    tableOption () {
      return {
        page: false,
        menu: false,
        index: false,
        header: false,
        selection: false,
        column: [
          {label:'条件名称', prop:'conditionName'},
          {label:'字段选择', prop:'optionField', type: 'dic', dicData: getDic('DIAGNOSE_OPTION_FIELD')},
          {label:'条件选择', prop:'selectionCondition', type: 'dic', dicData: getDic('DIAGNOSE_SELECTION_CONDITION')},
          {label:'数值', prop:'value',solt:true},
          {label: '操作', prop: 'menu', solt: true },
        ],
      }
    },
    diagnosisMainFormOption () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '诊断主题',
            prop: 'diagnosticTheme',
            span: 24,
            rules: [
              { required: true, message: '不能为空', trigger: 'blur' },
            ],
            maxlength: 50,
          },
          {
            label: '详细条件',
            prop: 'detailedValueCn',
            type: 'textarea',
            span: 24,
            maxlength: 500,
            placeholder: ' ',
            visdiplay: this.status !== 'create' ? true : false,
            disabled: true,
          },
        ],
      }
    },
    diagnosisMainFormDetailOption () {
      return {
        option: [
          {
            column: this.diagnosisMainFormOption.column,
          },
        ],
      }
    },
    btnGroup () {
      return [
        {label: '保存', type: 'primary', fn: 'handleSubmit', loading: this.btnLoading},
        {label: '取消', type: 'default', fn: 'handleCancel'},
      ]
    },
  },
  methods: {

  },
}
