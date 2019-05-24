<template>
    <div class="container">
      <div class="brief" style="overflow:hidden;"  @click="getTask">
        <el-row>
          <el-col :span="5">
            <span class="fontStyle">{{tableDataAll.projectDutyDept}}</span>
          </el-col>
          <el-col :span="5">
            <span class="fontStyle">{{tableDataAll.projectName}}</span>
          </el-col>
          <el-col :span="5">
            <span class="fontStyle">{{tableDataAll.deptNum}}</span>
          </el-col>
          <el-col :span="5">
            <span class="fontStyle">{{tableDataAll.task}}</span>
          </el-col>
          <el-col :span="5">
            <el-row type="flex" justify="center">
              <el-col :span="20" class="circle_cont">
                <div class="myCircle">
                  <div class="circle_pross" :style="{height:tableDataAll.pross===100?'calc(100% + 1px)':tableDataAll.pross}"></div>
                </div>
                <div class="pross">{{tableDataAll.pross}}%</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <transition name="el-fade-in-linear">
        <div class="task_container" v-show="show">
          <div class="triangle"></div>
        <el-row class="task_head">
          <el-col :span="5">
            <p class="font">项目名称</p>
          </el-col>
          <el-col :span="7">
            <p class="font">任务名称</p>
          </el-col>
          <el-col :span="6">
            <p class="font">协同部门</p>
          </el-col>
          <el-col :span="6">
            <p class="font">任务进度</p>
          </el-col>
        </el-row>
        <div class="task_content">
          <div class="col_left_container">
            <div class="pro_cont">
              <div>
                <p>{{tableDataAll.projectName}}</p>
              </div>
            </div>
          </div>
          <div class="col_right_container"> 
            <main-table :tableData="tableDataAll.projectTaskVOList"></main-table>
          </div>
        </div>
      </div>
      </transition>
      <transition name="el-fade-in-linear" v-for="(item,index) in tableDataAll.projectChildVOList" :key="index">
        <div class="task_container" v-show="show">
          <div class="triangle"></div>
        <el-row class="task_head">
          <el-col :span="5">
            <p class="font">子项目名称</p>
          </el-col>
          <el-col :span="7">
            <p class="font">任务名称</p>
          </el-col>
          <el-col :span="6">
            <p class="font">协同部门</p>
          </el-col>
          <el-col :span="6">
            <p class="font">任务进度</p>
          </el-col>
        </el-row>
        <div class="task_content">
          <div class="col_left_container">
            <div class="pro_cont" >
              <div>
                <p>{{item.projectChildName}}</p>
              </div>
            </div>
          </div>
          <div class="col_right_container">
            <main-table :tableData="item.projectChildTaskVOList"></main-table>
          </div>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
  import mainTable from './mainTable'
  export default {
    data (){
      return {
        show: false,
      }
    },
    props: {
      tableDataAll:{
        type: Array,
        default: null,
      },
    },
    components:{ mainTable },
    methods:{
      getTask (){
        this.show = !this.show
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fontStyle {
    color: #9c9c9c;
  }
  .circle_cont{
    width: 40% !important;
  }
  .myCircle{
    float:left;
    width:35px;
    height:35px;
    margin-top:3px;
    border:1px solid #f6f6f6;
    box-shadow:0 0 2px #bfc9d3;
    border-radius:50%;
    margin-right:3px;
    overflow:hidden;
    position:relative;
    .circle_pross{
      position:absolute;
      left:0;
      right:0;
      bottom:-1px;
      margin:auto;
      width:120%;
      height:50%;
      background:#3994fa;
      transform:rotate(5deg);
      transform-origin:center center;
    }
  }
  .pross{
    float:left;
    width:20px;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .container{
    margin-bottom:20px;
    font-size: 13px;
    color: #605858;
    overflow:hidden;
    width: 100%;
    .task_container{
      width: 90%;
      margin: 0 auto;
      border: 1px solid #d2d2d2;
      margin-top: 30px;
      position: relative;
      .triangle{
        position:absolute;
        left:calc(12% - 30px);
        top:-15px;
        width:30px;
        height:30px;
        transform: rotate(45deg);
        border:2px solid #d2d2d2;

      }
    }
    .task_head{
      &:before{
        content:'';
        width:35px;
        height:2px;
        background:#fff;
        position:absolute;
        left:9%;
        top:-1px;
        margin:auto;
        z-index:99;
      }
      background:#ffffff;
      position:relative;
      .el-col{
        border:1px solid #d2d2d2;
        .font{
          color: #9c9c9c;
          font-size: 12px;
          text-align: center;
          padding: 5px 0;
        }
      }
      .el-row{
        padding:0;
      }
    }
    .task_content{
      overflow:hidden;
      display: flex;
      &>div{
        float:left;
      }
      .col_left_container{
        width: 20.83%;
        color:red;
        position: relative;
        .pro_cont{
          width:100%;
          background: #fdc7a9;
          color:#fffbf9;
          display:flex;
          align-items: center;
          justify-content:center;
          min-height: 48px;
          height:100%;
          box-sizing:border-box;
          padding:0 30px 0 40px;
          span{
            float:left;
            width:20px;
          }
          p{
            float:left;
            width: calc(100% -10px);
          }
        }
      }
      .col_right_container{
        width: 79.17%;
      }
    }
    .brief{
      cursor: pointer;
      height: 42px;
      border: 1px solid #8dbcf4;
      box-shadow: 0 0 4px #e3e3e3;
      .el-col{
        width: 20%;
        text-align: center;
        line-height: 42px;
        font-weight: 900;
      }
    }
  }
  .el-row {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
