<template>
  <div>
    <div class="secondtable">
      <div class="lefticon">
        <i class="iconfont icon-xitongguanli-"></i>
      </div>
      <div class="tablebox">
        <div class="tabitem" v-for="(item,index) in data" :key="index">
          <p class="textNum" :style="`color:#${colors[index]};`">{{item.value}}</p>
          <p class="textTit">{{item.name}}</p>
        </div>
        <!-- <div class="tabitem">
          <p class="textNum" style="color:#bf9a87;">1234</p>
          <p class="textTit">省级系统</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#bba5eb;">1234</p>
          <p class="textTit">市县系统</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#2ca857;">1234</p>
          <p class="textTit">建设中</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#1e93a2;">789</p>
          <p class="textTit">运行中</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#178df5;">1234</p>
          <p class="textTit">停用</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#bf9a87;">1234</p>
          <p class="textTit">政务外网</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#bba5eb;">1234</p>
          <p class="textTit">政务内网</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#2ca857;">1234</p>
          <p class="textTit">互联网</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#1e93a2;">789</p>
          <p class="textTit">业务专网</p>
        </div>
        <div class="tabitem">
          <p class="textNum" style="color:#178df5;">1234</p>
          <p class="textTit">单机</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {getSysState} from '@/api/lookdata/index'
export default {
  name: 'SecondTable',
  data (){
    return {
      data: [],
      colors: ['bf9a87','bba5eb','2ca857','1e93a2','178df5','bf9a87','bba5eb','2ca857','1e93a2','178df5'],
    }
  },
  mounted (){
    getSysState().then(({data})=>{
      let newData = []
      for(let key in data.data){
        newData.push({
          name: key,
          value: data.data[key],
        })
      }
      this.data = newData
    })
  },
}

</script>

<style lang="scss" scoped>
.secondtable{
  height: 170px;
  width: 100%;
  padding: 0 75px;
  .lefticon{
    width: 35px;
    height: 31px;
    float: left;
    margin-top: 60px;
    i{
      color:#fff;
      font-size: 36px;
      font-weight: normal;
    }
  }
  .tablebox{
    width: 560px;
    float: left;
    .tabitem{
      float: left;
      color: #fff;
      font-size: 14px;
      line-height: 30px;
      margin-top: 10px;
      margin-left: 55px;
      text-align: center;
      width: 56px;
      .textTit{
        color: #DCE8F7;
      }
      .textNum{
        font-size: 22px;
        color: gray;
      }
    }
  }
}
.secondtable:after{
  content: '';
  clear: both;
}
.tabitem:after{
  content: '';
  clear: both;
}
</style>
