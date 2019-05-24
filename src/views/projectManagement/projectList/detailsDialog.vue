<template>
  <gov-dialog
  ref="dialog"
  width="70%"
  @closed="handleClosed"
  :isBtnGroup="false"
  :title="dialog.textMap[status]">
  <gov-layout-body>
    <el-row class="detailTitle">
      <el-col :span="24" class="detail_title_box">
        <span class="detail_texts">{{projectName}}</span>
        <span class="detail_text">{{projectDutyDept}}</span>
      </el-col>
    </el-row>
    <div class="detail_pagetions">
      <el-row class="detailpage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="项目信息" name="first">
            <project-information
              :id="id" 
              ref="infoDialog">
            </project-information>
          </el-tab-pane>
          <el-tab-pane label="项目里程碑" name="second">
            <project-mileage
              :id="id" 
              ref="milestoneDialog">
            </project-mileage>
          </el-tab-pane>
          <el-tab-pane label="项目任务" name="third">
            <project-tasks
              :id="id"
              ref="taskDialog">
            </project-tasks>
          </el-tab-pane>
          <el-tab-pane label="项目文档" name="fourth">
            <project-documentation
              :id="id"
              ref="docDialog"></project-documentation>
          </el-tab-pane>
          <el-tab-pane label="项目跟踪" name="fifth">
            <project-tracking
              :id="id" 
              ref="trackDialog">
            </project-tracking>
          </el-tab-pane>
          <el-tab-pane label="操作日志" name="sixth">
            <operation-log 
              :id="id"
              ref="operLogDialog">
            </operation-log>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
    
  </gov-layout-body>
    
  </gov-dialog>
</template>
<script>
import { getDept } from '@/util/dic'
import mixin from "@/mixins/mixin"
import projectInformation from './tabs/projectinformation'
import projectMileage from './tabs/projectmileage'
import projectTasks from './tabs/projecttasks'
import projectDocumentation from './tabs/projectdocumentation'
import projectTracking from './tabs/projecttracking'
import operationLog from './tabs/operationlog'
export default {
  mixins:[mixin],
  components:{ projectInformation, projectMileage, projectTasks, projectDocumentation, projectTracking, operationLog },
  data (){
    return{
      activeName: 'first',
      projectName: "",
      projectDutyDept: "",
      id: 0,
    }
  },
  props: {
    status: {
      type: String,
      default: 'create',
    },
  },
  methods: {
    // 导航
    handleClick (tab) {
      console.log(tab)
    },
    //打开弹窗
    openDialog (row){
      this.activeName = 'first'
      var dataJson = JSON.parse(row.dataJson)
      this.projectName = dataJson.projectName
      this.id = row.id
      var dept = getDept()
      dept.forEach(item => {
        if (dataJson.projectDutyDept == item.value) {
          this.projectDutyDept = item.label
          return
        }
      })
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.getInfo()
        this.getOperLog()
        this.getMilestone()
        this.getTask()
        this.getDoc()
        this.getTrack()
      })  
      
    },
    close (){
      this.$refs['dialog'].close()
    },
    getOperLog () {
      this.$refs['operLogDialog'].getLog()
    },
    getInfo () {
      this.$refs['infoDialog'].getInfo()
    },
    getMilestone () {
      this.$refs['milestoneDialog'].getMilestone()
    },
    getTask () {
      this.$refs['taskDialog'].getTask()
    },
    getDoc () {
      this.$refs['docDialog'].getDoc()
    },
    getTrack () {
      this.$refs['trackDialog'].getTrack()
    },
  },
}
</script>

<style lang="scss">
.detailTitle{
  // background-color: yellow;
  padding: 20px 0 10px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  overflow: hidden;
  .detail_title_box{
    font-size: 16px;
    color: #167197;
    padding: 0 15px 20px;
    .title_icon{
      display: block;
      border-radius: 5px;
      float: left;
      margin-right: 10px;
      font-size: 30px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #3981d9;
      background-color: #f2f2f2;
    }
    .detail_texts{
      display: block;
      padding-top: 5px;
      font-size: 14px;
      color: #24799D;
    }
    .detail_text{
      display: block;
      padding-top: 5px;
      font-size: 14px;
      color: #777;
    }
  }
}
.detail_pagetions{
  width: 100%;
  overflow: hidden;
  padding-right: 10px;
  margin-top: 10px;
  .detailpage{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    overflow: hidden;
    padding: 10px 20px;
  }

}

</style>
