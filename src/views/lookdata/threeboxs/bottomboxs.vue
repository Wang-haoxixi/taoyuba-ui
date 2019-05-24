<template>
  <div class="openBox">
    <div class="titleBox">
      <div class="divBox">
        <div class="divone"></div>
        <div class="divtwo"></div>
      </div>
      <p class="tit">目录共享开放排行榜Top5</p>
      <span class="btns">
        <a :class="`btn ${type === 1 ? 'active' : ''}`" @click="changeType(1)">共享率</a>
        <a :class="`btn ${type === 2 ? 'active' : ''}`" @click="changeType(2)">开放率</a>
      </span>
    </div>
    <div class="open">
      <open-top :filed="filed" :value="value" ></open-top>
    </div>
    <div class="font-title">
      <div class="tiFont" v-for="(item,index) in dataValue" :key="index" >{{item}}</div>
    </div>
  </div>
</template>

<script>
import OpenTop from './OpenTop/'
import {getDirectorySharingLeaderboards} from '@/api/lookdata/index'
export default {
  data (){
    return {
      filed:[],
      value:[],
      dataValue: [],
      type: 1,
    }
  },
  components:{
    OpenTop,
  },
  methods: {
    changeType (value){
      this.type = value
      this.getList()
    },
    getList (){
      getDirectorySharingLeaderboards(this.type).then(({data})=>{
        let resData = data.data
        let filed = []
        let value = []
        let dataValue = []
        for(let item of resData){
          filed.push(item.name)
          value.push(item.rate)
          dataValue.push(item.value)
        }
        this.filed = filed.reverse()
        this.value = value.reverse()
        this.dataValue = dataValue
        // console.log(resData)
        // this.value=[37, 48, 45, 40, 50]
      })
    },
  },
  mounted () {
    this.getList()
  },
}
</script>


<style lang="scss" scoped>
  .font-title{
    width: 100px;
    height: 200px;
    position: absolute;
    color: #c8c6dc;
    top: 60px;
    font-size: 12px;
    padding: 7px 5px 0;
    right: 0;
    div{
      margin-bottom: 20px;
    }
  }
  .open{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }
  .openBox{
    width: 100%;
    height: 100%;
    position: relative;
  }
// titlebox
.titleBox{
  color: #fff;
  margin-top: 20px;
  margin-left: 25px;
  .divBox{
    width: 15px;
    height: 25px;
    // background-color: yellow;
    display: inline-block;
    vertical-align: bottom;
    .divone{
      width: 5px;
      height: 15px;
      margin-top: 5px;
      float: left;
      background-color: #152D67;
    }
    .divtwo{
      width: 5px;
      height: 25px;
      float: right;
      background-color: #154897;
    }
  }
  .tit{
    display: inline-block;
    // vertical-align: bottom;
    padding-left: 10px;
    color: #F9FFFF;
  }
  .btns{
    margin-left: 56px;
    position: relative;
    z-index: 99999;
    .btn{
      padding: 1px 10px;
      background: none;
      border: 1px solid  rebeccapurple;
      border-radius: 5px;
      margin: 0 10px;
      cursor: pointer;
      text-decoration: none;
      font-size: 12px;
    }
    .active{
      background: rebeccapurple!important;
    }
  }
}
</style>
