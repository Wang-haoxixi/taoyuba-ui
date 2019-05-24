import { getDept, getDic } from '@/util/dic'

let attitude = [{value: 2, label: '待确认'}, {value: 1, label: '已确认'}, {value: 0, label: '拒绝'}]

export const materialTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  selection: false,
  page: true,
  header: false,
  menu:false,
  align:'center',
  menuAlign:'center',
  indexLabel: '序号',
  index: true,
  column: [
    {
      label: '需求情况',
      prop: 'name',
      children: [
        {
          label: '材料类型',
          prop: 'materialType',
          type: 'dic',
          dicData: getDic('SUPPLU_MATERIAL_TYPE'),
        },
        {
          label: '需求部门',
          prop: 'demandDeptId',
          type: 'dic',
          dicData: getDept(),
        },
        {
          label: '事项名称',
          prop: 'matName',
        },
        {
          label: '材料名称',
          prop: 'materialName',
        },
      ],
    },
    {
      label: '认责情况',
      prop: 'name',
      children: [
        {
          label: '操作',
          prop: 'menu',
          width: 200,
          solt: true,
        },
        {
          label: '确认数源部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
      ],
    },
  ],
}

export const itemTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  selection: false,
  page: true,
  header: false,
  menu:false,
  align:'center',
  menuAlign:'center',
  indexLabel: '序号',
  index: true,
  column: [
    {
      label: '需求情况',
      prop: 'name',
      children: [
        {
          label: '涉及信息项',
          prop: 'itemName',
        },
        {
          label: '需求部门',
          prop: 'demandDeptId',
          type: 'dic',
          dicData: getDept(),
        },
        {
          label: '事项名称',
          prop: 'matName',
        },
        {
          label: '材料名称',
          prop: 'materialName',
        },
        {
          label: '材料类型',
          prop: 'materialType',
          type: 'dic',
          dicData: getDic('SUPPLU_MATERIAL_TYPE'),
        },
      ],
    },
    {
      label: '认责情况',
      prop: 'name',
      children: [
        {
          label: '操作',
          prop: 'menu',
          width: 200,
          solt: true,
        },
        {
          label: '确认数源部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
      ],
    },
  ],
}

export const detailHeadOption = {
  column: [{
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
  }],
}

export const detailFirstOption = {
  label: '初次认责情况',
  prop: 'ccrz',
  column: [{
    label: '责任部门',
    prop: 'FDeptId',
    span: 12,
    type: 'select',
    dicData: getDept(),
  },
  {
    label: '认责情况',
    prop: 'FAttitude',
    span: 12,
    type: 'select',
    dicData: attitude,
  },
  {
    label: '备注',
    prop: 'FComment',
    type:'textarea',
    span: 24,
    valueDefault: '无',
  }],
}

export const detailSecondOption = {
  label: '二次认责情况',
  prop: 'ecrz',
  column: [{
    label: '责任部门',
    prop: 'SDeptId',
    span: 12,
    type: 'select',
    dicData: getDept(),
  },
  {
    label: '认责情况',
    prop: 'SAttitude',
    span: 12,
    type: 'select',
    dicData: attitude,
  },
  {
    label: '备注',
    prop: 'SComment',
    type:'textarea',
    span: 24,
  }],
}

