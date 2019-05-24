import {getDic} from '@/util/dic'
export const tableOption = {
    labelWidth: '150',
    menuBtn: false,
    column: [
      {
        label: '知识文档名称',
        prop: 'docTitle',
        span: 24,
        rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
        maxlength: 100,
      }, {
        label: '所属项目',
        prop: 'dependentProjectId',
        span: 24,
        type: 'select',
        rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      }, {
        label: '知识类别',
        prop: 'knowledgeCategory',
        span: 24,
        type: 'select',
        typeDic: 'dic',
        dicData: getDic('PROJECT_KNOWLEDGE_TYPE'),
        rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      }, {
        label: '知识介绍',
        prop: 'knowledgeIntroduction',
        span: 24,
        type: 'textarea',
        maxlength: 255,
      }, {
        label: '附件',
        prop: 'attachmentMapList',
        type: 'upload',
        loadText: '附件上传中，请稍等',
        span: 24,
        border: false,
        autoHeight: true,
        multiple: true,
        limit: 100,
        propsHttp: {
            name: 'name',
            url: 'url',
        },
        props: {
            label: 'name',
            value: 'url',
        },
        // tip: '只能上传jpg/png文件，且不超过500kb',
        action: '/proj/dnaprojectknowledgebase/upload',
        rules: [{
            required: true,
            message: '不能为空',
        }],
        slot: true,
      },
    ],
  }
  