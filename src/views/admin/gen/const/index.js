/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

export const tableOption = {
  'border': false,
  'index': true,
  'stripe': false,
  'menuAlign': 'center',
  'align': 'center',
  'addBtn': false,
  'editBtn': false,
  'delBtn': false,
  'columnBtn': false,
  'refreshBtn': false,
  'buttonSearch': false,
  'header': false,
  'column': [{
    label: '表名称',
    prop: 'tableName',
    align: 'center',
    search: true,
  }, {
    label: '表注释',
    prop: 'tableComment',
    align: 'center',
  }, {
    label: '索引',
    prop: 'engine',
    align: 'center',
  }, {
    type: 'datetime',
    valueFormat: 'timestamp',
    format: 'yyyy-MM-dd hh:mm:ss',
    label: '创建时间',
    prop: 'createTime',
    align: 'center',
  }],
}

export const formOption = {
  menuBtn: false,
  column: [
    {
      label: '表名称',
      prop: 'tableName',
      readonly: true,
      span: 24,
    }, {
      label: '包名',
      prop: 'packageName',
      placeholder: '可为空，加载系统默认配置',
      span: 24,
    }, {
      label: '作者',
      prop: 'author',
      placeholder: '可为空，加载系统默认配置',
      span: 24,
    }, {
      label: '模块',
      prop: 'moduleName',
      placeholder: '可为空，加载系统默认配置',
      span: 24,
    }, {
      label: '表前缀',
      prop: 'tablePrefix',
      placeholder: '可为空，加载系统默认配置',
      span: 24,
    }, {
      label: '注释',
      prop: 'comments',
      placeholder: '可为空，加载表备注',
      span: 24,
    },
  ],
}