<template>
  <div class="member">
    <div class="block">
      <span class="details-title">{{subTitle1}}</span>
      <div class="con">
        <div class="item" v-for="detail in datailList" :key="detail.id">
          <div class="img"><img :src="detail.img" alt=""></div>
          <span class="name">{{detail.name}}</span>
          <span class="post">{{detail.post}}</span>
        </div>
      </div>
    </div>
    <div class="block">
      <span class="details-title">{{subTitle2}}</span>
      <div class="con">
        <div class="item" v-for="detail2 in datailList2" :key="detail2.id">
          <div class="img"><img :src="detail2.img" alt=""></div>
          <span class="name">{{detail2.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      subTitle1: '管理者',
      subTitle2: '普通成员',
      datailList: [
        {
          img: require('./img/p100.jpg'),
          name: '黄磊',
          post: '（所有者）',
        },
        {
          img: require('./img/p120.jpg'),
          name: '何益挺',
        },
        {
          img: require('./img/p322.jpg'),
          name: '潘超巧',
        },
      ],
      datailList2: [
        {
          img: require('./img/p07.jpg'),
          name: '张兵',
        },
        {
          img: require('./img/p05.jpg'),
          name: '阮晨光',
        },
        {
          img: require('./img/p08.jpg'),
          name: '何舟杰',
        },
        {
          img: require('./img/p07.jpg'),
          name: '张兵',
        },
        {
          img: require('./img/p05.jpg'),
          name: '阮晨光',
        },
        {
          img: require('./img/p08.jpg'),
          name: '何舟杰',
        },
        {
          img: require('./img/p07.jpg'),
          name: '张兵',
        },
        {
          img: require('./img/p05.jpg'),
          name: '阮晨光',
        },
        {
          img: require('./img/p08.jpg'),
          name: '何舟杰',
        },
        {
          img: require('./img/p06.jpg'),
          name: '杜召红',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('./img/p02.jpg'),
          name: '符恩祖',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.member {
  margin: 20px;
  .block {
    margin-bottom: 40px;
    .con {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      .item {
        display: flex;
        margin: 0 20px 25px;
        flex-direction: column;
        align-items: center;
        .name {
          margin-top: 10px;
        }
        .post {
          margin-top: 2px;
          color: #999;
        }
      }
    }
  }
  .details-title {
    display: block;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .img {
    width: 80px;
    height: 80px;
    border: 1px solid #ebeef5;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
