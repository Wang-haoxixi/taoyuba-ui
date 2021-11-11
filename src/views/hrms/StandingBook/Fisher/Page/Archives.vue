<template>
  <div class="archives">
    <page-header title="渔船档案"></page-header>
    <div class="flex">
      <div>
        <img src="/img/ship.png">
      </div>
      <div class="flex-columon">
        <div class="archives-title">
          <span>{{ list.shipName }}</span>
          <span>NO.{{ list.shipNo }}</span>
        </div>
        <div class="flex flex-sp">
          <div>
            <p>所属基层：{{ list.villageName || '暂无' }}</p>
            <p>股份性质：{{ list.shipShare === '1' ? '合伙' : '个人' }}</p>
          </div>
          <div>
            <p>船舶价值：暂无</p>
            <p>渔船保额：暂无</p>
          </div>
          <div>
            <p>应配船员：{{ shipMan.tybCrewCertStandardListCount }}人</p>
            <p>船员总保额：暂无</p>
          </div>
          <div>
            <p>持证人：{{ list.shipowner }}</p>
            <p>持证人身份证：{{ list.shipownerIdcard }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="archives-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <info :dataInfo="list" :img="img"></info>
        </el-tab-pane>
        <el-tab-pane label="船员" name="seconda">
          <crew :shipMan="shipMan" :crew="crew" :num="num" :row="row"></crew>
        </el-tab-pane>
        <el-tab-pane label="进出港记录" name="a">
          <in-out :shipName="row.shipName"></in-out>
        </el-tab-pane>
        <el-tab-pane label="保险记录" name="b">
          <insurance></insurance>
        </el-tab-pane>
        <el-tab-pane label="渔船检验" name="c">
          <test :shipName="row.shipName"></test>
        </el-tab-pane>
        <el-tab-pane label="渔船交易" name="d">
          <ship-sale :shipNo="row.shipNo"></ship-sale>
        </el-tab-pane>
        <el-tab-pane label="渔船大事记" name="e">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="padding: 50px;text-align:center">
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
import info from './archives/index'
import crew from './archives/crew'
import InOut from './archives/InAndOut'
import insurance from './archives/Insurance'
import test from './archives/test'
import shipSale from './archives/shipSale'
import { infoShip,certStandard,investigationReport,countContractByShipId } from '@/api/ships/index.js'
import { getCrewByShipId ,getCrewOldByShipId } from '@/api/tmlms/boatMan/index.js'
export default {
  name: 'prot',
  data () {
    return {
      activeName: 'first',
      list: {},
      img: {},
      shipMan: {},
      crew: [],
      num: 0,
    }
  },
  created () {
    this.getinfoShip()
    this.certStandard()
    this.investigationReport()
    this.getCrewByShipId()
    this.countContractByShipId()
  },
  mounted () {
  },
  props: {
    row: {
      default: ()=>{},
      type: Object,
    },
  },
  methods: {
    handleClick () {
    },
    // 获取基本信息
    getinfoShip (){
      infoShip(this.row.shipId).then(res=>{
        this.list = res.data.data
      })
    },
    // 获取船员数量
    certStandard (){
      certStandard(this.row.shipId).then(res=>{
        this.shipMan = res.data.data
      })
    },
    // 获取证书
    investigationReport (){
      investigationReport(this.row.shipName).then(res=>{
        if( res.data.data.records.length !== 0 ){
          this.img = res.data.data.records[0]
        }
      })
    },
    // 获取船员
    getCrewByShipId () {
      getCrewByShipId(this.row.shipId).then(res=>{
        this.crew = res.data.data
      })
    },
      // 获取历史船员
    getCrewOldByShipId () {
      getCrewOldByShipId(this.row.shipId).then(res=>{
        this.crew = res.data.data
      })
    },
    // 获取未签合同
    countContractByShipId () {
      countContractByShipId(this.row.shipId).then(res=>{
        this.num = res.data.data
      })
    },
    back () {
      this.$emit('back')
    },
  },
  components: {
    info,
    crew,
    InOut,
    insurance,
    test,
    shipSale,
  },
}
</script>
<style scoped lang="scss">
.flex {
  display: flex;
   width: 80%;
  img {
    width: 160px;
    margin-right: 16px;
  }
  .flex-sp {
    justify-content: space-between;
    width: 100%;
  }
  .flex-columon {
    display: flex;
    flex-direction: column;
    flex: 1;
    p {
      margin: 0;
      margin-top: 13px;
      font-size: 14px;
      color: #666666;
    }
  }
}
.archives {
  .archives-title {
    span {
      color: #666666;
      font-size: 14px;
    }
    span:first-child {
      color:#333333;
      font-size: 18px;
      margin-right: 14px;
    }
  }
  .archives-content {
    margin-top: 35px;
  }
}
</style>