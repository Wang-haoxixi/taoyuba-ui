<template>
  <div>
    <div v-show="!show">
      <basic-container>
        <page-header title="招聘岗位"></page-header>
        <operation-container>
          <template slot="left">
            <iep-button @click="handleAdd()" type="primary">新增</iep-button>
            <iep-button @click="exportExcel()" type="default">导出</iep-button>
          </template>
          <template slot="right">
            <operation-search @search-page="searchPage" advance-search :prop="searchData">
              <advance-search @search-page="searchPage"></advance-search>
            </operation-search>
          </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" :dictsMap="dictsMap" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
          <el-table-column prop="operation" label="操作" width="220">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button type="default" plain @click="handleEdit(scope.row)">编辑</iep-button>
                <!-- <iep-button @click="handleDetail(scope.row)">查看</iep-button> -->
                <iep-button type="warning" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </basic-container>
    </div>
    <div v-if="show">
      <form-container ref="formContainer" @end="onEnd"/>
    </div>
  </div>
</template>
<script>
import { getRecruitPage, deleteRecruitById,getMyRecruitPage,exportExcel} from '@/api/post/recruit'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import { getUserInfo } from '@/api/login'
import formContainer from './form'

export default {
  components: { AdvanceSearch, formContainer },
  mixins: [mixins],
  data () {
    return {
      show: false,
      dictsMap,
      columnsMap,
      searchData: 'contactName',
      ids: [],
      roleDate:[],
      url: '/tybhrms/tybExcelExport/recruit',
    }
  },
  created () {
    this.loadPage()
    this.getIds()
  },
  methods: {
    onEnd (status) {
      this.show = false
      if (status) {
        this.loadPage()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.recruitId, deleteRecruitById)
    },
    handleAdd () {
      this.show = true
      this.$nextTick(() => {
        this.$refs.formContainer.open()
      })
      // this.$router.push({
      //   path: '/hrms_spa/recruit_post/0',
      // })
    },
    handleEdit (row) {
      this.show = true
      this.$nextTick(() => {
        this.$refs.formContainer.open(row.recruitId)
      })
      // this.$router.push({
      //   path: `/hrms_spa/recruit_post/${row.recruitId}`,
      // })
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    exportExcel () {
      exportExcel(this.ids).catch(err => {
          this.$message({
            type: 'warning',
            message: err,
          })
      })
    },
    async getIds () {
      this.roleDate = await getUserInfo().then(res => {
        return res.data.data.roles
      })
      if (this.roleDate.includes(111) || this.roleDate.includes(1)) {
        getRecruitPage().then((data) => {
          this.ids = data.data.data.records.map( m => m.recruitId)
        })
      } else {
        getMyRecruitPage().then((data) => {
          this.ids = data.data.data.records.map( m => m.recruitId)
        })
      }
    },
    async loadPage (param = this.searchForm) {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) === -1 && this.userData.roles.indexOf(1) === -1){
        let data = await this.loadTable(param, getMyRecruitPage)
        this.pagedTable = data.records
        this.pagedTable.forEach(ele => {
          if (ele.salary === 0) {
            ele.salary = '面议'
          }
        })
        this.manager = false
      } else {
        let data = await this.loadTable(param, getRecruitPage)
        this.pagedTable = data.records
        this.pagedTable.forEach(ele => {
          if (ele.salary === 0) {
            ele.salary = '面议'
          }
        })
        this.manager = true
        // 需要给switch一个字段识别
        // this.pagedTable.forEach( item=>{
        //   if(item.resumeStatus === 1){
        //     item.swith = true
        //   }else{
        //     item.swith = false
        //   }
        // })
      }
    },
  },
  watch: {
    pagedTable (newVal) {
      this.ids = newVal.map(v => { return v.recruitId })
    },
  },
}
</script>