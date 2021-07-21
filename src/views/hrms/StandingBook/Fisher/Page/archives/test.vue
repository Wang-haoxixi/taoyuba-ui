<template>
    <div class="test">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="test-boss">
                    <div class="test-title">
                        <div>渔船检验</div>
                        <div class="test-title">
                            <el-button style="margin-right: 20px">质量证明书</el-button>
                            <el-date-picker
                                v-model="value2"
                                type="month"
                                placeholder="历史检验记录">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="test-content">
                        <div>本次检验类型：年度检验</div>
                        <div>临时检验：否</div>
                        <div>证书相符：是</div>
                        <div>船证相符：是</div>
                        <div>船图相符：是</div>
                    </div>
                    <div class="test-content">
                        <div>检验地点：{{ list.address }}</div>
                        <div>检验机构：{{ list.enterprise }}</div>
                        <div>检验时间：{{ list.reportTime }}</div>
                        <div>下次检验时间：202-04-07</div>
                        <div>下次换证时间：2022-04-08</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="test-boss">
                    <div class="test-title">
                        <div>检验结果</div>
                        <div class="test-title">
                            <el-button style="margin-right: 20px">质量证明书</el-button>
                            <el-date-picker
                                v-model="value2"
                                type="month"
                                placeholder="历史检验记录">
                            </el-date-picker>
                        </div>
                    </div>
                    <!-- 有些字段没有  我就先写个0代替下 -->
                    <div class="test-content">
                        <div>船体项目：<span :style="list.hullFirstResult ? '' :'color: #E6893A'">{{ list.hullFirstResult ? '合格' : '不合格' }}</span></div>
                        <div>消防项目：<span :style="list.waterFireFightingFirstResult ? '' :'color: #E6893A'">{{ list.waterFireFightingFirstResult ? '合格' : '不合格' }}</span></div>
                        <div>电器项目：<span :style="list.electricAccessoryFirstResult ? '' :'color: #E6893A'">{{ list.electricAccessoryFirstResult ? '合格' : '不合格' }}</span></div>
                        <div>轮机项目：<span :style="list.turbineStandardResult ? '' :'color: #E6893A'">{{ list.turbineStandardResult ? '合格' : '不合格' }}</span></div>
                        <div>其他项目：<span :style="0 ? '' :'color: #E6893A'">{{ 0 ? '合格' : '不合格' }}</span></div>
                    </div>
                    <div class="test-content">
                        <div>渔捞设备：<span :style="list.fishingEquipmentFirstResult ? '' :'color: #E6893A'">{{ list.fishingEquipmentFirstResult ? '合格' : '不合格' }}</span></div>
                        <div>防污染设备：<span :style="0 ? '' :'color: #E6893A'">{{ 0 ? '合格' : '不合格' }}</span></div>
                        <div>防火控火设备：<span :style="list.kitchenFirstResult ? '' :'color: #E6893A'">{{ list.kitchenFirstResult ? '合格' : '不合格' }}</span></div>
                        <div>救生逃生设备：<span :style="list.lifeRaftResult ? '' :'color: #E6893A'">{{ list.lifeRaftResult ? '合格' : '不合格' }}</span></div>
                        <div>航行信号设备：<span :style="list.signalLampResult ? '' :'color: #E6893A'">{{ list.signalLampResult ? '合格' : '不合格' }}</span></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { pageByShipName } from '@/api/ships/index.js'
export default {
  name: 'prot',
  data () {
    return {
        value2: '',
        list: {},
    }
  },
  created () {
      this.getData()
  },
  mounted () {
  },
  props: {
    shipName: {
      default: '',
      type: String,
    },
  },
  methods: {
      getData () {
          pageByShipName({ shipName: this.shipName }).then(res=>{
              console.log(res)
              this.list = res.data.data.records[0] || {}
          })
      },
  },
  components: {
  },
}
</script>
<style scoped lang="scss">
.test {
    padding: 21px;
}
.test-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 24px;
    color: #333333;
}
.test-content {
    margin-top: 20px;
    width: 50%;
    display: inline-block;
    div {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 36px;
        color: #666666;
    }
}
.test-boss {
    border: 1px solid #EDEDED;
    padding: 21px;
    border-radius: 5px;
}
</style>