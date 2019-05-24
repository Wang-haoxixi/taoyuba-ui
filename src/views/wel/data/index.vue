<template>
  <div class="data">
    <div class="test">
      <p style="color:#ba1b21">数据频道正在建设中，敬诵期待，本页面仅为样式效果演示</p>
    </div>
    <div class="half">
      <performance></performance>
      <receipt></receipt>
      <gender-age></gender-age>
      <use-candle></use-candle>
      <weights></weights>
      <relationships></relationships>
    </div>
  </div>
</template>
<script>
import Performance from './Performance'
import Receipt from './Receipt'
import GenderAge from './GenderAge'
import UseCandle from './UseCandle'
import Weights from './Weights'
import Relationships from './Relationships'
export default {
  components: { Performance, Receipt, GenderAge, UseCandle, Weights, Relationships },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.data {
  margin: 20px;
  .test{
    width: 100%;
    padding:20px;
    border: 1px solid #eee;
    > p{
      margin:0;
    }
  }
  .half{
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
