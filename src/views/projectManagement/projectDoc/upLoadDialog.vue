<template>
  <gov-dialog
    ref="dialog"
    width="85%"
    @handleSubmit="handleSubmit"
    @handledDraftSubmit="handledDraftSubmit"
    @closed="handleClosed"
    :isBtnGroup=true
    :btnGroup="btnGroups"
    title="上传">
    <gov-layout-form>
      <template>
        <el-row class="wrap" v-loading="loading">
          <el-col :span="15" class="upLoad_wrap">
            <div>
              <el-row>
                <el-col
                  class="upload_item_wrap"
                  :span="11"
                  v-for="(item, index) in stepList.uploadItems"
                  :key="index"
                  :style="{marginRight:index % 2 === 1? '0': '25px'}">
                  <up-load
                      :title="item.required?item.title + '(必填)':item.title"
                      :action="item.action"
                      :field="item.field"
                      :fileList="form[getStepKey][item.field]"
                      @handle-change="handleSuccess"
                  ></up-load>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="9" class="change_wrap">
            <el-row>
              <div class="step_wrap">
                <div class="btn_wrap">
                  <gov-button
                    v-for="item in step"
                    :key="item"
                    size="small"
                    :circle="true"
                    :text="item"
                    :type="present === item?'primary':''"
                    @click="btnClick(item)"
                  ></gov-button>
                </div>
                <div class="iconFont">
                  <i class="iconfont icon-cz-shtongguo"></i>
                  <p>{{presentName}}</p>
                </div>
                <div class="timeStage">
                  <el-form :model="form" label-width="200px" width="500px" v-if="stepList.dateItems">
                    <el-form-item
                      v-for="(item, index) in stepList.dateItems"
                      :key="index"
                      :label="item.label">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="form[getStepKey][item.field]"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
  // import { getDic } from '@/util/dic'
  import { updateDocAll } from '@/api/projectManagement/projectDoc'
  import mixin from "@/mixins/mixin"
  import { getAllPhaseForm } from '@/api/projectManagement/projectDoc'
  import upLoad from './upLoad'
  export default {
    mixins: [mixin],
    data () {
      return {
        pickerOptions: {
          onPick :'dataChange',
        },
        stepList:[],
        filed: '', // 当前阶段字段
        dateItems: [], //存放当前时间列表
        loading: false,//加载动画哟
        present: 1,//当前步骤
        step: 6, //总步骤数 一共六步（按钮个数）
        presentName: '',//当前步骤对应名字
        form: {
          id: '',
          baseMaterialJson: {},
          projectApprovalJson: {},
          procurementJson: {},
          implementJson: {},
          acceptanceAndPaymentJson: {},
          projectPerformanceJson: {},
        },
        form1: [],
        form2: [],
        form3: [],
        form4: [],
        form5: [],
        form6: [],
        allData: {},
        btnGroups: [
          {
            label: '保存草稿',
            name: 'saveDraftButton',
            type: 'primary',
            show: true,
            disabled: false,
            fn: 'handledDraftSubmit',
          },
          {
            label: '保 存',
            name: 'saveButton',
            type: 'primary',
            show: true,
            disabled: false,
            fn: 'handleSubmit',
          },
          {
            label: '取 消',
            name: 'cancalButton',
            show: true,
            type: 'default',
            disabled: false,
            fn: 'handleCancel',
          },
        ],
        requiredStep: [],//当前阶段中必填文件步骤
        requiredTime: [],
        pass: true,
      }
    },
    components:{ upLoad },
    watch: {
      present:{
        handler (newValue) {
          switch(newValue){
            case 1: this.presentName = '基础材料';break
            case 2: this.presentName = '立项阶段';break
            case 3: this.presentName = '采购阶段';break
            case 4: this.presentName = '实施阶段';break
            case 5: this.presentName = '验收与支付';break
            case 6: this.presentName = '项目绩效';break
          }
        },
        deep: true,
        immediate: true,
      },
    },
    created (){
      //将必填项过滤得到
      this.getAllForm()
    },
    methods: {
      getAllForm () {
        getAllPhaseForm().then(({data}) => {
          data.forEach((item,index) => {
            item.uploadItems.forEach(upload => {
              upload.action = "/api"+upload.action
            })
            this['form'+(index+1)] = item
          })
          this.presentName = '基础材料'
          this.filterRequired(data)
        })
      },
      dataChange (){
        return null
      },
      /*
      * 选择或移除文件成功 执行
      * fileObj{ field:保存的文件列表名称,fileList:这一步中的文件列表 , res}
      * */
      handleSuccess (fileObj){
        let {fileList, field} = fileObj
        let list = []
        fileList.forEach((item) => {
          list.push({
            name: item.name,
            url: item.response.url,
          })
        })
        this.form[this.getStepKey][field] = [...list]
      },
      //切换步骤
      btnClick (present){
        this.stepList = {}
        this.present = present
        this.stepList = this['form'+present]
      },
      //过滤必填项
      filterRequired (list){
        //先清空
        this.requiredStep = []
        this.requiredTime = []
        list.forEach((item) => {
          item.dateItems.forEach((v) => {
            if(v.required){
              this.requiredTime.push(v.field)
            }
          })
          item.uploadItems.forEach((v) => {
            if(v.required){
              this.requiredStep.push(v.field)
            }
          })
        })
        this.loading = false
      },
      handleSubmit () {
        let requiredStepLack = Object.assign([], this.requiredStep)
        let requiredTimeLack = Object.assign([], this.requiredTime)
        let formData = Object.assign({}, this.form)
        delete formData.parentId
        delete formData.id
        let indexD = 0
        this.requiredStep.forEach((v, index) => {
          for (let key in formData) {
            if (formData[key][v] && formData[key][v].length > 0) {
              requiredStepLack.splice(index - indexD, 1)
              indexD++
            }
          }
        })
        indexD = 0
        this.requiredTime.forEach((v, index) => {
          for (let key in formData) {
            if (formData[key][v] && formData[key][v].length > 0) {
              requiredTimeLack.splice(index - indexD, 1)
              indexD++
            }
          }
        })
        if(requiredStepLack.length === 0 && requiredTimeLack.length === 0){
          //转换为json字符串
          let formData = this.form
          let req = Object.assign({}, formData)
          req.baseMaterialJson = JSON.stringify(formData.baseMaterialJson)
          req.acceptanceAndPaymentJson = JSON.stringify(formData.acceptanceAndPaymentJson)
          req.implementJson = JSON.stringify(formData.implementJson)
          req.procurementJson = JSON.stringify(formData.procurementJson)
          req.projectApprovalJson = JSON.stringify(formData.projectApprovalJson)
          req.projectPerformanceJson = JSON.stringify(formData.projectPerformanceJson)
          updateDocAll(req).then(({data})=>{
            if (data.code == 0) {
              this.$message({
                message: '保存成功',
                type: 'success',
              })
              this.$emit('refreshPage',null)
              this.handleClosed()
            } else {
              this.$message({
                message: '保存失败,请联系管理员',
                type: 'error',
              })
            }

          })
        }else{
          this.$message({
            message: '您有必填项没填',
            type: 'danger',
          })
        }
      },
      handledDraftSubmit () {
        //转换为json字符串
        let formData = this.form
        let req = Object.assign({}, formData)
        req.baseMaterialJson = JSON.stringify(formData.baseMaterialJson)
        req.acceptanceAndPaymentJson = JSON.stringify(formData.acceptanceAndPaymentJson)
        req.implementJson = JSON.stringify(formData.implementJson)
        req.procurementJson = JSON.stringify(formData.procurementJson)
        req.projectApprovalJson = JSON.stringify(formData.projectApprovalJson)
        req.projectPerformanceJson = JSON.stringify(formData.projectPerformanceJson)
        updateDocAll(req).then(({data})=>{
          if (data.code == 0) {
            this.$message({
              message: '保存草稿成功',
              type: 'success',
            })
            this.$emit('refreshPage',null)
            this.handleClosed()
          } else {
            this.$message({
              message: '保存失败,请联系管理员',
              type: 'error',
            })
          }
        })
      },
      close () {
        this.$refs['dialog'].close()
      },
      handleClosed () {
        this.$nextTick(()=>{
          this.$refs['dialog'].close()
        })
      },
      initForm (form, data, num) {
        this['form' + num].uploadItems.forEach((item) => {
          form[item.field] = data[item.field] || []
        })
        this['form' + num].dateItems.forEach((item) => {
          form[item.field] = data[item.field] || ''
        })
      },
      //打开弹窗
      openDialog (formData) {
        this.allData = formData || {}
        if (this.allData.baseMaterialJson) {
          let itemData = JSON.parse(this.allData.baseMaterialJson)
          this.initForm(this.form.baseMaterialJson, itemData, 1)
        } else {
          this.initForm(this.form.baseMaterialJson, {}, 1)
        }
        if (this.allData.projectApprovalJson) {
          let itemData = JSON.parse(this.allData.projectApprovalJson)
          this.initForm(this.form.projectApprovalJson, itemData, 2)
        } else {
          this.initForm(this.form.projectApprovalJson, {}, 2)
        }
        if (this.allData.procurementJson) {
          let itemData = JSON.parse(this.allData.procurementJson)
          this.initForm(this.form.procurementJson, itemData, 3)
        } else {
          this.initForm(this.form.procurementJson, {}, 3)
        }
        if (this.allData.implementJson) {
          let itemData = JSON.parse(this.allData.implementJson)
          this.initForm(this.form.implementJson, itemData, 4)
        } else {
          this.initForm(this.form.implementJson, {}, 4)
        }
        if (this.allData.acceptanceAndPaymentJson) {
          let itemData = JSON.parse(this.allData.acceptanceAndPaymentJson)
          this.initForm(this.form.acceptanceAndPaymentJson, itemData, 5)
        } else {
          this.initForm(this.form.acceptanceAndPaymentJson, {}, 5)
        }
        if (this.allData.projectPerformanceJson) {
          let itemData = JSON.parse(this.allData.projectPerformanceJson)
          this.initForm(this.form.projectPerformanceJson, itemData, 6)
        } else {
          this.initForm(this.form.projectPerformanceJson, {}, 6   )
        }
        this.form.id = formData.id
        this.form.parentId = formData.parentId
        //this.getForm(1, false)
        this.btnClick(1)
        this.$refs["dialog"].open()
      },
    },
    computed: {
      getStepKey () {
        switch (this.present) {
          case 1:
            return 'baseMaterialJson'
          case 2:
            return 'projectApprovalJson'
          case 3:
            return 'procurementJson'
          case 4:
            return 'implementJson'
          case 5:
            return 'acceptanceAndPaymentJson'
          default:
            return 'projectPerformanceJson'
        }
      },
    },
  }
</script>

<style lang="scss">
  .wrap{
    width: 100%;
    margin: 20px 0;
    .upLoad_wrap{
      overflow: scroll;
      height: 495px;
      padding: 0 20px 0 20px;
      .upload_item_wrap{
        border: 1px solid #ccc;
        margin-right: 25px;
        margin-bottom: 20px;
        width: 48%;
      }
      .noMar{
        margin-right: 0;
      }
    }
    .change_wrap{
      .step_wrap{
        text-align: center;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding-top: 10px;
        .btn_wrap{
          button{
            padding: 0;
            width: 30px;
            height: 30px;
          }
        }
        .iconFont{
          i{
            height: 200px;
            line-height: 350px;
            color: #57a2c0;
            font-size: 60px;
          }
          p{
            margin:0 15px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ccc;
          }
        }
        .timeStage{
          height: 200px;
          box-sizing: border-box;
          padding-top: 50px;
          padding-right: 100px;
          overflow: scroll;
        }
      }
    }
  }
</style>
