<template>
  <gov-dialog
    ref="dialog"
    :title="'条件编辑'"
    :btnGroup="btnGroup"
    @handleSubmit="handleSubmit"
    @closed="handleClosed">
    <div class="detail-wrapper">
      <div class='smallTitle'>条件选择（点击选择条件）</div>
      <div>
        <el-tag class="curP mb10" @click="addCondition(item)" v-for="(item,index) in tableData" :key="index">
        {{item.optionFieldCN + ' ' + item.selectionConditionCN + ' ' + item.valueCN}}
        </el-tag>
      </div>
      <div class="smallTitle">连接符选择（点击选择连接符）</div>
      <div>
        <el-tag class="curP mb10" type="success" @click="addConnect(item)" v-for="(item,index) in connectData" :key="index">{{item.label}}</el-tag>
      </div>
      <div class="smallTitle">配置运算条件</div>
      <gov-layout-button-group>
        <gov-button type="default" @click="handleReset">清空</gov-button>
      </gov-layout-button-group>
      <div class="height_120">
        <el-tag
          class="mb10"
          closable
          :disable-transitions="true"
          v-for="(item,index) in conditionDetail"
          :key="index"
          :type="item.type === '1' ? 'default' : 'success' "
          @close="handleClose(index)"
        >
          {{item.label}}
        </el-tag>
      </div>
    </div>
  </gov-dialog>
</template>

<script>
import {
  getDic,
} from '@/util/dic'
import { createCondition } from '@/api/infoSystem/diagnosis'
export default {
  name: 'conditionDialog',
  mixins: [],
  data () {
    return {
      tableData: [],
      connectData: getDic('DIAGNOSE_CONNECTOR'),
      id: null,
      conditionDetail: [],
      btnGroup: [
        {
          label: '保存',
          type: 'primary',
          fn: 'handleSubmit',
        },
        {
          label: '取 消',
          type: 'default',
          fn: 'handleCancel',
        },
      ],
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open (formData) {
      formData.length ? this.tableData = this.transTableData(formData) : ''
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    addCondition (item) {
      this.conditionDetail.push({
        ...item,
        label: item.optionFieldCN + ' ' + item.selectionConditionCN + ' ' + item.valueCN,
        type: "1",
      })
    },
    addConnect (item) {
      this.conditionDetail.push({
        ...item,
        label: item.label,
        type: "2",
      })
    },
    handleClose (index) {
      this.conditionDetail.splice(index,1)
    },
    transTableData (oldData) {
      // console.log(oldData)
      let newTableData = []
      for(let item of oldData){
        let optionFieldCN = this.getDicName(item.optionField,'DIAGNOSE_OPTION_FIELD')
        let selectionConditionCN = this.getDicName(item.selectionCondition,'DIAGNOSE_SELECTION_CONDITION')
        let valueCN = this.showValue(item.value,item.optionField)
        newTableData.push({
          ...item,
          optionFieldCN,
          selectionConditionCN,
          valueCN,
        })
      }
      return newTableData
    },
    //级联字典取值
    showValue (value,optionField) {
      let str = optionField.split('-')
      let res = ''
      if(str.length>1){
        let valueArr = getDic(str[1]) || []
        for(let item of valueArr){
          if(item.value == value){
            res = item.label
          }
        }
      }else{
        res = value
      }
      return res
    },
    getDicName (value, dicName) {
      let dic  = getDic(dicName)
      let str = ''
      for(let itemDic of dic){
        if(itemDic.value === value){
          str = itemDic.label
        }
      }
      // console.log('dic',dic,str)
      return str
    },
    //重置
    handleReset () {
      this.conditionDetail = []
    },
    handleSubmit () {
      console.log("待发送的结果",this.conditionDetail)
      let postData = {}
      for(let i=0;i<this.conditionDetail.length;i++){
        postData[i] = this.conditionDetail[i]
      }
      createCondition(postData).then(({data})=>{
        console.log("data",data)
        this.$emit('submit',data.data)
        this.$refs['dialog'].close()
      })
      // this.$refs['form'].validate().then(()=>{
      //   this.form._id ? '' :this.form._id = new Date().valueOf() //赋值虚拟Id以便列表增删改查
      //   // console.log(this.optionFieldType,this.form)
      //   this.$emit('submit', this.form, this.status, this.parentId)
      // }).catch(()=>{})
    },
    //关闭弹窗
    handleClosed () {
      this.tableData= []
      this.conditionDetail= []
    },
  },
}
</script>
<style lang="scss">
.smallTitle{
  line-height: 20px;
  font-size: 16px;
  color: #303133;
}
.curP{
  cursor: pointer;
}
.mb10{
  margin: 5px 15px 5px 0;
}
.height_120{
  min-height: 120px;
}
</style>
