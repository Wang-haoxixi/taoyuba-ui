<template>
  <div class="archives">
    <page-header title="渔船档案"></page-header>
    <div class="flex">
      <div>
        <img src="/img/ship.png">
      </div>
      <div class="flex-columon">
        <div class="archives-title">
          <span>关龙渔66706</span>
          <span>NO.0012337899101</span>
        </div>
        <div class="flex flex-sp">
          <div>
            <p>所属基层：衢盛合作社</p>
            <p>股份性质：独有</p>
          </div>
          <div>
            <p>船舶价值：700万</p>
            <p>渔船保额：40万</p>
          </div>
          <div>
            <p>应配船员：10人</p>
            <p>船员总保额：1500万</p>
          </div>
          <div>
            <p>持证人：张永新</p>
            <p>持证人身份证：330902197603284335</p>
          </div>
        </div>
      </div>
    </div>
    <div class="archives-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <info></info>
        </el-tab-pane>
        <el-tab-pane label="船员" name="second">
          <crew></crew>
        </el-tab-pane>
        <el-tab-pane label="进出港记录" name="1">
          <in-out></in-out>
        </el-tab-pane>
        <el-tab-pane label="保险记录" name="2">
          <insurance></insurance>
        </el-tab-pane>
        <el-tab-pane label="渔船检验" name="3">
          <test></test>
        </el-tab-pane>
        <el-tab-pane label="渔船交易" name="4">
          <ship-sale></ship-sale>
        </el-tab-pane>
        <el-tab-pane label="渔船大事记" name="5">
        </el-tab-pane>
      </el-tabs>
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
export default {
  name: 'prot',
  data () {
    return {
      activeName: 'first',
    }
  },
  created () {
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