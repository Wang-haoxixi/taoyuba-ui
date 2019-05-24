import {
    getDic,
  } from '@/util/dic'
  export const tableOption = {
    addBtn: false,
    editBtn: false,
    delBtn: false,
    header: false,
    menu: false,
    selection: false,
    menuWidth: '180',
    indexLabel: '序号',
    page: false,
    index: false,
    align: 'center',
    border: false,
    height: '300',
    column: [
      {
        label: '信息资源名称',
        prop: 'name',
        span: 24,
        maxlength: 50,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      },
      {
        label: '状态',
        prop: 'status',
        type: 'dic',
        dicData: getDic('INFORMATION_STATUS'),
        solt: true,
      },
      {
        label: '操作',
        prop: 'menu',
        span: 24,
        solt: true,
        maxlength: 50,
      },
    ],
  }
  
  export const tableOptionChild = {
    addBtn: false,
    editBtn: false,
    delBtn: false,
    header: false,
    menu: false,
    selection: true,
    menuWidth: '180',
    indexLabel: '序号',
    index: false,
    align: 'center',
    border: false,
    height: '300',
    column: [
      {
        label: '信息资源名称',
        prop: 'name',
        span: 24,
        maxlength: 50,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      },
      {
        label: '状态',
        prop: 'status',
        type: 'dic',
        dicData: getDic('INFORMATION_STATUS'),
      },
    ],
  }
  