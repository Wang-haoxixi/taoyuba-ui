<template>
    <div class="crew">
        <div style="margin-top: 21px">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="时间">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="港口">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="人数">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="进出港类型">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">合同</el-button>
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
        <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="70%">
            <el-table
                :data="tableDataList"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="姓名">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="身份证">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="手机">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="籍贯">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="职务">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="证书号码">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'prot',
  data () {
    return {
        tableData: [],
        tableDataList: [],
        page: {
            total: 0,
            size: 10,
            current: 1,
        },
        dialogVisible: false,
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

</style>