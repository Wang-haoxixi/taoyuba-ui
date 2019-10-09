<template>    
  <div class="contract-box">            
    <basic-container>
        <h1>{{ $route.query.edit? '编辑' : '新增' }}渔船保单信息</h1>                    
        <el-form :model="tybShipInsure" ref="form" label-width="150px" :rules="rules">          
          <el-row>                                 
            <el-col :span="12">
              <el-form-item prop="type" label="保单类型:">                                          
                <el-select v-model="tybShipInsure.type" placeholder="请选择">
                  <el-option v-for="item in typeList" prop='type' :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select> 
              </el-form-item>   
            </el-col>
            <el-col :span="12">
              <el-form-item prop="amount" label="保额:">                                          
                <el-input v-model="tybShipInsure.amount"></el-input>   
              </el-form-item>   
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="premium" label="保费:">                                          
                <el-input v-model="tybShipInsure.premium"></el-input>   
              </el-form-item>   
            </el-col>
            <el-col :span="12">
              <el-form-item prop="insureDate" label="投保日期:">
                <el-date-picker v-model="tybShipInsure.insureDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>  
              </el-form-item>   
            </el-col>
          </el-row> 
          <el-row>
            <el-col :span="12">
              <el-form-item prop="insureStartDate" label="保险起期:">                                          
                <el-date-picker v-model="tybShipInsure.insureStartDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker> 
              </el-form-item>   
            </el-col>
            <el-col :span="12">
              <el-form-item prop="insureEndDate" label="保险止期:">                                          
                <el-date-picker v-model="tybShipInsure.insureEndDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>    
              </el-form-item>   
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="persons" label="承保人数:" v-if="tybShipInsure.type === 2">                                          
                <el-input v-model="tybShipInsure.persons"></el-input>   
              </el-form-item>   
            </el-col>
          </el-row>
        </el-form>                                                                                                                       
        <div style="text-align:center">                                          
          <el-button @click="save">提交</el-button>                        
          <el-button @click="$router.go(-1)">返回</el-button>                                  
        </div>                      
    </basic-container>
  </div>
</template>   
<script>                                                                                                                                                                                                                                                                         
import { getShipinsureDetail, createShipinsure, updateShipinsure } from '@/api/ships/shipnewinsure'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
export default {                         
  data () {                                                                                                                                                            
    return {                                                                                        
      tybShipInsure:{
        id: '',
        shipName: '',
        type: 1,
        amount: '',
        premium: '',
        insureDate: '',
        insureStartDate: '',
        insureEndDate: '',
        persons: '',
      },
      rules: {    
        type: [   
          { required: true, message: '请输入保单类型', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请输入保单保额', trigger: 'blur' },
        ],
        premium: [
          { required: true, message: '请输入保单保费', trigger: 'blur' },
        ],
        insureDate: [
          { required: true, message: '请输入投保日期', trigger: 'blur' },
        ], 
        insureStartDate: [
          { required: true, message: '请输入保险起期', trigger: 'blur' },
        ],
        insureEndDate: [
          { required: true, message: '请输入保险止期', trigger: 'blur' },
        ],
      },    
      manager: false,
      typeList: [
        {
          label: '渔船险',
          value: 1,
        }, {
          label: '雇主责任险',
          value: 2,
        },
      ],
    }
  },           
  methods: {        
    // 提交表单
   save () {                 
      this.$refs['form'].validate((valid) => {    
          if (valid) {
            if(this.$route.query.edit){         
              //编辑              
              this.tybShipInsure.id = this.insureId                                                                                                                      
              updateShipinsure(this.tybShipInsure).then(res=>{
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
              this.tybShipInsure.shipName = this.$route.query.add                       
              createShipinsure(this.tybShipInsure).then(res=>{  
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
  },
  computed: {        
    insureId () {
      return  this.$route.query.edit
    },
  },      
  created () {
    if (typeof this.insureId === 'number' && !isNaN(this.insureId)) {
      getAll.call(this)
    }
    async function getAll () {     
      // 异步获取数据   
      await getShipinsureDetail(this.insureId).then( res=>{   
        if(res.data.code === 0 && res.data.data) {
          this.tybShipInsure = res.data.data
        }
      })
    }
  },
  watch: {
    'tybShipInsure.type' (val) {
      if (val === 1) {
        this.tybShipInsure.persons = 0
      }
    },
  },
}
</script>
