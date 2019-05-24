<template>
  <div>
    <div class="situationbox">
      <div class="situations">
        <div class="situationicon">
          <i class="iconfont icon-bum"></i>
        </div>
        <div class="situationtext">
          <p class="textTit">部门数量</p>
          <p class="textNum" style="color:#c69165;">{{data.deptSum}}</p>
        </div>
      </div>
      <div class="situations">
        <div class="situationicon">
          <i class="iconfont icon-xitongguanli-"></i>
        </div>
        <div class="situationtext">
          <p class="textTit">信息系统总数</p>
          <p class="textNum" style="color:#33a05d;">{{data.systemSum}}</p>
        </div>
      </div>
      <div class="situations">
        <div class="situationicon">
          <i class="iconfont icon-cz-guiji"></i>
        </div>
        <div class="situationtext">
          <p class="textTit">信息资源总数</p>
          <p class="textNum" style="color:#a886da;">{{data.resrcSum}}</p>
        </div>
      </div>
      <div class="situations">
        <div class="situationicon">
          <i class="iconfont icon-shuju6"></i>
        </div>
        <div class="situationtext">
          <p class="textTit">数据项总数</p>
          <p class="textNum" style="color:#2977cc;">{{data.elementSum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {geResrcSum} from '@/api/lookdata/index'
export default {
  data (){
    return {
      data:{

      },
      num:{
        label:'部门数量',
        value:1234,
      },
      sys:{
        label:'信息系统总数',
        value:1234,
      },
      message:{
        label:'信息资源总数',
        value:1234,
      },
      thing:{
        label:'数据项总数',
        value:1234,
      },
    }
  },
  mounted () {
    geResrcSum().then(({data})=>{
      this.data = data.data
    })
  },
}
</script>


<style lang="scss" scoped>
// situationbox
.situationbox{
  width: 100%;
  height: 200px;
  padding: 0 20px;
  .situations{
    // background-color: yellow;
    width: 50%;
    box-sizing: border-box;
    float: left;
    margin-top: 20px;
    .situationicon{
      color: #fff;
      width: 31px;
      height: 33px;
      display: inline-block;
      margin: 15px;
      i{
        width: 100%;
        height: 100%;
        line-height: 33px;
        text-align: center;
        font-size: 33px;
        font-weight: normal;
      }
    }
    .situationtext{
      color: #fff;
      display: inline-block;
      vertical-align: top;
      line-height: 30px;
      font-size: 14px;
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
.situationbox:after{
  content: '';
  clear: both;
}
</style>
