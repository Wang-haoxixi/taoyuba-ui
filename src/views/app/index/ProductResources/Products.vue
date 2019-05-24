<template>
  <div class="products">
    <el-scrollbar style="height:100%">
      <div v-for="(item,index) in productsList" :key="index" class="piece">
        <div class="img"><img :src="item.img" :alt="item.name"></div>
        <div class="box">
          <span class="name">{{item.name}}</span>
          <span class="desc">{{item.desc}}</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productsList: [
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
        { img: require('../img/chanpin2.jpg'), name: 'DIPS', desc: 'DIPS是基于数据元和工作流程标准化规范上，提供标准化、智能标签高度关联、数据服务自主建模、多源数据海量DIPS是基于数据元和工作流程标准化' },
        { img: require('../img/chanpin3.jpg'), name: '营商通系统', desc: '“营商通”系统是一个通用、完善、易操作、可扩展的事项、主题和材料梳理与管理体系。' },
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
        { img: require('../img/chanpin2.jpg'), name: 'DIPS', desc: 'DIPS是基于数据元和工作流程标准化规范上，提供标准化、智能标签高度关联、数据服务自主建模、多源数据海量DIPS是基于数据元和工作流程标准化' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.products{
  height: 304px;
  padding-left: 15px;
  .piece{
    overflow: hidden;
    margin-bottom: 15px;
    &:hover{
      cursor: pointer;
    }
  }
  .img{
    width: 140px;
    height: 80px;
    float: left;
    margin: 0 15px 0 0;
    overflow: hidden;
    img {
      width: 140px;
      height: 80px;
      transition: 0.5s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  .box{
    width: 355px;
    height: 80px;
    float: left;
    .name{
      width: 100%;
      font-size: 16px;
      height: 36px;
      line-height: 36px;
    }
    .desc{
      width: 100%;
      line-height: 20px;
      font-size: 14px;
      color: #999;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
