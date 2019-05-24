<template>
  <div class="grid-content">
    <iepAppTabCard :title="title">
      <div class="tenLinkOne" v-for="(item,index) in tenLinksOne" :key="index">
        <i :class="item.icon"></i>
        <p class="title" v-text="item.title"></p>
        <p class="des" v-text="item.des"></p>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉十统一',
      tenLinksOne: [
        { icon: 'icon-xuexishuben', 'title': '宣传册5个', des: '内涵非常广泛' },
        { icon: 'icon-wendang', 'title': 'ppt4个', des: '内涵非常广泛' },
        { icon: 'icon-vi', 'title': 'VI体系13个', des: '内涵非常广泛' },
        { icon: 'icon-qiyejianjie', 'title': '简介14个', des: '内涵非常广泛' },
        { icon: 'icon-shipin', 'title': '宣传片13个', des: '内涵非常广泛' },
        { icon: 'icon-dangan', 'title': '短期材料15个', des: '内涵非常广泛' },
        { icon: 'icon-guanggaogongguan', 'title': '频台广告34个', des: '内涵非常广泛' },
        { icon: 'icon-shangye', 'title': '商业资料14个', des: '内涵非常广泛' },
        { icon: 'icon-shuben1', 'title': '大事记22个', des: '内涵非常广泛' },
        { icon: 'icon-peixun', 'title': '会议培训26个', des: '内涵非常广泛' },
      ],
    }
  },
}
</script>
<style scoped lang='scss'>
.grid-content {
  grid-column-start: 1;
  grid-column-end: 3;
  .tenLinkOne {
    width: 20%;
    height: 120px;
    display: inline-block;
    margin: 15px 0;
    text-align: center;
    i {
      font-size: 38px!important;
      color: #aaa;
    }
    .title{
      font-size: 16px;
    }
    p {
      font-size: 14px;
      color: #333;
      margin-bottom: 0;
    }
    .des {
      color: #aaa;
      margin-bottom: 15px;
    }
  }
}
.title {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
  line-height: 1.4;
}
</style>
