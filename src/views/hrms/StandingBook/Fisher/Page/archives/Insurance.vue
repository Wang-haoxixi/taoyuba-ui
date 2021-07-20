<template>
    <div class="crew">
        <div style="margin-top: 21px">
            <el-tabs v-model="activeName" type="card" >
                <el-tab-pane label="综合责任险" name="first"></el-tab-pane>
                <el-tab-pane label="附加机损险" name="1"></el-tab-pane>
                <el-tab-pane label="全损险" name="2"></el-tab-pane>
                <el-tab-pane label="雇主责任险" name="3"></el-tab-pane>
            </el-tabs>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="时间">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="保险期限">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="保额">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="赔付">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="承包人">
                    </el-table-column>
                    <el-table-column
                    prop="zip"
                    label="受益人">
                    </el-table-column>
                    <el-table-column
                    label="保单详情"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
  },
  mounted () {
  },
  props: {
  },
  methods: {
    getData () {

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