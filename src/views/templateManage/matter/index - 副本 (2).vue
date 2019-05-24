<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <el-dropdown @command="handleImport" placement="bottom-start">
          <gov-button >Excel导入事项模板<i class="el-icon-arrow-down el-icon--right"></i></gov-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="行政权力">Excel导入行政权力</el-dropdown-item>
            <el-dropdown-item command="公共服务">Excel导入公共服务</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <gov-button @click="handleCancelTemplate" style="margin-left: 10px;">批量取消模板</gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        @selection-change="selectionChange"
        :option="tableOption"
        :data="tableList"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleDetail(scope.row)" type="text">详情</gov-button>
            <gov-button @click="handleUpdate(scope.row)" type="text">编辑</gov-button>
            <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import {searchOption} from './const/index'
export default {
  data () {
    return {
      searchOption,
    }
  },
  methods: {
    // 批量取消模板
    handleCancelTemplate () {},
    // Excel导入事项模板
    handleImport () {},
  },
}
</script>
