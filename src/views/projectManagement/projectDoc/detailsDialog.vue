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
        <div class="title_icon"></div>
        <span class="detail_texts">{{projectName}}</span>
        <span class="detail_text">{{projectDutyDept}}</span>
      </el-col>
      <el-col>
        <ul class="phase-name">
          <li v-for="(item,index) in projectStatus" :key="index" :class="item.isNowStage ? 'current':''">
            <div class="namebox">{{item.stage}}</div>
            <div class="date">
              <span v-for="(item1,index1) in item.timeList" :key="index1">{{item1}}</span>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      
    </el-row>  
    <div class="detail_pagetions">
      <el-row class="detailpage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="项目文档" name="first">
            <project-documentation
              :id="id"
              ref="docDialog"></project-documentation>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
    
  </gov-layout-body>
    
  </gov-dialog>
</template>
<script>
import mixin from "@/mixins/mixin"
import projectDocumentation from '../projectList/tabs/projectdocumentation'
import { checkProjectStage } from '@/api/projectManagement/projectDoc'
export default {
  mixins:[mixin],
  components:{ projectDocumentation },
  data (){
    return{
      activeName: 'first',
      projectName: "",
      projectDutyDept: "",
      projectStatus:"",
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
    checkProjectStage (id) {
      var params = {id:id}
      checkProjectStage(params).then(({data}) => {
        this.projectStatus = data
      })
    },
    //打开弹窗
    openDialog (row){
      this.projectName = row.projectName
      this.id = row.projectId
      this.projectDutyDept = row.projectDutyDeptForShow
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.checkProjectStage(row.id)
        this.getDoc()
      })  
      
    },
    close (){
      this.$refs['dialog'].close()
    },
    getDoc () {
      this.$refs['docDialog'].getDoc()
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

.phase-name{overflow: hidden; padding: 0; margin: 0; margin-left: 13px;}
.phase-name li{width: 15%;padding-left: 15px; margin-left:-14px; float: left; position: relative;}
.phase-name li:before{content:"";width:0;height:0;position:absolute;left:15px;top:0;border-top:solid 16px transparent;border-left:solid 16px #fff;border-bottom:solid 16px transparent; z-index: 0;}
.phase-name li:after{content:"";width:0;height:0;position:absolute;right:-15px;top:0;border-top:solid 16px transparent;border-left:solid 16px #eee;border-bottom:solid 16px transparent; z-index: 100;}
.phase-name li:first-child:before{display: none;}
.phase-name li:last-child:after{display: none;}
.phase-name li .namebox{line-height: 22px;background-color: #eee; padding: 5px 5px 5px 30px; font-size: 13px;}
.phase-name li:first-child .namebox{padding-left: 10px;}
.phase-name li:last-child .namebox{padding-right: 10px;}
.phase-name li.current .namebox{background-color: #3981d9; color: #fff;}
.phase-name li.current .namebox:before{content: "";display:block; margin-right:5px;margin-top: 4px;float:left;width: 14px;height: 14px; background: url(./pic/icon-ok.png) no-repeat center; background-size: cover;}
.phase-name li.current:after{border-left-color:#3981d9;}
.phase-name li .date{padding: 10px 0; line-height: 22px;opacity: 1;}
.phase-name li .date span{display: block; padding-left: 15px;}
.phase-name li.current .date{ opacity: 1;}
</style>
