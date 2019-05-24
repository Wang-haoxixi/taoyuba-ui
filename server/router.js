const Router = require('koa-router')
const codeController = require('./controller/code')
const authController = require('./controller/auth')
const adminController = require('./controller/admin')
const dictController = require('./controller/dict')
const mobileController = require('./controller/mobile')
const orgController = require('./controller/org')
const hrmsController = require('./controller/hrms')
const mlmsController = require('./controller/mlms')
const crmsController = require('./controller/crms')
const welController = require('./controller/wel')
const imsController = require('./controller/ims')
const famsController = require('./controller/fams')
const router = new Router()
/**
 * 获取验证码
 *
 * 暂时无其他参数
 */
router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})
router.get('/code', codeController.getCode)

router.post('/auth/oauth/token', authController.getOauthToken)
router.delete('/auth/token/logout', authController.getTokenLogout)
router.post('/auth/mobile/token/sms', authController.postMobileToken)

router.get('/admin/user/info', adminController.getUserInfo)
router.get('/admin/dept/user-tree', adminController.getDeptUserTree)
router.get('/admin/user/page', adminController.getUserPage)
router.get('/admin/file/:filename', adminController.getAvatar)
router.get('/admin/menu', adminController.getMenu)
router.get('/admin/dept/tree', adminController.getDeptTree)
router.get('/admin/user/details', adminController.getUserDetails)
router.get('/admin/role/list', adminController.getRoleList)
router.post('/admin/user', adminController.postUser)
router.delete('/admin/user', adminController.deleteUser)
router.get('/admin/menu/tree', adminController.getMenuTree)
router.get('/admin/role/page', adminController.getRolePage)
router.get('/admin/dict/type/log_type', adminController.getDictTypeLogType)
router.get('/admin/dict/all_map', dictController.getDictMap)
router.get('/admin/log/page', adminController.getLogPage)
router.get('/admin/dict/page', dictController.getDictPage)
router.get('/admin/dict/child/1', dictController.getDictChildById)
router.get('/admin/mobile/:mobile', mobileController.getMobileCode)
router.get('/admin/org/list', orgController.getOrgList)
router.get('/admin/org', orgController.getOrgPage)
router.get('/admin/org/user/page', orgController.getOrgUserPage)
router.get('/admin/org/:id', orgController.getOrgDetail)
router.post('/admin/user/set/org/:id', orgController.postSetOrg)
router.get('/admin/dept/list', adminController.getDeptList)
router.get('/admin/wel/index', adminController.getWelIndex)
router.get('/admin/wel/aside', adminController.getAside)

router.get('/mlms/material/wel/list', adminController.getMaterials)

router.get('/ims/email/unread_list', adminController.getAnnouncementPage)

router.get('/hrms/employee_profile/page', hrmsController.getEmployeeProfilePage)
router.get('/hrms/employee_profile/growth_file/:id', hrmsController.getGrowthFileById)

router.get("/hrms/administrative_approval/page", hrmsController.getAdministrativeApprovalPage)

router.get("/hrms/talent_pool/page", hrmsController.getTalentPoolPage)
router.get("/hrms/assessment_management/page", hrmsController.getAssessmentManagementPage)

router.get("/hrms/publish_recruitment/page", hrmsController.getPublishRecruitmentPage)
router.get('/hrms/publish_recruitment/:id', hrmsController.getPublishRecruitmentById)
router.post('/hrms/publish_recruitment/create', hrmsController.commonPublishRecruitment)
router.post('/hrms/publish_recruitment/update', hrmsController.commonPublishRecruitment)
router.post('/hrms/publish_recruitment/status/batch', hrmsController.commonPublishRecruitment)
router.post('/hrms/publish_recruitment/remove/batch', hrmsController.commonPublishRecruitment)

router.get("/hrms/training_record/page", hrmsController.getTrainingRecordPage)
router.get("/admin/dept/page", hrmsController.getDepartmentManagePage)
router.get("/hrms/job_system/page", hrmsController.getJobPage)
router.get("/hrms/title_system/page", hrmsController.getTitlePage)
router.get("/hrms/post_library/page", hrmsController.getPostLibraryPage)
router.get("/hrms/post_type/page", hrmsController.getPostTypePage)
router.get("/hrms/post_type/list", hrmsController.getPostTypeList)

router.get("/mlms/page", mlmsController.getTableData)
router.post("/mlms/create", mlmsController.postData)
router.post("/mlms/update", mlmsController.postData)
router.post("/mlms/delete/1", mlmsController.deleteById)

// crms
router.get('/crms/customer/page', crmsController.getCustomerPage)
router.get('/crms/customer/:id', crmsController.getCustomerById)
router.post('/crms/customer/create', crmsController.create)
router.post('/crms/customer/update', crmsController.update)
router.post('/crms/customer/delete/batch', crmsController.delete)
router.post('/crms/custom', crmsController.fetchDetail)
router.get('/crms/custom/programme/page', crmsController.fetchProgramme)
router.get('/crms/contact/page', crmsController.fetchContartList)
router.post('/crms/contact/create', crmsController.createContact)
router.post('/crms/contact/update', crmsController.updateContact)
router.post('/crms/contact/delete', crmsController.deleteContact)
router.post('/crms/custom/claim/1', crmsController.deleteContact)

router.get('/crm/cms/wel/customer/list', adminController.getCustomerList)
router.get('/crm/cms/wel/contract/list', adminController.getContractList)

//wel
router.get('/admin/approval/page', welController.getApprovalPage)


//fams
router.get('/fams/rule_configuration/page', famsController.getControllerPage)
router.get('/fams/personal_account_management/page', famsController.getPersonalAccountManagementPage)
router.get('/fams/financial_management/page', famsController.getFinancialManagementPage)
router.get('/fams/g_c_journal/page', famsController.getGCJournalPage)
router.get('/fams/invoice_notification/page', famsController.getInvoiceNotificationPage)

// 系统消息

router.get('/ims/system_message/page', imsController.getSystemMessagePage)

exports = module.exports = router
