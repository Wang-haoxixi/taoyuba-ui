import Layout from '@/page/index/index'
export default [
  {
    path: '/fams_spa',
    component: Layout,
    redirect: '/fams_spa/withdraw_detail',
    children: [
      {
        path: 'withdraw_detail/:id',
        name: '提现详情',
        component: () => import('@/views/fams/wealth/Withdraw/Detail.vue'),
      },
      {
        path: 'salary_detail/:id',
        name: '工资管理详情',
        component: () => import('@/views/fams/FinancialManagement/SalaryManagement/Detail.vue'),
      },
      {
        path: 'salary_person_detail/:id',
        name: '工资管理个人详情',
        component: () => import('@/views/fams/FinancialManagement/SalaryManagement/PersonDetail.vue'),
      },
      {
        path: 'payroll_detail/:id',
        name: '工资条',
        component: () => import('@/views/fams/FinancialManagement/SalaryManagement/PayrollDetail.vue'),
      },
      {
        path: 'invoice_detail/:id',
        name: '发票详情',
        component: () => import('@/views/fams/wealth/Invoice/Detail.vue'),
      },
      {
        path: 'billing_detail/:id',
        name: '开票详情',
        component: () => import('@/views/fams/wealth/BillingNotice/Detail.vue'),
      },
      {
        path: 'fund_transfer_edit/:id',
        name: '新增资金调拨',
        component: () => import('@/views/fams/GroupFinance/FundTransfer/Edit.vue'),
      },
      {
        path: 'fund_transfer_detail/:id',
        name: '资金调拨详情',
        component: () => import('@/views/fams/GroupFinance/FundTransfer/Detail.vue'),
      },
      {
        path: 'org_borrow_detail/:id',
        name: '组织拆借详情',
        component: () => import('@/views/fams/OrgBorrow/Components/OrgBorrowDetail/index.vue'),
      },
      {
        path: 'union_borrow_detail/:id',
        name: '集团拆借详情',
        component: () => import('@/views/fams/OrgBorrow/Components/UnionBorrowDetail/index.vue'),
      },
      {
        path: 'accounts_receivable',
        name: '合同应收账款',
        component: () => import('@/views/fams/FinancialManagement/WorkBench/AccountsReceivableDetail/index.vue'),
      },
      {
        path: 'other_receivables',
        name: '其他应收款',
        component: () => import('@/views/fams/FinancialManagement/WorkBench/OtherReceivablesDetail/index.vue'),
      },
      {
        path: 'project_accounting/:id',
        name: '项目核算详情',
        component: () => import('@/views/fams/OrgAssets/ProjectAccounting/Detail.vue'),
      },
      {
        path: 'organization_transfer',
        name: '组织转账',
        component: () => import('@/views/fams/GroupFinance/OrganizationTransfer/index.vue'),
      },
      {
        path: 'organization_reward',
        name: '组织打赏/扣减',
        component: () => import('@/views/fams/GroupFinance/OrganizationReward/index.vue'),
      },
    ],
  },
]
