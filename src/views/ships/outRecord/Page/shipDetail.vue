<template>
  <div class="inout">
    <basic-container>
      <page-header title="渔船配员"></page-header>
      <div>
        <h3>职务船员配备标准</h3>
        <p ><span v-for="item in cert" :key="item.index" class="status-bg-red"><span  v-if="item.certLevel">{{item.certLevel}}</span>{{item.certTitle}}{{item.number}}名</span></p>
      </div>
      <div>
        <h3>当前渔船缺少相关人员</h3>
        <p ><span v-for="item in lack" :key="item.index" class="status-bg-red"><span  v-if="item.certLevel">{{item.certLevel}}</span>{{item.certTitle}}{{item.number}}名</span></p>
      </div>
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
import { getShipCrew,getCrewCert } from '@/api/ships/inout'
// import { getMyCretList } from '@/api/post/cert'
import { columnsMapDetail } from '../options'
import { mapGetters } from 'vuex'
export default {
  components: {
    // advanceSearch,
  },
  data () {
    return {
      columnsMapDetail,
      params: {
        current: 1,
        size: 10,
      },
      boatMan:'',
      shipcrewList:[],
      total:10,
      cert:{},
      lack:{},
    }
  },
  created () {
    this.getCrewList()
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
    handleAdd () {
      this.$router.push({
        path: '/ship_port/detail/create/0',
      })
    },
    certStandard () {
        getCrewCert(this.$route.params.id,this.$route.query.shipId).then(res=>{
            // console.log(res.data.data)
            this.lack = res.data.data.lackList.map(item=>{
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
            // console.log( res)
        })
        // shipCrewList
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
  .status-bg-red{
    padding:0px;
    background-color:#f78989;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    margin: 10px;
    padding:2px 10px;
  }
}
</style>