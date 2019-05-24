<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button @click="handleImportTemplate">Excel导入信息项模板</gov-button>
        <gov-button @click="handleCancelTemplate">批量取消模板</gov-button>
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
    handleImportTemplate () {},
  },
}
</script>
