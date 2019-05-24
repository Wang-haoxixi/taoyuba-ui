<template>
  <gov-layout-main class="system-search">
    <layout-header>
      <gov-search-bar
        :resetIgnore="['limit', 'page', 'isAsc']"
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
    </layout-header>
    <gov-layout-body>
      <system-search-list
      ref="system-search-list"
      v-loading="tableLoading"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      :page="pagination"
      :total="pagination.total"
      :tableData="mainTableData"
      />
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import systemSearchList from './systemSearchList'
import mixins from '@/mixins/mixin'
import {
  getSearchTableData,
} from '@/api/infoSystem'
import {
  getCityTree,
} from '@/api/umps/city.js'
import {
  getByCity,
} from '@/api/umps/dept.js'
export default {
  name: 'systemSearch',
  mixins: [mixins],
  components: { systemSearchList },
  data () {
    return {
      cityArr:[],
      cityList: [], // 城市字典
      listQuery: {
        isAsc: true,
        sysDept: '',
        cityId: -1,
        sysDsgt: undefined,
        cityProp: [],
      }, // 搜索数据
      mainTableData: [], // 主表数据
      formData: {},
      isCollapse: true,
      cityProp: {
        value: 'id',
        label: 'name',
      },
      cityDept:[],
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '名称', prop: 'sysDsgt', type: 'input', placeholder: '请输入关键词' },
        { label: '地区', prop: 'cityProp', props: {value: 'id', label: 'name'}, type: 'cascader', placeholder: '请选择省/市', change: this.searchDept, data: this.cityList },
        { label: '部门', prop: 'sysDept', props: {value: 'id', label: 'name'}, type: 'select', placeholder: '请选择部门', data: this.cityDept },
      ]
    },
  },
  methods: {
    // 获取字典
    getDict () {
      getCityTree().then(res=>{
        this.cityList=res.data
        this.deleteChildren(this.cityList)
      })
    },
    deleteChildren (arr){
      for(var i of arr){
        if(i.children.length===0){
          delete i.children
        }else{
          this.deleteChildren(i.children)
        }
      }
    },
    searchDept (val){
      this.listQuery.sysDept=''
      if(val.length===0){
        this.listQuery.cityId=-1
      }else{
        this.listQuery.cityId=val[val.length-1]
      }
      getByCity(this.listQuery.cityId).then(res=>{
        this.cityDept=res.data
      })
      this.pagination.currentPage = 1
      this.$nextTick(() => {
        this.getList()
      })
    },
    handleChange (){
      this.pagination.currentPage = 1
      this.$nextTick(() => {
        this.getList()
      })
    },
    handleFilter () {
      this.pagination.currentPage = 1
      if (!this.listQuery.cityId) {
        this.listQuery.cityId = -1
      }
      this.$refs['system-search-list'].changePage(1)
      setTimeout(() => {
        this.getList()
      }, 50)
    },
    handleCloseMainDialog () {
      this.$refs['mainDialog'].close()
    },
    getList () {
      this.tableLoading = true
      this.listQuery.status = 'A'
      let params= {...this.listQuery}
      delete params.cityProp
      getSearchTableData(params).then(res=>{
        console.log(res.data)
        this.pagination.total = res.data.total
        this.mainTableData = res.data.records
        this.tableLoading = false
      })
    },
    deparementSearch () {
      this.isCollapse = !this.isCollapse
    },
  },
  created () {
    this.getList()
    this.getDict()
  },
}
</script>
<style lang="scss">
.result-wrapper {
  margin: 10px 0 20px;
  .item {
    width: 100%;
    margin-bottom: 10px;
    .el-radio__label {
      width: 100%;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.system-search {
  .condition-wrapper {
    margin-top: 10px;
    text-align: center;
    .clearfix:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
    .radio-wrapper {
      margin-right: 20px;
    }
    .btn-department {
      margin-top:10px;
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
    i {
      margin-left: 5px;
    }
  }
}
</style>
