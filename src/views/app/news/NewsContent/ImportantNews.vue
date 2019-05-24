<template>
  <el-card class="important-news" shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">{{title}}</span>
    </div>
    <el-card class="important-list" v-for="important in importantList" :key="important.id" shadow="hover">
      <div class="img"><img :src="important.img" alt=""></div>
      <div class="text">
        <p class="con">{{important.con}}</p>
        <span class="time">{{important.time}}</span>
      </div>
    </el-card>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      title: '推荐要闻',
      importantList: [
        {
          id: '1',
          img: '../img/bg/news1.jpg',
          con: '国脉总经理郑爱军荣获“浙江创业女杰”2019年3月8日，是第109个“国际劳动妇女节”，“浙江省第三届创新女杰颁奖典礼暨2019女性创新创业大会”在杭州举行，由浙江省高新技术企业协会、浙江省女企业家协会、浙江省科技新浙商促进会、浙江省科技创新企业协会联合主办，科技金融时报承办。舟山国脉集团有限公司总经理郑爱军获颁“浙江创业女杰”荣誉称号，以表彰其在创新创业方面的骄人实力和魅力，及其在浙江信息化发展、最多跑一次改革、数字政府、智慧城市、营商环境等领域做出的突出智慧贡献。',
          time: '2019-03-08',
        },
        {
          id: '2',
          img: '../img/bg/news6.jpg',
          con: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察2019年3月13日，中国建设银行董事长秘书、首席经济学家黄志凌率总行战略规划部总经理乐玉贵、战略规划部处长董积生、机构业务部副处长刘琦、战略规划部博士后刘志勇，建行浙江分行副行长劳新江、信息技术部工程师褚国平，建行舟山分行行长章奇、副行长金伟强莅临舟山国脉考察，国脉集团董事长杨冰之、总经理郑爱军、副总经理黄磊、战略合作总监汪淼及舟山国脉全体员工表示 热烈欢迎。',
          time: '2019-03-13',
        },
        {
          id: '3',
          img: '../img/bg/news5.jpg',
          con: '2019国脉春季中高层研讨会在舟山圆满举行4月12日-14日，“2019国脉春季中高层研讨会”在舟山国脉举行。国脉集团董事长杨冰之、总经理郑爱军、副总经理刘佳、副总经理王路燕、副总经理黄磊、总经理助理谢海艳、总经理助理李凯共七位高层及上海、江西、宁波、舟山等分支机构的班长、核心骨干20余人集聚一堂，围绕“工作部署、管理升维、业务学习”，重点就部门工作汇报、集团与分支机构关系、项目责任制、内网2.0、重要项目与方案、创新技术等开展了交流与探讨。',
          time: '2019-04-15',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.important-list {
  display: flex;
  margin-bottom: 5px;
  padding: 15px 0 10px;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  cursor: pointer;
  &:nth-child(1) {
    padding-top: 20px;
  }
  .img {
    flex: 0 0 40%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .text {
    margin-left: 15px;
    flex: 1;
    overflow: hidden;
    .con {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.el-card {
  border: 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-right: 15px;
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
<style scoped>
.important-list >>> .el-card__body {
  display: flex;
  padding: 0;
  justify-content: space-between;
}
.important-news >>> .el-card__body {
  padding: 0;
}
</style>