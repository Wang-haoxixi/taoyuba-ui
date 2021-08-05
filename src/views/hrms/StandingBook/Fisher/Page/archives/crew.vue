<template>
    <div class="crew">
         <div class="crew-title">
            <div class="crew-title-bu">
                <div class="crew-title-bg">
                    <img src="/img/crew1.png" alt="">
                </div>
                <div class="crew-title-text">
                    <div v-if="shipMan.tybCrewCertStandardListCount">{{ shipMan.tybCrewCertStandardListCount }}人</div>
                    <div>应配船员</div>
                </div>
            </div>
            <div class="crew-title-bu">
                <div class="crew-title-bg" style="background: #3AB1E6;">
                    <img src="/img/crew2.png" alt="">
                </div>
                <div class="crew-title-text" >
                    <div v-if="shipMan.tybCrewCertStandardListCount">{{ shipMan.certListCount }}人</div>
                    <div>实配船员</div>
                </div>
            </div>
            <div class="crew-title-bu">
                <div class="crew-title-bg" style="background: #E6893A;">
                    <img src="/img/crew3.png" alt="">
                </div>
                <div class="crew-title-text">
                    <div>{{ num }}人</div>
                    <div>未签合同</div>
                </div>
            </div>
            <div class="crew-title-bu">
                <div class="crew-title-bg" style="background: #5D68ED">
                    <img src="/img/crew4.png" alt="">
                </div>
                <div class="crew-title-text">
                    <div v-if="shipMan.lackList">{{ shipMan.lackList.length !== 0 ? '齐全' : '不齐全' }}</div>
                    <div>证书情况</div>
                </div>
            </div>
        </div>
        <div style="margin-top: 21px">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClickPane">
                <el-tab-pane label="现有船员" name="first"></el-tab-pane>
                <el-tab-pane label="历史船员" name="second"></el-tab-pane>
            </el-tabs>
              <el-table
                :data="crewLoacl"
                style="width: 100%">
                <el-table-column
                    prop="realName"
                    label="姓名">
                    </el-table-column>
                    <el-table-column
                    prop="idcard"
                    label="身份证">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="手机">
                    </el-table-column>
                    <el-table-column
                    label="证书职位">
                        <template slot-scope="scope">
                            <div > {{ getLabel('tyb_crew_cert_title',scope.row.certList || []) }} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="leftTime"
                    label="上船时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                    <el-table-column
                    prop="zip"
                    label="培训">
                    <template slot-scope="scope">
                        <div>{{ scope.row.signStatus == 0 ? '否' : '是' }}</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="handleClick(scope.row,2)" type="text" size="small">合同</el-button>
                    </template>
                    </el-table-column>
                
                </el-table>
                          <div style="text-align: center;margin: 20px 0;" v-if="pagination">
        <el-pagination 
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
         @current-change="currentChange"
          >
        </el-pagination>
      </div>
        </div>
    </div>
</template>
<script>
import {  getCrewByShipId,getCrewOldByShipId } from '@/api/tmlms/boatMan/index.js'
export default {
  name: 'prot',
  data () {
    return {
        pagination:false,
        crewLoacl:[],
        total: 10,
        params: {
         current: 1,
         size: 10,
         shipId:'',
        },
        tableData: [],
        activeName: 'first',
        certLevel: [
        { value: '0', label: '' },
        { value: '1', label: '一级' },
        { value: '2', label: '二级' },
        { value: '3', label: '三级' },
      ],
    }
  },
  props: {
    shipMan: {
      default: ()=>{},
      type: Object,
    },
    // crew: {
    //   default: ()=>[],
    //   type: Array,
    // },
    num: {
      default: 0,
      type: Number,
    },
    row: {
      default: ()=>{},
      type: Object,
    },
  },
  created () {
   this.getCrewByShipId()
  },
  mounted () {
  },
  methods: {
      // 历史船员
      getCrewOldByShipId (){
          this.params.shipId=this.row.shipId
         getCrewOldByShipId(this.params).then(res=>{
         this.crewLoacl = res.data.data.records
        this.total=res.data.data.total
          })   
      },
      //分页
      currentChange (current) {
       this.params.current = current
       this.getCrewOldByShipId()
      },
      //船员切换
      handleClickPane (tab) {
        if(tab.name=='second'){
          this.pagination=true
          this.params.current=1
          this.params.size=10
          this.getCrewOldByShipId()
        }else{
         this.pagination=false
         this.getCrewByShipId()
        }
      },
      // 船员
      getCrewByShipId (){
         getCrewByShipId(this.row.shipId).then(res=>{
         this.crewLoacl = res.data.data
          })   
      },
      // 获取字典
      getLabel (dic,arr) {
          let data = ''
          arr.forEach(chil => {
              this.certLevel.map(iep=>{
               if (chil.certLevel === iep.value) {
                 data = iep.label
                }
               })
             this.$store.state.cache.dictGroup[dic].forEach(element => {
                
                if( element.value === chil.certTitle ){
                    data += element.label + ','
                }
            })
          })
          if(data){
            data=data.slice(0,data.length-1)
          }
          return data
      },
      handleClick (row,current) {
          this.$router.push(`/boatMan/detail?see=${row.idcard}&current=${ current || 1 }`)
      },
  },
  components: {
  },
}
</script>
<style scoped lang="scss">
.crew {
    .crew-title {
        display: flex;
        border: 1px solid #EDEDED;
        padding: 21px 0;
        .crew-title-bu {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #EDEDED;
        }
    }
    .crew-title-bg {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #7AC149;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        img {
            width: 20px;
        }
    }
    .crew-title-text {
        div:first-child {
            color: #666666;
            font-size: 16px;
        }
        div {
            color: #999999;
            font-size: 14px;
        }
    }
}
</style>