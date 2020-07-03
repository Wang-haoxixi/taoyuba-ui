<template>
  <div class="inout">
    <basic-container>
      <page-header title="出港记录"></page-header>
      <h3>基础信息</h3>
      <ul >
        <li>渔船名称：{{basicList.shipName}}</li>
        <li>出港时间：{{basicList.createTime}}</li>
        <li>港口名称：{{basicList.portName}}</li>
      </ul>
      <h3>船舶适配情况</h3>
      <ul class="cert-detail">
        <!-- <li>
          <span>船舶登记证：{{basicList.licensesNationalNo}}</span>
          <span>船舶登记证有效期：{{basicList.licensesOwnerExpireDate}}</span>
          <span :class="basicList.Ownerclass">{{basicList.Ownerstatus}}</span>
        </li> -->
        <li>
          <span>国籍证：{{certList.licensesNationalNo}}</span>
          <span>国籍证有效期：{{certList.licensesNationalExpireDate}}</span>
          <span :class="certList.Nationalclass">{{certList.Nationalstatus}}</span>
        </li>
        <li>
          <span>船舶检验证书：{{basicList.licensesInspectionNo}}</span>
          <span>船舶检验证书有效期：{{basicList.licensesInspectionExpireDate}}</span>
          <span :class="basicList.Inspectionclass">{{basicList.Inspectionstatus}}</span>
        </li>
        <li >
          <span>捕捞许可证：{{basicList.licensesFishingNo}}</span>
          <span>捕捞许可证有效期：{{basicList.licensesFishingExpireDate}}</span>
          <span :class="basicList.Fishingclass">{{basicList.Fishingstatus}}</span>
        </li>
      </ul>
       <h3>现有配员情况</h3>
      <el-table :data="shipcrewList" style="width: 100%">
          <el-table-column
            v-for="(item,index) in columnsMapDetail"
            :key="index"
            :prop="item.prop"  
            :label="item.label"
          >
          <template slot-scope="scope">
            <template v-if="item.type==='image'">
                <img v-if="scope.row[item.prop]" :src="scope.row[item.prop]" width=100 height=80 @click="openImage(scope.row[item.prop])"/>
                <span v-else>无相关照片</span>
                <!-- <a @click="openImage(scope.row[item.prop])">查看保单图片</a> -->
            </template>
            <template v-else-if="item.type==='position'">
            <div>{{getMyCret(item,scope)}}</div>
            </template>
            <template v-else>
            <iep-table-detail :value="scope.row[item.prop]"></iep-table-detail>
          </template>
          </template>
          </el-table-column>
      </el-table>
       <!-- <div style="text-align: center;margin: 20px 0;">            
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>          -->
    </basic-container>
  </div>
