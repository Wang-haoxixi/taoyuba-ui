<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <page-header title="培训咨询管理"></page-header>
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="add" type="primary" size="small">新增</el-button>
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.meetName" placeholder="会议标题" size="small" clearable></el-input></span>
          <span style="width:120px">
              <el-select v-model="params.cooperateIds" filterable placeholder="请选择" size="small" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.userId"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
          </span>
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
          width="180"
            prop="meetStartSignTime"
            label="培训开始时间"
          >
          </el-table-column>
          <el-table-column
          width="180"
            prop="meetEndSignTime"
            label="培训结束时间"
          >
          </el-table-column>
          <el-table-column
            prop="二维码"
            label="签到二维码"
          >
          <template slot-scope="scope">
            <el-button size="mini" @click="lookQr(scope.row,1)">{{ !scope.row.meetStartSignTime && scope.row.typeNames.indexOf('职务船员') !== -1 ? '生成' : '查看' }}</el-button>
          </template>
          </el-table-column>
          <el-table-column
            prop="二维码"
            label="签退二维码"
          >
          <template slot-scope="scope">
            <el-button size="mini" @click="lookQr(scope.row,2)">{{ scope.row.meetEndSignTime ? '查看' : '生成' }}</el-button>
          </template>
          </el-table-column>
           <el-table-column
            prop="number"
            label="参会总人数"
            width="100"
          >
          <template slot-scope="scope">
              {{scope.row.number?scope.row.number:'0'}}
            </template>
          </el-table-column>
          <el-table-column label="操作"  fixed="right" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">编辑</el-button>
              <el-button size="mini" @click="handleDel(scope.row.id)">删除</el-button>
              <el-button size="mini" @click="lookPeople(scope.row.id)">人员</el-button>
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
    <el-dialog
      title="查看人员"
      :visible.sync="dialogVisiblePeople"
      width="90%">
      <div style="text-align:center" v-if="dialogVisiblePeople">
        <list :trainMeetId="id" ref="list"></list>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="back">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vueQr from 'vue-qr'
import { getVillage,setTime } from '@/api/tmlms/bvillage/index'
import { page,del } from '@/api/tmlms/consultation/index'
import detail from './detail.vue'
import list from '../consultationPeople/index.vue'
// import VueSocketio from 'vue-socket.io'
// import Vue from 'vue'
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
      options:[],
      params: {},
      detailType: true,
      faceList: [],
      dialogVisible: false,
      downloadData: {
        url: 'https://new.taoyu58.com?type=1&',
      },
      dialogVisiblePeople: false,
      id: 0,
    }
  },
  created () {
    this.getData()
    getVillage({size: 500,status: 2}).then(res=>{
      this.options = res.data.data.records
    })
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
    lookQr (row,Sign) {
      let obj = {
        id: row.id,
        type: Sign,
      }
      let type = 0
      if( row.typeNames.indexOf('职务船员') !== -1 ){
        type = 1
      }
      if( (Sign === 2 && !row.meetEndSignTime) ||(Sign === 1 && !row.meetStartSignTime)){
        this.$confirm(`${Sign === 2 ? '请确认是否结束本次会议' : '请确认是否开始本次会议'}!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
            setTime(obj).then(({data})=>{
              if(data.code === 0){
                this.downloadData.url = `https://new.taoyu58.com?type=1&sign=${Sign}&isCrew=${type}&id=${row.id}&orgId=${row.orgId}`
                this.dialogVisible = true
                this.getData()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
      }else{
            this.downloadData.url = `https://new.taoyu58.com?type=1&sign=${Sign}&isCrew=${type}&id=${row.id}&orgId=${row.orgId}`
            this.dialogVisible = true
            this.getData()
      }
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
    // 看人
    lookPeople (id) {
      this.id = id
      this.dialogVisiblePeople = true
      // this.timer = setInterval(() => {
      //     this.$refs.list.getData()
      // }, 2000)  
      this.initWebSocket(id)
      // Vue.use(new VueSocketio({
      //     debug: true,
      //     connection: 'http://localhost:5000', //地址+端口，由后端提供
      //     options: { path: `/my-app/${id}` },
      // }))
      // this.$socket.open()
      // this.sockets.subscribe('cardmessage', (data) => {
      //   console.log(data)
      // })
    },
    back () {
      clearTimeout(this.timer)
      this.dialogVisiblePeople = false
      // console.log(this.websock)
      // this.websock.close()
    },
    initWebSocket (id) {
        console.log('创建WebSocket')
        console.log(window.location.host)
        let url = window.location.host === 'new.taoyu58.com' ? 'new.taoyu58.com' : 'testpc.taoyu58.com:6888'
        this.websock = new WebSocket(`ws://${url}/sk/tmlms/connectWebSocket/meet/${id}`)
        console.log(this.websock)
        this.websock.onmessage = this.websocketonmessage
        this.websock.onerror = this.websocketonerror
        this.websock.onopen = this.websocketonopen
        this.websock.onclose = this.websocketclose
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen () {
      this.websocketsend('')
      console.log('连接成功!')
    },
    websocketonerror () {
      console.log( 'WebSocket连接失败')
    },
    // 数据接收
    websocketonmessage (e) {
      console.log(123)
      console.log('数据接收' + e.data)
      this.$refs.list.getData()
    },
    // 数据发送
    websocketsend (Data) {
      this.websock.send(Data)
    },
    // 关闭
    websocketclose (e) {
      console.log('已关闭连接', e)
    },
  },
  components: {
    detail,
    vueQr,
    list,
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
