<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button type="primary" size="small" @click="addShipowner" v-if="manager">新增</el-button>
        <el-button v-if="manager"  type="default" size="small" @click="exportInfo">导出信息</el-button>
        <el-button @click="handleFresh" type="default" size="small">刷新</el-button>
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.idcard" placeholder="身份证" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.phone" placeholder="联系电话" size="small" clearable></el-input></span>
          <span style="width:10s0px">
            <el-select v-model="params.certLevel" placeholder="证书等级" size="small" clearable>
              <el-option
                v-for="item in certGrade"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span style="width:120px"><iep-dict-select clearable placeholder="证书职位" v-model="params.certTitle" size="small" dict-name="tyb_crew_cert_title"></iep-dict-select></span>
          <span style="width:120px">
            <el-select v-model="params.workStatus" style="width:120px" placeholder="用工状态" size="small" clearable>
              <el-option
                v-for="item in workStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span style="width:120px">
            <el-select v-model="params.provinceId" style="width:120px" placeholder="户籍" size="small" clearable>
              <el-option
                v-for="item in rogionList"
                :key="item.areaCode"
                :label="item.name"
                :value="item.areaCode">
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getParamData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="shipownerList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
            :width="item.css"
          >
          <template slot-scope="scope">
            <template v-if="item.type==='dictGroup'">
            <div>{{dictJS(item, scope)}}</div>
            </template>
            <template v-else-if="item.type==='province'">
            <div>{{provincesName(item,scope)}}</div>
            </template>
            <template v-else>
            <iep-table-detail :value="scope.row[item.value]"></iep-table-detail>
          </template>
          </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核操作"
            width="100"
            v-if="manager && showSwith"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="getStatus(scope.row.swith,scope.row.userId)"
                inactive-color="#F00"
                :disabled="scope.row.isDisabled"
                >
              </el-switch>
            </div>
          </template>
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="审核状态"
          >
          <template slot-scope="scope">
            {{ scope.row.status | typeFilter}}
          </template>
          </el-table-column> -->
          <el-table-column label="操作" width="230">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.idcard)">查看
              </el-button>
              <el-button size="mini" @click="handleEdit(scope.row.idcard)"  v-if="manager">编辑
              </el-button>
              <el-button v-if="onlyManager" size="mini" @click="handleDel(scope.row.idcard)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <el-dialog
      title="导出信息"
      :visible.sync="dialogVisible"
      width="45%">
      <div class="export-btn-wrapper">
        <template v-for="(item, index) in (Math.ceil(total / 3000))">
          <template v-if="(Math.ceil(total / 3000)) > index + 1">
            <el-button class="export-btn" :key="index" @click="downloadInfo(`船员信息第${(3000 * index + 1)}条第至${(3000 * (index+1))}条`, index+1)">{{`导出信息第${(3000 * index + 1)}条至第${(3000 * (index+1))}条`}}</el-button>
          </template>
          <template v-else>
            <el-button class="export-btn" :key="index" @click="downloadInfo(`船员信息第${(3000 * index + 1)}条第至${total}条`, index+1)">{{`导出信息第${(3000 * index + 1)}条至第${total}条`}}</el-button>
          </template>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCrew,deleteCrew,statusCrew,exportExcel } from '@/api/tmlms/boatMan'
