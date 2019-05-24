# IEP-UI 国脉内网

## 注意

凡是以这个模板开发的项目, 都需要从这个项目的 `master` 分支分发出去, 改动文件规则请看规则

如果安装 `yarn` or `npm i` 缓慢, 请先更换为中国镜像. 这里推荐用自带 `CMD` or `PowerShell` 否则有权限问题

```
npm set registry https://registry.npm.taobao.org
npm set disturl https://npm.taobao.org/dist
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
```

`Mac OS` 系统等 `Linux` 系统需要加 `sudo` 前缀以提高权限

## 产品上手

> 推荐使用 `PowerShell`, `Bash` 等本地命令行

- `yarn mock` 运行预备好的假数据
- `yarn serve-mock` 运行前端

## 上手开发

> 推荐使用 `git bash`

- 克隆项目代码
- 预装好 `node10+` 安装包
- 如果使用 `vscode` 开发,可使用我们推荐的 `vscode` 配置 你也可以选择自定义配置(命令: `cp vscode.config/ .vscode/ -rf`)
- 安装项目的依赖 `npm i` 或使用 `yarn` (需要预装，命令：`npm i -g yarn`)
- 拷贝 `cp .env .env.local`
- 修改开发环境代理 ip 配置 文件在 `.env.local`
- 确认安装依赖无错，即可运行 `yarn serve` 或 `npm run serve`
- 提交使用 `yarn cz` 尽量使用命令提交, 冲突等等可不用

## 内网前端任务分配(组件以及负责人变更需这里修改)

| 组件             | 组件路径                | 组件所属父组件 | 负责人      | 负责人      | 负责人 | 负责人 |
| ---------------- | ----------------------- | -------------- | ----------- | ----------- | ------ | ------ |
| Top/NavBar       | 顶部导航                | Top            | 张超        | 重庆-谭建林 |        |        |
| Top/             | 顶部元素                | ElHeader       | 张超        |             |        |        |
| SideBar/MainItem | 主菜单                  | ELAside        | 张超        |             |        |        |
| Wel/WelAside     | 工作台(4000)/右侧操作栏 | Wel            | 张超        | 重庆-谭建林 |        |        |
| Wel/WelConTent   | 工作台(4000)/中间赋能台 | Wel            | 张超        | 重庆-谭建林 |        |        |
| Hrms             | 人力(5000)              | Views          | 张超        |             |        |        |
| Crms             | 客户(6000)              | Views          | 胡争伟      | 张渝松      |        |        |
| Core             | 核心(10000)             | Views          | 张超        |             |        |        |
| Goms             | 组织(7000)              | Views          | 张超        |             |        |        |
| Mlms             | 资源(4000)              | Views          | 胡争伟      |             |        |        |
| Fams             | 财务(8000)              | Views          | 张超        |             |        |        |
| Gpms             | 项目(9000)              | Views          | 北京-马青杰 |             |        |        |
| App              | 游客展示页              | Views          | Undefined   |             |        |        |

## 内网公用组件说明(公用组件以及路径、功能说明)

| 组件          | 组件路径                             | 组件使用页面参考                            | 功能说明                 |
| ------------- | ------------------------------------ | ------------------------------------------- | ------------------------ |
| Button        | @/components/IepCommon/Button        | 批量审核弹窗页面                            | 通用的按钮               |
| ReviewConfirm | @/components/IepCommon/ReviewConfirm | 组织的成员管理页面                          | 批量审核页面             |
| Tabs          | @/components/IepCommon/Tabs          | 人力资源下的人才库                          | tabs                     |
| IepDialog     | @/components/IepDialog               | 成员管理的成员编辑弹窗页面                  | 通用弹窗                 |
| IepEditor     | @/components/IepEditor               | 详见各个编辑页                              | 富文本                   |
| IepTable      | @/components/IepTable                | views\hrms\AdministrativeApproval\index.vue | table                    |
| IepTableLink  | @/components/IepTable/Link           | 详见各个表格页                              | 用来点击详情             |
| FooterToolbar | @/components/FooterToolbar/          | 详见各个编辑页                              | 用来复杂表单提交按钮存放 |
| Container     | @/components/Operation/Container     | views\hrms\AdministrativeApproval\index.vue | 头部按钮的操作框         |
| Search        | @/components/Operation/Search        | 组织的成员管理页面                          | 头部右侧搜索栏           |
| Wrapper       | @/components/Operation/Wrapper       | 组织的成员管理页面                          | 列表页操作栏             |
| Header        | @/components/Page/Header             | 组织的成员管理页面                          | 头部标题栏               |

## 样式 ZIndex 层次管理

| 顶部 TOP                                                   | 550   |
| ---------------------------------------------------------- | ----- |
| Footer                                                     | 500   |
| BasicAsideContainer                                        | 102   |
| .el-slider\_\_button-wrapper                               | 102   |
| D:\code\iep-ui\src\views\wel\index\WelAside\MyTreasure.vue | 98    |
| iep-drawer                                                 | 600   |
| iep-dialog                                                 | 2000+ |
| .iep-contact-dropdown                                      | 3000+ |

## v-charts 图表组件

详见 https://v-charts.js.org/#/data

## Git 管理必读

https://juejin.im/post/5aa7e8a6f265da239f070d82

## Git 提交必须

https://zhuanlan.zhihu.com/p/51894196

## 产品设计图获取

https://www.yuque.com/zsr/iep
私有画板图

## 菜单规范

| 节点 ID | 菜单名称       | 类型 | 前端组件                         | 前端地址          | 图标 | 权限标识     |
| ------- | -------------- | ---- | -------------------------------- | ----------------- | ---- | ------------ |
| 10000   | 核心管理(模块) | 菜单 | Layout(模块)                     | /core(注意有斜杠) |      |              |
| 11000   | 权限管理       | 菜单 | Layout(顶级菜单)                 | upms              |      |              |
| 11100   | 用户管理       | 菜单 | views/admin/user/index(页面菜单) | user              |      |              |
| 11101   | 用户新增       | 按钮 |                                  |                   |      | sys_user_add |

模块以 1000 为单位
模块下页面以 100 为单位,子页面以 10 为单位,权限按钮以 1 为单位

以下只列出模块节点 ID

| 节点 ID | 菜单名称   | 类型 | 前端组件 | 前端地址 | 图标 | 权限标识 |
| ------- | ---------- | ---- | -------- | -------- | ---- | -------- |
| 11000   | 权限管理   | 菜单 | Layout   | /upms    |      |          |
| 12000   | 系统管理   | 菜单 | Layout   | /admin   |      |          |
| 13000   | 系统监控   | 菜单 | Layout   | /daemon  |      |          |
| 14000   | 协同管理   | 菜单 | Layout   | /activti |      |          |
| 5000    | 人力(模块) | 菜单 | Layout   | /hrms    |      |          |
| 6000    | 客户(模块) | 菜单 | Layout   | /crms    |      |          |
| 7000    | 组织(模块) | 菜单 | Layout   | /goms    |      |          |
| 10000   | 核心(模块) | 菜单 | Layout   | /crms    |      |          |

## 具体见 Wiki
