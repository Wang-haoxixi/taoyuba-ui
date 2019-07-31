<template>    
  <div class="contract-box">            
    <basic-container>
        <h1>{{ ifexist ? '编辑' : '新增' }}渔船保单信息</h1>                    
        <el-form :model="tybShipInsure" ref="form" label-width="150px" :rules="rules">          
          <el-row>                                 
            <el-col :span="12">
                <el-form-item prop="insurename" label="保单标题:">                                          
                       <el-input v-model="tybShipInsure.insurename"></el-input>   
                </el-form-item>   
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">           
                   <el-form-item  label="保单照片：" prop="image">        
                      <el-upload    
                        class="avatar-uploader"   
                        action="/api/admin/file/upload/avatar"    
                        :show-file-list="false"     
                        :on-success="handleAvatarSuccessReverse" :headers="headers"  accept="image/*">                   
                        <img v-if="tybShipInsure.image" :src="tybShipInsure.image" class="avatar"/>                  
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>        
                      </el-upload>    
                    </el-form-item>   
            </el-col>
          </el-row>   
        </el-form>  
        <div style="margin-left:3%" v-if="ifexist" class="year">                                                            
            <span>保单年份: {{tybShipInsure.insureDate}} </span>                                 
        </div>                                                                                                                      
        <div style="text-align:center">                                          
          <el-button @click="save">提交</el-button>                        
          <el-button @click="$router.go(-1)">返回</el-button>                                  
        </div>                      
    </basic-container>
  </div>
</template>   
<script>                                                                                                                                                                                                                                                                         
import { getByShipId, createShipinsure, updateShipinsure } from '@/api/ships/shipinsure'      
import store from '@/store'      
import { initdate} from '@/util/date'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
export default {                         
  data () {                                                                                                                                                            
    return {                                                                                        
      tybShipInsure:{
        id: '',
        shipId: '',
        insurename: '',
        image: '',
        insureDate: '',
      },
      rules: {    
        insurename: [   
            { required: true, message: '请输入保单标题', trigger: 'blur' },
          ],
          image: [
            { required: true, message: '请上传保单照片', trigger: 'blur' },
          ],   
      },    
      manager: false,
      ifexist: false,
       headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },           
  methods: {        
    // 提交表单
   save () {                 
      this.$refs['form'].validate((valid) => {    
          if (valid) {
             this.tybShipInsure.shipId = this.shipId             
            if(this.ifexist){         
              //编辑              
              this.tybShipInsure.insureDate  =   initdate                 
            let data = JSON.parse(JSON.stringify(this.tybShipInsure))                                                                                                          
              updateShipinsure(data).then(res=>{
                if(res.data.code === 0) {
                  this.$message({
                    message: '编辑成功',
                    type: 'success',
                  })
                  this.$router.go(-1) 
                }
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }else{  
              //新增                   
              let data  = JSON.parse(JSON.stringify(this.tybShipInsure))           
              createShipinsure(data).then(res=>{  
                if(res.data.code === 0) {       
                  this.$message({
                    message: '保存成功',
                    type: 'success',
                  })
                  this.$router.go(-1) 
              }
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }
          } else {
          return false
        }
      })
    },
    //回调图片地址      
    handleAvatarSuccessReverse (response) {
      this.tybShipInsure.image = response.data.url
    },
  },
  computed: {        
      shipId () {   
            return  this.$route.params.shipId
      },
  },      
  created () {              
    // 编辑新增放同一个组件 判断分别
      getAll.call(this)
    async function getAll () {          
      // 异步获取数据   
     await getByShipId(this.shipId).then( res=>{   
        if(res.data.code === 0 && res.data.data) {
          this.tybShipInsure = res.data.data
          if(this.tybShipInsure.id)  this.ifexist = true   
          console.log(this.tybShipInsure)     
        }                  
      })
  }
  },
}
</script>
<style lang="scss" scoped>    
  .avatar-uploader {    
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
