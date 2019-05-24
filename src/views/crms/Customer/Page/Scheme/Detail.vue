<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'方案详情'" width="40%" @close="close">
    <el-form :model="detailForm" class="form-detail" label-width="120px" size="small">
      <el-form-item label="方案名称：" v-if="hide">
        <span>{{detailForm.programName}}</span>
      </el-form-item>
      <el-form-item label="发布者：" v-if="hide">
        <span>{{detailForm.realName}}</span>
      </el-form-item>
      <el-form-item label="材料名称：" v-if="show">
        <span>{{detailForm.materialName}}</span>
      </el-form-item>
      <el-form-item label="上传者：" v-if="show">
        <span>{{detailForm.uploader}}</span>
      </el-form-item>
      <el-form-item label="下载次数：" v-if="show">
        <span>{{detailForm.downloadCost}}</span>
      </el-form-item>
      <el-form-item label="创建时间：" v-if="show">
        <span>{{detailForm.createTime}}</span>
      </el-form-item>
      <el-form-item label="附件名称：">
        <span class="file" v-for="(item,index) in detailForm.attachFileList" :key="index" @click="download">{{item.name}}</span>
      </el-form-item>
      <el-form-item label="材料标签：" v-if="show">
        <a-tag class="tags" v-for="(item,index) in detailForm.tagKeyWords" :key="index">{{item}}</a-tag>
      </el-form-item>
      <el-form-item label="保存至材料库：" v-if="hide">
        <span>否</span>
      </el-form-item>
    </el-form>
  </iep-drawer>
</template>

<script>
import { downloadModel } from '@/api/crms/download'
export default {
  data () {
    return {
      hide: false,
      show: false,
      drawerShow: false,
      detailForm: {
        programName: '',
        materialName: '',
        uploader: '',
        downloadCost: '',
        createTime: '',
        attachFileList: '',
        tagKeyWords: [],
      },
    }
  },
  methods: {
    close () {
      this.hide = false
      this.show = false
      this.drawerShow = false
    },
    download () {
      downloadModel(this.detailForm.attachFileList[0].url, this.detailForm.attachFileList[0].name)
    },
  },
}
</script>

<style scoped lang='scss'>
.file {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: #ba1b21;
  }
}
</style>
