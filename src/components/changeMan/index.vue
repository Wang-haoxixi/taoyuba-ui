<template>
  <div class="change-man">
    <el-dialog
        title="渔船变更"
        :visible.sync="dialogVisible"
        width="70%">
        <div class="ship-change">
            <h3>当前船员所在渔船</h3>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.shipId"
                :label="item.shipName"
                :value="item.shipId">
                </el-option>
            </el-select>
        </div>
        <div>
            <h3>请选择要登入的渔船</h3>
            <div>
                <span style="width:120px;display:inline-block;margin-right: 20px"><el-input v-model.trim="params.shipName" placeholder="渔船名" size="small" clearable></el-input></span>
                <el-button size="small"  @click="getData()">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="shipName"
                    label="渔船名">
                </el-table-column>
                <el-table-column
                    prop="shipNo"
                    label="渔船编号">
                </el-table-column>
                <el-table-column
                    prop="shipowner"
                    label="持证人">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" size="small">选择</el-button>
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
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { allPage,getShipRelationByIdcard,changeShip } from '@/api/tmlms/boatMan'
export default {
  mixins: [],
  data () {
    return {
        options: [],
        dialogVisible: false,
        value: '',
        tableData: [],
        page: {
            total: 0,
            size: 10,
            current: 1,
        },
        idcard: '',
        params: {},
    }
  },
  methods: {
    getData () {
        allPage({...this.params,current: this.page.current}).then(res=>{
            this.tableData = res.data.data.records
            this.page = res.data.data
        })
    },
    getOption (id) {
        this.idcard = id
        getShipRelationByIdcard({idcard: id}).then(res=>{
            this.options = res.data.data
            if( this.options.length !== 0 ){
                this.value = res.data.data[0].shipId
            }
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
        if( this.options.length !== 0 && !this.value){
            this.$message.warning('请先选择登出渔船!')
            return false
        }
        this.$confirm(`确认将此船员更改为${row.shipName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
            changeShip({ shipId: this.value,changeShipId: row.shipId,idcard: this.idcard  }).then(()=>{
                this.$message.success('操作成功!')
                this.dialogVisible = false
                this.$emit('back')
            })
        })
    },
  },
  computed: {
  },
  created () {
      this.getData()
  },
  filters: {
  },
}
</script>
<style lang="scss" scoped>
.change-man {
    .ship-change {
        width: 40%;
        display: flex;
        align-items: center;
        margin-bottom: 50px;
        h3 {
            display: block;
            width: 310px;
        }
    }
}
</style>
