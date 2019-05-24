import {
  getDic,
  getDept,
} from '@/util/dic'

const speacs = (rule, value, callback)=>{
    let reg = /(^\s+)|(\s+$)/g
    if(reg.test(value)){
      callback('请去除空格')
    }else{
      callback()
    }
}

export default {
  data () {
    return {
      updateSpan: 12,
      sysList: [],
    }
  },
  computed: {
    informationMainFormOption () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '信息资源名称',
            prop: 'name',
            span: this.updateSpan,
            rules: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: speacs, trigger: 'blur' },
              { validator: this.validateinformationName, trigger: 'blur' },
            ],
            maxlength: 50,
          }, {
            label: '所属目录资源分类',
            prop: 'deptId',
            span: this.updateSpan,
            type: 'select',
            visdiplay: this.status === 'detail',
            dicData: getDept(),
          }, {
            label: '信息资源代码',
            prop: 'number',
            span: this.updateSpan,
            visdiplay: false,
            maxlength: 50,
            rules: [
              { validator: speacs, trigger: 'blur' },
            ],
          }, {
            label: '信息资源摘要',
            prop: 'summ',
            span: this.updateSpan,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' },{ validator: speacs, trigger: 'blur' }],
            maxlength: 50,
          }, {
            label: '所属系统名称',
            prop: 'surveyIdList',
            span: this.updateSpan,
            type: 'select',
            multiple: true,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: this.sysList,
          }, {
            label: '信息资源格式',
            prop: 'fmtList',
            type: 'cascader',
            span: this.updateSpan,
            rules: [{ required: true, message: '不能为空', trigger: 'change' },{ validator: speacs, trigger: 'blur' }],
            dicData: getDic('FMT'),
          }, {
            label: '主题分类',
            prop: 'topicTypeList',
            type: 'select',
            span: this.updateSpan,
            multiple: true,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: getDic('TOPIC_TYPE'),
          }, {
            label: '重点领域分类',
            prop: 'areaTypeList',
            type: 'select',
            span: this.updateSpan,
            multiple: true,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: getDic('AREA_TYPE'),
          }, {
            label: '更新周期',
            prop: 'updCycle',
            span: this.updateSpan,
            type: 'select',
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: getDic('UPD_CYCLE'),
          }, {
            label: '共享类型',
            prop: 'sharingType',
            span: this.updateSpan,
            type: 'select',
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: getDic('SHARING_TYPE'),
          }, {
            label: '共享条件',
            prop: 'sharingCond',
            span: this.updateSpan,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' },{ validator: speacs, trigger: 'blur' }],
            maxlength: 10,
          }, {
            label: '共享方式',
            prop: 'sharingModeList',
            span: this.updateSpan,
            type: 'cascader',
            rules: [{ required: true, message: '不能为空', trigger: 'change' },{ validator: speacs, trigger: 'blur' }],
            dicData: getDic('SHARING_MODE'),
            maxlength: 50,
          }, {
            label: '是否向全社会开放',
            prop: 'isOpen',
            span: this.updateSpan,
            type: 'select',
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: getDic('IS_NOT'),
            disabled: this.isOpenDisabled,
          }, {
            label: '开放条件',
            prop: 'openCond',
            span: this.updateSpan,
            visdiplay: this.openCondShow,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' },{ validator: speacs, trigger: 'blur' }],
            // show: this.temp.isOpen === 1,
          }, {
            label: '关联资源代码',
            prop: 'rescode',
            span: this.updateSpan,
            maxlength: 50,
            rules: [
              { validator: speacs, trigger: 'blur' },
            ],
          }, {
            label: '发布日期',
            prop: 'createTime',
            span: this.updateSpan,
            readonly: true,
            visdiplay: false,
            rules: [
              { validator: speacs, trigger: 'blur' },
            ],
          },
        ],
      }
    },
  },
  methosd: {

  },
}