<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="add" type="default" size="small">新增</el-button>
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.meetName" placeholder="会议标题" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="meetName"
            label="会议标题"
          >
          </el-table-column>
          <el-table-column
            prop="meetStartTime"
            label="培训时间"
          >
            <template slot-scope="scope">
              {{ scope.row.meetStartTime.slice(0,10) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="培训地点"
          >
          </el-table-column>
          <el-table-column
            prop="lecturer"
            label="培训讲师"
          >
          </el-table-column>
          <el-table-column
            prop="typeNames"
            label="参会人员"
          >
          </el-table-column>
          <el-table-column
            prop="二维码"
            label="二维码"
          >
          <template slot-scope="scope">
            <el-button size="mini" @click="lookQr(scope.row)">查看</el-button>
          </template>
          </el-table-column>
          <el-table-column label="操作"  fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">编辑
              </el-button>
              <el-button size="mini" @click="handleDel(scope.row.id)">删除
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
    <detail v-else ref="detail" @back="detailType = true;getData()"></detail>
    <el-dialog
      title="查看二维码"
      :visible.sync="dialogVisible"
      width="30%">
      <div style="text-align:center">
        <vue-qr :text="downloadData.url" :margin="0" colorLight="#fff" :logoScale="0.3" :size="200" ref="qr"></vue-qr>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickDown">下载</el-button>
        <el-button @click="dialogVisible = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vueQr from 'vue-qr'
import { page,del } from '@/api/tmlms/consultation/index'
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
      params: {},
      detailType: true,
      faceList: [],
      dialogVisible: false,
      downloadData: {
        url: 'https://new.taoyu58.com?type=1&',
      },
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
      page({...this.params,...this.page}).then(res=>{
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
          del(id).then(res=>{
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
    add () {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail()
      })
    },
    lookQr (row) {
      this.downloadData.url = this.downloadData.url + `id=${row.id}&orgId=${row.orgId}`
      this.dialogVisible = true
    },
    clickDown () {
        let a = document.createElement('a')
        // 下载图名字
        a.download = '二维码.jpg'
        //url 
        a.href = this.$refs.qr.$el.src
        //合成函数，执行下载 
        a.dispatchEvent(new MouseEvent('click'))
    },
  },
  components: {
    detail,
    vueQr,
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
