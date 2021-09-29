<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔船名：" prop="shipName">
              <el-input v-model="form.shipName" @blur="change()"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="简历名字：" prop="resumeName">
              <el-input v-model="form.resumeName"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="form.phone" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      
       
        <el-row>
          <el-col :span="12">
           <el-form-item label="持证人姓名：" prop="shipowner">
              <el-input v-model="form.shipowner"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶类数量：" prop="driverQuantity">
              <el-input v-model="form.driverQuantity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="轮机类数量：" prop="engineQuantity">
              <el-input v-model="form.engineQuantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="普通船员数量：" prop="normalQuantity">
              <el-input v-model="form.normalQuantity"></el-input>
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
import { getById, update,create,change } from '@/api/post/resume'
// import { getArea } from '@/api/post/address'
import { initForm, rules, dictsMap } from '../options'
import information from '@/mixins/information'
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
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
      },   
      rules,
      form: initForm(),
      provinces: [],
      citys: [],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '发布'
    },
  },
  created () {
    console.log(this.id)
    if (this.id) {
      getById(this.id).then(({ data }) => {
        this.form = data.data
        // this.form.education = this.form.education.toString()
        // this.form.foreignLanguage = this.form.foreignLanguage.toString()
        // this.form.postion = this.form.postion.toString()
        // this.form.seniority = this.form.seniority.toString()
        // this.form.workRequire = this.form.workRequire.toString()
        // this.selectCity()
      })
    }
   
  },
  mounted () {
        // 判断禁止Input用自己的名字和手机
    // this.getInformation('form',['contactPhone','realName'])
  },
  methods: {
    // getProvince () {
    //   getArea(0).then(({ data }) => {
    //     this.provinces = data.data.map(item=>{
    //       return {
    //         label: item.name,
    //         value: item.areaCode,  
    //       }
    //     })
    //   })
    // },
    // getCity () {
    //   getArea(this.form.province).then(({ data }) => {
    //     this.citys = data.data.map(item=>{
    //       return {
    //         label: item.name,
    //         value: item.areaCode,  
    //       }
    //     })
    //   })
    //   this.form.city = ''
    // },
    // selectCity () {
    //     getArea(this.form.province).then(({ data }) => {
    //     this.citys = data.data.map(item=>{
    //       return {
    //         label: item.name,
    //         value: item.areaCode,  
    //       }
    //     })
    //   })
    // },
    change (){
       change(this.form.shipName).then(({ data }) => {
         if(data.data==false){
           this.form={}
           this.$forceUpdate() 
            this.$message({
                message: '未查询到此船',
                type: 'warning',
              })
              return
         }
         if(data.data.shipowner){
            this.form.shipowner = data.data.shipowner
         }         
					this.form.phone = data.data.mobile
					this.form.shipId = data.data.shipId
          this.$forceUpdate() 
           })
    },
    onGoBack () {
      this.$router.push({
        path: '/hrms_spa/bot_admin_list',
      })  
    },
    handleSubmit () {

      // const submitFunction = this.id ? putResume : addResume
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.id){
              update(this.form).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.onGoBack()
            }
           })
          }else{
            if(this.form.shipId){
               create(this.form).then(({ data }) => {
             if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.onGoBack()
             }
            })
            }else{
               this.$message({
                message: '请填写完整数据',
                type: 'warning',
              })
            }
           
          }
           
        }
      })

    },
  },
}
</script>