import { getUserInfo } from '@/api/login'
import { getArea, getRogionList } from '@/api/post/admin'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
import queryMixin from '@/mixins/query'
export default {
  mixins: [queryMixin],
  data () {
    return {
      dialogVisible: false,
      rogionList: [],
      shipownerList: [],
      provinces:[],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        idcard: '',
        realName: '',
        workStatus: '',
        phone: '',
        certLevel: '',
        certTitle: '',
        provinceId: '',
        // timeLists: '',
      },
      exportParams: {
        idcard: '',
        realName: '',
        status: '',
        phone: '',
        remark:'',
        startDate:'',
        endDate:'',
        workStatus:'',
        provinceId: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '姓名',
            value: 'realName',
            css: '100',
          },
          {
            text: '身份证号码',
            value: 'idcard',
            css: '182',
          },
          {
            text: '年龄',
            value: 'birthday',
            css: '60',
          },
          {
            text: '联系电话',
            value: 'phone',
            css: '140',
          },
          {
            text: '用工状态',
            value: 'workStatus',
            css: '140',
          },
          {
            text: '当前职位',
            value: 'positionId',
            dictName: 'tyb_resume_position',
            type: 'dictGroup',
            css: '100',
          },
          {
            text: '证书职位',
            value: 'certTitle',
            dictName: 'tyb_crew_cert_title',
            type: 'dictGroup',
          },
          {
            text: '证书日期',
            value: 'certDateIssue',
            css: '120',
          },
          {
            text: '户籍',
            value: 'provinceId',
            type:'province',
          },
        ],
      },
      workStatus:[
        {
          label: '待求职',
          value: 9,
        },
        {
          label: '未用工',
          value: 0,
        },
        {
          label: '上船，已签合同',
          value: 1,
        },
        // {
        //   label: '离船，未解除合同 ',
        //   value: 2,
        // },
        {
          label: '上船，未签合同',
          value: 3,
        },
        // {
        //   label: '离船，未签合同',
        //   value: 4,
        // },
      ],
      status: [
        {
          label: '审核中',
          value: 1,
        },
        {
          label: '审核通过',
          value: 2,
        },
        {
          label: '审核失败',
          value: 3,
        },
      ],
      certGrade: [
        {
          label: '--',
          value: '0',
        },
        {
          label: '一级',
          value: '1',
        },
        {
          label: '二级',
          value: '2',
        },
        {
          label: '三级',
          value: '3',
        },
      ],
      manager: false,
      onlyManager:false,
      showSwith:false,
      userData: {roles: []},
    }
  },
  methods: {
    getRogionList () {
      getRogionList(0).then(({ data }) => {
        if (data.code === 0) {
          this.rogionList = data.data
        }
      })
    },
    handleFresh () {
      this.getData()
      this.isManager()
      this.getProvince()
      this.isAdminPath()
    },
    //省
    provincesName (item, scope) {
      if(scope.row[item.value]){
        let val = keyBy(this.provinces, 'value')
        if (!Object.keys(val).length) {
          return ''
        }
        return keyBy(this.provinces, 'value')[scope.row[item.value]].label
      }else{
        return '暂无'
      }
    },
    //字典
    dictJS (item, scope) {
      // console.log('字典', item, scope)
      if(scope.row[item.value]){
        if(scope.row[item.value] === '0') return '暂无'
        return keyBy(this.dictGroup[item.dictName], 'value')[scope.row[item.value]].label
      }else{
        return '暂无'
      }
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.setQuery({current: val})
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      this.$router.push({name: 'detailBoatMan'})
    },
    // 查看
    handleView (val) {
      this.$router.push({name: 'detailBoatMan',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({path: '/boatMan/detail',query:{ edit: val }})
    },
    getProvince () {
      getArea(0).then(({ data }) => {
        this.provinces = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,
          }
        })
      })
    },
    // 获取列表数据
    getData () {
      getCrew(this.params).then(res=>{
        this.shipownerList = res.data.data.records
        // this.shipownerList.map(m => {
        //   return m.remark.substring(0, 20)
        // })
        this.shipownerList.map(item => {
          if(item.remark.length > 19) {
            item.remark = item.remark.substring(0, 20) + '....'
          }
          let now = new Date()
          let year = now.getFullYear()
          item.birthday = year - item.birthday.substring(0,4)
        })
        this.shipownerList.forEach( item=>{
          if(item.status === 2 && item.userId !== 0){
            item.swith = true
          }else{
            item.swith = false
          }
          this.workStatus.map( data  =>{
            if(data.value==item.workStatus){
              item.workStatus=data.label
            }
          })
          if(item.salary==0){
            item.salary='面议'
          }
          // item.certTitle = ''
          // item.certDateIssue =''
          if(item.certList){
            item.certList.forEach(v=>{
              if(v.certTitle==item.certTitle){
                item.certDateIssue=v.certDateIssue.split(' ')[0]
              }
            })
            // item.certTitle = item.certList[0].certTitle
            // item.certDateIssue=item.certList[0].certDateIssue.split(' ')[0]
          }
        })
        this.shipownerList.forEach(v => {
          if (v.swith === false && v.userId === 0) {
            v.isDisabled = true
          } else {
            v.isDisabled = false
          }
        })
        this.total = res.data.data.total
        console.log('shipownerList', this.shipownerList)
      })
    },
    //搜索
    getParamData () {
      // if (this.params.timeLists) {
      //   this.params.startDate = this.params.timeLists[0]
      //   this.params.endDate = this.params.timeLists[1]
      // }
      this.params.realName = (this.params.realName || '').replace(/\s*/g,'')
      this.params.idcard = (this.params.idcard || '').replace(/\s*/g,'')
      this.params.phone = (this.params.phone || '').replace(/\s*/g,'')
      this.params.current = 1
      this.getData()
    },
    // 删除
    handleDel (id) {
        this.$confirm('此操作将永久删除该船员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteCrew(id).then(res=>{
            this.$message({
              type: 'success',
              message: res.data.msg,
            })
            this.getData()
          }).catch(err=>{
            this.$message.error(err.data.msg)
          })
        }).catch(() => {
        })
    },
    // 审核
    getStatus (switchs,userId) {
      let data = ''
      if(switchs){
        data = 2
      }else{
        data = 3
      }
      statusCrew(data,userId).then( res=>{
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.getData()
      })
    },
    async isManager () {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1 || this.userData.roles.indexOf(112) !== -1) { 
        this.manager = true
      }
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1){
        this.onlyManager = true
      }
    },
    isAdminPath () {
      console.log(this.$route.path.indexOf('admin'))
      if(this.$route.path.indexOf('admin') == 1){
        this.showSwith=true
      }else{
        this.showSwith=false
      } 
    },
    downloadInfo (title = '', number = undefined) {
      let val = Object.assign({}, this.params)
      console.log()
      if (Math.ceil(this.total / 3000) > 1) {
        val.nowPage = number
      }
      exportExcel (val, title).catch(err => {
          this.$message({
            type: 'warning',
            message: err,
          })
        })
    },
    exportInfo () {
      if (Math.ceil(this.total / 3000) === 1) {
        this.downloadInfo('船员信息')
      } else {
        this.dialogVisible = true
      }
    },
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  created () {
    if (sessionStorage.getItem('query')) {
      var query = sessionStorage.getItem('query')
      this.params = JSON.parse(query)
    } else {
      this.params = {
        current: 1,
        size: 10,
        idcard: '',
        realName: '',
        workStatus: '',
        phone: '',
        certLevel: '',
        certTitle: '',
      }
    }
    this.getData()
    this.isManager()
    this.getProvince()
    this.isAdminPath()
    this.getRogionList()
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核失败',
      }
      return typeMap[type]
    },
  },
  watch: {
      'params.idcard': function (val) {
            this.exportParams.idcard  = val
      },
      'params.realName': function (val) {
            this.exportParams.realName  = val
      },
      'params.phone': function (val) {
            this.exportParams.phone  = val
      },
      'params.remark': function (val) {
            this.exportParams.remark  = val
      },
      'params.workStatus': function (val) {
            this.exportParams.workStatus  = val
      },
      'params.provinceId': function (val) {
        this.exportParams.provinceId  = val
      },
      params () {
      sessionStorage.setItem('query', JSON.stringify(this.params))
      },
  },
 beforeUpdate () {
    sessionStorage.setItem('query', JSON.stringify(this.params))
  },
  beforeRouteLeave (to, from, next) {
    if (to.path!=='/boatMan/detail') {
    sessionStorage.removeItem('query')
    }
  // 设置下一个路由的 meta
  next()
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
