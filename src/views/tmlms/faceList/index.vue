<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="status"
            label="头像"
          >
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.image" style="width:100px">
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">查看
              </el-button>
              <el-button size="mini" @click="handleDel(scope.row.faceToken)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.size"
          :current-page.sync="page.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <detail v-else ref="detail" @back="detailType = true"></detail>
  </div>
</template>
<script>
import { getList,delList } from '@/api/tmlms/faceList'
import detail from './detail.vue'
export default {
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      params: {},
      detailType: true,
      faceList: [],
    }
  },
  created () {
    this.getData()
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      getList({...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    handleDel (id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          delList({ userId:id }).then(res=>{
            if( res.data.code === 0 ){
              this.$message.success('删除成功!')
              this.getData()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
        })
    },
    handleView (id) {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
  },
  components: {
    detail,
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
</style>
