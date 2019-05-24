import { getDic } from '@/util/dic'

export default {
  data () {
    return {
      ntwkState: false,
      useUserState: false,
      dataGenState: false,
      form: {},
    }
  },
  watch: {
    // 网络环境 => 业务专网 => 4
    'form.ntwkList': {
      handler (newVal) {
        if (newVal) {
          let state = false
          for (let item of newVal) {
            if (item == 4) {
              state = true
            }
          }
          this.ntwkState = state
          !state ? this.form.businessNtwk = '' : ''
          this.$nextTick(()=>{
            this.$refs['form'].clearValidate()
          })
        }
      },
    },
    // 使用范围-用户 => 其他 => 6
    'form.useUserList': {
      handler (newVal) {
        if (newVal) {
          let state = false
          for (let item of newVal) {
            if (item == 6) {
              state = true
            }
          }
          !state ? this.form.userElse = '' : ''
          this.useUserState = state
          this.$nextTick(()=>{
            this.$refs['form'].clearValidate()
          })
        }
      },
    },
    // 数据产生方式 => 其他 => 5
    'form.dataGenList': {
      handler (newVal) {
        if (newVal) {
          let state = false
          for (let item of newVal) {
            if (item == 5) {
              state = true
            }
          }
          !state ? this.form.genElse = '' : ''
          this.dataGenState = state
          this.$nextTick(()=>{
            this.$refs['form'].clearValidate()
          })
        }
      },
    },
  },
  computed: {
    formCurd () {
      let dateReg = /^((((19|20)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((19|20)\d{2})-(0?[469]|11)-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-(0?[1-9]|[12]\d)))$/
      let checkDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'))
        } else {
          if (value === '无') {
            callback()
          } else if (!dateReg.test(value)) {
            callback(new Error('时间格式不正确'))
          } else {
            callback()
          }
        }
      }
      // 预算涉及的年度起
      // let checkBdgtStrtminTime = (rule, value, callback) => {
      //   if (!value) {
      //     callback(new Error('不能为空'))
      //   } else {
      //     if (!(this.form.bdgtDeadline === '无' || this.form.bdgtDeadline === '' || (dateReg.test(value) && dateReg.test(this.form.bdgtDeadline)))) {
      //       let resultValue = value.split('/')
      //       let resultData = this.form.bdgtDeadline('/')
      //       let status = false
      //       for (let i = 0, len = resultValue.length; i < len; i++) {
      //         if (+resultValue[i] > resultData[i]) {
      //           status = true
      //           break
      //         }
      //       }
      //       if (status) {
      //         callback(new Error('不能比预算涉及的年度起比预算涉及的年度止大'))
      //       } else {
      //         callback()
      //       }
      //     } else {
      //       callback()
      //     }

      //   }
      // }
      // // 预算涉及的年度止
      // let checBdgtDeadlineMaxTime = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('不能为空'))
      //   } else {

      //   }
      // }

      let validateEmptySpace = (rule, value, callback)=>{
        let reg = /(^\s+)|(\s+$)/g
        if(reg.test(value)){
          callback('请去除空格')
        }else{
          callback()
        }
      }
      return [
        {
          label: '信息系统名称',
          prop: 'sysDsgt',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength: 20,
        }, {
          label: '系统功能、服务简介',
          prop: 'sysFctn',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength: 20,
        }, {
          label: '项目立项审批部门',
          prop: 'apvlDept',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: '项目立项审批日期',
          prop: 'apvlDate',
          // type: 'date',
          span: 12,
          placeholder: '时间格式为2011-01-01或无',
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkDate, trigger: 'blur' }],
          maxlength:20,
          // valueFormat:"yyyy-MM-dd",
        }, {
          label: '预算项目名称',
          prop: 'bdgtDsgt',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: '预算涉及的年度起',
          prop: 'bdgtStrt',
          // type: 'date',
          span: 12,
          placeholder: '时间格式为2011-01-01或无',
          rules: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: checkDate, trigger: 'blur' },
            // { validator: checkBdgtStrtminTime, trigger: 'blur' },
          ],
          maxlength:20,
          // valueFormat:"yyyy-MM-dd",
        }, {
          label: '预算涉及的年度止',
          prop: 'bdgtDeadline',
          // type: 'date',
          span: 12,
          placeholder: '时间格式为2011-01-01或无',
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkDate, trigger: 'blur' }],
          maxlength:20,
          // valueFormat:"yyyy-MM-dd",
        }, {
          label: '是否为僵尸系统',
          prop: 'uselessSys',
          type: 'select',
          dicData: getDic('IS_NOT'),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: '系统开始使用日期',
          prop: 'sysStart',
          // type: 'date',
          span: 12,
          placeholder: '时间格式为2011-01-01或无',
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkDate, trigger: 'blur' }],
          maxlength:20,
          // valueFormat:"yyyy-MM-dd",
        }, {
          label: '系统停止使用日期',
          prop: 'sysExpr',
          // type: 'date',
          span: 12,
          placeholder: '时间格式为2011-01-01或无',
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: checkDate, trigger: 'blur' }],
          maxlength:20,
          // valueFormat:"yyyy-MM-dd",
        }, {
          label: '系统状态',
          prop: 'sysStateList',
          type: 'select',
          multiple: true,
          dicData: getDic('SYSTEM_STATUS'),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: '建设资金来源',
          prop: 'fundsSourcesList',
          type: 'select',
          multiple: true,
          dicData: getDic('SOURCE_OF_CONSTRUCTION'),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: '归口业务处室',
          prop: 'servOfc',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: '处室联系人',
          prop: 'cntct',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: '处室联系方式',
          prop: 'cntctInfo',
          span: 12,
          rules: [
            { required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' },
          ],
          maxlength:20,
        }, {
          label: '系统部署情况',
          prop: 'sysDeployList',
          type: 'select',
          multiple: true,
          dicData: getDic('SYSTEM_DEPLOYMENT'),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "网络环境",
          prop: "ntwkList",
          type: "select",
          multiple: true,
          dicData: getDic("NETWORK_ENVIRONMENT"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
          // ntwkState
          label: "业务专网地址",
          prop: "businessNtwk",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          visdiplay: this.ntwkState,
        },
        {
          label: "使用范围-区域",
          prop: "useRangeList",
          type: "select",
          multiple: true,
          dicData: getDic("SCOPE_OF_USE_AREA"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "使用范围-用户",
          prop: "useUserList",
          type: "select",
          multiple: true,
          dicData: getDic("USER_SCOPE_USER"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
          // useUserState
          label: "其他用户名称",
          prop: "userElse",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          visdiplay: this.useUserState,
          maxlength:20,
        },
        {
          label: '系统使用频率（上年度累计访问数）',
          prop: 'sysUsed',
          span: 12,
          labelWidth: '250',
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: '使用频率测算依据',
          prop: 'usedBasis',
          type: 'select',
          dicData: getDic('BASIS_FOR_USAGE_FREQUENCY'),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: '数据产生方式',
          prop: "dataGenList",
          type: "select",
          multiple: true,
          dicData: getDic("DATA_GENERATION_MODE"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
          // dataGenState
          label: '其他产生方式',
          prop: "genElse",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          visdiplay: this.dataGenState,
          maxlength:20,
        },
        {
          label: "数据更新频率",
          prop: "dataUpd",
          type: "select",
          dicData: getDic("DATA_UPDATE_FREQUENCY"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "数据库格式",
          prop: "dbTypeList",
          type: "select",
          multiple: true,
          dicData: getDic("DATABASE_FORMAT"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: '数据规模（G）',
          prop: "dataSize",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: "数据总量（条）",
          prop: "dataAggr",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: "数据增长情况（M）",
          prop: "dataGrw",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: '存量数据年限',
          prop: 'dataStock',
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: "数据有效期",
          prop: "dataValidity",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: "是否有数据字典",
          prop: "dataDict",
          type: "select",
          dicData: getDic("IS_DATA_DICT"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "是否在用其它部门数据",
          prop: "callOtherDept",
          type: "select",
          dicData: getDic("USING_DATA_OTHER_DEPT"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "系统数据共享范围",
          prop: "dataShareScopeList",
          type: "select",
          multiple: true,
          dicData: getDic("SYSTEM_DATA_SHARING_SCOPE"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "等级保护",
          prop: "levelProtect",
          type: "select",
          dicData: getDic("GRADE_PROTECTION"),
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        }, {
          label: "系统开发厂商",
          prop: "sysDev",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: "厂商联系人",
          prop: "vendCntct",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        }, {
          label: "厂商联系方式",
          prop: "mfrCntct",
          span: 12,
          rules: [{ required: true, message: '不能为空', trigger: 'blur' }, { validator: validateEmptySpace, trigger: 'blur' }],
          maxlength:20,
        },
      ]
    },
  },
}
