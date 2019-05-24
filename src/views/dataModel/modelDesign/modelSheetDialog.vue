<template>
  <!-- 模型表标准新增 -->
  <gov-dialog
    ref="dialog"
    @handleSubmit="handleSubmit"
    @closed="handleClosed"
    :title="dialogOption[status].title">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="formData" :option="detailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="mainForm" :option="modelSheetDialogForm" v-model="formData"></avue-form>
        </div>
      </template>
      <gov-layout-button-group>
        <template v-if="status !== 'detail'">
          <gov-button type="primary" @click="handleCreate">字段自定义新增</gov-button>
          <gov-button type="primary" @click="handleStandard">选择标准数据元</gov-button>
          <gov-button type="primary" @click="handleTemplate">选择模板数据元</gov-button>
        </template>
      </gov-layout-button-group>
    </gov-layout-form> 
   
    <avue-crud
      :table-loading="tableLoading"
      :data="mainTableData"
      :option="modelSheetDialogTableOption"
      :page="pagination"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="getList">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
          <template v-if="status !== 'detail'">
            <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="handleDelete(scope.row.$index)" type="text" size="small">删除</el-button>
          </template>  
        </div>
      </template>
    </avue-crud>
    <fieldDialog ref="fieldDialog" :title="fieldDialogTitle" :operationStatus="operationStatus" @submit="fieldDialogSubmit"></fieldDialog>
    <model-data-ele-dialog ref="modelDataEleDialog" :title="modelDataEleDialogTitle" :operationStatus="modelDataEleStatus" @submit="modelDataEleDialogSubmit"></model-data-ele-dialog>
    <model-standard-data-dialog ref="modelStandardDataDialog" :title="modelStandardDataDialogTitle" @submit="modelStandardDataDialogSubmit"></model-standard-data-dialog>
  </gov-dialog>
</template>

<script>
import constMixin from './const/mixin'
import { getDic, getDept } from '@/util/dic'
import { getDbList, getFieldData} from '@/api/dataModel/modelDesign'
import fieldDialog from './fieldDialog'
import modelDataEleDialog from './modelDataEleDialog'
import modelStandardDataDialog from './modelStandardDataDialog'

import mixin from "@/mixins/mixin"

