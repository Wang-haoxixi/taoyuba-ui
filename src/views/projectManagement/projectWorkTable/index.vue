<template>
  <gov-layout-main>
    <gov-layout-header>
      <el-row style="border-bottom: 1px solid #ebeef5;height: 100px">
        <div class="div-left" style="padding-top: 10px">
          <div><h3>{{greet}} , {{userInfo.username}} , 祝你开心每一天!</h3></div>
          <div><template v-for="(item,index) in titleData.team"><span class="title-role"  :key="index">({{item.roleName}}){{item.teamName}} |</span></template></div>
        </div>
        <div class="div-right">
          <div class="title-right">
            <div><span class="title-role">参与项目</span></div>
            <div><span class="title-number">{{titleData.projectNumber}}</span></div>
          </div>
          <div class="title-right">
            <div><span class="title-role">任务</span></div>
            <div><span class="fontStyle">{{titleData.myTaskNumber}}</span><span class="title-number">/{{titleData.taskNumber}}</span></div>
          </div>
          <div class="title-right">
            <div><span class="title-role">所属团队</span></div>
            <div><span class="title-number">{{titleData.teamNumber}}</span></div>
          </div>
        </div>
      </el-row>
      <div class="div-left" >
        <template v-if="dnaWorktableMilestone">
          <div class="title-left">
            <span class="title">里程碑进度</span>
            <a class="table-title-right" @click="toMilestone">更多>></a>
          </div>
          <div style="height: 240px">
            <template v-for="(item,index) in milestoneList">
              <div class="milestone-block" :key="index">
                <div class="milestone-title">
                  <span class="long-text" style="padding-top: 5px">{{item.milestoneName}}</span>
                  <img :src="imgUrl[0]" style="width: 30px;cursor:pointer;" @click="editMilestone(item)"/>
                  <el-tag :type="getTag(item.status)" style="cursor:pointer;margin-left: 5px;float: right;">{{item.statusForShow}}</el-tag>
                  <span class="milestone-right">{{item.scheduleForShow}}</span>
                </div>
                <p class="milestone-text">{{item.description}}</p> 
                <div class="milestone-bottom">
                  <span class="milestone-bottom-left long-text">{{item.projectName}}</span>
                  <span class="milestone-right">{{item.plannedTime.split(' ')[0]}}</span>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="div-right">
        <div class="title-left">
          <span class="title">项目指数</span>
        </div>
        <div style="height: 200px;">
          <radar-map></radar-map>
        </div>
        <div class="title-left">
          <span class="title">我的待办</span>
          <a class="table-title-right" @click="toMsg">更多>></a>
        </div>
        <div style="height: 200px;">
          <template v-for="(item,index) in doRemindList">
            <div :key="index" style="display: inline-block;width: 100%">
              <span class="milestone-bottom-left" style="color: black;" >{{item.msgContent}}</span><span class="milestone-right">{{item.createTime}}</span>
            </div>
          </template>  
        </div>
      </div>

      <div class="div-left" style="margin-top: 10px">
        <template v-if="dnaWorktableTask">
          <el-tabs v-model="activeName" @tab-click="handleClick" style="display: inline-block;width:90%">
            <el-tab-pane label="项目任务" name="first"></el-tab-pane>
            <el-tab-pane label="协同任务" name="second"></el-tab-pane>
          </el-tabs>
          <a class="table-title-right" @click="toTask">更多>></a>
          <template>
            <el-table
              :data="tableData"
              style="width: 100%;min-height:300px">
              <el-table-column
                prop="taskName"
                label="任务">
              </el-table-column>
              <el-table-column
                prop="collaborativeDepartmentIdForShow"
                label="协同部门"
                width="200">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </template>
      </div>
    </gov-layout-header>
    <milestone-dialog
      @success="handleSuccess"
      @editSubmit="handleEditSubmit"
      :options="projectSelect"
      :status="dialogStatus"
      ref="formDialog"/>
    <!-- 弹窗 -->
    <task-dialog
      :status="dialogStatus"
      :options="projectSelect"
      @closed="handleClosed"
      @editSubmit="handleEditTaskSubmit"
      ref="taskFormDialog"/>    
  </gov-layout-main>      
</template>

