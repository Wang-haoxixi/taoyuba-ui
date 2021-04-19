<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="交易审核" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="170px" size="small" :disabled="disabled">
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔船名：" prop="shipName">
              <el-input maxlength="20" v-model="form.shipName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渔船编号：" prop="shipNo">
              <el-input maxlength="50" v-model="form.shipNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔船所有权登记证书编号：" prop="licensesOwnerShip">
              <el-input maxlength="30" v-model="form.licensesOwnerShip"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船舶检验证书编号：" prop="licensesInspectionNo">
              <el-input maxlength="50" v-model="form.licensesInspectionNo"></el-input>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="捕捞许可证编号：" prop="licensesFishingNo">
              <el-input maxlength="50" v-model="form.licensesFishingNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国籍证书编号：" prop="licensesNationalNo">
              <el-input maxlength="50" v-model="form.licensesNationalNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主机总功率(kw)：" prop="engineTotalPower">
              <el-input  v-model="form.engineTotalPower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机功率(kw)：" prop="mainEnginePower">
              <el-input  v-model="form.mainEnginePower"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="双控功率(kw)：" prop="dualPower">
              <el-input  v-model="form.dualPower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机型号：" prop="mainEngineModel">
              <el-input  v-model="form.mainEngineModel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总吨位（吨）：" prop="grossTonnage">
              <el-input v-model="form.grossTonnage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船长（m）：" prop="hullLength">
              <el-input maxlength="6" v-model="form.hullLength"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="船体材料：" prop="hullMaterial">
              <el-select v-model="form.hullMaterial">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_ship_material"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船籍港：" prop="portRegister">
              <el-select v-model="form.portRegister">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_ship_port"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔具名称：" prop="fishingGear">
              <el-select v-model="form.fishingGear">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_fishing_gear"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建造完工日期：" prop="buildDate">
              <iep-date-picker v-model="form.buildDate" type="date" placeholder="选择日期"></iep-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="许可作业类型：" prop="activityType">
              <el-select v-model="form.activityType">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_resume_worktype"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="许可作用方式：" prop="workMode">
              <el-select v-model="form.workMode">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_work_mode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际作业方式：" prop="workMode2">
              <el-select v-model="form.workMode2">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_work_mode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="型宽（m）：" prop="mouldedBreadth">
              <el-input maxlength="6" v-model="form.mouldedBreadth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型深（m）：" prop="mouldedDepth">
              <el-input maxlength="6" v-model="form.mouldedDepth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="净吨位（吨）" prop="netTonnage">
              <el-input v-model="form.netTonnage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="造船厂：" prop="buildFactory">
              <el-input v-model="form.buildFactory"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="金额：" prop="sellPrice">
              <el-input v-model="form.sellPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所有权证书：">
                <el-image
                  v-for="(item,index) in form.licensesOwnerShipUrlList"
                  :key="index"
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="item" 
                  :preview-src-list="form.licensesOwnerShipUrlList">
                </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="国籍证(增加照片)：">
                <el-image
                  v-for="(item,index) in form.licensesNationalNoUrlList"
                  :key="index"
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="item" 
                  :preview-src-list="form.licensesNationalNoUrlList">
                </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="捕捞许可证(增加照片)：">
                <el-image
                  v-for="(item,index) in form.licensesFishingNoUrlList"
                  :key="index"
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="item" 
                  :preview-src-list="form.licensesFishingNoUrlList">
                </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="船舶检验证：">
                <el-image
                  v-for="(item,index) in form.licensesInspectionNoUrlList"
                  :key="index"
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="item" 
                  :preview-src-list="form.licensesInspectionNoUrlList">
                </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!disabled">
            <div style="width:170px;text-align:right">
                <el-button @click="addPeople" size="small">添加共有人信息</el-button>
            </div>
        </el-row>
        <el-row v-for="(item,index) in form.participants" :key="index">
          <el-col :span="11">
            <el-form-item label="共有人姓名：">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="共有人身份证：">
              <el-input v-model="item.idCard"></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="2" v-if="!disabled">
             <div style="text-align:right">
                <el-button @click="deletePeople(index)" size="small">删除</el-button>
             </div>
          </el-col>
        </el-row>
        <el-form-item label="" v-if="!disabled">
          <operation-wrapper style="text-align: center">
            <iep-button type="primary" @click="handleSubmit">审核通过</iep-button>
            <iep-button type="danger" @click="handle">审核驳回</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
      <el-dialog
        title="驳回理由"
        :visible.sync="dialogVisible"
        width="50%">
        <el-checkbox-group v-model="checkbox">
          <el-checkbox label="信息有误">信息有误</el-checkbox>
          <el-checkbox label="证件照片不规范">证件照片不规范</el-checkbox>
          <el-checkbox label="其他">
            其他<el-input v-model="input" placeholder="请输入内容" :disabled="checkbox.indexOf('其他') === -1" style="margin-left: 10px"></el-input>
          </el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="refute">确 定</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>
<script>        
import { agree,noAgree } from '@/api/ships/index'
import { rulesDeatil } from '../options'
export default {
  data () {
    return {
        form: {
            participants:[],
        },
        disabled: false,
        rules: rulesDeatil,
        backOption: {
            isBack: true,
            backPath: null,
            backFunction: () => { this.back() },
        },
        dialogVisible: false,
        checkbox: [],
        input: '',
    }                               
  },
  computed: {                                                                                                                                                               

  },
  created () {
  },
  mounted () {                    
  },
  methods: {
      handleSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            agree(this.form).then(()=>{
                this.$message.success('操作成功!')
                this.$emit('getList')
                this.$emit('back')
            })
          } else {
            return false
          }
        })
      },
      handle () {
        this.dialogVisible = true
        // this.$prompt('请输入驳回理由', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     inputPattern: /\S/,
        //     inputErrorMessage: '驳回理由不能为空',
        // }).then(({ value }) => {
        //     let data = {
        //         auditState: '4',
        //         ids: [this.form.id],
        //         rejectReason: value,
        //     }
        //     noAgree(data).then(()=>{
        //         this.$message.success('操作成功!')
        //         this.$emit('getList')
        //         this.$emit('back')
        //     })
        // })
      },
      refute () {
        if( this.checkbox.length === 0 ){
          this.$message.warning('驳回理由不能为空!')
          return false
        }
        let value = ''
        this.checkbox.forEach(element => {
          if( element === '其他' ){
            value = value + this.input + ','
          }else{
            value = value + element + ','
          }
        })
        let data = {
            auditState: '4',
            ids: [this.form.id],
            rejectReason: value,
        }
        noAgree(data).then(()=>{
            this.$message.success('操作成功!')
            this.$emit('getList')
            this.$emit('back')
        })
      },
      back () {
          this.$emit('back')
      },
      // 增加一个共有人
      addPeople () {
          if( this.form.participants !== undefined ){
                this.form.participants.push({idCard: '', name: ''})
          }else{
              this.$set(this.form,'participants',[{idCard: '',name: ''}])
          }
      },
      // 删除共有人
      deletePeople (index) {
          this.form.participants.splice(index,1)
      },
  },
  watch: {
  },
}
</script>