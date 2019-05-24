<template>
  <gov-layout-main class="departement">
    <gov-layout-header>
      <gov-search-bar
        :reset="false"
        :resetIgnore="['limit', 'page', 'status']"
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
        <el-button slot="button-groups" type="default" v-if="permissions.ele_department_Information" @click="handleOpenElement">{{isElement ? '返回目录检索' : '信息项'}}</el-button>
      </gov-search-bar>
      <!-- <el-form :inline="true" size="small">
        <el-form-item>
          <el-input
            style="width: 400px;"
            v-model.trim="listQuery.name"
            clearable
            :placeholder="isElement ? '请输入信息项' : '请输入信息资源名称'"
            maxlength="100">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="default" v-if="permissions.ele_department_Information" @click="handleOpenElement">{{isElement ? '返回目录检索' : '信息项'}}</el-button>
        </el-form-item>
      </el-form> -->
      <div class="item-body">
        <div class="choose-container clearfix">
          <div class="pull-left choose-name">部门分类：</div>
          <div class="pull-left content" :class="toggleType ? 'up' : ''">
            <div ref="content">
              <span class="item" :class="listQuery.deptId === '' ? 'active' : ''" @click="handleChange({value: ''})">全部</span>
              <span class="item" :class="item.value === listQuery.deptId ? 'active' : ''" v-for="item in options.deptId" :key="item.value" @click="handleChange(item)">
                {{item.label}}
              </span>
            </div>
          </div>
          <span
            class="toggle"
            @click="handleToggle"
            v-if="options.deptId && options.deptId.length > 0 && pulldownIcon">
            <i :class="toggleType ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
            </span>
        </div>
      </div>
    </gov-layout-header>
    <gov-layout-body>
      <department-list
        v-loading="tableLoading"
        v-if="!isElement"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
        :page="pagination"
        :total="pagination.total"
        :tableData="tableList"/>
      <element-table
        ref="elementTable"
        :queryData="elementListQuery"
        :btnGroup="elementBtnGroup"
        v-if="isElement"/>
    </gov-layout-body>
  </gov-layout-main>
</template>
<script>
import mixin from '@/mixins/mixin'
import departmentList from './departmentList'
import elementTable from '@/views/element/element/elementTable'
import {elementTableList} from '@/api/element/element'
import {getDept} from '@/util/dic'
export default {
  mixins: [mixin],
  components: {departmentList, elementTable},
  data () {
    return {
      elementBtnGroup: {
        updataBtn: false,
        deleteBtn: false,
      },
      isElement: false,
      isCollapse: false,
      listQuery: {
        name: '',
        deptId: '',
      },
      elementListQuery: {
        chName: '',
        deptId: '',
        resStatus: 3,
      },
      toggleType: true,
      pulldownIcon: false,
    }
  },
  computed: {
    options () {
      return {
        deptId: getDept(),
      }
    },
    searchOption () {
      return [
        { width: '400px', prop: 'name', type: 'input', placeholder: this.isElement ? '请输入信息项' : '请输入信息资源名称' },
      ]
    },
  },
  created () {
    this.$nextTick(() => {
      this.addClass()
    })
    this.getList()
    this.setContentHeight()
  },
  methods: {
    // 信息資源信息項
    getList () {
      this.tableLoading = true
      this.listQuery.status = 3
      elementTableList(this.listQuery).then((response) => {
        let res = response.data
        if (res.code === 0) {
          this.tableList = res.data.records
          this.pagination.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    deparementSearch () {
      this.isCollapse = !this.isCollapse
    },
    handleChosen (id) {
      this.listQuery.value = id
    },
    addClass (id) {
      return id === this.listQuery.value ? 'active' : ''
    },
    // 熱門搜索
    handlerHotSearch (data) {
      this.listQuery.name = data.label
      this.getList()
    },
    handleChange ({value}) {
      this.listQuery.deptId = value
      if (this.isElement) {
        this.elementListQuery.chName = this.listQuery.name
        this.elementListQuery.deptId = this.listQuery.deptId
        this.$refs.elementTable.getList()
      } else {
        this.getList()
      }
    },
    handleOpenElement () {
      this.listQuery = {
        name: '',
        deptId: '',
      }
      this.isElement = !this.isElement
      if (this.isElement) {
        this.$nextTick(() => {
          this.$refs.elementTable.getList()
        })
      }
    },
    // 搜索
    handleFilter () {
      this.pagination.currentPage = 1
      this.nextTick
      this.$nextTick(() => {
        if (this.isElement) {
          this.elementListQuery.chName = this.listQuery.name
          this.elementListQuery.deptId = this.listQuery.deptId
          this.$refs.elementTable.getList()
        } else {
          this.getList()
        }
      })
    },
    // 下拉收起
    handleToggle () {
      this.toggleType = !this.toggleType
    },
    // 计算content高度
    setContentHeight () {
      this.$nextTick(() => {
        console.log('this.$refs.content.offsetHeight > 29', this.$refs.content.offsetHeight > 29)
        if (this.$refs.content.offsetHeight > 29) {
          this.pulldownIcon = true
        } else {
          this.pulldownIcon = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.departement {
  .item-body {
    .choose-container {
      font-size: 14px;
      margin: 10px 0 30px 0;
      position: relative;
      .toggle {
        position: absolute;
        bottom: -20px;
        font-size: 14px;
        &:hover {
          color: #409EFF;
        }
        color: #999;
        left: 48%;
        cursor: pointer;
      }
      .choose-name {
        color: #666;
        width: 100px;
      }
      .content {
        padding: 0;
        &.up {
          height: 29px;
          overflow: hidden;
        }
        width: calc(100% - 100px);
        color: #999;
        span {
          display: inline-block;
          margin: 0 20px 10px 0;
          cursor: pointer;
          &.active {
            color: #409EFF;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
