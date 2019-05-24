<template>
  <div class="treasure">
    <div class="title">
      <div class="flex">我的财富</div>
      <div class="flex small" @click="handleOpen()">挖贝攻略<span><i class="el-icon-question"></i></span></div>
      <div class="line">|</div>
      <div class="flex small">投资宝典<span><i class="el-icon-question"></i></span></div>
    </div>
    <div class="treasure-data">
      <div class="total">
        <div class="little-title">总资产</div>
        <div class="color">0.00</div>
      </div>
      <div class="change">
        <div class="little-title">今日变化</div>
        <div class="color">0.00</div>
      </div>
      <span class="right-top"><i class="el-icon-view"></i></span>
    </div>
    <el-button-group class="operation-btn-group">
      <iep-button plain>报销</iep-button>
      <iep-button @click="handleReward" plain>打赏</iep-button>
      <iep-button plain>投资</iep-button>
      <iep-button plain>互助基金</iep-button>
    </el-button-group>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { openWindow } from '@/util/util'
export default {
  data () {
    return {
      showClass: 2,
      total: '',
      change: '',
      treasureData: {
        title: '我的财富',
        dataList: [
          { name: '报销', totalMoney: 1111.2, change: 3333 },
          { name: '打赏', totalMoney: 2222.2, change: 2222 },
          { name: '投资', totalMoney: 3333.2, change: 3333 },
          { name: '互助基金', totalMoney: 4444.2, change: 4444 },
        ],
      },
    }
  },
  created () {
    this.total = this.treasureData.dataList[2].totalMoney
    this.change = this.treasureData.dataList[2].change
  },
  methods: {
    ...mapActions(['famsReward']),
    handleOpen () {
      openWindow('https://www.yuque.com/govmade/readings', '挖贝攻略', 800, 600)
    },
    handleReward () {
      this.famsReward()
    },
    tagList (index) {
      this.showClass = index
      this.total = this.treasureData.dataList[index].totalMoney
      this.change = this.treasureData.dataList[index].change
    },
  },
}
</script>
<style lang="scss" scoped>
.treasure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 10px;
  .el-icon-question {
    &:hover {
      opacity: 0.7;
    }
  }
}
.title {
  display: flex;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  .flex {
    flex-grow: 1;
    margin-right: 5px;
    width: auto;
  }
  .line {
    padding: 0 10px 0 2px;
    color: #e0e0e0;
  }
  .small {
    font-size: 13px;
    padding-top: 4px;
    color: #686868;
    line-height: 16px;
    cursor: pointer;
    position: relative;
    &:hover {
      color: #cb3737;
    }
    span {
      margin-left: 5px;
      color: #bbb;
    }
  }
}
.operation-btn-group {
  margin: 10px 0;
}
.treasure-data {
  padding: 15px 0;
  background: white;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #e8e8e8;
  position: relative;
  overflow: hidden;
  width: 100%;
  .right-top {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: #f4f4f4;
    position: absolute;
    top: -23px;
    right: -22px;
    z-index: 98;
    transform: rotate(225deg);
    i {
      transform: rotate(-225deg);
      color: #999;
    }
  }
  > div {
    display: inline-block;
    height: auto;
    width: 50%;
  }
  .total {
    position: relative;
  }
  .total:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    background: #ccc;
    height: 100%;
  }
  .little-title {
    padding-bottom: 10px;
    color: #959595;
  }
  .color {
    color: #cb132d;
    font-size: 18px;
  }
}
.cursor {
  cursor: pointer;
}
</style>