export const detailLastOption = {
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

export const materialConfirmationOption = {
  label: '确认情况',
  prop: 'qrqk',
  column: [{
    label: '确认材料名',
    prop: 'QRmaterialName',
    span: 12,
  },
  {
    label: '确认材料类型',
    prop: 'QRmaterialType',
    span: 12,
    type: 'select',
    dicData: getDic('SUPPLU_MATERIAL_TYPE'),
  }],
}

export const itemConfirmationOption = {
  label: '确认情况',
  prop: 'qrqk',
  column: [{
    label: '确认材料名',
    prop: 'QRmaterialName',
    span: 8,
  },
  {
    label: '确认材料类型',
    prop: 'QRmaterialType',
    span: 8,
    type: 'select',
    dicData: getDic('SUPPLU_MATERIAL_TYPE'),
  }, {
    label: '确认数据项名',
    prop: 'QRitemName',
    span: 8,
  }],
}

function dealFlowVOs (data) {
  // 认责的情况
  if (data.flowVOs.length == 0) { // 初次认责必定存在，若流程为空，即待确认
    data.FDeptId = data.deptId
    data.FAttitude = 2
  } else { // 若流程不为空，根据流程判断目前的状态
    data.FDeptId = data.flowVOs[0].handleDeptId
    data.FAttitude = data.flowVOs[0].attitude
    data.FComment = data.flowVOs[0].comment
    // 判断是否存在二次认责
    if ((data.flowVOs.length == 1 && data.flowVOs[0].attitude == 0 && data.step == 1) // 初次拒绝，二次待确认，待确认部门为普通部门
      || (data.flowVOs.length >= 2 && data.flowVOs[1].type == 0) // 二次已确认，确认部门为普通部门
    ) {
      data.SDeptId = data.flowVOs[0].recDeptId
      data.SAttitude = data.flowVOs.length == 1 ? 2 : data.flowVOs[1].attitude
      data.SComment = data.flowVOs.length == 1 ? '' : data.flowVOs[1].comment
    }
    if (data.step == 2) { // 统筹部门待确认
      data.TcDeptId = data.flowVOs[data.flowVOs.length-1].recDeptId
      // 其中还存在一个特殊的情况，统筹部门直接指派给需求部门，即直接拒绝状态
      if (data.status == 2) {
        data.TAttitude = 0
      } else {
        data.TAttitude = 2
      }
    } else if (data.step == 3) { // 部门强制待确认、已确认
      if (data.flowVOs[data.flowVOs.length-1].type == 1) { // 强制待确认状态
        data.TcDeptId = data.flowVOs[data.flowVOs.length-1].handleDeptId
        data.TDeptId = data.flowVOs[data.flowVOs.length-1].recDeptId
        data.TAttitude = 2
      } else { // 强制已确认状态
        data.TcDeptId = data.flowVOs[data.flowVOs.length-2].handleDeptId
        data.TDeptId = data.flowVOs[data.flowVOs.length-1].handleDeptId
        data.TAttitude = 1
      }
    }
    // 判断确认完毕
    if (data.status !== 0) {
      data.QRmaterialName = data.flowVOs[data.flowVOs.length-1].materialName
      data.QRmaterialType = data.flowVOs[data.flowVOs.length-1].materialType
      data.QRitemName = data.flowVOs[data.flowVOs.length-1].itemName
    }
  }
  return data
}

// 确认态度（1-待确认步骤 2-统筹步骤  3-强制确认步骤）
export function processingData (data) {
  // 基础数据
  data.demandDeptId = data.supDemandVO.deptId
  data.matName = data.supDemandVO.matName
  data.matCode = data.supDemandVO.matCode
  data.matType = data.supDemandVO.types
  data.anlAvgVol = data.supDemandVO.anlAvgVol
  data.applyReason = data.supDemandVO.applyReason
  return dealFlowVOs(data)
}

export function processingItem (data) {
  data.demandDeptId = data.materialVO.supDemandVO.deptId
  data.matName = data.materialVO.supDemandVO.matName
  data.matCode = data.materialVO.supDemandVO.matCode
  data.matType = data.materialVO.supDemandVO.types
  data.anlAvgVol = data.materialVO.supDemandVO.anlAvgVol
  data.applyReason = data.materialVO.supDemandVO.applyReason
  data.materialName = data.materialVO.materialName
  data.materialType = data.materialVO.materialType
  data.sourceMethod = data.materialVO.sourceMethod
  data.legalBasis = data.materialVO.legalBasis
  return dealFlowVOs(data)
}
