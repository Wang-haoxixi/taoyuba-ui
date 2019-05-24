<template>
  <ve-wordcloud :data="chartData"></ve-wordcloud>
</template>

<script>
export default {
  data () {
    return {
      chartData: {
        columns: ['word', 'count'],
        rows: [{
          'word': '水巢DIPS',
          'count': 452,
        }, {
          'word': '微服务',
          'count': 729,
        }, {
          'word': '营商通',
          'count': 427,
        }, {
          'word': 'Spring Boot',
          'count': 720,
        }, {
          'word': 'Java',
          'count': 1087,
        }, {
          'word': '电子政务',
          'count': 1258,
        }, {
          'word': '互联网+政务服务',
          'count': 2987,
        }, {
          'word': '智慧城市',
          'count': 1001,
        }, {
          'word': 'DIPS',
          'count': 644,
        }, {
          'word': '平台运营',
          'count': 586,
        }, {
          'word': '营商环境',
          'count': 1070,
        }, {
          'word': 'Java基础',
          'count': 567,
        }, {
          'word': '项目管理',
          'count': 1806,
        }, {
          'word': '数字政府',
          'count': 820,
        }, {
          'word': '规划与咨询',
          'count': 839,
        }, {
          'word': '信息资源',
          'count': 1147,
        }, {
          'word': '数据治理',
          'count': 939,
        }, {
          'word': '数据元',
          'count': 592,
        }, {
          'word': '国脉内网',
          'count': 527,
        }, {
          'word': '区块链',
          'count': 433,
        }, {
          'word': '人工智能',
          'count': 404,
        }, {
          'word': '产品设计',
          'count': 499,
        }, {
          'word': 'JavaEE',
          'count': 547,
        }, {
          'word': '事项梳理',
          'count': 364,
        }, {
          'word': '数据服务',
          'count': 308,
        }, {
          'word': 'DNA',
          'count': 225,
        }, {
          'word': '淘鱼吧',
          'count': 220,
        }, {
          'word': '市场开发',
          'count': 252,
        }, {
          'word': '咨询',
          'count': 262,
        }, {
          'word': '分布式',
          'count': 147,
        }, {
          'word': '网站规划',
          'count': 186,
        }, {
          'word': '数据分析',
          'count': 144,
        }, {
          'word': '政策分析',
          'count': 131,
        }, {
          'word': '规划',
          'count': 156,
        }, {
          'word': '信息资源梳理',
          'count': 147,
        }],
      },
    }
  },
}
</script>