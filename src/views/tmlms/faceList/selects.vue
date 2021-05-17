<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <div class="shipowner_title">
        <div> 已选择渔船: 
          <el-tag
            v-for="(tag,index) in multipleSelection"
            :key="tag.shipName"
            style="margin:0 5px;width: auto"
            @close="handleClose(index)"
            :closable="roleId.indexOf(112)===-1 || userId === tag.villageId ? true : false">
            {{tag.shipName}}
          </el-tag> 
        </div>
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.shipName" placeholder="名称" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          row-key="shipId"
          style="width: 100%">
          <el-table-column
            prop="shipName"
            label="渔船名"
          >
          </el-table-column>
          <el-table-column
            prop="shipNo"
            label="渔船编号"
          >
          </el-table-column>
          <el-table-column
            prop="shipowner"
            label="持证人"
          >
          </el-table-column>
          <el-table-column
            prop="shipownerIdcard"
            label="持证人身份证"
          >
          </el-table-column>
          <el-table-column
            prop="engineTotalPower"
            label="总功率(kw)"
          >
          </el-table-column>
          <el-table-column
            prop="hullLength"
            label="船长(m)"
          >
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleSelectionChange(scope.row)" v-if="iscloseSelect(scope.row)">选择
              </el-button>
              <el-button size="mini" @click="closeSelect(scope.row)" v-else>取消选择
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
  </div>
</template>
<script>
import { getShipList } from '@/api/ships'
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
      IDArr: [],
      multipleSelection: [],
      userId: '',
      roleId: [],
    }
  },
  created () {
    this.getData()
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      this.userId = JSON.parse(localStorage.getItem('user')).sysUser.userId
      this.roleId = JSON.parse(localStorage.getItem('user')).roles
      getShipList({...this.params,...this.page,...{ userId: this.roleId.indexOf(112)!==-1?this.userId:'' }}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection.push(val)
    },
    handleClose (index) {
      this.multipleSelection.splice(index,1)
    },
    iscloseSelect (row) {
      let data = true
      this.multipleSelection.forEach((element) => {
        if( element.shipId === row.shipId ){
          data = false
        }
      })
      return data
    },
    closeSelect (row) {
      this.multipleSelection.forEach((element,index) => {
        if( element.shipId === row.shipId ){
          this.multipleSelection.splice(index,1)
        }
      })
    },
  },
  components: {
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
