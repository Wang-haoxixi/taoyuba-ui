<template>
  <div class="business-details">
    <div class="title">{{formData.clientName}}</div>
    <div class="inform">
      <div class="btn sc"><i class="iconfont icon-shoucang"></i>收藏</div>
      <div class="btn fx"><i class="iconfont icon-youxiangshixin"></i>分享</div>
      <div class="btn jc"><i class="iconfont icon-zhuyi"></i>纠错</div>
    </div>
    <div class="form">
      <div class="item" v-for="(item, index) in contentList" :key="index">
        <div class="form-title">{{item.name}}</div>
        <div class="form-content" v-if="item.type == 'tag'">
          <el-tag type="info" v-for="(t, i) in formData[item.value]" :key="i" size="mini">{{t.commonName}}</el-tag>
        </div>
        <div class="form-content" v-else-if="item.type == 'dict'">{{dictList[item.dictName][formData[item.value]]}}</div>
        <div class="form-content" v-else>{{formData[item.value]}}</div>
      </div>
    </div>
    <!-- <IepAppRewardCard :total="total" :dataList="rewardList"></IepAppRewardCard>
    <IepAppEvaluationReviews :id="formData.id" :objectType="1"></IepAppEvaluationReviews> -->
  </div>
</template>
<script>
import { getBusinessById } from '@/api/crms/business'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      formData: {},
      contentList: [
        { name: '客户名称：', value: 'clientName' },
        { name: '项目名称：', value: 'projectName' },
        { name: '业务类型：', value: 'businessType', type: 'tag' },
        { name: '意向程度：', value: 'intentionLevelValue' },
        { name: '商机描述：', value: 'opportunityDes' },
        { name: '商机标签：', value: 'tags', type: 'tag' },
        { name: '发布者：', value: 'publisher' },
        { name: '发布日期：', value: 'publishDate' },
        { name: '认领状态：', value: 'statusValue' },
        { name: '创建状态：', value: 'isCreate', type: 'dict', dictName: 'isCreate' },
        { name: '认领人：', value: 'reciver' },
      ],
      dictList: {
        isCreate: {
          1: '已创建',
          0: '未创建',
        },
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    loadData (id) {
      getBusinessById(id).then(({ data }) => {
        this.formData = data.data.data
      })
    },
  },
  created () {
    let params = this.$route.params
    this.loadData(params.id)
  },
}
</script>
<style lang="scss" scoped>
.business-details {
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
  .form {
    display: flex;
    flex-wrap: wrap;
    background-color: #fafafa;
    margin: 20px 0;
    padding: 20px;
    .item {
      width: 50%;
      display: flex;
      margin-bottom: 10px;
      .form-title {
        width: 100px;
      }
      .form-content {
        flex: 1;
        .el-tag {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>

