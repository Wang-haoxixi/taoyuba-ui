import { getDic} from '@/util/dic'
export default {
  data () {
    return {
      form: {
        id: '',
        materialType: '',
        materialName: '',
        materialIder: '',
        materialSpec: '',
        origNum: '',
        copyNum: '',
        sourceChannel: '',
        isMaterialSamp: '',
        isDemoSamp: '',
        notes: '',
        材料样本: '',
        示范文本: '',
      },
      showMaterial: false,
      showDemonstration: false,
      disabledMaterialIder: false,
    }
  },
  methods: {
    initForm () {
      this.form = {
        id: '',
        materialType: '',
        materialName: '',
        materialIder: '',
        materialSpec: '',
        origNum: '',
        copyNum: '',
        sourceChannel: '',
        isMaterialSamp: '',
        isDemoSamp: '',
        notes: '',
        材料样本: '',
        示范文本: '',
      }
      this.showMaterial= false
      this.showDemonstration=false
    },
  },
  watch: {
    'form.isMaterialSamp': {
      deep: true,
      handler (val) {
        if(val === 2){
          this.showMaterial = true
        }else {
          this.showMaterial = false
        }
      },
    },
    'form.isDemoSamp': {
      deep: true,
      handler (val) {
        if(val === 2){
          this.showDemonstration = true
        }else {
          this.showDemonstration = false
        }
      },
    },
  },
  computed: {
    materialTypeMap () {
      const allMaterialType = getDic("MAT_MATERIAL_FAMILY")
      if (!allMaterialType.length) {
        return []
      } else {
        return allMaterialType.filter(m => m.label !== '表格')
      }
    },
    column () {
      return [
        {
          label: '材料类型',
          prop: 'materialType',
          span: 24,
          type: 'select',
          placeholder: '请选择该事项的实施机构',
          dicData: this.materialTypeMap,
          rules: [
            {required: true, message: '不能为空', trigger: 'change'},
          ],
        },
        {
          label: '材料名称',
          prop: 'materialName',
          span: 24,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '材料标识号',
          prop: 'materialIder',
          span: 24,
          disabled: this.disabledMaterialIder,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '材料规格',
          prop: 'materialSpec',
          type: 'select',
          dicData: getDic('MAT_MATERIAL_SPECIFICATION'),
          span: 24,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }],
        },
        {
          label: '原件份数',
          prop: 'origNum',
          type: 'number',
          span: 12,
          minRows:0,
        },
        {
          label: '复印件份数',
          type: 'number',
          prop: 'copyNum',
          span: 12,
          minRows:0,
        },
        {
          label: '来源渠道',
          prop: 'sourceChannel',
          span: 24,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: `材料样本`,
          prop: 'isMaterialSamp',
          span: 24,
          type: 'switch',
          dicData: [
            {label: '有', value: 2},
            {label: '无', value: 1},
          ],
        },
        {
          label: '材料样本',
          prop: '材料样本',
          span: 24,
          visdiplay: this.showMaterial,
          formsolt :true,
          slot: true,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: `示范文本`,
          prop: 'isDemoSamp',
          span: 24,
          type: 'switch',
          dicData: [
            {label: '有', value: 2},
            {label: '无', value: 1},
          ],
        },
        {
          label: '示范文本',
          prop: '示范文本',
          span: 24,
          visdiplay: this.showDemonstration,
          formsolt :true,
          slot: true,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        {
          label: '填报须知',
          prop: 'notes',
          type: 'textarea',
          span: 24,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
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
  },
}
