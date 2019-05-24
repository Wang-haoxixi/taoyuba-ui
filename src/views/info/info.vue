<template>
  <gov-layout-main>
    <el-form :model="userForm" label-width="180px" :rules="rules" ref="form">
      <el-form-item label="用户名">
        {{userForm.username}}
      </el-form-item>
      <el-form-item label="真实姓名" class="formWidth">
        <el-input v-model="userForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <avatar-uploader v-model="userForm.avatar"></avatar-uploader>
      </el-form-item>
      <el-form-item label="联系手机" class="formWidth">
        <el-input v-model="userForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存内容</el-button>
      </el-form-item>
    </el-form>
  </gov-layout-main>
</template>

<script>
import paginationMixins from '@/mixins/pagination_mixins'
import { getUserById, putUser } from '@/api/umps/user'
import AvatarUploader from '@/components/avatar-uploader'
// import MutiplyTagSelect from '@/components/mutiply-tag-select';
import { mapState, mapMutations } from 'vuex'
// import Editor from '@/components/editor';
export default {
  components: {
    AvatarUploader,
  },
  mixins: [paginationMixins],
  data () {
    return {
      id: undefined,
      userForm: {},
      rules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  created () {
    this.load()
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO',
    }),
    load () {
      getUserById(this.userInfo.id).then((res) => {
        this.userForm = res.data
        this.setUserInfo({ ...res.data })
        this.id = this.userForm.id
      })
      // this._initUser()
    },
    // _initUser () {
    //   const { abilityTags, learningTags, projectTags } = this.userForm
    //   // 卓越标签
    //   this.userForm.ability = this._mapPickTagIdName(abilityTags)
    //   this.userForm.abilityTags = this.userForm.ability.map(m => m.name)
    //   // 学习标签
    //   this.userForm.learning = this._mapPickTagIdName(learningTags)
    //   this.userForm.learningTags = this.userForm.learning.map(m => m.name)
    //   // 项目标签
    //   this.userForm.project = this._mapPickTagIdName(projectTags)
    //   this.userForm.projectTags = this.userForm.project.map(m => m.name)
    // },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userForm.role = this.userForm.roleList.map(r => r.id)
          putUser(this.userForm).then(() => {
            this.$message({
              message: '更新成功',
              type: 'success',
            })
            this.load()
          })
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'warning',
          })
          this.load()
          return false
        }
      })
    },
  },
}
</script>

<style lang="css" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
.labels-box {
  height: 45px;
}
.staff-info-master {
  line-height: 41px;
  margin-right: 10px;
}
</style>
