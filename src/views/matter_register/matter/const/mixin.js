import {getDept, getDic} from '@/util/dic'
export default {
  data () {
    return {
      form: {
        id: '',
        deptId: '',
        type: [],
        name: '',
        code: '',
        isChild: 1,
        level: '',
      },
      maxlength: 5,
      levelChildName: '',
      typeDisable: false,
      showIsChild: true,
    }
  },
  methods: {
    initForm () {
      this.form = {
        id: '',
        deptId: '',
        type: [],
        name: '',
        code: '',
        isChild: 1,
        level: '',
      }
      //typeDisable: false,
      //showIsChild: true,
      this.maxlength = 5,
      this.typeDisable = false
      this.showIsChild = true
      this.levelChildName = ''
    },
  },
  computed: {
    column () {
      return [
        {
          label: '实施机构',
          prop: 'deptId',
          span: 24,
          type: 'select',
          placeholder: '请选择该事项的实施机构',
          dicData: getDept(),
          rules: [
            {required: true, message: '不能为空', trigger: 'change'},
          ],
        },
        {
          label: '事项类别',
          prop: 'type',
          span: 24,
          type: 'cascader',
          disabled: this.typeDisable,
          placeholder: '请选择事项类别',
          dicData: getDic('MAT_ITEM_TYPE'),
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
        },
        {
          label: '事项名称',
          prop: 'name',
          span: 24,
          placeholder: '新增事项的名称',
          maxlength:50,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '事项代码',
          prop: 'code',
          span: 24,
          placeholder: '请输入事项代码',
          maxlength: 5,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },{
            max: this.maxlength,
            min: this.maxlength,
            message: `长度在 ${this.maxlength} 个字符`,
            trigger: 'blur',
          }],
        },
        {
          label: `是否有${this.levelChildName}`,
          prop: 'isChild',
          span: 24,
          type: 'switch',
          visdiplay: this.showIsChild,
          dicData: [
            {label: '是', value: 2},
            {label: '否', value: 1},
          ],
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
  },
}
