<template>
  <div class="news-con">
    <el-card class="news-list" v-for="news in newsList" :key="news.id" shadow="hover">
      <div class="text">
        <h4 class="sub-title">
          <el-tag class="classTag">{{news.class}}</el-tag><span class="sub-title-con">{{news.title}}</span>
        </h4>
        <p class="list-content">{{news.content}}</p>
        <div class="list-item-description">
          <span class="time"><i class="iconfont icon-shijian"></i>{{news.time}}</span>
          <span class="see"><i class="iconfont icon-yanjing"></i>{{news.browse}}</span>
          <div class="classTag">
            <el-tag type="white" v-for="item in news.tags" :key="item.id">{{item.tag}}</el-tag>
          </div>
        </div>
      </div>
      <div class="img" v-show="isShow">
        <img :src="news.img" alt="" />
      </div>
    </el-card>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: true,
      newsList: [
        {
          id: '1',
          class: '喜报',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
          content: '2019年3月8日，是第109个“国际劳动妇女节”，“浙江省第三届创新女杰颁奖典礼暨2019女性创新创业大会”在杭州举行，由浙江省高新技术企业协会、浙江省女企业家协会、浙江省科技新浙商促进会、浙江省科技创新企业协会联合主办，科技金融时报承办。舟山国脉集团有限公司总经理郑爱军获颁“浙江创业女杰”荣誉称号，以表彰其在创新创业方面的骄人实力和魅力，及其在浙江信息化发展、最多跑一次改革、数字政府、智慧城市、营商环境等领域做出的突出智慧贡献。',
          time: '2019-03-08',
          browse: '110人浏览',
          tags: [
            {
              tag: '创新创业',
            },
            {
              tag: '浙江创业女杰',
            },
            {
              tag: '浙商',
            },
          ],
          img: '../img/bg/news1.jpg',
        },
        {
          id: '2',
          class: '要闻',
          title: '2019国脉春季中高层研讨会在舟山圆满举行',
          content: '4月12日-14日，“2019国脉春季中高层研讨会”在舟山国脉举行。国脉集团董事长杨冰之、总经理郑爱军、副总经理刘佳、副总经理王路燕、副总经理黄磊、总经理助理谢海艳、总经理助理李凯共七位高层及上海、江西、宁波、舟山等分支机构的班长、核心骨干20余人集聚一堂，围绕“工作部署、管理升维、业务学习”，重点就部门工作汇报、集团与分支机构关系、项目责任制、内网2.0、重要项目与方案、创新技术等开展了交流与探讨。',
          time: '2019-04-15',
          browse: '145人浏览',
          tags: [
            {
              tag: '核心骨干',
            },
            {
              tag: '春季中高层研讨会',
            },
            {
              tag: '交流与探讨',
            },
          ],
          img: '../img/bg/news5.jpg',
        },
        {
          id: '3',
          class: '要闻',
          title: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察',
          content: '2019年3月13日，中国建设银行董事长秘书、首席经济学家黄志凌率总行战略规划部总经理乐玉贵、战略规划部处长董积生、机构业务部副处长刘琦、战略规划部博士后刘志勇，建行浙江分行副行长劳新江、信息技术部工程师褚国平，建行舟山分行行长章奇、副行长金伟强莅临舟山国脉考察，国脉集团董事长杨冰之、总经理郑爱军、副总经理黄磊、战略合作总监汪淼及舟山国脉全体员工表示 热烈欢迎。',
          time: '2019-03-13',
          browse: '75人浏览',
          tags: [
            {
              tag: '黄志凌',
            },
            {
              tag: '莅临舟山国脉考察',
            },
            {
              tag: '建设银行',
            },
          ],
          img: '../img/bg/news6.jpg',
        },
        {
          id: '4',
          class: '通知',
          title: '2018年度国脉“精彩瞬间评选”活动进入投票环节：请您投票 助力国脉精彩',
          content: '为全面回顾公司在 2018 年取得的各项工作成绩，记录展示全员在工作进程/团队建设中的精彩瞬间，体现国脉“大学校、大家庭、大舞台”的企业文化精髓，进一步激发和鼓舞全体员工奋发向上，推进公司稳健发展。经过为期一个月的照片征集和学习与人力委员会初步筛选后评选进入了最后的全员投票环节，12月8日—14日期间就你喜欢的精彩瞬间投上宝贵的一票，为国脉精彩瞬间助力。',
          time: '2018-12-13',
          browse: '135人浏览',
          tags: [
            {
              tag: '精彩瞬间',
            },
            {
              tag: '国脉精彩瞬间',
            },
            {
              tag: '企业文化精髓',
            },
          ],
          img: '../img/bg/n.jpg',
        },
        {
          id: '5',
          class: '团建',
          title: '2018国脉互联广佛秋季团建活动圆满收官',
          content: '2018年10月20日，在国脉集团副总经理刘佳（以下简称“刘总”）的带领下，国脉互联广佛地区全体员工前往三水区南山镇南丹山森林王国，开展以“广佛联动、不忘初心、砥砺前行”为主题的团建活动。活动由综合管理部精心策划，旨在增进广佛团队凝聚力、促进内部沟通与交流。',
          time: '2018-10-22',
          browse: '57人浏览',
          tags: [
            {
              tag: '团建',
            },
            {
              tag: '内部沟通与交流',
            },
            {
              tag: '广佛',
            },
          ],
          img: '../img/bg/t.jpg',
        },
        {
          id: '6',
          class: '喜报',
          title: '国脉海南项目获海南省十佳大数据应用案例',
          content: '2018年12月19日，海南省工业与信息化厅、海口市人民政府联合主办的“2018年海南‘互联网+’创新创业节——第二届中国人工智能与大数据海南高峰论坛暨2018年海南省大数据产业联盟年会”在海口举行。',
          time: '2019-02-13',
          browse: '123人浏览',
          tags: [
            {
              tag: '国脉海南项目',
            },
            {
              tag: '海南省十佳大数据应用案例',
            },
            {
              tag: '‘互联网+’创新创业节',
            },
          ],
          img: '../img/bg/x4.jpg',
        },
        {
          id: '7',
          class: '喜报',
          title: '热烈庆祝广州国脉公司乔迁开业',
          content: '随着发展规模扩大，2019年3月，国脉集团旗下子公司广州国脉互联信息咨询有限公司正式乔迁至珠江国际大厦，并于3月11日举行乔迁开业仪式，集团董事长杨冰之、总经理郑爱军、副总经理刘佳、佛山国脉和深圳国脉员工代表及部分合作伙伴和客户到场出席、共庆乔迁之喜，华为技术有限公司、平安科技（深圳）有限公司、数字广东网络建设有限公司、中国新电信集团有限公司、广东省电子政务协会、广东合生越华房地产有限公司等合作伙伴赠花篮道贺。',
          time: '2019-03-13',
          browse: '97人浏览',
          tags: [
            {
              tag: '广州国脉',
            },
            {
              tag: '广州国脉公司乔迁开业',
            },
            {
              tag: '乔迁',
            },
          ],
          img: '../img/bg/x.jpg',
        },
        {
          id: '8',
          class: '喜报',
          title: '舟山中船通荣获国家高新技术企业',
          content: '近日，根据国家《高新技术企业认定管理办法》和《高新技术企业认定管理工作指引》相关规定，经严格评审，舟山中船通大数据发展有限公司成功荣获“国家高新技术企业”称号。',
          time: '2019-01-12',
          browse: '78人浏览',
          tags: [
            {
              tag: '国家高新技术企业',
            },
            {
              tag: '中船通',
            },
            {
              tag: '舟山中船通',
            },
          ],
          img: '../img/bg/x1.jpg',
        },
        {
          id: '9',
          class: '喜报',
          title: '高效支撑海南实现数据共享100%，国脉收到客户表扬信',
          content: '据海南省人民政府网政务动态显示，海南省大数据和政务信息共享工作取得重要进展，11月底前完成所有可共享数据目录与实体数据挂接，实现数据共享率100%。',
          time: '2018-12-29',
          browse: '101人浏览',
          tags: [
            {
              tag: '客户表扬信',
            },
            {
              tag: '数据共享100%',
            },
            {
              tag: '国脉',
            },
          ],
          img: '../img/bg/x2.jpg',
        },
        {
          id: '10',
          class: '喜报',
          title: '国脉64名开发人员获“阿里巴巴编码规范证书”',
          content: '近日，公司为规范化管理产品与技术开发流程，进一步提升软件研发效率与质量，呼吁开发人员积极参加各类Java编码规范考试。为响应号召，在国脉产品与技术委员会的组织下，全公司69名开发人员于上周统一报考“阿里巴巴编码规范（Java）”认证，最终64人合格、通过率高达92%。董事长杨冰之对此表示肯定和祝贺，并于11月16日在舟山召开的产品与技术大会上，亲自表彰和奖励舟山大区全体考试通过人员。',
          time: '2018-11-20',
          browse: '102人浏览',
          tags: [
            {
              tag: '阿里巴巴编码规范证书',
            },
            {
              tag: '开发',
            },
            {
              tag: '软件研发',
            },
          ],
          img: '../img/bg/x3.jpg',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.news-list {
  text-align: left;
  margin-bottom: 5px;
  padding: 25px 0 20px;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  .classTag {
    padding: 0 6px;
    height: 22px;
    line-height: 20px;
  }
  .list-item-description {
    .classTag {
      height: auto;
    }
  }
  &:nth-child(1) {
    padding-top: 10px;
  }
  .sub-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text {
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
    &:hover .sub-title-con {
      color: #cb3737;
    }
  }
  .list-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-item-description {
    display: flex;
    justify-content: flex-start;
    font-size: 12px;
    .time,
    .see {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 30px;
      color: #999;
      i {
        margin-right: 3px;
      }
    }
    .time {
      i {
        font-size: 12px;
      }
    }
    .el-tag {
      margin-right: 5px;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
  }
  .classTag {
    margin-right: 8px;
  }
  .img {
    flex: 0 0 22%;
    height: 140px;
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
}
.news-con {
  text-align: center;
  .el-pagination {
    margin: 25px 0;
  }
}
</style>
<style scoped>
.news-list >>> .el-card__body {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
}
.news-list >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
