<template>
  <div class="search">
    <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dataList: [
        { name: '郑爱军', grade: '3580', color: 'red' },
        { name: '杨冰之', grade: '3420', color: 'red' },
        { name: '张小燕', grade: '2988', color: 'red' },
        { name: '王林源', grade: '2455', color: '' },
        { name: '张小燕', grade: '2200', color: '' },
        { name: '黄成详', grade: '1982', color: '' },
        { name: '苏肖', grade: '1852', color: '' },
        { name: '刘畅', grade: '1650', color: '' },
        { name: '谢海艳', grade: '1250', color: '' },
        { name: '胡小丽', grade: '1122', color: '' },
      ],
    }
  },
}
</script>


