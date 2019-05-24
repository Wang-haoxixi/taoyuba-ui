<template>
  <div class="pro_infor">
    <div class="pro_infor_nam">
      <div class="pro_infor_icon"></div>
      <span>基本信息</span>
    </div>
    <div class="pro_infor_detial">
      <ul>
        <li v-for="(item,index) in tits" :key="index">
          <span style="color:#888888">
            {{item.name}}
          </span>：
          <span style="color:#000">
            {{item.value}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getProjectInfo } from '@/api/projectManagement/projectList'
export default {
  data (){
    return{
      tits: [],
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getInfo () {
      var params = {id : this.id}
      getProjectInfo(params).then(({data}) => {
        this.tits = data
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.pro_infor{
  padding: 20px 0 15px;
  .pro_infor_nam{
    width: 125px;
    height: 25px;
    font-size: 16px;
    color: #333;
    display: inline-block;
    vertical-align: top;
    .pro_infor_icon{
      display: inline-block;
      vertical-align: top;
      padding-right: 10px;
      color: #aaa;
      width: 35px;
      height: 24px;
    }
    span{
      vertical-align: middle;
    }
  }
  .pro_infor_detial{
    width: 85%;
    overflow: hidden;
    margin-top: 5px;
    display: inline-block;
    vertical-align: top;
    ul>li{
      width: 45%;
      float: left;
      line-height: 25px;
      padding-left: 30px;
      padding-bottom: 5px;
    }
    ul>li::before{
      content: '★';
      margin-right: 8px;
      color: #ccc;
    }
  }
}
</style>
