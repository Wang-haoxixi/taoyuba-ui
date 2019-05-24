import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
let businessType = {}
for (let item of dicData.prms_business_type) {
    businessType[item.value] = item.label
}

const dictsMap = {
    projectType: {
        '0': '内部项目',
        '1': '外部项目',
    },
    businessType: businessType,
}

const columnsMap = [
    {
        prop: 'name',
        label: '名称',
    },
    {
        prop: 'projectType',
        label: '项目类别',
        type: 'dict',
    },
    {
        prop: 'businessType',
        label: '业务类型',
        width: 300,
        type: 'dict',
    },
]

export const rules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
    ],
    detailedDescri: [
        { required: true, message: '请选择项目类型', trigger: 'blur' },
    ],
    isRequired: [
        { required: true, message: '请选择项目类型', trigger: 'change' },
    ],
    projectType: [
        { required: true, message: '请选择项目类型', trigger: 'change' },
    ],
    businessType: [
        { required: true, message: '请选择业务类型', trigger: 'change' },
    ],
    sortValue: [
        { required: true, message: '请输入排序值', trigger: 'blur' },
    ],
    url: [
        { required: true, message: '请输入URL', trigger: 'blur' },
    ],
}

export function initFormData () {
    return {
        name: '',
        detailedDescri: '',
        isRequired: '',
        projectType: '',
        businessType: '',
        sortValue: '',
        url: '',
    }
}

const initForm = () => {
    return {
        name: '',
        isOpen: false,
        intro: '',
    }
}

const initSearchForm = () => {
    return {
        name: '',
        teacher: '',
        type: '',
        date: '',
    }
}
const tipContent2 = {
    name:'此处填写所需文档名称，务必要直观清晰。',
    detailedDescri:'请务必对所需文档要素、内容做简要说明，确保能够快速理解。',
    projectType:'请务必根据实际情况进行选择',
    businessType:'请务必结合客户需求准确填写业务类型：<br/>' +
                    '咨询：规划/行动计划/工作方案/课题研究/标准规范/管理制度/整体解决方案/评测<br/>' +
                    '产品：DNA/DIPS/营商通/咨询服务产品化<br/>' +
                    '<br/>' +
                    '数据：数据采集/普查/编目/标准化/开放共享/应用服务/主题库、基础库建设/事项材料梳理/主题清单规范优化、再造<br/>' +
                    '<br/>' +
                    '外包：软件/平台/服务<br/>' +
                    '会议培训：研讨会/招商合作/培训会<br/>' +
                    '<br/>' +
                    '平台：平台新建/<br/>' +
                    '平台升级<br/>' +
                    '技术服务：网站/平台/软件<br/>' +
                    '其他：自定义填写',
    sortValue:'数字越小，排序越大。',
    url:'此处填写链接，由开发人员提供。通过链接来实现其他模块数据调用',
}
export { dictsMap, columnsMap, initForm, initSearchForm, tipContent2 }

