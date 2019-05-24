<template>
  <div>
    <div class="titleBox" style="margin-bottom: 20px;">
      <div class="divBox">
        <div class="divone"></div>
        <div class="divtwo"></div>
      </div>
      <p class="tit">信息资源实施排行</p>
    </div>
    <div class="thtitle">
      <div class="th">部门</div>
      <div class="th">目录总数</div>
      <div class="th">已提交目录数</div>
      <div class="th">信息系统数</div>
    </div>
    <div class="tabbox">
      <table>
        <tr class="thtitle">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="(item,index) in tds" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.resrcsum}}</td>
          <td>{{item.submitted}}</td>
          <td>{{item.surnum}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {getRescVO} from '@/api/lookdata/index'
export default {
  data (){
    return{
      shows:1,
      tds:[],
    }
  },
  mounted () {
    getRescVO().then(({data})=>{
      this.tds = data.data
    })
  },

  methods:{
    handleone (){
      this.shows = 1
    },
    handletwo (){
      this.shows = 2
    },
    handlethree (){
      this.shows = 3
    },
  },
}
</script>


<style lang="scss" scoped>
// titlebox
.thtitle{
  width: 100%;
  overflow: hidden;
  .th{
    color:#DCE8F7;
  }
  div{
    float: left;
    width: 25%;
    height: 40px;
    line-height: 40px;
    border:2px solid #35498e;
    color: #fff;
    background-color: #1c3667;
    font-weight: 400;
    font-size: 13px;
    text-align: center;
    border-right-width: 1px;
  }
}
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
  .circularbox{
    margin-right: 50px;
    margin-top: 6px;
    float:right;
    .circular{
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #fff;
      float: left;
      cursor: pointer;
      margin-left: 15px;
    }
    .circularcolor{
      background-color: #144c9e;
    }
  }
}
.tabbox{
  overflow-y: auto;
  height: 290px;
  margin-top: 10px;
  position: relative;
}
table{
  width: 100%;
  height: 290px;
  overflow-y: auto;
  th{
    width: 25%;
    border-color:#14143a;
    color: #DCE8F7;
    background-color: #14143a;
    font-weight: 400;
    font-size: 13px;
  }
  td{
    height: 38px;
    border: none;
    text-align: center;
    color: #E1EEF3;
    font-size: 12px;
  }
}

</style>
