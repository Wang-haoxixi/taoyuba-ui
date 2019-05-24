<template>
  <div class="addDia">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col class="cent" :span="9"><p class="addFont">详情</p></el-col>
      <el-col :span="9" class="cent">
        <iep-button class="callbackAdd">返回</iep-button>
      </el-col>
    </el-row>
    <el-row class="bods">
      <div class="contractBox">
        <div class="contractBoxTop">
          <p class="tits">项目经理授权书 <span class="number">编号：<span class="initstit">GM20190001</span></span></p>
          <p class="pls"><span class="prs">张三</span><strong>先生/女士：</strong></p>
          <p class="indents">现任命你为 <span class="prs">佛山市智慧城市顶层设计规划编制</span>项目的项目经理，全权负责该项目的项目管理工作，同时授子相关的签字和审批权限。你的工作职责包括:</p>
          <p class="pls">1.管理客户关系和管控项目实施全过程，获取客户的满意和信任；</p>
          <p class="pls">2.管理项目团队，使之高效而又愉快地工作，并获得最满意的工作体验；</p>
          <p class="pls">3.按照规定的需求、进度、成本和质量预期完成项目的交付任务。</p>
          <p class="pls">4.完成领导交力的其他工作。</p>
          <p class="indents">此任命自 <span class="prs">2018</span> 年 <span class="prs">12</span> 月 <span class="prs">13</span>日发布之日起生效，
          至&nbsp;<span class="prs">2019</span> 年 <span class="prs">3</span> 月 <span class="prs">19</span>日项目结项之日起失效。
          </p>
          <p class="pls">本授权书一式三份，项目执行与质量委员会、部门及本人各执一份。</p>
          <p class="pls">被授权人无转乘托权，特此委托。</p>
          <p class="texright">授权单位：湖南国脉原道数据科技有限公司(衡阳办事处、长沙)</p>
          <p class="texright padr">被授权人：<span class="prs">张三</span>日期：<span class="prs">2018年12月10日</span></p>
        </div>
        <p class="indents pasaml">我已经认真阅读了并完全理解了任命书中的内容，并承诺对工作职责中所规定的内容全责。</p>
        <p class="pasaml"><strong>项目经理信息：</strong></p>
        <p class="pls">
          <span>姓名：</span>
          <span>张三</span>
          <span class="pls">性别：</span>
          <span>男</span>
          <span class="pls">年龄：</span>
          <span>27</span>
        </p>
        <p class="pls">身份证号码：<span>XXXXXXXXXXXXXXXXX</span></p>
        <p class="pls">联系电话：<span>XXXXXXXXXX</span></p>
        <p class="pls">通讯地址：<span>XXXXXXXXX</span></p>
        <p class="pls">邮 编：<span>XXXXXXXXXXXX</span></p>
      </div>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="9">
        <el-button style="width:100%;" type="info" plain>返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins:[mixins],
  data (){
    return{
      
    }
  },
  props: {
    rows: {
      type: Object,
    },
  },
}
</script>


<style lang="scss" scoped>
  .addDia{
    width: 100%;
    background-color: #fff;
  }
  .row-bg{
    padding: 0 20px;
    border-bottom: 1px solid gray;
  }
  .callbackAdd{
    float: right;
    margin-top: 15px;
  }
  .addFont{
    font-weight: bold;
    font-size: 18px;
  }
  .cent{
    margin: 0;
  }
  .bods{
    box-sizing: border-box;
    padding: 10px 20px;
  }
  // 合同
  .contractBox{
    width: 750px;
    border: 1px solid gray;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .contractBox p{
    line-height: 40px;
  }
  .contractBoxTop{
    border-bottom: 1px solid gray;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .tits{
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    margin: 0;
  }
  .number{
    float: right;
    margin-right: 10px;
    font-size: 16px;
    line-height: 45px;
  }
  .initstit{
    font-size: 14px;
  }
  .prs{
    padding-right: 50px;
    border-bottom: 1px solid gray;
  }
  .pls{
    padding-left: 35px;
  }
  .indents{
    text-indent: 2em;
  }
  .texright{
    text-align: right;
    font-weight: bold;
  }
  .pasaml{
    padding-left: 10px;
  }
  .padr{
    padding-right: 57px;
  }
</style>