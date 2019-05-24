import {getFieldClassifyData} from '../../const/index'
import {getDic} from '@/util/dic'
export default {
  data () {
    return {
      form: {
        id: '',
        stdDocNo: '',
        stdDocNm: '',
        stdDocPrvd: '',
        stdDocFileList: [],
        dmnClsId: '',
        updTm: '',
      },
      fieldClassifyData: [],
    }
  },
  computed: {
    column () {
      return [
        {
          label: '标准文件号',
          prop: 'stdDocNo',
          span: 24,
          maxlength: 50,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '标准文件名称',
          prop: 'stdDocNm',
          span: 24,
          maxlength: 50,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '标准文件提供方',
          prop: 'stdDocPrvd',
          span: 24,
          maxlength: 100,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '附件上传',
          prop: 'stdDocFileList',
          type: 'upload',
          loadText: '附件上传中，请稍等',
          span: 24,
          limit: 1,
          propsHttp: {
            name: 'label',
            url: 'value',
          },
          props: {
            label: 'label',
            value: 'value',
          },
          tip: '格式只支持pdf/word',
          // tip: '只能上传jpg/png文件，且不超过500kb',
          action: '/datamodule/dnastddoc/upload',
          slot: true,
        },
        {
          label: '领域分类',
          prop: 'dmnClsId',
          span: 24,
          type: 'select',
          dicData: this.fieldClassifyData,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
        },
        {
          label: '上传时间',
          span: 24,
          prop: 'updTm',
          type: "datetime",
          valueFormat: "yyyy-MM-dd",
          visdiplay: false,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
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
        { label: '标准文件名称', prop: 'stdDocNm', type: 'input', placeholder: '请输入标准文件名称' },
        { label: '标准文件提供方', prop: 'stdDocPrvd', type: 'input', placeholder: '请输入标准文件提供方名称' },
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
          { label: '标准文件号', prop: 'stdDocNo' },
          { label: '标准文件名称', prop: 'stdDocNm' },
          { label: '标准文件提供方', prop: 'stdDocPrvd' },
          { label: '状态', prop: 'state', type: 'dic', dicData: getDic('REL_STATE') },
        ],
      }
    },
  },
  created () {
    getFieldClassifyData().then((data) => {
      this.fieldClassifyData = data.data
    })
  },
}
