<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="(scope.row)" class="add" type="primary">
          <i class="iconfon el-icon-plus"></i>
          新增公告
        </iep-button>
        <el-button-group class="btns">
          <el-button plain class="el-icon-view" size="small"></el-button>
          <el-button plain icon="el-icon-share" size="small"></el-button>
          <el-button plain class="el-icon-delete" size="small"></el-button>
        </el-button-group>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="发送人">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
    </iep-table>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { initSearchForm, pagedTable } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      pagedTable,
      isLoadTable:false,
      columnsMap:[
          {
              prop: 'sendman',
              label: '发送人',
              width:'250px',
          },
          {
              prop: 'theme',
              label: '主题',
          },
          {
              prop: 'time',
              label: '时间',
              width:'250px',
          },
      ],
      paramForm: initSearchForm(),
    }
  },
  created () {
    // this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage () {

      // this.loadTable(param, getEmployeeProfilePage)
    },
  },
}
</script>
