<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <page-header title="电子台账栏目管理"></page-header>
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="add" type="default" size="small">新增</el-button>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="台账栏目类别"
          >
          </el-table-column>
          <el-table-column
            label="排序"
            width="200"
          >
          <template slot-scope="scope">
            <div>
                 <el-select v-model="scope.row.sort" placeholder="请选择" @change="(val) => changeFnc(val,scope.row)">
                    <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
            </div>
          </template>
          </el-table-column>
          <el-table-column label="操作"  fixed="right" width="100">
            <template slot-scope="scope">
              <div style="text-align:center"><el-button size="mini" @click="handleView(scope.row.id)">编辑</el-button></div>
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
    <detail v-else ref="detail" @back="detailType = true;getData()"></detail>
  </div>
</template>
<script>
import { getColumnPage,addColumn } from '@/api/admin/ad.js'
import detail from './detail.vue'
export default {
  name: 'faceList',
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      options:[0,1,2,3,4,5,6,7,8,9],
      params: {},
      detailType: true,
      faceList: [],
      dialogVisible: false,
      dialogVisiblePeople: false,
      id: 0,
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
      getColumnPage({...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    add () {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail()
      })
    },
    handleView (id) {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
    changeFnc (val,row) {
      console.log(val)
      console.log(row)
      addColumn(row).then(res=>{
        console.log(res)
        this.$message.success('操作成功!')
        this.getData()
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
