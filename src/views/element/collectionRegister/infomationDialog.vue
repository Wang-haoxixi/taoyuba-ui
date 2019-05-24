<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :isBtnGroup="false"
    title="信息资源"
    @closed="handleClosed">
    <avue-crud ref="table" :data="mainTableData" :option="tableOption">
      <template slot-scope="scope" slot="menu">
        <gov-button type="text" @click="handleSubmit(scope.row)" text="提交" v-if="scope.row.status !== '3'"></gov-button>
        <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
        <gov-button type="text" @click="handleUpdate(scope.row)" text="修改"></gov-button>
        <gov-button type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
      </template>
    </avue-crud>
    <informationDialog
      ref="informationDialog"
      :options="options"
      :temp="formData"
      @success="getList"
      :status="dialogStatus"></informationDialog>
  </gov-dialog>
</template>

<script>
import { informationTableOption } from './const/index'
import informationDialog from '../information/informationDialog'

import {
  deleteInformation,
  getSysId,
  getDeptId,
  submitInformation,
  getList,
  } from '@/api/element/element'
export default {
  components: {informationDialog},
  data () {
    return {
      mainTableData: [],
      formData: {},
      dialogStatus: '',
      options: {
        surveyIdList: [], // 所属系统名称
        status: [
          {value: '1', label: '待完善'},
          {value: '2', label: '未提交'},
          {value: '3', label: '已提交'},
          {value: '4', label: '注销待审核'},
          {value: '5', label: '审核不通过'},
          {value: '6', label: '已注销'},
        ], // 状态
        isOpen: [], // 开放属性
        deptId: [], // 资源提供方
        id: 0,
      },
    }
  },
  props: {
    
  },
  computed: {
    tableOption () {
      return informationTableOption
    },
  },
  methods: {
    open (id) {
      this.id = id
      this.getList().then(()=>{
        this.$refs['dialog'].open()
      })
    },
    getList () {
      return new Promise((resvole) => {
        getList({id: this.id}).then(res=>{
          this.mainTableData = res.data.data.records
          resvole()
        })
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 查看详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = { ...row }
      this.$refs['informationDialog'].open()
    },
    // 列表提交
    handleSubmit (row) {
      let params = {
        id: row.id,
        status: 3,
      }
      this.$confirm('确定要提交吗').then(() => {
        submitInformation(params).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.getList()
          }
        })
      }).catch(() => {})
    },
    // 列表编辑
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.formData = { ...row }
      this.$refs['informationDialog'].open()
    },
    // 列表删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteInformation({id: [row.id]}).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
    getSysIdData () {
      getSysId().then(({data}) => {
        let res = data
        let arr = []
        for (let key in res) {
          arr.push({value: String(key), label: res[key]})
        }
        this.$set(this.options, 'surveyIdList', arr)
        // this.options.surveyIdList = arr
      })
    },
    // 资源提供方
    getDeptIdData () {
      getDeptId().then(({data}) => {
        let res = data
        let arr = []
        if (!Array.isArray(res)) {
          return
        }
        res.forEach((item) => {
          arr.push({value: String(item.id), label: item.name})
        })
        this.options.resType = arr
        this.options.deptId = arr
      })
    },
    // 关闭弹窗后操作
    handleClosed () {

    },
  },
  created () {
    this.getSysIdData()
    this.getDeptIdData()
  },
}
</script>
