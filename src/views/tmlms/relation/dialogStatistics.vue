<template>
  <el-dialog
    title="联系记录统计"
    :visible.sync="dialogVisible"
    width="500px"
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
      <div class="result-content" v-loading="loading">
        <template v-if="data.length">
          <p class="text" v-for="(item, index) in data" :key="index">
            {{item.village_name}}联系{{item.number}}艘船<br/>
            <span class="shipNames">{{item.shipNames}}</span>
          </p>
        </template>
        <template v-else>
          <p class="empty-text">暂无数据</p>
        </template>
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
    },
    close () {
      this.dialogVisible = false
      this.data = []
      this.startTime = undefined
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