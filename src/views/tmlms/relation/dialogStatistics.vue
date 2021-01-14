<template>
  <el-dialog
    title="联系记录统计"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="close">
    <div>
      <div class="header-content clearfix">
        <el-form :inline="true" class="form-content">
          <el-form-item label="">
            <el-date-picker
              v-model="startTime"
              type="date"
              size="small"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <!-- <el-date-picker
              v-model="rangeTime"
              size="small"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="result-content" >
         <el-table
          :data="data"
          v-loading="loading"
          height="250"
          style="width: 100%">
           <el-table-column
            prop="village_name"
            width="200px"
            label="基层名">
          </el-table-column>
          <el-table-column
            prop="number"
            width="160px"
            label="联系数量">
            <template slot-scope="scope">
              <span>联系{{scope.row.number}}艘船</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shipNames"
            label="渔船名">
          </el-table-column>
        </el-table>
        <!-- <template v-if="data.length">
          <p class="text" v-for="(item, index) in data" :key="index">
            {{item.village_name}}联系{{item.number}}艘船<br/>
            <span class="shipNames">{{item.shipNames}}</span>
          </p>
        </template>
        <template v-else>
          <p class="empty-text">暂无数据</p>
        </template> -->
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getStatistics } from '@/api/tmlms/relation'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      dialogVisible: false,
      startTime: undefined,
      loading: false,
      data: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.startTime = this.getYesterday()
    },
    close () {
      this.dialogVisible = false
      this.data = []
      this.startTime = undefined
    },
    getYesterday () {
      let yesterday = +new Date() - 3600 * 1000 * 24
      let date = moment(yesterday).format('YYYY-MM-DD')
      return date
    },
    onSubmit () {
      if (this.startTime) {
        this.loading = true
        getStatistics({startTime: this.startTime, orgId: this.userInfo.orgId}).then(({ data }) => {
          if (data.code === 0) {
            this.data = data.data
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.header-content {
  .form-content {
    float: right;
  }
  border-bottom: 1px solid #f6f6f6;
}
.result-content {
  padding: 30px;
  text-align: left;
  .shipNames {
    color: #999;
  }
}
.empty-text {
  text-align: center;
  font-size: 16px;
  color: #aaa;
}
</style>