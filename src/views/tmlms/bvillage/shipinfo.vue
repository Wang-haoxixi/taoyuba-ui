<template>    
  <div class="contract-box">            
    <basic-container>
        <h1>{{ ifexist ? '编辑' : '新增' }}渔船信息</h1>                
        <el-form :model="tybvillage" ref="form" label-width="150px" :rules="rules">          
          <el-row>                                 
            <el-col>
                <iep-form-item prop="workExperience" label-name="渔船信息">                              
                  <inline-form-table :table-data="tybvillage.shiplist" :columns="certificateColumns" requestName="certificate" type="employee_profile" @add="setData"></inline-form-table>         
                </iep-form-item>
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
import InlineFormTable from '@/views/hrms/ComponentsNew/InlineFormTable/'                                                                                                                                
import { getVillageshipinfoByuser, batchsave, batchUpdate } from '@/api/tmlms/bvillage/villageship'                                          
import { getUserInfo } from '@/api/login'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
export default {                         
  data () {                                                                                                                                                            
    return {                                                                                        
      certificateColumns: [                                                                             
          {
            prop: 'shipname',
            label: '渔船名',
          },
          {
            prop: 'shipno',
            label: '渔船编号',
          },
          {
            prop: 'shipowner',
            label: '持证人',
          },
          {                                                                                                               
            prop: 'mobile',           
            label: '手机号码',
          },
      ],
      tybvillage:{          
        shiplist:[],
      },
      rules: {      
      },
      options: [],      
      props: {
        value: 'areaCode',
        label: 'name',
        children: 'childList',
      },
      manager: false,
      ifexist: false,
    }
  },        
  components: { InlineFormTable },        
  methods: {        
    // 提交表单
   save () {                 
      this.$refs['form'].validate((valid) => {    
          if (valid) {
              if( this.tybvillage.shiplist.length === 0){          
                  this.$message.error('无数据提交')
                  return
               }       
            let shipinfolist  =  this.tybvillage.shiplist
            console.log(shipinfolist)           
             let  userId  =  this.$route.query.allot
            if(this.ifexist){   
                  console.log('edit')                   
                let   shiparray  =  new Array()
                 if( this.tybvillage.shiplist.length > 0) {      
                      for(var i=0;i< shipinfolist.length;i++){
                            let  shipinfo = {id:'',villageUserid:userId,shipname:'',shipno:'',shipowner:'',mobile:''}
                          Object.assign(shipinfo,shipinfolist[i])
                          shiparray.push(shipinfo)
                      }
                 }
                     console.log(shiparray)        
            let data = JSON.parse(JSON.stringify(shiparray))                                                                                                          
              batchUpdate(data,userId).then(res=>{
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
              console.log(userId)
              let   shiparray2  =  new Array()   
               if( this.tybvillage.shiplist.length > 0) {
                      for(let i=0;i< shipinfolist.length;i++){      
                            let  shipinfo = {villageUserid:userId,shipname:'',shipno:'',shipowner:'',mobile:''}   
                          Object.assign(shipinfo,shipinfolist[i])   
                          shiparray2.push(shipinfo)
                      }
                 }       
                 console.log(shiparray2)        
              let data  = JSON.parse(JSON.stringify(shiparray2))   
              batchsave(data).then(res=>{  
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
    // 获取子组件数据
    setData (val) {     
      this.tybvillage.shiplist = val
    },
  },
  computed: {
  },
  created () {    
    // 编辑新增放同一个组件 判断分别
      getAll.call(this)
    async function getAll () {    
      // 异步获取ID
     await getVillageshipinfoByuser(this.$route.query.allot).then( res=>{
        if(res.data.code === 0) {
          this.tybvillage.shiplist = res.data.data
          if(this.tybvillage.shiplist.length > 0)  this.ifexist = true
        }                  
      })

    getUserInfo().then(res => {
      if (res.data.data.roles.includes(111)) {
        this.manager = true
      } else {
        this.manager = false
      }
      res.data.data.sysUser.userId
    })
  }
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-right:16%;
}
</style>
