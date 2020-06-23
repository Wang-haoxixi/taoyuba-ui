<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <el-form :disabled="type === 'view'" ref="form" :model="form" :rules="rules" label-width="150px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="realname">
              <el-input maxlength="20" v-model="form.realname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证：" prop="idcard">
              <el-input maxlength="80" v-model="form.idcard">         
              </el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
            <el-form-item label="类型：" prop="bindType">       
             <el-select v-model="form.bindType" placeholder="请选择">   
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>                      
              <el-col :span="12">   
              <el-form-item  label="身份证照片：" prop="idcardPhoto">     
                <el-upload
                  class="avatar-uploader"
                  action="/api/admin/file/upload/avatar"      
                  :show-file-list="false"                                                                                                                               
                  :on-success="handleAvatarSuccessidcard" :headers="headers"  accept="image/*">            
                  <img v-if="form.idcardPhoto" :src="form.idcardPhoto" class="avatar">          
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>                                      
                </el-upload>
              </el-form-item>     
          </el-col>
             <el-col :span="12">       
            <el-form-item label="渔船证书：" prop="shipCertPhoto">                        
                  <el-upload
                  class="avatar-uploader"
                  action="/api/admin/file/upload/avatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessShip" :headers="headers"  accept="image/*">
                  <img v-if="form.shipCertPhoto" :src="form.shipCertPhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="" v-if="type !== 'view'">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>        
import { getShiphaverDetail, saveShiphaver, editShiphaver} from '@/api/tmlms/shiphaver'
import { initForm , rules } from '../options'
import store from '@/store'
export default {
  data () {
    return {                  
      backOption: {         
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),                     
      init: false,
      arr:[],
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      options: [{           
            value: 1,
            label: '持证人',
      },{
            value: 2,
            label: '经营人',            
      }, {
            value: 3,
            label: '经营人家属',                
      }],     
    }                               
  },
  computed: {                                                                                                                                                               
    type () {
      return this.$route.params.type
    },
    shiphaverId () {
      return this.$route.params.id    
    },
    getTitle () {                                                                     
      return `渔船经营人${this.type === 'create' ? '新增' : this.type === 'update' ? '编辑' : ''}`
    },
  },
  created () {                                                        
    if (this.type !== 'create' && this.shiphaverId) {                                          
      this.getShiphaverDetail()
    } else {        
          //
    }
  },
  methods: {                                                                                                                                                                                                                                                                                                                     
    getShiphaverDetail () {                                      
      getShiphaverDetail(this.shiphaverId).then(({data}) => {
        if (data.code === 0)  this.form = data.data 
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    handleSubmit () {   
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.type === 'create') {
            saveShiphaver(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('添加成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          } else if (this.type === 'update') {      
            editShiphaver(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('修改成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          }
        } else {
          this.$message.error('请按规则输入填写表单！')
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)       
    },
  handleAvatarSuccessidcard (response) {
      this.form.idcardPhoto = response.data.url
    },
    handleAvatarSuccessShip (response) {
      this.form.shipCertPhoto = response.data.url
    },
  },
}
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px solid #CCC;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
    width: 356px;
    height: 178px;
    display: block;
  }
  .certAvatar {
    width: 80px;
    height: 30px;
    display: block;
  }
</style>