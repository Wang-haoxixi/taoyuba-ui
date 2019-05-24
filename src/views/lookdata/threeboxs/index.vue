<template>
  <div class="thisthrees">
    <div class="titleBox">
      <div class="divBox">
        <div class="divone"></div>
        <div class="divtwo"></div>
      </div>
      <p class="tit">目录共享开放统计</p>
    </div>
    <div class="forbox">
      <div class="foritem">
        <p class="linh">{{share[0].name}}</p>
        <p class="numes" style="color:#c29e8c;">{{share[0].value}}</p>
      </div>
      <div class="foritem">
        <p class="linh">{{share[1].name}}</p>
        <p class="numes" style="color:#9c89ca;">{{share[1].value}}</p>
      </div>
      <div class="foritem">
        <p class="linh">{{share[2].name}}</p>
        <p class="numes" style="color:#287e54;">{{share[2].value}}</p>
      </div>
      <div class="foritem">
        <p class="linh" style="border-right:none;">{{share[3].name}}</p>
        <p class="numes" style="color:#9c89ca;">{{share[3].value}}</p>
      </div>
    </div>
    <!-- 中间四个表盘 -->
    <div class="looks">
      <div class="lookbox" v-for="(item, index) in tal" :key="index">
        <top-first :data="item"></top-first>
        <div class="bg-the">
          <thefirst :data="item"></thefirst>
        </div>
      </div>
    </div>
    <div class="centers">
      <centersbox></centersbox>
    </div>
    <div class="bottombox">
      <bottomboxs></bottomboxs>
    </div>
  </div>
</template>

<script>
import thefirst from './fourboxs/thefirst'
import centersbox from './centersbox'
import bottomboxs from './bottomboxs'
import TopFirst from './TopFirst/'
import {getOpenDirectorySharingCount,getOpenDirectorySharingPercent} from '@/api/lookdata/index'
export default {
  components: { thefirst, centersbox, bottomboxs, TopFirst},
  data (){
    return{
      num:4,
      share:[
        {name:"",value:""},
        {name:"",value:""},
        {name:"",value:""},
        {name:"",value:""},
      ],
      tal:[

      ],

    }
  },
  mounted () {
    getOpenDirectorySharingCount().then(({data})=>{
      let resData = data.data
      let newData = []
      // console.log(resData)
      for(let key in resData){
        newData.push(resData[key])
      }
      this.share = newData
    })
    getOpenDirectorySharingPercent().then(({data})=>{
      let resData = data.data
      let newData = []
      // console.log(resData)
      for(let key in resData){
        newData.push({
          name: resData[key].name,
          link: resData[key].link,
          value: resData[key].value,
        })
      }
      this.tal = newData
    })
  },
}
</script>


<style lang="scss" scoped>
  .bg-the{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
.thisthrees{
  position: relative;
}
.thisthrees::after{
  content: '';
  width: 400px;
  height: 1px;
  background-color: #1d3768;
  position: absolute;
  top:336px;
  left: 45px;
}
.thisthrees::before{
  content: '';
  width: 400px;
  height: 1px;
  background-color: #263b7e;
  position: absolute;
  top:710px;
  left: 45px;
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
    vertical-align: top;
    padding-left: 10px;
    color: #F9FFFF;
  }
}
.forbox{
  width: 100%;
  margin-left: 30px;
  margin-top: 15px;
}
.foritem{
  width: 110px;
  height: 75px;
  // background-color: yellow;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  font-size:14px;
  color: #fff;
}
.linh{
  line-height: 1;
  border-right: 1px solid #fff;
  color: #DCE8F7;
}
.numes{
  font-size: 22px;
  margin-top: 10px;
}
.looks{
  width: 100%;
}
.lookbox{
  width: 50%;
  height: 90px;
  display: inline-block;
  box-sizing: border-box;
  margin-top: 10px;
  vertical-align: top;
  position: relative;
}
.centers{
  width: 100%;
  height: 360px;
  // background-color: red;
  margin-top: 20px;
}
.bottombox{
  width: 100%;
  // background-color: gray;
  height: 280px;
  margin-top: 15px;
}
</style>
