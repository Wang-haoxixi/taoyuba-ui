import { getDic } from '@/util/dic'
export const projectRoleTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: true,
  index: true,
  column: [
    {
      label: "角色名称",
      prop: "roleName",
    }, {
      label: "角色描述",
      prop: "roleDesc",
    }, {
      label: "状态",
      prop: "status",
      type: "dic",
      dicData: getDic('PROJECT_ROLE_STATUS'),
    }, {
      label: "修改时间",
      prop: "createTime",
    }, {
      label: "操作",
      prop: "menu",
      solt: true,
      width: 250,
    },
  ],
}


export const projectRoleFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '角色名称',
      prop: 'roleName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    }, {
      label: '角色标识',
      prop: 'roleCode',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    }, {
      label: '角色描述',
      prop: 'roleDesc',
      span: 24,
      type: 'textarea',
    },
  ],  
}