<script>
import mixin from '@/mixins/mixin'
import RadarMap from './radarMap'
import {getDoRemind, getMilestone, getTask, getTitleData} from '@/api/projectManagement/projectWorkTable'
import { mapGetters } from 'vuex'
import milestoneDialog from '../projectMilestone/milestoneDialog'
import {updateMilestone} from '@/api/projectManagement/projectMilestone'
import editPic from './pic/editPic.png'
import taskDialog from '../projectTask/taskDialog'
import { getProjectSelect } from '@/api/projectManagement/projectMilestone'
import { updateTask } from '@/api/projectManagement/projectTask'
import { selectUserMenu, selectUserPermission } from '@/api/projectManagement/projectRole'
import { initMenu } from '@/util/util'
export default {
  name: 'projectWorkTable', // 项目周报
  mixins: [mixin],
  components: {RadarMap,milestoneDialog,taskDialog},
  data () {
    return {
      projectSelect: [],
      doRemindList: [],
      milestoneList: [],
      tableData: [],
      titleData: {},
      activeName: 'first',
      imgUrl: [editPic],
      dnaWorktableMilestone: false,
      dnaWorktableTask: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
      'menuAll',
    ]),
    greet () {
      var hour = new Date().getHours()
      if (0 <= hour && hour <= 5) {
        return "凌晨好"
      }
      if (6 <= hour && hour <= 10) {
        return "上午好"
      }
      if (11 <= hour && hour <= 12) {
        return "中午好"
      }
      if (13 <= hour && hour <= 17) {
        return "下午好"
      }
      if (18 <= hour && hour <= 23) {
        return "晚上好"
      }
      return "你好"
    },
    ...mapGetters([
      'userInfo',
    ]),
  },
  mounted () {
    let res = this.$store.getters.menuAll
    //有项目管理模块时才替换
    res.forEach((item,index) => {
      if (item.label == '项目管理') {
        //菜单
        selectUserMenu({id:res[index].id}).then(({data}) => {
          if (data.length > 0) {
            res[index].children = data
            this.$store.commit('SET_MENU_ALL', res)
          } 
          initMenu(this.$router, res)
          this.$loading({
            lock: true,
            text: '菜单加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)',
          }).close()
          
        })
        //权限
        selectUserPermission({id:res[index].id}).then(({data}) => {
          this.$store.commit('SET_PERMISSIONS', data)
        })               
      }
    })
  },
  created () {
    this.dnaWorktableMilestone = this.permissions['dna_worktable_milestone']
    this.dnaWorktableTask = this.permissions['dna_worktable_task']
    this.getProjectSelect()
    this.getDoRemind()
    this.getMilestone()
    this.getTask()
    this.getTitleData()
  },
  methods: {
    //获取项目下拉列表
    getProjectSelect () {
      getProjectSelect().then(({data}) =>{
        this.projectSelect = data
      })
    },
    //编辑任务
    handleEditTaskSubmit (formData) {
      updateTask(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['taskFormDialog'].close()
        this.getTask()
      })
    },
    //打开任务弹窗
    handleEdit (row) {
      this.dialogStatus = 'update'
      this.$refs.taskFormDialog.openDialog({...row})
    },
    //编辑里程碑
    handleEditSubmit (formData) {
      updateMilestone(formData).then(({data}) => {
        if (data.code === 1) {
          this.$message.error(data.msg)
        } else {
          this.$refs['formDialog'].closeDialog()
          this.getMilestone()
        }
      })
    },
    //打开里程碑弹窗
    editMilestone (row) {
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog(row)
    },
    //转跳至消息管理的待办
    toMsg () {

    },
    //转跳至里程碑
    toMilestone () {
      this.$router.push("/project/projectMilestone")
    },
    //转跳至任务
    toTask () {
      this.$router.push("/project/projectTask")
    },
    getTag (progressStatus) {
      let colors = ['info', 'warning', 'success']
      return colors[progressStatus-1]
    },
    getDoRemind () {
      getDoRemind().then(({data}) => {
        this.doRemindList = data
      })
    },
    getMilestone () {
      getMilestone().then(({data}) => {
        this.milestoneList = data
      })
    },
    getTask (params) {
      getTask(params).then(({data}) => {
        this.tableData = data
      })
    },
    getTitleData () {
      getTitleData().then(({data}) => {
        this.titleData = data
      })
    },
    handleClick (tab) {
      var params = {sign: Number(tab.index)+1}
      this.getTask(params)
    },
  },
}
</script>

<style scoped>
  .long-text:hover {
    height: auto;
    word-break:break-all;
    white-space: pre-wrap;
    text-decoration: none;
  }
  .long-text {
    max-width: 120px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    float: left;
  }

  .task-title {
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    line-height: 24px;
    padding-left: 10px;
  }

  .milestone-bottom-left {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.447058823529412);
    line-height: 20px;
    float: left;
    margin-top: 10px;
  }

  .milestone-name {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    float: left;
  }

  .milestone-title {
    height: 35px;
  }

  .milestone-bottom {
    height: 35px;
    position:absolute;
    bottom:0;
    width: 100%;
  }

  .milestone-text {
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.447058823529412);
    margin-top: 5px;
    position: absolute;
  }

  .milestone-right {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.447058823529412);
    line-height: 20px;
    float: right;
    margin-top: 10px;
  }

  .milestone-block {
    border: 1px solid gainsboro; 
    border-left: 0px;
    width: 32%;
    height: 120px;
    border-radius: 4px;
    position:relative;
    float: left;
    margin: 0.5%; 
  }

  .title {
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    line-height: 24px;
  }
  
  .title-left {
    align-self: flex-start;
    padding: 16px 2px 16px 24px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid gainsboro;
  }
  
  .table-title-right {
    float: right;
    font-size: 12px;
    color: rgba(0, 71, 255, 0.776470588235294);
    margin-right: 10px;
    cursor:pointer;
  }

  .title-right {
    float: right;
    font-size: 12px;
    color: rgba(0, 71, 255, 0.776470588235294);
  }

  .title-role {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.427450980392157);
    text-align: left;
    line-height: 22px;
  }
  
  .title-number {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.847058823529412);
    line-height: 38px;
  }

  .fontStyle {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.847058823529412);
  }

  .title-right {
    width: 33%;
    display: inline-block;
    text-align: center;
    border-right: 1px solid #ebeef5;
  }

  .div-left {
    width: 60%;
    display: inline-block;
  }

  .div-right {
    width: 38%;
    display: block;
    float: right;
  }

</style>
