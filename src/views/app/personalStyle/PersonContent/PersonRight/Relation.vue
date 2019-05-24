<template>
  <div class="relation">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right" @click="show" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></el-button>
      <div class="item" v-for="(title,index) in titleList" :key="index" v-show="isShow">
        <span class="title">{{title.title1}}</span>
        <div class="person-list">
          <div class="person" v-for="(item,index1) in title.itemList" :key="index1">
            <div class="img">
              <img :src="item.img" alt="">
            </div>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true,
      title: '人物关系',
      titleList: [
        {
          title1: '标签相似',
          itemList: [
            {
              img: require('../../img/pr1.jpg'),
              name: '何舟杰',
            },
            {
              img: require('../../img/p8.jpg'),
              name: '邵奇凯',
            },
            {
              img: require('../../img/p09.jpg'),
              name: '潘超巧',
            },
            {
              img: require('../../img/p07.jpg'),
              name: '张兵',
            },
          ],
        },
        {
          title1: 'TA的师徒',
          itemList: [
            {
              img: require('../../img/pr1.jpg'),
              name: '何舟杰',
            },
            {
              img: require('../../img/p8.jpg'),
              name: '邵奇凯',
            },
            {
              img: require('../../img/p09.jpg'),
              name: '潘超巧',
            },
            {
              img: require('../../img/p07.jpg'),
              name: '张兵',
            },
          ],
        },
        {
          title1: '协作伙伴',
          itemList: [
            {
              img: require('../../img/pr1.jpg'),
              name: '何舟杰',
            },
            {
              img: require('../../img/p8.jpg'),
              name: '邵奇凯',
            },
            {
              img: require('../../img/p09.jpg'),
              name: '潘超巧',
            },
            {
              img: require('../../img/p07.jpg'),
              name: '张兵',
            },
          ],
        },
      ],
    }
  },
  methods: {
    show () {
      this.name = 'el-icon-arrow-up',
        this.isShow = !this.isShow
    },
  },
}
</script>
<style lang="scss" scoped>
.btn {
  float: right;
  padding: 5px 0;
  color: #999;
}
.relation {
  .item {
    .title {
      display: block;
      margin-bottom: 10px;
    }
    .person-list {
      display: grid;
      grid-auto-flow: row dense;
      grid-row-gap: 15px;
      grid-column-gap: 15px;
      grid-template-columns: 2fr 2fr 2fr 2fr;
      margin-bottom: 18px;
    }
    .person {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      .img {
        width: 60px;
        height: 60px;
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
      .name {
        margin-top: 5px;
        font-size: 13px;
      }
      &:hover {
        color: #999;
      }
    }
  }
}
</style>
