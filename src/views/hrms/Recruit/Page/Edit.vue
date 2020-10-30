<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12" v-if="manager">
            <el-form-item label="船名：" prop="shipName">
              <el-input v-model.trim="form.shipName" :disabled="haveInfo.shipName" @blur="onBlurShipName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contactName">
              <el-input v-model="form.contactName" :disabled="haveInfo.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘岗位：" prop="positionId">
              <iep-dict-select v-model="form.positionId" dict-name="tyb_resume_position"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="contactPhone">
              <el-input v-model="form.contactPhone" :disabled="haveInfo.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘人数：" prop="recruitNo">
              <el-input v-model="form.recruitNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月薪：" prop="salary">
              <el-select v-model="form.salaryCurrency" placeholder="请选择">
                <el-option v-for="item in salaryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- <el-input v-model="form.salary"></el-input> -->
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="货币种类：" prop="salaryCurrency">
              <el-select v-model="form.salaryCurrency" placeholder="请选择">
                <el-option v-for="item in salaryCurrencys" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="证书职务：" prop="certTitle">        
              <iep-dict-select v-model="form.certTitle" dict-name="tyb_crew_cert_title"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
           <el-form-item label="证书等级：" prop="certLevel">       
              <el-select v-model="form.certLevel" placeholder="请选择">
                <el-option v-for="item in level" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业方式：" prop="workMode">
              <iep-dict-select v-model="form.workMode" dict-name="tyb_resume_worktype">></iep-dict-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="上船地点：">
              <el-select v-model="form.province" placeholder="请选择" style="width: 33%!important" @change="getCity">
                <el-option v-for="item in provinces" prop='province' :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="form.town" placeholder="请选择" style="width: 33%!important" @change="getTown">
                <el-option v-for="item in towns" prop='town' :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="form.city" placeholder="请选择" style="width: 33%!important">
                <el-option v-for="item in citys" prop='city' :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select> 
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item type="number" label="船长（m）：" prop="hullLength">
              <el-input v-model="form.hullLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机总功率：" prop="totalPower">
              <el-input v-model="form.totalPower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄要求：" prop="ageRequire">
              <iep-dict-select v-model="form.ageRequire" dict-name="tyb_position_agerequirement">></iep-dict-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="船名：" prop="shipName" v-if="manager">
              <el-input v-model="form.shipName" ></el-input>
            </el-form-item>
          </el-col> -->
           <el-col :span="12">                       
           <el-form-item label="工作经验：" prop="workExprience">               
                <iep-dict-select v-model="form.workExprience" dict-name="tyb_work_exprience">></iep-dict-select>    
            </el-form-item>
           </el-col>
          <el-col :span="12">                          
            <el-form-item label="备注：" prop="remark" v-if="manager">                              
              <el-input   type="textarea" v-model="form.remark" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getRecruitById, addRecruit, putRecruit, getInfoByShipName} from '@/api/post/recruit'
import { getArea } from '@/api/post/address'
import { initForm, formToDto, rules, dictsMap } from '../options'
import information from '@/mixins/information'
import { getUserInfo } from '@/api/login'
export default {
  mixins: [information],
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      provinces: [],
      citys: [],
      towns: [],
      salaryCurrencys: [{
        value: '1',
        label: '人民币（RMB)',
      },{
        value: '2',
        label: '美元（USD）', 
      }],
      form: initForm(),
      level: [
          {
             value: '0', 
              label: '--',
          },      
          {
             value: '1', 
              label: '一级',
          },
          {
             value: '2',  
            label: '二级',
          },
          {
             value: '3',  
            label: '三级',
          },
      ],
      manager: false,
      userId: '',
      salaryList: [
        { label: '面议', value: '1' },
        { label: '4K以下', value: '2' },
        { label: '4-6K', value: '3' },
        { label: '6-8K', value: '4' },
        { label: '8K-10K', value: '5' },
        { label: '10K及以上', value: '6' },
      ],
    }
  },
  computed: {
    recruitId () {
      return +this.$route.params.recruitId
    },
    methodName () {
      return this.recruitId ? '编辑' : '发布'
    },
  },
  created () {
    if (this.recruitId) {
      getRecruitById(this.recruitId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        if (this.form.salary === 0) {
          this.form.salary = '面议'
        }
        this.form.recruitNo = this.form.recruitNo.toString()
        this.form.salary = this.form.salary.toString()
        this.form.hullLength = this.form.hullLength.toString()
        this.selectCity()
        this.selectTown()
      })
    }
    getUserInfo().then(res => {
      if (res.data.data.roles.includes(111)) {
        this.manager = true
      } else {
        this.manager = false
      }
      res.data.data.sysUser.userId
    })
    this.getProvince()
  },
  mounted () {
    // 判断禁止Input用自己的名字和手机
    this.getInformation('form',['contactPhone','contactName'])
  },
  methods: {
    // 通过渔船名查找信息
    onBlurShipName (e) {
      let value = e.target.value
      if (value) {
        getInfoByShipName(value).then(({ data }) => {
          if (data.code === 0) {
            let result = data.data
            this.form.contactName = result.shipowner // 联系人
            this.form.contactPhone = result.mobile // 联系电话
            this.form.hullLength = result.hullLength // 船长
            // this.form.totalPower = result. // 主机总功率
          }
        })
      }
     
    },
    getProvince () {
      getArea(0).then(({ data }) => {
        this.provinces = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,
          }
        })
      })
    },
    getCity () {
      getArea(this.form.province).then(({ data }) => {
        this.towns = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,  
          }
        })
      })
      this.form.city = ''
      this.form.town = ''
    },
    getTown () {
      getArea(this.form.town).then(({data}) => {
        this.citys = data.data.map(item => {
          return {
            label: item.name,
            value: item.areaCode,
          }
        })
      })
      this.form.city = ''
    },
    selectCity () {
      getArea(this.form.province).then(({ data }) => {
        this.towns = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,  
          }
        })
      })
    },
    selectTown () {
      getArea(this.form.town).then(({ data }) => {
        this.citys = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,  
          }
        })
      })
    },
    onGoBack () {
      this.$router.push({
        path: '/hrms_spa/recruit_list',
      })     
    },
    handleSubmit (isPublish) {
      const submitFunction = this.recruitId ? putRecruit : addRecruit
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          if (this.form.salary === '面议') {
            this.form.salary = 0
          }
          this.form.salaryCurrency = '1'
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `招聘信息${this.methodName}成功`,
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })

    },
  },
}
</script>