<template>
  <div>
    <basic-container>
      <page-header title="港口管理"></page-header>
      <operation-container>
        <template slot="left">    
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain >新增</iep-button>
          <!-- <el-button v-if="manager"  type="primary" size="small" icon="el-icon-edit" @click="exportInfo">导出信息</el-button>       -->
        </template>
        <!-- <span><el-input v-model="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span> -->
        <template slot="right">
          <span><el-input v-model="params.portName" placeholder="港口名称" size="small" clearable></el-input></span>
          <!-- <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="离船时间" end-placeholder="离船时间" 
              value-format="yyyy-MM-dd HH:mm:ss"  size="mini"></el-date-picker></span> -->
          <span><el-input v-model="params.address" placeholder="港口地址" size="small" clearable></el-input></span>
          <span>
            <el-select 
            v-model="form.provinceId"
            @change="choseProvince(form.provinceId)"
            style="width: 33%!important" 
            size="small" 
            placeholder="省">
              <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.areaCode" prop="provinceId"
              >
              </el-option>
            </el-select>
            <el-select
                v-model="form.cityId"
                @change="choseCity(form.cityId)"
                placeholder="市" style="width: 33%!important" size="small" >
                <el-option
                v-for="item in city"
                :key="item.id"
                :label="item.name"
                :value="item.areaCode" prop="cityId">
                </el-option>
            </el-select>
            <el-select
                v-model="form.districtId"
                placeholder="区" style="width: 33%!important" size="small" >
                <el-option
                v-for="item in district"
                :key="item.id"
                :label="item.name"
                :value="item.areaCode" prop="districtId">
                </el-option>
            </el-select>
          </span>
          <!-- <span><el-input v-model="params.idcard" placeholder="请输入船员身份证" size="small" clearable></el-input></span> -->
          <el-button size="small"  @click="loadPage(params)">搜索</el-button>
        </template>
      </operation-container>
      <iep-table                    
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="columnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
          <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">                 
            <operation-wrapper>                                   
              <!-- <iep-button size="mini" type="primary" @click="handleShow(scope.row.shipId)" v-if="manager">船员配置</iep-button>
              <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)" v-if="manager">船员管理</iep-button> -->
              <iep-button plain @click="handleEdit(scope.row.id)" type="primary" >编辑</iep-button>
              <!-- <iep-button @click="handleView(scope.row.shipId)">查看</iep-button>     
              <iep-button type="warning" @click="handleDelete(scope.row)" v-if="manager"><i class="el-icon-delete"></i></iep-button> -->
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getPortList } from '@/api/ships/port'
import { getArea } from '@/api/post/admin'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
export default {
  components: {
    // advanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      searchData: 'contactName',
      province:[],
      city:[],
      district:[],
      form:{districtId:''},
      params: {
        current: 1,
        size: 10,
        // timeLists:'',
        // shipName: '',
        // realName: '',
        // idcard:'',
      },
    }
  },
  created () {
    getArea(0).then(({ data })=>{
      console.log(data)
      this.province=data.data
    })
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: '/ship_port/detail/create/0',
      })
    },
    handleEdit (portId) {
      this.$router.push({
        path: `/ship_port/detail/update/${portId}`,
      })
    },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    async loadPage (param = this.searchForm) {
      //  let userId = this.$store.getters.userInfo.userId
      // let idcard = this.$store.getters.userInfo.idCard
      // if(param.timeLists){
      //   param.startDate=this.params.timeLists[0]
      //   param.endDate=this.params.timeLists[1]
      // }
      if(this.form.districtId!=''){
        param.areaCode = this.form.districtId
      }else if(this.form.cityId!=''){
        param.areaCode = this.form.cityId
      }else if(this.form.provinceId!=''){
        param.areaCode = this.form.provinceId
      }
      this.loadTable({ ...param }, getPortList)
      // console.log(this.loadTable({ ...param }, getPortList))
    },
     // 选择城市
    choseProvince (id) {
      this.form.cityId = ''
      this.form.districtId = ''
      this.form.villageId = ''
      this.district = []
      getArea(id).then(({ data }) => {
          this.city = data.data
      })
    },
    // 改变城市
    choseCity (id) {
      getArea(id).then(({ data }) => {
        this.district = data.data
      })
    },
  },
}
</script>