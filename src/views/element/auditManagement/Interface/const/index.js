import { getDic } from '@/util/dic'

//   审查
export const formOption = {
    labelWidth: '150',
    menuBtn: false,
    column: [
        {
            label: '服务中文名称',
            prop: 'nameCn',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '服务英文名称',
            prop: 'nameEn',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '接入类型',
            prop: 'linkType',
            span: 24,
            type: 'select',
            dicData: getDic('ELEMENT_ACCESS_TYPE'),
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
            label: '资源目录',
            prop: 'infoIdForShow',
            type: 'select',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '服务摘要',
            prop: 'summary',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '调用频率',
            prop: 'callRate',
            span: 24,
            type: 'select',
            dicData: getDic('ELEMENT_CALL_FREQUENCY'),
            rules: [{ required: false, message: '不能为空', trigger: 'change' }],
        },
        {
            label: '超时时间(秒)',
            prop: 'timeout',
            span: 24,
        },
        {
            label: '使用场景描述',
            prop: 'usecaseDescn',
            span: 24,
            type: 'textarea',
        },
        {
            label: '授权方式',
            prop: 'authType',
            span: 24,
            type: 'select',
            dicData: getDic('AUTH_TYPE'),
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
            label: '是否需要提交附件',
            prop: 'isAttach',
            span: 24,
            type: 'select',
            dicData: getDic('IS_NOT'),
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
        },
        {
            label: '请求示例',
            prop: 'requestSample',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '返回示例',
            prop: 'resultSample',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '网络地址',
            prop: 'interfaceAddress',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '查询条件',
            prop: 'queryCondition',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
        {
            label: '接口描述',
            prop: 'interfaceDescn',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        },
    ],
}
//   查看部分
export const detailOption = {
    option: [
        {
            column: formOption.column,
        },
    ],
}
// 表单
export const interFace = {
    page: true,
    menu: false,
    index: false,
    header: false,
    selection: false,
    // expand:true,
    column: [
        {
            label: "部门名称",
            prop: "deptIdForShow",
        },
        {
            label: "服务中文名称",
            prop: "nameCn",
        },
        {
            label: "服务英文名称",
            prop: "nameEn",
        },
        {
            label: "接入类型",
            prop: "linkType",
            type: 'dic',
            dicData: getDic('ELEMENT_ACCESS_TYPE'),
        },
        {
            label: "资源目录",
            prop: "infoIdForShow",
            type: 'dic',
        },
        {
            label: "状态",
            prop: "auditState",
            type: 'dic',
            dicData: getDic('AUDIT_STATE'),
        },
    ],
}
