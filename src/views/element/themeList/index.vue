<template>
  <gov-layout-main class="theme-list">
    <gov-layout-header>
      <gov-search-bar
        :reset="false"
        :resetIgnore="['limit', 'page', 'status']"
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
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
      </el-form> -->
       <div class="item-body">
        <div class="choose-container clearfix">
          <div class="pull-left choose-name">主题分类：</div>
          <div class="pull-left content" :class="topicTypeToggleType ? 'up' : ''">
            <div ref="topicTypeContent">
              <span class="item" :class="listQuery.topicType === '' ? 'active' : ''" @click="handleChange({value: '', type: 'topicType'})">全部</span>
              <span class="item" :class="item.value === listQuery.topicType ? 'active' : ''" v-for="item in options.topicType" :key="item.value" @click="handleChange({value: item.value, type: 'topicType'})">
                {{item.label}}
              </span>
            </div>
          </div>
          <span 
            class="toggle" 
            @click="handleTopicTypeToggle" 
            v-if="options.topicType && options.topicType.length > 0 && topicTypePulldownIcon">
            <i :class="topicTypePulldownIcon ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
            </span>
        </div>
        <div class="choose-container clearfix">
          <div class="pull-left choose-name" >重点领域分类：</div>
          <div class="pull-left content" :class="toggleType ? 'up' : ''">
            <div ref="content">
              <span class="item" :class="listQuery.areaType === '' ? 'active' : ''" @click="handleChange({value: '', type: 'areaType'})">全部</span>
              <span class="item" :class="item.value === listQuery.areaType ? 'active' : ''" v-for="item in options.areaType" :key="item.value" @click="handleChange({value: item.value, type: 'areaType'})">
                {{item.label}}
              </span>
            </div>
          </div>
          <span 
            class="toggle" 
            @click="handleToggle" 
            v-if="options.areaType && options.areaType.length > 0 && pulldownIcon">
            <i :class="toggleType ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
            </span>
        </div>
      </div>
    </gov-layout-header>
    <gov-layout-body>
      <department-list
        v-loading="tableLoading"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
        :page="pagination"
        :total="total"
        :tableData="tableList"/>
    </gov-layout-body>
  </gov-layout-main>
</template>
<script>
import departmentList from '../departmentList/departmentList'
import mixin from '@/mixins/mixin'
import {elementTableList} from '@/api/element/element'
export default {
  mixins: [mixin],
  components: {departmentList},
  data () {
    return {
      total: 0,
      tableList: [],
      listQuery: {
        name: '',
        topicType: '',
        areaType: '',
      },
      arr: ['topicType', 'areaType'],
      titles: {
        topicType: '主题分类',
        areaType: '重点领域分类',
      },
      topicTypeToggleType: true,
      toggleType: true,
      pulldownIcon: false,
      topicTypePulldownIcon: false,
      searchOption: [
        { prop: 'name', type: 'input', placeholder: '请输入信息资源名称', width: '400px' },
      ],
    }
  },
  created () {
    this.getList()
    this.setContentHeight()
  },
  computed: {
    options () {
      return {
        topicType: this.getDic('TOPIC_TYPE'),
        areaType: this.getDic('AREA_TYPE'),
      }
    },
  },
  methods: {
    handleFilter () {
      this.pagination.currentPage = 1
      this.$nextTick(() => {
        this.getList()
      })
    },
    // 信息資源信息項
    getList () {
      this.tableLoading = true
      this.listQuery.status = 3
      elementTableList(this.listQuery).then((response) => {
        let res = response.data
        if (res.code === 0) {
          this.tableList = res.data.records
          this.total = res.data.total
          this.pagination.total = res.data.total
        }
        this.tableLoading = false
      })
    },
    handleChange ({value, type}) {
      if (type === 'topicType') {
        this.listQuery.topicType = value
      } else {
        this.listQuery.areaType = value
      }
      this.pagination.currentPage = 1
      this.getList()
    },
    // 下拉收起
    handleToggle () {
      this.toggleType = !this.toggleType
    },
    handleTopicTypeToggle () {
      this.topicTypeToggleType = !this.topicTypeToggleType
    },
    // 计算content高度
    setContentHeight () {
      this.$nextTick(() => {
        if (this.$refs.content.offsetHeight > 29) {
          this.pulldownIcon = true
        } else {
          this.pulldownIcon = false
        }
        console.log('this.$refs.topicTypeContent.offsetHeight', this.$refs.topicTypeContent.offsetHeight, this.$refs.topicTypeContent.offsetHeight >= 29)
        if (this.$refs.topicTypeContent.offsetHeight > 29) {
          this.topicTypePulldownIcon = true
        } else {
          this.topicTypePulldownIcon = false
        }
      })
    },
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
</style>
<style lang="scss" scoped>
.theme-list {
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
