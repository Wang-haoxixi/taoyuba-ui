<template>
  <gov-dialog
    ref="dialog"
    @open="handleOpenDialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <layout-form>
      <template v-if="status === 'detail'">
        <el-form ref="form" v-model="form" style="min-height: 400px">
          <h2>{{form.docTitle}}</h2>
          <div class="title-info">
            <div class="title-inline">
              <span style="">上传人: {{form.modifiedByForShow}}</span>
            </div>
            <div class="title-inline">
              <span>上传日期: {{form.createTime}}</span>
            </div>  
            <div class="title-inline">
              <span>浏览量: {{form.pageviews}}</span>
            </div>
            <div class="title-inline">
              <span>下载量: {{form.downloads}}</span>
            </div>  
          </div>
          <div class="textarea">
            <p style="font-size: 16px;">{{form.knowledgeIntroduction}}</p>
          </div>
          <div>
            <span>所属项目: {{getProjectName(form.dependentProjectId)}}</span>
          </div>
          <div>
            <span>知识类别: {{getKnowledgeType(form.knowledgeCategory)}}</span>
          </div>
          <div style="padding-top: 10px;"><span style="font-size:16px;">下载:</span><gov-button type="text" @click="downloadAll(form.id)" text="下载全部" style="display: inline-block;float: right"></gov-button>
            <div class="stdDocFileList" v-for="item in form.attachmentMapList" :key="item.url">
              {{item.name}}
              <i
                element-loading-background="rgba(0, 0, 0, 0.6)"
                element-loading-text="正在导出数据..."
                class="el-icon-download icon-download"
                @click="downloadFile(item,form.id)"
                v-loading.fullscreen.lock="fullscreenLoading"></i>
            </div>
          </div>  
        </el-form>  
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="form" :option="tableOption" v-model="form"></avue-form>
        </div>        
      </template>    
    </layout-form>
  </gov-dialog>  
    
</template>

<script>
import {getDic} from '@/util/dic'
import mixin from '@/mixins/mixin'
import {tableOption} from './const/index'
import {downloadFile,downloadAll} from '@/api/projectManagement/projectKnowledgeBase'
export default {
  name: 'knowledgeDialog',
  mixins: [mixin],
  data () {
    return {
      form: {},
      knowledgeType: getDic('PROJECT_KNOWLEDGE_TYPE'),
    }
  },
  props: {
    projectList: {
      type: Array,
      default () {
        return []
      },
    },
  },
  computed: {
    tableOption () {
      tableOption.column[1].dicData = this.projectList
      return tableOption
    },
  },
  methods: {
    getProjectName (key) {
      let projectList = this.projectList 
      for (let i = 0;i < projectList.length; i++) {
        if (projectList[i].value == key) {
          return projectList[i].label
        }
      }
    },
    getKnowledgeType (key) {
      let knowledgeType = this.knowledgeType
      for (let i = 0;i < knowledgeType.length; i++) {
        if (knowledgeType[i].value == key) {
          return knowledgeType[i].label
        }
      }
    },
    openDialog (formData) {
      this.form = formData || {}
      this.$refs['dialog'].open()
      
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
      })
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        this.status === 'create' ? this.$emit('createSubmit', this.form) : this.$emit('editSubmit', this.form)
      }).catch(()=>{
        this.$message.error('请规范表单数据后提交')
      })
    },
    closeDialog () {
      this.$refs['dialog'].close()
      this.status !== 'detail' ? this.resetForm('form') : this.$refs['form'].resetFields()
      
    },
    handleClosedDialog () {
      this.$refs['dialog'].close()
      this.status !== 'detail' ? this.resetForm('form') : this.$refs['form'].resetFields()
    },
    //下载并增加下载量
    downloadFile (data, id) {
      let params = {
        attachmentUrl: data.url,
        id: id,
      }
      this.fullscreenLoading = true
      downloadFile({params,title:data.name.split('.')[0]}).then(()=>{
        this.fullscreenLoading = false
        this.$message.info('正在导出数据...')
        this.form.downloads++
      })
    },
    downloadAll (id) {
      let params = {id: id}
      this.fullscreenLoading = true
      downloadAll({params,title:'下载内容'}).then(()=>{
        this.fullscreenLoading = false
        this.$message.info('正在导出数据...')
        this.form.downlown++
      })
    },
  },
}
</script>

<style scoped lang="scss">
.title-info {
  padding: 10px 0px;
  border-bottom: 1px solid gainsboro;
}
.title-inline {
  display: inline-block;
  width: 25%;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.447058823529412);
}
.textarea {
  background-color: #efefef;
  border: 1px solid gainsboro;
  min-height: 180px;
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
