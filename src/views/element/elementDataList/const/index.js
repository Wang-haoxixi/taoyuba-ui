import {
  // getDic,
  getDept,
} from '@/util/dic'

export const searchOption = [
  { label: '部门名称', prop: 'deptId', type: 'select', data: getDept()},
]

export const mainTableOption = {
  border: true,
  header: false,
  menu: false,
  index: false,
  page: false,
  showSummary: true,
  align:'center',
  menuAlign:'center',
  sumText: '合计',
  sumColumnList: [
    {
      name: 'id',
      type: 'count',
    },{
      name: 'resrcsum',
      type: 'sum',
    }, {
      name: 'submitted',
      type: 'sum',
    }, {
      name: 'unsubmitted',
      type: 'sum',
    }, {
      name: 'resrccollection',
      type: 'sum',
    }, {
      name: 'intersystem',
      type: 'sum',
    },{
      name: 'elementsum',
      type: 'sum',
    },{
      name: 'conditional',
      type: 'sum',
    },{
      name: 'unconditional',
      type: 'sum',
    },{
      name: 'deny',
      type: 'sum',
    },{
      name: 'opennum',
      type: 'sum',
    },{
      name: 'elementcollection',
      type: 'sum',
    },
  ],
  column:[
    {
     label:'部门名称',
     prop:'id',
     type: 'dic',
     dicData: getDept(),
   }, {
     label:'信息资源信息',
     prop:'informationInfo',
     align: 'center',
     children: [
        {
          label: '总数',
          align: 'center',
          prop: 'resrcsum',
        }, {
          label: '已提交数',
          align: 'center',
          prop: 'submitted',
        }, {
          label: '未提交数',
          align: 'center',
          prop: 'unsubmitted',
        }, {
          label: '已归集数',
          align: 'center',
          prop: 'resrccollection',
        }, {
          label: '关联信息系统数',
          align: 'center',
          prop: 'intersystem',
        },
     ],
   }, {
    label:'信息项信息',
    prop:'infoInfo',
    align: 'center',
    children: [
      {
        label: '总数',
        align: 'center',
        prop: 'elementsum',
      }, {
        label: '有条件共享数',
        align: 'center',
        prop: 'conditional',
      }, {
        label: '无条件共享数',
        align: 'center',
        prop: 'unconditional',
      }, {
        label: '不予共享数',
        align: 'center',
        prop: 'deny',
      }, {
        label: '已开放数',
        align: 'center',
        prop: 'opennum',
      }, {
        label: '已归集数',
        align: 'center',
        prop: 'elementcollection',
      },
    ],
   },
 ],
}