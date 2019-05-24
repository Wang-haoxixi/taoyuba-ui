<template>
  <gov-layout-main>
    <gov-layout-header>
       <div class="statistics">
        <div class="total-box clearfix">
          <ul>
            <li v-for="(item,index) in titleData" :key="index">
              <i class="icon iconfont"></i>
              <span class="name">{{titleName[index]}}</span>
              <span class="num">{{item}}</span>  
            </li>
          </ul>    
        </div>
        <div class="col-md-6">
          <div class="title">项目阶段统计</div>  
          <project-phase></project-phase>
        </div> 
        <div class="col-md-6-left">
          <project-status></project-status>
        </div>
        <div class="col-md-12">
          <div class="project-list">
            <div class="title">项目清单
              <div class="select-group">
                <div class="form-control">
                  <el-date-picker 
                    v-model="projectYear"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年"
                    clearable=true>
                  </el-date-picker>
                </div>
                <div class="form-control">
                  <el-select v-model="projectType" placeholder="选择项目类型" @change="changeStatusType" clearable=true>
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select> 
                </div>
                <div class="form-control">
                  <el-input v-model="projectName" placeholder="项目名称" clearable=true></el-input>
                </div>
                <gov-button type="search" @click="handleFilter"></gov-button>
                <gov-button type="reset" @click="handleReset"></gov-button>
              </div>
            </div>

            <div>
              <table>
                <tbody>
                  <tr v-for="(item,index) in tableData" :key="index">
                    <td>
                      <div class="project-list-box">
                        <div class="project-list-name">
                          {{item.projectName}}
                          <a @click="handleDetail(item)">查看</a>
                        </div>
                        <div class="project-list-con">
                          <ul>
                            <li>
                              <span class="liname">项目年度</span>
                              <span class="litxt">{{item.projectYear}}</span>
                            </li>
                            <li>
                              <span class="liname">登记时间</span>
                              <span class="litxt">{{item.createTime}}</span>
                            </li>
                            <li>
                              <span class="liname">项目类别</span>
                              <span class="litxt">{{item.projectTypeForShow}}</span>
                            </li>
                            <li>
                              <span class="liname">项目负责人</span>
                              <span class="litxt">{{item.projectLeaderForShow}}</span>
                            </li>
                          </ul>  
                        </div>
                        <div class="time-horizontal">
                          <template v-for="(item1,index1) in item.stageVOList" >
                            <li :key="index1">
                              <div :class="item1.isNowStage ? 'circles circle-green' : 'circles circle-gray'">
                                <div class="circle-bot"></div>
                                <div class="circle-mid"></div>
                                <div class="circle-top"></div>
                              </div>
                              <div class="detial">
                                <span class="name">{{item1.stage}}</span>
                                <span v-for="(item2,index2) in item1.timeList" :key="index2">{{item2}}</span>
                              </div>
                            </li>
                            <div class="back-line" :key="index1" v-if="index1==0"></div>
                          </template>
                        </div>
                      </div>
                    </td>  
                  </tr>
                </tbody>  
              </table>
              <!-- 分页 -->
              <div class="pagination" v-if="table.pagination.show">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="table.pagination.currentPage ? table.pagination.currentPage : 1"
                  :page-sizes="table.pagination.pageSizes ? table.pagination.pageSizes : [10, 20, 30, 50]"
                  :page-size="table.pagination.pageSize ? table.pagination.pageSize : 10"
                  :layout="table.pagination.layout ? table.pagination.layout : 'total, sizes, prev, pager, next, jumper'"
                  background
                  :total="table.pagination.total ? table.pagination.total : 0">
                </el-pagination>
              </div>
            </div> 
          </div>  
        </div>
      </div>
    </gov-layout-header>
    <!-- 详情弹窗 -->
    <details-dialog
    :status="dialogStatus"
    ref="detailsDialog"
    @closed="handleClosed"
    />
  </gov-layout-main>
</template>

<script>
import mixin from "@/mixins/mixin"
import ProjectPhase from './projectPhase'
import ProjectStatus from './projectStatus'
import { getStatisticsTitle, projectListPage } from '@/api/projectManagement/projectList'
import DetailsDialog from '../projectList/detailsDialog'
export default {
  mixins: [mixin],
  components:{ ProjectPhase, ProjectStatus, DetailsDialog},
  data () {
    return {
      titleName: ['项目总数','新建类','升级改造类','运维类','服务类'],  
      titleData: [],
      projectYear: '',
      projectType: '',
      projectName: '',
      statusOptions: [ {
        value: '1',
        label: '新建类',
      }, {
        value: '2',
        label: '升级改造类',
      }, {
        value: '3',
        label: '运维类',
      }, {
        value: '4',
        label: '服务类',
      }],
      tableData: [],
      table: {
        // 分页
        pagination: {
          show: true,
          total: 0,
          currentPage: 1,
          pageSize: 3,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [3, 6, 9, 12],
        },
      }, 
    }    
  },
  created () {
    this.getStatisticsTitle()
    this.getPage()
  },
  methods: {
    getStatisticsTitle () {
      getStatisticsTitle().then(({data}) => {
        this.titleData = data
      })
    },
    getPage () {
      var params = {page:this.table.pagination.currentPage,limit:this.table.pagination.pageSize,sign:3}
      if (this.projectYear) {
        params.projectYear = this.projectYear
      }
      if (this.projectType) {
        params.projectType = this.projectType
      }
      if (this.projectName) {
        params.projectName = this.projectName
      }
      projectListPage(params).then(({data}) => {
        this.table.pagination.total = data.data.total
        this.tableData = data.data.records
        console.log(data)
      })
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.table.pagination.pageSize = val
      this.getPage()
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.table.pagination.currentPage = val
      this.getPage()
    },
    handleFilter () {
      this.getPage()
    },
    handleReset () {
      this.projectYear = ''
      this.projectType = ''
      this.projectName = ''
    },
     // 查看
    handleDetail (row){
      this.dialogStatus = "detail"
      this.$refs['detailsDialog'].openDialog(row)
    },
  },   
}
</script>

