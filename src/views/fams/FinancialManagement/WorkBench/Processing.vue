<template>
  <iep-fams-card title="待处理">
    <div class="processing-wrapper">
      <div class="processing-data">
        <iep-no-data v-if="!pagedTable.length"></iep-no-data>
        <template v-else>
          <a-list itemLayout="horizontal" :dataSource="pagedTable">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <a slot="title">{{item.realName}}</a>
                <div slot="description" class="description">
                  <div>向 <a href="#">{{item.orgName}}</a> 提交了 <a href="#">{{processingMap[selectType].label}}申请</a> </div>
                  <div>{{item.time}}</div>
                </div>
                <a-avatar slot="avatar" :src="item.avatar" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <el-pagination style="text-align:center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pagination.size" :current-page="pagination.current" :pager-count="11" layout="prev, pager, next" :total="pagination.total">
          </el-pagination>
        </template>
      </div>
      <a-list class="processing-select" :grid="{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }" :dataSource="processingData">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card @click="handleSelect(item)" class="list-item" :class="{active: item.id === selectType}">
            {{item.label}}
            ({{item.value}})</a-card>
        </a-list-item>
      </a-list>
    </div>
  </iep-fams-card>
</template>
<script>
import keyBy from 'lodash/keyBy'
import IepFamsCard from './IepFamsCard'
import mixins from '@/mixins/mixins'
import { getPendingPage } from '@/api/fams/statistics'
function pageOption () {
  return {
    current: 1,
    size: 3,
  }
}
const typeMap = {
  1: '提现',
  2: '发票',
  3: '开票',
  4: '组织拆借',
  5: '资金调拨提现',
}
export default {
  mixins: [mixins],
  components: { IepFamsCard },
  data () {
    return {
      selectType: 1,
      statistics: [0, 0, 0, 0, 0],
      pagination: pageOption(),
      pageOption: pageOption(),
    }
  },
  computed: {
    processingData () {
      return this.statistics.map((m, i) => {
        const id = i + 1
        return {
          id,
          label: typeMap[id],
          value: m,
        }
      })
    },
    processingMap () {
      return keyBy(this.processingData, 'id')
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelect (item) {
      this.selectType = item.id
      this.loadPage()
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable({ ...param, type: this.selectType }, getPendingPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  justify-content: space-between;
}
.processing-wrapper {
  display: flex;
  .processing-select {
    flex: 1;
  }
  .processing-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e8e8e8;
    padding-right: 15px;
    margin-right: 15px;
    flex: 2;
  }
}
.list-item {
  cursor: pointer;
  &:hover {
    background-color: #ba1b21;
    color: #fff;
  }
  &.active {
    background-color: #ba1b21;
    color: #fff;
  }
}
</style>
