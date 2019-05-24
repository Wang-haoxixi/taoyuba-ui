<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">出单分析</span>
      <operation-search @search-page="searchPage" advance-search class="search">
        <advance-search @search-page="searchPage"></advance-search>
      </operation-search>
    </div>
    <div>
      <el-row>
        <div class="echarts">
          <el-row>
            <el-col :span="10">
              <district></district>
            </el-col>
            <el-col :span="9">
              <business></business>
            </el-col>
            <el-col :span="5">
              <div class="echarts lines">
                <div class="line"></div>
                <div class="percent">
                  <el-progress type="circle" :percentage="percent" color="#D56368" :stroke-width="10" status="text">
                    {{percent+'%'}} <br>
                    出单率
                  </el-progress>
                </div>
                <div class="msg" v-if="isShow">{{region}}客户，{{info}}类客户居多,为{{percent+'%'}}；</div>
                <div class="suggest">{{proposal}}最少</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import Business from './Business'
import District from './District'
import AdvanceSearch from './AdvanceSearch'
import { getAllClientNum } from '@/api/crms/count'
import { getBusinessMax, getBusinessMin } from '@/api/crms/count'
import { getDistrict } from '@/api/crms/count'
export default {
  components: { Business, District, AdvanceSearch },
  data () {
    return {
      percent: 70,
      business: [],
      info: '',
      proposal: '',
      businessMin: [],
      region: '',
      data: [
        { value: '0', name: '咨询', label: 'consulting' },
        { value: '0', name: '数据', label: 'information' },
        { value: '0', name: '会议培训', label: 'meetingTraining' },
        { value: '0', name: '业务类型其他', label: 'othersBusiness' },
        { value: '0', name: '外包', label: 'outsourcing' },
        { value: '0', name: '平台', label: 'platform' },
        { value: '0', name: '产品', label: 'product' },
        { value: '0', name: '技术服务', label: 'technicalService' },
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
      isShow: true,
    }
  },
  created () {
    this.load()
  },
  methods: {
    searchPage () {
    },
    toPercent (num, total) {
      return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
    },
    load () {
      getAllClientNum().then(res => {
        this.percent = this.toPercent(res.data.data.contractQuantity, res.data.data.clientQuantity)
      })
      getBusinessMax().then(res => {
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
              this.business.push(this.data1[i].name)
            }
          }
        }
        this.info = this.business.join('，')
      })
      getBusinessMin().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i = 0; i < this.data1.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data1[i].label == keys[index]) {
              this.businessMin.push(this.data[i].name)
            }
          }
        }
        this.proposal = this.businessMin.join('，')
      })
      getDistrict().then(res => {
        this.region = res.data.data[0].marketManager
      })

    },
  },
}
</script>

<style lang="scss" scoped>
.clearfix {
  .title {
    font-weight: 700;
    font-size: 18px;
    padding-right: 10px;
  }
}
.search {
  float: right;
}
.echarts {
  height: 300px;
  padding: 15px 10px;
  position: relative;
  .percent {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 15px;
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
