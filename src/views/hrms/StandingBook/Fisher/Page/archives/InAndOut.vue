<template>
    <div class="crew">
        <div style="margin-top: 21px">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="createDate"
                    label="时间">
                    </el-table-column>
                    <el-table-column
                    prop="pointName"
                    label="港口">
                    </el-table-column>
                    <el-table-column
                    prop="number"
                    label="人数">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="进出港类型">
                    <template slot-scope="scope">
                      <div>{{ scope.row.type === 'IN' ? '进港' : '出港'}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
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
                    prop="name"
                    label="姓名">
                    </el-table-column>
                    <el-table-column
                    prop="cardNum"
                    label="身份证">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="手机">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                    <el-table-column
                    prop="duty"
                    label="职务">
                    </el-table-column>
                    <el-table-column
                    prop="smNum"
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
import { countContractByShipPage,getCrewByRecordId } from '@/api/ships/index.js'
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
  props: {
    shipName: {
      default: '',
      type: String,
    },
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      countContractByShipPage({...this.page,shipName: this.shipName}).then(res=>{
        this.tableData = res.data.data.records
        this.page.total = res.data.data.total
      })
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
    handleClick (row) {
        this.dialogVisible = false
      this.$router.push(`/boatMan/detail?see=${row.cardNum}`)
    },
    handleLook (row) {
      getCrewByRecordId({ id: row.id }).then(res=>{
        this.tableDataList = res.data.data
        this.dialogVisible = true
      })
    },
  },
  components: {
  },
}
</script>
<style scoped lang="scss">

</style>