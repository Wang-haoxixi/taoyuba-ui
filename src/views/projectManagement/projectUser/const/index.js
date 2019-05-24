export const projectUserTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: true,
  index: true,
  column: [
    {
      label: "账号",
      prop: "userName",
    }, {
      label: "姓名",
      prop: "realName",
    }, {
      label: "电话",
      prop: "phone",
    // }, {
    //   label: "角色",
    //   prop: "roleNameForShow",
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
