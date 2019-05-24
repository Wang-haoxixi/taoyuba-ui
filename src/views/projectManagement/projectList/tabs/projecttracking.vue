<template>
  <div>
    <div class="pro_infor" v-for="(item,index) in track" :key="index">
      <div class="pro_infor_nam">
        <div class="pro_infor_icon"></div>
        <span>{{item.name}}</span>
      </div>
      <div class="pro_infor_detial">
        <ul>
          <li v-for="(item1,index1) in item.docList" :key="index1">
            <span>
              {{item1.docName}}
            </span>：
            <span style="color:#000;">
              {{item1.url}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  
</template>
<script>
import {getProjectTrack} from '@/api/projectManagement/projectDoc'
export default {
  data (){
    return{
      track:[],
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
     //获取任务
    getTrack () {
      var params = {projectId:this.id}
      getProjectTrack(params).then(({data}) => {
        this.track = data
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.pro_infor{
  padding: 10px 0 15px 0;
  border-bottom: 1px dashed #e4e4e4;
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
      width: 48%;
      line-height: 25px;
      padding-left: 30px;
      padding-bottom: 5px;
      font-size: 14px;
      float: left;
      a:hover{
        text-decoration: none;
      }
      span{
        color:#888888;
      }
      .red{
        color: red;
      }
    }
    ul>li::before{
      content: '★';
      margin-right: 8px;
      color: #ccc;
    }
  }
}
.pro_infor:last-child{
  border-bottom: none;
}
</style>
