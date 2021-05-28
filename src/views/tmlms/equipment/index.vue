<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="add" type="default" size="small">新增</el-button>
        <div style="float:right">
          <span style="width:120px">
            <el-select v-model="params.villageId" filterable placeholder="请选择基层" size="small" clearable>
              <el-option
                v-for="item in options"
                :key="item.userId"
                :label="item.villageName"
                :value="item.userId">
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="sn"
            label="设备编号"
          >
          </el-table-column>
          <el-table-column
            prop="databusName"
            label="设备名称"
          >
          </el-table-column>
          <el-table-column
            prop="meetName"
            label="关联会议名称"
          >
          </el-table-column>
          <el-table-column
            label="用途"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.useType == 0 ? '签到' : '采集' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
          >
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">编辑
              </el-button>
              <!-- <el-button size="mini" @click="handleDel(scope.row.id)" v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1">删除
              </el-button> -->
              <el-button size="mini" @click="handleDel(scope.row.id)">解绑
              </el-button>
              <el-button size="mini" @click="handleSelect(scope.row)">关联会议
              </el-button>
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
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <detail v-else ref="detail" @back="detailType = true;getData()"></detail>
    <el-dialog
      title="会议信息"
      :visible.sync="dialogVisible"
      width="70%"
      :destroy-on-close="true"
      >
      <selects ref="selectIndex" @sumbit="sureSelect"></selects>
    </el-dialog>
  </div>
</template>
<script>
import { getDatabusList,deleteDatabusList,editDatabusList } from '@/api/tmlms/faceList'
// import { getVillage } from '@/api/tmlms/bvillage/index'
import detail from './detail.vue'
import selects from './selects.vue'
export default {
  name: 'faceList',
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      params: {},
      detailType: true,
      faceList: [],
      dialogVisible: false,
      id: 0,
      roleId: [],
      options:[],
      optionsType: [
        {
          value: 0,
          label: '船东',
        },
        {
          value: 1,
          label: '职务船员',
        },
        {
          value: 2,
          label: '家属',
        },
      ],
    }
  },
  created () {
    this.getData()
    this.roleId = JSON.parse(localStorage.getItem('user')).roles
    // console.log(this.roleId)
    // getVillage({size: 500,status: 2}).then(res=>{
    //   this.options = res.data.data.records
    // })
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      getDatabusList({...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    handleDel (id) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteDatabusList(id).then(res=>{
            if( res.data.code === 0 ){
              this.$message.success('删除成功!')
              this.getData()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
        })
    },
    handleView (id) {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
    add () {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail()
      })
    },
    // 关联会议
    handleSelect (row) {
      this.dialogVisible = true
      this.$nextTick(()=>{
        this.id = row
      })
    },
    sureSelect (row) {
      editDatabusList({ ...this.id,meetId: row.id }).then(res=>{
        console.log(res)
        this.$message.success('关联成功!')
        this.getData()
        this.dialogVisible = false
      })
    },
  },
  components: {
    detail,
    selects,
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
</style>
