<template>
  <div>
    <basic-container>
      <page-header title="出港记录管理"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain >新增</iep-button> -->
          <el-button  type="primary" size="small" @click="exportInfo">导出</el-button>
          <!-- v-if="manager"  -->
        </template>
        <!-- <span><el-input v-model="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span> -->
        <template slot="right">
          <span><el-input v-model.trim="params.shipName" placeholder="渔船名" size="small" clearable></el-input></span>
          <!-- <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="离船时间" end-placeholder="离船时间" 
              value-format="yyyy-MM-dd HH:mm:ss"  size="mini"></el-date-picker></span> -->
          <!-- <span><el-input v-model="params.address" placeholder="港口地址" size="small" clearable></el-input></span> -->
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
            value-format="yyyy-MM-dd"  size="small"></el-date-picker>
          </span>
          <!-- <span><el-input v-model="params.idcard" placeholder="请输入船员身份证" size="small" clearable></el-input></span> -->
          <el-button size="small"  @click="onSearch(params)">搜索</el-button>
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
        <el-table-column prop="boatMan" label="船员适任" width="100">
        <template slot-scope="scope">
          <iep-button size="mini" :type="scope.row.type">{{scope.row.state}}</iep-button>
        </template>
        </el-table-column>
          <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" type="primary" @click="handleView(scope.row.id,scope.row.shipId)">渔船配员</iep-button>
              <!-- <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)" v-if="manager">船员管理</iep-button> -->
              <!-- <iep-button plain @click="handleEdit(scope.row.id)" type="primary" >编辑</iep-button> -->
              <iep-button @click="handleDetail(scope.row.id,scope.row.shipId)">详情</iep-button>
              <!-- <iep-button type="warning" @click="handleDelete(scope.row)" v-if="manager"><i class="el-icon-delete"></i></iep-button> -->
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { outList,getCrewCert,exportExcel } from '@/api/ships/inout'
// import { getArea } from '@/api/post/admin'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import queryMixin from '@/mixins/query'
export default {
  components: {
    // advanceSearch,
  },
  mixins: [mixins, queryMixin],
  data () {
    return {
      columnsMap,
      searchData: 'contactName',
      province:[],
      city:[],
      district:[],
      form:{districtId:''},
      params: {
        current: 1,
        size: 10,
        shipName: '',
        startDate:'',
        endDate:'',
      },
      exportParams: {
        shipName: '',
        startDate:'',
        endDate:'',
      },
      type:'danger',
      boatMan:'',
    }
  },
  created () {
    this.getQuery()
    this.$set(this.pagination, 'current', this.params.current)
    this.$set(this.pagination, 'size', this.params.size)
    this.loadPage(this.params)
  },
  methods: {
    onSearch (params) {
      params.current = 1
      this.setQuery(params)
      this.loadPage(params)
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.setQuery({current: val})
      this.loadPage()
    },
    handleSizeChange (val) {
      this.pageOption.size = val
      this.setQuery({size: val})
      this.loadPage()
    },
    handleAdd () {
      this.$router.push({
        path: '/ship_port/detail/create/0',
      })
    },
  // async  certStandard (row) {                    
  //        let boatMan 
  //   await   getCrewCert(row.id,row.shipId).then(res =>{        
  //       console.log('lack' + res.data.data.lackList)
  //       let  lackdata  =  res.data.data
  //       let  lackList  = lackdata.lackList    
  //       // console.log(res.data.data.lackList)    
  //       if(lackList.length){          
  //         row.type = 'danger'
  //         boatMan = '未通过'
  //       }else{
  //         row.type = 'success'
  //         boatMan = '正常'
  //       }
  //         console.log('lack' + lackList)
  //     })
       
  //     return boatMan
  //   },
    exportInfo () {                               
      exportExcel (this.exportParams).catch(err => {
        this.$message({
          type: 'warning',
          message: err,
        })
    })
    },
    handleView (id,shipId) {
      this.$router.push({
        path: `/ship_crew/detail/${id}`,
        query:{shipId:shipId},
      })
    },
    handleDetail (id,shipId) {
      this.$router.push({
        path: `/ship_record/detail/${id}`,
        query:{shipId:shipId},
      })
    },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    async loadPage (param = this.searchForm) {
      //  let userId = this.$store.getters.userInfo.userId
      // let idcard = this.$store.getters.userInfo.idCard
      if(param.timeLists){
        param.startDate=this.params.timeLists[0]
        param.endDate=this.params.timeLists[1]
      }
      // if(this.form.districtId!=''){
      //   param.areaCode = this.form.districtId
      // }else if(this.form.cityId!=''){
      //   param.areaCode = this.form.cityId
      // }else if(this.form.provinceId!=''){
      //   param.areaCode = this.form.provinceId
      // }
       let data  =  await  this.loadTable({ ...param }, outList)
       data.records.forEach(item => {   
            getCrewCert(item.id,item.shipId).then(res => {
                  let  lack  =  res.data.data.lackList
                  if(lack.length >0){
                       this.$set(item,'type','danger')
                       this.$set(item,'state','未通过')
                  }else{
                      this.$set(item,'type','success')
                       this.$set(item,'state','正常')
                  }
            })
       })
       this.pagedTable = data.records   
      //  console.log(data.records)    
      // this.loadTable({ ...param }, outList).then(res=>{
      //   console.log('打出来')
      //   this.pagedTable=res.records.filter(item=>{
      //     if(item.inoutType==1){
      //       return item
      //     }
      //   })
      //   // return res.records
      // })
      // this.pagedTable = this.pagedTable.filter(item=>{
      //   console.log('是十四')
      //   console.log(item)
      //   if(item.inoutType==1){
      //     return item
      //   }
      // })
      // console.log(this.loadTable({ ...param }, outList).then())
    },
     // 选择城市
    // choseProvince (id) {
    //   this.form.cityId = ''
    //   this.form.districtId = ''
    //   this.form.villageId = ''
    //   this.district = []
    //   getArea(id).then(({ data }) => {
    //       this.city = data.data
    //   })
    // },
    // 改变城市
    // choseCity (id) {
    //   getArea(id).then(({ data }) => {
    //     this.district = data.data
    //   })
    // },
  },
  watch: {
    'params.shipName': function (val) {          
          this.exportParams.shipName  = val
    },  
    'params.timeLists': function (val) {                
          this.exportParams.startDate  = val[0]
          this.exportParams.endDate  = val[1]
    },
},
}
</script>