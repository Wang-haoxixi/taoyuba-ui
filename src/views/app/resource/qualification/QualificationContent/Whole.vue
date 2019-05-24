<template>
<div class="whole">
  <div class="whole-box" v-for="(item,index) in list" :key="index">
    <div class="whole-item" @click="pushRoute(item)">
      <img :src="item.image" alt="">
    </div>
    <p>{{item.honorQualName}}</p>
  </div>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  data () {
    return {

    }
  },
  methods: {
    pushRoute (row) {
      console.log('row: ', row)
      this.$router.push(`/mlms_spa/aptitude/detail/${row.id}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.whole{
  display:flex;
  flex-wrap: wrap;
  .whole-box:nth-child(4n){
    margin-right:0;
  }
  .whole-box:nth-child(4n-3){
    margin-left:0;
  }
  .whole-box{
    width:23%;
    margin: 20px 15px;
    cursor: pointer;
    .whole-item{
     border: 1px solid #ccc;
      img{
        width: 250px;
        height: 250px;
      }
    }
    p{
      font-size: 14px;
      color: #333;
      text-align: center;
    }
  }
}
</style>


