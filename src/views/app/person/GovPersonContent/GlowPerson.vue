<template>
  <div class="resources">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button class="btn" type="text" slot="right">换一批</el-button>
      <div>
        <div class="classify">
          <span class="sub-title">分类：</span>
          <span class="pieceDeletion" v-for="(name,index) in nameList" :key="index" :class="showClass1==index?'color':''" @click="tab1(index)">{{name.name}}<span class="data-con">{{name.data}}</span></span>
        </div>
        <div class="resourcesList">
          <div v-for="(item,index) in resourcesList" :key="index" class="piece" @click="handleOpen()">
            <div class="img-con"><img :src="item.img" class="img" alt=""></div>
            <div class="text">
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
            </div>
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
      showClass1: 0,
      title: '光彩国脉人',
      linkName: '',
      nameList: [
        {
          name: '技术之星',
          data: '(2人)',
        },
        {
          name: '品牌达人',
          data: '(11人)',
        },
        {
          name: '销售达人',
          data: '(56人)',
        },
        {
          name: '材料达人',
          data: '(34人)',
        },
        {
          name: '贡献达人',
          data: '(13人)',
        },
      ],
      resourcesList: [
        { img: '../img/person/p01.jpg', name: '李凯', department: '北方区业务一部' },
        { img: '../img/person/p02.jpg', name: '符恩祖', department: '海南办事处' },
        { img: '../img/person/p03.jpg', name: '张小燕', department: '北方业务一部' },
        { img: '../img/person/p04.jpg', name: '洪琼', department: '湖南国脉原道数据科技有限公司（衡阳办事处、长沙）' },
        { img: '../img/person/p05.jpg', name: '阮晨光', department: '国脉集团研发中心' },
        { img: '../img/person/p06.jpg', name: '杜照鸿', department: '国脉集团研发中心' },
        { img: '../img/person/p07.jpg', name: '张兵', department: '国脉集团研发中心' },
        { img: '../img/person/p08.jpg', name: '何舟杰', department: '国脉先锋队' },
        { img: '../img/person/p09.jpg', name: '潘超巧', department: '国脉先锋队' },
      ],
    }
  },
  methods: {
    tab1 (val) {
      this.showClass1 = val
    },
    handleOpen () {
      this.$router.push({
        path: '/app/personal_style',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.data-con {
  font-size: 12px;
}
.resources {
  .classify {
    padding: 9px 0;
    .sub-title + .appellation {
      color: #cb3737;
      background: #fef0f0;
      border-color: #cb3737;
    }
  }
  .pieceDeletion {
    display: inline;
    padding: 2px 10px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .color {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
  }
  .name {
    font-size: 16px;
  }
}
.resourcesList {
  display: grid;
  margin-top: 15px;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 20px;
  padding: 20px 0 13px;
  .piece {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    .img-con {
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    .img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .text {
      margin-left: 20px;
      width: 70%;
    }
    .department {
      display: block;
      margin-top: 5px;
      color: #999;
    }
  }
}
.btn {
  float: right;
  padding: 5px 0;
  color: #cb3737;
  &:hover {
    color: #f56c6c;
  }
}
.cardTitle {
  font-size: 18px;
  .datas {
    color: #999;
  }
}
</style>
