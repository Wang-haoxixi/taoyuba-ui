<template>
  <basic-container>
    <page-header title="船员数据更新"></page-header>
    <operation-container>
      <template slot="left">
        <el-button type="primary" size="small" @click="batchUpdate" :loading="loading">批量更新</el-button>
        <el-checkbox v-model="proIdStatus">户籍为空</el-checkbox>
      </template>
      <template slot="right">
        <el-date-picker
          size="small"
          value-format="yyyy-MM-dd"
          v-model="params.birthday"
          type="date"
          clearable
          placeholder="选择日期">
        </el-date-picker>
        <el-button size="small"  @click="getList()">搜索</el-button>
      </template>
    </operation-container>
    <div>
      <el-table
        ref="multipleTable"
        :data="data"
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="idcard"
          label="身份证号码">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="provinceIdName"
          label="户籍">
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="params.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </basic-container>
</template>
<script>
import { getPageByBad, updatePageBatchByBad } from '@/api/tmlms/boatMan'
import rogionMixin from '@/views/hrms/StandingBook/Fisher/rogionMixin.js'
export default {
  mixins: [rogionMixin],
  data () {
    return {
      params: {
        size: 10,
        current: 1,
      },
      total: 0,
      selectedData: [],
      loading: false,
      proIdStatus: false,
      data: [],
    }
  },
  created () {
    this.getRogionList().then(() => {
      this.getList()
    }).catch(() => {
      this.getList()
    })
  },
  watch: {
    proIdStatus (newVal) {
      this.params.provinceId = newVal ? 0 : undefined
      this.getList()
    },
  },
  methods: {
    getList () {
      getPageByBad(this.params).then(({ data }) => {
        if (data.code === 0) {
          let result = data.data.records
          result.forEach((item) => {
            if (item.provinceId) {
              item.provinceIdName = this.getProvinceIdName(item.provinceId)
            }
          })
          this.data = result
          this.total = data.data.total
        }
      })
    },
    handleSelectionChange (val) {
      this.selectedData = val
    },
    batchUpdate () {
      if (this.selectedData.length > 0) {
         this.$confirm('此操作将更新文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.loading = true
          updatePageBatchByBad(this.selectedData).then(({data}) => {
            if (data && data.data) {
              this.$notify({
                title: '成功',
                message: '数据更新成功',
                type: 'success',
              })
              this.params.current = 1
              this.getList()
            } else {
              this.$notify({
                title: '警告',
                message: '数据更新失败',
                type: 'warning',
              })
            }
            this.loading = false
          })
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          message: '请选择数据',
          type: 'warning',
        })
      }
    },
    handleSizeChange (val) {
      this.params.size = val
      this.params.current = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.params.current = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>