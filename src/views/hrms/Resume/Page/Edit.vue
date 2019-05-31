<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}简历`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布人：" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简历名字：" prop="resumeName">
              <el-input v-model="form.resumeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出身日期：" prop="birthday">
              <el-date-picker v-model="form.birthday" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker> 
            </el-form-item>       
          </el-col>       
          <el-col :span="12">
            <el-form-item label="现住地址：">
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
            <el-form-item label="联系电话：" prop="contactPhone">
              <el-input v-model="form.contactPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教育程度：" prop="education">
              <iep-dict-select v-model="form.education" dict-name="tyb_resume_education"></iep-dict-select>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-row>
          <el-col :span="12">
           <el-form-item label="期望月薪：" prop="expectSalary">
              <el-input v-model="form.expectSalary"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外语水平：" prop="foreignLanguage">
              <iep-dict-select v-model="form.foreignLanguage" dict-name="tyb_resume_language">></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身高CM：" prop="height">
              <el-input v-model="form.height"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否公开：" prop="isPublic">
              <el-radio-group v-model="form.isPublic">
                <el-radio v-for="(item,i) in dictsMap.isPublic" :key="i" :label="+i">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="原任职务：" prop="postion">
              <iep-dict-select v-model="form.postion" dict-name="tyb_resume_position">></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应聘职位：" prop="job">
              <iep-dict-select v-model="form.job" dict-name="tyb_resume_position">></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="航海经验：" prop="seniority">
              <iep-dict-select v-model="form.seniority" dict-name="tyb_resume_seniority">></iep-dict-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业要求：" prop="workRequire">
              <iep-dict-select v-model="form.workRequire" dict-name="tyb_resume_worktype">></iep-dict-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="特殊技能：" prop="skill">
              <el-input v-model="form.skill"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否推荐：" prop="isRcmd">
              <el-radio-group v-model="form.isRcmd">
                <el-radio v-for="(item,i) in dictsMap.isRcmd" :key="i" :label="+i">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <iep-form-item class="form-half" prop="workDetail" label-name="作业方式：">
          <iep-input-area v-model="form.workDetail"></iep-input-area>
        </iep-form-item>

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
import { getResumeById, addResume, putResume } from '@/api/post/resume'
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
      form: initForm(),
      provinces: [],
      citys: [],
    }
  },
  computed: {
    resumeId () {
      return +this.$route.params.resumeId
    },
    methodName () {
      return this.resumeId ? '编辑' : '发布'
    },
  },
  created () {
    console.log(this.resumeId)
    if (this.resumeId) {
      getResumeById(this.resumeId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.form.education = this.form.education.toString()
        this.form.foreignLanguage = this.form.foreignLanguage.toString()
        this.form.postion = this.form.postion.toString()
        this.form.seniority = this.form.seniority.toString()
        this.form.workRequire = this.form.workRequire.toString()
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
      const submitFunction = this.resumeId ? putResume : addResume
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `简历信息${this.methodName}成功`,
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