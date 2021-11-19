<template>
<!-- 台账/异常数据更新 -->
  <basic-container>
    <page-header title="异常数据更新"></page-header>
    <operation-container>
      <template slot="left">
        <el-button type="primary" size="small" @click="batchUpdate" :loading="loading">批量更新</el-button>
        <el-checkbox v-model="proIdStatus">户籍为空</el-checkbox>
      </template>
      <template slot="right">
        <div style="display: inline-block;width: 280px;">
          <el-date-picker
            size="small"
            value-format="yyyy-MM-dd"
            v-model="params.birthday"
            type="date"
            clearable
            placeholder="搜索结果为出生日期之后的船员数据">
          </el-date-picker>
        </div>
        <el-button size="small"  @click="onSearch">搜索</el-button>
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
           <template slot-scope="scope">
                {{scope.row.realName?scope.row.realName:'--'}}
            </template>
        </el-table-column>
        <el-table-column
          prop="idcard"
          label="身份证号码">
          <template slot-scope="scope">
                {{scope.row.idcard?scope.row.idcard:'--'}}
            </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
          <template slot-scope="scope">
                {{scope.row.phone?scope.row.phone:'--'}}
            </template>
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期">
          <template slot-scope="scope">
                {{scope.row.birthday?scope.row.birthday:'--'}}
            </template>
        </el-table-column>
        <el-table-column
          prop="provinceIdName"
          label="户籍">
          <template slot-scope="scope">
                {{scope.row.provinceIdName?scope.row.provinceIdName:'--'}}
            </template>
        </el-table-column>
         <el-table-column
          label="详情">
        <template slot-scope="scope">
         <el-button type="primary" size="small" @click="goDetails(scope.row.idcard)">查看详情</el-button>
        </template>
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
          layout="total, sizes, prev, pager, next, jumper"
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
    goDetails (val) {
      // this.$router.push({name: 'detailBoatMan',query:{ see: val }})
      this.$router.push({
        path:'/boatMan/detail',
        query:{ see: val },
      })
    },
    onSearch () {
      this.params.current = 1
      this.getList()
    },
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
        }).then(async () => {
          this.loading = true
          try {
            let { data } = await updatePageBatchByBad(this.selectedData)
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
          } catch(e) {
            this.$notify({
              title: '警告',
              message: '数据更新失败',
              type: 'warning',
            })
            this.loading = false
          }
        })
        //   .then(({data}) => {
        //     if (data && data.data) {
        //       this.$notify({
        //         title: '成功',
        //         message: '数据更新成功',
        //         type: 'success',
        //       })
        //       this.params.current = 1
        //       this.getList()
        //     } else {
        //       this.$notify({
        //         title: '警告',
        //         message: '数据更新失败',
        //         type: 'warning',
        //       })
        //     }
        //     this.loading = false
        //   })
        // }).catch(() => {
        //   this.loading = false
        // })
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