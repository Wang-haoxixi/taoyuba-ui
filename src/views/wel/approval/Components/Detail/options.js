// import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'
const dictsMap = {
  startTime: {
    1: '请假开始时间',
    2: '出差开始时间',
    3: '加班开始时间',
    4: '入职时间',
    5: '入职时间',
    6: '入职时间',
  },
  endTime: {
    1: '请假结束时间',
    2: '出差结束时间',
    3: '加班结束时间',
    4: '转正时间',
    5: '离职时间',
    6: '调岗时间',
  },
  status: {
    0: '未审核',
    1: '通过',
    2: '拒绝',
  },
  sStatus: {
    1: '通过',
    2: '拒绝',
  },
}

const initForm = () => {
  return {
    'id': '', // ID
    'name': '', // 申请人
    'avatar': '', // 头像
    'type': 1, // 
    'deptList': [], // 所属部门
    'approverList':[],
    'attachFile': [], // 附件
    'createTime': '', // 创建时间
    'startTime': '', // 开始时间(1:请假开始时间；2:出差开始时间;3:加班开始时间;4:入职时间;5:入职时间）
    'endTime': '', // 结束时间(1:请假结束时间；2:出差结束时间;3:加班结束时间;4:转正时间;5:离职时间;6:调岗时间）
    'job': '', // 职务
    'title': '', // 职称
    'reason': '', // 申请理由
    'annex': '', // 附件
    'status': 0,
    'processList': [], // 申请流程
    'cc': '', // 抄送人
    'ccList': [], // 抄送人
    'userId': '', // 抄送人
    'transferDeptList': {
      name: '',
    },
    'levaeType': '',
  }
}
const formToVo = (row) => {
	const newForm = {...row}
	return newForm
}

const initSelfForm = () => {
	return {
		id: '', // 用户ID 不可编辑
		name: '', // 真实姓名 不可编辑
		avatar: '', // 头像
		positionName: '', // 岗位
		job: '', // 职务
		title: '', // 职称
		entryTime: '', // 入职时间
		positiveTime: '', // 转正时间
		transferTime: '', // 调动时间
		deptList: [], // 所属部门 Vo 不可编辑
		dept: [], // 所属部门不可编辑
	}
}

export {
	dictsMap,
	initSelfForm,
	initForm,
	formToVo,
	initNow,
}
