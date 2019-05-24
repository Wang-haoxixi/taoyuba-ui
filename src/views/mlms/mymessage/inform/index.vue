<template>
  <div class="box">
    <div class="leftBox">
      <p class="boxTitles">分类</p>
      <!-- <ul class="menus"> -->
        <el-button @click="loadPage()" class="menus_option">纪要<span class="small_option"></span></el-button>
        <el-button @click="loadPage()" class="menus_option">任务<span class="small_option">12</span></el-button>
        <el-button @click="loadPage()" class="menus_option">财富<span class="small_option">11</span></el-button>
        <el-button @click="loadPage()" class="menus_option">其他<span class="small_option">33</span></el-button>
        <el-button @click="loadPage()" class="menus_option">重要<span class="small_option"></span></el-button>
      <!-- </ul> -->
    </div>
    <div class="rightBox">
      <basic-container>
        <page-header title="系统消息"></page-header>
        <operation-container>
          <template slot="left">
            <el-button-group class="btns">
              <el-button plain class="el-icon-view" size="small"></el-button>
              <el-button plain class="el-icon-share" size="small"></el-button>
              <!-- <gov-button plain :icon="['iconfont', 'icon-biaoqian1']" size="small"></gov-button> -->
              <el-button plain class="el-icon-delete" size="small"></el-button>
            </el-button-group>
          </template>
          <template slot="right">
            <operation-search @search="searchPage" advance-search>
              <advance-search :form="paramForm" @search-page="searchPage" @clear-search-param="clearSearchParam"></advance-search>
            </operation-search>
          </template>
        </operation-container>
          <iep-table :isLoadTable="changes" :pagination="{pagination:5}" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
          </iep-table>
      </basic-container>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
import { getEmployeeProfilePage } from '@/api/hrms/employee_profile'
import { initSearchForm } from './options'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  data () {
    return {
      paramForm: initSearchForm(),
      changes:false,
      columnsMap: [
        {
          prop: '性别',
          label: '内容',
          hidden: false,
        },
        {
          prop: '入职时间',
          label: '时间',
          hidden: false,
          fixed:'right',
          width:250,
        },
      ],
    }
  },
  components:{
    AdvanceSearch,
  },
  computed: {
    currentColumnsMap () {
      const keyByColumns = keyBy(this.columnsMap, 'label')
      return this.defaultColumnsLabel.map(m => {
        return keyByColumns[m]
      })
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    // handleShare (row) { },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.loadPage()
    },
    loadPage (param = this.paramForm) {
      // this.changes = true
      this.loadTable(param, getEmployeeProfilePage)
    },
  },
}
</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
    .leftBox{
      float: left;
      width: 300px;
      // height: 100%;
      background-color: #fff;
      position: relative;
      // padding: 0 20px;
      box-sizing: border-box;
      .boxTitles{
        padding-left: 30px;
      }
      .boxTitles{
        font-size: 19px;
      }
      .menus_option{
        display: block;
        width: 100%;
        border: none;
        margin-left: 0;
        padding: 20px 40px;
        border-radius: 0;
        text-align: left;
        color:#000;
        .small_option{
          float: right;
          color: #ccc;
        }
      }
    }
    .rightBox{
      height: auto;
      margin-left: 300px;
      // background-color: red;
      position: relative;
      .btns{
        margin-left: 20px;
      }
    }
  }
</style>
