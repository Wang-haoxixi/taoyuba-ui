import { getDeptUser } from '@/api/projectManagement/projectMilestone'
import { getUser } from '@/api/projectManagement/projectUser'
//import { getRoleSelect } from '@/api/projectManagement/projectRole'

export default {
  data () {
    return {
      user: [],
      //role: [],
    }
  },
  created () {
    getDeptUser().then(({data}) => {
      this.user = data      
    })
    // getRoleSelect().then(({data}) => {
    //   this.role = data
    // })
  }, 
  watch: {
    'form.id': {
      handler (val) {
        if (val) {
          var params = {id: Number(val)}
          getUser(params).then(({data})=> {
            this.form.realName = data.realName
            this.form.userName = data.username
          })
        }
      },
    },
  }, 
  computed: {
    projectUserFormOption () {
      return {
        menuBtn: false,
        labelWidth: '160',
        labelPosition: 'right',
        column: [
          {
            label: '系统用户',
            prop: 'id',
            span: 24,
            type: 'tree',
            dicData: this.user,
            visdiplay: this.status == 'update' ? false : true,
            parent:false,
            props:{
              label:'name',
            },
            rules: [
              {required: true, message: '不能为空', trigger: 'change'},
            ],
          }, {
            label: '账号',
            prop: 'userName',
            span: 24,
            disabled: true,
          }, {
            label: '姓名',
            prop: 'realName',
            span: 24,
            disabled: true,
          }, {
            label: '电话',
            prop: 'phone',
            span: 24,
            maxlength: 20,
          }, {
            label: '简介',
            prop: 'description',
            span: 24,
            type: 'textarea',
            maxlength: 255,
          // }, {
          //   label: '角色',
          //   prop: 'roleIdList',
          //   span: 24,
          //   type: 'select',
          //   multiple: true,
          //   dicData: this.role,
          //   rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
        ],
      }  
    },
  },  
}        