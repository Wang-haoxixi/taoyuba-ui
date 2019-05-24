<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <template v-if="status === 'detail'">
      <div class="detail-wrapper">
        <gov-detail-form v-model="form" :option="detailOption">
          <template slot="reportTime" slot-scope="scope">
            {{scope.row.reportTime[0].split(' ')[0]}} 至 {{scope.row.reportTime[1].split(' ')[0]}} 
          </template>  
          <template slot="projectId">
            <table class="mt">
              <thead>
                <tr>
                  <td style="width: 60%">里程碑名称</td>
                  <td style="width: 20%">计划达成时间</td>
                  <td style="widthL: 20%">进度</td>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in projectMilestones">
                  <tr :key="item.id">
                    <td>{{item.milestoneName}}</td>
                    <td>{{item.plannedTime.split(' ')[0]}}</td>
                    <td>{{item.scheduleForShow}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>

          <template slot="attachmentMapList" slot-scope="scope" >
            <div class="stdDocFileList" v-for="item in scope.row.attachmentMapList" :key="item.uploadError">
              {{item.name}}
              <i
                element-loading-background="rgba(0, 0, 0, 0.6)"
                element-loading-text="正在导出数据..."
                class="el-icon-download icon-download"
                @click="downloadFile(item)"
                v-loading.fullscreen.lock="fullscreenLoading"></i>
            </div>
          </template>

        </gov-detail-form>
      </div>
    </template>
    <el-form
      v-else
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      label-position="right"
      :disabled="status ==='detail' ? true : false">
      <el-form-item label="项目名称" prop="projectId">
        <el-select v-model="form.projectId" placeholder="请选择" filterable @change="changeProject">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="责任单位" prop="responsibleUnit">
        <el-select v-model="form.responsibleUnit" placeholder="请选择" filterable>
          <el-option
            v-for="item in getDept()"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报告时间" prop="reportTime">
        <el-date-picker
          v-model="form.reportTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="年度目标">
        <el-input v-model="form.annualTarget" :maxlength="100" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目里程碑">
        <table class="mt">
          <thead>
            <tr>
              <td style="width: 60%">里程碑名称</td>
              <td style="width: 20%">计划达成时间</td>
              <td style="width: 20%">进度</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in projectMilestones" :key="item.id">
              <td>{{item.milestoneName}}</td>
              <td>{{item.plannedTime}}</td>
              <td>{{item.scheduleForShow}}</td>
            </tr>
          </tbody>
        </table>
      </el-form-item>
      <el-form-item label="项目本周进展">
        <avue-ueditor v-model="form.thisWeekProgress" ></avue-ueditor>
      </el-form-item>
      <el-form-item label="下周工作计划">
        <avue-ueditor v-model="form.nextWeekPlan" ></avue-ueditor>
      </el-form-item>
      <el-form-item label="上传">
        <el-upload
          v-model="form.attachmentMapList"
          multiple
          class="upload-demo"
          action="/api/proj/dnaprojectweekly/upload"
          :headers="httpHeaders"
          :on-change="handleChange"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :file-list="attachmentMapList">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </gov-dialog>
</template>
<script>
import { headers } from './const/header'
import { getDept } from '@/util/dic'
import mixin from '@/mixins/mixin'
import { getMilestone } from '@/api/projectManagement/projectWeekly'
import { tableOption } from './const/index'
import { downloadFile } from '@/api/projectManagement/projectList'
export default {
  name: 'weeklyDialog',
  mixins: [mixin],
  data () {
    return {
      form: {},
      rules: {
        projectId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        responsibleUnit: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        reportTime: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
      },
      projectMilestones: [],
      attachmentMapList: [],
    }
  },
  props: {
    status: {
      type: String,
      defaule: 'create',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  computed: {
    httpHeaders () {
      return headers
    },
    detailOption () {
      tableOption.column[0].dicData = this.options
      return {
        option: [
          {
            column: tableOption.column,
          },
        ],
      }
    },
    // tableOption () {
    //   tableOption.column[0].dicData = this.options
    //   return tableOption
    // },
  },
  methods: {
    uploadError () {
      this.$message.error('上传失败请联系管理员')
    },
    uploadSuccess (data) {
      var newData = {url:data.url,name:data.name}
      this.attachmentMapList.push(newData)
    },
    changeProject (id) {
      getMilestone(id).then(({data})=>{
        this.$set(this.form,'annualTarget',data.annualTarget)
        this.projectMilestones = [...data.projectMilestones]
      })
    },
    getDept () {
      return getDept()
    },
    handleSubmit () {
      this.form.attachmentMapList = this.attachmentMapList
      this.$refs['form'].validate().then(()=>{
          this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
          this.attachmentMapList = []
          this.projectMilestones = []
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    handleOpenDialog () {
      if (this.status !== 'detail') {
        this.clearValidate('form')
      }
    },
    openDialog (formData) {
      if (formData.projectId) {
        this.changeProject(formData.projectId)
      }
      if (formData.attachmentMapList) {
        this.attachmentMapList = formData.attachmentMapList
      }
      this.form = formData
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    closeDialog () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      if (this.status !== 'detail') {
        this.clearValidate('form')
      }
      this.projectMilestones = []
      this.attachmentMapList = []
    },
    // 下载上传的文件
    downloadFile (data) {
      let params = {
        fileAddress: data.url,
      }
      this.fullscreenLoading = true
      downloadFile({params,title:data.name.split('.')[0]}).then(()=>{
        this.fullscreenLoading = false
        this.$message.info('正在导出数据...')
      })
    },
    // 上传删除
    handleRemove (file, fileList) {
      this.attachmentMapList = [...fileList]
    },
    //上传的删除钱提示
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
  },
}
</script>

<style scoped lang="scss">

table.mt {
	width: 100%;
	background-color: #FFF;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
}
table.mt thead tr td,table.mt tbody tr td {
  border: 1px solid #DCDFE6;
	padding: 5px 10px;
}
table.mt thead tr td {
	font-weight: bold;
}

.stdDocFileList {
  position: relative;
  .icon-download {
    position: absolute;
    top: 12px;
    right: 0;
    cursor: pointer;
    color: #999;
    :hover {
      color: #333;
    }
  }
}

</style>
