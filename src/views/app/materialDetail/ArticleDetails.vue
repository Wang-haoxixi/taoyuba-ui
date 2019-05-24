<template>
  <div class="article-details">
    <div class="title">{{formData.materialName}}</div>
    <div class="inform">
      <img :src="formData.avatar" :alt="formData.creatorRealName">
      <span>{{formData.creatorRealName}}</span>
      <span>{{formData.createTime}}</span>
      <span><i class="iconfont icon-yanjing"></i>{{formData.views}}</span>
      <span><i class="iconfont icon-download1"></i>{{formData.downloadTimes}}</span>
      <div class="btn sc"><i class="iconfont icon-shoucang"></i>收藏</div>
      <div class="btn fx"><i class="iconfont icon-youxiangshixin"></i>分享</div>
      <div class="btn jc"><i class="iconfont icon-zhuyi"></i>纠错</div>
    </div>
    <div class="classes">{{getClass(formData.firstClass, formData.secondClass).first}} - {{getClass(formData.firstClass, formData.secondClass).second}}</div>
    <div class="introduction">{{formData.intro}}</div>
    <div class="content">
      <iep-html v-model="formData.content"></iep-html>
    </div>
    <el-row class="down-load" v-if="formData.attachFile">
      相关附件：
      <div class="file" v-for="(item, index) in formData.attachFileList" :key="index">
        <div @click="downLoad(item)"><i class="icon-fujian"></i>{{item.name}}<span class="tip">（消耗 {{getMoney(formData.downloadCost)}} 下载）</span></div>
      </div>
    </el-row>
    <IepAppRewardCard :total="total" :dataList="rewardList"></IepAppRewardCard>
    <IepAppEvaluationReviews :id="formData.id" :objectType="1"></IepAppEvaluationReviews>
  </div>
</template>
<script>
import { downloadCount, getDataById } from '@/api/mlms/material/datum/material'
import { downloadFile } from '@/api/common'
import { mapGetters } from 'vuex'
import { getConfigureTree } from '@/api/mlms/material/datum/configure'

export default {
  data () {
    return {
      formData: {
        attachFileList: [],
      },
      desc: '数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系',
      label: ['创业女杰', '浙商', '创新创业'],
      total: '6',
      rewardList: [
        { avatar: require('./img/people.png'), name: '杨冰之' },
        { avatar: require('./img/people.png'), name: '杨冰之' },
        { avatar: require('./img/people.png'), name: '杨冰之' },
        { avatar: require('./img/people.png'), name: '杨冰之' },
      ],
      attachFileList: [
        { name: '内网2.0改造项目' },
      ],
      firstClass: [],
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    // 附件下载
    downLoad (obj) {
      if (this.formData.downloadCost > 0) {
        this.$message.error('对不起，您的余额不足！')
        return
      }
      downloadFile(obj)
      // /getUpload/{id}
      downloadCount(this.formData.id)
    },
    loadData (id) {
      getDataById(id).then(({ data }) => {
        this.formData = data.data
      })
    },
    getMoney (val) {
      for (let item of this.dictGroup.mlms_download_cost) {
        if (item.value == val) {
          return item.label
        }
      }
    },
    getClass (first, second) {
      if (!first || !second) {
        return {}
      }
      let obj = {}
      for (let item of this.firstClass) {
        if (item.id == first) {
          obj.first = item.levelName
          for (let t of item.childrens) {
            if (t.id == second) {
              obj.second = t.levelName
              return obj
            }
          }
        }
      }
    },
  },
  created () {
    // 获取分类配置
    getConfigureTree().then(({ data }) => {
      this.firstClass = data.data
    })
    let params = this.$route.params
    this.loadData(params.id)
  },
}
</script>
<style lang="scss" scoped>
.article-details {
  padding: 20px 0;
  .title {
    font-size: 18px;
    color: #333;
    height: 50px;
    line-height: 50px;
  }
  .inform {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
    }
    > span {
      margin-left: 10px;
      display: inline-block;
      > i {
        margin: 4px;
      }
      &:nth-child(4) {
        margin-left: 30px;
      }
      &:nth-child(5) {
        margin-left: 30px;
      }
    }
    .btn {
      position: absolute;
      top: 8px;
      font-size: 16px;
      color: #999;
      > i {
        margin: 4px;
      }
    }
    .sc {
      right: 150px;
      font-size: 14px;
    }
    .fx {
      right: 80px;
      font-size: 14px;
    }
    .jc {
      right: 10px;
      font-size: 14px;
    }
  }
  .classes {
    margin: 0 0 10px 50px;
  }
  .introduction {
    margin: 20px 0;
    padding: 20px;
    background-color: #fafafa;
  }
  .content {
    padding: 0 20px;
    margin: 0 0 20px;
  }
  .down-load {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    .file {
      cursor: pointer;
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: #999;
      }
    }
  }
}
</style>

