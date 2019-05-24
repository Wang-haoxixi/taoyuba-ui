import { getDept, getDic } from '@/util/dic'

const attitude = [{value: 2, label: '待确认'}, {value: 1, label: '已确认'}, {value: 0, label: '拒绝'}]
const status = [
  {value: 0, label: '待确认'},
  {value: 1, label: '已确认'},
  {value: 2, label: '拒绝'},
  {value: 3, label: '撤回审核'},
  {value: 4, label: '已撤回'},
]

export default {
  name: 'formOption',
  data () {},
  computed: {
    tabType () {
      return this.formData.supDemandVO ? 'material' : 'item'
    },
    detailHeadOption () {
      let list = [
        {
          label: '需求部门',
          prop: 'demandDeptId',
          span: 24,
          type: 'select',
          dicData: getDept(),
        },
        {
          label: '事项名称',
          prop: 'matName',
          span: 24,
        },
        {
          label: '事项编码',
          prop: 'matCode',
          span: 12,
        },
        {
          label: '事项类型',
          prop: 'matType',
          span: 12,
          type: 'select',
          dicData: getDic('SUPPLY_ITEM_TYPE'),
        },
        {
          label: '年平均办理量',
          prop: 'anlAvgVol',
          span: 24,
        },
        {
          label: '申请理由',
          prop: 'applyReason',
          span: 24,
        },
        {
          label: '所需材料',
          prop: 'materialName',
          span: 24,
        },
        {
          label: '材料类型',
          prop: 'materialType',
          span: 8,
          type: 'select',
          dicData: getDic('SUPPLU_MATERIAL_TYPE'),
        },
        {
          label: '来源方式',
          prop: 'sourceMethod',
          span: 8,
          type: 'select',
          dicData: getDic('SUPPLY_SOURCE_MODE'),
        },
        {
          label: '法律依据',
          prop: 'legalBasis',
          span: 8,
          type: 'select',
          dicData: getDic('SUPPLY_LEGAL_BASIS'),
        },
        {
          label: '所需信息项',
          prop: 'itemName',
          span: 24,
        },
        {
          label: '当前需求状态',
          prop: 'status',
          type: 'select',
          dicData: status,
          span: 24,
        },
      ]
      return {
        column: list,
      }
    },
    detailFirstOption () {
      let list = [
        {
          label: '责任部门',
          prop: 'FDeptId',
          span: 12,
          type: 'select',
          dicData: getDept(),
        },{
          label: '认责情况',
          prop: 'FAttitude',
          span: 12,
          type: 'select',
          dicData: attitude,
        },
      ]
      if (this.formData.flowVOs.length > 0 && this.formData.flowVOs[0].attitude === 0) {
        list.push({
          label: '备注',
          prop: 'FComment',
          type:'textarea',
          span: 24,
        })
      }
      return {
        label: '初次认责情况',
        prop: 'ccrz',
        column: list,
      }
    },
    detailSecondOption () {
      let list = [
        {
          label: '责任部门',
          prop: 'SDeptId',
          span: 12,
          type: 'select',
          dicData: getDept(),
        }, {
          label: '认责情况',
          prop: 'SAttitude',
          span: 12,
          type: 'select',
          dicData: attitude,
        },
      ]
      if (this.formData.flowVOs.length > 1 && this.formData.flowVOs[1].attitude === 0) {
        list.push({
          label: '备注',
          prop: 'SComment',
          type:'textarea',
          span: 24,
        })
      }
      return {
        label: '二次认责情况',
        prop: 'ecrz',
        column: list,
      }
    },
    detailLastOption () {
      return {
        label: '统筹情况',
        prop: 'tcqk',
        column: [{
          label: '统筹部门',
          prop: 'TcDeptId',
          span: 8,
          type: 'select',
          dicData: getDept(),
        },
        {
          label: '责任部门',
          prop: 'TDeptId',
          span: 8,
          type: 'select',
          dicData: getDept(),
        },
        {
          label: '认责情况',
          prop: 'TAttitude',
          span: 8,
          type: 'select',
          dicData: attitude,
        }],
      }
    },
    ConfirmationOption () {
      let list = [
        {
          label: '确认材料名',
          prop: 'QRmaterialName',
          span: this.tabType === 'material' ? 12 : 8,
        },{
          label: '确认材料类型',
          prop: 'QRmaterialType',
          span: this.tabType === 'material' ? 12 : 8,
          type: 'select',
          dicData: getDic('SUPPLU_MATERIAL_TYPE'),
        },
      ]
      if (this.tabType === 'item') {
        list.push({
          label: '确认数据项名',
          prop: 'QRitemName',
          span: 8,
        })
      }
      return {
        label: '确认情况',
        prop: 'qrqk',
        column: list,
      }
    },
  },
}