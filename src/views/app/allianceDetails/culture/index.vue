<template>
  <div>
    <div class="culture" v-html="culture">
      {{culture}}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      culture: '<div class="con"><span class="title">国脉愿景</span>网络价值构建师、数据治理架构师</div><div class="con"><span class="title">国脉目标</span>国内一流国际有影响力的知名品牌——受人尊敬与信任<br/>智慧报国的强烈使命感——可以与国际咨询和信息服务业巨头对话<br/>网络价值构建师的专业梦想——在网络世界扮演独特的关键角色</div><div class="con"><span class="title">国脉文化</span>专业：以产品取胜，以服务创优，为客户创造价值，帮助客户成功！<br/>卓越：有历史使命感，有国际化视野，致力打造一流的咨询品牌!<br/>忠诚：对公司、事业、同事和客户保持感恩、奉献、团结和友善的态度！<br/>进步：不畏艰难、时刻学习，永不自满，积极创新！</div><div class="con"><span class="title">国脉特质</span>专家：一流咨询、技术专家团队和广泛的专家合作网络。<br/>专注：以科学、规范和创新的方式输出国脉智慧。<br/>专业：矢志不渝地致力于信息化数据治理的咨询、技术、平台服务。</div><div class="con"><span class="title">国脉环境</span>大学校<br/>大家庭<br/>大舞台</div><div class="con"><span class="title">国脉特质</span>专家：一流咨询、技术专家团队和广泛的专家合作网络。<br/>专注：以科学、规范和创新的方式输出国脉智慧。<br/>专业：矢志不渝地致力于信息化数据治理的咨询、技术、平台服务。</div><div class="con"><span class="title">发展路径</span>成才(学生-专家)<br/>成长(员工-国脉人)<br/>成功(常人-精英)</div><div class="con"><span class="title">基本要求</span>进取心-学习（动手、动脑）<br/>归属感-做人（真心、真情）<br/>成就感-做事（用心、用时）</div><div class="con"><span class="title">精神特质</span>求知若渴、勤奋好学、甘当小学生<br/>服从领导、尊重他人、关爱集体<br/>激情创业、专业表现、追求卓越</div><div class="con"><span class="title">日常表现</span>时时、处处学习，多记多想多用，成果分享，建立有效的个人自学和团队培训计划<br/>自信自强、乐于助人，高效沟通，和谐相处，包容激励，批评与自我批评<br/>思路清晰，又好又快，规范创新，团队作战；强调专业，注重细节</div><div class="con"><span class="title">主要措施</span>专家培养体系、职称评定、师徒制、自学计划、员工进步档案<br/>自我评定、国脉之星、建言献策、文体活动、感恩基金、互助基金<br/>项目质量管理、客户评价、职务评定、工作绩效评定、人人持股</div>',
    }
  },
}
</script>
<style lang="scss" scoped>
.culture {
  margin: 20px;
}
</style>
<style lang="css" scoped>
.culture >>> .con {
  margin-bottom: 35px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}
.culture >>> .title {
  display: block;
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  border-left: 3px solid #cb3737;
}
</style>
