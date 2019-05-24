<template>
  <div class="leader-board">
    <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { name: '杨冰之', grade: '3420'},
        { name: '郑爱军', grade: '3580'},
        { name: '张小燕', grade: '2988'},
        { name: '王林源', grade: '2455'},
        { name: '张小燕', grade: '2200'},
        { name: '黄成详', grade: '1982'},
        { name: '苏肖', grade: '1852'},
        { name: '刘畅', grade: '1650'},
        { name: '谢海艳', grade: '1250'},
        { name: '胡小丽', grade: '1122'},
      ],
    }
  },
}
</script>


