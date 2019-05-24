export const projectTeamTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: true,
  index: true,
  column: [
    {
      label: "团队名称",
      prop: "teamName",
    }, {
      label: "团队项目",
      prop: "teamProjectsForShow",
    }, {
      label: "团队简介",
      prop: "teamDesc",
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
