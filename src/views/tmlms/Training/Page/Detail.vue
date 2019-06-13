<template>
  <div class="training_detail">
    <basic-container v-if="show">
        <h1>{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}机构信息</h1>
        <el-form :model="training" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="机构名称:" prop="deptName">
                <el-input v-model="training.deptName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="training.contactName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="phone">
                <el-input v-model="training.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ training.deptName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机构地址:" prop="address" class="amap-page-container is-required">
                <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" ></el-amap-search-box>
                <el-amap vid="amapDemo" :center="mapCenter" :zoom="15" class="amap-demo" :plugin="plugin">
                    <el-amap-marker :position="marker"></el-amap-marker>
                </el-amap>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.push({path: '/admin/training'})">返回</el-button>
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
          callback(new Error('请输入联系电话'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
          callback()
        }
      }
    return {
        show: false,
        training:{
        },
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
       }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
          if (valid) {
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
              editTraining(data).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.push({
                    path: '/admin/training',
                  })  
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
              saveTraining(data).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.push({
                    path: '/admin/training',
                  })  
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
  },
  computed: {
  },
  created () {
        lazyAMapApiLoaderInstance.load().then(() => {
              setTimeout(()=>{ 
                  this.show = true 
                  if(this.$route.query.edit || this.$route.query.see){
                  detailTraining(this.$route.query.edit || this.$route.query.see).then( res=>{
                    console.log(res)
                    this.training = res.data.data
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
<style lang="scss">
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
