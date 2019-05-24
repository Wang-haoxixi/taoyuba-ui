exports.getOrgList = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: [
      { name: '北方区业务一部' },
      { name: '北方区业务二部' },
      { name: '北方区业务三部' },
      { name: '北方区业务一部' },
      { name: '北方区业务一部' },
      { name: '北方区业务一部' },
    ]
  }
  ctx.body = json
}
exports.getOrgPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"orgName":"杜照鸿的组织","logo":"image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg","realName":"超级管理员","logList":[{"id":277,"userId":1,"targetUserId":10,"time":"2019-02-28 14:56:37","description":"管理员 $ 将组织成员 $ 解除锁定。,超级管理员,杜照鸿","orgId":8},{"id":276,"userId":1,"targetUserId":10,"time":"2019-02-28 14:08:13","description":"管理员 $ 将组织成员 $ 锁定。,超级管理员,杜照鸿","orgId":8},{"id":275,"userId":1,"targetUserId":10,"time":"2019-02-28 14:08:11","description":"管理员 $ 将组织成员 $ 解除锁定。,超级管理员,杜照鸿","orgId":8},{"id":274,"userId":1,"targetUserId":10,"time":"2019-02-28 14:08:10","description":"管理员 $ 将组织成员 $ 锁定。,超级管理员,杜照鸿","orgId":8},{"id":273,"userId":1,"targetUserId":10,"time":"2019-02-28 10:57:57","description":"管理员 $ 将成员 $ 取消设为管理员。,超级管理员,杜照鸿","orgId":8},{"id":272,"userId":1,"targetUserId":10,"time":"2019-02-28 10:52:50","description":"管理员 $ 将成员 $ 取消设为管理员。,超级管理员,杜照鸿","orgId":8},{"id":271,"userId":1,"targetUserId":1,"time":"2019-02-27 16:08:12","description":"管理员 $ 修改组织成员 $ 角色。,超级管理员,超级管理员","orgId":8},{"id":270,"userId":1,"targetUserId":8,"time":"2019-02-27 16:07:42","description":"管理员 $ 修改组织成员 $ 角色。,超级管理员,张超","orgId":8},{"id":269,"userId":1,"targetUserId":8,"time":"2019-02-27 16:07:24","description":"管理员 $ 通过 $ 加入组织。,超级管理员,张超","orgId":8},{"id":268,"userId":8,"targetUserId":0,"time":"2019-02-27 16:06:50","description":"$ 申请加入组织。,张超","orgId":8},{"id":252,"userId":1,"targetUserId":0,"time":"2019-02-27 16:03:22","description":"$ 关闭组织申请。,超级管理员","orgId":8},{"id":251,"userId":1,"targetUserId":0,"time":"2019-02-27 16:03:22","description":"$ 开放组织申请。,超级管理员","orgId":8},{"id":250,"userId":1,"targetUserId":0,"time":"2019-02-27 16:03:21","description":"$ 关闭组织申请。,超级管理员","orgId":8},{"id":249,"userId":1,"targetUserId":10,"time":"2019-02-27 15:18:46","description":"管理员 $ 修改组织成员 $ 角色。,超级管理员,杜照鸿","orgId":8}],"memberNum":3,"applyUserNum":0,"deptNum":0,"managerList":[{"userId":10,"username":"luckydu","realName":"杜照鸿","password":"$2a$10$u6D83/lGaENUrMp7FgvDLezaeVSXHUJl3NwgYL/AI26FdYAcA5Ncq","safePassword":"","createTime":"2019-02-20 11:38:33","updateTime":"2019-02-25 16:34:34","delFlag":"0","lockFlag":"0","avatar":"image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg","phone":"11011011011","orgId":8,"deptId":13,"tenantId":1,"assetOrg":8},{"userId":1,"username":"admin","realName":"超级管理员","password":"$2a$10$QOfWxxFyAMmEEmnuw9UI/..1s4B4eF/u9PzE2ZaGO.ij9YfmcUy.u","safePassword":"","createTime":"2018-04-20 07:15:18","updateTime":"2019-02-25 16:01:03","delFlag":"0","lockFlag":"0","avatar":"files-8033f461524f4ee1b2c3d790efc64eae.JPG","phone":"18886665522","orgId":8,"deptId":1,"tenantId":1,"wxOpenid":"","qqOpenid":"","assetOrg":8}],"isOpen":0,"isUserLocked":0}}`
}
exports.getOrgUserPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"userId":10,"orgId":8,"username":"luckydu","realName":"杜照鸿","avatar":"image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg","phone":"11011011011","assetOrg":"杜照鸿的组织","type":1,"status":0,"createTime":"2019-02-28 14:56:37","orgNames":["杜照鸿的组织"],"roleList":[5]},{"userId":8,"orgId":8,"username":"root","realName":"张超","avatar":"files-05a1c46e8bd84e79b56b4d1966fb8658.jpg","phone":"18858395625","assetOrg":"杜照鸿的组织","type":0,"status":0,"createTime":"2019-02-27 16:07:24","orgNames":["string","杜照鸿的组织"],"roleList":[5]},{"userId":1,"orgId":8,"username":"admin","realName":"超级管理员","avatar":"files-8033f461524f4ee1b2c3d790efc64eae.JPG","phone":"18886665522","assetOrg":"杜照鸿的组织","type":1,"status":0,"createTime":"2019-02-26 14:36:38","orgNames":["测试新增组织并绑定所创大部门","杜照鸿的组织"],"roleList":[5]}],"total":3,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.postSetOrg = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":true}`
}
exports.getOrgDetail = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"orgId":8,"logo":"image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg","orgAbrName":"","establishTime":"2019-02-26 10:09:14","userId":10,"contactMethod":"","orgStructure":"","coreAdvantage":"","isNode":0,"delFlag":"0","createTime":"2019-02-23 16:42:28","updateTime":"2019-02-23 16:42:28","isOpen":0,"creator":"杜照鸿","name":"杜照鸿的组织","intro":"杜照鸿的组织"}}`
}