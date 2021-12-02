<template>
  <div class="training_detail">
    <basic-container v-if="show">
      <div style="display: flex">
        <h1 v-if="!$route.query.userId" style="flex: 1">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}机构信息</h1>
        <h1 v-if="$route.query.userId" style="flex: 1">完善个人信息</h1>
        <el-button size="mini" style="width: 60px; height:35px" @click="$router.go(-1)">返回</el-button>
      </div>  
        <el-form :model="training" ref="form" label-width="150px" :rules="rules" style="margin-top: 30px">
          <el-row>
            <el-col :span="12">            
              <el-form-item label="机构名称:" prop="deptName">
                <el-input v-model="training.deptName" placeholder="" v-if="!$route.query.see" size="mini"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="training.contactName" placeholder="" v-if="!$route.query.see" size="mini"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="training.phone" placeholder="" v-if="!$route.query.see" size="mini"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
              <el-col :span="12">        
              <el-form-item label="座机号码:" prop="landlinePhone">
                <el-input v-model="training.landlinePhone" placeholder="" v-if="!$route.query.see" size="mini"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
             <el-col :span="24">        
              <el-form-item label="培训范围:" prop="trainGroup">           
                <el-checkbox-group v-model="trainGroup" @change="handleChange">
                      <el-checkbox-button v-for="trainService in trainServices" :label="trainService" :key="trainService">{{trainService}}</el-checkbox-button>
                  </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">           
              <el-form-item label="机构地址:" prop="address" class="amap-page-container is-required">
                <el-amap-search-box class="search-box training" :search-option="searchOption" :on-search-result="onSearchResult" style="width: 450px; height:30px;margin-top: 10px"></el-amap-search-box>
                <el-amap vid="amapDemo" :center="mapCenter" :zoom="15" class="amap-demo" :plugin="plugin">
                  <el-amap-marker :position="marker"></el-amap-marker>
                </el-amap>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="margin-left: 150px">
          <el-button size="mini" type="primary" @click="save" v-if="!$route.query.see">提交</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { saveTraining, editTraining, detailTraining } from '@/api/tmlms/Training'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
export default {
  data () {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
          callback()
        }
      }
    return {
        show: false,
        training:{
            trainScope:'',
        },
        trainGroup:[],
        rules: {
            deptName: [
                { required: true, message: '请输入机构名称', trigger: 'blur' },
            ],
            contactName: [
                { required: true, message: '请输入联系人', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '请输入联系电话', trigger: 'blur' },
                { validator: checkPhone, trigger: 'blur' },
            ],
            landlinePhone: [    
                { required: true, message: '请输入座机电话', trigger: 'blur' },
            ],
        },
        options: [],
        // 地图配置
        marker: [121.59996, 31.197646],
        searchOption: {
            city: '全国',
            citylimit: false,
        },
        mapCenter: [121.59996, 31.197646],
        plugin: [
        ],
        trainServices:[
              'GMDSS无线电操作员培训',
              '外海二级及以下渔业职务船员岗位适任培训',
              '普通船员培训',
              '海洋机驾长培训',
              '远洋一级渔业职务船员岗位适任培训',
              '外海一级渔业职务船员岗位适任培训',
              '电机员培训',
        ],
       }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let type = 1
            if(this.$route.query.edit){
              let data = JSON.parse(JSON.stringify(this.training))
              data.lat = this.marker[1]
              data.lng = this.marker[0]
              data.address = document.getElementsByClassName(
              'search-box-wrapper'
            )[0].childNodes[0].value
            if(!data.address){
              this.$message.error('地址不能为空!')
              return false
            }
            if(this.trainGroup.length === 0){
                this.$message.error('请选择至少一个培训范围!')    
                return false
            }
            data.trainScope = this.trainGroup.join(',')   
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              editTraining(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.go(-1)
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }else {
              let data = JSON.parse(JSON.stringify(this.training))
              data.lat = this.marker[1]
              data.lng = this.marker[0]
              data.address = document.getElementsByClassName(
              'search-box-wrapper'
            )[0].childNodes[0].value
            if(!data.address){
              this.$message.error('地址不能为空!')
              return false
            }     
           if(this.trainGroup.length === 0){
                this.$message.error('请选择至少一个培训范围!')    
                return false
            }
            data.trainScope = this.trainGroup.join(',')   
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              saveTraining(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.go(-1)
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }
          } else {
          return false
        }
      })
    },
    onSearchResult (pois) {
        this.mapCenter = [pois[0].lng, pois[0].lat]
        this.marker = [pois[0].lng, pois[0].lat]
    },
    handleChange (value) {   
          this.training.trainScope = value.join(',')
    },
  },
  computed: {
  },
  created () {
        lazyAMapApiLoaderInstance.load().then(() => {
              setTimeout(()=>{ 
                  this.show = true
                  if(this.$route.query.edit || this.$route.query.see || this.$route.query.userId){                                                    
                  detailTraining(this.$route.query.edit || this.$route.query.see || this.$route.query.userId).then( res=>{
                    this.training = res.data.data
                    //checkbox
                    if(this.training.trainScope){
                          this.trainGroup = this.training.trainScope.split(',')
                    }
                    document.getElementsByClassName(            
                      'search-box-wrapper'
                    )[0].childNodes[0].value = this.training.address
                    this.mapCenter = [this.training.lng,this.training.lat]
                    this.marker = [this.training.lng,this.training.lat]
                    this.show = true
                  })
                }
              }, 100)
        })
  },
}
</script>
<style lang="scss" scoped>
::v-deep .el-checkbox-button{
  margin-right: 10px !important;
  margin-bottom: 10px !important;
  .el-checkbox-button__inner{
    border: 1px solid #DCDFE6 !important;
    box-shadow:none !important
  }
}
.el-form {
  margin-right: 16%;
}
.training_detail {
    .amap-demo {
        height: 300px;
        margin-top: 60px;
    }
    .search-box {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
    }
    .amap-page-container {
        position: relative;
    }
    .amap-logo {
        display: none;
    }
    .el-vue-search-box-container .search-tips {
        position: absolute;
        top: 100%;
        border: 1px solid #dbdbdb;
        background: #fff;
        overflow: auto;
        height: 300px;
        overflow: auto;
    }
}
</style>

