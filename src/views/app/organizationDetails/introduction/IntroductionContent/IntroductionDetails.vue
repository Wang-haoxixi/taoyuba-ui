<template>
  <div class="introduction-details">
    <div class="tags-detail">
      <span class="details-title">{{subTitle1}}</span>
      <div class="tags-con">
        <span>卓越：</span>
        <span class="tags" v-for="item in tags" :key="item.id">
          {{item.tag}}
        </span>
      </div>
      <div class="tags-con">
        <span>专业：</span>
        <span class="tags" v-for="item2 in tags2" :key="item2.id">
          {{item2.tag}}
        </span>
      </div>
    </div>
    <div class="brief">
      <span class="details-title">{{subTitle2}}</span>
      <p class="con">{{con}}</p>
    </div>
    <div class="contact">
      <span class="details-title">{{subTitle3}}</span>
      <span class="con"><span>官网地址 ：{{website}}</span>
        <span>官方新浪微博：{{blog}}</span></span>
    </div>
    <framework></framework>
    <business-layout></business-layout>
    <div class="opex">
      <span class="details-title">{{subTitle4}}</span>
      <div class="con">
        <div class="opex-item" v-for="opex in opexList" :key="opex.id">
          <div class="img"><span class="bgb">{{opex.name1}}</span><img :src="opex.img" alt=""></div>
          <span class="name">{{opex.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Framework from './Framework'
import BusinessLayout from './BusinessLayout'
export default {
  components: { Framework, BusinessLayout },
  data () {
    return {
      subTitle1: '组织标签',
      subTitle2: '组织简介',
      subTitle3: '联系方式',
      subTitle4: '组织运维',
      opexList: [
        {
          img: require('../img/people1.png'),
          name1: '陈珊',
          name: '客服一',
        },
        {
          img: require('../img/people2.jpg'),
          name1: '邵佳欢',
          name: '客服二',
        },
        {
          img: require('../img/people3.jpg'),
          name1: '章佩瑜',
          name: '客服三',
        },
      ],
      tags: [
        {
          tag: '中高层任免',
        },
        {
          tag: '文化深化',
        },
        {
          tag: '组织架构',
        },
        {
          tag: '管理规范',
        },
        {
          tag: '战略合作',
        },
        {
          tag: '制度制定',
        },
        {
          tag: '战略设计与管理',
        },
        {
          tag: '股权设计',
        },
        {
          tag: '员工激励',
        },
        {
          tag: '种子培养',
        },
      ],
      tags2: [
        {
          tag: '数据能力',
        },
        {
          tag: '内部协作',
        },
        {
          tag: '内网建设',
        },
        {
          tag: '战略合作',
        },
        {
          tag: '资本运作',
        },
      ],
      con: '国脉集团是中国领先的大数据治理和数据服务专业机构。创新提出“软件+咨询+平台+数据+创新业务”五位一体的服务模型，拥有数据基因（DNA）和水巢（DIPS）两大系列几十项软件产品。',
      website: 'www.bing.com',
      blog: '@国脉研发中心',
    }
  },
}
</script>
<style lang="scss" scoped>
.tags-detail,
.brief,
.contact,
.framework,
.business-layout,
.opex {
  margin-bottom: 30px;
}
.contact {
  .con {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
  }
}

.tags-con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tags {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: #ba1b21;
  }
  &:nth-child(1) {
    padding-left: 0;
  }
  &::before {
    position: absolute;
    content: "";
    top: 10px;
    right: -7px;
    width: 15px;
    height: 1px;
    background-color: #666;
    transform: rotate(125deg);
    -o-transform: rotate(125deg);
    -moz-transform: rotate(125deg);
    -webkit-transform: rotate(125deg);
  }
  &:last-child::before {
    display: none;
  }
}
.opex {
  .con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .name {
      display: block;
      margin-top: 10px;
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 10px;
      background-color: #eee;
    }
    .opex-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .img {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ebeef5;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .bgb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 50px;
      font-size: 12px;
      text-align: center;
      display: block;
      border-radius: 50%;
      color: #fff;
      z-index: 100;
      opacity: 0;
      -webkit-transition: all 0.5s;
      transition: all 0.5s;
    }
    &:hover .bgb {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
}
</style>
<style scoped>
.introduction-details >>> .details-title {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
