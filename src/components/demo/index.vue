<template>
  <div class="iep-page-form">
    <el-form ref="form" :model="form" size="small" label-width="120px">

      <el-form-item label="头像:">
        <iep-avatar v-model="form.avatar"></iep-avatar>
      </el-form-item>

      <el-form-item label="单文件:">
        <iep-upload-select v-model="form.uploadSelect"></iep-upload-select>
      </el-form-item>

      <el-form-item label="用户:">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>

      <el-form-item label="用户群:">
        <iep-contact-multiple-user v-model="form.userList"></iep-contact-multiple-user>
      </el-form-item>

      <el-form-item label="群发:">
        <iep-contact-multiple v-model="form.receivers"></iep-contact-multiple>
      </el-form-item>

      <el-form-item label="标签:">
        <iep-tag v-model="form.tagList"></iep-tag>
      </el-form-item>

      <el-form-item label="单部门:">
        <iep-dept-select v-model="form.dept"></iep-dept-select>
      </el-form-item>

      <el-form-item label="多部门:">
        <iep-dept-multiple v-model="form.deptList"></iep-dept-multiple>
      </el-form-item>

      <el-form-item label="时间:">
        <iep-date-range-select v-model="form.timeRange"></iep-date-range-select>
      </el-form-item>

      <el-form-item label="组织:">
        <iep-select v-model="form.orgIds" multiple autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
      </el-form-item>

      <el-form-item label="多色图标:">
        <iep-identity-mark icon="iep2-icondongshichang" title="董事长"></iep-identity-mark>
        <iep-identity-mark icon="iep2-iconzongjingli" title="总经理"></iep-identity-mark>
        <iep-identity-mark icon="iep2-icontouziren1" title="投资人"></iep-identity-mark>
        <iep-identity-mark icon="iep2-iconbanchang" title="班长"></iep-identity-mark>
        <iep-identity-mark icon="iep2-iconbanwei" title="班委"></iep-identity-mark>
        <iep-identity-mark icon="iep2-iconweiyuanhuizhuren" title="委员会主任"></iep-identity-mark>
        <iep-identity-mark icon="iep2-iconweiyuanhui" title="委员会"></iep-identity-mark>
        <iep-identity-mark icon="iep2-iconzhuanjia1" title="专家"></iep-identity-mark>
      </el-form-item>

      <el-form-item label="文件:">
        <iep-upload v-model="form.fileList" drag :limit="2">
          点击进入<a href="http://77777">haahahahah</a>你好
        </iep-upload>
      </el-form-item>

      <el-form-item label="froala富文本:">
        <iep-froala-editor v-model="form.content"></iep-froala-editor>
      </el-form-item>

      <el-form-item label="froala展示:">
        <iep-html v-model="form.content"></iep-html>
      </el-form-item>

      <div class="fack-div"></div>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        avatar: '',
        uploadSelect: '',
        timeRange: '',
        user: {
          id: 588,
          name: '张超',
        },
        orgIds: [],
        receivers: { // 比如接收人
          unions: [],
          orgs: [],
          users: [{
            id: 588,
            name: '张超',
          }],
        },
        userList: [{
          id: 588,
          name: '张超',
        }],
        dept: {
          id: 1,
          name: '研发部',
        },
        deptList: [{
          id: 1,
          name: '研发部',
        }],
        fileList: [{ 'name': 'AINY4Y0AL3.txt', 'url': 'files-04cd8be68d2846c197432e51ee8888b5.txt' }],
        tagList: ['大数据', '人工智能', 'hahahaha'],
        content: '',
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  width: 100%;
  border: 1px solid #eee;
}
.fack-div {
  height: 500px;
  width: 500px;
}
</style>
