import {getDept,getDic} from '@/util/dic'
import { validMaterialName } from '@/api/cbs/application_form'
function checkMaterialName  (rule, value, callback) {
  // let _this = this
  // console.log("id",this.form.id)
  if (!value) {
    return callback(new Error('表名称不能为空'))
  }
  validMaterialName(value,this.form.id).then(({data}) => {
    if (data === 1) {
      callback(new Error('该表名已在数据库中已存在，无需新增。'))
    } else {
      callback()
    }
  })
}


export default {
  data () {
    return {
      form: {
        id: '',
        deptId: '',
        materialName: '',
        itemInformation: '',
        materialType: 1,
        fileList: [],
        itemList: [],
      },
      showItemInformation: true,
    }
  },
  methods: {
    initForm () {
      this.form = {
        id: '',
        deptId: '',
        materialName: '',
        itemInformation: '',
        materialType: 1,
        fileList: [],
        itemList: [],
      }
      this.tableList = []
      this.showItemInformation = true
    },
  },
  watch : {
    'form.fileList': {
      handler (){
        this.$refs['form'] ? this.$refs['form'].validate(['fileList']): ''
      },
    },
  },
  computed: {
    column () {
      return [
        {
          label: '申请表名称',
          prop: 'materialName',
          span: 24,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }, {
            validator: checkMaterialName.bind(this),
            trigger: 'blur',
          }],
        }, {
          label: '实施机构',
          prop: 'deptId',
          span: 24,
          type: 'select',
          placeholder: '请选择该事项的实施机构',
          dicData: getDept(),
          rules: [
            {required: true, message: '不能为空', trigger: 'change'},
          ],
        }, {
          label: '附件列表',
          prop: 'fileList',
          span: 24,
          formsolt : true,
          slot: true,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
        },
        {
          label: '信息项',
          prop: 'itemInformation',
          span: 24,
          formsolt : true,
          slot: true,
        },
      ]
    },
    detailOption () {
      return {
        option: [
          {
            column: [
              {
                label: '申请表名称',
                prop: 'materialName',
                span: 24,
                rules: [{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }],
              }, {
                label: '实施机构',
                prop: 'deptId',
                span: 24,
                type: 'select',
                placeholder: '请选择该事项的实施机构',
                dicData: getDept(),
                rules: [
                  {required: true, message: '不能为空', trigger: 'change'},
                ],
              }, {
                label: '附件列表',
                prop: 'fileList',
                span: 24,
                formsolt : true,
                slot: true,
                rules: [{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }],
              },
            ],
          },
        ],
      }
    },
    infoColumn () {
      return [
        { label: '信息项名称', span:24 , prop: 'itemName', rules: [{required: true, message: '不能为空', trigger: 'blur'}] },
        { label: '数据类型', span:24 , prop: 'dataTypes', type: 'cascader', dicData: getDic('MAT_DATA_TYPE'), rules: [{required: true, message: '不能为空', trigger: 'change'}] },
        { label: '数据长度', span:12 , prop: 'dataLen', type: 'number', minRows: 0 , maxRows:9999},
        { label: '共享类型', span:24 , prop: 'shareProp', type: 'select', dicData: getDic('MAT_SHARE_PROPERTY'), rules: [{required: true, message: '不能为空', trigger: 'change'}] },
        { label: '开放属性', span:24 , prop: 'openProp', type: 'select', dicData: getDic('MAT_OPEN_PROPERTY'), rules: [{required: true, message: '不能为空', trigger: 'change'}] },
        { label: '说明', span:24 , prop: 'explain', type: 'textarea' },
        // { label: '说明', prop: 'desc' },
      ]
    },
    infoTableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: false,
        menuWidth: '180',
        index: false,
        align: 'center',
        page: true,
        border: false,
        height: '300',
        column: this.infoColumn,
      }
    },
    infoDetailTableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: false,
        menuWidth: '180',
        index: false,
        align: 'center',
        page: false,
        border: false,
        height: '300',
        column: this.infoColumn,
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
    infoEditOption () {
      return {
        menuBtn: false,
        labelWidth: '180',
        labelPosition: 'right',
        column: [
          { label: '信息项名称', span:24 , prop: 'itemName', rules: [{required: true, message: '不能为空', trigger: 'blur'}] },
          { label: '数据类型', span:24 , prop: 'dataTypes', type: 'cascader', dicData: getDic('MAT_DATA_TYPE'), rules: [{required: true, message: '不能为空', trigger: 'change'}] },
          { label: '数据长度', span:12 , prop: 'dataLen', type: 'number', minRows: 0,maxRows: 9999 },
          { label: '共享类型', span:24 , prop: 'shareProp', type: 'select', dicData: getDic('MAT_SHARE_PROPERTY'), rules: [{required: true, message: '不能为空', trigger: 'change'}] },
          { label: '开放属性', span:24 , prop: 'openProp', type: 'select', dicData: getDic('MAT_OPEN_PROPERTY'), rules: [{required: true, message: '不能为空', trigger: 'change'}] },
          { label: '数据值', span:24 , prop: 'dataValue', visdiplay: this.showDataValue, placeholder: '请输入数据值选项，用英文\',\'隔开' },
          { label: '说明', span:24 , prop: 'explain', type: 'textarea' },
          // { label: '说明', prop: 'desc' },
        ],
      }
    },
  },
}
