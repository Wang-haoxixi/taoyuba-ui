<template>
  <div class="training_detail">
    <basic-container>
        <h1 v-if="!$route.query.userId">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}主管单位信息</h1>
        <h1 v-if="$route.query.userId">完善个人信息</h1>
        <el-form :model="gov" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">            
              <el-form-item label="单位名称:" prop="govName">
                <el-input v-model="gov.govName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.govName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">            
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="gov.contactName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.contactName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">        
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="gov.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">        
              <el-form-item label="区域类型:" prop="regionType">
                <el-select v-if="!$route.query.see" v-model="gov.regionType" placeholder="请选择" @change="handleChange">
                  <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <div v-else>{{ gov.regionType }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位地址:" prop="address">
                <el-input v-model="gov.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ gov.address }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="cityVal || gov.regionType">
              <el-form-item label="所属行政区域：" prop="regionId">
                <el-cascader v-model="gov.regionId" :options="options" @active-item-change="handleItemChange" :props="props" v-if="!$route.query.see"></el-cascader>
                <div v-else>{{ gov.regionId }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { detailGov, saveGov, updateGov } from '@/api/tmlms/gov'
import { getArea, getAllArea, getAllAreaName, getInfo } from '@/api/post/address'
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
        gov:{
          govName: '',
          contactName: '',
          phone: '',
          address: '',
        },
        userId: '',
        typeList: [
          // {
          //   value: 1,
          //   label: '省',
          // },
          {
            value: 2,
            label: '市',
          },
          {
            value: 3,
            label: '县区',
          },
          {
            value: 4,
            label: '乡镇',
          },
          {
            value: 5,
            label: '村级',
          },
        ],
        rules: {
            govName: [
                { required: true, message: '请输入单位名称', trigger: 'blur' },
            ],
            contactName: [
                { required: true, message: '请输入联系人', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '请输入联系电话', trigger: 'blur' },
                { validator: checkPhone, trigger: 'blur' },
            ],
            regionType: [
                { required: true, message: '请输入区域类型', trigger: 'blur' },
            ],
        },
        options: [],
        props: {
          value: 'areaCode',
          label: 'name',
          children: 'childList',
        },
        arr:[],
        cityVal: '',
        codeId: '',
      }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (this.gov.regionId) {
          this.gov.regionId = this.gov.regionId[this.gov.regionId.length - 1]
        } 
        if (valid) {
          if (!this.$route.query.edit) {
            saveGov(this.gov).then(() => {
              this.$message.success('新增成功！')
              this.$router.go(-1)
            }).catch(() => {
              this.$message.error('新增失败！')
            })
          } else {
            updateGov(this.gov).then(() => {
              this.$message.success('修改成功！')
              this.$router.go(-1)
            }).catch(() => {
              this.$message.error('修改失败！')
            })
          }
        }
      })
    },
    getData () {     
      if (this.$route.query.edit) {
        this.userId = this.$route.query.edit
      }
      if (this.$route.query.see) {
        this.userId = this.$route.query.see
      }
      if (this.$route.query.edit || this.$route.query.see) {
        detailGov(this.userId).then(data => {
          if (data.data.code === 0) {
            if(data.data.data.regionId !== 0){
              getAllArea(data.data.data.regionId).then( res=>{
                this.options = res.data.data
              })
            }
            if(data.data.data.regionId === 0){
              this.gov = data.data.data
              getArea(330000000000).then(res=>{
                this.options = res.data.data
                this.options.forEach(item=>{
                  this.$set(item, 'childList',[])
                })
              })
              this.gov.regionId = this.options
              if (this.$route.query.see) {
                this.typeList.forEach(m => {
                  if(this.gov.regionType === m.value) {
                    this.gov.regionType  = m.label
                  }
                })
                this.gov.regionId = ''
              }      
            }else {
              getAllAreaName(data.data.data.regionId).then( res=>{
                // 处理后端数据变成我要用的数据
                this.getarr(res.data.data, this.arr)
                data.data.data.regionId = this.arr
                this.gov = data.data.data
                if (this.$route.query.see) {
                  this.typeList.forEach(m => {
                    if(this.gov.regionType === m.value) {
                      this.gov.regionType  = m.label
                    }
                  })
                  this.gov.regionId.forEach(v => {
                    this.gov.regionId = ''
                    getInfo(v).then(res => { 
                      this.gov.regionId += res.data.data.name 
                    })   
                  })
                }
              })
            }
          }
        })
      }
    },
    handleItemChange (val) {
      if (this.cityVal === 5) {
        getArea(val[val.length-1]).then(res=>{
          let data = res.data.data
          this.getNode(this.options,val[val.length-1],data)
        })
      } else if (this.cityVal === 3) {
        getArea(val[val.length-1]).then(res=>{
          this.options.forEach(v => {
            if (v.areaCode === val[val.length-1]) {
              v.childList = res.data.data
            }
          })
        })
      }
      else if (this.cityVal === 4) {
        let a = val[val.length-1]
        if (val.length === 2) {
          let b = val[val.length-1]
          this.options.forEach(h => {
            if(h.childList.length > 0) {
              h.childList.forEach(i => {
                if(i.areaCode === b) {
                  getArea(b).then(n => {
                    i.childList = n.data.data
                  })
                }
              })
            }
          })
        }   
        getArea(a).then(res=>{
          this.options.forEach(v => {
            if (v.areaCode === val[val.length-1]) {
              v.childList = res.data.data
              v.childList.forEach(m => {
                this.$set(m,'childList',[])               
              })
            }    
          })
        })
      }
    },
    getNode (node,val,data) {
      node.forEach(res=>{
        if(res.areaCode == val){
          res.childList = data
          if(res.level < 3){
              res.childList.forEach(item=>{
                if(item.childList === undefined){
                  this.$set(item,'childList',[])
                }
              })
          }
        }else{
          if(res.childList && res.childList.length !== 0){
            this.getNode(res.childList,val,data)
          }
        }
      })
    },
    getarr (node) {
      this.arr.push(node.areaCode)
      if(node.child){
        this.getarr(node.child)
      }
    },
    handleChange (val) {
      this.gov.regionId = []
      this.cityVal = val
      if (this.cityVal === 5) {
        getArea(330000000000).then(res=>{
          this.options = res.data.data
          this.options.forEach(item=>{
            this.$set(item,'childList',[])
          })
        })
      } else if (this.cityVal === 2) {
        getArea(330000000000).then(res=>{
          this.options = res.data.data
        })
      } else if (this.cityVal === 3) {
        getArea(330000000000).then(res=>{
          this.options = res.data.data
          this.options.forEach(item =>{
            this.$set(item,'childList',[])
          })
        })
      } else if (this.cityVal === 4) {
        getArea(330000000000).then(res=>{
          this.options = res.data.data
          this.options.forEach(item =>{
            this.$set(item,'childList',[])
          })
        })
      }
    },
  },
  computed: {
  },
  created () {
    if (this.$route.query.see || this.$route.query.edit) {                              
      this.getData()
    }
  },
  watch: {
    // 'gov.regionType' () {
    //   this.gov.regionId = []
    // },
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
