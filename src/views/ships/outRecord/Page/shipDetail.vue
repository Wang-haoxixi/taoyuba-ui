<template>
  <div class="inout">
    <basic-container>
      <page-header title="渔船配员"></page-header>
      <div>
        <h3>职务船员配备标准</h3>
        <p ><span v-for="item in cert" :key="item.index" class="status-bg-red"><span  v-if="item.certLevel">{{item.certLevel}}</span>{{item.certTitle}}{{item.number}}名</span></p>
      </div>
      <h3>现有配员情况</h3>
      <el-table :data="shipcrewList" stripe style="width: 100%">
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
            <div>{{getMyCret(scope.row.idcard)}}</div>
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
import { getMyCretList } from '@/api/post/cert'
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
    getMyCret (idcard){
        getMyCretList(idcard).then(res=>{
          let item = res.data.data[0]
          this.$store.getters.dictGroup.tyb_crew_cert_title.map(data=>{
              if(item.certTitle==data.value){
                  item.certTitle=data.label
              }
          })
          if(item.certType=='0') item.certLevel=''
          if(item.certType=='1') item.certLevel='一级'
          if(item.certType=='2') item.certLevel='二级'
          if(item.certType=='3') item.certLevel='三级'
          this.boatMan = item.certLevel+item.certTitle
        })
        return this.boatMan
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
            this.total = res.data.total
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