<template>
  <div>
    <basic-container>
      <page-header title="渔船经营人"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" v-if="manager">新增</iep-button>
        </template>
        <template slot="right">
          <span><el-input v-model.trim="params.realname" placeholder="请输入姓名" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.idcard" placeholder="请输入身份证号" size="small" clearable></el-input></span>
          <el-button size="small"  @click="loadPage(params)">搜索</el-button>
        </template>
      </operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        is-mutiple-selection>
          <el-table-column prop="videoSrc" label="渔船名" width="200">
           <template slot-scope="scope">
                  <span >{{scope.row.shipName}}</span>
            </template>
        </el-table-column>
         <el-table-column prop="bindType" label="类型" width="100">
           <template slot-scope="scope">
                  <span >{{scope.row.type}}</span>
            </template>
        </el-table-column>
          <el-table-column prop="shipStatus" label="是否绑定渔船" width="150">
           <template slot-scope="scope">
             <div>
                <el-button type="success"  circle  v-if="scope.row.shipId"></el-button>
                <el-button type="danger"  circle  v-if="!scope.row.shipId"></el-button>
                <!-- <el-switch
                v-model="scope.row.shipStatus"
                active-color="#13ce66"
                inactive-color="#F00"
                >
              </el-switch> -->
             </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="审核操作"
            width="100"
            v-if="manager"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="setStatus(scope.row.swith,scope.row.id)"
                inactive-color="#F00"
                :disabled="scope.row.isDisabled"
                >
              </el-switch>
            </div>
          </template>
          </el-table-column>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button plain @click="handleEdit(scope.row.id)" v-if="manager">编辑</iep-button>
              <iep-button @click="handleView(scope.row.vedioId)"   v-if="!scope.row.shipId">绑定渔船</iep-button>
              <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getShiphaverPage,deleteShiphaver,getShiphaverDetail,reviewShiphaver } from '@/api/tmlms/shiphaver'      
// import { getShipDetail } from  '@/api/ships'    
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'   
export default {
  mixins: [mixins],
  data () {                       
    return {
      columnsMap,
      shipHaverList: [],
      manager: false,
      params: {
        current: 1,
        size: 10,
        realname: '',
        idcard: '',
      },
      tybShipowner: {   
            haverStatus: '',
            orgId: '',
            userId: '',
            realName: '',
            idcard: '',
            shiphaverId: '',
            type: '',
            bindType: '',
            shipId: '',
        },
    }
  },
  created () {      
    this.loadPage()
  },
  methods: {                    
    handleSelectionChange (val) {              
      this.multipleSelection = val.map(m => m.id)
    },
    handleDelete (row) {          
      this._handleGlobalDeleteById(row.id, deleteShiphaver)
    },
    handleAdd () {          
      // console.log('creathaver')
      this.$router.push({           
        path: '/shiphaver/detail/create/0',
      })      
    },
    handleView (id) {     
      this.$router.push({
        path: `/shiphaver/detail/view/${id}`,
      })
    },
    handleEdit (id) {           
      this.$router.push({       
        path: `/shiphaver/detail/update/${id}`,   
      })
    },
    async loadPage (param = this.searchForm) {                 
      const userData = await getUserInfo().then(res => {         
        return res.data.data
      })
      if(userData.roles.indexOf(111) !== -1 || userData.roles.indexOf(1) !== -1){   
        this.manager = true
      }
        let data = await this.loadTable(param, getShiphaverPage)          
        data.records.forEach( async item => {     
              //绑定类型
              if(item.bindType === 1){
                    this.$set(item,'type','持证人') 
              }else if(item.bindType  === 2){
                    this.$set(item,'type','经营人') 
              }else if(item.bindType ===3){
                      this.$set(item,'type','经营人家属') 
              }
              if(item.status === 0 ||  item.status === 2) 
                   this.$set(item,'swith',false)  
              else 
                  this.$set(item,'swith',true)  
       })             
        this.pagedTable = data.records    
    },    
   async setStatus (swith,shiphaverId) {               
                  this.tybShipowner.shiphaverId  = shiphaverId
                  let  shiphaver  =  await   getShiphaverDetail(shiphaverId).then(res => {
                        return res.data.data
                  })
                    this.tybShipowner.orgId  = shiphaver.orgId
                    this.tybShipowner.userId  = shiphaver.userId
                    this.tybShipowner.realName  = shiphaver.realname
                    this.tybShipowner.idcard  = shiphaver.idcard  
                    this.tybShipowner.bindType = shiphaver.bindType
                    this.tybShipowner.shipId = shiphaver.shipId   
          if(swith)     
                this.tybShipowner.haverStatus = 1
          else
               this.tybShipowner.haverStatus = 2
          // console.log(this.tybShipowner)            
          reviewShiphaver(this.tybShipowner).then(res => {
                if(res.data.data === true){   
                        this.loadPage()       
                      this.$message({
                    type: 'success',
                    message: '审核成功!',
                  })
                }else {     
                   this.$message.error('审核失败')    
                }
          }).catch(err => {           
                     this.$message.error(err.data.msg)    
          })
    },

  },
}
</script>   