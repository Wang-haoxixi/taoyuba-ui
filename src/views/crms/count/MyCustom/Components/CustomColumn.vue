<template>
  <el-card shadow="hover">
    <el-row class="custom">
      <el-col class="head">客户分析</el-col>
    </el-row>
    <el-row>
      <el-col :span='10'>
        <div class="echarts odd">
          <district></district>
        </div>
      </el-col>
      <el-col :span='9'>
        <div class="echarts">
          <business></business>
        </div>
      </el-col>
      <el-col :span='5'>
        <div class="echarts lines">
          <div class="line"></div>
          <div class="msg">您的客户中：</div>
          <div class="msg" v-if="isShow">{{region}}，{{proposal}}类客户居多</div>
          <div class="msg">平均拜访次数：<span class="color">3</span></div>
          <div class="msg">平均方案上传：<span class="color">4</span></div>
          <div class="suggest">建议多寻找{{info}}类客户。</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import District from './District'
import Business from './Business'
import { getDistrictMin, getDistrictMax, getMyBusinessMax } from '@/api/crms/count'
export default {
  components: { District, Business },
  data () {
    return {
      data: [
        { value: '0', name: '部委', label: 'ministriesCommissions' },
        { value: '0', name: '省级', label: 'provincialLevel' },
        { value: '0', name: '市级', label: 'cities' },
        { value: '0', name: '区级', label: 'county' },
        { value: '0', name: '园区', label: 'park' },
        { value: '0', name: '企业', label: 'enterprise' },
        { value: '0', name: '其他', label: 'other' },
      ],
      data1: [
        { value: '0', name: '咨询', label: 'consulting' },
        { value: '0', name: '数据', label: 'information' },
        { value: '0', name: '会议培训', label: 'meetingTraining' },
        { value: '0', name: '业务类型其他', label: 'othersBusiness' },
        { value: '0', name: '外包', label: 'outsourcing' },
        { value: '0', name: '平台', label: 'platform' },
        { value: '0', name: '产品', label: 'product' },
        { value: '0', name: '技术服务', label: 'technicalService' },
      ],
      info: '',
      business: [],
      region: '',
      type: '',
      businessMax: [],
      aaa: [],
      proposal: '',
      isShow: true,
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getDistrictMin().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i = 0; i < this.data.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data[i].label == keys[index]) {
              this.business.push(this.data[i].name)
            }
          }
        }
        this.info = this.business.join('，')
      })
      getDistrictMax().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i in res.data) {
          let key = Object.keys(res.data[i])[0]
          if (res.data[i][key] == 0) {
            this.isShow = false
            break
          }
        }
        for (let i = 0; i < this.data.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data[i].label == keys[index]) {
              this.businessMax.push(this.data[i].name)
            }
          }
        }
        this.region = this.businessMax.join('，')
      })
      getMyBusinessMax().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i = 0; i < this.data1.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data1[i].label == keys[index]) {
              this.aaa.push(this.data1[i].name)
            }
          }
        }
        this.proposal = this.aaa.join('，')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.custom {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
}
.echarts {
  height: 300px;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 20px;
  }
}
.lines {
  padding-left: 20px;
  .line {
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: #eee;
  }
}
</style>
