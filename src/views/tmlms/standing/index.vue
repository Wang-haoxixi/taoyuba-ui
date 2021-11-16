<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <page-header title="电子台账管理"></page-header>
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="add" type="primary" size="small">新增</el-button>
        <div style="float:right">
          <span style="width:120px" v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1">
              <el-select v-model="params.userId" filterable placeholder="请选择" size="small" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.userId"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
          </span>
          <span style="width:120px">
              <el-select v-model="params.columnId" filterable placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in optionsList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
              </el-select>
          </span>
          <span style="width:120px"><el-input v-model.trim="params.name" placeholder="台账名称" size="small" clearable></el-input></span>
          <span style="width:240px">
            <el-date-picker v-model="params.timeLists" type="daterange" clearable range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
            value-format="yyyy-MM-dd"  size="small"></el-date-picker>
          </span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="台账名称"
          >
          </el-table-column>
          <el-table-column
            prop="columnName"
            label="类别"
          >
          </el-table-column>
          <el-table-column
            prop="villageName"
            label="基层"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="上传时间"
          >
          </el-table-column>
          <el-table-column label="操作"  fixed="right" width="100">
            <template slot-scope="scope">
              <div style="text-align:center"><el-button size="mini" @click="handleView(scope.row.id)">编辑</el-button></div>
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
  </div>
</template>
<script>
import { getPage,getColumnPage } from '@/api/admin/ad.js'
import { getVillage } from '@/api/tmlms/bvillage/index'
import detail from './detail.vue'
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
      options:[],
      params: {
        timeLists: [],
      },
      detailType: true,
      faceList: [],
      dialogVisible: false,
      dialogVisiblePeople: false,
      id: 0,
      roleId: [],
      optionsList: [],
    }
  },
  created () {
    this.getData()
    this.roleId = JSON.parse(localStorage.getItem('user')).roles
    getVillage({size: 500,status: 2}).then(res=>{
      this.options = res.data.data.records
    })
    getColumnPage({size: 500}).then(res=>{
      this.optionsList = res.data.data.records
    })
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      let data = {
        startTimeStr: this.params.timeLists[0] || '',
        endTimeStr: this.params.timeLists[1] || '',
      }
      getPage({...this.params,...this.page,...data}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    add () {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail()
      })
    },
    handleView (id) {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
  },
  components: {
    detail,
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
