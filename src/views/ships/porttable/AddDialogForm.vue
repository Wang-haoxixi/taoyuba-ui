<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}港口`" width="50%" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="港口名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="允许加入" prop="isOpen">
        <el-switch v-model="form.isOpen" :active-value="0" :inactive-value="1"></el-switch>
      </el-form-item> -->
      <!-- <el-form-item label="东经/度" prop="longitudeDegree">
        <el-input-number v-model="form.longitudeDegree" :min="1"  :max="179" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="东经/分" prop="longitudeBranch">        
        <el-input-number v-model="form.longitudeBranch"  :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="东经/秒" prop="longitudeSecond">
        <el-input-number v-model="form.longitudeSecond" :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="北纬/度" prop="latitudeDegree">
        <el-input-number v-model="form.latitudeDegree" :min="1"  :max="179" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="北纬/分" prop="latitudeBranch">          
        <el-input-number v-model="form.latitudeBranch"  :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="北纬/秒" prop="latitudeSecond">
        <el-input-number v-model="form.latitudeSecond" :min="0" :max="59" :step="1" step-strictly></el-input-number>
      </el-form-item> -->
       <el-form-item label="东经" prop="longitude">
        <el-input @change="onInputLongitude" v-model="form.longitude" type="number" :min="0"></el-input>
        <!-- <el-input-number v-model="form.longitude" :step="1" :controls="false" :precision="2"></el-input-number> -->
      </el-form-item>
      <el-form-item label="北纬" prop="latitude">
        <el-input @change="onInputLatitude" v-model="form.latitude" type="number" :min="0"></el-input>
        <!-- <el-input-number v-model="form.latitude" :step="1" :controls="false" :precision="2"></el-input-number> -->
      </el-form-item>
      <el-form-item label="范围（海里）">
        <el-input @change="onInputDistance" v-model="form.distance" type="number" :min="0"></el-input>
        <!-- <el-input-number v-model="form.distance" :step="1" :controls="false" :precision="2"></el-input-number> -->
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button :loading="loadingStatus" type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      loadingStatus:false,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
        ],
        intro: [
          { required: true, message: '请填写组织描述', trigger: 'blur' },
        ],
        longitude: [
          { required: true, message: '东经不能为空', trigger: 'blur' },
        ],
        latitude: [
          { required: true, message: '北纬不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.isOpen=0
          this.loadingStatus = true
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
            this.loadingStatus=false
          })
        } else {
          return false
        }
      })
    },
    onInputLongitude (){
      if(this.form.longitude.includes('.') && this.form.longitude.split('.')[1].length>2){
        this.form.longitude=  this.form.longitude.substring(-1,this.form.longitude.length -(this.form.longitude.split('.')[1].length-2))
      }
    },
     onInputLatitude (){
       if(this.form.latitude.includes('.') && this.form.latitude.split('.')[1].length>2){
        this.form.latitude=  this.form.latitude.substring(-1,this.form.latitude.length -(this.form.latitude.split('.')[1].length-2))
      }
    },
     onInputDistance (){
       if(this.form.distance.includes('.') && this.form.distance.split('.')[1].length>2){
        this.form.distance=  this.form.distance.substring(-1,this.form.distance.length -(this.form.distance.split('.')[1].length-2))
      }
    },
  },
}
</script>
