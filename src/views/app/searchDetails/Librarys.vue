<template>
  <div class="librarys-content">
    <div style="height: 100vh;" v-loading="loading" v-if="loading"></div>
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index" v-else v-show="item.type == clickType || clickType == 0">
      <div class="box" :class="item.img ? 'haveimg' : ''">
        <div class="title-box">
          <span class="type">{{item.type}}</span><span class="title">{{item.title}}</span>
        </div>
        <p class="desc" v-show="item.desc">{{item.desc}}</p>
      </div>
      <div class="img" v-show="item.img">
        <img :src="item.img" :alt="item.type">
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      clickType: 0,
      librarys: [
        {type:'要闻',title:'啊啊啊啊啊啊啊啊啊啊啊啊',desc:'哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦',img:'//cloud.govmade.com/upload/iep/201904/2213fa93-434b-4ae2-8929-1d39236edbef_logo-govmade.png'},
        {type:'材料',title:'啊啊啊啊啊啊啊啊啊啊啊啊',desc:'哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦',img:''},
        {type:'合同',title:'啊啊啊啊啊啊啊啊啊啊啊啊',desc:'',img:''},
      ],
      loading: false,
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods:{
  },
}
</script>
<style scoped lang="scss">
.librarys-item{
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  .box{
    .title-box{
      margin-bottom: 10px;
      .type{
        width: 40px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        display: inline-block;
        margin-right: 10px;
        text-align: center;
        border-radius: 4px;
        color: #f56c6c;
        background: #fef0f0;
        border: 1px solid #fbc4c4;
      }
      .title{
        font-size: 16px;
        height: 22px;
        line-height: 22px;
      }
    }
    .desc{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .haveimg{
    width: 740px;
    float: left;
  }
  .img{
    width: 120px;
    height: 80px;
    float: right;
    > img{
      width: 120px;
      height: 80px;
    }
  }
}
</style>
