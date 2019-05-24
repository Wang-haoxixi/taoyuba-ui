<template>
  <div class="grid-content">
    <iepAppTabCard :title="title">
      <div class="result">
        <div class="gridResult" v-for="(item,index) in gridResult" :key="index">
          <p class="num">{{item.num}}</p>
          <i :class="item.icon" v-if="item.icon"></i>
          <p class="name" :class="item.color">{{item.name}}</p>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '研究成果',
      gridResult: [
        { num: 11, name: '书籍' },
        { num: 11, name: '报告' },
        { num: 11, name: '白皮书' },
        { num: 11, name: '观点' },
        { num: 11, name: '其它' },
        { icon:'icon-shangchengxiantiao', name: '进入国脉微店', color: 'red' },
      ],
    }
  },
}
</script>
<style lang='scss' scoped>
.title {
  font-size: 18px;
  color: #000;
}
.red {
  color: #ba1b21;
}
.result {
  text-align: center;
  i{
    font-size: 28px!important;
    color:#999;
  }
  .gridResult {
    display: inline-block;
    width: 50%;
    border-bottom: 1px solid #eee;
    .num {
      font-size: 22px;
      margin-top: 7px;
      margin-bottom: 0;
      text-align: center;
    }
    .name {
      margin-bottom: 7px;
      text-align: center;
    }
  }
  .gridResult:nth-child(odd) {
    border-right: 1px solid #eee;
  }
  .gridResult:nth-last-child(1) {
    border-bottom: none;
  }
  .gridResult:nth-last-child(2) {
    border-bottom: none;
  }
}
</style>

