<template>
  <el-upload class="upload-demo" drag :headers="token" :action="actionUrl" accept=".xlsx, .xls" :limit="1" :multiple="false" :on-success="handleFileFinish">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件
      <el-button type="text" @click="handleDownloadModel()">下载模板</el-button>
    </div>
  </el-upload>
</template>
<script>
import { mapState } from 'vuex'
import { downloadModel } from '@/api/mdl/excel'
const typeMap = {
  公共服务: {
    modelId: 1,
    importUrl: 'service_import',
  },
  行政权力: {
    modelId: 2,
    importUrl: 'right_import',
  },
  主题事项: {
    modelId: 3,
    importUrl: 'theme_import',
  },
  信息项: {
    modelId: 4,
    importUrl: 'item_import',
  },
}
export default {
  props: {
    typeName: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      token: {},
      actionUrl: '',
    }
  },
  computed: {
    ...mapState({
      access_token: state => state.user.access_token,
    }),
  },
  created () {
    this.actionUrl = `/api/mdl/excel/${typeMap[this.typeName].importUrl}`
    this.token.Authorization = 'Bearer ' + this.access_token
  },
  methods: {
    handleDownloadModel () {
      downloadModel(typeMap[this.typeName].modelId)
    },
    handleFileFinish (res) {
      setTimeout(() => {
        this.$emit('close', res)
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-demo {
  text-align: center;
}
</style>