export default {
  components: {fieldDialog, modelDataEleDialog, modelStandardDataDialog},
  mixins: [mixin, constMixin],
  data () {
    return {
      id:"",
      dialogOption: {
        detail: {
          title: '详情',
        },
        update: {
          title: '编辑',
        },
        create: {
          title: "新增",
        },
      },
      formData: {},
      dbList: [],
      mainTableData: [], // 主表数据
      fieldDialogTitle: '详情',
      modelDataEleDialogTitle: '字段自定义新增',
      modelStandardDataDialogTitle: '选择标准数据元',
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: this.modelSheetDialogForm.column,
          },
        ],
      }
    },
  },
  methods: {
    getList (formData) {
      this.tableLoading = true
      this.listQuery.tableId = formData.id
      getFieldData(this.listQuery).then(({data})=>{
        this.mainTableData = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    }, 
    open (formData) {
      if (formData.infoResrcChnNm) {
        this.formData.tableCn = formData.infoResrcChnNm
        this.formData.collId = formData.id
      }
      this.$refs['dialog'].open()
      getDbList().then(({data})=>{
        let dbListMap = []
        for (let item in data.data) {
          dbListMap.push({
            value: parseInt(item),
            label: data.data[item],
          })
        }
        this.dbList = dbListMap
        this.$nextTick(()=>{
          this.status !== 'create' ? this.formData = formData : ""
          this.status !== 'detail' ? this.$refs['mainForm'].clearValidate() : ""
        })  
        this.getList(formData)
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    getDic (dicName) {
      return getDic(dicName)
    },
    getDept () {
      return getDept()
    },
    // 字段自定义新增
    handleCreate () {
      this.fieldDialogTitle = '字段自定义新增'
      this.operationStatus = false
      this.$nextTick(()=>{
        this.$refs['fieldDialog'].open({})
      })
    },
    fieldDialogSubmit (formData) {
      let fieldNameValidate = true
      if (formData.fieldTypeItem.length < 2) {
        this.$message.error('请选择具体字段类型')
        fieldNameValidate = false
      }
      if (this.mainTableData.length > 0) {
        if (this.fieldDialogTitle === '字段自定义新增') {
          this.mainTableData.forEach((item) => {
            if (item.fieldCn === formData.fieldCn) {
              this.$message.error('已存在相同字段中文名')
              fieldNameValidate = false
            }
            if (item.fieldEn === formData.fieldEn) {
              this.$message.error('已存在相同字段英文名')
              fieldNameValidate = false
            }
            
          })
        }
      }

      if (fieldNameValidate === true) {
        if (formData.$index === 0 || formData.$index) {
          this.$set(this.mainTableData, formData.$index, {...formData})
        //this.$message.success('修改成功')
        } else {
          this.mainTableData.push({...formData})
        //this.$message.success('新增成功')
      }
      this.$refs['fieldDialog'].close()
      }
    },
    modelDataEleDialogSubmit (selectData) {
      if (selectData.length > 0) {
        for (var i=0 ; i<selectData.length ; i++ ){
          var arr = new Array()
          arr.push(selectData[i].dtTypeKey)
          var item = {"fieldCn": selectData[i].dtEleChnNm,"fieldEn": selectData[i].dtEleEgNm,"fieldTypeItem": arr,
            "fieldType": selectData[i].dtTypeKey,"fieldLength": selectData[i].dtLgth,
            "fieldDecimal":selectData[i].deciPl,"fieldNotes": selectData[i].remrk,
          }
          this.$set(this.mainTableData, this.mainTableData.length, {...item})
        }
      }
      this.$refs['modelDataEleDialog'].close()
    },
    modelStandardDataDialogSubmit (selectData) {
      if (selectData.length > 0) {
        for (var i=0 ; i<selectData.length ; i++ ){
          var arr = new Array()
          arr.push(selectData[i].dataType)
          var item = {"fieldCn": selectData[i].dataCn,"fieldEn": selectData[i].dataEn,"fieldTypeItem": arr,
            "fieldType": selectData[i].dataType,"fieldLength": selectData[i].dataLength,
            "fieldDecimal":"","fieldNotes": "",
          }
          this.$set(this.mainTableData, this.mainTableData.length, {...item})
        }
      }
      this.$refs['modelStandardDataDialog'].close()
    },
    // 选择标准数据元
    handleStandard () {
      this.modelStandardDataDialogTitle = '选择标准数据元'
      this.$nextTick(()=>{
        this.$refs['modelStandardDataDialog'].open()
      })
    },
    // 选择模板数据元
    handleTemplate () {
      this.modelDataEleDialogTitle = '选择模板数据元'
      this.modelDataEleStatus = false
      this.$nextTick(()=>{
        this.$refs['modelDataEleDialog'].open()
      })
    },
    handleDetail (rowData) {
      this.fieldDialogTitle = '字段自定义查看'
      this.operationStatus = true
      this.$nextTick(()=>{
        this.$refs['fieldDialog'].open({...rowData})
      })
    },
    handleUpdate (rowData) {
      this.fieldDialogTitle = '字段自定义修改'
      this.operationStatus = false
      this.$nextTick(()=>{
        this.$refs['fieldDialog'].open({...rowData})
      })
    },
    handleDelete (rowIndex) {
      this.$confirm('确定要删除吗').then(() => {
        this.mainTableData.splice(rowIndex, 1)
      }).catch(() => {})
    },
    handleSubmit () {
      this.$refs['mainForm'].validate().then(()=>{
        this.formData.dnaModelFieldDTOList = this.mainTableData
        this.status === 'create' ? this.$emit('submit', {...this.formData}) : ""
        this.status === 'update' ? this.$emit('update', {...this.formData}) : ""
      }).catch(()=>{})
    },
    handleClosed () {
      this.$emit("closed")
      this.$nextTick(()=>{
        this.mainTableData = []
        this.formData = {}
        this.status !== 'detail' ? this.$refs['mainForm'].resetForm() : ""      
      })
    },
  },
}
</script>