</template>
<script>
import { getShipCrew,getCrewCert, getInoutListById } from '@/api/ships/inout'
import { getShipByShipId } from '@/api/ships/index'
import { columnsMapDetail } from '../options'
import { mapGetters } from 'vuex'
export default {
  components: {
    // advanceSearch,
  },
  data () {
    return {
      columnsMapDetail,
      shipId:'',
      params: {
        current: 1,
        size: 10,
      },
      boatMan:'',
      shipcrewList:[],
      total:10,
      cert:{},
      basicList:[],
      certList:{},
      status:{
        text:'正常',
        color:'red',
      },
    }
  },
  created () {
    this.getBasic()
    this.getCrewList()
    this.getShipDetail()
    this.certStandard()
    
  },
  computed:{
    ...mapGetters(['dictGroup']),
  },
  methods: {
    // 分页
    currentChange (val) {                      
      this.params.current = val
      this.getCrewList()
    },
    openImage (url) {
        window.open(url, '_blank')
    },
    getMyCret (item,scope){
      this.$store.getters.dictGroup.tyb_crew_cert_title.map(data=>{
        if(scope.row[item.prop]==data.value){
            scope.row[item.prop]=data.label
        }
      })
      if(scope.row.certLevel=='0') scope.row.certLevel=''
      if(scope.row.certLevel=='1') scope.row.certLevel='一级'
      if(scope.row.certLevel=='2') scope.row.certLevel='二级'
      if(scope.row.certLevel=='3') scope.row.certLevel='三级'
        // console.log('职位')
        // console.log(myitem)
      if(scope.row[item.prop]){
        return scope.row.certLevel+scope.row[item.prop]
      }else{
        return '暂无'
      }
      
    },
   getShipDetail (){
      getShipByShipId(this.$route.query.shipId).then(res=>{
        this.certList = res.data.data
        let date = new Date()
        console.log(date)
        console.log(date)
        

      })
    },
    handleAdd () {
      this.$router.push({
        path: '/ship_port/detail/create/0',
      })
    },
    certStandard () {
        getCrewCert(this.$route.params.id).then(res=>{
            // console.log(res.data.data)
            this.lack = res.data.data.lackList
            this.cert = res.data.data.tybCrewCertStandardList
            this.cert=this.cert.map(item=>{
                this.$store.getters.dictGroup.tyb_crew_cert_title.map(data=>{
                    if(item.certTitle==data.value){
                        item.certTitle=data.label
                    }
                })
                if(item.certLevel=='0') item.certLevel=''
                if(item.certLevel=='1') item.certLevel='一级'
                if(item.certLevel=='2') item.certLevel='二级'
                if(item.certLevel=='3') item.certLevel='三级'
                return item
                
            })
            })
    },
    getCrewList () {
        // console.log(this.$route.params.id)
        getShipCrew(this.$route.params.id).then(res=>{
            this.shipcrewList = res.data.data
            // this.total = res.data.total
            // console.log( res)
        })
        // shipCrewList
    },
    getBasic () {
      getInoutListById(this.$route.params.id).then(res=>{
        this.basicList = res.data.data
        let date = new Date()
        console.log('看看吧')
        console.log(this.basicList.licensesOwnerExpireDate)
        if(this.basicList.licensesNationalExpireDate<date || !this.basicList.licensesNationalExpireDate){
          this.basicList.Nationalclass = '过期'
          this.basicList.Nationalclass = 'status-bg-red'
        }else{
          this.basicList.Nationalclass = '正常'
          this.basicList.Nationalclass = 'status-bg-green'
        }
        if(this.basicList.licensesInspectionExpireDate<date || !this.basicList.licensesInspectionExpireDate){
          this.basicList.Inspectionstatus = '过期'
          this.basicList.Inspectionclass = 'status-bg-red'
        }else{
          this.basicList.Inspectionstatus = '正常'
          this.basicList.Inspectionclass = 'status-bg-green'
        }
        if(this.basicList.licensesFishingExpireDate<date || !this.basicList.licensesFishingExpireDate){
          this.basicList.Fishingstatus = '过期'
          this.basicList.Fishingclass = 'status-bg-red'
        }else{
          this.basicList.Fishingstatus = '正常'
          this.basicList.Fishingclass = 'status-bg-green'
        }
        this.shipId = this.basicList.shipId
      })
    },
    
  },
}
</script>
<style scoped lang="scss">
.inout {
  h3 {
    color:#0185d8 ;
    // border-bottom:solid 1px #FAFAFA;
  }
  .detail-bg{
    background-color: #FAFAFA;
    padding:20px;
    // #f789f89
    // #49cc90
  }
  .cert-detail{
    span{
      padding: 0px 10px;
    }
  }
  .status-bg-green{
    padding:0px;
    background-color:#49cc90;
    text-align: center;
    border-radius: 3px;
    color: #fff;
  }
  .status-bg-red{
    padding:0px;
    background-color:#f78989;
    text-align: center;
    border-radius: 3px;
    color: #fff;
  }
}
</style>