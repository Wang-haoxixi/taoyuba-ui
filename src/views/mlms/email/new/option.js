export const initFormData = () => {
  return {
    attachmentIds: [], // 附件
    attachmentList: [],
    content: '',
    emailId: 0,
    materialIds: [],
    projectIds: [],
    receiverIds: [],
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    transferList: {
      projectIds: [], // 项目
      summaryIds: [], // 纪要
      materialIds: [], // 材料
      reportIds: [], // 报表
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    tagKeyWords: [],
    type: 0,
    kind: 0,
  }
}

var receiverValidate = (rule, value, callback) => {
  if (value.orgs.length == 0 && value.users.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}

export const rules = {
  content: [{ required: true, message: '必填', trigger: 'blur' }],
  subject: [{ required: true, message: '必填', trigger: 'blur' }],
  receiverList: [{ validator: receiverValidate, message: '必填', trigger: 'change' }],
}

export const tipContent = {
    receiverList: '1、需要回复或采取行动的人<br/>' +
    '2、需要了解此次邮件事项相关的人',
    subject: '1、部门简称+关于+事项+邮件类型，国脉集团研发中心关于内网2.0开发进度工作汇报',
    attachmentList: '1、附件文件应按照文件内容准确命名；<br/>' +
    '2、附件控制在200M以下。',
    transferList: '1、准确关联资源<br/>' +
    '2、资源材料应按照文件内容准确命名',
    tagKeyWords: '1、标签必须围绕邮件主题/内容，优先选择推荐标签；<br/>' +
    '2、标签数量必须在3个以上。',
    content: '1、正文中要有称呼，发送对象只有一位，就根据该收件人职务称呼，如收件人为多位，称呼可用各位同事，各位领导+“：”；<br/>' +
    '2、具体内容另起一行，并首行缩进2个字符；<br/>' +
    '3、正文中除了“你好！”，“谢谢！”以外尽量不要使用“！”；<br/>' +
    '4、字体格式：使用默认字体，字号，如复制有格式的文字请进行格式清除；<br/>' +
    '请注意不要出现错别字！',
}