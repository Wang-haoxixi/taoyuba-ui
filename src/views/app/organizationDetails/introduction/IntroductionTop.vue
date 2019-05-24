<template>
  <div class="introduction-top">
    <div class="introduction-top-con">
      <div class="img"><img :src="img" alt=""></div>
      <div class="text">
        <span class="title">{{title}}<span class="sub-title">{{subTitle}}</span></span>
        <span class="detail"><span>创建人：{{founder}}</span><span>成立时间：{{time}}</span><span>人员规模：{{scale}}</span></span>
        <div class="labs-con">
          <div class="data-lab" v-for="lab in labList" :key="lab.id">
            <div class="count">{{lab.data}}</div>
            <div class="labTitle"><span>{{lab.labTitle}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉互联',
      subTitle: 'govemade',
      founder: '杨冰之',
      time: '2017-12-13',
      scale: '500',
      img: require('./img/logo01.jpg'),
      labList: [
        {
          data: '670',
          labTitle: '信用值',
        },
        {
          data: '1455',
          labTitle: '贡献',
        },
        {
          data: '5',
          labTitle: '综合排名',
        },
        {
          data: '19',
          labTitle: '业绩排名',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.introduction-top {
  display: flex;
  margin: 0 20px;
  align-items: center;
  align-content: center;
  height: 180px;
  text-align: center;
  background-size: 100% 100%;
  .introduction-top-con {
    display: flex;
    margin: 0 auto;
    width: 1200px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 55%;
    }
    .labs-con {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      .count {
        font-size: 18px;
      }
      .data-lab {
        padding: 0 20px;
        border-right: 1px solid #eee;
        text-align: center;
        &:nth-child(1) {
          padding-left: 0;
        }
        &:last-child {
          border: 0;
        }
      }
    }
    .text {
      display: flex;
      flex: 2;
      margin-left: 30px;
      flex-direction: column;
      align-items: flex-start;
      flex-wrap: wrap;
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 18px;
        font-size: 18px;
      }
      .sub-title {
        margin-left: 8px;
        font-size: 14px;
      }
    }
    .img {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 228px;
      height: 148px;
      border: 1px solid #ebeef5;
      overflow: hidden;
      background-color: #fff;
      &:hover {
        box-shadow: 0 1px 1px 1px #eee;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: 0.5s;
      }
    }
  }
}
</style>
