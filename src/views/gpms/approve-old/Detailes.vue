<template>
  <div class="addDia">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col class="cent" :span="9"><p class="addFont">详情</p></el-col>
      <el-col :span="9" class="cent">
        <iep-button class="callbackAdd">返回</iep-button>
      </el-col>
    </el-row>
    <el-row class="bods">
      <el-col :span="24" class="boxmen" >
        <p class="tit"><strong>立项信息</strong></p>
        <el-row class="bodys">
          <el-col :span="12">
            <ul>
              <li class="lies">编号：{{rows.manay}}</li>
              <li class="lies">项目类型：</li>
              <li class="lies">
                相关客户：
                <el-button class="sps">佛山市经济和信息化局</el-button>
              </li>
              <li class="lies">
                市场经理：
                <el-button class="sps">殷亚增</el-button>
              </li>
              <li class="lies">
                项目标签：
                <el-button class="sps">互联网+政务服务</el-button>
                <el-button class="sps">顶层规划</el-button>
              </li>
              <li class="lies">
                相关产品：
                <el-button class="sps">数据基因</el-button>
              </li>
              <li class="lies">
                合作部门：
                <el-button class="sps">国脉海洋信息发展有限公司</el-button>
              </li>
              <li class="lies">
                发布人：
                <el-button class="sps">殷亚增</el-button>
              </li>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <li class="lies">项目名称：{{rows.name}}</li>
              <li class="lies">业务类型：</li>
              <li class="lies">项目预算（万元）：</li>
              <li class="lies">
                项目指导人：
                <el-button class="sps">王五</el-button>
              </li>
              <li class="lies">是否关联产品：</li>
              <li class="lies">
                承接部门：
                <el-button class="sps">佛山司马钱信息技术有限公司</el-button>
              </li>
              <li class="lies">
                集团外部合作伙伴：
                <el-button class="sps">南光文化创意产业有限公司</el-button>
              </li>
              <li class="lies">发布时间：</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" class="boxmen">
        <p class="tit"><strong>会议纪要</strong></p>
        <el-row class="paleft">
          <el-col :span="24" v-for="(item,index) in meeting" :key="index">
            <a class="jumps" :href="item.hre">{{item.name }}</a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="9">
        <el-button style="width:100%;" type="info">返回</el-button>
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
      // 会议标签遍历
      // 以上按钮可点击跳转都这么搞，获取数据替换一下就好
      meeting:[
        {
          name:'2018年国脉年会“十大方案解读与学习培训大会”（下午）会议纪要分享',
          hre:'javascript:;',
        },
        {
          name:'2018年国脉十四周年年会委员会年度工作总结与2019工作计划汇报会议纪要分享',
          hre:'javascript:;',
        },
      ],
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
  .boxmen{
    border: 1px solid gray;
  }
  .tit{
    margin: 0;
    padding: 10px 20px 15px 20px;
    font-size: 14px;
  }
  .bodys{
    // background-color: red;
    padding-left: 110px;
  }
  .lies{
    font-size: 12px;
    padding: 17px 0;
    color: #666666;
    // height: 30px;
  }
  .sps{
    // background-color: aqua;
    padding: 5px 7px;
    border: 1px solid #666666;
    border-radius: 0;
    font-size: 12px;
  }
  .paleft{
    padding-left: 45px;
  }
  .jumps{
    display: block;
    font-size: 14px;
    margin-top: 15px;
  }
</style>