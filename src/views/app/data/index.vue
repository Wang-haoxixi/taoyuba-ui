<template>
  <div class="data">
    <menus></menus>
    <div>
      <div class="test">
        <p>数据频道用于展示国脉集团的资源资产状况，构成比例和变化趋势，体现集团资源资产健康状况与集团发展趋势</p>
        <p>内网平台记录了所有数据与用户在平台中的流转过程、变更情况，乃据的整个生命周期。基于此，数据频道为您呈现各个模块、各个分类届性下的数据统计与数据变化趋势，在记录与计篝的过程中，给出数据的变化趋势，给予一定的决策辅助。</p>
        <p style="color:#ba1b21">数据频道正在建设中，敬诵期待，本页面仅为样式效果演示</p>
      </div>
      <business></business>
      <div class="half">
        <performance></performance>
        <receipt></receipt>
        <gender-age></gender-age>
        <use-candle></use-candle>
        <weights></weights>
        <relationships></relationships>
      </div>
    </div>
  </div>
</template>
<script>
import Menus from './Menus'
import Business from './Business'
import Performance from './Performance'
import Receipt from './Receipt'
import GenderAge from './GenderAge'
import UseCandle from './UseCandle'
import Weights from './Weights'
import Relationships from './Relationships'
export default {
  components: { Menus, Business ,Performance, Receipt, GenderAge, UseCandle, Weights, Relationships },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.data {
  width: 1200px;
  margin: 20px auto;
  padding-top: 40px;
  display: grid;
  grid-column-gap: 20px;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 220px) minmax(100px, 980px);
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
