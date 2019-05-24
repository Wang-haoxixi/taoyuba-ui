// import {
//     getDept,
// } from '@/util/dic'

import { getProjectSelect } from '@/api/projectManagement/projectMilestone'
import { getRoleSelect } from '@/api/projectManagement/projectRole'
import { selectUserList } from '@/api/projectManagement/projectUser'
export default {
  data () {
    return {
      projectSelect: [],
      projectMember: [],
      projectRole: [],
    }
  },
  created () {
    this.getProjectSelect()
    this.getRoleSelect()
    this.selectUserList()
  }, 
  methods: {
    selectUserList () {
      selectUserList().then(({data}) =>{
        this.projectMember = data
      })
    },
    getProjectSelect () {
      getProjectSelect().then(({data}) =>{
        this.projectSelect = data
      })
    },
    getRoleSelect () {
      getRoleSelect().then(({data}) => {
        this.projectRole = data
      })
    },
  },
  computed: {
    projectTeamFormOption () {
      return {
        menuBtn: false,
        labelWidth: '160',
        labelPosition: 'right',
        column: [
          {
            label: '团队名称',
            prop: 'teamName',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          }, {
            label: '团队Logo',
            prop: 'teamLogo',
            type: 'upload',
            loadText: 'logo上传中，请稍等',
            span: 24,
            limit: 1,
            showFileList: false,
            listType: 'picture-img',
            tip: '只能上传jpg/png文件',
            action: '/proj/dnaprojectteam/upload',
            slot: true,
            formsolt: true,
          }, {
            label: '团队描述',
            prop: 'teamDesc',
            span: 24,
            type: 'textarea',
            maxlength:255,
          }, {
            label: '团队项目',
            prop: 'teamProjects',
            span: 24,
            type: 'select',
            multiple: true,
            typeDic: 'dic',
            dicData: this.projectSelect,
          }, {
            label: '团队成员',
            prop: 'teamMember',
            span: 24,
            type: 'select',
            multiple: true,
            typeDic: 'dic',
            dicData: this.projectMember,
          }, {
            label: '角色',
            prop: 'roleId',
            span: 24,
            type: 'select',
            typeDic: 'dic',
            dicData: this.projectRole,
          },
        ],
      }  
    },
  },  
}        