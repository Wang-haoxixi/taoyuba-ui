<template>
    <div class="crew">
         <basic-container>
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="postExcelExport" type="default" size="small">导出</el-button>
        <!-- <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.idcard" placeholder="身份证" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div> -->
      </div>
        <el-table
          :data="tableData"
          stripe
          @selection-change="handleSelectionChange"
          :row-key="'id'"
          style="width: 100%">
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column
            prop="realName"
            label="申报人"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
          >
          </el-table-column>
          <el-table-column
            prop="shipName"
            label="船名号"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="预转入地"
          >
          </el-table-column>
          <el-table-column
            prop="affiliation"
            label="预挂靠单位"
          >
          </el-table-column>
          <el-table-column
            prop="anchor"
            label="渔船停泊位置"
          >
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="postExcelExportOne(scope.row.id)">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
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
            <div>2323</div>
        </el-dialog>
        </basic-container>
    </div>
</template>
<script>
import { verification,postExcelExport } from '@/api/ships/index.js'
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
        multipleSelection:[],
    }
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
        verification({...this.page}).then(res=>{
            this.tableData = res.data.data.records
            this.page.total = res.data.data.total
        })
    },
    handleSizeChange (val) {
      this.page.size = val
      this.page.current = 1
      this.getData()
    },
    handleSelectionChange (arr){
        this.multipleSelection = arr
      console.log(this.multipleSelection)
    },
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    postExcelExport () {
        let data = []
        this.multipleSelection.forEach(element => {
            data.push(element.id)
        })
        postExcelExport({ ids: data })
    },
    postExcelExportOne (id) {
        postExcelExport({ ids: [id] })
    },
  },
  components: {
  },
}
</script>
<style scoped lang="scss">

</style>