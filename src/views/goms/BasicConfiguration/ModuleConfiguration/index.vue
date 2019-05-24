<template>
  <div>
    <basic-container>
      <page-header title="模块配置"></page-header>
      <el-row class="row-bg module" :gutter="20">
        <h3 class="item-title">已选模块<span class="sub-title">系统基础模块，不可移除</span></h3>
        <el-col :span="6" class="module-item">
          <div class="module-con">
            <i class="icon iconfont icon-youxiang"></i>
            <span class="text">消息管理</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con">
            <i class="icon iconfont icon-yunweiguanli"></i>
            <span class="text">资源管理</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con">
            <i class="icon iconfont icon-shangpinbiaoqian"></i>
            <span class="text">智能标签</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con">
            <i class="icon iconfont icon-jibenziliao"></i>
            <span class="text">人事管理</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="close el-icon-close"></i></span>
            <i class="icon iconfont icon-shenqing"></i>
            <span class="text">行政审批</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="close el-icon-close"></i></span>
            <i class="icon iconfont icon-gongzuotai"></i>
            <span class="text">项目管理</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="close el-icon-close"></i></span>
            <i class="icon iconfont icon-lianxiren"></i>
            <span class="text">客户管理</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg module" :gutter="20">
        <h3 class="item-title">推荐模块<span class="sub-title">已授权模块，可直接选择添加供组织管理使用</span></h3>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-lianjiekuai"></i>
            <span class="text">商机对接</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-custom"></i>
            <span class="text">考试系统</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-wangluotiaocha"></i>
            <span class="text">调研系统</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-weath2"></i>
            <span class="text">财富管理</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg module test-module" :gutter="20">
        <h3 class="item-title">试用模块<span class="sub-title">测试中的模块，可选择试用，测试阶段记录的数据可能会被清空</span></h3>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-shangchengxiantiao"></i>
            <span class="text">商城系统</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-xuexishuben"></i>
            <span class="text">在线学堂</span>
          </div>
        </el-col>
        <el-col :span="6" class="module-item">
          <div class="module-con module-con-operable">
            <span class="btn"><i class="add el-icon-plus"></i></span>
            <i class="icon iconfont icon-touzi"></i>
            <span class="text">投资模块</span>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {

    }
  },
}
</script>
<style lang="scss" scoped>
.module {
  &:nth-child(3) {
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 20px;
  }
  margin: 0 auto !important;
  width: 85%;
  text-align: center;
  .item-title {
    margin: 0 30px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    .sub-title {
      margin-left: 20px;
      font-size: 14px;
      color: #888;
    }
  }
}
.module-item {
  display: inline-block;
  .module-con {
    position: relative;
    margin: 20px;
    padding: 15px;
    text-align: center;
    border: 1px solid #d7d7d7;
    border-radius: 3px;
    background-color: #fff;
    color: #d7d7d7;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    .icon {
      display: block;
      font-size: 34px;
    }
    .text {
      display: block;
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .module-con-operable {
    &:hover {
      border-color: #bf051a;
      background-color: #fff2f4;
      color: #bf051a;
      .btn {
        border-color: #bf051a;
        background-color: #bf051a;
        .close,
        .add {
          color: #fff;
        }
      }
      .text {
        color: #bf051a;
      }
    }
    .text {
      color: #666;
    }
    .btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 14px;
      height: 14px;
      cursor: pointer;
      display: block;
      border: 1px solid #d7d7d7;
      border-radius: 50%;
      transition: all 0.8s ease-out;
    }
    .close,
    .add {
      display: block;
      font-size: 12px;
      color: #888;
    }
  }
}

.test-module {
  margin-top: 40px !important;
  .module-con {
    border-style: dashed;
    &:hover {
      border-style: solid;
      border-color: #dcdfe6;
      background-color: #f5f7fa;
      color: #909399;
      .text {
        color: #333;
      }
      .add {
        color: #999;
      }
      .btn {
        border-color: #999;
        background-color: #999;
        .close,
        .add {
          color: #fff;
        }
      }
    }
  }
}
@media (max-width: 1169px) {
  .module {
    width: 100%;
  }
}
</style>
