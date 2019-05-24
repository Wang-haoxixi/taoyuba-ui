<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="联盟基本信息" :backOption="backOption">
        <template>
          <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        </template>
      </page-header>
      <el-form :model="form" class="form-detail" size="small" ref="form" label-width="120px">
        <el-form-item label="联盟Logo：">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </el-form-item>
        <el-form-item label="联盟名称：" prop="name" class="form-half">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联盟简称：" prop="orgAbrName" class="form-half">
          <el-input v-model="form.abrName" placeholder="请输入联盟简称"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" prop="creator" class="form-half">
          <el-input v-model="form.creatorName" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="establishTime" class="form-half">
          <iep-date-picker type="date" v-model="form.establishTime"></iep-date-picker>
        </el-form-item>
        <el-form-item label="人员规模：" prop="scale" class="form-half">
          <el-input v-model="form.scale" placeholder="请输入人员规模"></el-input>
        </el-form-item>
        <el-form-item label="卓越标签：">
          <iep-tag v-model="form.abilityTag"></iep-tag>
        </el-form-item>
        <el-form-item label="专业标签：">
          <iep-tag v-model="form.learningTag"></iep-tag>
        </el-form-item>
        <el-form-item label="联盟简介：" prop="intro">
          <iep-input-area v-model="form.intro" placeholder="验证码登录使用"></iep-input-area>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMethod">
          <el-input v-model="form.contactMethod" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="联盟架构：" prop="structure">
          <iep-froala-editor v-model="form.structure"></iep-froala-editor>
        </el-form-item>
        <el-form-item label="业务布局：" prop="">
          <el-form-item label="软件：" prop="phone" class="form-half2">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="咨询：" prop="phone" class="form-half2">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="数据：" prop="phone" class="form-half2">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="创新：" prop="phone" class="form-half2">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="平台：" prop="phone" class="form-half2">
            <el-input></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item class="opex" label="系统联系人员：" prop="phone">
          <div class="con">
            <div class="opex-item" v-for="(opex,index) in opexList" :key="index">
              <i class="icon-shanchu1 close" @click="handleClose(index)"></i>
              <div class="img">
                <span class="bgb">{{opex.name1}}</span>
                <img :src="opex.img" alt="">
              </div>
              <span class="name">{{opex.name}}</span>
            </div>
            <el-upload>
              <el-button class="el-icon-plus" type="button" circle size="big"></el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item class="opex" label="联盟客服人员：" prop="phone">
          <div class="con">
            <div class="opex-item" v-for="opex2 in opexList2" :key="opex2.id">
              <i class="icon-shanchu1 close" @click="handleClose2(opex)"></i>
              <div class="img">
                <span class="bgb">{{opex2.name1}}</span>
                <img :src="opex2.img" alt="">
              </div>
              <span class="name">{{opex2.name}}</span>
            </div>
            <el-upload>
              <el-button class="el-icon-plus" type="button" circle size="big"></el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm } from './options'
import { getOrgBySelf, putOrg } from '@/api/goms/org'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      opexList: [
        {
          img: require('./img/people1.png'),
          name1: '陈珊',
          name: '客服一',
        },
        {
          img: require('./img/people2.jpg'),
          name1: '邵佳欢',
          name: '客服二',
        },
        {
          img: require('./img/people3.jpg'),
          name1: '章佩瑜',
          name: '客服三',
        },
      ],
      opexList2: [
        {
          img: require('./img/people1.png'),
          name1: '邵佳欢',
          name: '业务产品',
        },
        {
          img: require('./img/people2.jpg'),
          name1: '章佩瑜',
          name: '技术支持',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    handleClose (index) {
      this.opexList.splice(index, 1)
    },
    handleClose2 (opex) {
      this.opexList2.splice(opex, 1)
    },
    handleSubmit () {
      putOrg(this.form).then(() => {
        this.$message({
          message: '联盟修改信息成功',
          type: 'success',
        })
        this.$emit('onGoBack')
      })
    },
    loadPage () {
      getOrgBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.form-detail {
  .form-half2 {
    display: inline-block;
    width: 33.3333%;
  }
}
.opex {
  .con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .name {
      display: block;
      margin-top: 10px;
      padding: 2px 10px;
      line-height: 20px;
      font-size: 12px;
      border-radius: 10px;
      background-color: #eee;
    }
    .opex-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
      cursor: pointer;
      .close {
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        font-size: 10px !important;
        width: 14px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        border-radius: 50%;
        background-color: #cb3737;
        color: #fff;
        z-index: 2;
      }
      &:hover .close {
        opacity: 0.7;
      }
    }
  }
  .img {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ebeef5;
    overflow: hidden;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .bgb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 50px;
      font-size: 12px;
      text-align: center;
      display: block;
      border-radius: 50%;
      color: #fff;
      z-index: 100;
      opacity: 0;
      -webkit-transition: all 0.5s;
      transition: all 0.5s;
    }
    &:hover .bgb {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
}
</style>
