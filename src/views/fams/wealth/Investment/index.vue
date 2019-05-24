<template>
  <div class="tasks">
    <basic-container>
      <page-header title="我的投资"></page-header>
      <div class="investment-info">
        <span>我的投资模块主要为个人在内网中进行股权投资的模块，用户可在该模块下进行个人投资的管理、查看收益的统计等</span>
        <span class="red">我的投资模块还在开发中，敬请期待，本页面仅为样式效果演示</span>
      </div>
      <el-card class="investment-item" shadow="hover">
        <ul>
          <li>
            <span class="num">50000.5</span>
            <span class="sub-title">投资金额</span>
          </li>
          <li>
            <span class="num">1000.00</span>
            <span class="sub-title">收益金额</span>
          </li>
          <li>
            <div class="investment-box">
              <span class="num">8/24</span>
              <span class="sub-title">收益排名</span>
            </div>
            <div class="investment">马上投资</div>
          </li>
        </ul>
      </el-card>
      <div class="investment-content">
        <el-card class="box-card left" shadow="hover">
          <div class="investment-details">
            <div class="clearfix details-title">
              <span>投资明细</span>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="投资公司"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="投资方式"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="投资金额">
              </el-table-column>
              <el-table-column
                prop="time"
                label="投资时间">
              </el-table-column>
            </el-table>
          </div>
          <div class="investment-recommend">
            <div class="clearfix recommend-title">
              <span>推荐投资</span>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="投资公司"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="投资方式"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="投资金额">
              </el-table-column>
              <el-table-column
                prop="time"
                label="投资时间">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="box-card right" shadow="hover">
          <div class="investment-my">
            <div class="header clearfix" slot="header">
              <span>我要投资</span>
            </div>
            <div class="text item">
              <span>我的投资</span>
              <span>投资凭证</span>
              <span>收益统计</span>
            </div>
          </div>
          <div class="investment-index">
            <div class="header clearfix" slot="header">
              <span>投资指数</span>
            </div>
            <div>
              <my-data></my-data>
            </div>
            <div class="text item">
              <span> 
                22
                <span>个人</span>
              </span>
              <span>
                32
                <span>团队</span>
              </span>
              <span>
                52
                <span>部门</span>
              </span>
            </div>
          </div>
        </el-card>
      </div>
    </basic-container>
  </div>
</template>
<script>
import MyData from './MyData'
export default {
  components:{
    MyData,
  },
  data () {
    return{
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        time:'2019-04-23',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        time:'2019-04-23',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        time:'2019-04-23',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        time:'2019-04-23',
      }],
    }
  },
}
</script>

<style scoped lang="scss">
.investment-info{
  padding:15px;
  margin-bottom: 15px;
  border: 1px solid #ffdbc1;
  background-color: #fffbf6;
  span{
    display:block;
    line-height: 28px;
    color: #333;
  }
}
.red{
  color:#ba1b21!important;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.investment-content{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;
}
.left {
  grid-column-start :1;
  grid-column-end :3;
}
.right{
  grid-column-start :3;
  grid-column-end :4;
  .header{
    padding:20px 10px 20px 25px;
    border-bottom: 1px solid #eee;
    span{
        font-size: 18px;
      }
  }
  .investment-index{
    .item{
      span{
        padding: 20px;
      }
    }
  }
  .item{
    padding: 30px 0;
    span:nth-last-child(1){
      border-right:none;
    }
    &>span{
      display: inline-block;
      text-align: center;
      padding: 20px 30px;
      border-right: 1px solid #eee;
      span{
        display:block;
      }
    }
  }
}
.investment-item {
  margin-bottom:20px;
  ul{
    padding:15px 0;
    li{
      display:inline-block;
      padding: 0 50px;
      border-right: 1px solid #ddd;
      .investment,.investment-box{
        display:inline-block;
      }
      .investment-box{
        margin-right: 50px;
      }
      .investment{
        border: 1px solid #ba1b21;
        padding: 3px 14px;
        border-radius: 3px;
        color:#fff;
        background-color: #ba1b21;
        vertical-align: 16px;
        cursor: pointer;
      }
    }
    li:nth-last-child(1){
      border-right: none;
    }
  }
  span {
      display: block;
      text-align: center;
    }
    .num {
      font-size: 24px;
    }
    .sub-title {
      color: #999;
    }
}
.details-title,.recommend-title{
  padding:20px 10px 20px 25px;
  font-size: 18px;
}
</style> 
<style scoped>
.tasks>>>.investment-content .el-card__body{
  padding:0;
}
.tasks>>>.el-table th > .cell{
  font-size: 15px;
  padding-left: 25px;
}
.tasks>>>.el-table td{
  padding-left: 15px;
}
.tasks>>>.el-table thead th{
  background-color: #f8f8f8;
}
</style>