<style scoped>
/*statistics*/
.statistics .total-box{border-bottom: 1px solid #e4e4e4; padding: 35px 0 5px; margin-bottom: 20px; position: relative;}
.statistics .total-box li{float: left;width: 20%;height: 70px;padding: 0 20px;}
.statistics .total-box li > .icon{float: left;display: block;padding-right: 10px;height: 70px;line-height: 70px;font-size: 30px;color: #c3dff2;}
.statistics .total-box li > .icon.icon-bigger{padding-right: 8px;font-size: 35px;}
.statistics .total-box li span{display: block;}
.statistics .total-box li .name{color: #999;}
.statistics .total-box li .num{font-size: 22px;}

.statistics .title{font-size: 16px; padding: 10px 0; border-bottom: 1px solid #e4e4e4; margin-bottom: 20px; color: #333;}
.select-group{float: right;margin-top: -10px;}
.select-group .form-control{float: left; margin-left:5px;border-color:#e4e4e4; border-radius: 3px; padding:0 5px; height: 30px; line-height: 30px;}
.select-group.sm{width: 120px;}
.select-group.md{width: 200px;}
.select-group input.form-control{width: 200px;}
.select-group .btn{height: 30px; line-height:25px;padding: 0 15px; margin-left: 10px;}
.total-box .select-group{ position: absolute;right: 0;top:5px; }
.statistics .chart-box{height: 350px;}

.project-list .select-group .form-control{width:auto;}
.project-list-box{border-right: 1px solid #e4e4e4; padding: 0 5px;}
.project-list-box:last-child{border-right:0;}
.project-list-name{ padding: 10px 0;width:100%;text-align: center;font-size: 15px; color: #087dc8;}
.project-list-name a{float: right; font-size:14px; color: #999; padding-right: 15px;}
.project-list-name a:hover{color: #087dc8;cursor:pointer;}
.project-list-con li{height: 25px; line-height: 25px;}
.project-list-con li span{display: block;float: left;}
.project-list-con li span.liname{width: 45%; text-align: right; padding-right: 15px;}
.project-list-con li span.litxt{width: 55%; text-align: left;}
.pagination.mt10{margin-top:10px;}

/*横向时间轴*/
.time-horizontal{padding-top:40px;width: 100%; float: left; position: relative;}
.time-horizontal .back-line{width: 80%; height: 2px; background:#ddd; margin: 0 auto;}
.time-horizontal li{float: left; position: relative; text-align: center; width: 20%; padding: 10px 0;list-style-type: none;}
.time-horizontal li .circles{z-index: 100; width: 30px; margin: 0 auto; margin-top: -25px;}
.circle-top{width: 18px;height: 18px;margin: -21px 0 0 6px;border-radius: 50%;}
.circle-mid{background-color:#fff;width: 24px;height: 24px;margin: -27px 0 0 3px;border-radius: 50%;}
.circle-bot{width: 30px;height: 30px;margin: 0px 0 0 0px;border-radius: 50%;}
.circle-orange .circle-top,.circle-orange .circle-bot{background-color:#eea44d;}
.circle-green .circle-top,.circle-green .circle-bot{background-color:#41afa8;}
.circle-gray .circle-top,.circle-gray .circle-bot{background-color:#a6a6a6;}
.time-horizontal li .detial{ margin-top: 20px;position: relative; width:100%;}
.time-horizontal li .detial span{display: block; position: relative; color: #999; font-size: 12px;}
.time-horizontal li .detial span.name{padding-bottom: 8px; color: #444; font-size: 14px;}
.time-horizontal li .detial span.explain{color:#c03a1f;padding-top: 5px;}
.time-horizontal li .detial span i{display:block;width: 10px; height: 1px; background-color: #ccc; margin: 3px auto;}

.statistics .col-md-6{
    width: 50%;
    display: inline-block;
}
.statistics .col-md-6-left{
  width: 50%;
  display: block;
  float: right;
}
.statistics .col-md-12{
    width: 100%;
    display: inline-block;
}
tr {
    display: inline-block;
    width: 33.3333%;
    height: 280px;
}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
table {
  width: 100%;
  height: 280px;
}
td {
  display: block;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
