<template>
  <div class="charts">
    <div>上月环比</div>
    <div><i class="iconfont icon-daochu"></i> {{data.link}}%</div>
  </div>
</template>

<script>
  export default{
    props:{
      data:{
        type: Object,
        default (){
          return {}
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .charts{
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
    color: #fffeff;
    z-index: 10;
    font-size: 12px;
    padding: 20px 0 0;
    div{
      margin-bottom: 10px;
      margin-left: 10px;
      i{
        color: #ffff64;
      }
    }
  }
</style>
