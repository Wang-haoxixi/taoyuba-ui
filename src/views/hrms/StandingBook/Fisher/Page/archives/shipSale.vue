<template>
    <div class="crew">
        <div style="margin-top: 21px">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="updateTime"
                    label="历史交易时间">
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="流转地点">
                    </el-table-column>
                    <el-table-column
                    prop="sellerName"
                    label="买方">
                    </el-table-column>
                    <el-table-column
                    prop="buyerName"
                    label="卖方">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="作业类型">
                        <template slot-scope="scope">
                            <div> {{ getLabel('tyb_resume_worktype',scope.row.activityType) }} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="zip"
                    label="交易方式">
                        <template>
                            <div> 交易服务中心 </div>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <div style="text-align: center;margin: 20px 0;">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :total="page.total"
                :page-size="page.size"
                :current-page.sync="page.current"
                @size-change="handleSizeChange"
                @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { ByShipName } from '@/api/ships/index.js'
export default {
  name: 'prot',
  data () {
    return {
        tableData: [],
        activeName: 'first',
        page: {
            total: 0,
            size: 10,
            current: 1,
        },
    }
  },
  created () {
      this.getData()
  },
  mounted () {
  },
  props: {
    shipNo: {
      default: '',
      type: String,
    },
  },
  methods: {
    getData () {
      ByShipName({...this.page,shipNo: this.shipNo}).then(res=>{
        this.tableData = res.data.data.records
        console.log(this.tableData)
        this.page.total = res.data.data.total
      })
    },
        // 获取字典
    getLabel (dic,arr) {
        let data = ''
            this.$store.state.cache.dictGroup[dic].forEach(element => {
                if( element.value === arr ){
                    data = element.label
                }
            })
        return data
    },
    handleSizeChange (val) {
      this.page.size = val
      this.page.current = 1
      this.getData()
    },
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
  },
  components: {
  },
}
</script>
<style scoped lang="scss">
.crew {
    .crew-title {
        display: flex;
        border: 1px solid #EDEDED;
        padding: 21px 0;
        .crew-title-bu {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #EDEDED;
        }
    }
    .crew-title-bg {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #7AC149;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        img {
            width: 20px;
        }
    }
    .crew-title-text {
        div:first-child {
            color: #666666;
            font-size: 16px;
        }
        div {
            color: #999999;
            font-size: 14px;
        }
    }
}
</style>