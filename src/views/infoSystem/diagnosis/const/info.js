import {
  getDic,
} from '@/util/dic'
import { formCurd } from '../../systemRegister/const/fields'

export default {
  data () {
    return {
      conditionDisabled: false,
      optionFieldType: 'input',
      optionFieldDic: [],
      dialogStatus: {
        update: {
          title: '编辑',
        },
        detail: {
          title: '详情',
        },
        create: {
          title: '新增',
        },
      },
    }
  },
  computed: {
    diagnosisFormOption () {
      return {
        menuBtn: false,
        labelWidth: '160',
        labelPosition: 'right',
        column: [
          {
            label: '条件名称',
            prop: 'conditionName',
            span: 12,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }],
            maxlength: 50,
          }, {
            label: '字段选择',
            prop: 'optionField',
            type: 'select',
            span: 12,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            dicData: getDic('DIAGNOSE_OPTION_FIELD'),
            change: (val) => {
              let splitVal = val.value.split('-')
              if(splitVal.length>1){
                // optionFieldType
                this.optionFieldDic = []
                this.optionFieldType = 'input'
                this.conditionDisabled = true
                this.$set(this.form,'selectionCondition','=')
                this.$nextTick(()=>{
                  this.optionFieldType = 'select'
                  this.optionFieldDic = [...getDic(splitVal[1])]
                })
              }else{
                this.conditionDisabled = false
                this.optionFieldType = 'input'
                this.optionFieldDic = []
              }
              console.log(val,this.optionFieldDic,this.optionFieldType)
              this.$set(this.form,'value','')
            },
          }, {
            label: '条件选择',
            prop: 'selectionCondition',
            span: 12,
            type: 'select',
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            disabled: this.conditionDisabled,
            dicData: getDic('DIAGNOSE_SELECTION_CONDITION'),
          },
          {
            // optionFieldType: 'input',
            // optionFieldDic: [],

            label: '数值',
            prop: 'value',
            span: 12,
            maxlength: 50,
            type: this.optionFieldType,
            dicData: this.optionFieldDic,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }],
            change: (val) => {
              console.log(val)
            },
          },
        ],
      }
    },
    diagnosisResultDetailOption () {
      return {
        option: [
          {
            column: formCurd,
          },
        ],
      }
    },
    diagnosisFormDetailOption () {
      return {
        option: [
          {
            column: this.diagnosisFormOption.column,
          },
        ],
      }
    },
  },
  watch: {

    // 'form.optionField': {
    //   deep: true,
    //   handler (val) {
    //     let splitVal = val.split('-')
    //     if(splitVal.length>1){
    //       // optionFieldType
    //       this.optionFieldType = 'select'
    //       // this.optionFieldDic = getDic(splitVal[1])
    //     }
    //     console.log("结果",val,val.split('-').length)
    //   },
    // },
  },
}
