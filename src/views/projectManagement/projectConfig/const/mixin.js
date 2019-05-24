import {
    getDic,
} from '@/util/dic'

import { checkField } from '@/api/projectManagement/projectConfig'


export default {
  data () {
    return {
      isMultiSelect: false,
    }
  },
  methods: {
    //字段重复校验
    checkConfigField  (rule, value, callback) {
      var params = {id: this.form.id,configField: value}
      checkField(params).then(({data})=> {
        if (data.data === "false") {
          callback(new Error('字段已重复,请换一个'))
        } else {
          callback()
        }
      })
    }, 
  },
  computed: {
    projectConfigFormOption () {
      return {
        menuBtn: false,
        labelWidth: '160',
        labelPosition: 'right',
        column: [
          {
            label: '名称',
            prop: 'configName',
            span: 24,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }],
          }, {
            label: '字段',
            prop: 'configField',
            span: 24,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }, {
              validator: this.checkConfigField,
              trigger: 'blur',
            }],
          }, {
            label: '说明文字',
            prop: 'configNote',
            span: 24,
          }, {
            label: '是否必填',
            prop: 'isRequired',
            type: 'select',
            dicData: getDic('IS_NOT'),
            span: 24,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
          }, {
            label: '模块',
            prop: 'moduleType',
            type: 'select',
            dicData: getDic('PROJECT_MODULE_TYPE'),
            span: 24,
          }, {
            label: '展示模块',
            prop: 'showModuleType',
            type: 'select',
            visdiplay: this.showModule,
            dicData: getDic('PROJECT_SHOW_MODULE_TYPE'),
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            span: 24,
          }, {
            label: '输入框类型',
            prop: 'inputBoxType',
            type: 'select',
            filterable: true,
            dicData: getDic('INPUT_BOX_TYPE'),
            span: 24,
            rules: [{
                required: true,
                message: '不能为空',
                trigger: 'change',
            }],
          }, {
            label: '上传地址',
            prop: 'action',
            visdiplay: this.showAction,
            span: 24,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }],
          }, {
            label: '输入框长度',
            prop: 'inputBoxLength',
            type: 'select',
            dicData: getDic('INPUT_BOX_LENGTH'),
            span: 24,
            rules: [{
                required: true,
                message: '不能为空',
                trigger: 'change',
            }],
          }, {
            label: '输入框取值',
            prop: 'inputBoxValue',
            visdiplay: this.showBoxValue,
            type: 'select',
            filterable: true,
            dicData: this.dictSelect,
            span: 24,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
          }, {
            label: '是否为显示列',
            prop: 'isShowColumn',
            type: 'select',
            dicData: getDic('IS_NOT'),
            span: 24,
            rules: [{
                required: true,
                message: '不能为空',
                trigger: 'change',
            }],
          }, {
            label: '搜索框类型',
            prop: 'searchBoxType',
            type: 'select',
            dicData: getDic('SEARCH_BOX_TYPE'),
            span: 24,
            rules: [{
                required: true,
                message: '不能为空',
                trigger: 'change',
            }],
          }, {
            label: '是否多选',
            prop: 'isMultiSelect',
            type: 'select',
            visdiplay: this.isMultiSelect,
            dicData: getDic('IS_NOT'),
            span: 24,
          }, {
            label: '排序',
            prop: 'sort',
            span: 24,
            rules: [{
                required: true,
                message: '不能为空',
                trigger: 'blur',
            }],
          },
        ],
      }  
    },
  },  
}        