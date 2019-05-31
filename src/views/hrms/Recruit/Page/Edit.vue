<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘岗位：" prop="positionId">
              <iep-dict-select v-model="form.positionId" dict-name="tyb_resume_position"></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="contactPhone">
              <el-input v-model="form.contactPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘人数：" prop="recruitNo">
              <el-input v-model="form.recruitNo"></el-input>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="薪水：" prop="salary">
              <el-input v-model="form.salary"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货币种类：" prop="salaryCurrency">
              <el-select v-model="form.salaryCurrency" placeholder="请选择">
                <el-option v-for="item in salaryCurrencys" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
           <el-form-item label="证书要求：" prop="certRequire">
              <iep-dict-select v-model="form.certRequire" dict-name="tyb_position_certtype"></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄要求：" prop="ageRequire">
              <iep-dict-select v-model="form.ageRequire" dict-name="tyb_position_agerequirement">></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业方式：" prop="workMode">
              <iep-dict-select v-model="form.workMode" dict-name="tyb_resume_worktype">></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上船地点：">
              <el-select v-model="form.province" placeholder="请选择" style="width: 50%!important" @change="getCity">
                <el-option v-for="item in provinces" prop='province' :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="form.city" placeholder="请选择" style="width: 50%!important">
                <el-option v-for="item in citys" prop='city' :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select> 
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否推荐：" prop="isRcmd">
              <el-radio-group v-model="form.isRcmd">
                <el-radio v-for="(item,i) in dictsMap.isRcmd" :key="i" :label="+i">{{item}}</el-radio>
              </el-radio-group>
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
import { getRecruitById, addRecruit, putRecruit} from '@/api/post/recruit'
import { getArea } from '@/api/post/address'
import { initForm, formToDto, rules, dictsMap } from '../options'
export default {
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
      salaryCurrencys: [{
        value: '1',
        label: '人民币（RMB)',
      },{
        value: '2',
        label: '美元（USD）', 
      }],
      form: initForm(),
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
        this.selectCity()
      })
    }
    this.getProvince()
  },
  mounted () {
  },
  methods: {
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
        this.citys = data.data.map(item=>{
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
        this.citys = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,  
          }
        })
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
    handleSubmit (isPublish) {
      const submitFunction = this.recruitId ? putRecruit : addRecruit
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
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