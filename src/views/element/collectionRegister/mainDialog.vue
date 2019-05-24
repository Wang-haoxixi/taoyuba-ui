<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :isBtnGroup="dialogOption.state !== 'detail'"
    :btnGroup="btnGroup"
    :title="dialogOption.title"
    @auditPass="auditPass"
    @auditRejected="auditRejected"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <layout-form>
      <div class="detail-wrapper">
        <template v-if="dialogOption.state === 'detail' || dialogOption.state === 'auditDetail'">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </template>
        <template v-else>
          <avue-form ref="form" v-model="form" :option="formOption"></avue-form>
        </template>
        <gov-button v-if="parseInt(form.collectStatus) >= 3" type="primary" @click="handleViewSql">查看SQL</gov-button>
        <avue-crud ref="table" :data="tableData" :option="tableOption">
          <template slot-scope="scope" slot="selection">
            <el-checkbox v-model="scope.row.sel" :disabled="scope.row.disabled"></el-checkbox>
          </template>
        </avue-crud>
      </div>
    </layout-form>
  </gov-dialog>
</template>

<script>
import { mainFormOption, tableOption } from './const/index'
import _ from 'lodash'
import { getSqlMap } from '@/api/element/collectionRegister'

export default {
  data () {
    return {
      form: {},
      tableData: [],
      tableOption: tableOption,
      defaultData: [{
        nameCn: "业务库数据产生时间",
        nameEn: "biz_time",
        defaults: "CURRENT_TIMESTAMP",
        itemTypeList: ['10', '1'],
        itemLength: '-',
        isNull: "2",
        isKey: "2",
        sel: true,
        disabled: true,
      }, {
        nameCn: "业务库数据产生时间",
        nameEn: "load_time",
        defaults: "CURRENT_TIMESTAMP",
        itemTypeList: ['10', '1'],
        itemLength: '-',
        isNull: "2",
        isKey: "2",
        sel: true,
        disabled: true,
      }],
      btnLoading: false,
    }
  },
  props: {
    dialogOption: {
      type: Object,
      default: ()=>{
        return {
          title: '详情',
          state: 'detail',
        }
      },
    },
    formData: {
      type: Object,
      default: ()=>{},
    },
    btnGroup: {
      type: Object,
      default: ()=>{
        return [
          {
            label: '取 消',
            type: 'default',
            fn: 'handleCancel',
          }, {
            label: '保 存',
            type: 'primary',
            fn: 'handleSubmit',
            loading: false,
          },
        ]
      },
    },
  },
  computed: {
    formOption () {
      return mainFormOption
    },
    detailOption () {
      return {
        option: [
          {
            column: mainFormOption.column,
          },
        ],
      }
    },
  },
  methods: {
    changeTableData () {
      if (this.form.dnaCollitems) {
        if (Array.isArray(this.form.dnaCollitems)) {
          this.tableData = this.form.dnaCollitems
        }
      }
      this.tableData = this.tableData.concat(this.defaultData)
    },
    open () {
      this.$nextTick(()=>{
        this.form = this.formData
        this.$refs['dialog'].open()
        this.$nextTick(()=>{
          this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
          this.changeTableData()
        })
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后回调
    handleClosed () {
      this.$emit('closed')
      this.$nextTick(()=>{
        this.tableData = []
        this.dialogOption.state === 'detail' || this.dialogOption.state === 'auditDetail' ? "" : this.$refs['form'].resetForm() 
      })
    },
    // 表格数据验证
    tableDataValidate (data) {
      if (!Array.isArray(data)) {
        return false
      }
      let state = false
      data.forEach(item=>{
        if(item.isKey === '1' && item.sel === true) {
          state = true
        }
      })
      return state
    },
    // 合并数据
    mergeFormData (form = {}, table = []) {
      let formData = _.cloneDeep(form)
      let tableData = _.cloneDeep(table)
      let tableData2 = []
      tableData.forEach(item=>{
        if(item.disabled !== true && item.sel === true) {
          tableData2.push(item)
        }
      })
      formData.itemList = this.tableData2
      return formData
    },
    // 表单提交
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        if(this.tableDataValidate(this.tableData) === true) {
          let formData = this.mergeFormData(this.form, this.tableData)
          if (this.dialogOption.state === 'reGenerate') {
            this.$emit('reGenerate', formData)
          } else {
            this.$emit('generate', formData)
          }
        } else {
          this.$message.error('请至少选择一条主键数据')
        }
      }).catch(() => {})
    },
    auditPass () {
      this.$emit('auditPass')
    },
    auditRejected () {
      this.$emit('auditRejected')
    },
    // 查看SQL
    handleViewSql () {
      getSqlMap(this.form.id).then(res=>{
        this.$alert(res.data.data, '查看SQL', {
          dangerouslyUseHTMLString: true,
        })
      })
    },
  },
}
</script>
